# Startup Sequence

> **Canonical startup order for any ROWS worker session.**

## Read in Order

1. `AGENTS.md` — constitution and top-level safety rules.
2. `PROJECT_GOAL.md` — the project goal and constraints.
3. `agent-os/README.md` — how the agent OS is organized.
4. `agent-os/worker-contract.md` — required worker obligations.
5. `agent-os/state/system-state.json` — current repo state.
6. `agent-os/state/assignment-state.json` — execution mode and assignments.
7. `agent-os/state/capability-registry.json` — capability definitions.
8. Worker-specific file in `agent-os/workers/`.
9. Role file in `agent-os/roles/`.
10. Tool adapter file (`CLAUDE.md`, `.windsurf/README.md`, etc.).
11. Relevant task files, handoffs, and verification evidence.

## Purpose

This sequence ensures every worker starts from repo state instead of local memory and reduces drift between workers, sessions, and tools.

## Usage

- Keep this file as the canonical reference for startup order.
- Summarize it in `AGENTS.md` and worker adapters rather than duplicating the full sequence everywhere.
