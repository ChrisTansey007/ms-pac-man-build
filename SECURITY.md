# SECURITY.md

> **Security expectations for the ROWS template and its forks.**

## This Is a Template

This repository is a reusable template. It contains no application code, no secrets, and no production configuration. Security concerns apply primarily after forking.

## Do Not Commit Secrets

- Never commit API keys, tokens, passwords, or credentials.
- Never commit `.env` files or environment configuration.
- The `.gitignore` covers common env file patterns.
- If you accidentally commit a secret, rotate it immediately and scrub git history.

## Worker Security Rules

All AI workers must follow these security rules (from [`AGENTS.md`](./AGENTS.md) Section 14):

- Never commit secrets, keys, or credentials.
- Never run destructive commands without explicit human approval.
- Never bypass verification gates.
- Escalate safety concerns immediately.

## Review Requirements

Security-sensitive changes require human review:
- Authentication/authorization logic
- Database schema changes
- API endpoint exposure
- Dependency additions
- Environment configuration changes

## Unsafe Command Examples

Commands requiring human approval:
- `rm -rf`, `git push --force`, `git reset --hard`
- `npm install` (new dependencies in production context)
- Deployment commands
- Database migration commands
- Any command operating outside the workspace boundary

## Safe Tool Usage

Workers should:
- Use repo validation scripts (`node scripts/*.mjs`) — these are safe
- Run read-only commands freely (`git status`, `ls`, `cat`)
- Escalate when uncertain about command safety

## Reporting Security Concerns

If you discover a security issue in the template itself:
1. Do not open a public issue.
2. Contact the template maintainers directly.
3. Allow time for remediation before disclosure.

For security issues in your fork: follow your project's security policy.

## Dependency Caution

- Review dependencies before adding them.
- Prefer well-maintained, widely-used packages.
- Keep dependencies updated.
- The template itself uses zero npm dependencies (all scripts use built-in Node.js modules).

## Deployment Caution

- This template's GitHub Actions do not deploy anything by default.
- If you add deployment to your fork, secure your deployment credentials.
- Never hardcode deployment targets in workflow files.

## Related Files

- [`AGENTS.md`](./AGENTS.md) — Worker constitution (Section 14: Safety Rules)
- [`agent-os/escalation-rules.md`](./agent-os/escalation-rules.md) — Escalation procedures
- [`.antigravity/safe-terminal-policy.md`](./.antigravity/safe-terminal-policy.md) — Terminal safety
