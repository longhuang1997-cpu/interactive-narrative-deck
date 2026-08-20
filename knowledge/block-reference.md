# Block组件完整参考手册

> 知识层 - 每个Block的完整API、参数说明、使用场景和示例

## 通用规则

- 每个block必须有 `type` 字段
- 加 `frag: true` 即渐进揭示（空格触发）
- `bullets` 加 `stagger: true` 则每条子项单独渐进
- 每页建议不超过3个block，留白是高级感来源

---

## hero — 标题卡/章节封面

```javascript
{ type: "hero", kick: "章节标签", title: "主标题", sub: "副标题或说明" }
```

| 字段 | 必填 | 说明 |
|------|------|------|
| kick | 否 | 小标签（章节序号/场景标注），显示在标题上方 |
| title | 是 | 主标题，大字显示 |
| sub | 否 | 副标题/说明，小字显示 |

**适用场景**：封面页、章节过渡页、总结页

---

## metric — 数据指标卡（数字滚动）

```javascript
{ type: "metric", items: [
  { value: "128.5", unit: "万", label: "季度营收", delta: "+23%" },
  { value: "92",    unit: "%",  label: "续约率",   delta: "+5.1%" }
]}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| value | 是 | 数字字符串，支持小数 |
| unit | 否 | 单位（万/个/% 等） |
| label | 是 | 指标名称 |
| delta | 否 | 同比变化，`+`开头显示绿色，`-`开头显示红色 |

**适用场景**：KPI总览、季报数据、关键成果
**注意**：GSAP可用时数字滚动，不可用时静态显示（两者均正常）

---

## bullets — 要点列表（渐进揭示）

```javascript
{ type: "bullets", title: "核心问题", stagger: true, frag: false,
  items: ["问题一：交付周期过长", "问题二：客户流失率偏高"] }
```

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 否 | 列表标题 |
| items | 是 | 字符串数组，每条一个要点 |
| stagger | 否 | true = 每条单独渐进（配合演讲节奏） |

**适用场景**：问题分析、方案要点、行动清单

---

## compare — 左右对比（VS）

```javascript
{ type: "compare",
  left:  { title: "传统方案", items: ["优点A", "缺点B"] },
  right: { title: "AI方案",   items: ["优点C", "优点D"] }
}
```

**适用场景**：方案选型、新旧对比、A/B决策

---

## timeline — 横向时间线

```javascript
{ type: "timeline", items: [
  { time: "Q1", text: "立项启动" },
  { time: "Q2", text: "试点验证" },
  { time: "Q3", text: "全量推广" }
]}
```

**适用场景**：路线图、项目计划、历史演进

---

## chart — 数据图表（Chart.js）

```javascript
{ type: "chart", chart: "line", title: "营收趋势（万元）",
  data: {
    labels: ["Q1","Q2","Q3","Q4"],
    datasets: [{ label: "2026", data: [95,105,128,145],
      borderColor: "#38bdf8", tension: 0.4 }]
  }
}
```

| chart类型 | 适用场景 |
|----------|---------|
| `line` | 趋势/时间序列 |
| `bar` | 分类对比 |
| `pie` | 占比构成 |
| `doughnut` | 占比（环形） |

**注意**：离线时Chart.js不可用，显示提示文字，不影响其他block

---

## quote — 金句引用

```javascript
{ type: "quote", text: "效率不是做得更快，而是做对的事。", by: "—— 出处" }
```

**适用场景**：章节收尾、观点强化、开场破冰

---

## media — 图片/视频

```javascript
{ type: "media", img: "path/to/image.png", alt: "图片说明" }
{ type: "media", video: "path/to/video.mp4", autoplay: false }
```

---

## tabs — 标签页切换

```javascript
{ type: "tabs", tabs: [
  { label: "方案A", html: "<p>详细说明...</p>" },
  { label: "方案B", text: "纯文本也行" }
]}
```

**适用场景**：多方案并列、多视角展示、SKU对比

---

## swot — SWOT分析矩阵

```javascript
{ type: "swot",
  strengths: ["优势1", "优势2"],
  weaknesses: ["劣势1", "劣势2"],
  opportunities: ["机会1", "机会2"],
  threats: ["威胁1", "威胁2"]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| strengths | 是 | 内部优势（Strengths）- 字符串数组 |
| weaknesses | 是 | 内部劣势（Weaknesses）- 字符串数组 |
| opportunities | 是 | 外部机会（Opportunities）- 字符串数组 |
| threats | 是 | 外部威胁（Threats）- 字符串数组 |

**适用场景**：战略分析、季度复盘、竞争评估、新业务评估  
**视觉呈现**：2×2矩阵，左上/右下为正向（绿/蓝），右上/左下为负向（橙/红）  
**触发关键词**："SWOT"、"优劣势"、"战略分析"、"内外部分析"

---

## okr — OKR目标树（带进度条）

```javascript
{ type: "okr",
  objective: "Q2核心目标：实现产品市场契合",
  keyResults: [
    { kr: "KR1：日活用户达到5000", progress: 85, status: "on-track" },
    { kr: "KR2：NPS分数≥50", progress: 60, status: "at-risk" },
    { kr: "KR3：月度留存率≥70%", progress: 95, status: "achieved" }
  ]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| objective | 是 | 目标（Objective）- 定性描述 |
| keyResults | 是 | 关键结果数组 |
| kr | 是 | 关键结果描述 |
| progress | 是 | 进度（0-100） |
| status | 否 | 状态："on-track"(蓝)/"at-risk"(橙)/"achieved"(绿) |

**适用场景**：季度/年度OKR汇报、目标管理、团队对齐  
**视觉呈现**：O→KR树状结构，每个KR带进度条，颜色标识状态  
**触发关键词**："OKR"、"目标管理"、"关键结果"、"KR进度"

---

## gantt — 甘特图（项目时间线）

```javascript
{ type: "gantt",
  start: "2026-06",
  end: "2026-12",
  tasks: [
    { name: "需求分析", start: "2026-06", duration: 2, progress: 100 },
    { name: "开发实施", start: "2026-08", duration: 3, progress: 60 },
    { name: "测试上线", start: "2026-11", duration: 1, progress: 0 }
  ]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| start | 是 | 项目开始时间（YYYY-MM格式） |
| end | 是 | 项目结束时间 |
| tasks | 是 | 任务数组 |
| name | 是 | 任务名称 |
| start | 是 | 任务开始时间 |
| duration | 是 | 持续时长（月） |
| progress | 是 | 完成进度（0-100） |

**适用场景**：项目进度汇报、路线图规划、里程碑展示  
**视觉呈现**：横向时间轴 + 任务条（长度=duration，填充=progress）  
**触发关键词**："项目进度"、"甘特图"、"时间线"、"里程碑"、"路线图"

---

## code — 代码展示（语法高亮）

```javascript
{ type: "code",
  language: "javascript",
  title: "API调用示例",
  code: `const response = await fetch('/api/data');
const data = await response.json();
console.log(data);`
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| code | 是 | 代码字符串（支持多行） |
| language | 否 | 语言标识（javascript/python/java等） |
| title | 否 | 代码块标题 |

**适用场景**：技术分享、API文档、架构说明  

---

## fishbone — 鱼骨图（根因分析）

```javascript
{ type: "fishbone",
  title: "客户投诉率偏高根因分析",
  problem: "客户投诉率达8%",
  causes: {
    people: ["客服培训不足", "响应速度慢"],
    machine: ["系统频繁宕机", "工单派发延迟"],
    material: ["产品质量不稳定"],
    method: ["流程不规范", "无SOP"],
    environment: ["高峰期压力大"],
    measurement: ["投诉数据统计不准"]
  }
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| problem | 是 | 核心问题（鱼头） |
| causes | 是 | 原因分类对象 |
| people | 否 | 人员因素数组 |
| machine | 否 | 设备/技术因素数组 |
| material | 否 | 材料/资源因素数组 |
| method | 否 | 方法/流程因素数组 |
| environment | 否 | 环境因素数组 |
| measurement | 否 | 测量/监控因素数组 |
| title | 否 | 可选标题 |

**适用场景**：质量问题根因分析、故障排查复盘、流程优化诊断、客诉问题分析  
**视觉呈现**：6M鱼骨结构（人/机/料/法/环/测） + 中心问题圆形  
**触发关键词**："根因分析"、"鱼骨图"、"Ishikawa"、"6M"、"为什么"、"问题排查"

---

## bcg — BCG矩阵（业务组合分析）

```javascript
{ type: "bcg",
  title: "2026业务组合分析",
  items: [
    {name: "智慧卫生间", marketGrowth: 80, marketShare: 30, size: 50},
    {name: "安全管家", marketGrowth: 60, marketShare: 70, size: 120},
    {name: "能源管控", marketGrowth: 20, marketShare: 60, size: 200},
    {name: "传统物业", marketGrowth: 10, marketShare: 20, size: 80}
  ]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| items | 是 | 业务/产品列表 |
| name | 是 | 业务名称 |
| marketGrowth | 是 | 市场增长率（0-100） |
| marketShare | 是 | 相对市场份额（0-100） |
| size | 否 | 气泡大小（营收规模） |
| title | 否 | 可选标题 |

**适用场景**：业务组合战略分析、产品portfolio评估、投资决策优化、资源分配规划  
**视觉呈现**：2x2矩阵（明星/金牛/问题/瘦狗） + 气泡图  
**触发关键词**："BCG"、"波士顿矩阵"、"业务组合"、"portfolio"、"明星业务"、"金牛"

---

## kanban — 看板（任务流程管理）

```javascript
{ type: "kanban",
  title: "开发看板（本周Sprint）",
  columns: [
    {
      title: "待开发",
      color: "#6b7280",
      cards: [
        {title: "功能A开发", tag: "P1", assignee: "张三"},
        {title: "报表导出", tag: "P2", assignee: "李四"}
      ]
    },
    {
      title: "开发中",
      color: "#3b82f6",
      cards: [
        {title: "数据接入", tag: "P0", assignee: "王五"}
      ]
    },
    {
      title: "已完成",
      color: "#10b981",
      cards: [
        {title: "阈值决策引擎", tag: "P0", assignee: "赵六"}
      ]
    }
  ]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| columns | 是 | 列定义数组 |
| title | 是 | 列标题 |
| color | 否 | 列主题色（十六进制） |
| cards | 是 | 卡片列表 |
| title | 是 | 卡片标题 |
| tag | 否 | 标签（优先级/分类） |
| assignee | 否 | 负责人 |

**适用场景**：敏捷开发进度展示、工作流管理、任务分配追踪、项目状态汇报  
**视觉呈现**：多列泳道布局 + 卡片 + 计数徽章  
**触发关键词**："看板"、"Kanban"、"任务"、"工作流"、"敏捷"、"待办"、"进行中"

---
**视觉呈现**：行号 + 语法高亮 + 语言徽标  
**注意**：使用模板字符串`` ` ``包裹多行代码

---

## split — 左图右文分栏（图文混排）

```javascript
{ type: "split",
  img: "path/to/image.png",  // 或 video: "path/to/video.mp4"
  content: `<h3>产品架构</h3>
<p>采用微服务架构，支持弹性扩展...</p>
<ul><li>特性1</li><li>特性2</li></ul>`,
  reverse: false  // true则图右文左
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| img | 二选一 | 图片路径（支持data URI） |
| video | 二选一 | 视频路径 |
| content | 是 | 右侧HTML内容 |
| reverse | 否 | true = 图右文左，默认false |

**适用场景**：产品介绍、架构说明、特性详解  
**视觉呈现**：50-50分栏，图片/视频占一半，文字占一半  
**触发关键词**："图文混排"、"左图右文"、"产品介绍"

---

## grid — 多列网格卡片

```javascript
{ type: "grid",
  columns: 3,  // 2-4列
  cards: [
    { icon: "🚀", title: "高性能", text: "响应时间<100ms", tag: "核心" },
    { icon: "🔒", title: "高安全", text: "SOC2认证", tag: "" },
    { icon: "📊", title: "可观测", text: "实时监控", tag: "新" }
  ]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| columns | 否 | 列数（2-4），默认3 |
| cards | 是 | 卡片数组 |
| icon | 否 | Emoji图标 |
| title | 是 | 卡片标题 |
| text | 是 | 卡片说明 |
| tag | 否 | 角标（"新"/"核心"等） |

**适用场景**：能力矩阵、特性并列、团队展示  
**视觉呈现**：等宽网格布局，卡片带图标和标签  
**触发关键词**："能力矩阵"、"特性列表"、"多列展示"

---

## fishbone — 鱼骨图（Ishikawa Diagram）

```javascript
{ type: "fishbone",
  title: "项目延期根因分析",
  problem: "项目延期2周",
  causes: {
    man: ["人力不足", "经验不足", "跨团队协调难"],
    machine: ["测试环境不稳定", "硬件延迟"],
    material: ["SDK缺失", "数据接口未开放"],
    method: ["需求变更频繁", "流程不完善"],
    measurement: ["缺少监控", "风险预警缺失"],
    environment: ["网络限制", "现场条件受限"]
  }
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| problem | 是 | 核心问题（鱼头） |
| causes.man | 否 | 人员原因 |
| causes.machine | 否 | 设备/技术原因 |
| causes.material | 否 | 材料/资源原因 |
| causes.method | 否 | 方法/流程原因 |
| causes.measurement | 否 | 测量/监控原因 |
| causes.environment | 否 | 环境原因 |

**适用场景**：根因分析、质量问题诊断、流程故障排查  
**标准格式**：水平主干线 + 6M鱼刺（斜向上下）+ 右侧鱼头  
**触发关键词**："根因分析"、"为什么出现XX问题"、"质量诊断"

---

## bcg — BCG矩阵（波士顿矩阵）

```javascript
{ type: "bcg",
  title: "2026业务组合分析",
  items: [
    {name: "智慧卫生间", marketGrowth: 75, marketShare: 35, size: 60},
    {name: "安全管家", marketGrowth: 65, marketShare: 80, size: 150},
    {name: "能源管控", marketGrowth: 15, marketShare: 70, size: 220}
  ]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 业务/产品名称 |
| marketGrowth | 是 | 市场增长率（0-100） |
| marketShare | 是 | 相对市场份额（0-100） |
| size | 是 | 营收规模（影响气泡大小） |

**适用场景**：业务组合评估、产品优先级排序、投资决策  
**标准格式**：2x2坐标轴 + 气泡散点图 + 4象限标注（⭐明星/🐄金牛/❓问题/🐕瘦狗）  
**象限判断**：  
- marketShare ≥ 50 && marketGrowth ≥ 10 → 明星（持续投入）  
- marketShare ≥ 50 && marketGrowth < 10 → 金牛（收割利润）  
- marketShare < 50 && marketGrowth ≥ 10 → 问题（选择性投资）  
- marketShare < 50 && marketGrowth < 10 → 瘦狗（考虑退出）

---

## kanban — 看板（Kanban Board）

```javascript
{ type: "kanban",
  title: "开发看板（本周）",
  columns: [
    {
      title: "待开发 Backlog",
      color: "#6b7280",
      wipLimit: 5,
      cards: [
        {title: "工单看板功能", tag: "P0", assignee: "张三"},
        {title: "飞检报表导出", tag: "P1", assignee: "李四"}
      ]
    },
    {title: "开发中", color: "#3b82f6", wipLimit: 3, cards: [...]},
    {title: "已完成", color: "#10b981", cards: [...]}
  ]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| columns | 是 | 列数组 |
| title | 是 | 列标题 |
| color | 否 | 列顶部配色 |
| wipLimit | 否 | WIP上限（显示为"3/5"） |
| cards | 是 | 卡片数组 |
| tag | 否 | 优先级标签（P0红/P1橙/P2灰） |
| assignee | 否 | 负责人（显示首字母头像） |

**适用场景**：项目进度汇报、Sprint规划、工作流可视化  
**标准格式**：多列泳道 + 卡片式任务 + WIP限制 + 优先级标签  
**触发关键词**："项目进度"、"任务看板"、"工作流"

---

## pyramid — 金字塔思维（Pyramid Principle）

```javascript
{ type: "pyramid",
  title: "战略论证",
  conclusion: "智慧卫生间是最佳0→1突破口",
  pillars: [
    {
      title: "市场验证充分",
      facts: [
        "三水医院已签约，传感器已部署",
        "医院物业80%工作量在环境管理",
        "异味投诉真实存在，需求可量化"
      ]
    },
    {
      title: "技术可行性高",
      facts: ["雷总30年经验可量化", "1个月可交付，成本<20万"]
    },
    {
      title: "复用路径清晰",
      facts: ["卫生间SOP可标准化", "1→N复制门槛低"]
    }
  ]
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| conclusion | 是 | 核心结论（塔尖） |
| pillars | 是 | 支撑论据数组（3-5个） |
| title | 是 | 论据标题 |
| facts | 是 | 支撑事实列表（每个论据≥2条） |

**适用场景**：结构化论证、战略分析、方案说明、咨询报告  
**标准格式**：顶层塔尖（结论） + MECE论据层 + 支撑事实  
**MECE原则**：论据相互独立、完全穷尽  
**触发关键词**："为什么"、"凭什么"、"论证"、"说服"、"结构化分析"

---

## 专业模型选型指南

| 分析目的 | 推荐模型 | 原因 |
|---------|---------|-----|
| **找原因** | fishbone | 6M分类全面，子刺递进深挖 |
| **做决策** | bcg | 增长率+份额二维量化 |
| **看进度** | kanban | 多列泳道直观，卡片灵活 |
| **论证逻辑** | pyramid | MECE结构严谨，层层支撑 |

---

## Block选择决策树

```
内容特征输入
    │
    ├─ 根因分析/质量问题？ → fishbone
    ├─ 业务组合/资源分配？ → bcg
    ├─ 任务进度/工作流？ → kanban
    ├─ 结构化论证/战略分析？ → pyramid
    ├─ 战略分析/优劣势？ → swot
    ├─ 目标管理/OKR？ → okr
    ├─ 项目进度/时间线？ → gantt
    ├─ 关键数字？ → metric
    ├─ 时间顺序？ → timeline
    ├─ 左右对比？ → compare
    ├─ 3+并列要点？ → bullets
    ├─ 代码/技术？ → code
    ├─ 图文混排？ → split
    ├─ 多个能力/特性？ → grid
    ├─ 数据趋势/占比？ → chart
    ├─ 金句/引用？ → quote
    └─ 其他 → bullets（万能兜底）
```

---

## 常见错误

### ❌ 错误：chart.datasets不是数组
```javascript
{ type: "chart", data: { datasets: { label: "营收", data: [...] } } }
```

### ✅ 正确：datasets必须是数组
```javascript
{ type: "chart", data: { datasets: [{ label: "营收", data: [...] }] } }
```

### ❌ 错误：一页堆5个Block
```javascript
blocks: [hero, metric, bullets, swot, timeline]  // ← 过多！
```

### ✅ 正确：一页≤3个Block
```javascript
blocks: [hero, metric]  // P1
// swot单独成页 → P2
// timeline单独成页 → P3
```

---

**更新时间**：2026-01-20  
**维护者**：Interactive Narrative Deck Skill
