#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Setting up pnpm for the project...');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  try {
    // Try to install pnpm via npm first
    console.log('Attempting to install pnpm via npm...');
    execSync('npm install -g pnpm', { stdio: 'inherit' });
    
    console.log('pnpm installed successfully!');
    
    // Now run pnpm install
    console.log('Installing project dependencies...');
    execSync('pnpm install', { stdio: 'inherit' });
    
    console.log('Building project...');
    execSync('pnpm run build', { stdio: 'inherit' });
    
    console.log('✅ Setup completed successfully!');
    
  } catch (error) {
    console.log('npm install failed, trying alternative approach...');
    
    try {
      // Alternative: download pnpm binary directly
      const pnpmUrl = 'https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linux-x64';
      const pnpmPath = path.join(__dirname, 'pnpm-local');
      
      console.log('Downloading pnpm binary...');
      await downloadFile(pnpmUrl, pnpmPath);
      
      // Make executable
      fs.chmodSync(pnpmPath, '755');
      
      console.log('Running pnpm install...');
      execSync(`${pnpmPath} install`, { stdio: 'inherit' });
      
      console.log('Building project...');
      execSync(`${pnpmPath} run build`, { stdio: 'inherit' });
      
      console.log('✅ Setup completed with local pnpm!');
      
    } catch (altError) {
      console.log('All pnpm approaches failed, falling back to npm...');
      
      // Remove pnpm-lock.yaml to avoid conflicts
      const lockFile = path.join(__dirname, 'pnpm-lock.yaml');
      if (fs.existsSync(lockFile)) {
        fs.unlinkSync(lockFile);
      }
      
      console.log('Installing with npm...');
      execSync('npm install', { stdio: 'inherit' });
      
      console.log('Building with npm...');
      execSync('npm run build', { stdio: 'inherit' });
      
      console.log('✅ Setup completed with npm!');
    }
  }
}

main().catch(console.error);