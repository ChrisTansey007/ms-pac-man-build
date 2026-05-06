# PROJECT_GOAL.md — Guided Intake Form

> **Complete this file before inviting any AI worker to your project.**
> This is the single most important document for bootstrapping your project. Workers use it to decompose the goal into actionable tasks.

---

## Project Name

[PROJECT_NAME]

*Replace with the name of your project. Keep it short and memorable.*

---

## One-Sentence Goal

[ONE_SENTENCE_GOAL]

*Describe what this project will do in exactly one sentence. Example: "A personal finance dashboard that aggregates bank accounts and categorizes spending automatically."*

---

## Long-Form Goal

[LONG_FORM_GOAL]

*Expand on the one-sentence goal. Describe the problem you are solving, why it matters, and what success looks like. Aim for 3–5 paragraphs.*

---

## Target Users

[PRIMARY_USER]

*Who will use this? Describe the primary user persona(s). Include their goals, frustrations, and context.*

- **Primary persona:** [Describe]
- **Secondary persona (if any):** [Describe]

---

## Primary Outcomes

*What must this project deliver to be considered successful? List measurable outcomes.*

1. [OUTCOME_1]
2. [OUTCOME_2]
3. [OUTCOME_3]

---

## Non-Goals

*What is explicitly out of scope for this project? Listing non-goals prevents scope creep.*

1. [NON_GOAL_1]
2. [NON_GOAL_2]
3. [NON_GOAL_3]

---

## Constraints

*What constraints must the project operate within?*

- **Budget:** [BUDGET_CONSTRAINT or "None"]
- **Timeline:** [TIMELINE_CONSTRAINT or "None"]
- **Team size:** [TEAM_SIZE or "Solo developer + AI workers"]
- **Platform:** [PLATFORM_CONSTRAINT or "Web, mobile, desktop — specify"]
- **Compliance:** [COMPLIANCE_REQUIREMENTS or "None"]
- **Other:** [OTHER_CONSTRAINTS]

---

## Preferred Tech Stack

[TECH_STACK]

*What technologies do you prefer or require? Workers will respect these preferences unless a task explicitly proposes a change.*

- **Frontend:** [FRONTEND_FRAMEWORK, e.g., React, Next.js, Vue, Svelte]
- **Backend:** [BACKEND_FRAMEWORK, e.g., Node/Express, Python/FastAPI, Go]
- **Database:** [DATABASE, e.g., PostgreSQL, MongoDB, SQLite]
- **Hosting:** [DEPLOYMENT_TARGET, e.g., Vercel, AWS, Fly.io, self-hosted]
- **CI/CD:** [CI_CD, e.g., GitHub Actions, GitLab CI]
- **Other:** [OTHER_TECH]

---

## Deployment Target

[DEPLOYMENT_TARGET]

*Where will this project run in production? Be specific.*

- **Environment:** [Web, mobile app store, desktop, CLI tool, library]
- **Hosting provider:** [Provider name]
- **Domain (if applicable):** [DOMAIN_PLACEHOLDER]

---

## Success Criteria

*How will you know the project is done? Define concrete, measurable criteria.*

1. [CRITERION_1]
2. [CRITERION_2]
3. [CRITERION_3]

---

## First Milestone

[FIRST_MILESTONE]

*What is the smallest useful thing you can ship first? Define the MVP or v0.1 scope.*

---

## Initial Risks

*What risks do you anticipate? Listing them early helps workers plan mitigations.*

1. [RISK_1]
2. [RISK_2]
3. [RISK_3]

---

## Preferred Execution Mode

[PREFERRED_EXECUTION_MODE]

*How do you want AI workers to operate on this project?*

- **Solo Worker Mode** — One worker does everything from planning to implementation.
- **Multi-Worker Mode** — Multiple workers divide work by task, role, or capability.
- **Hybrid Mode** — One primary worker drives the project with specialized support workers.
- **Not sure yet** — Workers will default to solo mode; you can change later.

See [`agent-os/execution-modes.md`](./agent-os/execution-modes.md) for details on each mode.

---

## Worker Preferences

### Preferred Workers

[PREFERRED_WORKERS]

*Which AI workers do you prefer for this project? These are recommendations, not hard requirements.*

- **Primary:** [e.g., Windsurf, Codex, Claude]
- **For architecture:** [e.g., Claude]
- **For implementation:** [e.g., Codex, Windsurf]
- **For research:** [e.g., Gemini]
- **For UI verification:** [e.g., Antigravity]
- **For coordination:** [e.g., Hermes]

### Workers Not Available

[WORKERS_NOT_AVAILABLE]

*Are any workers unavailable or should not be used? Example: "Gemini API not available" or "No Antigravity access."*

### Human Review Preference

[HUMAN_REVIEW_PREFERENCE]

*How much do you want to be involved in review?*

- **Review everything** — I want to approve every task before it is marked done.
- **Review critical only** — I will review security, architecture, and major features.
- **Trust but verify** — I will spot-check work; workers should review each other.
- **Automated only** — I trust automated validation; intervene only if checks fail.

### Worker Autonomy

[WORKER_AUTONOMY]

*How much autonomy should workers have?*

- **Full autonomy** — Workers may claim, implement, and submit for review without asking.
- **Confirm before major changes** — Workers should ask before large refactors or architecture changes.
- **Confirm before any change** — Workers should propose before making any edits.

---

## Human Owner Notes

[HUMAN_OWNER_NOTES]

*Anything else workers should know. Your communication preferences, review cadence, areas where you want extra caution, etc.*

---

## Next Steps After Completing This File

1. Commit this file to your fork.
2. Choose an execution mode in `agent-os/state/assignment-state.json`.
3. Use the prompt from `prompt-library/goal-intake-to-tasks.md` with a worker (recommended: Hermes or Claude).
4. Review the generated tasks in `agent-os/tasks/backlog/`.
5. Move approved tasks into `agent-os/tasks/ready/`.
6. Start workers using prompts from `prompt-library/`.
7. Review handoffs as workers complete sessions.
8. Run `npm run audit` regularly to validate repo health.

See [`HUMAN_OWNER_GUIDE.md`](./HUMAN_OWNER_GUIDE.md) for the complete human owner workflow.
