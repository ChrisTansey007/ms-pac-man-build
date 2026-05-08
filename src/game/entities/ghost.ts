// Ghost Entity for Ms. Pac-Man
import { TILE_SIZE } from '../constants';
import { DIRECTION, Direction } from '../constants';

export enum GhostState {
  CHASE = 'chase',
  SCATTER = 'scatter',
  FRIGHTENED = 'frightened',
  EATEN = 'eaten'
}

export type GhostStateType = GhostState.CHASE | GhostState.SCATTER | GhostState.FRIGHTENED | GhostState.EATEN;

export class Ghost {
  // Position in pixels (matching PacMan)
  x: number;
  y: number;
  // Current movement direction
  direction: Direction;
  // Speed in pixels per frame
  speed: number;
  // Current state of the ghost
  state: GhostStateType;
  // Color of the ghost (for rendering)
  color: string;
  // Name of the ghost (for debugging)
  name: string;

  /**
   * Create a ghost
   * @param x - Starting x position in pixels
   * @param y - Starting y position in pixels
   * @param color - Color of the ghost (CSS color string)
   * @param name - Name of the ghost (e.g., 'Blinky', 'Pinky', 'Inky', 'Clyde')
   */
  constructor(x: number, y: number, color: string, name: string) {
    // Convert grid coordinates to pixel coordinates if needed (but we expect pixels)
    this.x = x;
    this.y = y;
    this.direction = DIRECTION.NONE;
    this.speed = 2; // Same speed as PacMan for now (can be adjusted per ghost/state)
    this.state = GhostState.SCATTER; // Start in scatter state
    this.color = color;
    this.name = name;
  }

  /**
   * Update method - to be called by the GhostSystem each frame
   * Note: The actual movement logic will be in the GhostSystem, but we keep an update method for consistency
   */
  update(): void {
    // This method is intentionally left empty.
    // The GhostSystem will update the ghost's state and movement externally.
  }

  // Getters and Setters
  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  getDirection(): Direction {
    return this.direction;
  }

  setDirection(direction: Direction): void {
    this.direction = direction;
  }

  getSpeed(): number {
    return this.speed;
  }

  setSpeed(speed: number): void {
    this.speed = speed;
  }

  getState(): GhostStateType {
    return this.state;
  }

  setState(state: GhostStateType): void {
    this.state = state;
  }

  getColor(): string {
    return this.color;
  }

  getName(): string {
    return this.name;
  }
}