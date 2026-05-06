---
description: Convert a goal or issue into a task file and place it in the backlog.
---

# Plan Task Workflow

## Purpose

Decompose a goal, user story, or issue into a properly formatted task file using the standard task template.

## Steps

1. **Read the goal:** Understand the objective from `PROJECT_GOAL.md` or the specific issue.
2. **Read the task template:** Open [`agent-os/tasks/task-template.md`](../../agent-os/tasks/task-template.md).
3. **Generate task ID:** Use the next available sequential ID (e.g., `TASK-0002`).
4. **Fill in the template:** Complete all sections:
   - Task ID, Status (`backlog`), Execution Mode Compatibility, Responsible Role, Required Capabilities, Preferred Workers, Objective, Acceptance Criteria, etc.
5. **Define responsible role:** Identify which role owns this task.
6. **Define required capabilities:** List the capabilities a worker needs to perform this task.
7. **Define preferred workers:** Recommend which workers are best suited (guidance, not hard requirement).
8. **Define execution mode compatibility:** Note whether the task supports solo, multi-worker, or hybrid execution.
9. **Place in backlog:** Write the task file to [`agent-os/tasks/backlog/`](../../agent-os/tasks/backlog/).
10. **Do NOT place directly in ready:** Tasks go to `backlog` unless the human explicitly approves `ready`.

## Checklist

- [ ] Goal or issue understood
- [ ] Task template referenced
- [ ] Unique task ID assigned
- [ ] Responsible role defined
- [ ] Required capabilities defined
- [ ] Preferred workers defined
- [ ] Execution mode compatibility defined
- [ ] All template sections completed
- [ ] Task placed in `backlog/` (not `ready/` unless approved)
- [ ] Dependencies noted if applicable
- [ ] Template neutrality preserved (no app-specific code, no Copilot files, no vague placeholders)
