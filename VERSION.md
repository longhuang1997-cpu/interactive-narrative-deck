# 版本管理说明

## 自动递增版本号

每次修改后，运行以下命令自动更新 `SKILL.md` 和 `marketplace.json` 的版本号：

```powershell
# 递增 patch 版本（2.0.0 -> 2.0.1）- 默认
.\bump-version.ps1

# 递增 minor 版本（2.0.1 -> 2.1.0）- 新功能
.\bump-version.ps1 minor

# 递增 major 版本（2.1.0 -> 3.0.0）- 重大变更
.\bump-version.ps1 major
```

## 版本号规范（语义化版本）

- **major（主版本号）**：不兼容的重大变更（如架构重构、API破坏性改动）
- **minor（次版本号）**：向后兼容的新功能（如新增Block类型、新增叙事框架）
- **patch（修订号）**：向后兼容的Bug修复、文档更新、小优化

## 完整发布流程

```powershell
# 1. 修改代码
# ... 编辑文件 ...

# 2. 递增版本号
.\bump-version.ps1        # 或 .\bump-version.ps1 minor

# 3. 提交并推送
git add .
git commit -m "feat: 新功能描述" # 或 "fix: Bug修复" / "docs: 文档更新"
git push

# 4. 创建 GitHub Release（可选）
gh release create v2.0.1 --title "v2.0.1 修复评审反馈" --notes "详细说明"
```

## 快速命令（一键发布）

如果想合并上述步骤，可以创建快捷脚本：

```powershell
# publish.ps1 - 一键发布
param([string]$message = "update", [string]$type = "patch")
.\bump-version.ps1 $type
git add .
git commit -m $message
git push
Write-Host "✅ Published!" -ForegroundColor Green
```

使用：
```powershell
.\publish.ps1 "fix: 修复Trust问题" patch
```

## 版本历史

当前版本：**2.0.0**

- `2.0.0` - 针对评审反馈优化（Trust/Reliability/Convention）
- `1.0.0` - 初始版本
