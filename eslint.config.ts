import type { Linter } from 'eslint';

const config: Linter.Config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', '@typescript-eslint/recommended', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'no-console': 'warn',
  },
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['node_modules/', 'dist/', 'allure-results/', 'test-results/', 'auth/'],
};

export default config;
