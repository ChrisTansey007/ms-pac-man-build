// Maze layout: 0 = open, 1 = wall, 2 = dot, 3 = power pellet (optional)
// Using a simple placeholder maze for now.
// In a real game, this would be loaded from a file or defined more precisely.
export const MAZE: number[][] = [
  // Top row (y=0)
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,2,1,1,1,2,1,1,1,2,1,2,1,1,2,1,2,1,1,1,2,1,1,1,2,1,1],
  [1,1,2,1,1,1,2,1,1,1,2,1,2,1,1,2,1,2,1,1,1,2,1,1,1,2,1,1],
  [1,2,2,2,2,2,2,1,2,2,2,1,2,1,1,2,1,2,2,2,2,1,2,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,1,2,2,2,1,2,1,1,2,1,2,2,2,2,1,2,2,2,2,2,1],
  [1,1,2,1,1,1,2,1,1,1,2,1,2,1,1,2,1,2,1,1,1,2,1,1,1,2,1,1],
  [1,1,2,1,1,1,2,1,1,1,2,1,2,1,1,2,1,2,1,1,1,2,1,1,1,2,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,2,2,1,1,1,2,2,2,2,2,1,1,2,2,2,2,2,2,1,1,1,2,2,3,1],
  [1,1,2,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1,1,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Helper to check if a position (in grid coordinates) is a wall
export function isWall(gridX: number, gridY: number): boolean {
  // Check bounds
  if (gridY < 0 || gridY >= MAZE.length) return true; // Treat out of bounds as wall (should not happen with tunnel wrapping)
  if (gridX < 0 || gridX >= MAZE[0].length) return true;
  return MAZE[gridY][gridX] === 1;
}

// Helper to check if there's a dot at grid position
export function hasDot(gridX: number, gridY: number): boolean {
  if (gridY < 0 || gridY >= MAZE.length) return false;
  if (gridX < 0 || gridX >= MAZE[0].length) return false;
  return MAZE[gridY][gridX] === 2;
}

// Helper to eat a dot (set to 0)
export function eatDot(gridX: number, gridY: number): boolean {
  if (gridY < 0 || gridY >= MAZE.length) return false;
  if (gridX < 0 || gridX >= MAZE[0].length) return false;
  if (MAZE[gridY][gridX] === 2) {
    MAZE[gridY][gridX] = 0;
    return true;
  }
  return false;
}

// Tunnel wrapping: if Pac-Man goes out of bounds horizontally, wrap to other side
export function wrapPosition(gridX: number, gridY: number): { x: number; y: number } {
  const width = MAZE[0].length;
  const height = MAZE.length;
  const newX = ((gridX % width) + width) % width;
  const newY = ((gridY % height) + height) % height;
  return { x: newX, y: newY };
}