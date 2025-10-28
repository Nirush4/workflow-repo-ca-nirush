import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // 👈 This adds browser-like APIs including localStorage
    include: ['js/**/*.test.js'],
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
  },
})
