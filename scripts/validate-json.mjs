#!/usr/bin/env node
// validate-json.mjs — Recursively find and validate JSON files.

import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!entry.startsWith('.git') && entry !== 'node_modules') {
        walk(full, files);
      }
    } else if (extname(entry) === '.json') {
      files.push(full);
    }
  }
  return files;
}

const jsonFiles = walk(root);
let valid = 0;
let invalid = 0;

for (const file of jsonFiles) {
  try {
    JSON.parse(readFileSync(file, 'utf-8'));
    valid++;
  } catch (e) {
    console.log(`INVALID JSON: ${file.replace(root, '')} — ${e.message}`);
    invalid++;
  }
}

console.log(`\nJSON Validation Results:`);
console.log(`  Total:   ${jsonFiles.length}`);
console.log(`  Valid:   ${valid}`);
console.log(`  Invalid: ${invalid}`);

if (invalid > 0) {
  process.exit(1);
}
