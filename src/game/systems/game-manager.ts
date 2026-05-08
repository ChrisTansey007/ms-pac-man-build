// Game Manager - Main game class that integrates all systems
import { PACMAN_SPEED, TILE_SIZE, DIRECTION } from '../constants';
import { PacMan } from '../entities/pacman';
import { InputSystem } from './input-system';
import { MovementSystem } from './movement-system';

// Stub for other systems (to be implemented later)
interface GhostSystem {
  update(deltaTime: number): void;
}

interface ScoreManager {
  addPoints(points: number): void;
  getScore(): number;
  getLives(): number;
}

interface FruitManager {
  update(dotsEaten: number, level: number): void;
}

interface LevelManager {
  getCurrentLevel(): number;
  update(dotsEaten: number): void;
}

interface AudioSystem {
  playSFX(key: string): void;
}

export class GameManager {
  private pacMan: PacMan;
  private inputSystem: InputSystem;
  private movementSystem: MovementSystem;
  // Stub systems
  private ghostSystem: GhostSystem | null = null;
  private scoreManager: ScoreManager | null = null;
  private fruitManager: FruitManager | null = null;
  private levelManager: LevelManager | null = null;
  private audioSystem: AudioSystem | null = null;

  private lastTimestamp: number = 0;
  private lag: number = 0;
  private readonly MS_PER_UPDATE = 16.67; // 60 FPS

  private isRunning: boolean = false;
  private isPaused: boolean = false;

  constructor() {
    // Initialize Pac-Man at starting position (grid 14, 23)
    this.pacMan = new PacMan(14, 23);
    this.inputSystem = new InputSystem();
    this.movementSystem = new MovementSystem();
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  stop(): void {
    this.isRunning = false;
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    this.isPaused = false;
  }

  private gameLoop(timestamp: number): void {
    if (!this.isRunning) return;

    const elapsed = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    this.lag += elapsed;

    // Process input
    this.inputSystem.simulateKeyPress(''); // No-op, but we have the system

    // Fixed time step updates
    while (this.lag >= this.MS_PER_UPDATE) {
      if (!this.isPaused) {
        this.update(this.MS_PER_UPDATE / 1000); // Convert to seconds
      }
      this.lag -= this.MS_PER_UPDATE;
    }

    // Render would happen here (interpolation)
    // For now, we just log state for demonstration
    this.render();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private update(deltaTime: number): void {
    // Update Pac-Man movement
    this.movementSystem.update(this.pacMan, this.inputSystem);

    // Update other systems (stubs)
    if (this.ghostSystem) {
      this.ghostSystem.update(deltaTime);
    }
    if (this.fruitManager && this.levelManager) {
      // We would need to track dots eaten - for now, we'll skip
      // this.fruitManager.update(dotsEaten, this.levelManager.getCurrentLevel());
    }
    if (this.levelManager) {
      // We would need to track dots eaten for level progression
      // this.levelManager.update(dotsEaten);
    }
  }

  private render(): void {
    // In a real game, this would render the current state
    // For now, we'll just log Pac-Man's position and direction every second
    // to show that the game loop is working
    if (Math.random() < 0.02) { // Log roughly 2% of frames (about once per second at 60fps)
      let dirStr: string;
      if (this.pacMan.direction === DIRECTION.UP) {
        dirStr = 'UP';
      } else if (this.pacMan.direction === DIRECTION.RIGHT) {
        dirStr = 'RIGHT';
      } else if (this.pacMan.direction === DIRECTION.DOWN) {
        dirStr = 'DOWN';
      } else if (this.pacMan.direction === DIRECTION.LEFT) {
        dirStr = 'LEFT';
      } else {
        dirStr = 'NONE';
      }
      
      console.log(`Pac-Man: (${this.pacMan.x.toFixed(1)}, ${this.pacMan.y.toFixed(1)}) ` +
                  `Dir: ${dirStr}`);
    }
  }

  // Methods to set the stub systems (for dependency injection)
  setGhostSystem(system: GhostSystem): void {
    this.ghostSystem = system;
  }

  setScoreSystem(system: ScoreManager): void {
    this.scoreManager = system;
  }

  setFruitSystem(system: FruitManager): void {
    this.fruitManager = system;
  }

  setLevelSystem(system: LevelManager): void {
    this.levelManager = system;
  }

  setAudioSystem(system: AudioSystem): void {
    this.audioSystem = system;
  }

  // Getters for external access (e.g., for testing)
  getPacMan(): PacMan {
    return this.pacMan;
  }

  getInputSystem(): InputSystem {
    return this.inputSystem;
  }
}