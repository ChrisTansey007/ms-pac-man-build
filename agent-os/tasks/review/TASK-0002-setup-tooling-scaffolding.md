# TASK-0002: Set up Project Tooling and Basic Scaffolding

## Status
ready for review

## Execution Mode Compatibility
- solo
- multi-worker
- hybrid

## Responsible Role
devops-engineer

## Supporting Roles
- architect

## Required Capabilities
- project-setup
- tooling-configuration
- dependency-management

## Preferred Workers
- Hermes
- Codex

## Current Claimed Worker
Hermes

## Reassignment Allowed
yes

## Reassignment Conditions
- worker is blocked
- lock is stale
- task scope changed
- human owner requests reassignment
- required capability does not match current worker

## Objective
Set up the foundational project tooling and basic file scaffolding for the Ms. Pac-Man project. This includes configuring TypeScript, setting up Jest for testing, ESLint for code quality, and creating the basic directory structure.

## Required Reading
- [ ] [`AGENTS.md`](../../../AGENTS.md)
- [ ] [`PROJECT_GOAL.md`](../../../PROJECT_GOAL.md)
- [ ] [`docs/01-product/prd.md`](../../../docs/01-product/prd.md)
- [ ] [`docs/02-architecture/system-overview.md`](../../../docs/02-architecture/system-overview.md)

## Files Likely Affected
- `package.json` — Add/update dev dependencies
- `tsconfig.json` — TypeScript configuration
- `jest.config.js` — Jest testing configuration
- `eslintrc.js` — ESLint configuration
- `webpack.config.js` or `vite.config.js` — Build tool configuration (if needed)
- `src/` directory — Create basic structure
- `tests/` directory — Create test structure
- `.gitignore` — Ensure proper ignores

## Acceptance Criteria
- [x] TypeScript configured with strict mode and proper paths
- [x] Jest configured for unit testing with ts-jest
- [x] ESLint configured with TypeScript plugin and proper rules
- [x] Basic directory structure created (`src/game/`, `src/ui/`, `assets/`, `tests/`)
- [x] npm scripts for build, test, lint, and dev added to package.json
- [x] Initial commit with "chore: setup project tooling and scaffolding"
- [x] `npm run lint` passes without errors
- [x] `npm run test` runs and shows 0 tests (placeholder)
- [x] `npm run build` creates a distributable bundle

## Verification Required
- [x] Self-check against acceptance criteria
- [x] Automated checks (lint, test, build) pass
- [ ] Independent review by different worker or human

## Completion Evidence Required
- [x] List of all files created or modified
- [x] Output of `npm run lint`, `npm run test`, and `npm run build`
- [x] Updated package.json showing devDependencies

## Handoff Required
- [x] Handoff written using [`handoffs/handoff-template.md`](../handoffs/handoff-template.md)
- [x] Handoff placed in `handoffs/active/`

## Risks
- [ ] Tooling configuration conflicts with existing template
- [ ] Dependency version incompatibilities
- [ ] Build setup too complex for simple web game

## Dependencies
- [TASK-0001] — Project initialization and documentation setup

## Notes
- Keep tooling simple - we may not need a complex bundler for a Canvas-based game
- Consider using ESBuild or Vite for fast development builds
- Ensure testing setup works with DOM-like environment for Canvas tests