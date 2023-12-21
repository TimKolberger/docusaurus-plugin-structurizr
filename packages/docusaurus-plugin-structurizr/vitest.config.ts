import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['json-summary', 'json', 'lcov'],
      reportOnFailure: true,
    },
    setupFiles: ['./test/setup-tests.ts'],
  },
})
