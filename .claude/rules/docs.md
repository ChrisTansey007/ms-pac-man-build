# Documentation Rules

> **Domain-specific rules for documentation work. These supplement [`AGENTS.md`](../../AGENTS.md).**

## When to Apply

Apply these rules when working on tasks that involve:
- Writing or updating project documentation.
- Creating ADRs (Architecture Decision Records).
- Writing README files.
- Documenting APIs.
- Creating user-facing documentation.

## Rules

- [ ] Every new feature or changed behavior must have corresponding docs updates.
- [ ] ADRs must follow the template in [`docs/05-decisions/decision-template.md`](../../docs/05-decisions/decision-template.md).
- [ ] Documentation must use relative links to other repo files (not absolute URLs).
- [ ] Code examples in docs must be syntactically correct and runnable.
- [ ] Use the project glossary for terminology. Add new terms to [`docs/00-project-brief/glossary.md`](../../docs/00-project-brief/glossary.md).
- [ ] Keep docs close to the code they describe. Prefer `README.md` in feature directories.
- [ ] Avoid duplication. Link to canonical sources rather than copying content.
- [ ] Write in present tense. "The endpoint returns" not "The endpoint will return."

## Related Files

- [`docs/`](../../docs/) — All project documentation
- [`docs/05-decisions/decision-template.md`](../../docs/05-decisions/decision-template.md)
- [`docs/00-project-brief/glossary.md`](../../docs/00-project-brief/glossary.md)
