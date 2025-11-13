#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Converting project from pnpm to npm...');

// Remove pnpm-lock.yaml if it exists
const pnpmLockPath = path.join(__dirname, 'pnpm-lock.yaml');
if (fs.existsSync(pnpmLockPath)) {
  console.log('Removing pnpm-lock.yaml...');
  fs.unlinkSync(pnpmLockPath);
}

// Install dependencies with npm
console.log('Installing dependencies with npm...');
try {
  execSync('npm install', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ Dependencies installed successfully!');
  
  // Build the project
  console.log('Building the project...');
  execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ Project built successfully!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}