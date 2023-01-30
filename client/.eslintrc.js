module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    semi: [2, 'always'],
    'space-before-function-paren': [
      'error',
      {anonymous: 'always', named: 'never'}
    ],
    'multiline-ternary': 0,
    'object-curly-spacing': ['error', 'never'],
    indent: 0,
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true
      }
    ]
  }
};
