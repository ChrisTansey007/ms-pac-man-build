---
description: Create a handoff file documenting the session's work for continuity.
---

# Handoff Workflow

## Purpose

Document the session's work so the next worker (or the same worker in a future session) can continue without loss of context.

## Steps

1. **Read the handoff template:** Open [`agent-os/handoffs/handoff-template.md`](../../agent-os/handoffs/handoff-template.md).
2. **Fill in all sections:** Task ID, worker, role performed, capabilities used, date/time, status, summary, files changed, evidence, known issues, risks, next steps.
3. **Make it useful to a different worker:** Include enough context for another AI tool to continue without relying on private chat memory. Explain decisions, assumptions, and current state clearly.
4. **Be honest about incomplete work:** A handoff is required even if the task is not finished. Document what is done and what remains.
5. **Include reassignment notes if applicable:** If this handoff is part of a reassignment, note the reason and what the new worker should read first.
6. **Place in active:** Save the handoff to [`agent-os/handoffs/active/`](../../agent-os/handoffs/active/).
7. **Update task status:** Note in the task file that a handoff was written.

## Checklist

- [ ] Handoff template referenced
- [ ] All sections completed (including role and capabilities)
- [ ] Files changed listed accurately
- [ ] Evidence produced documented
- [ ] Known issues honestly reported
- [ ] Risks identified
- [ ] Next steps clear and actionable
- [ ] Enough context for a different worker to continue
- [ ] Reassignment notes included if applicable
- [ ] Handoff saved to `active/`
- [ ] Task status updated
