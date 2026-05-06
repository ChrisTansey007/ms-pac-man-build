---
description: Execute a claimed task with tight scope, produce evidence, and update docs.
---

# Implement Task Workflow

## Purpose

Execute the implementation defined by a claimed task file. Stay strictly within scope, produce verifiable evidence, and update documentation.

## Steps

1. **Re-read the task file:** Confirm the objective, acceptance criteria, and files likely affected.
2. **Follow the task instructions exactly:** Do not expand scope. If scope expansion seems necessary, escalate.
3. **Implement changes:** Make focused, minimal edits. Prefer small, reviewable commits.
4. **Write/update tests:** All new code must have tests. Bug fixes must have regression tests.
5. **Update documentation:** If behavior changed, update relevant docs in `docs/`.
6. **Record evidence:** Capture test output, screenshots, or logs showing the change works.
7. **Run validation scripts:** Execute `npm run validate:tasks` and any project-specific tests.

## Checklist

- [ ] Task file re-read and understood
- [ ] Scope boundaries respected (no expansion)
- [ ] Implementation complete
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Evidence captured (test output, screenshots)
- [ ] Validation scripts pass
