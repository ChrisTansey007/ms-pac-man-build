# Testing Rules

> **Domain-specific rules for testing work. These supplement [`AGENTS.md`](../../AGENTS.md).**

## When to Apply

Apply these rules when working on tasks that involve:
- Writing unit tests, integration tests, end-to-end tests.
- Setting up test infrastructure.
- Debugging test failures.
- Establishing testing standards.

## Rules

- [ ] Every new feature must have tests before the task is considered complete.
- [ ] Bug fixes must include a regression test that fails before the fix and passes after.
- [ ] Tests must be independent: no test should depend on the side effects of another test.
- [ ] Use descriptive test names: `it('returns 401 when token is expired')` not `it('test auth')`.
- [ ] Mock external dependencies at the boundary. Do not mock internals.
- [ ] Test error paths as thoroughly as happy paths.
- [ ] Integration tests must clean up after themselves (or use transactions).
- [ ] Flaky tests must be fixed or quarantined. Do not ignore them.
- [ ] Test coverage is a signal, not a goal. 100% coverage of trivial code is noise.

## Related Files

- [`docs/03-development/testing-standards.md`](../../docs/03-development/testing-standards.md)
- [`agent-os/verification-gates.md`](../../agent-os/verification-gates.md)
