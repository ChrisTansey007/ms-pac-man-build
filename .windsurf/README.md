# .windsurf — Windsurf Adapter Directory

This directory contains Windsurf-specific workflows for the ROWS system.

## Purpose

Windsurf is a worker optimized for repo editing, implementation, local workflow, and repeated file changes. The workflows in this directory guide Windsurf through the standard ROWS task lifecycle.

## Directory Structure

```
.windsurf/
├── README.md              ← This file
└── workflows/             ← Windsurf workflow definitions
    ├── start-session.md   ← Session initialization
    ├── plan-task.md       ← Task planning from goals
    ├── claim-task.md      ← Task claiming process
    ├── implement-task.md  ← Scoped implementation
    ├── verify-task.md     ← Verification and evidence
    ├── handoff.md         ← Session handoff
    └── close-task.md      ← Task closeout
```

## Startup Sequence

Before any action, Windsurf must read:
1. [`AGENTS.md`](../AGENTS.md)
2. [`PROJECT_GOAL.md`](../PROJECT_GOAL.md)
3. [`agent-os/worker-contract.md`](../agent-os/worker-contract.md)
4. [`agent-os/workers/windsurf-worker.md`](../agent-os/workers/windsurf-worker.md)
5. [`agent-os/state/system-state.json`](../agent-os/state/system-state.json)

## Related Files

- [`agent-os/workers/windsurf-worker.md`](../agent-os/workers/windsurf-worker.md) — Worker role definition
