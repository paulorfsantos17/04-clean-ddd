import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    coverage: {
      provider: 'v8',
    },
    globals: true,
    include: ['./src/**/*.spec.ts'],
  },
})
