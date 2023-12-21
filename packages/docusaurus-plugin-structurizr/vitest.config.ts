import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['json-summary', 'json', 'lcov'],
      reportOnFailure: true,
      thresholds: {
        lines: 90,
        branches: 90,
        functions: 75,
        statements: 90,
      },
    },
    setupFiles: ['./test/setup-tests.ts'],
  },
})
