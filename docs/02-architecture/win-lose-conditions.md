# Win/Lose Conditions

## Overview
This document describes the conditions under which the player wins or loses a life, completes a level, or finishes the game in Ms. Pac-Man.

## Winning Conditions
In the classic arcade Ms. Pac-Man, there is no traditional "win" condition where the game ends with a victory screen. Instead, the game continues indefinitely until the player loses all lives. However, we can define several achievement conditions:

### Level Completion
- **Condition**: Pac-Man eats all dots in the current maze
- **Result**: 
  - Level increments
  - Player advances to next level (with increased difficulty)
  - Score bonus awarded based on remaining timer (if implemented)
  - Maze changes according to level progression (every 4 levels)
  - Fruit values increase
  - Ghost speeds increase, frightened duration decreases
  - Pac-Man and ghosts reset to starting positions

### High Score Achievement
- While not a game-ending condition, achieving a high score is a common goal
- Score can continue to increase indefinitely (until integer overflow in original arcade)
- Extra lives awarded at score thresholds (e.g., every 10,000 points)

### Perfect Play
- Completing a level without losing a life
- Eating all ghosts during every power pellet period (maximizing ghost points)
- Collecting all fruit
- This maximizes score but doesn't end the game

## Losing Conditions
### Life Loss
- **Condition**: Pac-Man collides with a ghost that is NOT in frightened mode (i.e., ghost is blue and edible) or ghost eyes
- **Result**:
  - Player loses one life
  - Pac-Man returns to starting position
  - All ghosts return to their starting positions (in ghost house)
  - Current level progress is maintained (dots remain eaten)
  - If lives remain > 0, gameplay continues after a short pause
  - If lives reach 0, game over occurs

### Game Over
- **Condition**: Player loses their last life (lives reach 0)
- **Result**:
  - Game ends
  - "Game Over" message displayed
  - Final score shown
  - Option to enter initials for high score list (if implemented)
  - Game resets to attract mode or main menu

## Special Cases and Edge Conditions

### Collision with Ghost Eyes
- When a ghost is eaten, only the eyes remain and return to the ghost house
- Collision with ghost eyes results in a life loss (same as normal ghost)
- Eyes move faster than normal ghosts when returning to house

### Tunnel Collisions
- Collision detection works normally in tunnels
- Wrapping occurs after position update, so collision with ghost in tunnel is possible

### Power Pellet Timing
- If Pac-Man eats a ghost exactly as frightened mode ends, it counts as eating the ghost (award points)
- If collision occurs during the same frame as frightened mode ending, it depends on implementation order
- Typically, power pellet expiration is checked before collision, so ghost would be dangerous

### Simultaneous Events
- Eating a dot and colliding with a ghost in the same frame: dot eaten first, then collision checked
- This means Pac-Man gets the dot point even if he dies

## Implementation Details

### Collision Detection System
We already have a collision system that checks for wall collisions. We need to extend it to check for ghost collisions.

### Ghost Collision Check
```typescript
// In the game update loop, after updating positions:
function checkGhostCollisions(pacMan: PacMan, ghosts: Ghost[]): GhostState | null {
  for (const ghost of ghosts) {
    // Simple AABB collision check (adjust radii as needed)
    const dx = pacMan.x - ghost.x;
    const dy = pacMan.y - ghost.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Collision radius: half tile size (10 pixels) for entity vs entity
    if (distance < TILE_SIZE / 2) {
      return ghost.state; // Return the ghost's state to determine outcome
    }
  }
  return null; // No collision
}
```

### Handling Collision Outcomes
```typescript
function handleGhostCollision(pacMan: PacMan, ghost: Ghost): void {
  switch (ghost.state) {
    case GhostState.FRIGHTENED:
      // Pac-Man eats the ghost
      scoreManager.addPoints(GHOST_POINTS[ghost.eatCount]); // Increasing points for consecutive ghosts
      ghost.eatCount++;
      ghost.setState(GhostState.EATEN);
      // Play ghost eat sound
      break;
      
    case GhostState.CHASE:
    case GhostState.SCATTER:
    case GhostState.LEAVING_HOUSE:
      // Pac-Man loses a life
      pacMan.loseLife();
      // Play death sound
      // Trigger life loss sequence (pause, reset positions, etc.)
      break;
      
    case GhostState.EATEN:
      // Colliding with eyes also loses a life (as per original arcade)
      pacMan.loseLife();
      // Play death sound
      break;
      
    default:
      break;
  }
}
```

### Life Loss Sequence
When Pac-Man loses a life:
1. Play death animation/sound
2. Freeze game for a short duration (e.g., 2 seconds)
3. Reset Pac-Man position to starting point
4. Reset all ghosts to starting positions (in ghost house, with appropriate exit delays)
5. Reset Pac-Man's direction to initial (usually RIGHT)
6. Reset Pac-Man's desired direction to NONE
7. Keep current level, score, and remaining dots eaten
8. Decrement lives counter
9. If lives > 0, resume gameplay after pause
10. If lives = 0, trigger game over

### Game Over Sequence
When lives reach 0:
1. Play game over sound
2. Display "GAME OVER" text
3. Show final score
4. Wait for input (e.g., button press) to reset or return to main menu
5. Reset game state for a new game (optional)

## Files to Implement
- `src/game/systems/collision-system.ts` - Extend to include ghost collision detection
- `src/game/systems/life-manager.ts` - Manage lives, life loss, and game over logic
- `src/game/entities/life-manager.ts` - Alternative: life manager as entity
- `src/game/utils/game-state-utils.ts` - Helper functions for win/lose state checks
- `src/game/constants/game-constants.ts` - Constants for points, timings, etc.

## Dependencies
- Pac-Man entity (position, state)
- Ghost entities (position, state)
- Score manager (for awarding points when eating ghosts)
- Audio system (for death, game over, ghost eat sounds)
- Rendering system (for displaying lives, game over text)
- Input system (for detecting restart input)
- Level manager (for knowing current level, though not directly needed for collision)

## Integration Points
- Called each frame during game update (after position updates, before rendering)
- Works with existing wall collision system
- Communicates with score manager when ghosts are eaten
- Triggers life loss sequences via life manager
- Updates lives display in UI
- Triggers game over state when lives reach 0

## Notes
- Original arcade Ms. Pac-Man had specific timing for death animations (Pac-Man's eyes closing, etc.)
- The number of lives displayed is typically shown as icons (Pac-Man sprites) in the corner
- Some versions show "READY!" after losing a life before resuming
- The game does not end on level completion; it only ends when lives are exhausted
- In practice, the game can be played indefinitely by skilled players, leading to a kill screen due to integer overflow in level or fruit counters (not implemented in this version)