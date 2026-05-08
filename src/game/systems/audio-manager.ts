// Audio Manager for Pac-Man sound effects and music
export class AudioManager {
  private sfx: Map<string, HTMLAudioElement> = new Map();
  private music: HTMLAudioElement | null = null;
  private musicVolume: number = 0.5;
  private sfxVolume: number = 0.7;

  constructor() {
    // Set default volumes
    this.setSFXVolume(0.7);
    this.setMusicVolume(0.5);
  }

  /**
   * Load a sound effect from a URL and store it by key
   * @param key Identifier for the sound effect
   * @param url URL to the audio file
   */
  loadSFX(key: string, url: string): void {
    const audio = new Audio(url);
    audio.volume = this.sfxVolume;
    audio.preload = 'auto';
    this.sfx.set(key, audio);
  }

  /**
   * Load background music from a URL
   * @param url URL to the music file
   */
  loadMusic(url: string): void {
    if (this.music) {
      this.music.pause();
      this.music = null;
    }
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = this.musicVolume;
    this.music = audio;
  }

  /**
   * Play a sound effect by key
   * @param key Identifier of the sound effect to play
   */
  playSFX(key: string): void {
    const audio = this.sfx.get(key);
    if (audio) {
      // Clone the audio node to allow overlapping sounds
      const clone = audio.cloneNode();
      clone.volume = this.sfxVolume;
      clone.play().catch(e => console.warn(`Failed to play sound effect ${key}:`, e));
    } else {
      console.warn(`Sound effect not found: ${key}`);
    }
  }

  /**
   * Start playing background music
   */
  playMusic(): void {
    if (this.music) {
      this.music.play().catch(e => console.warn('Failed to play music:', e));
    }
  }

  /**
   * Stop background music
   */
  stopMusic(): void {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
    }
  }

  /**
   * Set the volume for sound effects (0.0 to 1.0)
   * @param volume Volume level
   */
  setSFXVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    // Update existing SFX audio elements
    this.sfx.forEach(audio => {
      audio.volume = this.sfxVolume;
    });
  }

  /**
   * Set the volume for background music (0.0 to 1.0)
   * @param volume Volume level
   */
  setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.music) {
      this.music.volume = this.musicVolume;
    }
  }

  /**
   * Check if a sound effect is loaded
   * @param key Identifier to check
   * @returns true if loaded
   */
  hasSFX(key: string): boolean {
    return this.sfx.has(key);
  }

  /**
   * Check if music is loaded
   * @returns true if music is loaded
   */
  hasMusic(): boolean {
    return this.music !== null;
  }
}