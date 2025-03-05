import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tseslint.parser, // Ensures TypeScript files are parsed correctly
    },
    rules: {
      'no-unused-vars': 'warn', // Warn about unused variables instead of errors
      'no-console': 'off', // Allow console.log() (default is warn)
      eqeqeq: 'error', // Enforce strict equality (`===` and `!==`)
      curly: 'error', // Require curly braces around blocks
      indent: ['error', 2], // Enforce 2-space indentation
      semi: ['error', 'always'], // Require semicolons
      'prefer-const': 'error', // Require `const` when a variable is never reassigned
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
