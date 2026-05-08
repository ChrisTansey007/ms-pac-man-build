// Game constants
export const TILE_SIZE = 20; // pixels
export const GRID_WIDTH = 28; // number of tiles horizontally
export const GRID_HEIGHT = 31; // number of tiles vertically
export const PACMAN_SPEED = 2; // pixels per frame (at 60fps)

// Score constants
export const SCORE_DOT = 10;
export const SCORE_POWER_PELLET = 50;
export const SCORE_GHOST = [200, 400, 800, 1600]; // increasing for consecutive ghosts
export const SCORE_FRUIT = [100, 300, 500, 700, 1000, 2000, 3000, 5000]; // per level
export const LIVES_START = 3;
export const EXTRA_LIFE_THRESHOLD = 10000;

// Directions
export const DIRECTION = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  NONE: { x: 0, y: 0 }
} as const;

export type Direction = typeof DIRECTION[keyof typeof DIRECTION];