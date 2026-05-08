// Collision utilities for Pac-Man movement
import { TILE_SIZE } from '../constants';
import { isWall, hasDot, eatDot, wrapPosition } from './maze';
import { DIRECTION, Direction } from '../constants';

/**
 * Check if moving in the given direction from the current pixel position would result in a wall collision.
 * @param x Pixel x position
 * @param y Pixel y position
 * @param direction Direction to check
 * @returns true if the next step would hit a wall
 */
export function wouldCollideWithWall(x: number, y: number, direction: Direction): boolean {
  if (direction === DIRECTION.NONE) return false;

  // Calculate next pixel position based on speed (we'll assume speed is 1 pixel per call for checking, but actual speed is handled elsewhere)
  // We'll check the tile that the Pac-Man would enter if moving one pixel in that direction.
  // However, for grid-based movement, we want to know if the next tile center is a wall.
  // We'll convert pixel position to grid coordinates (tile index) and check the adjacent tile in the direction.
  const gridX = Math.round(x / TILE_SIZE);
  const gridY = Math.round(y / TILE_SIZE);

  const nextGridX = gridX + direction.x;
  const nextGridY = gridY + direction.y;

  return isWall(nextGridX, nextGridY);
}

/**
 * Check if there is a dot at the current pixel position and eat it if present.
 * @param x Pixel x position
 * @param y Pixel y position
 * @returns true if a dot was eaten
 */
export function checkAndEatDot(x: number, y: number): boolean {
  const gridX = Math.round(x / TILE_SIZE);
  const gridY = Math.round(y / TILE_SIZE);
  if (hasDot(gridX, gridY)) {
    eatDot(gridX, gridY);
    return true;
  }
  return false;
}

/**
 * Apply tunnel wrapping to the pixel position if it goes out of bounds.
 * @param x Pixel x position
 * @param y Pixel y position
 * @returns wrapped position
 */
export function applyTunnelWrapping(x: number, y: number): { x: number; y: number } {
  const gridX = Math.round(x / TILE_SIZE);
  const gridY = Math.round(y / TILE_SIZE);
  const wrapped = wrapPosition(gridX, gridY);
  return {
    x: wrapped.x * TILE_SIZE,
    y: wrapped.y * TILE_SIZE
  };
}