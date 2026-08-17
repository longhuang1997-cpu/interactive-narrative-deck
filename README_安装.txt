═══════════════════════════════════════════════════════════
  Interactive Narrative Deck - Claude Code Skill 安装包
═══════════════════════════════════════════════════════════

📦 这是什么？
    一个让 Claude 帮你做"交互式汇报演示"的技能包
    比 PPT 更活，比游戏更专业，职场正式场合用

⚡ 3步安装（2分钟）

  【方式1 - 命令行（最快）】
  1. 打开 PowerShell / 终端
  2. 进入本文件夹，运行：

     Windows:
     xcopy /E /I /Y . "%USERPROFILE%\.claude\skills\interactive-narrative-deck"

     macOS/Linux:
     cp -r . ~/.claude/skills/interactive-narrative-deck

  3. 重启 Claude Code (Codex)


  【方式2 - 手动复制】
  1. 找到你的 Claude Code skills 目录：
     Windows:  C:\Users\你的用户名\.claude\skills\
     macOS:    ~/.claude/skills/

  2. 在 skills 目录里新建文件夹：interactive-narrative-deck

  3. 把本文件夹里的所有文件复制进去
     （SKILL.md、engine/、templates/ 等全部复制）

  4. 重启 Claude Code

✅ 验证安装

  重启后，在 Claude 对话中说：

  "帮我做一个战略汇报演示，包含封面、核心指标、趋势图"

  Claude 应该会自动调用这个 skill 生成 HTML 演示文件

📖 详细文档

  → 安装指引.md       （完整安装说明 + 常见问题）
  → README.md         （使用文档 + API 参考）
  → SKILL.md          （给 Claude 看的技能定义）

🎯 快速示例

  安装后可以这样用：

  "用 interactive-narrative-deck 做产品发布会演示"
  "把第2页改成柱状图，数据用Q1-Q4销售额"
  "主题色改成深蓝 #1e40af"

═══════════════════════════════════════════════════════════
  有问题？先看《安装指引.md》的常见问题章节
═══════════════════════════════════════════════════════════