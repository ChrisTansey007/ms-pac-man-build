# Task Template

> **Use this template for all task files. Copy it and fill in every section.**

---

# [TASK-ID]: [Task Title]

## Status

backlog | ready | claimed | in-progress | review | blocked | done

## Execution Mode Compatibility

- solo
- multi-worker
- hybrid

## Responsible Role

[ROLE_NAME]

## Supporting Roles

- [ROLE_NAME]

## Required Capabilities

- [CAPABILITY]

## Preferred Workers

- [WORKER_NAME]

## Current Claimed Worker

none

## Reassignment Allowed

yes | no

## Reassignment Conditions

- worker is blocked
- lock is stale
- task scope changed
- tests are failing and review is needed
- human owner requests reassignment
- required capability does not match current worker

## Objective

[Clear, one-paragraph description of what must be accomplished. Be specific enough that a worker can understand the goal without additional context.]

## Required Reading

- [ ] [`AGENTS.md`](../../AGENTS.md)
- [ ] [`PROJECT_GOAL.md`](../../PROJECT_GOAL.md)
- [ ] [Other specific files the worker must read]

## Files Likely Affected

- `[path/to/file]` — [What will change]
- `[path/to/file]` — [What will change]

## Acceptance Criteria

- [ ] [Criterion 1 — must be testable and unambiguous]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Verification Required

- [ ] Self-check against acceptance criteria
- [ ] Automated tests pass
- [ ] Independent review by different worker or human

## Completion Evidence Required

- [ ] Test results (pass/fail counts)
- [ ] [Screenshots if UI changes]
- [ ] [Logs/output if backend changes]
- [ ] Documentation updated

## Handoff Required

- [ ] Handoff written using [`handoffs/handoff-template.md`](../handoffs/handoff-template.md)
- [ ] Handoff placed in `handoffs/active/`

## Risks

- [Risk 1 — what could go wrong?]
- [Risk 2]

## Dependencies

- [TASK-XXXX] — [What this task depends on and why]
- [None] — If no dependencies

## Notes

[Any additional context, constraints, or guidance for the worker.]
