import { defineConfig, globalIgnores } from 'eslint/config';
import { fixupConfigRules, includeIgnoreFile } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
        },
      },
    },
    // plugins: {
    //   import: require('eslint-plugin-import'),
    // },
    rules: {
      'import/no-unresolved': 'error',
    },
    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript'
      )
    ),
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  globalIgnores(['!.husky/*', 'eslint.config.mjs']),
]);
