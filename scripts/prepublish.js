import { execSync } from 'child_process'

// 检查当前分支
function checkGitBranch() {
  let currentBranch

  try {
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
  } catch (error) {
    console.error('[ERROR] 无法获取 git 分支信息')
    process.exit(1)
  }

  // 检查分支 e.g. master
  if (currentBranch !== 'master') {
    console.error('[ERROR] 只允许在 master 分支发布!')
    console.error('[ERROR] 当前分支:', currentBranch)
    process.exit(1)
  }
}

checkGitBranch()
