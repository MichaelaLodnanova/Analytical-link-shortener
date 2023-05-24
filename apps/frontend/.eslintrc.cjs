module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: ['custom'],
  plugins: ['react-refresh', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
