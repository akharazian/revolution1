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
    
    // Focus on input after a short delay to ensure DOM is updated
    setTimeout(() => {
      if (guessInputRef.current) {
        guessInputRef.current.focus();
      }
    }, 100);
  }, []);

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
      
      // Focus on the input field when the game starts
      if (!showAnswer && !isPlaying && guessInputRef.current) {
        guessInputRef.current.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAnswer, isPlaying, handleNextSong]);
  
  // Focus input after playback stops
  useEffect(() => {
    if (!isPlaying && !showAnswer && guessInputRef.current) {
      guessInputRef.current.focus();
    }
  }, [isPlaying, showAnswer]);

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
    // Focus back on input after selection
    if (guessInputRef.current) {
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
    setResult(`The song was "${currentSong.name}"`);
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
      if (isWaitingForPlayback && !playingFullSong) {
        // Video has started playing, start the timer now
        setIsWaitingForPlayback(false);
        
        // Clear playback timeout since playback has started
        if (playbackTimeoutRef.current) {
          clearTimeout(playbackTimeoutRef.current);
          playbackTimeoutRef.current = null;
        }
        
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
    } else if (event.data === -1) {
      // YouTube state -1 means unstarted
      console.log("YouTube player unstarted state detected");
    } else if (event.data === 0) {
      // YouTube state 0 means ended
      if (playingFullSong) {
        setIsPlaying(false);
        setPlayingFullSong(false);
      }
    } else if (event.data === 2) {
      // YouTube state 2 means paused
      if (!playingFullSong) {
        setIsPlaying(false);
      }
    } else if (event.data === 3) {
      // YouTube state 3 means buffering
      console.log("YouTube player buffering...");
    } else if (event.data === 5) {
      // YouTube state 5 means video cued
      console.log("YouTube player video cued");
    }
  };

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
            youtubePlayerRef.current.playVideo();
            setIsPlaying(true);
            setPlayingFullSong(true);
          } else {
            // Reset state if still not ready after delay
            setIsWaitingForPlayback(false);
            setIsPlaying(false);
          }
        }, 1500);
        
        return;
      }
      
      youtubePlayerRef.current.seekTo(0);
      youtubePlayerRef.current.playVideo();
      setIsPlaying(true);
      setPlayingFullSong(true);
      
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

  // Options for the hidden player
  const hiddenOpts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

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
        <p>Practice and test your knowledge of the Beatles core discography using the first second of every song</p>
        
        <div className="score-display">
          Score: {score}
        </div>
      </div>

      <div className="player-container">
        {/* Hidden YouTube player for audio playback */}
        <div className="youtube-hidden">
          <YouTube 
            videoId={currentSong.videoId}
            opts={hiddenOpts}
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
              {isWaitingForPlayback ? 'LOADING...' : isPlaying && !playingFullSong ? `PLAYING ${clipDuration}s` : `PLAY ${clipDuration}s`}
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
          <div className="keyboard-tip-container">
            <p className="keyboard-tip">press ENTER for next song</p>
          </div>
          
          <div className="button-group">
            {playingFullSong ? (
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
            ) : (
              <button 
                type="button" 
                className="play-full-song-button" 
                style={{width: '100%'}}
                onClick={playFullSong} 
                disabled={isPlaying}
              >
                {isPlaying ? 'PLAYING...' : 'PLAY FULL SONG'}
              </button>
            )}
            <button 
              onClick={handleNextSong} 
              className="next-button"
              style={{width: '100%'}}
            >
              NEXT SONG
            </button>
          </div>
        </div>
      )}
      
      <div className="footer">
        <p>This project was developed by Ara Kharazian</p>
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