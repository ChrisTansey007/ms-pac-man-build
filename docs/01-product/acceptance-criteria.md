# Acceptance Criteria

## Gameplay Accuracy
- Pac-Man moves at exactly 96 pixels per second in all directions when not slowed by dots
- Pac-Man can buffer turns: if a direction is pressed before reaching an intersection, Pac-Man will turn as soon as possible
- Pac-Man's collision with walls is pixel-perfect: he cannot move through walls and stops exactly at the wall boundary
- Pac-Man wraps around the tunnel (left-right) with no delay
- Pac-Man's mouth animation cycles at the correct rate (open/closed every 4 frames at normal speed)

## Ghost AI
- Each ghost (Blinky, Pinky, Inky, Clyde) implements its correct targeting algorithm
- In scatter mode, each ghost heads directly to its designated corner:
  * Blinky: top-right corner
  * Pinky: top-left corner  
  * Inky: bottom-right corner
  * Clyde: bottom-left corner
- Ghosts switch between chase and scatter modes according to the original timing:
  * Levels 1-4: 7 seconds scatter, 20 seconds chase, 7 seconds scatter, 20 seconds chase, 5 seconds scatter, 20 seconds chase, 5 seconds scatter, then infinite chase
  * Levels 5+: 7 seconds scatter, 20 seconds chase (repeat), then after first few levels, scatter times decrease
- When frightened, ghosts turn blue, reverse direction, and move at 50% speed
- Ghosts flash between blue and white for the last 3 seconds of frightened mode
- When eaten, ghosts return to the ghost house as eyes only, moving at 2x speed
- Ghosts regenerate in the ghost house after a set time and resume normal behavior

## Fruit System
- Fruit appears twice per level (except level 1) at the center of the maze
- Fruit sequence: Level 1: none, Level 2: Cherry (100pts), Level 3: Strawberry (200pts), Level 4: Orange (500pts), 
  Level 5: Apple (700pts), Level 6: Melon (1000pts), Level 7: Galaxian (2000pts), Level 8: Bell (3000pts), 
  then repeats Apple, Melon, Galaxian, Bell every 4 levels starting from level 5
- Fruit appears after a set number of dots have been eaten (varies by level)
- Fruit remains for a fixed time then disappears if not eaten

## Scoring
- Eating a dot: 10 points
- Eating an energizer: 50 points
- Eating a ghost (first): 200 points, second: 400, third: 800, fourth: 1600 (per energizer)
- Eating fruit: as per fruit table above
- Extra life awarded at exactly 10,000 points (only one extra life per life, i.e., can earn multiple if score goes 10k, 20k, 30k, etc.)

## Lives and Levels
- Starts with 3 lives
- Losing a life resets Pac-Man and ghosts to starting positions for that level
- Game ends when lives reach 0
- Level advances when all dots are eaten
- Intermissions play after levels 1, 2, 3, and 4 (before levels 2, 3, 4, and 5)

## Audio
- Sound effects trigger for: eating dot, eating energizer, eating ghost, Pac-Man death, intermission music
- Background music plays during gameplay and changes based on game state (e.g., when energizer active)
- All sounds match the original arcade in timbre and timing

## Technical
- Game runs at 60 FPS with variable time step handling
- Input response time < 16ms (one frame)
- All game state is deterministic given the same seed
- Code passes all unit tests (coverage > 80% for game logic)
- No console errors in production build