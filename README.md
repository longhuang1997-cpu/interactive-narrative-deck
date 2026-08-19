# Interactive Narrative Deck

> 30分钟做出专业汇报演示 · Block积木 + SWOT分析 + 渐进揭示

![演示动画](examples/demo.gif)

---

## ⚡ 3分钟开始

### 1️⃣ 安装
```bash
# Claude Code中安装
/skill install https://github.com/longhuang1997-cpu/interactive-narrative-deck
```

### 2️⃣ 使用
在Claude Code中说：
```
做Q3战略汇报，给董事会看，有SWOT分析，
数据：营收+25%，用户留存78%，新增120家客户
```

Claude自动判断：
- ✅ 受众=董事会 → 结论优先结构
- ✅ 有优劣势分析 → 推荐SWOT Block
- ✅ 数据是亮点 → 用metric数字卡

### 3️⃣ 预览
```bash
# 双击打开
index.html

# 快捷键
左右键 / PageUp/PageDown  # 翻页
空格                      # 渐进揭示
O                         # 总览模式
F11                       # 全屏演示
```

---

## 💡 核心价值

### 不是工具，是汇报经验的AI化

10年汇报者的判断力——向高管先结论、数据对比用图、问题拆解配合节奏——由AI代为执行。

### 对比PPT

| 维度 | PowerPoint | Interactive Deck |
|------|-----------|------------------|
| 制作时间 | 2-4小时 | **30分钟** ⚡ |
| 数据更新 | 逐页改 | **改1处全局更新** 🔄 |
| 交互性 | 静态翻页 | **实时图表+渐进** 🎯 |
| 版本控制 | final_v2_真最终.pptx | **Git diff** 📦 |

**真实场景**：高管说"把上周数据改成本周" → PPT需30分钟，Deck改1处1分钟 ✅

---

## 🧩 9种Block积木

| Block | 用途 | 最佳场景 |
|-------|------|---------|
| `hero` | 封面/章节 | 每页开头 |
| `metric` | 数字指标（滚动动效） | KPI展示 |
| `bullets` | 要点列表（渐进揭示） | 问题分析 |
| `compare` | 左右对比 | 方案选型 |
| `timeline` | 时间线/路线图 | 项目进度 |
| `quote` | 金句/引用 | 行动号召 |
| `chart` | 图表（line/bar/pie） | 趋势分析 |
| `tabs` | 标签页切换 | 多方案并列 |
| `media` | 图片/视频 | 产品截图 |

### 🎯 专业方法论Block

| Block | 用途 | 场景 |
|-------|------|------|
| **`swot`** | **SWOT分析矩阵** | **战略复盘/竞争分析** |

**v2.1.0新增**：SWOT分析Block，2x2矩阵展示优势/劣势/机会/威胁，适用于季度复盘、新业务评估、竞争分析。

[完整SWOT使用指南 →](knowledge/frameworks/swot-analysis.md)

---

## 📦 3个完整案例

### 1. 战略汇报（给高管）
**路径**：`examples/strategy-report/`  
**结构**：封面 → 数据 → 分析 → 行动  
**页数**：7页

### 2. 技术分享（给团队）
**路径**：`examples/tech-talk/`  
**结构**：背景 → 方案 → Demo → Q&A  
**页数**：8页

### 3. SWOT分析（专业能力展示）
**路径**：`examples/swot-demo/`  
**结构**：封面 → 数据 → SWOT → 战略 → 计划  
**页数**：6页

[查看所有案例 →](examples/)

---

## 🔧 进阶使用

### 自定义Block
从v2.1.0开始，Block采用插件化架构，可扩展自定义Block：

```javascript
BlockRegistry.register('myblock', function(data) {
  const div = document.createElement('div');
  // 自定义渲染逻辑
  return div;
}, {
  description: '我的自定义Block'
});
```

[Block扩展开发指南 →](docs/BLOCK_EXTENSION_GUIDE.md)

### 可视化配置工具
打开 `config_ui/config_ui.html` 进行可视化微调（选择叙事风格、模板类型、视觉效果等）

### 方法论知识库
- [SWOT分析完整指南](knowledge/frameworks/swot-analysis.md)
- [Block参考手册](knowledge/block-reference.md)
- [布局模式选择](knowledge/layout-patterns.md)
- [叙事框架引擎](knowledge/narrative-engine.md)
- [故障排查](knowledge/troubleshooting.md)

---

## 🔒 安全与隐私

✅ **100%本地运行** - 所有内容生成在本地，无数据上传  
✅ **开源可审计** - MIT许可证，代码完全透明  
✅ **CDN失败自动降级** - GSAP/Chart.js加载失败时回退到基础CSS动画  
✅ **无执行权限** - 不运行系统命令，不修改配置

[完整安全说明 →](docs/SECURITY_AND_PRIVACY.md)

---

## 📚 完整文档

- [SKILL.md](SKILL.md) - AI调用定义和判断规则
- [CHANGELOG.md](CHANGELOG.md) - 版本历史
- [产品战略路线图](docs/PRODUCT_STRATEGY_ROADMAP.md) - 从工具到平台的演进

---

## 📄 许可证

MIT © 2026 [longhuang1997-cpu](https://github.com/longhuang1997-cpu)

---

## 🚀 产品路线图

- **v2.1.0** (当前) - SWOT分析Block + 插件化架构
- **v2.2.0** (规划中) - OKR树 + 甘特图
- **v3.0.0** (愿景) - 专业方法论可视化平台

从"演示工具"到"方法论平台"，让专业分析可视化。

---

**GitHub**: https://github.com/longhuang1997-cpu/interactive-narrative-deck  
**技能市场**: [待发布]
