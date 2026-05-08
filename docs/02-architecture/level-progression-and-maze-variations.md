# Level Progression and Maze Variations

## Overview
This document describes the level progression system and maze variations for Ms. Pac-Man. Unlike the original Pac-Man which used the same maze for all levels, Ms. Pac-Man features four different mazes that rotate throughout the game, along with increasing difficulty through faster ghost speeds, shorter frightened durations, and other gameplay changes.

## Maze Variations
Ms. Pac-Man features four distinct mazes that cycle throughout the game:

### Maze 1 (Levels 1-2)
- The classic maze layout most similar to original Pac-Man
- Two warp tunnels (left-right) in the center
- Four ghost house exits (one for each ghost)
- Standard dot and power pellet placement

### Maze 2 (Levels 3-5)
- Modified layout with different corridor arrangements
- Same warp tunnel mechanics
- Different ghost house configuration
- Altered pellet and fruit paths

### Maze 3 (Levels 6-8)
- Further modified maze with unique pathways
- Different dead-end patterns
- Varied power pellet placement affecting strategy

### Maze 4 (Levels 9-12)
- Most complex maze layout
- Most challenging navigation paths
- Different fruit spawn locations

After level 12, the mazes repeat starting with Maze 1 again, but with increased difficulty.

## Level Progression System
Each level increases in difficulty through several mechanisms:

### Ghost Speed Increases
- Base speed increases with each level
- Different ghosts may have different speed curves
- Speeds typically increase more sharply in early levels, then plateau
- In later levels, ghosts may become faster than Pac-Man

### Frightened Mode Duration
- Decreases as levels progress:
  - Levels 1-2: 6 seconds
  - Levels 3-4: 5 seconds
  - Levels 5-6: 4 seconds
  - Levels 7-8: 3 seconds
  - Levels 9-12: 2 seconds
  - Levels 13+: 0 seconds (ghosts turn dark blue and reverse instantly without being edible)

### Ghost Behavior Changes
- Blinky (Red) becomes more aggressive ("Cruise Elroy") after certain dots eaten:
  - Level 1: After 20 dots
  - Level 2: After 30 dots
  - Level 3: After 40 dots
  - Level 4: After 50 dots
  - Level 5+: After 60 dots (or similar progression)
- When in Cruise Elroy mode, Blinky moves faster and uses different targeting

### Maze Timing Changes
- Dot eating speed may affect level progression timing
- Some versions have timing-based elements that change with level

### Fruit Values and Appearance
- As described in fruit documentation, fruit values increase with level
- Appearance timing may change (appears faster or stays shorter)
- In very high levels, fruit may be worth less or disappear faster

## Level Data Structure
Each level can be defined by a configuration object:

```typescript
interface LevelConfig {
  number: number;
  mazeId: 1 | 2 | 3 | 4; // Which maze to use
  ghostSpeeds: {
    blinky: number; // pixels per frame
    pinky: number;
    inky: number;
    clyde: number;
  };
  frightenedDuration: number; // seconds
  cruiseElroyThresholds: {
    first: number; // dots eaten for first speed increase
    second?: number; // dots eaten for second speed increase (optional)
  };
  fruit1: {
    type: FruitType;
    points: number;
    appearAfterDots: number; // or time-based
    duration: number; // seconds visible
  };
  fruit2: {
    type: FruitType;
    points: number;
    appearAfterDots: number;
    duration: number; // seconds visible
  } | null; // null for levels 1-2
  specialRules: {
    ghostHouseExitDelay: number[];
    // other level-specific rules
  };
}
```

### Level Manager System
```typescript
class LevelManager {
  private currentLevel: number = 1;
  private currentMazeId: number = 1;
  private dotsEatenInLevel: number = 0;
  private totalDots: number; // total dots in current maze
  
  private levelConfigs: LevelConfig[]; // Predefined level configurations
  
  constructor() {
    this.levelConfigs = this.loadLevelConfigs();
  }
  
  getCurrentLevelConfig(): LevelConfig {
    // Returns config for current level, using defaults for high levels
    const index = Math.min(this.currentLevel - 1, this.levelConfigs.length - 1);
    return this.levelConfigs[index];
  }
  
  update(dotsEaten: number): void {
    this.dotsEatenInLevel = dotsEaten;
    
    // Check for level completion
    if (dotsEaten >= this.totalDots) {
      this.completeLevel();
    }
    
    // Check for Cruise Elroy thresholds
    const config = this.getCurrentLevelConfig();
    this.updateGhostSpeedsBasedOnDots(config);
  }
  
  private completeLevel(): void {
    this.currentLevel++;
    this.updateMazeForLevel();
    this.resetLevelState();
    // Trigger level complete events
  }
  
  private updateMazeForLevel(): void {
    // Cycle through mazes 1-4
    const mazeIndex = ((this.currentLevel - 1) % 4) + 1;
    this.currentMazeId = mazeIndex;
    // Load the appropriate maze data
  }
  
  private loadLevelConfigs(): LevelConfig[] {
    // Return predefined configurations for levels 1-12
    // For levels > 12, use level 12 config with increasing difficulty
  }
}
```

## Difficulty Scaling
Beyond level 12, the game continues with increasing difficulty:

### Infinite Level Pattern
- Mazes repeat: 1, 2, 3, 4, 1, 2, 3, 4, ...
- Ghost speeds continue to increase (up to a maximum)
- Frightened duration stays at 0 seconds (no edible ghosts)
- Fruit remains at maximum value (5000 points for key)
- Dot eating may become required faster for level completion

### Maximum Difficulty
- Eventually reaches a "kill screen" or maximum difficulty where:
  - Ghosts move at maximum speed
  - No frightened mode
  - Perfect play required to survive
  - Score continues to increase until integer overflow or lives exhausted

## Maze Data Representation
Mazes are represented as 2D arrays similar to our current implementation:

```typescript
// Example maze structure (28x31 for standard Pac-Man maze)
export const MAZE_1: number[][] = [
  // 0 = empty, 1 = wall, 2 = dot, 3 = power pellet, 4 = ghost house, etc.
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  // ... rest of maze
];

// Different mazes have different values in the same positions
export const MAZE_2: number[][] = [ /* different layout */ ];
export const MAZE_3: number[][] = [ /* different layout */ ];
export const MAZE_4: number[][] = [ /* different layout */ ];
```

### Special Tiles
- Warp tunnel entrances/exits: Special handling for horizontal wrapping
- Ghost house: Area where ghosts start and return to when eaten
- Ghost house doors: Specific tiles that ghosts can enter/exit
- Power pellet locations: Usually 4 corners of the maze
- Fruit spawn locations: Specific to each maze (often 2 possible positions per fruit)

## Implementation Details

### Maze Loading System
- Each maze loaded from a 2D array definition
- Maze data includes:
  - Wall positions (for collision)
  - Dot positions (initial state)
  - Power pellet positions
  - Ghost house boundaries
  - Fruit spawn locations
  - Pac-Man start position
  - Ghost start positions

### Level Progression Flow
1. Game starts at level 1, loads Maze 1
2. As Pac-Man eats dots, level manager tracks progress
3. When all dots eaten, level completes:
   - Score bonus awarded based on remaining timer
   - Level increments
   - New maze loaded (based on level number)
   - Ghost speeds increased
   - Frightened duration decreased
   - Fruit values updated
   - Positions reset
4. Continue until lives run out

### Files to Implement
- `src/game/systems/level-manager.ts` - Level progression logic
- `src/game/mazes/maze-1.ts` through `maze-4.ts` - Maze definitions
- `src/game/utils/maze-loader.ts` - Utility for loading and accessing maze data
- `src/game/constants/level-constants.ts` - Level progression constants, speed tables, etc.
- `src/game/entities/level-data.ts` - Interface definitions for level/maze data

## Dependencies
- Maze system (for wall/dot checking)
- Ghost AI system (for applying speed changes)
- Score system (for level completion bonuses)
- Fruit system (for configuring fruit per level)
- Audio system (for level complete sounds)
- Rendering system (for displaying level number)

## Integration Points
- Updated by game loop with dot count each frame
- Provides current maze data to collision and rendering systems
- Communicates ghost speed changes to Ghost AI system
- Notifies score system of level completion
- Works with fruit system to configure level-specific fruit
- Provides level number for UI display

## Notes
- Original arcade Ms. Pac-Man used ROM-based maze data
- Some home versions used procedural maze generation or simpler variations
- The four mazes in Ms. Pac-Man were designed to prevent pattern-based strategies
- Difficulty increases were designed to make the game challenging but fair for skilled players
- Kill screen occurs due to integer overflow in level counter or drawing routines (not implemented in this version)