# 自动递增 SKILL.md 版本号脚本
# 使用方法：.\bump-version.ps1 [major|minor|patch]
# 默认递增 patch 版本（2.0.0 -> 2.0.1）

param(
    [ValidateSet('major', 'minor', 'patch')]
    [string]$Type = 'patch'
)

$skillPath = Join-Path $PSScriptRoot "SKILL.md"

if (-not (Test-Path $skillPath)) {
    Write-Error "SKILL.md not found at $skillPath"
    exit 1
}

# 读取文件内容
$content = Get-Content $skillPath -Raw -Encoding UTF8

# 提取当前版本号
if ($content -match 'version:\s*(\d+)\.(\d+)\.(\d+)') {
    $major = [int]$matches[1]
    $minor = [int]$matches[2]
    $patch = [int]$matches[3]

    $oldVersion = "$major.$minor.$patch"

    # 根据类型递增
    switch ($Type) {
        'major' {
            $major++
            $minor = 0
            $patch = 0
        }
        'minor' {
            $minor++
            $patch = 0
        }
        'patch' {
            $patch++
        }
    }

    $newVersion = "$major.$minor.$patch"

    # 替换版本号
    $content = $content -replace "version:\s*\d+\.\d+\.\d+", "version: $newVersion"

    # 写回文件（保持UTF-8编码）
    [System.IO.File]::WriteAllText($skillPath, $content, [System.Text.UTF8Encoding]::new($false))

    Write-Host "✅ Version bumped: $oldVersion → $newVersion" -ForegroundColor Green

    # 同步更新 marketplace.json
    $marketplacePath = Join-Path $PSScriptRoot ".claude-plugin\marketplace.json"
    if (Test-Path $marketplacePath) {
        $json = Get-Content $marketplacePath -Raw -Encoding UTF8 | ConvertFrom-Json
        $json.metadata.version = $newVersion
        $json | ConvertTo-Json -Depth 10 | Set-Content $marketplacePath -Encoding UTF8
        Write-Host "✅ marketplace.json version updated: $newVersion" -ForegroundColor Green
    }

} else {
    Write-Error "Could not find version line in SKILL.md (expected format: version: x.y.z)"
    exit 1
}
