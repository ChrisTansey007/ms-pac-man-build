# Game Loop and Rendering System

## Overview
The game loop is the core of the Ms. Pac-Man game, responsible for updating game state and rendering frames at a consistent 60 FPS. This document describes the architecture and implementation of the game loop and rendering system.

## Technical Details

### Game Loop Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   Input Handling│───▶│   Game Update    │───▶│    Rendering     │
│  (Keyboard/JS)  │    │ (60 FPS fixed)   │    │   (Canvas/WebGL) │
└─────────────────┘    └──────────────────┘    └──────────────────┘
        ▲                      │                       │
        │                      ▼                       ▼
        │              ┌──────────────┐         ┌──────────────┐
        │              │  Game State  │         │  Render      │
        └──────────────┤  (Pac-Man,   │         │  Commands    │
                       │  Ghosts,     │         └──────────────┘
                       │  Maze, etc.) │
                       └──────────────┘
```

### Frame Rate Management
- Target: 60 FPS (16.67ms per frame)
- Fixed time step for game updates to ensure consistent physics
- Variable time step for rendering (interpolation between states)
- Uses `requestAnimationFrame` for browser-based rendering

### Core Game Loop Implementation
```typescript
class GameLoop {
  private lastTimestamp: number = 0;
  private lag: number = 0;
  private readonly MS_PER_UPDATE = 16.67; // 60 FPS
  
  constructor(
    private update: (dt: number) => void,
    private render: (interpolation: number) => void
  ) {}
  
  start(timestamp: number = 0): void {
    this.lastTimestamp = timestamp;
    requestAnimationFrame(this.loop.bind(this));
  }
  
  private loop(timestamp: number): void {
    const elapsed = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    this.lag += elapsed;
    
    // Fixed time step updates
    while (this.lag >= this.MS_PER_UPDATE) {
      this.update(this.MS_PER_UPDATE / 1000); // Convert to seconds
      this.lag -= this.MS_PER_UPDATE;
    }
    
    // Render with interpolation
    const interpolation = this.lag / this.MS_PER_UPDATE;
    this.render(interpolation);
    
    requestAnimationFrame(this.loop.bind(this));
  }
}
```

### Rendering System
#### Canvas-Based Rendering
- Uses HTML5 Canvas API for 2D rendering
- Separate rendering layers for:
  - Background (maze walls, dots)
  - Entities (Pac-Man, ghosts, fruits)
  - UI (score, lives, ready text)
  - Overlays (pause, game over)

#### Sprite Rendering
- Entity spritesheet containing:
  - Pac-Man animations (4 directions × 3 frames)
  - Ghost animations (4 directions × 2 frames × 4 ghosts + frightened states)
  - Fruit sprites
  - UI elements
- Sprite scaling based on TILE_SIZE constant

#### Rendering Pipeline
1. Clear canvas
2. Render maze background (walls as solid color, paths as black)
3. Render dots and power pellets
4. Render fruit/bonus items (when active)
5. Render ghosts (with proper layering)
6. Render Pac-Man
7. Render UI overlay (score, lives, level)
8. Render special effects (flashing, invincibility)

### Performance Considerations
- Offscreen caching of static maze elements
- Dirty rectangle rendering optimization (only redraw changed areas)
- Sprite batching for entity rendering
- RequestAnimationFrame synchronization with display refresh

### Integration Points
- Receives input from InputSystem
- Updates game state via GameStateManager
- Renders based on interpolated game state
- Communicates with AudioSystem for sound effects
- Triggers events for UI updates

## Files to Implement
- `src/game/systems/game-loop.ts` - Main game loop controller
- `src/game/systems/rendering-system.ts` - Rendering engine
- `src/game/entities/sprite-manager.ts` - Sprite loading and management
- `src/game/utils/canvas-utils.ts` - Canvas helper functions

## Dependencies
- InputSystem (for controls)
- MovementSystem (for Pac-Man movement)
- GhostAI (for ghost behavior)
- GameState (for current state)
- AudioSystem (for sound effects)