import { useCallback, useRef, useState, useEffect } from "react";

type SoundType = "softBeep" | "warningBeep" | "alarm" | "siren" | "win" | "lose";

export const useGameSounds = () => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem("gameSoundMuted");
    return saved === "true";
  });
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sirenIntervalRef = useRef<number | null>(null);
  const activeOscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    localStorage.setItem("gameSoundMuted", String(isMuted));
  }, [isMuted]);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((
    frequency: number,
    duration: number,
    volume: number,
    type: OscillatorType = "sine",
    modulation?: { freq: number; depth: number }
  ) => {
    if (isMuted) return;

    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    if (modulation) {
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(modulation.freq, ctx.currentTime);
      lfoGain.gain.setValueAtTime(modulation.depth, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      lfo.start();
      lfo.stop(ctx.currentTime + duration);
    }

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);

    return oscillator;
  }, [isMuted, getAudioContext]);

  const playSoftBeep = useCallback(() => {
    playTone(440, 0.15, 0.3, "sine");
  }, [playTone]);

  const playWarningBeep = useCallback(() => {
    playTone(600, 0.2, 0.5, "square");
    setTimeout(() => playTone(500, 0.2, 0.5, "square"), 150);
  }, [playTone]);

  const playAlarm = useCallback(() => {
    playTone(800, 0.1, 0.7, "sawtooth");
    setTimeout(() => playTone(600, 0.1, 0.7, "sawtooth"), 100);
    setTimeout(() => playTone(800, 0.1, 0.7, "sawtooth"), 200);
    setTimeout(() => playTone(600, 0.1, 0.7, "sawtooth"), 300);
  }, [playTone]);

  const playSiren = useCallback(() => {
    if (isMuted) return;
    
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = "sawtooth";
    gainNode.gain.setValueAtTime(0.9, ctx.currentTime);
    
    // Siren sweep effect
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.5);
    oscillator.frequency.linearRampToValueAtTime(400, ctx.currentTime + 1);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    activeOscillatorRef.current = oscillator;
    
    // Loop the siren
    sirenIntervalRef.current = window.setInterval(() => {
      if (activeOscillatorRef.current) {
        const now = ctx.currentTime;
        activeOscillatorRef.current.frequency.setValueAtTime(400, now);
        activeOscillatorRef.current.frequency.linearRampToValueAtTime(800, now + 0.5);
        activeOscillatorRef.current.frequency.linearRampToValueAtTime(400, now + 1);
      }
    }, 1000);
  }, [isMuted, getAudioContext]);

  const stopSiren = useCallback(() => {
    if (sirenIntervalRef.current) {
      clearInterval(sirenIntervalRef.current);
      sirenIntervalRef.current = null;
    }
    if (activeOscillatorRef.current) {
      try {
        activeOscillatorRef.current.stop();
      } catch (e) {
        // Already stopped
      }
      activeOscillatorRef.current = null;
    }
  }, []);

  const playWin = useCallback(() => {
    stopSiren();
    if (isMuted) return;
    
    // Victory fanfare
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.3, 0.6, "sine"), i * 150);
    });
    
    // Triumphant chord
    setTimeout(() => {
      playTone(523, 0.8, 0.4, "sine");
      playTone(659, 0.8, 0.4, "sine");
      playTone(784, 0.8, 0.4, "sine");
    }, 600);
  }, [isMuted, playTone, stopSiren]);

  const playLose = useCallback(() => {
    stopSiren();
    if (isMuted) return;
    
    // Sad trombone effect
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1.5);
    
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 1.5);
  }, [isMuted, getAudioContext, stopSiren]);

  const playSound = useCallback((type: SoundType) => {
    switch (type) {
      case "softBeep":
        playSoftBeep();
        break;
      case "warningBeep":
        playWarningBeep();
        break;
      case "alarm":
        playAlarm();
        break;
      case "siren":
        playSiren();
        break;
      case "win":
        playWin();
        break;
      case "lose":
        playLose();
        break;
    }
  }, [playSoftBeep, playWarningBeep, playAlarm, playSiren, playWin, playLose]);

  const playSoundForChances = useCallback((remainingChances: number) => {
    if (remainingChances >= 8) {
      playSound("softBeep");
    } else if (remainingChances >= 5) {
      playSound("warningBeep");
    } else if (remainingChances >= 2) {
      playSound("alarm");
    } else if (remainingChances === 1) {
      playSound("siren");
    }
  }, [playSound]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    stopSiren();
  }, [stopSiren]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSiren();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopSiren]);

  return {
    isMuted,
    toggleMute,
    playSound,
    playSoundForChances,
    stopSiren,
  };
};
