# Changelog

All notable changes to the ROWS template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- Template readiness hardening (Prompt 3)
- `HUMAN_OWNER_GUIDE.md` for project owners
- `TEMPLATE_READINESS.md` with readiness gates
- `CONTRIBUTING.md` with contribution guidelines
- `SECURITY.md` with security expectations
- `RELEASE_CHECKLIST.md` for publishing
- `prompt-library/` with 10 copy/paste worker prompts
- `examples/` with 6 sample artifacts
- Validation scripts: `validate-json`, `validate-links`, `validate-placeholders`, `validate-locks`, `validate-template-readiness`, `validate-decisions`
- Listing scripts: `list-tasks`, `list-workers`, `list-modes`
- `audit-agent-os.mjs` for comprehensive auditing
- `generate-assignment-report.mjs` for assignment reporting
- `ADR-0003-flexible-worker-assignment.md`
- `template-readiness.yml` GitHub workflow
- Enhanced GitHub workflows with full validation suite
- Template neutrality rules in `AGENTS.md`

## [0.2.0] — 2026-05-06

### Added
- Flexible worker assignment system (Prompt 2)
- Role/capability routing: `capability → role → preferred worker → active worker`
- Solo Worker Mode, Multi-Worker Mode, Hybrid Mode
- Worker replaceability rules
- Worker switching protocol
- Reassignment protocol
- 10 role definition files
- `assignment-state.json`
- `capability-registry.json` with 21 capabilities
- `validate-assignments.mjs`
- `list-capabilities.mjs`
- Generic `.gitignore`
- Updated `AGENTS.md`, task templates, worker docs, state files, GitHub templates, scripts, and Windsurf workflows

## [0.1.0] — 2026-05-06

### Added
- Initial ROWS template scaffold (Prompt 1)
- `AGENTS.md` as primary worker constitution
- `PROJECT_GOAL.md` guided intake form
- `agent-os/` directory structure
- Task lifecycle folders (backlog through done)
- Handoff system with template
- Worker contract
- Definition of done
- Verification gates
- Tool adapter files (CLAUDE.md, GEMINI.md, HERMES.md)
- `.windsurf/workflows/` for Windsurf
- `.github/` templates and workflows
- Basic validation scripts
