#!/usr/bin/env node

/**
 * CI helper: write/update KEY=VALUE pairs in an env file.
 * Used in Codemagic / Bitrise / GitHub Actions to sync version codes,
 * build numbers, or any other env var into .env.<environment> before build.
 *
 * Usage:
 *   node scripts/ci-sync-env.cjs <envFile> KEY=value [KEY=value ...]
 *
 * Example (bump Android version code to next Play Store value):
 *   node scripts/ci-sync-env.cjs .env.production ANDROID_VERSION_CODE=42 IOS_BUILD_NUMBER=42
 */

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const [, , envFile, ...pairs] = argv;
  if (!envFile) {
    console.error(
      'Usage: node scripts/ci-sync-env.cjs <envFile> KEY=value [KEY=value ...]',
    );
    process.exit(1);
  }
  const updates = {};
  for (const pair of pairs) {
    const eq = pair.indexOf('=');
    if (eq === -1) {
      console.error(`Skipping invalid pair (no '='): ${pair}`);
      continue;
    }
    const key = pair.slice(0, eq).trim();
    const value = pair.slice(eq + 1);
    updates[key] = value;
  }
  return { envFile: path.resolve(process.cwd(), envFile), updates };
}

function applyUpdates(envFile, updates) {
  let content = '';
  if (fs.existsSync(envFile)) {
    content = fs.readFileSync(envFile, 'utf8');
  }
  const lines = content.split('\n');
  const seen = new Set();
  const output = lines.map((line) => {
    const eq = line.indexOf('=');
    if (eq === -1) return line;
    const key = line.slice(0, eq).trim();
    if (key in updates) {
      seen.add(key);
      return `${key}=${updates[key]}`;
    }
    return line;
  });
  for (const key of Object.keys(updates)) {
    if (!seen.has(key)) {
      if (output.length && output[output.length - 1] !== '') output.push('');
      output.push(`${key}=${updates[key]}`);
    }
  }
  fs.writeFileSync(envFile, output.join('\n'), 'utf8');
}

const { envFile, updates } = parseArgs(process.argv);
applyUpdates(envFile, updates);
console.log(`Updated ${envFile}:`);
for (const [k, v] of Object.entries(updates)) {
  console.log(`  ${k}=${v}`);
}
