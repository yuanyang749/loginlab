# 🌿 分支管理策略

## 📋 分支说明

### 🚀 **master** - 生产环境

- **用途**: 生产环境代码，对外发布的稳定版本
- **部署**: 自动部署到 Vercel 生产环境
- **访问**: 正式网站地址
- **保护**: 只能通过 PR 合并，不允许直接推送

### 🔧 **develop** - 开发测试环境

- **用途**: 开发测试代码，新功能集成测试
- **部署**: 自动部署到 Vercel 预览环境
- **访问**: 预览地址（如 `develop-loginlab.vercel.app`）
- **保护**: 开发人员可以直接推送

## 🔄 工作流程

### 日常开发流程

```bash
# 1. 切换到 develop 分支
git checkout develop

# 2. 拉取最新代码
git pull origin develop

# 3. 进行开发工作
# ... 编辑代码 ...

# 4. 提交更改
git add .
git commit -m "✨ 添加新功能"

# 5. 推送到 develop
git push origin develop
```

### 发布到生产环境

```bash
# 1. 确保 develop 分支测试完成
git checkout develop
git pull origin develop

# 2. 切换到 master 分支
git checkout master
git pull origin master

# 3. 合并 develop 到 master
git merge develop

# 4. 推送到生产环境
git push origin master

# 5. 切换回 develop 继续开发
git checkout develop
```

### 使用 Pull Request（推荐）

```bash
# 1. 在 develop 分支完成开发
git checkout develop
git add .
git commit -m "🎨 完成新功能开发"
git push origin develop

# 2. 在 GitHub 上创建 PR: develop → master
# 3. 代码审查通过后合并
# 4. 自动部署到生产环境
```

## 🎯 分支命名规范

### 功能分支

```bash
feature/login-animation     # 新功能
feature/mobile-optimization # 移动端优化
```

### 修复分支

```bash
hotfix/login-bug           # 紧急修复
bugfix/style-issue         # 一般修复
```

### 创建功能分支示例

```bash
# 从 develop 创建功能分支
git checkout develop
git checkout -b feature/new-login-style

# 开发完成后合并回 develop
git checkout develop
git merge feature/new-login-style
git branch -d feature/new-login-style
```

## 🚀 Vercel 部署配置

### 生产环境 (master)

- **域名**: 主域名（如 `loginlab.vercel.app`）
- **触发**: master 分支推送时自动部署
- **环境**: Production

### 开发环境 (develop)

- **域名**: 预览域名（如 `develop-loginlab.vercel.app`）
- **触发**: develop 分支推送时自动部署
- **环境**: Preview

## 📱 实际操作示例

### 场景 1: 日常开发

```bash
# 在 develop 分支开发新功能
git checkout develop
echo "新功能代码" >> src/new-feature.js
git add .
git commit -m "✨ 添加新的登录动画效果"
git push origin develop
# → 自动部署到开发环境预览
```

### 场景 2: 发布到生产

```bash
# 开发完成，准备发布
git checkout master
git merge develop
git push origin master
# → 自动部署到生产环境
```

### 场景 3: 紧急修复

```bash
# 生产环境发现问题，紧急修复
git checkout master
git checkout -b hotfix/urgent-fix
# ... 修复代码 ...
git add .
git commit -m "🐛 修复登录页面显示问题"
git checkout master
git merge hotfix/urgent-fix
git push origin master
# 同时合并到 develop
git checkout develop
git merge hotfix/urgent-fix
git push origin develop
```

## 🔒 分支保护建议

在 GitHub 仓库设置中建议启用：

### master 分支保护

- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Restrict pushes that create files
- ✅ Include administrators

### develop 分支设置

- ✅ 允许直接推送（方便开发）
- ✅ 自动部署到预览环境

## 📊 分支状态监控

### 查看分支状态

```bash
git branch -a              # 查看所有分支
git log --oneline --graph  # 查看提交历史图
git status                 # 查看当前状态
```

### 同步分支

```bash
git fetch origin           # 获取远程更新
git pull origin develop    # 拉取 develop 最新代码
git pull origin master     # 拉取 master 最新代码
```

## 🎉 总结

这个分支策略的优势：

- ✅ **稳定的生产环境** - master 分支始终保持稳定
- ✅ **灵活的开发环境** - develop 分支可以自由测试
- ✅ **自动化部署** - 两个环境都自动部署
- ✅ **代码审查** - 通过 PR 确保代码质量
- ✅ **版本控制** - 清晰的发布流程

现在您可以在 develop 分支上自由开发和测试，确认无误后再发布到 master 生产环境！🚀
