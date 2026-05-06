# Backend Development Rules

> **Domain-specific rules for backend work. These supplement [`AGENTS.md`](../../AGENTS.md).**

## When to Apply

Apply these rules when working on tasks that involve:
- API endpoints, routes, controllers.
- Database schemas, migrations, queries.
- Authentication, authorization.
- Background jobs, queues, workers.
- Server configuration, middleware.

## Rules

- [ ] Validate all inputs at the API boundary. Never trust client data.
- [ ] Use parameterized queries. Never concatenate user input into SQL.
- [ ] Return consistent error shapes: `{ error: { code, message, details? } }`.
- [ ] Log all errors with context (endpoint, user ID if available, timestamp).
- [ ] Add database migrations for all schema changes. Never modify schemas manually.
- [ ] Document all API endpoints in the API contracts doc.
- [ ] Write integration tests for critical paths (auth, payments, data mutations).
- [ ] Handle rate limiting and timeouts explicitly.
- [ ] Use environment variables for all secrets and configuration. Never hardcode.

## Related Files

- [`docs/02-architecture/api-contracts.md`](../../docs/02-architecture/api-contracts.md)
- [`docs/02-architecture/data-model.md`](../../docs/02-architecture/data-model.md)
- [`docs/02-architecture/security-model.md`](../../docs/02-architecture/security-model.md)
