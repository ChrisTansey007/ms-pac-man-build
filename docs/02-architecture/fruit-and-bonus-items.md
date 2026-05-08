# Fruit and Bonus Items

## Overview
The fruit and bonus item system manages the special items that appear in the maze during gameplay, providing bonus points and adding variety to each level. This document describes the implementation of fruit spawning, behavior, and scoring.

## Fruit Types and Values
Each level features specific bonus items that appear twice per level (except for the first two levels):

| Level | Fruit/Bonus Item | Points |
|-------|------------------|--------|
| 1     | Cherry           | 100    |
| 2     | Strawberry       | 300    |
| 3     | Orange           | 500    |
| 4     | Apple            | 700    |
| 5     | Melon            | 1000   |
| 6     | Galaxian Ship    | 2000   |
| 7     | Bell             | 3000   |
| 8     | Key              | 5000   |
| 9-12  | Key              | 5000   |
| 13+   | Key              | 5000   |

## Spawning Mechanics
Fruit appears twice per level under specific conditions:

### First Fruit
- Appears after Pac-Man eats 70 dots (or after a fixed time if dots are eaten slowly)
- Appears in one of two predetermined locations (usually near the center of the maze)
- Remains visible for a fixed duration (typically 9-10 seconds)
- If not eaten, disappears and counts as "missed"

### Second Fruit
- Appears after Pac-Man eats 170 dots (or after a fixed time)
- Same location rules as first fruit
- Same duration and disappearance rules

### Special Cases
- Levels 1 and 2: Only one fruit appears (after 70 dots)
- In later levels, fruit may appear faster or for shorter durations
- Some versions have different timing based on level progression

## Fruit Behavior
- Fruit appears suddenly in its designated location
- Remains stationary (does not move)
- Flashes during the last second before disappearing
- Makes a sound when appearing and when consumed
- If Pac-Man eats the fruit, points are awarded immediately
- If fruit disappears uneaten, no points are awarded

## Implementation Details

### Fruit Entity Class
```typescript
class Fruit {
  // Position and state
  x: number; // pixel position
  y: number; // pixel position
  visible: boolean; // whether fruit is currently visible
  type: FruitType; // cherry, strawberry, etc.
  points: number; // point value
  
  // Timing
  spawnTime: number; // game time when fruit should appear
  disappearTime: number; // game time when fruit should vanish
  flashStartTime: number; // when flashing begins (last second)
  
  // Animation
  flashState: boolean; // for flashing effect
  flashInterval: number; // milliseconds between flash toggles
}
```

### Fruit Manager System
```typescript
class FruitManager {
  private fruits: Fruit[] = []; // Currently active fruits (max 1 or 2)
  private dotsEaten: number = 0;
  private level: number = 1;
  private firstFruitSpawned: boolean = false;
  private secondFruitSpawned: boolean = false;
  
  update(deltaTime: number, dotsEaten: number, level: number): void {
    this.dotsEaten = dotsEaten;
    this.level = level;
    
    // Check for first fruit spawn
    if (!this.firstFruitSpawned && this.dotsEaten >= 70) {
      this.spawnFruitForLevel(this.level, true); // true = first fruit
      this.firstFruitSpawned = true;
    }
    
    // Check for second fruit spawn (levels 3+)
    if (!this.secondFruitSpawned && this.dotsEaten >= 170 && this.level >= 3) {
      this.spawnFruitForLevel(this.level, false); // false = second fruit
      this.secondFruitSpawned = true;
    }
    
    // Update existing fruits (check timers, handle flashing)
    this.updateFruits(deltaTime);
  }
  
  private spawnFruitForLevel(level: number, isFirst: boolean): void {
    const fruitType = this.getFruitTypeForLevel(level);
    const points = this.getFruitPoints(fruitType);
    
    // Determine spawn position (usually one of two fixed locations)
    const spawnPosition = this.getFruitSpawnPosition(isFirst);
    
    const fruit = new Fruit(
      spawnPosition.x,
      spawnPosition.y,
      true, // visible
      fruitType,
      points,
      // ... timing calculations
    );
    
    this.fruits.push(fruit);
    // Trigger fruit appear sound
  }
  
  private updateFruits(deltaTime: number): void {
    // Check if fruits should disappear
    // Handle flashing effect
    // Remove fruits that have disappeared
  }
  
  checkFruitCollision(pacManX: number, pacManY: number): number | null {
    // Check if Pac-Man collided with any visible fruit
    // If yes, return points and mark fruit as eaten
    // Return null if no collision
  }
  
  private getFruitTypeForLevel(level: number): FruitType {
    // Map level to fruit type based on table above
  }
  
  private getFruitPoints(type: FruitType): number {
    // Return point value for fruit type
  }
  
  private getFruitSpawnPosition(isFirst: boolean): {x: number, y: number} {
    // Return predetermined spawn coordinates
    // Usually two possible positions, chosen based on level or random
  }
}
```

### Collision Detection
- Fruit collision checked each frame using Pac-Man's position
- Collision radius typically half a tile (10 pixels with TILE_SIZE=20)
- When collision detected:
  1. Award points to score manager
  2. Play fruit consumption sound
  3. Mark fruit as eaten (invisible)
  4. Trigger any visual effects (sparkle, etc.)

### Visual Implementation
- Fruit sprites from spritesheet
- Positioned at tile centers (aligned with grid)
- Flashing effect: toggle visibility every 100-150ms during last second
- Scale consistent with other entities (based on TILE_SIZE)

### Files to Implement
- `src/game/entities/fruit.ts` - Fruit entity class
- `src/game/systems/fruit-manager-system.ts` - Fruit spawning and management logic
- `src/game/utils/fruit-utils.ts` - Helper functions for fruit logic
- `src/game/constants/fruit-constants.ts` - Fruit types, values, timings, spawn positions

## Dependencies
- Maze system (for valid spawn positions)
- Score manager (for awarding points)
- Audio system (for fruit appear/eat sounds)
- Rendering system (for drawing fruit sprites)
- Game state (for current level and dot count)

## Integration Points
- Updated by game loop each frame with dot count and level
- Checks collision with Pac-Man each frame
- Communicates with score system when fruit is eaten
- Works with audio system for sound effects
- Rendered by the rendering system each frame

## Notes
- Original arcade machine had fixed spawn times rather than dot-count based
- Some implementations use timers instead of dot counts for consistency
- Fruit positions are specific to each maze layout
- In Ms. Pac-Man, fruit can appear in different locations each level (unlike original Pac-Man)