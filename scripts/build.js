const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Clean dist directory
console.log('Cleaning dist directory...');
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// Run Rollup
console.log('Building components...');
execSync('npx rollup -c', { stdio: 'inherit' });

// Post-build processing
console.log('Post-build processing...');
execSync('node scripts/post-build.js', { stdio: 'inherit' });

// Generate TypeScript declarations
console.log('Generating TypeScript declarations...');
execSync('npx tsc --emitDeclarationOnly', { stdio: 'inherit' });

console.log('Build completed successfully!');