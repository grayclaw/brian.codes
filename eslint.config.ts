import js from '@eslint/js';
import react from 'eslint-plugin-react';
// @ts-ignore
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true, // ✅ Required for React rules to run
                },
            },
        },
        plugins: {
            react: react as any,
            'react-hooks': reactHooks as any,
        },
        rules: {
            'import/first': 0, // 'import/first' is now enabled everywhere.
            'react-hooks/exhaustive-deps': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
];

// export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
//     plugins: { 'react-hooks': reactHooks },
//     rules: {
//         'import/first': 0, // 'import/first' is now enabled everywhere.
//         'react-hooks/exhaustive-deps': 'warn',
//         'react-hooks/rules-of-hooks': 'error',
//         '@typescript-eslint/no-unused-vars': 'warn',
//     },
// });

// import { FlatCompat } from '@eslint/eslintrc';
// import js from '@eslint/js';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const compat = new FlatCompat({
//     baseDirectory: __dirname,
//     recommendedConfig: js.configs.recommended,
//     allConfig: js.configs.all,
// });

// const config = [
//     ...compat.extends('next/core-web-vitals', 'next/typescript'),
//     {
//         settings: {
//             'import/resolver': {
//                 typescript: {
//                     project: './tsconfig.json',
//                 },
//             },
//         },
//         rules: {
//             'exhaustive-deps': 'warn',
//             'react-hooks/exhaustive-deps': 'warn',
//             '@typescript-eslint/switch-exhaustiveness-check': 'warn',
//             // Optional: add or override any ESLint rules you want here
//         },
//     },
// ];

// export default config;
