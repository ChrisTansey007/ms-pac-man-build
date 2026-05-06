# .codex — Codex Adapter Directory

This directory contains the adapter configuration for **OpenAI Codex** within the ROWS system.

## Purpose

Codex is a worker optimized for code implementation, refactoring, and focused changes. This directory provides Codex-specific guidance that supplements — but never overrides — the primary constitution at [`AGENTS.md`](../AGENTS.md).

## Files

- This `README.md` — Directory overview and Codex-specific instructions.

## Codex's Role

Codex is best for:
- Implementing new features from task specifications.
- Refactoring existing code for clarity or performance.
- Writing and updating tests.
- Making focused, scoped code changes.
- Generating boilerplate and scaffolding.

Codex should avoid:
- Architectural decisions (defer to Claude or human).
- Multi-file orchestration (use Windsurf).
- Browser-based verification (use Antigravity).
- Task decomposition (use Hermes).

## Startup Sequence

Before any action, Codex must read:
1. [`AGENTS.md`](../AGENTS.md)
2. [`PROJECT_GOAL.md`](../PROJECT_GOAL.md)
3. [`agent-os/worker-contract.md`](../agent-os/worker-contract.md)
4. [`agent-os/workers/codex-worker.md`](../agent-os/workers/codex-worker.md)
5. [`agent-os/state/system-state.json`](../agent-os/state/system-state.json)

## Rules

- Follow the task file's objective exactly. Do not expand scope.
- Write tests for all new code.
- Update documentation for changed behavior.
- Produce verification evidence (test output, screenshots of running code).
- Write a handoff after every session.
- Never mark your own task as done.
