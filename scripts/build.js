import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';
import { resolve } from 'path';

// Clean dist directory
console.log('Cleaning dist directory...');
const distPath = resolve('dist');
if (existsSync(distPath)) {
  rmSync(distPath, { recursive: true, force: true });
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
