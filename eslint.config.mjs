import config from '@dps/eslint-config/library.mjs'

// This configuration only applies to the package manager root.
export default [
  ...config,
  {
    ignores: ['apps/**', 'packages/**'],
  },
]
