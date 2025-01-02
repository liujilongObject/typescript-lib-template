import { defineConfig } from 'rollup'
import alias from '@rollup/plugin-alias'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel'
import { dts } from 'rollup-plugin-dts'

import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { promisify } from 'util'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const extensions = ['.js', '.ts']

const resolveAlias = () =>alias({
  entries: [
    { find: '@', replacement: path.resolve(__dirname, 'src') }
  ]
})

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        exports: 'named',
      },
    ],
    external: [/@babel\/runtime/],
    plugins: [
      resolveAlias(),
      nodeResolve({ extensions }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
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
  },
  // 合并类型声明文件
  {
    input: './dist/types/index.d.ts', // 指向生成的类型声明文件入口
    output: [{ file: 'dist/index.d.ts', format: 'es' }], // 合并后的输出文件
    plugins: [
      resolveAlias(),
      dts(),
      {
        name: 'cleanup-types',
        buildEnd: async () => {
          // 生产环境清除 dist/types 目录
          if (process.env.BUILD === 'production') {
            try {
              await promisify(exec)('rimraf dist/types')
            } catch (error) {
              console.error('Error deleting dist/types directory:', error)
            }
          }
        },
      },
    ],
  }
])
