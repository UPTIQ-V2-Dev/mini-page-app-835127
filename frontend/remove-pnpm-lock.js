#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const lockFile = path.join(__dirname, 'pnpm-lock.yaml');

if (fs.existsSync(lockFile)) {
    console.log('Removing pnpm-lock.yaml...');
    fs.unlinkSync(lockFile);
    console.log('✅ pnpm-lock.yaml removed successfully');
} else {
    console.log('pnpm-lock.yaml not found');
}

console.log('Project is now ready to use npm instead of pnpm');
console.log('Run: npm install && npm run build');