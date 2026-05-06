---
description: Close a task only after independent verification. Workers cannot close their own tasks.
---

# Close Task Workflow

## Purpose

Formally close a task after independent verification confirms all acceptance criteria are met.

## Critical Rule

**No worker may close its own task.** This workflow is for the independent reviewer (a different worker or a human).

In solo mode, the human owner must perform the close. In multi-worker/hybrid mode, a different worker may close.

## Steps

1. **Check execution mode:** Read [`agent-os/state/assignment-state.json`](../../agent-os/state/assignment-state.json).
2. **Confirm independent review:** Verify that the reviewer is NOT the worker who implemented the task.
3. **Review verification report:** Read the verification report in [`agent-os/reports/verification/`](../../agent-os/reports/verification/).
4. **Review handoff:** Read the handoff in [`agent-os/handoffs/active/`](../../agent-os/handoffs/active/).
5. **Check acceptance criteria:** Independently verify each criterion in the task file.
6. **Check assignment evidence:** Confirm the task's assignment fields (role, capabilities, worker) are consistent.
7. **Run checks:** Execute `npm run check:dod` to validate definition of done.
8. **Approve or reject:** If all criteria are met, approve. If not, move task back to `in-progress/` or `blocked/`.
9. **Move to done:** Move the task file to [`agent-os/tasks/done/`](../../agent-os/tasks/done/).
10. **Remove lock:** Delete the lock file from [`agent-os/locks/`](../../agent-os/locks/).
11. **Archive handoff:** Move the handoff from `active/` to [`agent-os/handoffs/archive/`](../../agent-os/handoffs/archive/).

## Checklist

- [ ] Execution mode checked
- [ ] Reviewer is NOT the implementing worker
- [ ] Verification report reviewed
- [ ] Handoff reviewed
- [ ] Assignment evidence checked
- [ ] Acceptance criteria independently verified
- [ ] Definition of done check passes
- [ ] Task moved to `done/`
- [ ] Lock file removed
- [ ] Handoff archived
- [ ] Template neutrality verified (no app-specific code, no Copilot files, no vague placeholders)
