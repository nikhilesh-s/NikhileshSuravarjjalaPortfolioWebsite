// Simple build script for Vercel
const { execSync } = require('child_process');

try {
  // Run vite build directly (skipping TypeScript build)
  console.log('Building the project for Vercel...');
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
