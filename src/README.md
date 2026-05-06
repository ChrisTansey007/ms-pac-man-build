# src/ — Application Source Code

> **This directory is intentionally empty in the template. Add your application source code here after forking.**

## Purpose

This is where the actual application code for [PROJECT_NAME] lives. The ROWS template provides the orchestration layer (`agent-os/`, `AGENTS.md`, etc.); this directory is where workers will create and modify your project's implementation.

## Expected Structure (Example)

```
src/
├── index.js (or index.ts)    ← Entry point
├── app/                      ← Application logic
├── components/               ← UI components (if frontend)
├── routes/                   ← API routes (if backend)
├── services/                 ← Business logic
├── utils/                    ← Utility functions
└── config/                   ← Configuration
```

## Getting Started

1. Complete `PROJECT_GOAL.md`.
2. Ask a worker to decompose the goal into tasks.
3. Workers will create files in this directory as they implement tasks.

## Related Files

- [`../PROJECT_GOAL.md`](../PROJECT_GOAL.md) — Project definition
- [`../agent-os/tasks/`](../agent-os/tasks/) — Task queue
