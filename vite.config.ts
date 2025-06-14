
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode, command }) => ({
  server: {
    port: 8080, // Fix: use 8080 as required and only specify once
    allowedHosts: [
      'dev.julianamanduca.com.br'
    ]
  },
  preview: {
    port: parseInt(process.env.PORT || "3002"), // fix: ensure fallback is string
    host: true,
    allowedHosts: [
      'dev.julianamanduca.com.br',
      'live-projects-1-aplication-juliana-dev.leapir.easypanel.host'
    ]
  },
  plugins: [
    react(),
    svgr({ svgrOptions: { icon: true } }),
    // mode === 'development' && componentTagger(), // Fix: Remove undefined plugin
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/dist/**',
        '**/.{idea,git,cache,output,temp}/**',
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
  },
}));
