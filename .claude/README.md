# .claude — Claude Code Adapter Directory

This directory contains Claude-specific rules and configuration for the ROWS system.

## Purpose

Claude is a worker optimized for architecture, large-context reasoning, documentation, and review. The files in this directory provide Claude-specific guidance that supplements the primary constitution.

## Directory Structure

```
.claude/
├── README.md           ← This file
└── rules/              ← Project-specific Claude rules (starter stubs)
    ├── backend.md      ← Backend development rules
    ├── frontend.md     ← Frontend development rules
    ├── docs.md         ← Documentation rules
    ├── testing.md      ← Testing rules
    └── orchestration.md ← Multi-agent orchestration rules
```

## Rules Directory

The `rules/` directory contains project-specific rules that Claude should follow. These are **additive** to `AGENTS.md` — they provide domain-specific guidance, not constitutional overrides.

The files currently ship as starter stubs so a fork can make them project-specific without guessing at the intended shape.

Customize these files after forking to match your project's conventions.

## Startup Sequence

Before any action, Claude must read:
1. [`AGENTS.md`](../AGENTS.md)
2. [`PROJECT_GOAL.md`](../PROJECT_GOAL.md)
3. [`agent-os/worker-contract.md`](../agent-os/worker-contract.md)
4. [`agent-os/workers/claude-worker.md`](../agent-os/workers/claude-worker.md)
5. [`agent-os/state/system-state.json`](../agent-os/state/system-state.json)
6. Relevant files in `.claude/rules/` based on the task domain.

## Related Files

- [`CLAUDE.md`](../CLAUDE.md) — Root-level Claude adapter
- [`agent-os/workers/claude-worker.md`](../agent-os/workers/claude-worker.md) — Worker role definition
