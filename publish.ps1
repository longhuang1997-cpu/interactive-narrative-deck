# 一键发布脚本
# 自动递增版本号 + Git提交 + 推送
# 使用方法：.\publish.ps1 "commit message" [patch|minor|major]

param(
    [Parameter(Mandatory=$true)]
    [string]$Message,

    [ValidateSet('major', 'minor', 'patch')]
    [string]$VersionType = 'patch'
)

# 1. 递增版本号
Write-Host "📦 Bumping version ($VersionType)..." -ForegroundColor Cyan
& "$PSScriptRoot\bump-version.ps1" $VersionType

if ($LASTEXITCODE -ne 0) {
    Write-Error "Version bump failed"
    exit 1
}

# 2. Git提交
Write-Host "`n📝 Committing changes..." -ForegroundColor Cyan
git add .
git commit -m $Message

if ($LASTEXITCODE -ne 0) {
    Write-Error "Git commit failed"
    exit 1
}

# 3. 推送到GitHub
Write-Host "`n🚀 Pushing to GitHub..." -ForegroundColor Cyan
git push

if ($LASTEXITCODE -ne 0) {
    Write-Error "Git push failed"
    exit 1
}

Write-Host "`n✅ Successfully published!" -ForegroundColor Green
Write-Host "🔗 Check: https://github.com/longhuang1997-cpu/interactive-narrative-deck" -ForegroundColor Yellow
