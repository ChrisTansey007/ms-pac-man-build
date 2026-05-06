# TEMPLATE_USAGE.md — How to Use This Template

> **This file explains the complete workflow for turning this template into your own repo-orchestrated project.**

---

## Overview

ROWS (Repo-Orchestrated Worker System) is a GitHub template repository. You fork it, rename it, fill in your project goal, and your repo becomes the control plane for AI-assisted development. AI workers read the repo, claim tasks, implement changes, and leave handoffs — all governed by repo-defined rules.

---

## Step-by-Step Fork Workflow

### Step 1: Fork This Template

1. Go to the upstream ROWS template repository on GitHub.
2. Click the green **Use this template** button.
3. Select **Create a new repository**.
4. Choose an owner (your personal account or an organization).
5. Give your repo a name (e.g., `my-saas-app`, `internal-tools-monorepo`).
6. Set visibility (public or private).
7. Click **Create repository from template**.

### Step 2: Clone Your Fork Locally

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### Step 3: Fill in PROJECT_GOAL.md

Open [`PROJECT_GOAL.md`](./PROJECT_GOAL.md) and complete every section. This is the single most important file. Workers use it to understand what you are building and to decompose the goal into tasks.

**Do not skip this step.** An incomplete `PROJECT_GOAL.md` will cause workers to make incorrect assumptions.

### Step 4: Create the First Project Brief

Optionally, populate the files in `docs/00-project-brief/`:
- [`vision.md`](./docs/00-project-brief/vision.md) — Expand on the vision.
- [`current-scope.md`](./docs/00-project-brief/current-scope.md) — Define what is in scope now.
- [`non-goals.md`](./docs/00-project-brief/non-goals.md) — Define what is explicitly out.
- [`glossary.md`](./docs/00-project-brief/glossary.md) — Define project-specific terminology.

### Step 5: Ask a Worker to Decompose the Goal

Use the prompt from `prompt-library/goal-intake-to-tasks.md` with any supported worker (Hermes is recommended for initial decomposition). Copy and paste the prompt into the worker's chat.

The worker will:
1. Read the constitution and project goal.
2. Analyze the goal and break it into discrete tasks.
3. Create task files in `agent-os/tasks/backlog/`.
4. Write a handoff summarizing the decomposition.

### Step 6: Review Generated Tasks

Review each task file in `agent-os/tasks/backlog/`. Verify:
- The objective is clear and scoped.
- Acceptance criteria are testable.
- Dependencies are noted.
- The task is assigned to an appropriate worker type.

Edit tasks as needed. Delete tasks that are out of scope.

### Step 7: Move Approved Tasks into Ready

Move task files you approve from `agent-os/tasks/backlog/` to `agent-os/tasks/ready/`. You can do this manually or use:

```bash
node scripts/move-task.mjs --from backlog --to ready --task TASK-0001
```

Only tasks in `ready/` can be claimed by workers.

### Step 8: Let Workers Claim Tasks

Workers will:
1. Read `AGENTS.md` and `agent-os/worker-contract.md`.
2. Check `agent-os/tasks/ready/` for available tasks.
3. Move a task from `ready/` to `claimed/`.
4. Create a lock file in `agent-os/locks/`.
5. Update `agent-os/state/worker-status.json`.
6. Create a branch following the branch strategy.
7. Move the task to `in-progress/` and begin work.

### Step 9: Review Handoffs and Verification Evidence

After a worker completes a session:
1. Read the handoff file in `agent-os/handoffs/active/`.
2. Review verification evidence in `agent-os/reports/verification/`.
3. Check that the task's acceptance criteria are met.
4. If satisfied, move the task to `review/`.
5. Assign a different worker or review it yourself.

### Step 10: Merge Verified Work

Once a task passes review:
1. Merge the worker's branch.
2. Move the task to `agent-os/tasks/done/`.
3. Remove the lock file.
4. Archive the handoff to `agent-os/handoffs/archive/`.

---

## Ongoing Cadence

### Daily
- Review `agent-os/handoffs/active/` for new handoffs.
- Check `agent-os/state/worker-status.json` for active workers.
- Run `npm run status:generate` for a summary.

### Weekly
- Review `agent-os/tasks/blocked/` and unblock where possible.
- Run `npm run check:dod` to audit completion quality.
- Review the risk register at `agent-os/state/risk-register.json`.

### Per Sprint / Milestone
- Review the decision register at `agent-os/state/decision-register.json`.
- Archive completed handoffs.
- Update `PROJECT_GOAL.md` if the goal has evolved.

---

## Choosing Your Execution Mode

ROWS supports three execution modes. Choose the one that fits your project and team.

### When to Choose Solo Mode

- You are a solo developer using AI assistance.
- The project is small (single feature, prototype, MVP).
- You are doing initial scaffolding and planning.
- You want the simplest setup with minimal coordination.
- You are learning the ROWS system.

**Trade-off:** No independent worker review. You must use automated validation or review work yourself.

### When to Choose Multi-Worker Mode

- You have a larger application with multiple components.
- You want parallel frontend/backend work.
- You want independent review by a different AI worker.
- You are using multiple AI tools for different strengths.
- You have a team collaborating with AI assistance.

**Trade-off:** More coordination overhead. Locks and handoffs become critical.

### When to Choose Hybrid Mode

- You have one primary AI tool but need specialized help.
- You want Windsurf to implement while Claude reviews architecture.
- You want Gemini to research while Codex writes code.
- You want Antigravity to verify UI while you focus on logic.
- You want iterative development with periodic review checkpoints.

**Trade-off:** Primary worker carries more responsibility. Support workers need clear task boundaries.

### How to Switch Modes Later

1. Ensure all active workers write handoffs.
2. Update `agent-os/state/assignment-state.json` with the new mode.
3. If switching to solo: close or reassign other workers' locks.
4. If switching to multi-worker: create task files for remaining work.
5. The new primary/solo worker reads all existing handoffs.

### How to Document the Active Mode

Edit `agent-os/state/assignment-state.json`:

```json
{
  "mode": "solo"
}
```

Valid values: `"solo"`, `"multi-worker"`, `"hybrid"`.

---

## Common Questions

**Q: Can I use only one worker type?**
A: Yes. The system works with any subset of workers. Use Solo Mode for one worker, Multi-Worker Mode for several, or Hybrid Mode for one primary with support. Each worker type has strengths; use what fits your project.

**Q: Can I switch workers mid-task?**
A: Yes. The repo supports worker replacement. The current worker writes a handoff, the new worker reads it and continues. See [`agent-os/worker-switching-protocol.md`](./agent-os/worker-switching-protocol.md).

**Q: What's the difference between a role and a worker?**
A: Roles are jobs (e.g., backend-builder). Workers are tools (e.g., Codex). One worker can perform multiple roles. One role can be performed by different workers. See [`agent-os/assignment-model.md`](./agent-os/assignment-model.md).

**Q: What if a worker goes off-script?**
A: Point the worker back to `AGENTS.md`. The repo rules are the authority. If a worker persistently ignores rules, escalate per [`agent-os/escalation-rules.md`](./agent-os/escalation-rules.md).

**Q: Can I add my own rules?**
A: Yes. Add project-specific rules to `agent-os/` or the tool-specific adapter directories. Do not contradict `AGENTS.md`.

**Q: What about GitHub Copilot?**
A: Copilot is intentionally not used in this system. No Copilot instruction files exist. Workers are the supported AI tools listed in the README.

**Q: Can I use this for non-software projects?**
A: Yes. ROWS is designed for software development but can be adapted for any project that benefits from task decomposition, worker execution, and verification gates.

---

## Related Files

- [`AGENTS.md`](./AGENTS.md) — Primary constitution
- [`PROJECT_GOAL.md`](./PROJECT_GOAL.md) — Project definition
- [`agent-os/README.md`](./agent-os/README.md) — Agent OS overview
- [`agent-os/assignment-model.md`](./agent-os/assignment-model.md) — Assignment hierarchy
- [`agent-os/execution-modes.md`](./agent-os/execution-modes.md) — Execution mode details
- [`agent-os/worker-contract.md`](./agent-os/worker-contract.md) — Worker obligations
- [`agent-os/task-lifecycle.md`](./agent-os/task-lifecycle.md) — Task state machine
- [`agent-os/worker-switching-protocol.md`](./agent-os/worker-switching-protocol.md) — Reassignment protocol
