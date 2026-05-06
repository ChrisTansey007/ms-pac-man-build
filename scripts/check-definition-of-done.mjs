#!/usr/bin/env node
// check-definition-of-done.mjs — Check that tasks in review/ have handoff and verification references.

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const reviewDir = join(root, 'agent-os', 'tasks', 'review');
const handoffsDir = join(root, 'agent-os', 'handoffs', 'active');
const verificationDir = join(root, 'agent-os', 'reports', 'verification');

if (!existsSync(reviewDir)) {
  console.log('No review directory found.');
  console.log('DoD Check: 0 tasks in review');
  process.exit(0);
}

const reviewTasks = readdirSync(reviewDir).filter(f => f.endsWith('.md') && f !== 'README.md');

if (reviewTasks.length === 0) {
  console.log('DoD Check: No tasks in review.');
  process.exit(0);
}

const handoffFiles = existsSync(handoffsDir) ? readdirSync(handoffsDir).filter(f => f.endsWith('.md') && f !== 'README.md') : [];
const verificationFiles = existsSync(verificationDir) ? readdirSync(verificationDir).filter(f => f.endsWith('.md') && f !== 'README.md') : [];

let passed = 0;
let failed = 0;

for (const taskFile of reviewTasks) {
  const taskId = taskFile.replace('.md', '');
  const content = readFileSync(join(reviewDir, taskFile), 'utf-8');
  const issues = [];

  // Check for handoff reference
  const hasHandoffRef = handoffFiles.some(h => h.startsWith(taskId));
  if (!hasHandoffRef) {
    issues.push('No handoff found in handoffs/active/');
  }

  // Check for verification reference
  const hasVerificationRef = verificationFiles.some(v => v.includes(taskId));
  if (!hasVerificationRef) {
    issues.push('No verification report found in reports/verification/');
  }

  // Check for acceptance criteria section
  if (!content.includes('Acceptance Criteria')) {
    issues.push('Missing Acceptance Criteria section');
  }

  // Check for handoff section
  if (!content.includes('Handoff Required')) {
    issues.push('Missing Handoff Required section');
  }

  // Warn about potential self-close
  const claimedMatch = content.match(/Current [Cc]laimed [Ww]orker[\s\S]*?\n([^\n]+)/);
  if (claimedMatch) {
    const claimedWorker = claimedMatch[1].trim();
    if (claimedWorker.toLowerCase() !== 'none') {
      console.log(`WARN: ${taskId} — Task in review but claimed by ${claimedWorker}. Ensure reviewer is different.`);
    }
  }

  if (issues.length > 0) {
    console.log(`FAIL: ${taskId} — ${issues.join('; ')}`);
    failed++;
  } else {
    console.log(`PASS: ${taskId}`);
    passed++;
  }
}

console.log(`\nDefinition of Done Check:`);
console.log(`  Tasks in review: ${reviewTasks.length}`);
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
}
