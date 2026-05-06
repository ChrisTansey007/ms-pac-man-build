#!/usr/bin/env node
// generate-status-report.mjs — Generate a Markdown status report from state files.

import { readFileSync, readdirSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const stateDir = join(root, 'agent-os', 'state');
const tasksDir = join(root, 'agent-os', 'tasks');
const handoffsDir = join(root, 'agent-os', 'handoffs', 'active');
const reportsDir = join(root, 'agent-os', 'reports', 'status');

const now = new Date().toISOString().split('T')[0];
const timestamp = new Date().toISOString();

// Read state
let systemState = {};
try { systemState = JSON.parse(readFileSync(join(stateDir, 'system-state.json'), 'utf-8')); } catch {}

let workerStatus = {};
try { workerStatus = JSON.parse(readFileSync(join(stateDir, 'worker-status.json'), 'utf-8')); } catch {}

let assignmentState = {};
try { assignmentState = JSON.parse(readFileSync(join(stateDir, 'assignment-state.json'), 'utf-8')); } catch {}

let riskRegister = {};
try { riskRegister = JSON.parse(readFileSync(join(stateDir, 'risk-register.json'), 'utf-8')); } catch {}

// Count tasks by state
const LIFECYCLE = ['backlog', 'ready', 'claimed', 'in-progress', 'review', 'blocked', 'done'];
const taskCounts = {};
for (const folder of LIFECYCLE) {
  const fp = join(tasksDir, folder);
  taskCounts[folder] = existsSync(fp) ? readdirSync(fp).filter(f => f.endsWith('.md') && f !== 'README.md').length : 0;
}

// Count handoffs
const handoffCount = existsSync(handoffsDir) ? readdirSync(handoffsDir).filter(f => f.endsWith('.md') && f !== 'README.md').length : 0;

// Build report
const lines = [];
lines.push(`# Status Report — ${now}`);
lines.push(`> Generated: ${timestamp}`);
lines.push('');
lines.push('## System');
lines.push(`- **Repo:** ${systemState.repo_name || 'N/A'}`);
lines.push(`- **Phase:** ${systemState.current_phase || 'N/A'}`);
lines.push(`- **Execution Mode:** ${assignmentState.mode || 'N/A'}`);
lines.push(`- **Last updated:** ${systemState.last_updated || 'N/A'}`);
lines.push('');
lines.push('## Task Queue');
lines.push('| State | Count |');
lines.push('|-------|-------|');
for (const folder of LIFECYCLE) {
  lines.push(`| ${folder} | ${taskCounts[folder]} |`);
}
const totalTasks = Object.values(taskCounts).reduce((a, b) => a + b, 0);
lines.push(`| **Total** | **${totalTasks}** |`);
lines.push('');
lines.push('## Workers');
lines.push('| Worker | Status | Current Task | Active Roles |');
lines.push('|--------|--------|--------------|--------------|');
const workers = workerStatus.workers || {};
for (const [name, data] of Object.entries(workers)) {
  const roles = (data.active_roles || []).join(', ') || '—';
  lines.push(`| ${name} | ${data.status || 'unknown'} | ${data.current_task || '—'} | ${roles} |`);
}
lines.push('');
lines.push('## Assignments');
const assignments = assignmentState.assignments || [];
lines.push(`- Active assignments: ${assignments.length}`);
if (assignments.length > 0) {
  for (const a of assignments) {
    lines.push(`  - ${a.task || '?'} → ${a.worker || '?'} (${a.role || '?'})`);
  }
}
lines.push('');
lines.push('## Handoffs');
lines.push(`- Active handoffs: ${handoffCount}`);
lines.push('');
lines.push('## Risks');
const risks = riskRegister.risks || [];
lines.push(`- Total risks tracked: ${risks.length}`);
const activeRisks = risks.filter(r => r.status !== 'resolved');
if (activeRisks.length > 0) {
  for (const r of activeRisks) {
    lines.push(`  - **${r.id}:** ${r.title} (${r.likelihood}/${r.impact}) — ${r.status}`);
  }
}
lines.push('');

const report = lines.join('\n');

// Ensure directory exists
if (!existsSync(reportsDir)) {
  mkdirSync(reportsDir, { recursive: true });
}

const outPath = join(reportsDir, `status-${now}.md`);
writeFileSync(outPath, report);
console.log(`Status report written to: agent-os/reports/status/status-${now}.md`);
console.log(report);
