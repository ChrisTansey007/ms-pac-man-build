# .gemini — Gemini Adapter Directory

This directory contains Gemini-specific configuration for the ROWS system.

## Purpose

Gemini is a worker optimized for research, long-document analysis, multimodal analysis, and planning. This directory provides Gemini-specific settings that supplement the primary constitution.

## Files

- `README.md` — This file.
- `settings.json` — Gemini configuration (context files, rules references).

## Startup Sequence

Before any action, Gemini must read:
1. [`AGENTS.md`](../AGENTS.md)
2. [`PROJECT_GOAL.md`](../PROJECT_GOAL.md)
3. [`agent-os/worker-contract.md`](../agent-os/worker-contract.md)
4. [`agent-os/workers/gemini-worker.md`](../agent-os/workers/gemini-worker.md)
5. [`agent-os/state/system-state.json`](../agent-os/state/system-state.json)

## Related Files

- [`GEMINI.md`](../GEMINI.md) — Root-level Gemini adapter
- [`agent-os/workers/gemini-worker.md`](../agent-os/workers/gemini-worker.md) — Worker role definition
