import { type SheriffSettings, sheriff, tseslint } from 'eslint-config-sheriff';

const sheriffOptions: SheriffSettings = {
    react: true,
    lodash: false,
    remeda: false,
    next: true,
    astro: false,
    playwright: false,
    jest: false,
    vitest: false,
};

export default tseslint.config(sheriff(sheriffOptions), {
    rules: {
        'import/first': 2, // 'import/first' is now enabled everywhere.
    },
});

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
//             // Optional: add or override any ESLint rules you want here
//         },
//     },
// ];

// export default config;
