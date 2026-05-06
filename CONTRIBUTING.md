# CONTRIBUTING.md

> **How to contribute to the ROWS template.**

## Contribution Principles

1. **Template neutrality first.** Do not introduce application-specific code.
2. **Preserve the architecture.** The repo is the orchestrator; workers are replaceable.
3. **No self-closing.** No contributor may mark their own work as done without review.
4. **No private-memory dependency.** All context must be in repo files.
5. **No Copilot.** This system intentionally excludes GitHub Copilot.

## Branch Strategy

Follow [`agent-os/branch-strategy.md`](./agent-os/branch-strategy.md):
- `main` — stable, template-ready
- Feature branches: `feature/<description>`
- Task branches: `task/<TASK-ID>`

## PR Requirements

- Reference a task ID in the PR description
- Include evidence of completion (test results, screenshots, logs)
- Update documentation for changed behavior
- Pass all validation checks (`npm run audit`)
- Get review from a different contributor or human owner

## Documentation Update Rule

If you change behavior, update the relevant docs. Undocumented changes are incomplete changes. See [`AGENTS.md`](./AGENTS.md) Section 13.

## Evidence Requirements

Every contribution must produce verifiable evidence:
- Test results
- Screenshots/recordings for UI changes
- Console/log output for backend changes
- Updated documentation

## Template Neutrality Rule

This repository is a reusable template. Do not turn it into a specific application unless the human owner explicitly says the fork is now being used for a specific project.

## Suggesting Changes to the Template

1. Open an issue describing the proposed change.
2. Discuss with maintainers.
3. Implement in a feature branch.
4. Submit a PR with evidence and documentation updates.
5. Wait for independent review.

## Related Files

- [`AGENTS.md`](./AGENTS.md) — Worker constitution
- [`agent-os/branch-strategy.md`](./agent-os/branch-strategy.md) — Branch naming
- [`agent-os/definition-of-done.md`](./agent-os/definition-of-done.md) — Completion criteria
