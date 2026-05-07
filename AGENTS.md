# AGENTS.md — Primary Constitution for All AI Workers

> **This repository is the orchestrator. No AI tool, chat session, local memory, or external agent is the source of truth. All workers must follow the repo state, task files, handoff files, checklists, and verification gates.**

---

## 1. Repository Authority Rule

The repository is the control plane. Every worker derives its authority, context, and tasking from files in this repo. No worker may override, ignore, or bypass repo-defined rules, state, or task assignments.

- The repo owns the **rules** (`AGENTS.md`, `agent-os/`).
- The repo owns the **task queue** (`agent-os/tasks/`).
- The repo owns the **state** (`agent-os/state/`).
- The repo owns the **handoffs** (`agent-os/handoffs/`).
- The repo owns the **verification gates** (`agent-os/verification-gates.md`).
- The repo owns the **definition of done** (`agent-os/definition-of-done.md`).

---

## 2. Roles vs Workers

Roles are jobs. Workers are tools.

A role describes the type of work being performed.
A worker describes the AI tool or human executing the work.

A single worker may perform multiple roles.
A single role may be performed by different workers over time.
The repo must preserve continuity through durable files, not private chat memory.

See [`agent-os/assignment-model.md`](./agent-os/assignment-model.md) and [`agent-os/role-capability-matrix.md`](./agent-os/role-capability-matrix.md) for the full assignment hierarchy.

---

## 3. Worker Replaceability Rule

Tasks are assigned to capabilities and roles first, not to specific tools.

A worker may be Codex, Claude, Gemini, Windsurf, Hermes, Antigravity, or another future agent, but the repo must remain able to reassign the task if the worker is unavailable, underperforming, blocked, or better suited for another task.

No task should depend on private memory from a specific AI session. All durable state must be written back into the repo through task files, handoffs, reports, decisions, verification evidence, or state files.

---

## 4. Execution Modes

The repo supports three execution modes. The active mode is recorded in `agent-os/state/assignment-state.json`.

### Solo Worker Mode
One worker takes the project from goal intake through planning, task creation, implementation, documentation, and verification preparation. The worker must still create task files, use lifecycle folders, write handoffs, produce evidence, and must not self-close without independent review or human approval.

### Multi-Worker Mode
Multiple workers divide work by task, role, capability, or phase. Workers must respect locks, write handoffs, avoid file collisions, and use independent review.

### Hybrid Mode
One primary worker drives the project while other workers perform specialized support (research, testing, review, UI verification, documentation, status reporting).

See [`agent-os/execution-modes.md`](./agent-os/execution-modes.md) for full details.

---

## 5. Assignment Hierarchy

Tasks route by: capability → role → preferred worker → active worker

- **Capability:** The skills a task requires (e.g., code-implementation, test-writing).
- **Role:** The job responsible for the task (e.g., backend-builder, qa-verifier).
- **Preferred worker:** Recommended worker(s) — guidance, not a hard requirement.
- **Active worker:** The worker that actually claimed the task.

See [`agent-os/assignment-model.md`](./agent-os/assignment-model.md) for the full model.

---

## 6. Worker Startup Sequence

The canonical startup order lives in [`agent-os/startup-sequence.md`](./agent-os/startup-sequence.md). Every worker, on every session, must follow that document before taking any action. Do not duplicate the full startup list here.

---

## 7. Universal Worker Contract

All workers must adhere to the contract defined in [`agent-os/worker-contract.md`](./agent-os/worker-contract.md). Key obligations:

- **Read before acting.** Never start work without reading the required files.
- **Claim before working.** Never work on a task without claiming it and creating a lock.
- **Stay in scope.** Never expand a task beyond its defined objective without escalation.
- **Produce evidence.** Every task must produce verifiable evidence of completion.
- **Write handoffs.** Every session must end with a handoff file.
- **Never self-close.** No worker may move its own task to `done` without independent verification.
- **Update state.** Workers must update relevant state files when status changes.

---

## 8. Task Claiming Rules

1. Only claim tasks from `agent-os/tasks/ready/`.
2. Before claiming, check `agent-os/locks/` for conflicting locks.
3. Move the task file from `ready/` to `claimed/`.
4. Create a lock file in `agent-os/locks/` using [`agent-os/locks/lock-template.json`](./agent-os/locks/lock-template.json).
5. Update `agent-os/state/worker-status.json` with your current task.
6. Create a branch following [`agent-os/branch-strategy.md`](./agent-os/branch-strategy.md).
7. Move the task from `claimed/` to `in-progress/` when work begins.

---

## 9. Lock Rules

- Locks are **advisory but required by process**.
- A lock must be created before modifying files claimed by a task.
- Locks include an expiration time. Stale locks may be escalated per [`agent-os/escalation-rules.md`](./agent-os/escalation-rules.md).
- See [`agent-os/locks/README.md`](./agent-os/locks/README.md) for full lock protocol.

---

## 10. Handoff Rules

Every worker session MUST produce a handoff file. No exceptions.

1. Use the template at [`agent-os/handoffs/handoff-template.md`](./agent-os/handoffs/handoff-template.md).
2. Place the handoff in `agent-os/handoffs/active/`.
3. Include: task ID, summary, files changed, evidence produced, known issues, risks, next steps.
4. A handoff is required even if the task is incomplete.
5. Handoffs enable continuity between workers and sessions.

---

## 11. Verification Rules

No task is complete without verification. See [`agent-os/verification-gates.md`](./agent-os/verification-gates.md).

- **Self-check:** Worker verifies its own work against acceptance criteria.
- **Automated check:** Scripts and tests must pass.
- **Independent review:** Another worker or human must review the work.
- **Evidence:** All verification must be documented in `agent-os/reports/verification/`.

---

## 12. Completion Rules

A task is only done when:

1. All acceptance criteria are met.
2. Tests pass (where applicable).
3. Documentation is updated.
4. Verification evidence is produced.
5. A handoff is written.
6. An independent reviewer (human or different worker) approves.
7. The task is moved to `agent-os/tasks/done/`.
8. The lock file is removed.

**No worker may mark its own task as done.** This is a hard rule.

---

## 13. Documentation Update Rules

- If you change behavior, update the relevant docs in `docs/`.
- If you make an architectural decision, create an ADR in `docs/02-architecture/decisions/`.
- If you discover something during research, log it in `docs/04-research/research-log.md`.
- Documentation is not optional. Undocumented changes are incomplete changes.

---

## 14. Safety Rules

- Never delete files outside your task's scope.
- Never modify another worker's lock file.
- Never bypass verification gates.
- Never commit secrets, keys, or credentials.
- Never run destructive commands without explicit approval.
- Escalate safety concerns immediately per [`agent-os/escalation-rules.md`](./agent-os/escalation-rules.md).

---

## 15. Tool Adapter Rule

Tool-specific files (e.g., `CLAUDE.md`, `GEMINI.md`, `.windsurf/workflows/`) are **adapters only**. They translate repo rules into tool-native formats. They must not contradict or override `AGENTS.md` or any file in `agent-os/`.

---

## 16. Definition of Done

The complete Definition of Done is at [`agent-os/definition-of-done.md`](./agent-os/definition-of-done.md). All workers must satisfy every applicable criterion before requesting review.

---

## 17. Escalation

When blocked, uncertain, or facing a conflict, follow [`agent-os/escalation-rules.md`](./agent-os/escalation-rules.md). Do not guess. Do not proceed silently.

---

## 18. No Worker Is the Boss

Hermes has coordination capabilities but is **not the boss**. No worker has authority over another. The repo rules are the only authority. Humans are the final authority when needed.

---

## 19. Reassignment Rules

A task may be reassigned when the current worker is blocked, the lock is stale, the human owner requests it, or another worker is better suited. Before reassignment, the current worker must write a handoff and close the lock. The new worker must read the previous handoff, task file, and verification evidence before continuing.

See [`agent-os/worker-switching-protocol.md`](./agent-os/worker-switching-protocol.md) for the full protocol.

---

## 20. Private Memory Ban

No worker may rely on private chat memory as durable project memory. All continuation context must be written into repo files. All active assignments must be discoverable from repo files. Task files must identify required capabilities and preferred workers.

---

## 21. Template Neutrality Rules

This repository is a reusable template, not an application. Workers must preserve template neutrality:

- **No Copilot files.** This system intentionally excludes GitHub Copilot. Do not create `.copilot`, `.copilot-instructions.md`, or `.github/copilot-instructions.md`.
- **No application-specific code.** `src/` and `tests/` must remain generic. Only add application code after the human owner commits to a specific project.
- **No empty files.** Every file must have content. Empty files are noise.
- **No vague placeholders.** Use intentional template markers (e.g., `[PROJECT_NAME]`) instead of vague placeholders.
- **Examples are illustrative only.** Files in `examples/` are NOT active repo state. They show fictional content for a fictional project.
- **Prompts are starter instructions.** Files in `prompt-library/` are copy/paste prompts for humans to give to workers. They do not replace repo rules.
- **All validation must pass.** Before marking the repo as a GitHub template, `npm run audit` must pass.

## 22. Related Files

- [`agent-os/assignment-model.md`](./agent-os/assignment-model.md) — Assignment hierarchy
- [`agent-os/execution-modes.md`](./agent-os/execution-modes.md) — Solo, multi-worker, hybrid modes
- [`agent-os/role-capability-matrix.md`](./agent-os/role-capability-matrix.md) — Role-to-capability mapping
- [`agent-os/worker-switching-protocol.md`](./agent-os/worker-switching-protocol.md) — Reassignment protocol
- [`agent-os/task-routing-rules.md`](./agent-os/task-routing-rules.md) — Task flow and routing
- [`agent-os/worker-contract.md`](./agent-os/worker-contract.md) — Full worker obligations
- [`agent-os/task-lifecycle.md`](./agent-os/task-lifecycle.md) — Task state machine
- [`agent-os/definition-of-done.md`](./agent-os/definition-of-done.md) — Completion criteria
- [`agent-os/verification-gates.md`](./agent-os/verification-gates.md) — Verification requirements
- [`agent-os/escalation-rules.md`](./agent-os/escalation-rules.md) — When and how to escalate
- [`agent-os/branch-strategy.md`](./agent-os/branch-strategy.md) — Branch naming conventions
- [`agent-os/file-ownership.md`](./agent-os/file-ownership.md) — Collision avoidance
- [`agent-os/locks/README.md`](./agent-os/locks/README.md) — Lock protocol
- [`agent-os/state/assignment-state.json`](./agent-os/state/assignment-state.json) — Assignment state
- [`agent-os/state/capability-registry.json`](./agent-os/state/capability-registry.json) — Capability registry
- [`PROJECT_GOAL.md`](./PROJECT_GOAL.md) — Project definition
- [`TEMPLATE_READINESS.md`](./TEMPLATE_READINESS.md) — Template readiness gates
- [`HUMAN_OWNER_GUIDE.md`](./HUMAN_OWNER_GUIDE.md) — Guide for human owners
