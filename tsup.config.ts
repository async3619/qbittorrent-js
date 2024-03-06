import { defineConfig } from 'tsup'

export default defineConfig(({ watch }) => ({
  entry: ['src/index.ts'],
  sourcemap: false,
  clean: true,
  minify: !watch,
  format: ['cjs', 'esm'],
  dts: true,
}))
