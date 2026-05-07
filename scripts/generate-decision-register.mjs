#!/usr/bin/env node
// generate-decision-register.mjs — Render the Markdown decision register from JSON.

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const jsonPath = join(root, 'agent-os', 'state', 'decision-register.json');
const mdPath = join(root, 'docs', '05-decisions', 'decision-register.md');

let parsed;
try {
  parsed = JSON.parse(readFileSync(jsonPath, 'utf-8'));
} catch (error) {
  console.error(`Unable to read ${relative(root, jsonPath)}: ${error.message}`);
  process.exit(1);
}

const decisions = Array.isArray(parsed.decisions) ? parsed.decisions : [];
const lines = [];
lines.push('# Decision Register');
lines.push('');
lines.push('> **Generated from `agent-os/state/decision-register.json`. Edit the JSON source, then rerun `npm run generate:decisions`.**');
lines.push('');
lines.push('## Purpose');
lines.push('');
lines.push('Track every significant architectural decision. Each entry links to a full ADR document in [`../02-architecture/decisions/`](../02-architecture/decisions/).');
lines.push('');
lines.push('## Decisions');
lines.push('');
lines.push('| ADR | Title | Status | Date |');
lines.push('|-----|-------|--------|------|');
for (const decision of decisions) {
  const adr = decision.adr || 'ADR-XXXX';
  const title = decision.title || 'Untitled decision';
  const status = decision.status ? String(decision.status).replace(/^./, (c) => c.toUpperCase()) : 'Unknown';
  const date = decision.date || '—';
  const file = decision.file || `docs/02-architecture/decisions/${adr}.md`;
  lines.push(`| [${adr}](../02-architecture/decisions/${file.split('/').pop()}) | ${title} | ${status} | ${date} |`);
}
lines.push('');
lines.push('*Add new decisions to `agent-os/state/decision-register.json` and regenerate this file.*');
lines.push('');
lines.push('## How to Add a Decision');
lines.push('');
lines.push('1. Copy [`decision-template.md`](./decision-template.md).');
lines.push('2. Fill in all sections.');
lines.push('3. Save to [`../02-architecture/decisions/`](../02-architecture/decisions/) as `ADR-XXXX-description.md`.');
lines.push('4. Add a record to [`agent-os/state/decision-register.json`](../../agent-os/state/decision-register.json).');
lines.push('5. Run `npm run generate:decisions` to refresh this register.');
lines.push('');
lines.push('## Related Files');
lines.push('');
lines.push('- [`decision-template.md`](./decision-template.md) — ADR template');
lines.push('- [`../02-architecture/decisions/`](../02-architecture/decisions/) — ADR files');
lines.push('- [`../../agent-os/state/decision-register.json`](../../agent-os/state/decision-register.json) — Machine-readable source');
lines.push('');

writeFileSync(mdPath, lines.join('\n'));
console.log(`Wrote ${relative(root, mdPath)} from ${relative(root, jsonPath)} with ${decisions.length} decision(s).`);
