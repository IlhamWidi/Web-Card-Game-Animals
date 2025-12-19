const SOUNDS = {
  flip: '/sounds/flip.mp3',
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  click: '/sounds/click.mp3',
  victory: '/sounds/victory.mp3',
  background: '/sounds/background.mp3',
};

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isMuted: boolean = false;
  private audioContext: AudioContext | null = null;

  // Initialize sounds (call this on component mount)
  init() {
    if (typeof window === 'undefined') return;

    // Initialize Web Audio API
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    Object.entries(SOUNDS).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.sounds.set(key, audio);
    });

    // Load mute state from localStorage
    const savedMuteState = localStorage.getItem('sound-muted');
    if (savedMuteState) {
      this.isMuted = savedMuteState === 'true';
    }
  }

  // Generate beep sound using Web Audio API
  private playBeep(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext || this.isMuted) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.error('Error generating sound:', error);
    }
  }

  // Play a sound by key
  play(soundKey: keyof typeof SOUNDS) {
    if (this.isMuted) return;
    
    // Try to play the audio file first
    const sound = this.sounds.get(soundKey);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // If audio file fails, use Web Audio API fallback
        this.playFallbackSound(soundKey);
      });
    } else {
      // Use Web Audio API fallback
      this.playFallbackSound(soundKey);
    }
  }

  // Fallback sound generation using Web Audio API
  private playFallbackSound(soundKey: string) {
    switch (soundKey) {
      case 'flip':
        this.playBeep(400, 0.1, 'sine');
        break;
      case 'correct':
        // Success sound: ascending notes
        this.playBeep(523, 0.1, 'sine'); // C5
        setTimeout(() => this.playBeep(659, 0.1, 'sine'), 100); // E5
        setTimeout(() => this.playBeep(784, 0.2, 'sine'), 200); // G5
        break;
      case 'wrong':
        // Error sound: descending notes
        this.playBeep(400, 0.15, 'square');
        setTimeout(() => this.playBeep(300, 0.15, 'square'), 150);
        break;
      case 'click':
        this.playBeep(800, 0.05, 'sine');
        break;
      case 'victory':
        // Victory fanfare
        this.playBeep(523, 0.15, 'sine'); // C5
        setTimeout(() => this.playBeep(659, 0.15, 'sine'), 150); // E5
        setTimeout(() => this.playBeep(784, 0.15, 'sine'), 300); // G5
        setTimeout(() => this.playBeep(1047, 0.3, 'sine'), 450); // C6
        break;
      default:
        this.playBeep(440, 0.1, 'sine');
    }
  }

  // Toggle mute state
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound-muted', this.isMuted.toString());
    }
    return this.isMuted;
  }

  // Get current mute state
  getMuteState() {
    return this.isMuted;
  }
}

// Export a singleton instance
export const soundManager = new SoundManager();
