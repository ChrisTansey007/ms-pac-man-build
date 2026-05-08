# Ghost AI and Behavior

## Overview
The ghost AI system controls the behavior of the four ghosts (Blinky, Pinky, Inky, Clyde) in Ms. Pac-Man. Each ghost has a unique personality and behavior pattern that combines to create challenging gameplay.

## Ghost Personalities
1. **Blinky (Red)**: "Chaser" - Directly pursues Pac-Man
2. **Pinky (Pink)**: "Ambusher" - Tries to position ahead of Pac-Man's direction
3. **Inky (Cyan)**: "Fickle" - Uses Pac-Man's position and Blinky's position to calculate target
4. **Clyde (Orange)**: "Afraid" - Alternates between chasing and fleeing when too close to Pac-Man

## AI States
Each ghost can be in one of several states:
- **Chase**: Actively pursuing Pac-Man using their unique targeting algorithm
- **Scatter**: Moving to their respective corner of the maze
- **Frightened**: Blue, reversing direction and moving slowly after Pac-Man eats a power pellet
- **Eaten**: Eyes returning to the ghost house after being eaten
- **Leaving House**: Initial exit from the ghost house at level start

## Targeting Algorithms

### Blinky (Red)
- Target: Pac-Man's current tile
- Simple direct pursuit

### Pinky (Pink)
- Target: The tile four positions ahead of Pac-Man's current direction
- If Pac-Man is facing up, the target is four tiles up and left (due to original bug)
- Attempts to ambush Pac-Man by getting ahead of him

### Inky (Cyan)
- Target: 
  1. Calculate vector from Blinky to the tile two positions ahead of Pac-Man
  2. Double that vector
  3. Add to Pac-Man's position
- Complex targeting that uses both Pac-Man and Blinky's positions

### Clyde (Orange)
- Target: 
  - If Clyde is more than 8 tiles away from Pac-Man: Pac-Man's position (chase)
  - If Clyde is within 8 tiles: His scatter corner (bottom-left)
- Alternates between chasing and scattering based on distance

## State Machine
Each ghost follows this state transition pattern:
```
Leaving House → Chase → Scatter → Chase → Scatter → Chase → ... 
                                    ↓
                             (Power Pellet Eaten)
                                    ↓
                                Frightened → Eaten → Leaving House
```

### Scatter Timings
- Scatter periods occur at fixed intervals during each level:
  - First scatter: 7 seconds
  - Second scatter: 7 seconds
  - Third scatter: 5 seconds
  - Fourth scatter: 5 seconds
  - After that: Chase mode indefinitely

### Frightened Mode
- Duration decreases with each level:
  - Level 1: 6 seconds
  - Level 2: 6 seconds
  - Level 3: 5 seconds
  - Level 4: 5 seconds
  - Level 5+: 0 seconds (no frightened mode, ghosts turn dark blue and reverse instantly)
- Flashing occurs during the last 3 seconds of frightened mode

## Ghost House Mechanics
- Ghost house has two doors: main exit and side entrance
- Ghosts start in the house and must exit one by one with delays:
  - Blinky: Immediately
  - Pinky: After Blinky leaves
  - Inky: After Pinky leaves (but only if Blinky is out)
  - Clyde: After Inky leaves (but only if Blinky and Pinky are out)
- When eaten, ghosts return as eyes to the center of the ghost house, then regenerate

## Collision and Behavior Rules
- Ghosts reverse direction when:
  - Entering frightened mode
  - Leaving frightened mode (unless eaten)
  - Ghost house exit/entry (specific tiles)
- Ghosts cannot reverse direction 180 degrees during normal chase/scatter (except when turning corners)
- In frightened mode, ghosts move randomly but with a bias away from Pac-Man's direction

## Implementation Details

### Ghost Class Properties
```typescript
class Ghost {
  // Position and movement
  x: number; // pixel position
  y: number; // pixel position
  direction: Direction; // current movement direction
  speed: number; // pixels per frame
  
  // Identity
  name: string; // "Blinky", "Pinky", "Inky", "Clyde"
  color: string; // RGB or named color
  
  // AI State
  state: GhostState; // Chase, Scatter, Frightened, Eaten, LeavingHouse
  targetX: number; // target tile position (grid)
  targetY: number;
  
  // Timing
  scatterTimer: number; // time remaining in current scatter
  frightenedTimer: number; // time remaining in frightened mode
  
  // House-related
  inHouse: boolean;
  houseExitDelay: number; // delay before exiting house
}
```

### Movement System Integration
- Ghosts use the same MovementSystem as Pac-Man but with AI-generated desired direction
- Collision checking uses the same wall detection
- Ghosts are slightly faster than Pac-Man in chase mode (level dependent)
- Speed increases with each level

### Files to Implement
- `src/game/entities/ghost.ts` - Ghost class definition
- `src/game/systems/ghost-ai-system.ts` - AI decision making for all ghosts
- `src/game/utils/ghost-utils.ts` - Helper functions for targeting and state management
- `src/game/constants/ghost-constants.ts` - Ghost-specific constants (speeds, timings, etc.)

## Dependencies
- Maze system (for wall checking and tunnel wrapping)
- Game state (for level, power pellet status)
- Pac-Man position (for targeting)
- Audio system (for ghost sounds)