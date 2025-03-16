import React, { useState, useEffect, useRef, useCallback } from 'react';
import YouTube from 'react-youtube';
import songs from '../data/songs';
import './SongGuesser.css';

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
  
  // Memoize selectRandomSong
  const selectRandomSong = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    setCurrentSong(songs[randomIndex]);
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
    
    // Focus on input after a short delay to ensure DOM is updated, but only on desktop
    if (!isMobileDevice()) {
      setTimeout(() => {
        if (guessInputRef.current) {
          guessInputRef.current.focus();
        }
      }, 100);
    }
  }, [isMobileDevice]);

  // Enhanced function to reload YouTube player
  const reloadYouTubePlayer = useCallback(() => {
    // Only retry if we haven't exceeded the maximum retries (5)
    if (playerLoadRetries < 5) {
      console.log(`Reloading YouTube player, retry ${playerLoadRetries + 1}`);
      
      // Clean up any existing timers
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
      // If Enter is pressed and the answer is shown, go to next song
      if (event.key === 'Enter' && showAnswer) {
        handleNextSong();
      }
      
      // Focus on the input field when the game starts, but only on desktop
      if (!showAnswer && !isPlaying && !isMobileDevice() && guessInputRef.current) {
        guessInputRef.current.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAnswer, isPlaying, handleNextSong, isMobileDevice]);
  
  // Focus input after playback stops
  useEffect(() => {
    if (!isPlaying && !showAnswer && !isMobileDevice() && guessInputRef.current) {
      guessInputRef.current.focus();
    }
  }, [isPlaying, showAnswer, isMobileDevice]);

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
    selectRandomSong();
  }, [selectRandomSong]);

  // Handle keyboard navigation for autocomplete
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
      } else if (e.key === 'Enter' && !guess.trim() && !isPlaying && !showAnswer) {
        // If Enter is pressed with empty input field, play the song snippet
        e.preventDefault(); // Prevent form submission
        
        // Only try to play if we have a valid player reference
        if (youtubePlayerRef.current) {
          playSongClip();
        }
      }
    } catch (error) {
      console.error("Error in keyboard handler:", error);
    }
  };

  const handleGuessChange = (e) => {
    const userInput = e.target.value;
    setGuess(userInput);
    
    // Filter songs for suggestions
    if (userInput.trim()) {
      const filteredSuggestions = songs
        .filter(song => 
          song.name.toLowerCase().includes(userInput.toLowerCase())
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
    
    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedSongName = currentSong.name.toLowerCase().trim();
    
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

  // Modify playSongClip to better handle mobile playback
  const playSongClip = () => {
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
      
      // Set a timeout to detect if playback doesn't start within 5 seconds
      playbackTimeoutRef.current = setTimeout(() => {
        if (isWaitingForPlayback) {
          console.warn("Playback didn't start within timeout, reloading player...");
          reloadYouTubePlayer();
        }
      }, 5000);
      
    } catch (error) {
      console.error("Error playing song clip:", error);
      // Reset the state in case of an error
      setIsPlaying(false);
      setIsWaitingForPlayback(false);
      
      // Try to reload the player
      reloadYouTubePlayer();
    }
  };

  const playFullSong = () => {
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
            setIsPlaying(true);
            setPlayingFullSong(true);
            setIsWaitingForPlayback(false); // Reset waiting state once playback starts
          } else {
            // Reset state if still not ready after delay
            setIsWaitingForPlayback(false);
            setIsPlaying(false);
          }
        }, 1000); // Reduced delay for better user experience
        
        return;
      }
      
      youtubePlayerRef.current.seekTo(0);
      
      // On mobile, ensure mute is off and volume is up
      try {
        youtubePlayerRef.current.unMute();
        youtubePlayerRef.current.setVolume(100);
      } catch (e) {
        console.warn("Could not unmute player:", e);
      }
      
      // Force player to be visible to iOS (but still visually hidden via CSS)
      const playerElement = document.querySelector('iframe[src*="youtube"]');
      if (playerElement) {
        playerElement.style.position = 'absolute';
        playerElement.style.opacity = '0';
        playerElement.style.pointerEvents = 'none';
        playerElement.style.zIndex = '-1';
        playerElement.style.width = '1px';
        playerElement.style.height = '1px';
      }
      
      // Play the video
      youtubePlayerRef.current.playVideo();
      setIsPlaying(true);
      setPlayingFullSong(true);
      setIsWaitingForPlayback(true); // Indicate we're waiting for playback to start
      
      // Set a timeout to detect if playback doesn't start within 5 seconds
      playbackTimeoutRef.current = setTimeout(() => {
        if (isWaitingForPlayback) {
          console.warn("Full song playback didn't start within timeout, reloading player...");
          reloadYouTubePlayer();
        }
      }, 5000);
      
    } catch (error) {
      console.error("Error playing full song:", error);
      // Reset the state in case of an error
      setIsPlaying(false);
      setPlayingFullSong(false);
      setIsWaitingForPlayback(false);
      
      // Try to reload the player
      reloadYouTubePlayer();
    }
  };

  if (!currentSong) return <div>Loading...</div>;

  return (
    <div className={`song-guesser ${isPlaying ? 'playing' : ''}`}>
      <div className="app-header">
        <h1>Revolution 1</h1>
        <p>Practice and test your knowledge of the Beatles core discography using the first second of a randomly selected song</p>
        
        <div className="score-display">
          Score: {score}
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
          <div className="play-button-container">
            <button 
              className="play-button" 
              onClick={playSongClip} 
              disabled={isPlaying || showAnswer}
            >
              {isWaitingForPlayback ? 'LOADING...' : isPlaying && !playingFullSong ? `PLAYING ${clipDuration} SECOND${clipDuration !== 1 ? 'S' : ''}` : `PLAY ${clipDuration} SECOND${clipDuration !== 1 ? 'S' : ''}`}
            </button>
            
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
            ) : !isPlaying && !showAnswer && (
              <p className="keyboard-tip">press ENTER to play</p>
            )}
          </div>
          
          {/* New Give Up button that shows up after playing the snippet */}
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
          
          <div className="button-group answer-buttons">
            <button 
              onClick={handleNextSong} 
              className="next-button prominent-next"
              style={{width: '100%'}}
            >
              NEXT SONG
            </button>
            
            {!playingFullSong ? (
              <button 
                type="button" 
                className="play-full-song-button" 
                style={{width: '100%'}}
                onClick={playFullSong} 
                disabled={isPlaying}
              >
                {isPlaying ? 'PLAYING...' : 'PLAY FULL SONG'}
              </button>
            ) : (
              <button 
                type="button" 
                className="stop-button" 
                style={{width: '100%'}}
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
            )}
          </div>
          
          <div className="keyboard-tip-container">
            <p className="keyboard-tip">press ENTER for next song</p>
          </div>
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