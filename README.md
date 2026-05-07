# ROWS — Repo-Orchestrated Worker System

[![validate-agent-os](https://github.com/ChrisTansey007/rows-template/actions/workflows/validate-agent-os.yml/badge.svg)](https://github.com/ChrisTansey007/rows-template/actions/workflows/validate-agent-os.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

> **The repository is the orchestrator. Every AI tool is a worker.**

ROWS is a GitHub template repository that turns your repo into an operating system for multi-agent development. It owns the rules, the task queue, the state, the handoffs, the checklists, the verification gates, and the definition of done. AI workers — Windsurf, Codex, Claude, Gemini, Hermes, and Antigravity — execute only repo-defined tasks under repo-defined rules.

**Roles are jobs. Workers are tools.** You can use one agent for the whole project (Solo Mode), multiple agents dividing work (Multi-Worker Mode), or one primary agent with specialized support (Hybrid Mode). Workers are replaceable — you can switch agents mid-task if handoffs are preserved.

---

## What This Is

This repository is a **template**, not an application. Fork it, rename it for your project, fill in `PROJECT_GOAL.md`, and your repo becomes the control plane for AI-assisted development.

- **The repo owns the rules.** No agent's local memory or chat session is authoritative.
- **The repo owns the task queue.** Tasks live as files in lifecycle folders.
- **The repo owns verification.** No worker can mark its own task done.
- **The repo owns handoffs.** Every worker must leave a handoff for continuity.
- **The repo owns the definition of done.** Completion is gated, not declared.
- **Workers are replaceable.** Tasks route by capability, not by tool name.
- **Roles are jobs, workers are tools.** One worker can perform many roles.

---

## Quick Start

### 1. Fork this template
Click **Use this template** → **Create a new repository** on GitHub.

### 2. Rename your fork
Name it after your project (e.g., `my-saas-app`, `internal-tools-monorepo`).

### 3. Fill in PROJECT_GOAL.md
Open [`PROJECT_GOAL.md`](./PROJECT_GOAL.md) and complete the guided intake form. This is the single most important file for bootstrapping your project.

### 4. Invite a worker
Ask any supported AI worker to read `AGENTS.md` and `PROJECT_GOAL.md`, then decompose the goal into task files.

### 5. Review and approve tasks
Move approved tasks from `agent-os/tasks/backlog/` into `agent-os/tasks/ready/`.

### 6. Let workers claim and execute
Workers claim tasks, create locks, implement changes, produce evidence, and write handoffs.

### 7. Verify and merge
Review handoffs and verification evidence. Merge verified work.

---

## Supported Workers

| Worker | Best For |
|--------|----------|
| **Windsurf** | Repo editing, implementation, local workflow, repeated file changes |
| **Codex** | Code implementation, refactoring, tests, focused changes |
| **Claude** | Architecture, large-context reasoning, documentation, review |
| **Gemini** | Research, long-document analysis, multimodal analysis, planning |
| **Hermes** | Task decomposition, coordination proposals, queue review, status reporting |
| **Antigravity** | Agentic execution, UI/browser verification, artifact production |

> **GitHub Copilot is intentionally not used in this system.** No Copilot-specific instruction files exist.

---

## Task Lifecycle

```
backlog → ready → claimed → in-progress → review → done
                       ↓                    ↓
                    blocked  ←──────────────┘
```

Each state is a folder under `agent-os/tasks/`. Tasks move through states by being physically moved between folders. See [`agent-os/task-lifecycle.md`](./agent-os/task-lifecycle.md) for full details.

---

## Execution Modes

| Mode | Description | Best For |
|------|-------------|----------|
| **Solo Worker** | One agent does everything | Small projects, prototyping, solo devs |
| **Multi-Worker** | Multiple agents divide work | Larger apps, parallel work, teams |
| **Hybrid** | One primary + specialized support | Complex projects, iterative review |

See [`agent-os/execution-modes.md`](./agent-os/execution-modes.md) for full details. You can switch modes at any time.

---

## Core Principles

1. **The repo is the orchestrator.** No AI tool, chat session, local memory, or external agent is the source of truth.
2. **Roles are jobs. Workers are tools.** Tasks route by capability, not by tool name.
3. **Workers are replaceable.** Any task can be reassigned if handoffs are preserved.
4. **No agent is the boss.** Hermes coordinates but does not command.
5. **No worker may mark its own task done without verification.**
6. **Every meaningful task requires evidence.**
7. **Every worker must leave a handoff.**
8. **Every worker must follow the same worker contract.**
9. **Tool-specific files are adapters only.**
10. **`AGENTS.md` is the primary source of truth.**

---

## Repository Structure

```
├── AGENTS.md                  ← Primary constitution for all AI workers
├── PROJECT_GOAL.md            ← Guided intake form (fill this first)
├── TEMPLATE_USAGE.md          ← Complete fork workflow instructions
├── HUMAN_OWNER_GUIDE.md       ← Guide for the human project owner
├── TEMPLATE_READINESS.md      ← Template readiness gates
├── CONTRIBUTING.md            ← Contribution guidelines
├── SECURITY.md                ← Security expectations
├── CHANGELOG.md               ← Version history
├── RELEASE_CHECKLIST.md       ← Publishing checklist
├── CLAUDE.md / GEMINI.md / HERMES.md  ← Tool adapter files
├── prompt-library/            ← Copy/paste prompts for workers
├── examples/                  ← Sample artifacts (illustrative only)
├── agent-os/                  ← The agent operating system
│   ├── workers/               ← Worker capability definitions
│   ├── roles/                 ← Role definitions (jobs)
│   ├── tasks/                 ← Task lifecycle folders
│   ├── handoffs/              ← Worker handoff files
│   ├── checklists/            ← Operational checklists
│   ├── schedules/             ← Cadence definitions
│   ├── state/                 ← System state (JSON)
│   ├── locks/                 ← Advisory file locks
│   ├── reassignment/          ← Worker reassignment records
│   └── reports/               ← Generated reports
├── docs/                      ← Project documentation (customize after fork)
├── scripts/                   ← Validation and automation scripts
├── .github/                   ← GitHub templates and Actions
├── .windsurf/                 ← Windsurf workflows
├── .claude/                   ← Claude rules
├── .gemini/                   ← Gemini settings
├── .codex/                    ← Codex adapter
├── .antigravity/              ← Antigravity policies
├── src/                       ← Application source code (empty in template)
└── tests/                     ← Tests (empty in template)
```

---

## Validation

Run these commands to validate the repo:

```bash
npm run audit                  # Full audit of all checks
npm run validate:agent-os      # Run all agent-os validations
npm run validate:json          # Validate all JSON files
npm run validate:tasks         # Validate task files
npm run validate:handoffs      # Validate handoff files
npm run validate:assignments   # Validate assignment consistency
npm run validate:decisions     # Validate ADR/decision files
npm run validate:links         # Check for broken links
npm run validate:placeholders  # Audit placeholder usage
npm run validate:locks         # Validate lock files
npm run validate:mcp           # Validate optional MCP config
npm run validate:template      # Check template readiness
npm run status:generate        # Generate a status report
npm run assignments:report     # Generate an assignment report
npm run check:dod              # Check definition of done
npm run list:tasks             # List tasks by state
npm run list:workers           # List worker statuses
npm run list:capabilities      # List all capabilities
npm run list:modes             # Show current execution mode
```

---

## License

This template is provided under the [MIT License](./LICENSE).

---

## Contributing

This is a template repository. Improvements to the template itself are welcome via PRs to the upstream template repo. For project-specific changes, customize your fork.
