# Before Commit Checklist

> **Complete this checklist before committing code.**

## Code Quality

- [ ] Code follows project coding standards
- [ ] No commented-out code (unless explicitly justified)
- [ ] No debug logging left in
- [ ] No hardcoded secrets, keys, or credentials
- [ ] Imports are organized and minimal

## Testing

- [ ] New code has corresponding tests
- [ ] All tests pass (`npm test`)
- [ ] No regressions in existing functionality
- [ ] Edge cases covered

## Documentation

- [ ] Changed behavior reflected in docs
- [ ] New APIs documented
- [ ] README updated if needed

## Git Hygiene

- [ ] Commit message follows format: `type(scope): description`
- [ ] One logical change per commit
- [ ] No unrelated changes included
- [ ] No generated files committed unnecessarily

## Related Files

- [`before-coding.md`](./before-coding.md) — Pre-coding checklist
- [`before-pr.md`](./before-pr.md) — Pre-PR checklist
