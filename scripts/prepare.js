import { existsSync, unlinkSync } from 'fs'
import { join } from 'path'

// 检查包管理器
const agent = process.env.npm_execpath || ''

if (!agent.includes('pnpm')) {
  try {
    // 检查是否已经存在 pnpm-lock.yaml
    if (!existsSync('pnpm-lock.yaml')) {
      throw new Error('pnpm-lock.yaml 文件不存在')
    }
    
    console.error('\x1B[31m%s\x1B[0m', '错误: 该项目强制使用 pnpm 作为包管理器!')
    console.error('\x1B[36m%s\x1B[0m', '安装方法: npm install -g pnpm')
    console.error('\x1B[36m%s\x1B[0m', '使用方法: pnpm install')
  } catch {
    // 如果不存在 pnpm-lock.yaml,说明是首次安装, 直接报错退出
    console.error('\x1B[31m%s\x1B[0m', '错误: 请先安装 pnpm!')
    console.error('\x1B[36m%s\x1B[0m', '安装方法: npm install -g pnpm') 
  } finally {
    // 删除 package-lock.json 和 yarn.lock
    const lockFiles = ['package-lock.json', 'yarn.lock']
    lockFiles.forEach(file => {
      const lockPath = join(process.cwd(), file)
      if (existsSync(lockPath)) {
        try {
          unlinkSync(lockPath)
        } catch (e) {}
      }
    })

    process.exit(1)
  }
}
