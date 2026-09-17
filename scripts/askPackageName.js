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
    if (key === 'APP_ID' || key === 'ANDROID_APP_ID' || key === 'BUNDLE_ID') {
      return `${key}=${packageName}`;
    }
    return line;
  });
  const hasAppId = lines.some((l) => /^APP_ID=/.test(l));
  const hasAndroidAppId = lines.some((l) => /^ANDROID_APP_ID=/.test(l));
  const hasBundleId = lines.some((l) => /^BUNDLE_ID=/.test(l));
  const appended = [];
  if (!hasAppId) appended.push(`APP_ID=${packageName}`);
  if (!hasAndroidAppId) appended.push(`ANDROID_APP_ID=${packageName}`);
  if (!hasBundleId) appended.push(`BUNDLE_ID=${packageName}`);
  if (appended.length) {
    if (updated.length && updated[updated.length - 1] !== '') {
      updated.push('');
    }
    updated.push(...appended);
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

function removeDirIfEmptyUpTo(startDir, stopDir) {
  let dir = startDir;
  while (
    dir.startsWith(stopDir) &&
    dir !== stopDir &&
    fs.existsSync(dir) &&
    fs.readdirSync(dir).length === 0
  ) {
    fs.rmdirSync(dir);
    dir = path.dirname(dir);
  }
}

/**
 * Align the Android applicationId with the chosen bundle id.
 *
 * The RN CLI derives the launch package from the Gradle `namespace` (it can't
 * read our env-driven applicationId), so namespace MUST equal the installed
 * applicationId or `run-android` fails with "Activity class ... does not exist".
 * This rewrites the namespace + the defaultApplicationId fallback literal, moves
 * the Kotlin/Java sources into the new package dir, and updates their `package`
 * declarations so a custom bundle id is fully launchable. Idempotent + defensive.
 */
function applyAndroidPackage(packageName) {
  const root = process.cwd();
  const gradlePath = path.join(root, 'android', 'app', 'build.gradle');
  if (!fs.existsSync(gradlePath)) return;

  const gradle = fs.readFileSync(gradlePath, 'utf8');
  const nsMatch = gradle.match(/namespace\s+["']([^"']+)["']/);
  if (!nsMatch) return;
  const oldPackage = nsMatch[1];

  // Keep namespace + the defaultApplicationId fallback literal in sync with the
  // chosen bundle id (safe to run even if they are already correct).
  const nextGradle = gradle
    .replace(/namespace\s+["'][^"']+["']/, `namespace "${packageName}"`)
    .replace(
      /def\s+defaultApplicationId\s*=\s*["'][^"']+["']/,
      `def defaultApplicationId = "${packageName}"`
    );
  if (nextGradle !== gradle) {
    fs.writeFileSync(gradlePath, nextGradle, 'utf8');
  }

  if (oldPackage === packageName) return;

  const oldSegments = oldPackage.split('.');
  const newSegments = packageName.split('.');
  for (const lang of ['java', 'kotlin']) {
    const baseDir = path.join(root, 'android', 'app', 'src', 'main', lang);
    const oldDir = path.join(baseDir, ...oldSegments);
    if (!fs.existsSync(oldDir)) continue;
    const newDir = path.join(baseDir, ...newSegments);
    fs.mkdirSync(newDir, { recursive: true });
    for (const entry of fs.readdirSync(oldDir)) {
      const oldFile = path.join(oldDir, entry);
      if (!fs.statSync(oldFile).isFile()) continue;
      const src = fs.readFileSync(oldFile, 'utf8').split(oldPackage).join(packageName);
      fs.writeFileSync(path.join(newDir, entry), src, 'utf8');
      fs.unlinkSync(oldFile);
    }
    removeDirIfEmptyUpTo(oldDir, baseDir);
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
    try {
      applyAndroidPackage(existingBundleId);
    } catch (e) {
      console.warn('Could not update Android package automatically:', e.message);
    }
    console.log(`\nSynced package name ${existingBundleId} to .env + Android.\n`);
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
  try {
    applyAndroidPackage(packageName);
  } catch (e) {
    console.warn('Could not update Android package automatically:', e.message);
  }

  console.log(`\nSet package name to ${packageName} in .env, iOS, and Android.\n`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

module.exports = {
  applyAndroidPackage,
  ensureEnvHasPackageIds,
  getCurrentIosBundleId,
  updateIosBundleId,
  validatePackageName,
};
