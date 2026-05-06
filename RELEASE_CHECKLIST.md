# RELEASE_CHECKLIST.md

> **Checklist for publishing the ROWS template. Complete all items before marking the repo as a GitHub template.**

## Documentation Readiness
- [ ] `README.md` is polished and fork-ready
- [ ] `AGENTS.md` is complete and clear
- [ ] `PROJECT_GOAL.md` is a usable intake form
- [ ] `TEMPLATE_USAGE.md` has complete fork workflow
- [ ] `HUMAN_OWNER_GUIDE.md` exists
- [ ] `CONTRIBUTING.md` exists
- [ ] `SECURITY.md` exists
- [ ] `CHANGELOG.md` is up to date
- [ ] `RELEASE_CHECKLIST.md` (this file) is complete

## Agent OS Readiness
- [ ] All lifecycle folders exist with READMEs
- [ ] Task template is complete
- [ ] Handoff template is complete
- [ ] Worker contract is clear
- [ ] Definition of done is comprehensive
- [ ] Verification gates are defined
- [ ] Escalation rules exist

## Assignment Model Readiness
- [ ] `assignment-state.json` is valid
- [ ] `capability-registry.json` is valid
- [ ] `worker-status.json` is valid
- [ ] Role definition files exist
- [ ] Decision register references all ADRs correctly

## Prompt Library Readiness
- [ ] All 10 prompts exist
- [ ] `prompt-library/README.md` explains usage
- [ ] Prompts are copy/paste ready

## Examples Readiness
- [ ] All 6 sample artifacts exist
- [ ] `examples/README.md` explains usage
- [ ] Examples are clearly marked as examples

## Script Validation
- [ ] `npm run validate:json` passes
- [ ] `npm run validate:tasks` passes
- [ ] `npm run validate:handoffs` passes
- [ ] `npm run validate:assignments` passes
- [ ] `npm run validate:decisions` passes
- [ ] `npm run validate:links` passes
- [ ] `npm run validate:placeholders` passes
- [ ] `npm run validate:locks` passes
- [ ] `npm run validate:template` passes
- [ ] `npm run check:dod` passes
- [ ] `npm run audit` passes

## GitHub Readiness
- [ ] Workflows are syntactically valid
- [ ] Workflows do not depend on secrets
- [ ] Workflows do not deploy anything
- [ ] PR template exists
- [ ] Issue templates exist
- [ ] CODEOWNERS is configured (if applicable)

## Security Readiness
- [ ] No secrets committed
- [ ] `.gitignore` covers env files
- [ ] `SECURITY.md` is complete

## License Readiness
- [ ] `LICENSE` file exists at repository root
- [ ] `README.md` links to `./LICENSE`
- [ ] Copyright holder uses intentional `[OWNER_USERNAME]` placeholder

## Template Neutrality
- [ ] No Copilot files exist
- [ ] No empty files exist
- [ ] No app-specific code in `src/` or `tests/`
- [ ] Examples are clearly marked as examples
- [ ] Placeholders use intentional markers

## Final Human Review
- [ ] Human has read all root docs
- [ ] Human has run `npm run audit`
- [ ] Human confirms no worker can self-close
- [ ] Human confirms template is ready
- [ ] Version bumped in `package.json`
- [ ] `CHANGELOG.md` updated with release date
- [ ] Git tag created
- [ ] GitHub repo setting "Template repository" enabled
