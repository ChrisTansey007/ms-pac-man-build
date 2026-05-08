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