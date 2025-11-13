#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log('Installing pnpm globally...');
  execSync('npm install -g pnpm', { stdio: 'inherit' });
  
  console.log('Installing project dependencies...');
  execSync('pnpm install', { stdio: 'inherit' });
  
  console.log('Building the project...');
  execSync('pnpm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Error during build process:', error.message);
  
  // Fallback: try with npm
  console.log('Falling back to npm...');
  try {
    if (fs.existsSync('pnpm-lock.yaml')) {
      console.log('Removing pnpm-lock.yaml to avoid conflicts...');
      fs.unlinkSync('pnpm-lock.yaml');
    }
    
    console.log('Installing dependencies with npm...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('Building with npm...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ Build completed successfully with npm!');
  } catch (npmError) {
    console.error('❌ Both pnpm and npm failed:', npmError.message);
    process.exit(1);
  }
}