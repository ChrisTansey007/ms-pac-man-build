# TASK-0003: Implement Core Pac-Man Movement and Collision Detection

## Status
claimed

## Execution Mode Compatibility
- solo
- multi-worker
- hybrid

## Responsible Role
frontend-builder

## Supporting Roles
- qa-verifier

## Required Capabilities
- frontend-implementation
- code-implementation
- test-writing

## Required Tier
frontier

## Cost Ceiling
moderate

## Required MCP Servers
- none

## Objective
Implement Pac-Man's core movement mechanics (grid-based, 60fps, input handling, wall collision, dot eating, tunnel wrapping) for the Ms. Pac-Man game.

## Required Reading
- [ ] [`AGENTS.md`](../../../AGENTS.md)
- [ ] [`PROJECT_GOAL.md`](../../../PROJECT_GOAL.md)
- [ ] [`docs/01-product/prd.md`](../../../docs/01-product/prd.md)
- [ ] [`docs/02-architecture/system-overview.md`](../../../docs/02-architecture/system-overview.md)

## Files Likely Affected
- `src/game/entities/pacman.ts` — Pac-Man entity class
- `src/game/systems/movement-system.ts` — Grid-based movement logic
- `src/game/utils/collision.ts` — Wall collision detection
- `src/game/systems/input-system.ts` — Keyboard input handling
- `tests/unit/pacman-movement.test.ts` — Unit tests for movement

## Acceptance Criteria
- [ ] Pac-Man moves smoothly at 60fps on a 28x31 grid (original arcade dimensions)
- [ ] Responds to arrow key input with immediate direction change (when next tile is open)
- [ ] Cannot move through walls (collision with maze boundaries)
- [ ] Eats dots when overlapping dot tiles
- [ ] Wraps horizontally through tunnel (left ↔ right)
- [ ] `npm run lint` passes without errors
- [ ] `npm run build` creates a distributable bundle
- [ ] `npm test` runs and passes (unit tests for movement)

## Verification Required
- [ ] Self-check against acceptance criteria
- [ ] Automated checks (lint, test, build) pass
- [ ] Independent review by different worker or human

## Completion Evidence Required
- [ ] List of all files created or modified
- [ ] Output of `npm run lint`, `npm run test`, and `npm run build`
- [ ] Updated package.json showing devDependencies (if changed)

## Handoff Required
- [ ] Handoff written using [`handoffs/handoff-template.md`](../handoffs/handoff-template.md)
- [ ] Handoff placed in `handoffs/active/`

## Risks
- [ ] Tooling configuration conflicts with existing template
- [ ] Dependency version incompatibilities
- [ ] Build setup too complex for simple web game

## Dependencies
- [TASK-0002] — Project initialization and documentation setup

## Notes
- Keep movement grid-based and deterministic
- Consider using requestAnimationFrame for 60fps loop
- Ensure testing setup works with DOM-like environment for Canvas tests
