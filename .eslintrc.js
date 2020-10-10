module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:jsdoc/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0,
  },
};
