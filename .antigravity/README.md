# .antigravity — Antigravity Adapter Directory

This directory contains Antigravity-specific policies for the ROWS system.

## Purpose

Antigravity is a worker optimized for agentic execution, UI/browser verification, and artifact production. The files in this directory define Antigravity's operational policies.

## Directory Structure

```
.antigravity/
├── README.md                  ← This file
├── artifact-requirements.md   ← Required artifacts for task completion
├── review-policy.md           ← Human and artifact review policies
└── safe-terminal-policy.md    ← Safety rules for terminal operations
```

## Startup Sequence

Before any action, Antigravity must read:
1. [`AGENTS.md`](../AGENTS.md)
2. [`PROJECT_GOAL.md`](../PROJECT_GOAL.md)
3. [`agent-os/worker-contract.md`](../agent-os/worker-contract.md)
4. [`agent-os/workers/antigravity-worker.md`](../agent-os/workers/antigravity-worker.md)
5. [`agent-os/state/system-state.json`](../agent-os/state/system-state.json)
6. `.antigravity/safe-terminal-policy.md` — Safety rules for this worker.

## Related Files

- [`agent-os/workers/antigravity-worker.md`](../agent-os/workers/antigravity-worker.md) — Worker role definition
