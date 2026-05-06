---
description: Verify task completion against acceptance criteria, run checks, and produce a verification report.
---

# Verify Task Workflow

## Purpose

Verify that a completed task meets all acceptance criteria, passes automated checks, and has sufficient evidence for review.

## Steps

1. **Review acceptance criteria:** Check each criterion in the task file against the implementation.
2. **Run automated checks:** Execute tests, linters, and validation scripts.
3. **Review evidence:** Confirm that test output, screenshots, or logs demonstrate completion.
4. **Check documentation:** Verify that changed behavior is reflected in docs.
5. **Identify risks:** Note any unresolved issues, edge cases, or technical debt introduced.
6. **Create verification report:** Write a report in [`agent-os/reports/verification/`](../../agent-os/reports/verification/).
7. **Move task to review:** Move the task from `in-progress/` to [`agent-os/tasks/review/`](../../agent-os/tasks/review/).

## Checklist

- [ ] All acceptance criteria met
- [ ] Automated checks pass
- [ ] Evidence reviewed and sufficient
- [ ] Documentation updated
- [ ] Risks identified and noted
- [ ] Verification report created
- [ ] Task moved to `review/`
- [ ] Template neutrality preserved (no app-specific code, no Copilot files, no vague placeholders)
