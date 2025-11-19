/** @type {import('@commitlint/types').UserConfig} */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'always'],
    'subject-case': [0],
    'header-pattern': [2, 'always', /^(feat|fix|chore|docs|refactor|style|test): .+ \(#\d+\)$/],
    'type-empty': [2, 'never'],
    'header-max-length': [2, 'always', 72],
  },
};
