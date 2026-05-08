import { Ghost } from '../entities/ghost';
import { DIRECTION, Direction } from '../constants';
import { wouldCollideWithWall, applyTunnelWrapping } from '../utils/collision';
import { hasDot, eatDot } from '../utils/maze';

export enum GhostState {
  CHASE = 'chase',
  SCATTER = 'scatter',
  FRIGHTENED = 'frightened',
  EATEN = 'eaten'
}

export type GhostStateType = GhostState.CHASE | GhostState.SCATTER | GhostState.FRIGHTENED | GhostState.EATEN;

export class GhostSystem {
  private ghosts: Ghost[] = [];
  private state: GhostState = GhostState.SCATTER;
  private stateTimer: number = 0;
  private readonly scatterTimes: number[] = [7000, 7000, 7000, 7000]; // ms for each scatter period
  private readonly chaseTimes: number[] = [20000, 20000, 20000, 20000]; // ms for each chase period
  private currentStateIndex: number = 0;
  private frightenedTimer: number = 0;
  private readonly frightenedDuration: number = 6000; // ms

  constructor() {
    // Initialize ghosts (Blinky, Pinky, Inky, Clyde) with their starting positions and colors
    // These are placeholder positions; actual positions should be set based on the maze
    this.ghosts.push(new Ghost(14 * 20, 14 * 20, '#ff0000')); // Blinky - red
    this.ghosts.push(new Ghost(14 * 20, 15 * 20, '#ff80c0')); // Pinky - pink
    this.ghosts.push(new Ghost(12 * 20, 16 * 20, '#00ffff')); // Inky - cyan
    this.ghosts.push(new Ghost(16 * 20, 16 * 20, '#ff8040')); // Clyde - orange
  }

  public update(deltaTime: number, pacmanX: number, pacmanY: number, pacmanDirection: Direction): void {
    // Update state timers
    this.updateStateTimers(deltaTime);

    // Update each ghost
    for (const ghost of this.ghosts) {
      this.updateGhost(ghost, deltaTime, pacmanX, pacmanY, pacmanDirection);
    }
  }

  private updateStateTimers(deltaTime: number): void {
    if (this.state === GhostState.FRIGHTENED) {
      this.frightenedTimer -= deltaTime;
      if (this.frightenedTimer <= 0) {
        this.state = this.getNextState();
        this.stateTimer = this.getStateDuration(this.state);
      }
    } else {
      this.stateTimer -= deltaTime;
      if (this.stateTimer <= 0) {
        this.state = this.getNextState();
        this.stateTimer = this.getStateDuration(this.state);
      }
    }
  }

  private getNextState(): GhostState {
    if (this.state === GhostState.CHASE) {
      return GhostState.SCATTER;
    } else if (this.state === GhostState.SCATTER) {
      return GhostState.CHASE;
    } else {
      // This should not happen for Frightened or Eaten in normal state transitions
      return GhostState.CHASE;
    }
  }

  private getStateDuration(state: GhostState): number {
    if (state === GhostState.CHASE) {
      return this.chaseTimes[this.currentStateIndex % this.chaseTimes.length];
    } else if (state === GhostState.SCATTER) {
      return this.scatterTimes[this.currentStateIndex % this.scatterTimes.length];
    }
    return 0; // Should not reach here for Frightened or Eaten
  }

  public setFrightened(): void {
    this.state = GhostState.FRIGHTENED;
    this.frightenedTimer = this.frightenedDuration;
  }

  public setEaten(ghost: Ghost): void {
    ghost.state = GhostState.EATEN;
    // Reset ghost to starting position? This would be handled elsewhere
  }

  private updateGhost(ghost: Ghost, deltaTime: number, pacmanX: number, pacmanY: number, pacmanDirection: Direction): void {
    // If ghost is eaten, return it to base
    if (ghost.state === GhostState.EATEN) {
      // Implement returning to base logic
      return;
    }

    // Determine target based on state and ghost type
    const target = this.getTargetForGhost(ghost, pacmanX, pacmanY, pacmanDirection);

    // Move ghost towards target
    this.moveGhostTowardsTarget(ghost, target, deltaTime);
  }

  private getTargetForGhost(ghost: Ghost, pacmanX: number, pacmanY: number, pacmanDirection: Direction): { gridX: number; gridY: number } {
    // This is a simplified version. Each ghost has its own targeting logic.
    // For now, we'll just make them chase Pac-Man directly in CHASE state, and go to a fixed corner in SCATTER.
    if (ghost.state === GhostState.CHASE) {
      // Convert pacman pixel position to grid
      const gridX = Math.round(pacmanX / 20);
      const gridY = Math.round(pacmanY / 20);
      return { gridX, gridY };
    } else if (ghost.state === GhostState.SCATTER) {
      // Each ghost has a different scatter corner
      // These are placeholder grid coordinates
      switch (this.ghosts.indexOf(ghost)) {
        case 0: // Blinky
          return { gridX: 26, gridY: 0 };
        case 1: // Pinky
          return { gridX: 0, gridY: 0 };
        case 2: // Inky
          return { gridX: 26, gridY: 30 };
        case 3: // Clyde
          return { gridX: 0, gridY: 30 };
        default:
          return { gridX: 0, gridY: 0 };
      }
    } else if (ghost.state === GhostState.FRIGHTENED) {
      // Move randomly
      // For simplicity, we'll just use a random direction (but we need to implement properly)
      // We'll just keep current direction for now and let movement system handle randomness?
      // We'll implement a simple random target
      return { gridX: Math.floor(Math.random() * 28), gridY: Math.floor(Math.random() * 31) };
    } else {
      // Eaten state: return to base
      return { gridX: 14, gridY: 14 }; // Example base position
    }
  }

  private moveGhostTowardsTarget(ghost: Ghost, target: { gridX: number; gridY: number }, deltaTime: number): void {
    // Convert ghost pixel position to grid
    const gridX = Math.round(ghost.x / 20);
    const gridY = Math.round(ghost.y / 20);

    // If already at target, we might need to choose a new direction
    // For simplicity, we'll just try to move towards the target

    // Calculate desired direction based on target
    let desiredDir: Direction = DIRECTION.NONE;
    const diffX = target.gridX - gridX;
    const diffY = target.gridY - gridY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      desiredDir = diffX > 0 ? DIRECTION.RIGHT : DIRECTION.LEFT;
    } else {
      desiredDir = diffY > 0 ? DIRECTION.DOWN : DIRECTION.UP;
    }

    // If the desired direction is opposite to current direction and we can't reverse, we might need to handle that
    // For now, we'll set the ghost's desired direction and let the movement system handle it?
    // But note: Ghosts don't have the same input buffering as Pac-Man. They move continuously.

    // We'll update the ghost's direction and then move it
    // We'll use the movement system logic? But we don't have a movement system for ghosts.
    // We'll implement a simple move function here.

    // Check if we can move in the desired direction
    if (!wouldCollideWithWall(ghost.x, ghost.y, desiredDir)) {
      ghost.direction = desiredDir;
    } else {
      // Try other directions in order of preference
      const directions: Direction[] = [DIRECTION.UP, DIRECTION.RIGHT, DIRECTION.DOWN, DIRECTION.LEFT];
      for (const dir of directions) {
        if (dir === ghost.direction) continue; // Don't reverse immediately if possible
        if (!wouldCollideWithWall(ghost.x, ghost.y, dir)) {
          ghost.direction = dir;
          break;
        }
      }
    }

    // Move the ghost
    const speed = ghost.speed; // pixels per frame
    // We need to convert deltaTime to frames? Our update is called per frame with deltaTime in ms?
    // Let's assume deltaTime is the time since last frame in ms, and we want to move at speed pixels per second?
    // But our PACMAN_SPEED is in pixels per frame. We need to be consistent.

    // Let's change: we'll assume the game runs at 60fps and we get deltaTime = 16.666... ms per frame.
    // We'll define ghost speed in pixels per second and then convert.

    // For simplicity, let's use the same speed as Pac-Man for now (2 pixels per frame) and assume deltaTime is 1 frame.
    // We'll ignore deltaTime for movement and just move by speed each frame.

    // Actually, we are getting deltaTime in milliseconds. We'll convert to frames by dividing by (1000/60).
    const frames = deltaTime / (1000 / 60);
    const moveAmount = ghost.speed * frames;

    switch (ghost.direction) {
      case DIRECTION.UP:
        ghost.y -= moveAmount;
        break;
      case DIRECTION.RIGHT:
        ghost.x += moveAmount;
        break;
      case DIRECTION.DOWN:
        ghost.y += moveAmount;
        break;
      case DIRECTION.LEFT:
        ghost.x -= moveAmount;
        break;
      default:
        break;
    }

    // Apply tunnel wrapping
    const wrapped = applyTunnelWrapping(ghost.x, ghost.y);
    ghost.x = wrapped.x;
    ghost.y = wrapped.y;
  }

  public getGhosts(): Ghost[] {
    return this.ghosts;
  }
}