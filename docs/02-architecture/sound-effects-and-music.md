# Sound Effects and Music

## Overview
The audio system manages all sound effects and music for the Ms. Pac-Man game. This includes the iconic Pac-Man chomping sound, ghost sounds, power pellet effects, fruit sounds, intermission music, and game status audio.

## Audio Components

### Sound Effects (SFX)
1. **Pac-Man Chomping**: 
   - Continuous sound when Pac-Man is moving
   - Changes pitch slightly for variety
   - Stops when Pac-Man dies or is stationary

2. **Ghost Sounds**:
   - Normal chase: "siren" sound that increases in pitch as ghosts get closer
   - Frightened: Unique "eerie" sound when ghosts are blue
   - Eaten: "gobble" sound when Pac-Man eats a ghost
   - Returning to house: Different sound for eyes returning

3. **Dot/Power Pellet Consumption**:
   - Dot: Short "chomp" or "munch" sound
   - Power pellet: Distinct "power-up" sound

4. **Fruit/Bonus Item**:
   - Appear: Short "appear" sound
   - Consumption: Higher pitched "collect" sound

5. **Game Events**:
   - Extra life: Special chime or jingle
   - Level complete: Fanfare or victory tune
   - Game over: Descending melody or "wah-wah" sound
   - Ready!: Short "ready" sound when level starts
   - Death: Pac-Man "death" sound effect

### Music
1. **Intermission Music**: Played between levels (after certain levels)
2. **Level Start Music**: Short tune when level begins
3. **Background Music**: Optional continuous background track (can be disabled)
4. **Attract Mode Music**: Played when game is idle (not strictly necessary for implementation)

## Technical Implementation

### Audio System Architecture
```
┌─────────────────┐
│   Audio Manager │
└─────────────────┘
        │
    ┌───┴───┐
    │       │
┌─────┐ ┌────────────┐
│ SFX │ │   Music    │
└─────┘ └────────────┘
    │       │
┌───────────┐ ┌────────────────────┐
│   Sounds  │ │   Tracks/Loops     │
└───────────┘ └────────────────────┘
```

### Audio Manager Class
```typescript
class AudioManager {
  private sfxVolume: number = 0.7;
  private musicVolume: number = 0.5;
  private muted: boolean = false;
  
  // Audio contexts and buffers
  private audioContext: AudioContext;
  private sfxBuffer: Map<string, AudioBuffer>;
  private musicTracks: Map<string, AudioBufferSourceNode>;
  
  // Currently playing sounds
  private loopingSounds: Map<string, AudioBufferSourceNode>;
  
  constructor() {
    // Initialize audio context
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.sfxBuffer = new Map();
    this.musicTracks = new Map();
    this.loopingSounds = new Map();
    
    // Preload audio assets
    this.loadAudioAssets();
  }
  
  // Load and decode audio files
  private async loadAudioAssets(): Promise<void> {
    const audioFiles = {
      // SFX
      'pacman_chomp': 'assets/audio/pacman-chomp.wav',
      'ghost_siren': 'assets/audio/ghost-siren.wav',
      'ghost_frightened': 'assets/audio/ghost-frightened.wav',
      'ghost_eat': 'assets/audio/ghost-eat.wav',
      'dot': 'assets/audio/dot.wav',
      'power_pellet': 'assets/audio/power-pellet.wav',
      'fruit_appear': 'assets/audio/fruit-appear.wav',
      'fruit_eat': 'assets/audio/fruit-eat.wav',
      'extra_life': 'assets/audio/extra-life.wav',
      'level_complete': 'assets/audio/level-complete.wav',
      'game_over': 'assets/audio/game-over.wav',
      'ready': 'assets/audio/ready.wav',
      'death': 'assets/audio/death.wav',
      // Music
      'intermission': 'assets/audio/intermission.wav',
      'level_start': 'assets/audio/level-start.wav',
      // ... more
    };
    
    for (const [key, path] of Object.entries(audioFiles)) {
      const buffer = await this.loadAudioFile(path);
      this.sfxBuffer.set(key, buffer);
    }
  }
  
  private async loadAudioFile(path: string): Promise<AudioBuffer> {
    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    return await this.audioContext.decodeAudioData(arrayBuffer);
  }
  
  // Play sound effect
  playSFX(key: string, options: { loop?: boolean; volume?: number; rate?: number } = {}): void {
    if (this.muted) return;
    
    const buffer = this.sfxBuffer.get(key);
    if (!buffer) {
      console.warn(`SFX not found: ${key}`);
      return;
    }
    
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = options.loop ?? false;
    source.playbackRate.value = options.rate ?? 1.0;
    
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = options.volume ?? this.sfxVolume;
    
    source.connect(gainNode).connect(this.audioContext.destination);
    
    if (options.loop) {
      this.loopingSounds.set(key, source);
    }
    
    source.start(0);
  }
  
  // Stop looping sound
  stopSFX(key: string): void {
    const source = this.loopingSounds.get(key);
    if (source) {
      source.stop(0);
      this.loopingSounds.delete(key);
    }
  }
  
  // Music control
  playMusic(key: string, loop: boolean = true): void {
    // Implementation similar to SFX but for music tracks
  }
  
  stopMusic(key: string): void {
    // Stop music track
  }
  
  // Volume control
  setSFXVolume(volume: number): void { this.sfxVolume = volume; }
  setMusicVolume(volume: number): void { this.musicVolume = volume; }
  setMuted(muted: boolean): void { this.muted = muted; }
}
```

### Audio Integration Points
- **MovementSystem**: Triggers pacman_chomp when Pac-Man is moving
- **Ghost AI System**: Triggers ghost_siren, ghost_frightened, ghost_eat based on ghost state
- **Collision System**: Triggers dot, power_pellet sounds when consumed
- **Score Manager**: Triggers fruit_eat, extra_life, level_complete
- **Game Loop**: Triggers ready, death, game_over, intermission

### Audio Files Required
- Place in `/assets/audio/` directory:
  - PAC-MAN chomp variations (looping)
  - Ghost siren (normal and frightened)
  - Ghost eat sound
  - Dot and power pellet sounds
  - Fruit appearance and consumption
  - Extra life chime
  - Level complete fanfare
  - Game over sound
  - Ready! sound
  - Death sound
  - Intermission music
  - Level start music

### Files to Implement
- `src/game/systems/audio-system.ts` - Main audio manager
- `src/game/utils/audio-utils.ts` - Helper functions for audio loading and playback
- `src/game/constants/audio-constants.ts` - Audio volume levels, etc.

## Dependencies
- Game systems (for triggering audio events)
- Asset loading system (to fetch audio files)
- User settings (for volume/mute controls)

## Browser Compatibility
- Uses Web Audio API (supported in all modern browsers)
- Fallback to HTML5 Audio for older browsers if needed
- Proper handling of audio context resumption after user interaction (required by browsers)

## Performance Considerations
- Preload all audio assets during game initialization
- Use AudioBuffer for low-latency SFX playback
- Limit concurrent sound effects to prevent audio clipping
- Implement sound pooling for frequently used effects (like dot chomping)