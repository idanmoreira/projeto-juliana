import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path'; // Import path

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // Ensure test environment is not trying to process CSS or other non-JS assets in a problematic way
    css: false, // or { modules: { classNameStrategy: 'non-scoped' } } if needed
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Explicitly define aliases
    },
  },
});
