# Safe Terminal Policy

> **Antigravity must follow these rules before executing terminal commands.**

## Commands Requiring Human Approval

The following command categories require explicit human approval before execution:

### Destructive File Operations
- `rm`, `rmdir`, `del`, `Remove-Item` — deleting files or folders.
- `rm -rf`, `rm -r` — recursive deletion.
- Any command that modifies files outside the task's scope.

### Git History Modification
- `git rebase`, `git reset --hard`, `git push --force`.
- `git commit --amend` on pushed commits.
- `git clean -fd`.

### Dependency Installation
- `npm install`, `pip install`, `gem install`, `cargo install` — in production contexts.
- Installing packages globally.
- Installing packages from unverified sources.

### Environment and Secrets
- Editing `.env`, `.env.local`, `.env.production`.
- Commands that read or write secrets files.
- Commands that expose environment variables in output.

### Deployment
- `git push` to production branches.
- Deployment commands (`vercel deploy`, `aws deploy`, `fly deploy`).
- Database migration commands in production.

### Workspace Boundary
- Any command that reads or writes files outside the project workspace.
- Commands that access system directories.

## Safe Commands (Generally Auto-Approved)

- `git status`, `git log`, `git diff`, `git branch`.
- `npm test`, `npm run build`, `npm run lint`.
- Reading files with `cat`, `head`, `tail`.
- `ls`, `dir`, `find`, `grep` (read-only).
- `node scripts/*.mjs` (repo validation scripts).

## Escalation

If uncertain whether a command is safe, escalate to the human. Do not guess. See [`agent-os/escalation-rules.md`](../agent-os/escalation-rules.md).

## Template Neutrality

This is a template repository. Do not add application-specific code. Do not create Copilot configuration files. Use intentional template markers instead of vague placeholders. See [`AGENTS.md`](../AGENTS.md) Section 21.
