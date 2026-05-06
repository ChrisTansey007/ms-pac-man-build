# Review Policy

> **Antigravity's review policy for human review and artifact review.**

## Human Review Requirements

The following actions require explicit human approval before execution:

- Deleting files or directories outside the task's defined scope.
- Modifying git history (rebase, force push, reset).
- Installing production dependencies.
- Editing environment files (`.env`, `.env.local`, secrets).
- Running deployment commands.
- Modifying files outside the workspace boundary.
- Changing authentication or authorization logic.
- Modifying database schemas in production.

## Artifact Review Requirements

Before considering a task complete, Antigravity must:

1. **Self-review all artifacts** for completeness and accuracy.
2. **Run all automated checks** (tests, linters, validators).
3. **Verify acceptance criteria** independently — do not assume they are met.
4. **Check for regressions** — run the full test suite, not just new tests.

## Independent Review

After self-review, the task must be reviewed by:
- A different worker (not Antigravity), OR
- A human.

Antigravity cannot close its own tasks. See [`agent-os/verification-gates.md`](../agent-os/verification-gates.md).

## Review Checklist

- [ ] All artifacts produced and complete
- [ ] Automated checks pass
- [ ] Acceptance criteria independently verified
- [ ] No regressions detected
- [ ] Handoff written and complete
- [ ] Task moved to `review/` (not `done/`)
- [ ] Template neutrality preserved (no app-specific code, no Copilot files, no vague placeholders)
