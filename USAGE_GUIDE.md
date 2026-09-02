# Interactive Narrative Deck (IND) v3.5 使用指南

## 简介

IND是一个用于创建交互式演示文稿的JavaScript引擎，支持21种专业Block类型，涵盖商业分析、项目管理、战略规划等场景。

## 快速开始

### 1. 创建HTML文件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>我的演示</title>
<script>
// 动态路径解析 - 自动适配任意用户目录
(function() {
  const currentPath = window.location.href;
  const homeDir = currentPath.match(/file:\/\/\/([A-Z]:\/Users\/[^\/]+)/)?.[1] ||
                  currentPath.match(/file:\/\/\/home\/[^\/]+/)?.[0]?.replace('file:///', '');
  
  let skillBasePath = '';
  if (homeDir) {
    skillBasePath = homeDir.includes(':') 
      ? homeDir + '/.claude/skills/interactive-narrative-deck/engine/'
      : '/' + homeDir + '/.claude/skills/interactive-narrative-deck/engine/';
  } else {
    skillBasePath = './engine/';
  }
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = skillBasePath + 'style.css';
  document.head.appendChild(link);
  
  window.IND_SKILL_PATH = skillBasePath;
})();
</script>
</head>
<body>
<div id="nd-stage"></div>

<!-- CDN依赖 -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>

<!-- 加载引擎 -->
<script>
(function() {
  const basePath = window.IND_SKILL_PATH || './engine/';
  const scripts = [
    'block-registry.js',
    'business-blocks.js',
    'core-blocks.js',
    'engine.js'
  ];
  
  let loaded = 0;
  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = basePath + src;
    script.onload = () => {
      loaded++;
      if (loaded === scripts.length) initDeck();
    };
    document.head.appendChild(script);
  });
})();

function initDeck() {
  window.NARRATIVE_DECK = {
    title: "我的演示标题",
    theme: {
      blue: "#3b82f6",
      gold: "#f59e0b",
      bg: "#0a0e1a"
    },
    slides: [
      // 在这里编写你的slides...
    ]
  };
  
  if (window.ND) {
    ND.init(window.NARRATIVE_DECK);
  }
}
</script>
</body>
</html>
```

### 2. 编写Slides

每个slide包含：
- `layout`: 布局类型（通常用`"center"`）
- `blocks`: Block数组

```javascript
slides: [
  {
    layout: "center",
    blocks: [
      {
        type: "hero",
        kick: "副标题",
        title: "主标题",
        sub: "补充说明"
      }
    ]
  }
]
```

---

## 核心Block类型

### 1. Hero - 标题

```javascript
{
  type: "hero",
  kick: "Q3数字化转型汇报",          // 小标签
  title: "AI驱动智能制造",           // 主标题
  sub: "效率提升42% · 成本下降18%"  // 副标题
}
```

---

### 2. Metric - 指标卡片（4个一行）

```javascript
{
  type: "metric",
  items: [
    { value: 42, unit: "%", label: "生产效率提升", delta: "+18%" },
    { value: 98.5, unit: "%", label: "产品良品率", delta: "+3.2%" },
    { value: 1847, unit: "万", label: "节省成本", delta: "+65%" },
    { value: 2.7, unit: "倍", label: "投资回报率", delta: "+1.2x" }
  ]
}
```

**注意**：
- 单位（万/倍）不会跨行
- 强制4个一行显示
- `delta`为可选字段

---

### 3. Flow - 流程图

```javascript
{
  type: "flow",
  items: ["设备物联", "数据采集", "AI分析", "智能调度", "质量预测", "持续优化"]
}
```

---

### 4. Bullets - 列表

```javascript
{
  type: "bullets",
  title: "系统建设成果",
  items: [
    "AI质检系统上线 - 识别准确率98.5%",
    "智能排产系统投产 - 排产效率提升3倍",
    "预测性维护系统 - 停机时间减少65%"
  ],
  stagger: true  // 可选：开启动画
}
```

---

### 5. Compare - 对比

```javascript
{
  type: "compare",
  left: {
    title: "转型前（2025 Q3）",
    items: [
      "人工排产，耗时2小时/批次",
      "人工质检，良品率95.3%",
      "设备利用率68%"
    ]
  },
  right: {
    title: "转型后（2026 Q3）",
    items: [
      "AI排产，耗时15分钟/批次",
      "AI质检，良品率98.5%",
      "设备利用率87%"
    ]
  }
}
```

---

### 6. Chart - 图表

#### 折线图
```javascript
{
  type: "chart",
  chart: "line",
  title: "月度生产效率指数",
  data: {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    datasets: [{
      label: "2026年",
      data: [68, 72, 75, 82, 88, 92],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59,130,246,0.1)",
      tension: 0.4,
      fill: true
    }]
  }
}
```

#### 柱状图
```javascript
{
  type: "chart",
  chart: "bar",
  title: "成本节省（万元）",
  data: {
    labels: ["人工成本", "物料损耗", "能源消耗"],
    datasets: [{
      label: "节省金额",
      data: [620, 450, 280],
      backgroundColor: [
        "rgba(59,130,246,0.8)",
        "rgba(139,92,246,0.8)",
        "rgba(16,185,129,0.8)"
      ],
      borderRadius: 8
    }]
  }
}
```

#### 饼图/环形图（自动百分比标注）
```javascript
{
  type: "chart",
  chart: "doughnut",  // 或 "pie"
  title: "良品率提升贡献度",
  data: {
    labels: ["AI质检系统", "工艺优化", "设备升级", "人员培训"],
    datasets: [{
      data: [55, 25, 15, 5],
      backgroundColor: [
        "rgba(59,130,246,0.8)",
        "rgba(139,92,246,0.8)",
        "rgba(16,185,129,0.8)",
        "rgba(245,158,11,0.8)"
      ],
      borderWidth: 2,
      borderColor: "#0a0e1a"
    }]
  }
}
```

**注意**：
- 饼图会自动显示百分比标注（白色粗体20px）
- 需要引入`chartjs-plugin-datalabels` CDN

---

### 7. Timeline - 时间线

```javascript
{
  type: "timeline",
  items: [
    { time: "2025 Q1", text: "启动数字化转型规划" },
    { time: "2025 Q2", text: "完成设备物联改造" },
    { time: "2025 Q3", text: "AI质检系统试点" },
    { time: "2026 Q3", text: "成效显著，效率提升42%" }
  ]
}
```

---

### 8. Media - 图片

```javascript
{
  type: "media",
  img: "https://placehold.co/1200x800/3b82f6/white?text=Digital+Twin",
  size: "large",  // small/medium/large/xlarge
  caption: "图1：数字孪生车间实时监控界面"
}
```

---

### 9. Gallery - 图片画廊

```javascript
{
  type: "gallery",
  items: [
    { img: "https://placehold.co/800x600/3b82f6/white?text=Line+1", caption: "1号线" },
    { img: "https://placehold.co/800x600/8b5cf6/white?text=Line+2", caption: "2号线" },
    { img: "https://placehold.co/800x600/10b981/white?text=Line+3", caption: "3号线" }
  ]
}
```

---

### 10. SWOT - SWOT分析

```javascript
{
  type: "swot",
  strengths: [
    "技术团队强大，AI算法自研能力强",
    "设备基础好，1200台设备已物联"
  ],
  weaknesses: [
    "系统集成复杂，存在数据孤岛",
    "人员技能转型慢"
  ],
  opportunities: [
    "国家政策大力支持智能制造",
    "客户对高品质产品需求强烈"
  ],
  threats: [
    "技术迭代快，需持续投入研发",
    "数据安全风险"
  ]
}
```

---

### 11. OKR - 目标管理

```javascript
{
  type: "okr",
  objective: "Q4深化数字化应用，生产效率再提升15%",
  keyResults: [
    { text: "AI质检系统覆盖率达100%", progress: 60, color: "#3b82f6" },
    { text: "良品率提升至99%以上", progress: 75, color: "#10b981" },
    { text: "能源消耗下降20%", progress: 45, color: "#f59e0b" }
  ]
}
```

---

### 12. Gantt - 甘特图

```javascript
{
  type: "gantt",
  title: "Q4数字化深化计划（2026年10月-12月）",
  start: "2026-10",
  end: "2026-12",
  tasks: [
    { name: "AI质检扩容", start: "2026-10", duration: 2, progress: 35, color: "#3b82f6" },
    { name: "能源管理上线", start: "2026-10", duration: 3, progress: 20, color: "#10b981" },
    { name: "供应链优化", start: "2026-11", duration: 2, progress: 60, color: "#f59e0b" }
  ]
}
```

---

### 13. Fishbone - 鱼骨图（根因分析）

```javascript
{
  type: "fishbone",
  problem: "良品率仍有1.5%提升空间",
  categories: [
    {
      name: "设备因素",
      causes: ["老旧设备精度不足", "维护周期不合理", "传感器覆盖不全"]
    },
    {
      name: "工艺因素",
      causes: ["参数优化不充分", "SOP执行不严格"]
    },
    {
      name: "人员因素",
      causes: ["操作技能参差不齐", "质量意识待提高"]
    },
    {
      name: "材料因素",
      causes: ["供应商质量波动", "来料检验不足"]
    }
  ]
}
```

---

### 14. BCG - BCG矩阵（波士顿矩阵）

```javascript
{
  type: "bcg",
  title: "数字化系统投资组合分析",
  items: [
    // 使用x/y坐标（0-100）
    { name: "AI质检系统", x: 82, y: 78, size: 420 },  // 明星区（右上）
    { name: "数字孪生", x: 75, y: 22, size: 280 },    // 问题区（右下）
    { name: "智能排产", x: 22, y: 75, size: 380 },    // 现金牛（左上）
    { name: "传统MES", x: 18, y: 18, size: 150 }      // 瘦狗区（左下）
  ]
}
```

**坐标说明**：
- `x`: 市场份额（0-100，50为中线）
- `y`: 市场增长率（0-100，50为中线）
- `size`: 营收规模（建议100-500）

**注意**：坐标要拉开距离，避免气泡重叠

---

### 15. Kanban - 看板（NEW v3.5）

```javascript
{
  type: "kanban",
  title: "Q4数字化项目看板",
  columns: [
    {
      name: "待开始 To Do",  // 包含"待"或"todo"→灰色边框
      items: [
        { title: "能源管理系统需求评审", priority: "high" },
        { title: "6号线AI质检改造方案", priority: "medium" }
      ]
    },
    {
      name: "进行中 In Progress",  // 包含"进行"或"progress"→蓝色边框
      items: [
        { title: "4号线AI质检上线部署", priority: "high", assignee: "张工" },
        { title: "数字孪生3D界面优化", priority: "medium", assignee: "李工" }
      ]
    },
    {
      name: "已完成 Done",  // 包含"完成"或"done"→绿色边框
      items: [
        { title: "3号线AI质检验收通过", priority: "high" }
      ]
    }
  ]
}
```

**优先级字段**：
- `priority: "high"` → 🔴 红色 "高优先级"
- `priority: "medium"` → 🟠 橙色 "中优先级"
- `priority: "low"` → ⚫ 灰色 "低优先级"

**列状态颜色自动判断**：
- 包含`todo`/`待`/`计划` → 灰色边框（待开始）
- 包含`progress`/`进行`/`doing` → 蓝色边框（进行中）
- 包含`done`/`完成`/`已解决` → 绿色边框（已完成）

**展开详情功能**：
点击卡片可展开详细信息（如有`plan`或`notes`字段）

---

### 16. Pyramid - 金字塔论证

```javascript
{
  type: "pyramid",
  conclusion: "Q4应追加2000万AI系统投入，预计带来5000万效益提升",
  pillars: [
    {
      title: "投资回报明确",
      facts: [
        "Q3已验证ROI达2.7倍，6个月回本",
        "AI质检系统节省人工成本620万/季度"
      ]
    },
    {
      title: "技术储备充足",
      facts: [
        "核心算法团队20人，AI经验丰富",
        "已有3年生产数据，模型训练充分"
      ]
    },
    {
      title: "竞争优势明显",
      facts: [
        "同行业数字化水平低，有3年先发优势",
        "客户认可度高，订单增长28%"
      ]
    }
  ]
}
```

---

### 17. Tabs - 标签页

```javascript
{
  type: "tabs",
  tabs: [
    {
      label: "方案A：全面扩展",
      html: "<h3>追加2000万</h3><ul><li>内容：10条产线全覆盖</li><li>周期：6个月</li></ul>"
    },
    {
      label: "方案B：重点突破",
      html: "<h3>追加1200万</h3><ul><li>内容：AI质检全覆盖</li><li>周期：4个月</li></ul>"
    }
  ]
}
```

---

### 18. Quote - 金句

```javascript
{
  type: "quote",
  text: "数字化转型不是花钱买设备，而是用数据重构生产关系，用AI放大人的价值。",
  by: "CEO · 董事会发言"
}
```

---

### 19. Preview - 预览链接

```javascript
{
  type: "preview",
  title: "在线系统入口",
  items: [
    { label: "生产监控大屏", href: "https://example.com/monitor", icon: "📊" },
    { label: "AI质检系统", href: "https://example.com/qc", icon: "🔍" },
    { label: "数字孪生3D", href: "https://example.com/twin", icon: "🏭" }
  ]
}
```

---

## 操作指南

### 键盘操作
- **→ / ↓** - 下一页
- **← / ↑** - 上一页
- **ESC** - 退出全屏
- **O** - 概览模式（显示所有slides）

### 全屏功能
点击右下角"⛶"按钮进入/退出全屏

---

## 高级功能

### 自定义主题颜色

```javascript
window.NARRATIVE_DECK = {
  title: "我的演示",
  theme: {
    blue: "#3b82f6",   // 主题蓝色
    gold: "#f59e0b",   // 强调金色
    bg: "#0a0e1a"      // 背景色（可选）
  },
  slides: [...]
}
```

### 自适应缩放

引擎会自动根据内容密度调整缩放：
- 内容少：scale = 1.0
- 内容中等：scale = 0.85
- 内容多：scale = 0.75

---

## 常见问题

### 1. 饼图没有百分比标注？

**原因**：缺少`chartjs-plugin-datalabels` CDN

**解决**：在HTML中添加：
```html
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>
```

### 2. Metric单位跨行了？

**原因**：旧版本CSS问题

**解决**：确保使用最新的`style.css`（包含`white-space: nowrap`）

### 3. BCG气泡重叠了？

**原因**：x/y坐标太接近

**解决**：拉开坐标距离（建议至少相差30以上）

### 4. Kanban没有优先级颜色？

**原因**：使用了`tag`字段而非`priority`

**解决**：改用`priority: "high" / "medium" / "low"`

### 5. 每次打开都跳到上次关闭的页面？

**原因**：localStorage记忆功能

**解决**：确保使用最新的`engine.js`（已移除localStorage）

---

## 最佳实践

### 1. Slides数量
- 建议：3-15张
- 过少：信息不足
- 过多：观众疲劳

### 2. 每页Block数量
- 建议：1-3个Block
- Hero + Metric：经典组合
- Hero + Chart：数据展示
- Hero + Kanban/BCG：复杂分析

### 3. 颜色使用
- 主题色：用于强调（金色标签、高亮数字）
- 辅助色：用于分类（优先级、状态）
- 避免过多颜色（3-4种即可）

### 4. 动画效果
- 默认有进入动画
- `stagger: true`可开启列表动画
- 不要所有Block都用动画

---

## 示例项目

### 完整示例
参考：`C:\Users\huangl265\Desktop\智能制造企业数字化转型汇报-真实修复版.html`

### 模板
参考：`C:\Users\huangl265\.claude\skills\interactive-narrative-deck\examples\TEMPLATE.html`

---

## 更新日志

### v3.5 (2025-01-02)
- ✅ 修复Metric单位跨行问题
- ✅ 修复饼图百分比标注
- ✅ 修复BCG矩阵坐标支持
- ✅ 新增Kanban优先级颜色
- ✅ 新增Kanban流程状态颜色
- ✅ 优化路径解析（跨平台兼容）

---

## 技术支持

### 文档
- 使用指南：`USAGE_GUIDE.md`（本文档）
- 修复报告：`IND_v3.5_最终修复总结.md`

### 问题反馈
提供以下信息：
1. 问题截图
2. 浏览器控制台错误
3. 使用的Block类型和配置

---

## License

MIT License

---

**文档版本**：v3.5  
**更新时间**：2025年1月2日  
**适用引擎**：IND v3.5
