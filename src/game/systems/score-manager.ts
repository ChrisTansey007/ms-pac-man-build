// ScoreManager - Tracks points, lives, and extra lives
import { POINT_DOT, POINT_POWER_PELLET, POINT_GHOST, POINT_FRUIT, EXTRA_LIFE_THRESHOLD } from '../constants';

export class ScoreManager {
  private score: number;
  private lives: number;
  private privatePointsSinceLastLife: number; // Points earned since last extra life

  constructor(initialLives: number = 3) {
    this.score = 0;
    this.lives = initialLives;
    this.privatePointsSinceLastLife = 0;
  }

  /**
   * Add points to the score and check for extra life
   * @param points Points to add
   */
  addPoints(points: number): void {
    this.score += points;
    this.privatePointsSinceLastLife += points;

    // Check for extra life (every EXTRA_LIFE_THRESHOLD points)
    while (this.privatePointsSinceLastLife >= EXTRA_LIFE_THRESHOLD) {
      this.lives++;
      this.privatePointsSinceLastLife -= EXTRA_LIFE_THRESHOLD;
      // In a real game, we would play a sound or show an effect here
      console.log(`Extra life earned! Lives: ${this.lives}`);
    }
  }

  /**
   * Get the current score
   */
  getScore(): number {
    return this.score;
  }

  /**
   * Get the current number of lives
   */
  getLives(): number {
    return this.lives;
  }

  /**
   * Lose a life (called when Pac-Man dies)
   * @returns true if there are lives remaining, false if game over
   */
  loseLife(): boolean {
    this.lives--;
    return this.lives > 0;
  }

  /**
   * Reset the score and lives to initial state
   * @param initialLives Number of lives to start with
   */
  reset(initialLives: number = 3): void {
    this.score = 0;
    this.lives = initialLives;
    this.privatePointsSinceLastLife = 0;
  }
}