# tests/ — Test Suite

> **This directory is intentionally empty in the template. Add your tests here after forking.**

## Purpose

All tests for [PROJECT_NAME] live here. Workers are required to write tests for all new code and bug fixes.

## Expected Structure (Example)

```
tests/
├── unit/           ← Unit tests (functions, components)
├── integration/    ← Integration tests (APIs, DB)
├── e2e/            ← End-to-end tests (user flows)
└── fixtures/       ← Test data and fixtures
```

## Testing Standards

See [`docs/03-development/testing-standards.md`](../docs/03-development/testing-standards.md) for project testing conventions.

## Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

## Related Files

- [`../docs/03-development/testing-standards.md`](../docs/03-development/testing-standards.md) — Testing standards
- [`../agent-os/verification-gates.md`](../agent-os/verification-gates.md) — Verification requirements
