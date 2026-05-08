// ScoreManager - Tracks score, lives, and awards extra lives
import { SCORE_DOT, SCORE_POWER_PELLET, SCORE_GHOST, SCORE_FRUIT, LIVES_START, EXTRA_LIFE_THRESHOLD } from '../constants';

export class ScoreManager {
  private score: number;
  private lives: number;
  private privateNextLifeThreshold: number; // points at which next extra life is awarded

  constructor() {
    this.reset();
  }

  /** Add points from eating a dot */
  addDotPoints(): void {
    this.addPoints(SCORE_DOT);
  }

  /** Add points from eating a power pellet */
  addPowerPelletPoints(): void {
    this.addPoints(SCORE_POWER_PELLET);
  }

  /** Add points from eating a ghost (depends on consecutive ghost count) */
  addGhostPoints(ghostIndex: number): void {
    // ghostIndex: 0 for first ghost, 1 for second, etc.
    const points = SCORE_GHOST[ghostIndex] || SCORE_GHOST[SCORE_GHOST.length - 1];
    this.addPoints(points);
  }

  /** Add points from eating fruit (depends on level or fruit index) */
  addFruitPoints(fruitIndex: number): void {
    // fruitIndex: 0 for first fruit (cherry), etc.
    const points = SCORE_FRUIT[fruitIndex] || SCORE_FRUIT[SCORE_FRUIT.length - 1];
    this.addPoints(points);
  }

  /** Generic method to add points and check for extra life */
  private addPoints(points: number): void {
    this.score += points;
    this.checkForExtraLife();
  }

  /** Check if the player has earned an extra life since the last check */
  private checkForExtraLife(): void {
    while (this.score >= this.privateNextLifeThreshold) {
      this.lives++;
      this.privateNextLifeThreshold += EXTRA_LIFE_THRESHOLD;
    }
  }

  /** Call when Pac-Man loses a life */
  loseLife(): void {
    this.lives = Math.max(0, this.lives - 1);
  }

  /** Get current score */
  getScore(): number {
    return this.score;
  }

  /** Get current number of lives */
  getLives(): number {
    return this.lives;
  }

  /** Reset score and lives to initial state */
  reset(): void {
    this.score = 0;
    this.lives = LIVES_START;
    this.privateNextLifeThreshold = EXTRA_LIFE_THRESHOLD; // first extra life at EXTRA_LIFE_THRESHOLD points
  }

  /** Placeholder for rendering score and lives (to be implemented by the rendering system) */
  render(): void {
    // In a real game, this would draw the score and lives to the screen.
    // For now, we'll just log to console as a placeholder.
    console.log(`Score: ${this.score} | Lives: ${this.lives}`);
  }
}