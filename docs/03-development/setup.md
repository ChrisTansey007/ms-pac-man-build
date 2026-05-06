# Development Setup

> **Customize after forking. How to set up [PROJECT_NAME] for local development.**

## Prerequisites

- [Node.js](https://nodejs.org/) v[VERSION]+
- [Git](https://git-scm.com/)
- [DATABASE] v[VERSION]
- [Other prerequisites]

## Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | Database connection string | — |
| `[OTHER_VAR]` | [Description] | — |

## Scripts

See [`commands.md`](./commands.md) for all available commands.

## Related Files

- [`commands.md`](./commands.md) — Available commands
- [`coding-standards.md`](./coding-standards.md) — Coding standards
- [`../../agent-os/state/system-state.json`](../../agent-os/state/system-state.json) — System state
