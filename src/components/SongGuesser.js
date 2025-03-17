import React, { useState, useEffect, useRef, useCallback } from 'react';
import YouTube from 'react-youtube';
import songs from '../data/songs';
import './SongGuesser.css';

// Easy mode songs list - popular Beatles songs
const easySongs = [
  "GKdl-GCsNJ0", // Here Comes The Sun
  "wqaKHHxQFZc", // Come Together
  "AbNFLI720_U", // Let It Be
  "vZRzJJcbHkE", // Yesterday
  "mQER0A0ej0M", // Hey Jude
  "xOW5rMkDcEY", // Twist And Shout
  "HHnxMRm-VRM", // Blackbird
  "YBcdt6DsLQA", // In My Life
  "v1HDt1tknTc", // I Want To Hold Your Hand
  "MZ3Vh8jZFdE", // Something
  "W3AV2d0Za9s", // Help!
  "rblYSKz_VnI",  // Eleanor Rigby
  "YFDg-pgE0Hk", // While My Guitar Gently Weeps
  "vYEY5Jmz3pU", // Ob-La-Di, Ob-La-Da
  "0pGOFX1D_jg", // Love Me Do
  "5tc0gLSSU1M", // And I Love Her
  "AMSiHdrHl0g", // A Hard Day's Night
  "Y_V6y1ZCg_8", // Norwegian Wood (This Bird Has Flown)
  "gS_-aHQxUqw", // Strawberry Fields Forever
  "4EGczv7iiEk", // All You Need Is Love
  "xNQXWAeLo3s", // Get Back
  "TSpiwK5fig0",  // All My Loving
  "oxwAB3SECtc", // I Saw Her Standing There
  "l7x-0c9jl4Y", // Lucy In The Sky With Diamonds
  "2IbPn5j2YKk", // Day Tripper
  "Xz1g63DlVAU", // Don't Let Me Down
  "h3WJiqc_bEs", // Can't Buy Me Love
  "oVCwDl-S09A", // She Loves You
  "UHsN9d4FTVI", // Ticket To Ride
  "0wE0G9GTCAs", // Penny Lane
  "WoBLi5eE-wY", // Michelle
  "erMgpfiOMSU", // Oh! Darling
  "XTfmuDjwQTw", // Eight Days A Week
  "P2C3f0Atcoo", // Hello, Goodbye
  "KuqMJ9qdflw", // Yellow Submarine
  "eqUzU552X8A", // Across The Universe
  "GooL7-iPMYI", // With A Little Help From My Friends
  "V8nLraecPRY", // You've Got To Hide Your Love Away
  "yOYArc7mFiE", // Back In The U.S.S.R.
  "YSGHER4BWME", // A Day In The Life
  "GLkhWfVIxi8", // The Long And Winding Road
  "IgRrWPdzkao", // We Can Work It Out
  "hwi2ynHPB80", // Golden Slumbers
  "SZBsVbKROV0", // I Will
  "kfSQkZuIx84", // Drive My Car
  "6MbqzDm1uCo", // Revolution
  "vs7U4xfkAfI", // Here, There, And Everywhere
  "xLBVgnZyuic", // I Feel Fine
  "xwwABrNLvFs"  // Sgt. Pepper's Lonely Hearts Club Band
];

const SongGuesser = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [clipDuration, setClipDuration] = useState(1); // Start with 1 second
  const [playingFullSong, setPlayingFullSong] = useState(false); // Track when playing the full song
  const [attemptsCount, setAttemptsCount] = useState(0); // Track number of attempts
  const [isWaitingForPlayback, setIsWaitingForPlayback] = useState(false); // Track when waiting for video to start
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1); // Track selected suggestion
  const [playerLoadRetries, setPlayerLoadRetries] = useState(0); // Track number of player load retries
  const [playerKey, setPlayerKey] = useState(Date.now()); // Key to force YouTube component re-render
  const [playbackTimedOut, setPlaybackTimedOut] = useState(false); // Track if playback timed out
  const [playedSongs, setPlayedSongs] = useState([]); // Track songs that have been played
  const [easyMode, setEasyMode] = useState(true); // Track if easy mode is enabled - now true by default
  const youtubePlayerRef = useRef(null);
  const suggestionsRef = useRef(null);
  const clipTimerRef = useRef(null); // Ref for the timer to clean up properly
  const guessInputRef = useRef(null); // Reference to the guess input field
  const playerLoadTimerRef = useRef(null); // Ref for the YouTube player load timeout timer
  const playbackTimeoutRef = useRef(null); // Ref for playback timeout timer
  
  // Add helper function to detect mobile devices at the top level
  const isMobileDevice = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);
  
  // Helper function to normalize strings by removing apostrophes
  const normalizeString = useCallback((str) => {
    return str.toLowerCase().trim().replace(/[']/g, '');
  }, []);

  // Toggle easy mode
  const toggleEasyMode = useCallback(() => {
    setEasyMode(prevMode => !prevMode);
    // Reset played songs when switching modes
    setPlayedSongs([]);
    // Select a new song based on the new mode
    setTimeout(() => {
      // Using anonymous function to avoid the circular dependency
      const songPool = !easyMode ? 
        songs.filter(song => easySongs.includes(song.videoId)) : 
        songs;
      
      // Pick any random song from the new pool
      const randomIndex = Math.floor(Math.random() * songPool.length);
      const newSong = songPool[randomIndex];
      setCurrentSong(newSong);
      setPlayedSongs([newSong.videoId]);
      
      // Reset all other state variables
      setGuess('');
      setResult('');
      setShowAnswer(false);
      setIsPlaying(false);
      setIsWaitingForPlayback(false);
      setSuggestions([]);
      setShowSuggestions(false);
      setClipDuration(1);
      setAttemptsCount(0);
      setPlayingFullSong(false);
      setSelectedSuggestionIndex(-1);
      setPlaybackTimedOut(false);
    }, 0);
  }, [easyMode]);

  // Function to reload YouTube player when issues occur
  const reloadYouTubePlayer = useCallback(() => {
    if (playerLoadRetries < 3) {
      // Clear any existing timers
      if (clipTimerRef.current) {
        clearTimeout(clipTimerRef.current);
        clipTimerRef.current = null;
      }
      
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
        playbackTimeoutRef.current = null;
      }
      
      // Reset player state
      setIsPlaying(false);
      setIsWaitingForPlayback(false);
      setPlaybackTimedOut(false);
      
      // Increase retry count and regenerate player key
      setPlayerLoadRetries(prev => prev + 1);
      setPlayerKey(Date.now()); // Force YouTube component re-render with a new key
    } else {
      console.error("Maximum YouTube player load retries exceeded");
      // Reset the state to allow trying again after user interaction
      setIsPlaying(false);
      setIsWaitingForPlayback(false);
      setPlaybackTimedOut(true);
    }
  }, [playerLoadRetries]);

  // Define playSongClip before it's used in the useEffect hooks
  const playSongClip = useCallback(() => {
    try {
      // Clear any existing playback timeout
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
        playbackTimeoutRef.current = null;
      }
      
      setPlaybackTimedOut(false);
      
      if (!youtubePlayerRef.current || typeof youtubePlayerRef.current.playVideo !== 'function') {
        console.warn("YouTube player not ready when attempting to play, reloading player...");
        reloadYouTubePlayer();
        
        // Show a temporary message to the user
        setIsWaitingForPlayback(true);
        
        // Set a timeout to retry playing after a short delay
        setTimeout(() => {
          if (youtubePlayerRef.current && typeof youtubePlayerRef.current.playVideo === 'function') {
            // Retry playing if player is ready now
            youtubePlayerRef.current.seekTo(0);
            
            // On mobile, we need to ensure mute is off (some browsers require this)
            try {
              youtubePlayerRef.current.unMute();
              youtubePlayerRef.current.setVolume(100);
            } catch (e) {
              console.warn("Could not unmute player:", e);
            }
            
            youtubePlayerRef.current.playVideo();
          } else {
            // Reset state if still not ready after delay
            setIsWaitingForPlayback(false);
            setIsPlaying(false);
          }
        }, 1500);
        
        return;
      }
      
      setIsPlaying(true);
      setPlayingFullSong(false);
      setIsWaitingForPlayback(true); // Indicate we're waiting for playback to start
      
      // Seek to beginning to ensure we're starting from 0:00
      youtubePlayerRef.current.seekTo(0);
      
      // On mobile, we need to ensure mute is off (some browsers require this)
      try {
        youtubePlayerRef.current.unMute();
        youtubePlayerRef.current.setVolume(100);
      } catch (e) {
        console.warn("Could not unmute player:", e);
      }
      
      youtubePlayerRef.current.playVideo();
      
      // Set a timeout to detect if playback doesn't start within 3 seconds (reduced from 5)
      playbackTimeoutRef.current = setTimeout(() => {
        if (isWaitingForPlayback) {
          console.warn("Playback didn't start within 3 seconds, retrying...");
          // Instead of just reloading, attempt to play again first
          try {
            youtubePlayerRef.current.seekTo(0);
            youtubePlayerRef.current.playVideo();
            
            // Set another timeout to check if the second attempt works
            setTimeout(() => {
              if (isWaitingForPlayback) {
                console.warn("Second playback attempt failed, reloading player...");
                reloadYouTubePlayer();
              }
            }, 3000);
          } catch (error) {
            console.error("Error during retry attempt:", error);
            reloadYouTubePlayer();
          }
        }
      }, 3000); // Reduced from 5000 to 3000ms
      
    } catch (error) {
      console.error("Error playing song clip:", error);
      // Reset the state in case of an error
      setIsPlaying(false);
      setIsWaitingForPlayback(false);
      
      // Try to reload the player
      reloadYouTubePlayer();
    }
  }, [reloadYouTubePlayer, isWaitingForPlayback]); // Added isWaitingForPlayback to dependencies
  
  // Define playFullSong before it's potentially used in other functions
  const playFullSong = useCallback(() => {
    try {
      // Clear any existing playback timeout
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
        playbackTimeoutRef.current = null;
      }
      
      setPlaybackTimedOut(false);
      
      if (!youtubePlayerRef.current || typeof youtubePlayerRef.current.playVideo !== 'function') {
        console.warn("YouTube player not ready when attempting to play full song, reloading player...");
        reloadYouTubePlayer();
        
        // Show a temporary message to the user
        setIsWaitingForPlayback(true);
        
        // Set a timeout to retry playing after a short delay
        setTimeout(() => {
          if (youtubePlayerRef.current && typeof youtubePlayerRef.current.playVideo === 'function') {
            // Retry playing if player is ready now
            youtubePlayerRef.current.seekTo(0);
            
            // On mobile, we need to ensure mute is off (some browsers require this)
            try {
              youtubePlayerRef.current.unMute();
              youtubePlayerRef.current.setVolume(100);
            } catch (e) {
              console.warn("Could not unmute player:", e);
            }
            
            youtubePlayerRef.current.playVideo();
          } else {
            // Reset state if still not ready after delay
            setIsWaitingForPlayback(false);
            setIsPlaying(false);
            setPlayingFullSong(false);
          }
        }, 1500);
        
        return;
      }
      
      setIsPlaying(true);
      setPlayingFullSong(true);
      setIsWaitingForPlayback(true); // Indicate we're waiting for playback to start
      
      // Seek to beginning to ensure we're starting from 0:00
      youtubePlayerRef.current.seekTo(0);
      
      // On mobile, we need to ensure mute is off (some browsers require this)
      try {
        youtubePlayerRef.current.unMute();
        youtubePlayerRef.current.setVolume(100);
      } catch (e) {
        console.warn("Could not unmute player:", e);
      }
      
      youtubePlayerRef.current.playVideo();
      
      // Set a timeout to detect if full song playback doesn't start within 3 seconds
      playbackTimeoutRef.current = setTimeout(() => {
        if (isWaitingForPlayback) {
          console.warn("Full song playback didn't start within 3 seconds, retrying...");
          // Try again before giving up
          try {
            youtubePlayerRef.current.seekTo(0);
            youtubePlayerRef.current.playVideo();
            
            // Set another timeout to check if the second attempt works
            setTimeout(() => {
              if (isWaitingForPlayback) {
                console.warn("Second full song playback attempt failed, reloading player...");
                reloadYouTubePlayer();
                setPlayingFullSong(false);
              }
            }, 3000);
          } catch (error) {
            console.error("Error during retry attempt:", error);
            reloadYouTubePlayer();
            setPlayingFullSong(false);
          }
        }
      }, 3000);
      
    } catch (error) {
      console.error("Error playing full song:", error);
      // Reset the state in case of an error
      setIsPlaying(false);
      setIsWaitingForPlayback(false);
      setPlayingFullSong(false);
      
      // Try to reload the player
      reloadYouTubePlayer();
    }
  }, [reloadYouTubePlayer, isWaitingForPlayback]); // Added isWaitingForPlayback to dependencies
  
  // Function to check if YouTube player is ready
  const checkYouTubePlayerReady = useCallback(() => {
    if (!youtubePlayerRef.current || typeof youtubePlayerRef.current.playVideo !== 'function') {
      console.warn("YouTube player not ready after timeout, reloading...");
      reloadYouTubePlayer();
    } else {
      console.log("YouTube player is ready");
      // Reset retries on successful load
      setPlayerLoadRetries(0);
    }
  }, [reloadYouTubePlayer]);

  // Memoize selectRandomSong 
  const selectRandomSong = useCallback((isModeSwitching = false) => {
    // Determine which song collection to use based on mode
    const songPool = easyMode ? 
      songs.filter(song => easySongs.includes(song.videoId)) : 
      songs;
    
    if (isModeSwitching) {
      // If switching modes, just pick any random song from the new pool
      const randomIndex = Math.floor(Math.random() * songPool.length);
      const newSong = songPool[randomIndex];
      setCurrentSong(newSong);
      setPlayedSongs([newSong.videoId]);
    } else {
      // Filter out songs that have already been played
      const availableSongs = songPool.filter(song => !playedSongs.includes(song.videoId));
      
      // If all songs have been played, reset the played songs list
      if (availableSongs.length === 0) {
        setPlayedSongs([]);
        console.log(`All ${easyMode ? 'easy' : ''} songs have been played. Resetting song list.`);
        // Select a random song from the entire pool for the current mode
        const randomIndex = Math.floor(Math.random() * songPool.length);
        const newSong = songPool[randomIndex];
        setCurrentSong(newSong);
        // Start tracking played songs again with just this song
        setPlayedSongs([newSong.videoId]);
      } else {
        // Select a random song from the available songs
        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        const newSong = availableSongs[randomIndex];
        setCurrentSong(newSong);
        // Add this song to the played songs list
        setPlayedSongs(prev => [...prev, newSong.videoId]);
      }
    }
    
    // Reset all other state variables as before
    setGuess('');
    setResult('');
    setShowAnswer(false);
    setIsPlaying(false);
    setIsWaitingForPlayback(false);
    setSuggestions([]);
    setShowSuggestions(false);
    setClipDuration(1); // Reset clip duration to 1 second
    setAttemptsCount(0); // Reset attempts counter
    setPlayingFullSong(false); // Reset full song playback status
    setSelectedSuggestionIndex(-1); // Reset selected suggestion
    setPlaybackTimedOut(false); // Reset timeout state
    
    // Clear any existing timer
    if (clipTimerRef.current) {
      clearTimeout(clipTimerRef.current);
      clipTimerRef.current = null;
    }
    
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current);
      playbackTimeoutRef.current = null;
    }
    
    // Only focus on input for desktop devices - removed for mobile to prevent auto-scrolling
    if (!isMobileDevice()) {
      setTimeout(() => {
        if (guessInputRef.current) {
          guessInputRef.current.focus();
        }
      }, 100);
    }
  }, [isMobileDevice, playedSongs, easyMode]);

  // Memoize handleNextSong to prevent unnecessary re-renders and dependency issues
  const handleNextSong = useCallback(() => {
    // Stop playback if it's happening
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.pauseVideo();
    }
    
    // Clear any existing timer
    if (clipTimerRef.current) {
      clearTimeout(clipTimerRef.current);
      clipTimerRef.current = null;
    }
    
    selectRandomSong();
  }, [selectRandomSong]);
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only handle global keyboard events if they're not from an input field with content
      const isFromInput = (event.target.tagName.toLowerCase() === 'input' || 
                         event.target.tagName.toLowerCase() === 'textarea');
      
      const inputHasContent = isFromInput && event.target.value.trim().length > 0;
      
      // If Enter is pressed and the answer is shown, go to next song
      if (event.key === 'Enter' && showAnswer) {
        event.preventDefault(); // Prevent form submission
        handleNextSong();
        return;
      }
      
      // Play the song with Enter key if not already playing and (not typing in an input with content)
      if (event.key === 'Enter' && !showAnswer && !isPlaying && !inputHasContent) {
        event.preventDefault(); // Prevent form submission
        
        // Only try to play if we have a valid player reference
        if (youtubePlayerRef.current) {
          playSongClip();
        }
        return;
      }
      
      // Focus on the input field when the game starts, but only on desktop
      if (!showAnswer && !isPlaying && !isMobileDevice() && guessInputRef.current && !isFromInput) {
        guessInputRef.current.focus();
      }
    };
    
    // Add the event listener to the window object to ensure it works regardless of focus
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [showAnswer, isPlaying, handleNextSong, isMobileDevice, playSongClip]);
  
  // Focus input after playback stops - only for desktop or after user has interacted
  useEffect(() => {
    // Focus the input field after playback if not on mobile,
    // or if we're on mobile but the user has already started playing (clipDuration > 1)
    if (!isPlaying && !showAnswer && guessInputRef.current && 
        (!isMobileDevice() || clipDuration > 1)) {
      guessInputRef.current.focus();
    }
  }, [isPlaying, showAnswer, isMobileDevice, clipDuration]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (clipTimerRef.current) {
        clearTimeout(clipTimerRef.current);
        clipTimerRef.current = null;
      }
      
      if (playerLoadTimerRef.current) {
        clearTimeout(playerLoadTimerRef.current);
        playerLoadTimerRef.current = null;
      }
      
      if (playbackTimeoutRef.current) {
        clearTimeout(playbackTimeoutRef.current);
        playbackTimeoutRef.current = null;
      }
    };
  }, []);

  // Load initial song
  useEffect(() => {
    // Determine which song collection to use based on mode
    const songPool = easyMode ? 
      songs.filter(song => easySongs.includes(song.videoId)) : 
      songs;
      
    // On initial load, select a random song and add it to played songs
    const initialIndex = Math.floor(Math.random() * songPool.length);
    const initialSong = songPool[initialIndex];
    setCurrentSong(initialSong);
    setPlayedSongs([initialSong.videoId]);
    
    // Reset all other state variables
    setGuess('');
    setResult('');
    setShowAnswer(false);
    setIsPlaying(false);
    setIsWaitingForPlayback(false);
    setSuggestions([]);
    setShowSuggestions(false);
    setClipDuration(1);
    setAttemptsCount(0);
    setPlayingFullSong(false);
    setSelectedSuggestionIndex(-1);
    setPlaybackTimedOut(false);
    
    // Only focus on input for desktop devices
    if (!isMobileDevice()) {
      setTimeout(() => {
        if (guessInputRef.current) {
          guessInputRef.current.focus();
        }
      }, 100);
    }
  }, [isMobileDevice, easyMode]); // Add easyMode as a dependency

  // Handling the input field's keydown events separately
  const handleInputKeyDown = (e) => {
    try {
      // Only handle keyboard navigation when suggestions are visible
      if (showSuggestions && suggestions.length > 0) {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault(); // Prevent scrolling
            const nextIndex = selectedSuggestionIndex < suggestions.length - 1 ? selectedSuggestionIndex + 1 : 0;
            setSelectedSuggestionIndex(nextIndex);
            // Update input value with the selected suggestion
            setGuess(suggestions[nextIndex]);
            break;
            
          case 'ArrowUp':
            e.preventDefault(); // Prevent scrolling
            const prevIndex = selectedSuggestionIndex > 0 ? selectedSuggestionIndex - 1 : suggestions.length - 1;
            setSelectedSuggestionIndex(prevIndex);
            // Update input value with the selected suggestion
            setGuess(suggestions[prevIndex]);
            break;
            
          case 'Enter':
            // If a suggestion is selected, use it
            if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
              e.preventDefault(); // Prevent form submission
              handleSelectSuggestion(suggestions[selectedSuggestionIndex]);
            }
            break;
            
          case 'Escape':
            setShowSuggestions(false);
            setSelectedSuggestionIndex(-1);
            break;
            
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Error in keyboard handler:", error);
    }
  };

  const handleGuessChange = (e) => {
    const userInput = e.target.value;
    setGuess(userInput);
    
    // If on mobile, ensure input has focus once user starts typing
    if (isMobileDevice() && guessInputRef.current) {
      guessInputRef.current.focus();
    }
    
    // Filter songs for suggestions based on current mode
    if (userInput.trim()) {
      const normalizedInput = normalizeString(userInput);
      
      // Get the correct pool of songs based on the mode
      const songPool = easyMode ? 
        songs.filter(song => easySongs.includes(song.videoId)) : 
        songs;
      
      const filteredSuggestions = songPool
        .filter(song => 
          normalizeString(song.name).includes(normalizedInput)
        )
        .map(song => song.name);
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setSelectedSuggestionIndex(-1); // Reset the selected suggestion when input changes
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };
  
  const handleSelectSuggestion = (songName) => {
    setGuess(songName);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    // Focus back on input after selection, but only on desktop
    if (!isMobileDevice() && guessInputRef.current) {
      guessInputRef.current.focus();
    }
  };

  // Function to play one more second without guessing
  const playOneMoreSecond = () => {
    setClipDuration(prevDuration => prevDuration + 1);
    playSongClip();
  };

  const handleSubmitGuess = (e) => {
    e.preventDefault();
    
    if (!guess.trim()) {
      setResult('Please enter a guess');
      return;
    }
    
    const normalizedGuess = normalizeString(guess);
    const normalizedSongName = normalizeString(currentSong.name);
    
    if (normalizedGuess === normalizedSongName) {
      setResult('Correct! Well done!');
      setScore(score + 1);
      setShowAnswer(true);
      playFullSong(); // Play full song on correct guess
    } else {
      setResult(`Sorry, that's incorrect. Try again with an extra second of the song!`);
      setAttemptsCount(prevCount => prevCount + 1);
      setClipDuration(prevDuration => prevDuration + 1); // Add one more second
    }
    
    setShowSuggestions(false);
  };

  const handleGiveUp = () => {
    setResult('Revealed answer'); // Changed to avoid redundancy with the answer display
    setShowAnswer(true);
    playFullSong(); // Play full song when user gives up
  };

  const onPlayerReady = (event) => {
    try {
      youtubePlayerRef.current = event.target;
      
      // Clear any existing player load timer
      if (playerLoadTimerRef.current) {
        clearTimeout(playerLoadTimerRef.current);
      }
      
      // Ensure the player is fully initialized
      if (typeof youtubePlayerRef.current.playVideo !== 'function') {
        console.warn("YouTube player not fully initialized, setting check timer");
        // Set a timer to check if the player is ready after 3 seconds
        playerLoadTimerRef.current = setTimeout(checkYouTubePlayerReady, 3000);
      } else {
        // Reset retries on successful initialization
        setPlayerLoadRetries(0);
      }
    } catch (error) {
      console.error("Error in player initialization:", error);
      reloadYouTubePlayer();
    }
  };

  const onPlayerStateChange = (event) => {
    // YouTube state 1 means the video is playing
    if (event.data === 1) {
      console.log("YouTube player state: PLAYING");
      if (isWaitingForPlayback) {
        console.log("Playback has started after waiting");
        setIsWaitingForPlayback(false);
        
        // Clear playback timeout since playback has started
        if (playbackTimeoutRef.current) {
          clearTimeout(playbackTimeoutRef.current);
          playbackTimeoutRef.current = null;
        }
        
        // For clip playback only (not full song)
        if (!playingFullSong) {
          // Clear any existing timer first
          if (clipTimerRef.current) {
            clearTimeout(clipTimerRef.current);
          }
          
          // Set new timer based on clip duration
          clipTimerRef.current = setTimeout(() => {
            if (youtubePlayerRef.current && !playingFullSong) {
              youtubePlayerRef.current.pauseVideo();
              setIsPlaying(false);
            }
            clipTimerRef.current = null;
          }, clipDuration * 1000);
        }
      }
    } else if (event.data === -1) {
      // YouTube state -1 means unstarted
      console.log("YouTube player state: UNSTARTED");
      // On mobile, an unstarted state after we've attempted to play
      // might indicate a problem with autoplay permissions
      if (isWaitingForPlayback && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        console.log("Detected mobile unstarted state, attempting playback again");
        // Try to unmute and replay for mobile
        try {
          if (youtubePlayerRef.current) {
            youtubePlayerRef.current.unMute();
            youtubePlayerRef.current.setVolume(100);
            // Give it a short delay before trying to play again
            setTimeout(() => {
              youtubePlayerRef.current.playVideo();
            }, 500);
          }
        } catch (e) {
          console.warn("Error in mobile playback attempt:", e);
        }
      }
    } else if (event.data === 0) {
      // YouTube state 0 means ended
      console.log("YouTube player state: ENDED");
      if (playingFullSong) {
        setIsPlaying(false);
        setPlayingFullSong(false);
      }
    } else if (event.data === 2) {
      // YouTube state 2 means paused
      console.log("YouTube player state: PAUSED");
      if (!playingFullSong) {
        setIsPlaying(false);
      }
    } else if (event.data === 3) {
      // YouTube state 3 means buffering
      console.log("YouTube player state: BUFFERING");
    } else if (event.data === 5) {
      // YouTube state 5 means video cued
      console.log("YouTube player state: VIDEO CUED");
    }
  };

  // Add useEffect to detect mobile devices and handle initial interaction
  useEffect(() => {
    // Function to check if user is on a mobile device
    const isMobileDevice = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // If on mobile, we need to ensure a user interaction has happened
    if (isMobileDevice()) {
      console.log("Mobile device detected, adjusting player behavior");
      
      // For iOS, playback must be initiated by a user action
      const handleUserInteraction = () => {
        console.log("User interaction detected on mobile device");
        // Remove event listeners after first interaction
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      };
      
      // Add event listeners for user interaction
      document.addEventListener('touchstart', handleUserInteraction);
      document.addEventListener('click', handleUserInteraction);
      
      return () => {
        // Clean up event listeners
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('click', handleUserInteraction);
      };
    }
  }, []);
  
  // Add event to detect player loading errors
  useEffect(() => {
    // Set a timer to check if the player has loaded within 3 seconds
    playerLoadTimerRef.current = setTimeout(() => {
      if (!youtubePlayerRef.current || typeof youtubePlayerRef.current.playVideo !== 'function') {
        console.warn("YouTube player failed to initialize in 3 seconds, reloading...");
        reloadYouTubePlayer();
      }
    }, 3000);

    return () => {
      if (playerLoadTimerRef.current) {
        clearTimeout(playerLoadTimerRef.current);
      }
    };
  }, [playerKey, reloadYouTubePlayer]);

  if (!currentSong) return <div>Loading...</div>;

  return (
    <div className={`song-guesser ${isPlaying ? 'playing' : ''}`}>
      <div className="app-header">
        <h1>Revolution 1</h1>
        <p>Practice and test your knowledge of the Beatles core discography using the first second of a randomly selected song</p>
        
        <div className="game-controls">
          <div className="score-display">
            Score: {score}
          </div>
          
          <div className="mode-toggle">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={easyMode} 
                onChange={toggleEasyMode}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Easy Mode</span>
              <span className="toggle-hint">{easyMode ? '(50 popular songs)' : '(All songs)'}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="player-container">
        {/* YouTube player - always hidden regardless of playback state */}
        <div className="youtube-player hidden">
          <YouTube 
            videoId={currentSong.videoId}
            opts={{
              height: '0',
              width: '0',
              playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                modestbranding: 1,
                rel: 0,
                playsinline: 1, // Allow inline playback on mobile
                mute: 0,
              },
            }}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
            onError={(e) => {
              console.error("YouTube player error:", e);
              reloadYouTubePlayer();
            }}
            onPlaybackQualityChange={() => {
              console.log("Playback quality changed");
            }}
            onPlaybackRateChange={() => {
              console.log("Playback rate changed");
            }}
            key={playerKey} // Add key to force re-render
          />
        </div>

        <div className="player-buttons">
          <div className="play-button-container" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {!showAnswer ? (
              <button 
                className="play-button" 
                onClick={playSongClip} 
                disabled={isPlaying}
              >
                {isWaitingForPlayback ? 'LOADING...' : isPlaying && !playingFullSong ? `PLAYING ${clipDuration} SECOND${clipDuration !== 1 ? 'S' : ''}` : `PLAY ${clipDuration} SECOND${clipDuration !== 1 ? 'S' : ''}`}
              </button>
            ) : playingFullSong ? (
              <div style={{ width: '100%', maxWidth: '440px', display: 'flex', justifyContent: 'center' }}>
                <button 
                  type="button" 
                  className="stop-button" 
                  style={{
                    width: '100%',
                    margin: '0 auto',
                    alignSelf: 'center',
                    display: 'block',
                    position: 'relative',
                    left: '0',
                    right: '0'
                  }}
                  onClick={() => {
                    try {
                      if (!youtubePlayerRef.current || typeof youtubePlayerRef.current.pauseVideo !== 'function') {
                        console.warn("YouTube player not ready when attempting to stop, resetting state...");
                        setIsPlaying(false);
                        setPlayingFullSong(false);
                        return;
                      }
                      
                      youtubePlayerRef.current.pauseVideo();
                      setIsPlaying(false);
                      setPlayingFullSong(false);
                    } catch (error) {
                      console.error("Error stopping playback:", error);
                      // Reset the state in case of an error
                      setIsPlaying(false);
                      setPlayingFullSong(false);
                    }
                  }}
                >
                  STOP
                </button>
              </div>
            ) : null}
            
            {!showAnswer && clipDuration < 10 && (
              <button 
                className="play-more-button" 
                onClick={playOneMoreSecond} 
                disabled={isPlaying}
              >
                +1
              </button>
            )}
          </div>
          
          <div className="keyboard-tip-container">
            {playbackTimedOut ? (
              <p className="keyboard-tip error">Player timed out. Click Play to try again.</p>
            ) : !isPlaying && !showAnswer ? (
              <p className="keyboard-tip">press ENTER to play</p>
            ) : (showAnswer && !isPlaying) ? (
              <p className="keyboard-tip">press ENTER for next song</p>
            ) : null}
          </div>
          
          {/* Give Up button that shows up after playing the snippet */}
          {!showAnswer && clipDuration > 0 && attemptsCount === 0 && (
            <button 
              className="give-up-button" 
              onClick={handleGiveUp} 
            >
              GIVE UP
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmitGuess} className="guess-form">
        <div className="autocomplete-container" ref={suggestionsRef}>
          <input
            type="text"
            value={guess}
            onChange={handleGuessChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Start typing a song name..."
            disabled={showAnswer}
            className="guess-input"
            autoComplete="off"
            ref={guessInputRef}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="button-group">
          {!showAnswer ? (
            <>
              <button 
                type="submit" 
                disabled={showAnswer || !guess.trim()}
                className="submit-button"
                style={{width: '100%'}}
              >
                SUBMIT
              </button>
              {attemptsCount > 0 && !showAnswer && (
                <button 
                  type="button" 
                  onClick={handleGiveUp}
                  className="give-up-button"
                  style={{width: '100%'}}
                >
                  SHOW ANSWER
                </button>
              )}
            </>
          ) : (
            <button 
              onClick={handleNextSong} 
              className="next-button prominent-next"
              style={{width: '100%'}}
            >
              NEXT SONG
            </button>
          )}
        </div>
      </form>

      {result && (
        <div className={`result ${result.includes('Correct') ? 'correct' : (result.includes('incorrect') ? 'incorrect' : '')}`}>
          {result}
        </div>
      )}

      {showAnswer && (
        <div className="answer">
          <p>The song was: <strong>{currentSong.name}</strong></p>
        </div>
      )}
      
      <div className="footer">
        <p>Revolution 1, a 1-second Beatles song identification game, was developed by Ara Kharazian</p>
        <div className="footer-links">
          <a href="https://arakharazian.com" target="_blank" rel="noopener noreferrer">Personal Website</a> | 
          <a href="https://twitter.com/arakharazian" target="_blank" rel="noopener noreferrer">Twitter / X</a> | 
          <a href="https://linkedin.com/in/arakharazian" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
          <a href="https://substack.com/@arakharazian" target="_blank" rel="noopener noreferrer">Substack</a>
        </div>
      </div>
    </div>
  );
};

export default SongGuesser;