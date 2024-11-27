import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel'

const extensions = ['.js', '.ts']

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  external: [/@babel\/runtime/],
  plugins: [
    nodeResolve({ extensions }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      outDir: './dist',
      exclude: ['node_modules/**'],
    }),
    babel({
      extensions,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      skipPreflightCheck: true,
    }),
    terser(),
  ],
})
