import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tsEslint.config(
  // 启用类型检查的规则
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,

  // 代码风格规则
  stylistic.configs['recommended-flat'],
  {
    files: ['**/*.ts', '**/*.mjs'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: '.',
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      // TypeScript 规则
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    // 全局变量配置
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    // 忽略文件配置
    ignores: [
      'dist/**',
      'node_modules/**',
      'eslint.config.mjs',
      'commitlint.config.mjs',
      'rollup.config.ts',
    ],
  },
  eslintConfigPrettier,
)
