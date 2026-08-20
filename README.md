# Interactive Narrative Deck v3.0

## 一句话介绍

把汇报经验AI化——10年汇报者的判断力（向高管要结论先行、数据对比要用图、问题拆解要渐进揭示）沉淀成知识文件，由AI代为执行。

---

## 核心价值

**不是PPT生成器，是汇报经验的萃取系统。**

| 传统做法 | AI化后 |
|---------|--------|
| 人工判断"给高管汇报要先结论" | AI读`narrative-patterns.md`自动匹配"结论先行框架" |
| 人工记忆"趋势数据用折线图" | AI读`block-reference.md`自动选chart:line |
| 人工检查"有没有编造数据" | AI读`anti-patterns.md`自动扫描11种反模式 |
| 每次做汇报重新设计配色 | AI读`visual-design-rules.md`统一深蓝医疗风格 |

---

## 架构（四层）

```
skill.md (主控层)
  ↓ 调用
knowledge/ (知识层)
  ├── narrative-patterns.md      - 6大叙事框架决策树
  ├── block-reference.md          - 15种Block完整API
  ├── visual-design-rules.md      - 配色/字体/间距规范
  ├── anti-patterns.md            - 11种反模式检测
  └── layout-patterns.md          - center/left/right布局规则
  ↓ 指导
templates/ (规范层)
  ├── strategy-report/            - 战略汇报模板
  └── product-launch/             - 产品发布模板
  ↓ 调用
engine/ (执行层)
  ├── narrative-deck.js           - 渲染引擎（不改动）
  ├── business-blocks.js          - swot/okr/gantt
  └── custom-blocks.js            - code/split/grid
```

---

## 知识层清单

### 1. narrative-patterns.md（320行）
**作用**：根据受众+场景自动匹配叙事框架

**6大框架**：
- 结论先行（高管/董事会）
- 价值主张优先（客户/投资人）
- OKR进展汇报（团队/季度复盘）
- 产品发布叙事（发布会/路演）
- 问题-方案架构（管理层/项目汇报）
- 通用三段式（教学/培训）

**决策树示例**：
```
受众=高管 + 场景=季度汇报 → 结论先行框架
  ├── P1: 封面
  ├── P2: 核心结论（metric数字卡）
  ├── P3: 数据支撑（chart图表）
  └── P4: 行动计划（timeline时间线）
```

---

### 2. block-reference.md（357行）
**作用**：15种Block完整API文档

**基础Block**（9种）：
- hero, metric, bullets, compare, timeline, quote, chart, media, tabs

**专业Block**（6种）：
- swot（战略分析矩阵）
- okr（目标管理树状图）
- gantt（项目时间线）
- fishbone（鱼骨图/根因分析）
- bcg（BCG矩阵/业务组合）
- kanban（看板/任务流程）

**自定义Block**（3种）：
- code（代码展示）
- split（左图右文）
- grid（网格卡片）

**API示例**：
```javascript
// SWOT矩阵
{
  type: "swot",
  strengths: ["团队经验丰富", "市场先发优势"],
  weaknesses: ["技术债务较高"],
  opportunities: ["市场增长迅速"],
  threats: ["竞争加剧"]
}

// 鱼骨图（新增）
{
  type: "fishbone",
  problem: "客户投诉率达8%",
  causes: {
    people: ["客服培训不足", "响应速度慢"],
    machine: ["系统频繁宕机"],
    method: ["流程不规范", "无SOP"]
  }
}

// BCG矩阵（新增）
{
  type: "bcg",
  items: [
    {name: "产品A", marketGrowth: 80, marketShare: 30, size: 50},
    {name: "产品B", marketGrowth: 60, marketShare: 70, size: 120}
  ]
}

// 看板（新增）
{
  type: "kanban",
  columns: [
    {
      title: "待开发",
      color: "#6b7280",
      cards: [{title: "工单看板", tag: "P1", assignee: "张三"}]
    }
  ]
}
```

---

### 3. visual-design-rules.md（243行）
**作用**：统一视觉规范，避免每次生成风格不一致

**核心规范**：
- **配色系统**：主色1（蓝#0ea5e9）+ 主色2（橙#f59e0b）+ 背景（深蓝#0f172a）
- **字体层级**：标题72-96px > 数字68px > 区块标题36-48px > 正文24-28px
- **间距系统**：Block间距48px，段落间距16-24px，卡片内边距32-40px
- **动效规则**：渐进揭示0.6s stagger，数字滚动2s，hover lift 2px

**对比度检查**：
- 所有文字≥4.5:1（WCAG AA标准）
- Delta标签用绿#10b981或红#ef4444

---

### 4. anti-patterns.md（533行）
**作用**：防止11种常见错误，质量检查自动化

**11种反模式**：
1. 编造数据（幻觉最高危）
2. 捏造案例/客户证言
3. 内容过载（单页>3个Block）
4. 图表结构错误（datasets不是数组）
5. 配色混乱（主题色>2种）
6. 字号失控（正文<20px或>32px）
7. 动效过度（stagger用于静态数据）
8. 时长不匹配（5分钟讲15页）
9. 受众错配（给高管讲技术细节）
10. 渐进揭示滥用（数据总览也拆分）
11. Block类型错误（趋势用bar不用line）

**质量检查清单**（生成后自动执行）：
```javascript
✅ 数据完整性：共X处【待填入】需手动补充
✅ Block数量：所有页面≤3个Block
✅ 图表结构：datasets均为数组
✅ 配色检查：主题色2种（蓝+橙）
✅ 页数匹配：10分钟汇报=8页
```

---

### 5. layout-patterns.md（已存在）
**作用**：根据Block数量和类型选择布局

**三种布局**：
- center：单Block居中（封面/结论页）
- left：多Block左对齐（要点列表页）
- right：图文混排右对齐（产品介绍页）

---

## v3.0 vs v2.3 对比

| 维度 | v2.3 | v3.0 | 提升 |
|------|------|------|------|
| **叙事判断** | skill.md内嵌经验 | narrative-patterns.md（6框架） | 结构化、可复用 |
| **Block覆盖** | 9种基础Block | 15种（+swot/okr/gantt/code/split/grid） | 专业场景覆盖 |
| **视觉规范** | 口头描述 | visual-design-rules.md（243行） | 统一、可检查 |
| **质量保障** | 人工检查 | anti-patterns.md（11种自动检测） | 幻觉零容忍 |
| **知识沉淀** | 0个知识文件 | 4个新增+1个增强 | 经验可积累 |

---

## 使用场景

### ✅ 适合
- 战略汇报（季度/年度复盘）
- 产品发布（路演/demo day）
- 数据分析（BI报表/增长汇报）
- 技术分享（架构/API文档）
- OKR汇报（目标管理/进度同步）

### ❌ 不适合
- 需要打印的纸质文档（用a4-manual-maker skill）
- 超过50页的培训课件（性能考虑）
- 需要非技术同事编辑的场景（PPT更合适）

---

## 快速上手

### 1. 用户触发
说"做汇报/演示/deck"或调用 `/interactive-narrative-deck`

### 2. AI收集信息
```
1. 【受众】给谁看？（高管/管理层/客户/团队）
2. 【主题】核心是什么？（一句话）
3. 【内容】有哪些数据、要点、素材？（粘贴最好）
4. 【时长】讲多久？（5分钟/15分钟/30分钟）
5. 【风格】视觉偏好？（不说用默认深蓝）
```

### 3. AI判断并告知
```
我的判断：
- 叙事框架：结论先行（受众=高管）
- 页数结构：P1封面 → P2结论 → P3数据 → P4行动
- 关键Block：metric数字卡 + chart折线图 + timeline时间线
- 视觉风格：医疗深蓝（#0f172a背景 + #0ea5e9主色）
```

### 4. 生成 + 质量检查
- 生成 `deck.js`（所有页面）
- 自动扫描11种反模式
- 输出质量报告

### 5. 交付
- 双击 `index.html` 预览
- F11全屏演示
- 翻页笔/方向键控制

---

## 技术规格

- **单文件HTML** - 所有内容打包，分享便捷
- **CDN依赖** - GSAP动画 + Chart.js图表（离线自动降级）
- **浏览器兼容** - Chrome/Edge/Safari/Firefox 90+（不支持IE11）
- **键盘快捷键** - 左右键翻页、空格渐进、O总览、F11全屏
- **可视化调试** - `config_ui/config_ui.html` 微调工具

---

## 贡献指南

### 添加新Block
1. 在 `engine/custom-blocks.js` 定义渲染逻辑
2. 在 `knowledge/block-reference.md` 补充API文档
3. 在 `skill.md` Block清单添加索引

### 添加新叙事框架
1. 在 `knowledge/narrative-patterns.md` 添加决策树
2. 定义触发条件（受众+场景）
3. 给出页数结构模板

### 添加新反模式
1. 在 `knowledge/anti-patterns.md` 描述错误特征
2. 提供检测方法（正则/逻辑判断）
3. 给出修复方案

---

## License

MIT

---

**一句话总结**：把10年汇报经验沉淀成AI可调用的知识文件，用户只需说清楚"给谁汇报什么"，AI自动匹配框架+选Block+检查质量。
