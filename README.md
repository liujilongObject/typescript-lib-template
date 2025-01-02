# TypeScript Library Template

一个用于快速创建 TypeScript 库的模板项目，集成了现代前端开发所需的主要工具和最佳实践。

## 特性

- 🎯 TypeScript 支持
- 📦 ESM 和 CommonJS 双模块格式
- 🔧 完整的开发工具链
  - Rollup 构建
  - ESLint + Prettier 代码规范
  - Husky + lint-staged Git 钩子
  - Conventional Commits 提交规范
- 🚀 开箱即用的配置
- 📝 完整的类型声明文件

## 项目结构

```
src/           # 源代码目录
├── types/     # 类型定义
└── index.ts   # 入口文件
dist/          # 构建输出
scripts/       # 构建脚本
```

## 构建配置

- TypeScript 配置 (tsconfig.json)
- Rollup 配置 (rollup.config.mjs)
- ESLint 配置 (eslint.config.mjs)
- Prettier 配置 (.prettierrc)
- Babel 配置 (.babelrc)
- Commitlint 配置 (commitlint.config.mjs)

## 构建输出

- `dist/index.cjs.js` - CommonJS 格式
- `dist/index.esm.js` - ES Module 格式
- `dist/index.d.ts` - TypeScript 类型声明

## 开发指南

### 别名导入
项目配置了路径别名，可以使用 `@/` 指向 `src` 目录：

```ts
import { something } from '@/utils'
```

### Git 提交规范

提交信息必须符合 [Conventional Commits](https://www.conventionalcommits.org/) 规范

## 快速开始

### 克隆模板
```bash
git clone <repository-url> my-lib
```

### 进入项目目录

```bash
cd my-lib
```

### 安装依赖

```bash
pnpm install
```

### 可用命令

- `pnpm dev` - 开发模式
- `pnpm build` - 构建生产版本
- `pnpm lint` - 代码检查
- `pnpm format` - 代码格式化


## License

MIT
