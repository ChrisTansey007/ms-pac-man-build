# Orchestration Rules

> **Domain-specific rules for multi-agent orchestration. These supplement [`AGENTS.md`](../../AGENTS.md).**

## When to Apply

Apply these rules when working on tasks that involve:
- Task decomposition and generation.
- Worker coordination proposals.
- Queue management and prioritization.
- Handoff review and consolidation.
- System state analysis.

## Rules

- [ ] Never assign tasks to workers. Workers claim their own tasks from `ready/`.
- [ ] When decomposing a goal, create tasks that are independently claimable (minimize dependencies).
- [ ] Each task must fit within a single worker session. If a task is too large, split it.
- [ ] Review the lock directory before proposing new tasks to avoid collisions.
- [ ] Flag stale locks (expired > 24 hours) for human attention.
- [ ] When proposing task ordering, reference actual dependency data, not assumptions.
- [ ] Coordination proposals are recommendations. The human decides.
- [ ] Do not create tasks that require a specific worker. Use "Preferred worker type" as a suggestion.

## Related Files

- [`agent-os/tasks/task-template.md`](../../agent-os/tasks/task-template.md)
- [`agent-os/locks/README.md`](../../agent-os/locks/README.md)
- [`agent-os/state/dependency-map.json`](../../agent-os/state/dependency-map.json)
- [`agent-os/state/worker-status.json`](../../agent-os/state/worker-status.json)
