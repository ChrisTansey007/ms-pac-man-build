# TASK-0002: Implement Core Pac-Man Movement and Collision Detection

## Status
backlog

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

## Preferred Workers
- Windsurf
- Codex

## Current Claimed Worker
none

## Reassignment Allowed
yes

## Reassignment Conditions
- worker is blocked
- lock is stale
- task scope changed
- human owner requests reassignment
- required capability does not match current worker
- tests are failing and review is needed

## Objective
Implement faithful Pac-Man movement mechanics including grid-based navigation, accurate turning behaviors, and collision detection with walls. This forms the foundation of the core gameplay experience that must feel identical to the original Ms. Pac-Man when enhancements are disabled.

## Required Reading
- [ ] [`AGENTS.md`](../../../AGENTS.md)
- [ ] [`PROJECT_GOAL.md`](../../../PROJECT_GOAL.md)
- [ ] [`docs/00-project-brief/vision.md`](../../../docs/00-project-brief/vision.md)
- [ ] [`docs/01-product/prd.md`](../../../docs/01-product/prd.md)

## Files Likely Affected
- `src/game/entities/pacman.ts` — Pac-Man entity with movement logic
- `src/game/grid/collision.ts` — Grid-based collision detection system
- `src/game/input/controls.ts` — Keyboard input handling (arrow keys/WASD)
- `src/game/constants/timing.ts` — Movement speed constants matching original
- `src/game/systems/movement-system.ts` — ECS system for entity movement

## Acceptance Criteria
- [ ] Pac-Man moves at exact original speed (96 pixels per second) in all directions
- [ ] Turning behavior matches original: Pac-Man can buffer turns and turns occur at precise grid intersections
- [ ] Collision detection prevents movement through walls with pixel-perfect accuracy
- [ ] Pac-Man cannot move through ghost house boundaries when applicable
- [ ] Input response time is instantaneous with no perceptible lag
- [ ] Movement works correctly at 60fps with variable time steps
- [ ] Unit tests cover all movement edge cases (corner cutting, reverse direction, etc.)

## Verification Required
- [ ] Self-check against acceptance criteria
- [ ] Automated tests pass
- [ ] Independent review by different worker or human
- [ ] Gameplay footage comparison with original Ms. Pac-Man Level 1

## Completion Evidence Required
- [ ] Test results (pass/fail counts) from Jest/Vitest
- [ ] Side-by-side video comparison showing movement fidelity
- [ ] Input response time measurements (<16ms)
- [ ] Updated documentation in `docs/03-development/coding-standards.md`

## Handoff Required
- [ ] Handoff written using [`handoffs/handoff-template.md`](../handoffs/handoff-template.md)
- [ ] Handoff placed in `handoffs/active/`

## Risks
- [ ] Movement timing constants may be difficult to extract accurately from original game
- [ ] Floating point precision issues could cause cumulative positioning errors
- [ ] Input buffering implementation might deviate from original behavior

## Dependencies
- [TASK-0001] — Project initialization and documentation setup

## Notes
- Movement must be grid-aligned with 8x8 pixel tiles matching original resolution
- Use fixed-point arithmetic if necessary to prevent floating point drift
- Reference MAME disassembly and community frame-perfect analyses for timing values
- Consider implementing as ECS system for easy extension with power-ups later