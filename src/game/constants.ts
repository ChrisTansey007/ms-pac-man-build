// Game constants
export const TILE_SIZE = 20; // pixels
export const GRID_WIDTH = 28; // number of tiles horizontally
export const GRID_HEIGHT = 31; // number of tiles vertically
export const PACMAN_SPEED = 2; // pixels per frame (at 60fps)

// Directions
export const DIRECTION = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  NONE: { x: 0, y: 0 }
} as const;

export type Direction = typeof DIRECTION[keyof typeof DIRECTION];

// Scoring constants
export const POINT_DOT = 10;
export const POINT_POWER_PELLET = 50;
export const POINT_GHOST_BASE = 200; // Base points for eating a ghost, doubles each consecutive ghost
export const POINT_FRUIT_BASE = 100; // Base points for fruit, increases per level
export const EXTRA_LIFE_THRESHOLD = 10000; // Points needed for an extra life