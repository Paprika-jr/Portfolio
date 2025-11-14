import { useState, useEffect, useCallback, useRef } from 'react';
import { Howl } from 'howler';

export const useSound = () => {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('portfolio-sound');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const soundsRef = useRef({});

  useEffect(() => {
    localStorage.setItem('portfolio-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  // Create a sound using Web Audio API (for generated sounds like guitar strings)
  const playTone = useCallback(
    (frequency, duration = 0.3, type = 'sine') => {
      if (!soundEnabled) return;

      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        // Envelope for natural sound decay
        gainNode.gain.value = 0.15;
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + duration
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        console.error('Audio playback error:', error);
      }
    },
    [soundEnabled]
  );

  // Play guitar string by frequency
  const playString = useCallback(
    (frequency) => {
      playTone(frequency, 0.5, 'sine');
    },
    [playTone]
  );

  // Play chord (multiple notes)
  const playChord = useCallback(
    (frequencies) => {
      if (!soundEnabled) return;

      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          playTone(freq, 0.8, 'sine');
        }, index * 50); // Slight stagger for natural strum
      });
    },
    [soundEnabled, playTone]
  );

  // Click sound
  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    playTone(800, 0.05, 'square');
  }, [soundEnabled, playTone]);

  // Success sound (happy chord)
  const playSuccess = useCallback(() => {
    if (!soundEnabled) return;
    const cMajorChord = [261.63, 329.63, 392.00]; // C, E, G
    playChord(cMajorChord);
  }, [soundEnabled, playChord]);

  // Error sound (dissonant)
  const playError = useCallback(() => {
    if (!soundEnabled) return;
    playTone(200, 0.2, 'sawtooth');
  }, [soundEnabled, playTone]);

  // Load and play audio file (for custom sounds)
  const playFile = useCallback(
    (src) => {
      if (!soundEnabled) return;

      // Create or reuse Howl instance
      if (!soundsRef.current[src]) {
        soundsRef.current[src] = new Howl({
          src: [src],
          volume: 0.5,
        });
      }

      soundsRef.current[src].play();
    },
    [soundEnabled]
  );

  return {
    soundEnabled,
    toggleSound,
    playString,
    playChord,
    playClick,
    playSuccess,
    playError,
    playTone,
    playFile,
  };
};
