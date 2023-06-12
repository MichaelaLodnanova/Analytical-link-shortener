module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['model', 'auth', 'be', 'fe', 'common', 'test'],
    ],
  },
};
