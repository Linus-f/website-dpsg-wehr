import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    exclude: ['**/node_modules/**', '**/e2e/**', '**/dist/**'],
    reporters: ['default', ['html', {
        outputFile: './test-results/unit/index.html'
    }]],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
