import { PacMan } from '../../src/game/entities/pacman';
describe('PacMan', () => {
    it('should create an instance', () => {
        const pacMan = new PacMan();
        expect(pacMan).toBeDefined();
        expect(pacMan.x).toBe(14);
        expect(pacMan.y).toBe(23);
    });
    it('should have default direction right', () => {
        const pacMan = new PacMan();
        expect(pacMan.direction).toBe(1); // right
    });
});
