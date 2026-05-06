# Artifact Requirements

> **Antigravity must produce these artifacts for every task. Missing artifacts mean the task is incomplete.**

## Required Artifacts

### 1. Plan Artifact
Before implementation begins, produce a plan artifact:
- What will be changed.
- Why this approach was chosen.
- Alternatives considered and rejected.
- Estimated files affected.

### 2. Implementation Artifact
During or after implementation, produce:
- List of all files created, modified, or deleted.
- Key design decisions made during implementation.
- Any deviations from the plan and why.

### 3. Verification Artifact
After implementation, produce:
- Test results (pass/fail counts, coverage if applicable).
- Screenshots or recordings of UI changes (if the task involves UI).
- Console/log output showing correct behavior.
- Manual test steps performed.

### 4. Browser/UI Evidence (when applicable)
For tasks involving UI changes:
- Before and after screenshots.
- Responsive design evidence (mobile, tablet, desktop).
- Interaction recordings for complex flows.
- Accessibility check results.

### 5. Handoff Artifact
Every session must produce a handoff using the template at [`agent-os/handoffs/handoff-template.md`](../agent-os/handoffs/handoff-template.md).

### 6. Risk Artifact
Document any risks introduced or discovered:
- New technical debt.
- Edge cases not handled.
- Performance concerns.
- Security considerations.

## Artifact Storage

- Plan, implementation, and verification artifacts go in [`agent-os/reports/verification/`](../agent-os/reports/verification/).
- Handoffs go in [`agent-os/handoffs/active/`](../agent-os/handoffs/active/).
- Risk artifacts are noted in the handoff and the risk register at [`agent-os/state/risk-register.json`](../agent-os/state/risk-register.json).

## Template Neutrality

This is a template repository. Do not add application-specific code. Do not create Copilot configuration files. Use intentional template markers instead of vague placeholders. See [`AGENTS.md`](../AGENTS.md) Section 21.
