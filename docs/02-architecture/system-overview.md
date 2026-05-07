# System Overview

## High-Level Architecture

The Ms. Pac-Man Build follows a modular, component-based architecture designed for clarity, maintainability, and testability. The system is divided into the following core subsystems:

### 1. Game Loop and Timing
- **Main Game Loop**: Uses `requestAnimationFrame` for 60fps rendering
- **Time Step System**: Fixed-update logic with variable render interpolation
- **Input Handling**: Keyboard events processed and buffered for responsive controls

### 2. Entity Component System (ECS)
- **Entities**: Pac-Man, Ghosts (4), Fruit, Dots, Energizers
- **Components**: Position, Velocity, Sprite, State, AI, Collision
- **Systems**: Movement, Rendering, AI, Collision, Audio, Score

### 3. Rendering System
- **Canvas Renderer**: HTML5 Canvas with 2D context
- **Sprite Sheet Management**: Efficient loading and rendering of game sprites
- **Layering**: Background maze -> entities -> UI overlay
- **Scaling**: Integer scaling to preserve pixel art integrity

### 4. Game Logic Systems
- **Movement System**: Grid-based navigation with turn buffering
- **Collision System**: Precise AABB collision detection for walls, entities
- **AI System**: Ghost behavior implementation with mode switching
- **Scoring System**: Point calculation and high score tracking
- **Level System**: Maze loading, dot counting, level progression

### 5. Audio System
- **Sound Effects**: Web Audio API for precise timing
- **Music**: Background tracks that change with game state
- **Audio Manager**: Handles loading, playing, and mixing of audio assets

### 6. Persistence System
- **LocalStorage Wrapper**: High score saving and loading
- **Fallback**: Session-only storage if LocalStorage unavailable

### 7. User Interface
- **HUD**: Score, lives, level display
- **Screens**: Start, pause, game over, intermission
- **Responsive Design**: Adapts to different screen sizes while maintaining aspect ratio

## Data Flow

1. **Input Layer**: Keyboard events -> Input Manager -> Buffered commands
2. **Game State Update**: 
   - Movement System processes commands -> Updates entity positions/velocities
   - AI System updates ghost states and targets
   - Collision System resolves interactions (Pac-Man-dot, Pac-Man-ghost, etc.)
   - Scoring System updates points and lives
   - Level System checks for level completion
3. **Rendering**: 
   - Rendering System draws maze background
   - Entity System draws all sprites at current positions
   - UI System overlays HUD and active screens
4. **Audio**: 
   - Audio System triggers sounds based on game events
   - Music System updates based on game state (e.g., frightened mode)

## Key Design Decisions

### 1. TypeScript for Type Safety
- Provides compile-time checking for game logic
- Improves developer experience with IDE autocompletion
- Helps prevent runtime errors in complex systems like ghost AI

### 2. Entity-Component-System Approach
- Separates concerns cleanly (data vs behavior)
- Makes it easy to add new entity types (e.g., power-ups in future experiments)
- Facilitates unit testing of individual systems

### 3. Fixed Time Step Game Loop
- Ensures deterministic gameplay for testing and consistency
- Handles variable frame rates gracefully
- Critical for replicating exact original timing

### 4. Canvas-Based Rendering
- Provides pixel-level control necessary for authentic sprite rendering
- Performs well on both desktop and mobile browsers
- Avoids DOM complexity for high-frequency updates

### 5. Modular Audio with Web Audio API
- Allows precise timing of sound effects
- Supports multiple simultaneous sounds
- Provides ability to create procedural audio if needed

## Component Responsibilities

### Movement System
- Updates Pac-Man position based on input and current direction
- Implements turn buffering (store input direction until next tile intersection)
- Handles grid alignment and wall collision detection
- Manages tunnel wrapping (left-right)

### Collision System
- Checks Pac-Man against wall tiles for blocking movement
- Detects Pac-Man overlap with dots, energizers, fruit
- Detects Pac-Man overlap with ghosts (mode-dependent outcome)
- Handles ghost-wall collision for AI navigation

### AI System
- For each ghost: determines current mode (chase/scatter/frightened/eyes)
- Calculates target tile based on mode and personality
- Implements pathfinding or simple direction selection toward target
- Handles mode timers and transitions
- Manages ghost house entrance/exit logic

### Rendering System
- Draws static maze background from precomputed tile map
- Renders Pac-Man with mouth animation based on movement state
- Renders ghosts with color, eye state, and mode-dependent appearance
- Draws dots, energizers, fruit as appropriate
- Renders UI elements (score, lives, level)
- Handles screen scaling and centering

### Audio System
- Plays dot eating sound (with pitch variation)
- Plays energizer activation sound
- Plays ghost eating sound (increasing pitch for multiple ghosts)
- Plays Pac-Man death sound
- Plays intermission music
- Toggles background music based on game state

### Persistence System
- Loads high score from LocalStorage on startup
- Saves high score when game ends if higher than current
- Provides fallback to session storage for prototyping

## File Organization

```
src/
├── game/                 # Core game logic
│   ├── entities/         # Entity definitions and factories
│   │   ├── pacman.ts
│   │   ├── ghost.ts
│   │   ├── fruit.ts
│   │   └── dot.ts
│   ├── systems/          # Game logic systems
│   │   ├── movement.ts
│   │   ├── collision.ts
│   │   ├── ai.ts
│   │   ├── rendering.ts
│   │   ├── score.ts
│   │   └── level.ts
│   ├── audio/            # Audio management
│   │   ├── audio-manager.ts
│   │   └── sounds/
│   ├── utils/            # Game-specific utilities
│   │   ├── constants.ts
│   │   ├── directions.ts
│   │   └── grid.ts
│   └── game.ts           # Main game class
├── ui/                   # User interface components
│   ├── hud.ts
│   ├── screens/
│   │   ├── start-screen.ts
│   │   ├── pause-screen.ts
│   │   ├── game-over-screen.ts
│   │   └── intermission-screen.ts
│   └── ui-manager.ts
├── assets/               # Game assets (sprites, sounds)
│   ├── sprites/
│   │   ├── pacman.png
│   │   ├── ghosts.png
│   │   ├── fruit.png
│   │   └── maze.png
│   └── audio/
├── index.html            # Entry point
├── main.ts               # Application bootstrap
└── styles.css            # Basic styling

tests/
├── unit/                 # Unit tests for individual systems
│   ├── movement.test.ts
│   ├── collision.test.ts
│   ├── ai.test.ts
│   └── score.test.ts
└── integration/          # Integration tests
    └── game-flow.test.ts
```

## Integration Points

### Agent-os Workflow Integration
- Each subsystem maps to potential agent-os tasks:
  - Movement System -> TASK-0002 (core Pac-Man movement)
  - Ghost AI System -> TASK-0003 (ghost AI behaviors)
  - Rendering System -> Separate task for visual fidelity
  - Audio System -> Task for sound implementation
  - UI System -> Task for menus and HUD
  - Persistence System -> Task for high score saving
- Verification gates align with acceptance criteria
- Handoffs document completed subsystems and interfaces

### Testing Boundaries
- Unit tests focus on individual system logic (movement, collision, AI)
- Integration tests verify system interactions (full game scenarios)
- End-to-end validation through manual playthrough and automated demos

## Scalability and Extensibility

While focused on faithful recreation, the architecture allows for:
- Easy addition of new entity types through ECS
- Simple replacement of rendering backend (Canvas to WebGL if needed)
- Straightforward audio system expansion
- Clear extension points for experimental features (kept in separate branches)
- Straightforward porting to other platforms due to core logic isolation

## Performance Considerations

- **Rendering**: Only dirty rectangles redrawn if optimization needed
- **Physics**: Simple grid-based movement avoids complex physics calculations
- **AI**: Ghost algorithms are O(1) per ghost
- **Memory**: Object pooling for frequently created/destroyed entities (dots)
- **Audio**: Sound reuse through buffer sources where applicable

This architecture provides a solid foundation for implementing an authentic Ms. Pac-Man recreation while maintaining code quality, testability, and extensibility.