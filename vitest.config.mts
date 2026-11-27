import { defineConfig } from 'vitest/config'

export default defineConfig({
    // Resolves the `@/*` aliases of tsconfig.json
    resolve: { tsconfigPaths: true },
    test: {
        include: ['src/**/*.test.ts'],
        environment: 'node',
    },
})
