// Input System for handling keyboard input
import { DIRECTION, Direction } from '../constants';

export class InputSystem {
  private desiredDirection: Direction = DIRECTION.NONE;

  constructor() {
    // Enable keyboard input in a browser environment.
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  // For testing purposes, we allow setting the direction directly
  setDesiredDirection(direction: Direction): void {
    this.desiredDirection = direction;
  }

  // Simulate a key press for testing (optional)
  simulateKeyPress(key: string): void {
    switch (key) {
      case 'ArrowUp':
      case 'w':
        this.desiredDirection = DIRECTION.UP;
        break;
      case 'ArrowDown':
      case 's':
        this.desiredDirection = DIRECTION.DOWN;
        break;
      case 'ArrowLeft':
      case 'a':
        this.desiredDirection = DIRECTION.LEFT;
        break;
      case 'ArrowRight':
      case 'd':
        this.desiredDirection = DIRECTION.RIGHT;
        break;
      default:
        break;
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    // Prevent scrolling when arrow keys are pressed
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
    
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        this.desiredDirection = DIRECTION.UP;
        break;
      case 'ArrowDown':
      case 's':
        this.desiredDirection = DIRECTION.DOWN;
        break;
      case 'ArrowLeft':
      case 'a':
        this.desiredDirection = DIRECTION.LEFT;
        break;
      case 'ArrowRight':
      case 'd':
        this.desiredDirection = DIRECTION.RIGHT;
        break;
      default:
        break;
    }
  }

  getDesiredDirection(): Direction {
    return this.desiredDirection;
  }
}