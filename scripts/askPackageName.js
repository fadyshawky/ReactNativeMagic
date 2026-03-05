#!/usr/bin/env node

/**
 * Post-init script: if the user did not pass --package-name at init,
 * prompt for a package name and apply it to .env and iOS project.
 * Runs with cwd = the new project directory.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PACKAGE_NAME_REGEX = /^([a-zA-Z][a-zA-Z0-9_]*\.)+[a-zA-Z][a-zA-Z0-9_]*$/;

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve((answer || '').trim());
    });
  });
}

function validatePackageName(packageName) {
  const parts = packageName.split('.');
  if (parts.length < 2) {
    return 'Package name must have at least two segments (e.g. com.app)';
  }
  if (!PACKAGE_NAME_REGEX.test(packageName)) {
    return 'Package name can only contain letters, numbers, underscores and dots';
  }
  return null;
}

function ensureEnvHasPackageIds(envPath, packageName) {
  const fullPath = path.join(process.cwd(), envPath);
  let content = '';
  if (fs.existsSync(fullPath)) {
    content = fs.readFileSync(fullPath, 'utf8');
  }
  const lines = content.split('\n');
  const updated = lines.map((line) => {
    const eq = line.indexOf('=');
    if (eq === -1) return line;
    const key = line.slice(0, eq).trim();
    if (key === 'APP_ID' || key === 'ANDROID_APP_ID') {
      return `${key}=${packageName}`;
    }
    return line;
  });
  const hasAppId = lines.some((l) => /^APP_ID=/.test(l) || /^ANDROID_APP_ID=/.test(l));
  if (!hasAppId) {
    if (updated.length && updated[updated.length - 1] !== '') {
      updated.push('');
    }
    updated.push(`APP_ID=${packageName}`);
    updated.push(`ANDROID_APP_ID=${packageName}`);
  }
  fs.writeFileSync(fullPath, updated.join('\n'), 'utf8');
}

function getCurrentIosBundleId() {
  const iosDir = path.join(process.cwd(), 'ios');
  if (!fs.existsSync(iosDir)) return null;
  const entries = fs.readdirSync(iosDir, { withFileTypes: true });
  const pbxprojPaths = entries
    .filter((d) => d.isDirectory() && d.name.endsWith('.xcodeproj'))
    .map((d) => path.join(iosDir, d.name, 'project.pbxproj'))
    .filter((p) => fs.existsSync(p));
  const customPattern = /PRODUCT_BUNDLE_IDENTIFIER = "([^"]+)"/;
  for (const pbx of pbxprojPaths) {
    const content = fs.readFileSync(pbx, 'utf8');
    const customMatch = content.match(customPattern);
    if (customMatch) {
      const id = customMatch[1];
      if (!id.includes('$(')) return id;
    }
  }
  return null;
}

function updateIosBundleId(packageName) {
  const iosDir = path.join(process.cwd(), 'ios');
  if (!fs.existsSync(iosDir)) return;

  const entries = fs.readdirSync(iosDir, { withFileTypes: true });
  const pbxprojPaths = entries
    .filter((d) => d.isDirectory() && d.name.endsWith('.xcodeproj'))
    .map((d) => path.join(iosDir, d.name, 'project.pbxproj'))
    .filter((p) => fs.existsSync(p));

  for (const pbx of pbxprojPaths) {
    let content = fs.readFileSync(pbx, 'utf8');
    const pattern = /PRODUCT_BUNDLE_IDENTIFIER = "org\.reactjs\.native\.example\.\$\(PRODUCT_NAME:rfc1034identifier\)"/g;
    if (pattern.test(content)) {
      content = content.replace(
        /PRODUCT_BUNDLE_IDENTIFIER = "org\.reactjs\.native\.example\.\$\(PRODUCT_NAME:rfc1034identifier\)"/g,
        `PRODUCT_BUNDLE_IDENTIFIER = "${packageName}"`
      );
      fs.writeFileSync(pbx, content, 'utf8');
    }
  }
}

async function main() {
  const existingBundleId = getCurrentIosBundleId();
  if (existingBundleId) {
    // User passed --package-name; sync to .env for Android
    const envPath = path.join(process.cwd(), '.env');
    const examplePath = path.join(process.cwd(), '.env.example');
    if (!fs.existsSync(envPath) && fs.existsSync(examplePath)) {
      fs.copyFileSync(examplePath, envPath);
    }
    ensureEnvHasPackageIds('.env', existingBundleId);
    for (const f of ['.env.development', '.env.staging', '.env.production']) {
      if (fs.existsSync(path.join(process.cwd(), f))) {
        ensureEnvHasPackageIds(f, existingBundleId);
      }
    }
    console.log(`\nSynced package name ${existingBundleId} to .env (Android).\n`);
    return;
  }

  console.log('\nYou did not pass --package-name. Set a bundle ID (Android applicationId / iOS PRODUCT_BUNDLE_IDENTIFIER) now.\n');

  const answer = await prompt('Package name (e.g. com.company.app), or press Enter to skip: ');

  if (!answer) {
    console.log('\nSkipped. You can set APP_ID and ANDROID_APP_ID in .env later, and set the iOS bundle ID in Xcode or use react-native-rename.\n');
    return;
  }

  const err = validatePackageName(answer);
  if (err) {
    console.error('\nInvalid package name:', err);
    process.exit(1);
  }

  const packageName = answer;

  // Ensure .env exists
  const envPath = path.join(process.cwd(), '.env');
  const examplePath = path.join(process.cwd(), '.env.example');
  if (!fs.existsSync(envPath) && fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
  }

  ensureEnvHasPackageIds('.env', packageName);
  const envFiles = ['.env.development', '.env.staging', '.env.production'];
  for (const f of envFiles) {
    if (fs.existsSync(path.join(process.cwd(), f))) {
      ensureEnvHasPackageIds(f, packageName);
    }
  }

  updateIosBundleId(packageName);

  console.log(`\nSet package name to ${packageName} in .env and iOS project.\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
