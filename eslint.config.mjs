// eslint.config.mjs
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Base configuration
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      // Add other patterns from your .eslintignore file here
    ],
  },
  // Configuration for TypeScript and Prettier
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Enforces Prettier formatting as an ESLint rule
      // Add other ESLint rules here
    },
    settings: {
      'import/resolver': {
        typescript: {}, // Ensure TypeScript imports are resolved
      },
    },
  },
  // Include Prettier configuration to disable conflicting rules
  prettierConfig,
];
