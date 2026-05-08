// Fruit Entity for Ms. Pac-Man
import { TILE_SIZE } from '../constants';

export class Fruit {
  // Position in pixels
  x: number;
  y: number;
  // Type of fruit (e.g., 'cherry', 'strawberry', etc.)
  type: string;
  // Points awarded for eating this fruit
  points: number;
  // Timer for how long the fruit stays on the screen (in frames at 60fps)
  timer: number;
  // Whether the fruit is currently active and visible
  active: boolean;

  /**
   * Create a fruit
   * @param x - x position in pixels
   * @param y - y position in pixels
   * @param type - type of fruit
   * @param points - points awarded
   */
  constructor(x: number, y: number, type: string, points: number) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.points = points;
    this.timer = 0; // will be set when spawned
    this.active = false;
  }

  /**
   * Update the fruit's timer each frame
   * @param deltaTime - time since last frame in milliseconds
   */
  update(deltaTime: number): void {
    if (!this.active) return;
    // Convert deltaTime to frames (assuming 60fps, 16.67ms per frame)
    const frames = deltaTime / (1000 / 60);
    this.timer -= frames;
    if (this.timer <= 0) {
      this.deactivate();
    }
  }

  /**
   * Activate the fruit at its position with a given timer (in frames)
   * @param timerFrames - how many frames the fruit should stay active
   */
  activate(timerFrames: number): void {
    this.active = true;
    this.timer = timerFrames;
  }

  /**
   * Deactivate the fruit (hide it)
   */
  deactivate(): void {
    this.active = false;
    this.timer = 0;
  }

  /**
   * Check if Pac-Man has eaten this fruit
   * @param pacmanX - Pac-Man's x position in pixels
   * @param pacmanY - Pac-Man's y position in pixels
   * @returns true if Pac-Man is at the same position as the fruit (within a tile)
   */
  eatenBy(pacmanX: number, pacmanY: number): boolean {
    if (!this.active) return false;
    // Simple grid-based check: if Pac-Man is in the same tile as the fruit
    const fruitGridX = Math.round(this.x / TILE_SIZE);
    const fruitGridY = Math.round(this.y / TILE_SIZE);
    const pacmanGridX = Math.round(pacmanX / TILE_SIZE);
    const pacmanGridY = Math.round(pacmanY / TILE_SIZE);
    return fruitGridX === pacmanGridX && fruitGridY === pacmanGridY;
  }

  // Getters
  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  getType(): string {
    return this.type;
  }

  getPoints(): number {
    return this.points;
  }

  isActive(): boolean {
    return this.active;
  }
}