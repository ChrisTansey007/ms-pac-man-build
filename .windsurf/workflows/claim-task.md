---
description: Claim a task from the ready queue, create a lock, and prepare a branch.
---

# Claim Task Workflow

## Purpose

Formally claim a task from the ready queue, establish a lock, and prepare the working environment.

## Steps

1. **Check execution mode:** Read [`agent-os/state/assignment-state.json`](../../agent-os/state/assignment-state.json) to understand the current mode.
2. **Verify capability fit:** Check [`agent-os/state/capability-registry.json`](../../agent-os/state/capability-registry.json) and confirm your capabilities match the task's requirements.
3. **Select a task:** Choose an unclaimed task from [`agent-os/tasks/ready/`](../../agent-os/tasks/ready/) that matches your capabilities.
4. **Check for conflicts:** Verify no conflicting lock exists in [`agent-os/locks/`](../../agent-os/locks/).
5. **Move task:** Move the task file from `ready/` to [`agent-os/tasks/claimed/`](../../agent-os/tasks/claimed/).
6. **Create lock:** Copy [`agent-os/locks/lock-template.json`](../../agent-os/locks/lock-template.json), fill it in, and save to `agent-os/locks/`.
7. **Update worker status:** Update your entry in [`agent-os/state/worker-status.json`](../../agent-os/state/worker-status.json) with your active_roles.
8. **Update task file:** Set the task's `Current claimed worker` to your worker name.
9. **Update assignment state:** Update [`agent-os/state/assignment-state.json`](../../agent-os/state/assignment-state.json) if needed.
10. **Create branch:** Create a git branch following [`agent-os/branch-strategy.md`](../../agent-os/branch-strategy.md).
11. **Move to in-progress:** Move the task from `claimed/` to [`agent-os/tasks/in-progress/`](../../agent-os/tasks/in-progress/).

## Checklist

- [ ] Execution mode checked
- [ ] Capability fit verified
- [ ] Task selected from `ready/`
- [ ] No conflicting locks found
- [ ] Task moved to `claimed/`
- [ ] Lock file created with expiration
- [ ] Worker status updated (include active_roles)
- [ ] Task file's Current claimed worker updated
- [ ] Assignment state updated if needed
- [ ] Branch created per branch strategy
- [ ] Task moved to `in-progress/`
