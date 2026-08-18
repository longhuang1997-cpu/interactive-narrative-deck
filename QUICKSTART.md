# 快速开始（3分钟上手）

> 本指南帮你快速验证工具可用性，从安装到生成第一个演示。

---

## 📦 安装验证

### 方式1：本地skill安装（推荐）

```bash
# 1. 克隆到 Claude Code skills 目录
cd ~/.claude/skills  # Windows: %USERPROFILE%\.claude\skills
git clone https://github.com/longhuang1997-cpu/interactive-narrative-deck.git

# 2. 启动 Claude Code
claude

# 3. 验证安装
在 Claude 对话中输入："列出可用的 skills"
# 应该看到 interactive-narrative-deck 出现在列表中
```

### 方式2：直接使用（无需安装）

如果不想安装skill，可以直接让 Claude 按照 `SKILL.md` 的指引生成演示。

---

## 🚀 生成第一个演示（2分钟）

### 最简单的触发方式

在 Claude Code 中输入：

```
帮我做一个演示，主题是"Q3业务复盘"，包含：
- 封面
- 3个关键指标（营收/用户数/满意度）
- 1个趋势图（月度营收走势）
- 问题分析（3条）
- 下季度计划时间线

受众是管理层，15分钟汇报。
```

Claude 会：
1. 询问确认（或直接判断）叙事框架
2. 生成 `deck.js` 脚本文件
3. 生成 `index.html` 入口文件
4. 告诉你："已生成，双击 index.html 预览"

### 预览演示

```bash
# Windows: 直接双击 index.html
# 或在浏览器中打开
chrome index.html  # 或 edge/firefox
```

### 控制方式

- **左右方向键 / PageUp/PageDown**：翻页
- **空格键**：触发渐进揭示（标记为 `frag: true` 的 block）
- **O键**：总览模式
- **F11**：全屏（演示模式）

---

## 📂 生成文件说明

生成后会得到：

```
your-presentation/
├── index.html       # 入口文件（双击打开）
├── deck.js          # 演示内容脚本（这是你要改的）
└── engine/          # 渲染引擎（不要动）
    ├── engine.js
    └── style.css
```

**修改内容**：只需编辑 `deck.js`，改完刷新浏览器即可看到变化。

---

## 🎨 微调工具：config_ui（可选）

如果需要可视化调整 Block 顺序、内容、样式：

```bash
# 打开配置画布
open config_ui/config_ui.html  # Windows: 直接双击
```

功能：
- 左侧：Block库（可拖入画布）
- 中间：实时渲染预览
- 右侧：属性编辑器
- 底部：导出新的 deck.js

---

## 🧪 验证清单（确认工具可用）

完成以下任意一项即可确认工具可正常使用：

- [ ] 成功生成一个包含 `metric` + `chart` 的演示，图表能渲染
- [ ] 翻页笔（或键盘PageUp/PageDown）可以正常翻页
- [ ] 标记 `frag: true` 的 block 可以用空格键逐步揭示
- [ ] 离线状态下（断网）仍可打开演示（CDN降级生效）

---

## ❓ 常见问题

### Q1: 图表不显示？

**原因**：Chart.js CDN 加载失败（网络问题）  
**解法**：
1. 检查网络连接
2. 或手动下载 Chart.js 到本地，修改 `index.html` 中的 `<script src="...">`

### Q2: 生成的内容不符合预期？

**原因**：AI 判断框架可能不符合你的实际需求  
**解法**：
1. 明确告诉 Claude："受众是XX，重点是XX"
2. 或直接修改 `deck.js`，参考 `knowledge/block-reference.md`

### Q3: 如何自定义配色？

修改 `deck.js` 顶部的 `CONFIG.theme` 部分：

```javascript
CONFIG.theme = {
  bg: '#0F172A',        // 背景色
  fg: '#F8FAFC',        // 文字色
  accent: '#38BDF8',    // 强调色
  accent2: '#F97316'    // 次强调色
}
```

---

## 📚 下一步

- 查看完整示例：`examples/` 目录下有3个可运行案例
- 理解 Block 组件：阅读 `knowledge/block-reference.md`
- 自定义叙事框架：阅读 `knowledge/narrative-engine.md`
- 了解设计决策：阅读 `knowledge/layout-patterns.md`

---

**有问题？** 提 Issue：https://github.com/longhuang1997-cpu/interactive-narrative-deck/issues
