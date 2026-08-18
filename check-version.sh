#!/bin/bash
# Git提交前检查版本号是否更新
# 放在 .git/hooks/pre-commit (需要Git仓库)

SKILL_VERSION=$(grep -oP 'version:\s*\K[\d.]+' SKILL.md | head -1)
JSON_VERSION=$(grep -oP '"version":\s*"\K[\d.]+' .claude-plugin/marketplace.json | head -1)

if [ "$SKILL_VERSION" != "$JSON_VERSION" ]; then
    echo "❌ 版本号不一致！"
    echo "   SKILL.md: $SKILL_VERSION"
    echo "   marketplace.json: $JSON_VERSION"
    echo ""
    echo "请同步更新两个文件的版本号"
    exit 1
fi

echo "✅ 版本号一致: $SKILL_VERSION"
