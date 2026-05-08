# Score Tracking and Lives System

## Overview
The score tracking and lives system manages the player's points, remaining lives, and level progression rewards. This document describes how points are awarded for various actions, how lives are managed, and how extra lives are granted.

## Score Values
Points are awarded for the following actions:

### Dot Consumption
- Regular dot: 10 points
- Power pellet: 50 points

### Ghost Consumption (during frightened mode)
- First ghost: 200 points
- Second ghost: 400 points
- Third ghost: 800 points
- Fourth ghost: 1600 points
- Pattern resets if Pac-Man loses a life or if the frightened mode ends

### Fruit/Bonus Items
Each level features a bonus item that appears twice per level (except first two levels):
- Level 1: Cherry (100 points)
- Level 2: Strawberry (300 points)
- Level 3: Orange (500 points)
- Level 4: Apple (700 points)
- Level 5: Melon (1000 points)
- Level 6: Galaxian ship (2000 points)
- Level 7: Bell (3000 points)
- Level 8: Key (5000 points)
- Levels 9-12: Key (5000 points) - repeats
- Levels 13+: Key (5000 points) - continues

### Level Completion Bonus
- Bonus timer: Starts at 5000 and counts down to 0 as Pac-Man eats dots
- When level is completed, the remaining bonus timer value is added to score
- Bonus timer decreases by 20 points per dot eaten (after the first 30 dots)

## Lives System
- Starting lives: 3 (configurable)
- Extra life awarded at: 10,000 points (default, configurable)
- Maximum lives: Typically capped at 5 or 6 (configurable)
- Life lost when: Pac-Man collides with a ghost (unless ghost is frightened and eaten)
- Pac-Man resets to starting position after losing a life
- All ghosts return to their starting positions (in ghost house) when Pac-Man loses a life
- Game over when: Lives reach 0

## Score Display
- Score displayed as 6-digit number (with leading zeros)
- Lives displayed as icon rows (typically 3 lives = 3 Pac-Man icons)
- Current level displayed

## Implementation Details

### ScoreManager Class
```typescript
class ScoreManager {
  private score: number;
  private lives: number;
  private level: number;
  private pointsForExtraLife: number;
  private nextExtraLife: number;
  
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.pointsForExtraLife = 10000;
    this.nextExtraLife = this.pointsForExtraLife;
  }
  
  addPoints(points: number): void {
    this.score += points;
    this.checkForExtraLife();
  }
  
  private checkForExtraLife(): void {
    while (this.score >= this.nextExtraLife) {
      this.lives++;
      this.nextExtraLife += this.pointsForExtraLife;
      // Trigger extra life event
    }
  }
  
  loseLife(): void {
    this.lives--;
    // Reset level state if needed
  }
  
  getScore(): number { return this.score; }
  getLives(): number { return this.lives; }
  getLevel(): number { return this.level; }
  
  // Called when level is completed
  completeLevel(): void {
    this.level++;
    // Reset level-specific scores if needed
  }
}
```

### Bonus Timer
- Starts at 5000 at beginning of level
- Decreases by 20 points per dot eaten after the first 30 dots
- Minimum value: 0
- Added to score upon level completion

### Fruit Spawning
- First fruit appears after Pac-Man eats 70 dots (or fixed time)
- Second fruit appears after Pac-Man eats 170 dots (or fixed time)
- Fruit remains for a fixed time (typically 9-10 seconds)
- If not eaten, fruit disappears

### Files to Implement
- `src/game/systems/score-manager.ts` - Score and lives management
- `src/game/entities/fruit.ts` - Fruit/bonus item entity
- `src/game/utils/score-utils.ts` - Helper functions for score calculations
- `src/game/constants/score-constants.ts` - Score values, bonus timings, etc.

## Dependencies
- Game state (for level, dot count)
- Pac-Man position (for collision with fruit/ghosts)
- Audio system (for scoring sounds)
- Rendering system (for displaying score, lives, level)