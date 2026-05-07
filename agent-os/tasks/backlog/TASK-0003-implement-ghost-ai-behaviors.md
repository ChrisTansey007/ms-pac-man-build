# TASK-0003: Implement Ghost AI Behaviors (Scatter, Chase, Frightened, Eating)

## Status
backlog

## Execution Mode Compatibility
- solo
- multi-worker
- hybrid

## Responsible Role
backend-builder

## Supporting Roles
- qa-verifier
- researcher

## Required Capabilities
- backend-implementation
- code-implementation
- test-writing
- research

## Required Tier
frontier

## Cost Ceiling
high

## Required MCP Servers
- none

## Preferred Workers
- Claude (for research and design)
- Codex (for implementation)

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
Implement the complete ghost AI system for Blinky, Pinky, Inky, and Clyde with all four behavioral modes: scatter, chase, frightened (when powered up), and eaten (returning to ghost house). This must match the original Ms. Pac-Man ghost behaviors exactly, including targeting algorithms, mode timings, and transitions.

## Required Reading
- [ ] [`AGENTS.md`](../../../AGENTS.md)
- [ ] [`PROJECT_GOAL.md`](../../../PROJECT_GOAL.md)
- [ ] [`docs/00-project-brief/vision.md`](../../../docs/00-project-brief/vision.md)
- [ ] [`docs/01-product/prd.md`](../../../docs/01-product/prd.md)
- [ ] [`docs/04-research/research-log.md`](../../../docs/04-research/research-log.md) (for ghost AI research)

## Files Likely Affected
- `src/game/entities/ghost.ts` — Ghost entity base class and specific ghost types
- `src/game/ai/ghost-behaviors.ts` — Scatter, chase, frightened, and eating mode implementations
- `src/game/ai/targeting.ts` — Target calculation algorithms for each ghost
- `src/game/ai/mode-manager.ts` — Controls scatter/chase timings and frightened mode
- `src/game/ai/ghost-house.ts` — Ghost house entrance/exit logic
- `src/game/constants/ghost-timing.ts` — Original timing constants for mode transitions

## Acceptance Criteria
- [ ] Each ghost (Blinky, Pinky, Inky, Clyde) has unique targeting behavior in chase mode
- [ ] Scatter mode sends each ghost to their specific corner with correct timing
- [ ] Frightened mode activates correctly when power pellet is eaten, with proper duration
- [ ] Eaten ghosts return to ghost house center and regenerate after delay
- [ ] Ghost behavior transitions are frame-accurate to original Ms. Pac-Man
- [ ] Ghosts cannot reverse direction except during mode changes (with proper timing)
- [ ] Unit tests validate targeting calculations for all maze positions
- [ ] Gameplay footage shows identical ghost behavior patterns to original

## Verification Required
- [ ] Self-check against acceptance criteria
- [ ] Automated tests pass
- [ ] Independent review by different worker or human
- [ ] Side-by-side comparison with original Ms. Pac-Man ghost behavior footage
- [ ] Research documentation of ghost AI algorithms in `docs/04-research/`

## Completion Evidence Required
- [ ] Test results (pass/fail counts) from Jest/Vitest
- [ ] Video comparison showing ghost behaviors matching original
- [ ] Research notes documenting original ghost algorithms
- [ ] Updated architecture documentation in `docs/02-architecture/`

## Handoff Required
- [ ] Handoff written using [`handoffs/handoff-template.md`](../handoffs/handoff-template.md)
- [ ] Handoff placed in `handoffs/active/`

## Risks
- [ ] Ghost AI algorithms are complex and easy to implement incorrectly
- [ ] Timing constants must be extracted precisely from original game disassembly
- [ ] Inky's targeting (which depends on Blinky's position) is particularly complex
- [ ] Frightened mode behavior (random movement) must be properly implemented

## Dependencies
- [TASK-0002] — Core Pac-Man movement and collision detection (ghosts need movement system)
- [TASK-0001] — Project initialization and documentation setup

## Notes
- Reference: "The Pac-Man Dossier" by Jamey Pittman for detailed ghost algorithms
- Consider implementing ghosts as finite state machines with clear state transitions
- Use deterministic random number generation for frightened mode to ensure replayability
- Ghost house timing and exit patterns must match original exactly
- Mode timings vary by level - implement level-based timing progression