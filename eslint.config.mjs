import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,

    // Override default ignores of eslint-config-next
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'my-app/**', '**/dist/**', '**/coverage/**']),

    // Custom configuration
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
            prettier: prettierPlugin,
        },
        rules: {
            // Custom React rules
            'react/jsx-curly-brace-presence': 'error',

            // TypeScript rules
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

            // Import sorting
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',

            // Prettier integration
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
        },
    },
])

export default eslintConfig
