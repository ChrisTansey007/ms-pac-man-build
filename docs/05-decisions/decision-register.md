# Decision Register

> **Index of all Architecture Decision Records (ADRs) for [PROJECT_NAME].**

## Purpose

Track every significant architectural decision. Each entry links to a full ADR document in [`../02-architecture/decisions/`](../02-architecture/decisions/).

## Decisions

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-0001](../02-architecture/decisions/ADR-0001-repo-orchestrated-worker-system.md) | Repo-Orchestrated Worker System | Accepted | 2026-05-06 |
| [ADR-0002](../02-architecture/decisions/ADR-0002-template-fork-workflow.md) | Template Fork Workflow | Accepted | 2026-05-06 |

*Add new decisions above this line.*

## How to Add a Decision

1. Copy [`decision-template.md`](./decision-template.md).
2. Fill in all sections.
3. Save to [`../02-architecture/decisions/`](../02-architecture/decisions/) as `ADR-XXXX-description.md`.
4. Add a row to this register.

## Related Files

- [`decision-template.md`](./decision-template.md) — ADR template
- [`../02-architecture/decisions/`](../02-architecture/decisions/) — ADR files
- [`../../agent-os/state/decision-register.json`](../../agent-os/state/decision-register.json) — Machine-readable register
