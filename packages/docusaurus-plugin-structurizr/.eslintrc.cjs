/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@dps/eslint-config/library.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
}
