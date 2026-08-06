import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
    {
        ignores: ['dist', 'node_modules'],
    },

    {
        files: ['**/*.{ts,tsx}'],

        extends: [js.configs.recommended, ...tseslint.configs.recommended],

        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
        },

        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'simple-import-sort': simpleImportSort,
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            // React hooks
            ...reactHooks.configs.recommended.rules,

            // React refresh
            'react-refresh/only-export-components': [
                'warn',
                {
                    allowConstantExport: true,
                },
            ],

            // Imports
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
);
