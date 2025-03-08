import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import eslintJsonc from 'eslint-plugin-jsonc';
import eslintJsoncParser from 'jsonc-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import markdownPlugin from 'eslint-plugin-markdownlint';
import markdownPluginParser from 'eslint-plugin-markdownlint/parser.js';
import js from '@eslint/js';

export default [
  {
    // global ignores
    // folders can only be ignored at the global level, per-cfg you must do: '**/dist/**/*'
    ignores: [
      '**/node_modules/',
      'db.json',
      '**/public',
      '**/package.json',
      '**/package-lock.json',
      '**/*.min.js',
      '**/fontawesome/*',
    ],
  },
  // general defaults
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.js'],
    ignores: [],
    rules: {
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],
      'no-console': 'warn',
      'import/extensions': [
        'warn',
        'always',
        {
          js: 'always',
          json: 'always',
        },
      ],
    },
    plugins: {
      prettier,
      importPlugin,
    },
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2018,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.mocha,
        // for themes
        ...globals.browser,
        ...globals.jquery,
        hexo: true,
      },
      parserOptions: {
        requireConfigFile: false,
        allowImportExportEverywhere: true,

        ecmaFeatures: {
          experimentalObjectRestSpread: true,
        },
      },
    },
  },
  {
    files: ['**/*.json'],
    ignores: ['**/package.json', '**/package-lock.json'],
    plugins: {
      jsonc: eslintJsonc,
      prettier,
    },
    languageOptions: {
      parser: eslintJsoncParser,
      parserOptions: {
        jsonSyntax: 'JSON',
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true,
        },
      ],
      'no-console': 'warn',
    },
  },
  // not yet updated to flat config
  // markdownPlugin.configs.recommended,
  {
    files: ['**/*.md'],
    plugins: {
      markdown: markdownPlugin,
    },
    languageOptions: {
      parser: markdownPluginParser,
    },
    rules: {
      'markdownlint/md013': 'off',
      'markdownlint/md024': 'off',
      'markdownlint/md033': 'off',
      'markdownlint/md041': 'off',
    },
  },
];
