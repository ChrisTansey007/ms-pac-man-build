// Movement System for Pac-Man
import { PACMAN_SPEED, TILE_SIZE, DIRECTION, Direction } from '../constants';
import { wouldCollideWithWall, checkAndEatDot, applyTunnelWrapping } from '../utils/collision';
import { InputSystem } from './input-system';

export class MovementSystem {
  update(pacMan: { x: number; y: number; direction: Direction; desiredDirection: Direction; speed: number }, inputSystem: InputSystem): void {
    // Get desired direction from input
    const desired = inputSystem.getDesiredDirection();
    if (desired !== DIRECTION.NONE) {
      pacMan.desiredDirection = desired;
    }

    // Attempt to change direction if desired direction is not blocked
    if (!wouldCollideWithWall(pacMan.x, pacMan.y, pacMan.desiredDirection)) {
      pacMan.direction = pacMan.desiredDirection;
    }

    // If current direction is blocked, we don't change direction (we keep trying that direction until unblocked)
    // Actually, in Pac-Man, if you are moving in a direction and hit a wall, you stop until you can move in that direction again or you choose a new direction.
    // Our logic above already allows changing to desired direction if possible. If not, we keep the current direction (which might be blocked) but we won't move because we check below.

    // Move in the current direction if not blocked
    if (!wouldCollideWithWall(pacMan.x, pacMan.y, pacMan.direction)) {
      pacMan.x += pacMan.direction.x * pacMan.speed;
      pacMan.y += pacMan.direction.y * pacMan.speed;

      // Check for dot eating
      checkAndEatDot(pacMan.x, pacMan.y);

      // Apply tunnel wrapping
      const wrapped = applyTunnelWrapping(pacMan.x, pacMan.y);
      pacMan.x = wrapped.x;
      pacMan.y = wrapped.y;
    }
    // If blocked, we don't move ( pacMan.direction remains the same, but we don't update position)
  }
}