---
description: Start a new worker session by reading required files and assessing state.
---

# Start Session Workflow

## Purpose

Initialize a worker session by reading all required files and understanding the current repo state before taking any action.

## Steps

1. **Read the constitution:** Open and read [`AGENTS.md`](../../AGENTS.md) fully.
2. **Read the project goal:** Open and read [`PROJECT_GOAL.md`](../../PROJECT_GOAL.md).
3. **Read agent-os overview:** Open and read [`agent-os/README.md`](../../agent-os/README.md).
4. **Read worker contract:** Open and read [`agent-os/worker-contract.md`](../../agent-os/worker-contract.md).
5. **Read system state:** Open and read [`agent-os/state/system-state.json`](../../agent-os/state/system-state.json).
6. **Identify execution mode:** Open and read [`agent-os/state/assignment-state.json`](../../agent-os/state/assignment-state.json). Determine if this is solo, multi-worker, or hybrid mode.
7. **Read capability registry:** Open and read [`agent-os/state/capability-registry.json`](../../agent-os/state/capability-registry.json).
8. **Read worker status:** Open and read [`agent-os/state/worker-status.json`](../../agent-os/state/worker-status.json).
9. **Read your worker role:** Open your worker file in [`agent-os/workers/`](../../agent-os/workers/).
10. **Read your role file:** Open the role file for the role you are performing in [`agent-os/roles/`](../../agent-os/roles/).
11. **Identify available tasks:** Check [`agent-os/tasks/ready/`](../../agent-os/tasks/ready/) for unclaimed tasks.
12. **State your plan:** Before making any edits, state:
   - Which task you intend to claim (or that you are exploring).
   - Your role for this session.
   - The execution mode and whether you are acting as solo worker, primary worker, support worker, verifier, or reviewer.
   - Any assumptions you are making.

## Checklist

- [ ] AGENTS.md read
- [ ] PROJECT_GOAL.md read
- [ ] agent-os/README.md read
- [ ] worker-contract.md read
- [ ] system-state.json read
- [ ] assignment-state.json read (execution mode identified)
- [ ] capability-registry.json read
- [ ] worker-status.json read
- [ ] Worker role file read
- [ ] Role file for this session read
- [ ] Available tasks identified
- [ ] Template neutrality rules reviewed (AGENTS.md Section 21)
- [ ] Plan stated before edits
