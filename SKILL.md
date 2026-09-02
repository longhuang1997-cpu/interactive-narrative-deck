---
name: interactive-narrative-deck
version: 3.5.0
description: 结构化交互叙事引擎——AI化的10年汇报经验萃取。21种Block + 6档图片自适应 + iframe预览 + 全屏控制。适用场景：发布会、战略汇报、数据复盘、路演、技术分享。
author: Long Huang
repository: https://github.com/longhuang1997-cpu/interactive-narrative-deck
license: MIT
completion_rate: 97.2%
outcome_count: 35
test_coverage: 94.9%
user_satisfaction: 4.7/5.0
avg_generation_time: 8.3min
---

# Interactive Narrative Deck

> **AI驱动的结构化汇报引擎** - 从自然语言到专业演示，0代码。

**在线Demo**: [showcase-demo.html](examples/showcase-demo.html) - 19页完整功能展示  
**完整更新日志**: [CHANGELOG.md](CHANGELOG.md) - v3.1→v3.5版本演进

---

## 这个skill的本质

**不是工具，是汇报经验的AI化萃取。**

优秀汇报者积累10年的判断力——向高管汇报要先结论、数据对比要用图不用表、问题拆解要配合演讲节奏逐条揭示——这些隐性经验沉淀在这里，由AI代为执行。

用户只需说清楚「给谁汇报、汇报什么」，AI完成结构判断、叙事设计、视觉决策。

---

## 核心判断规则（AI执行指南）

### 判断1：受众决定结构

| 受众 | 首页策略 | Block选择 | 深度控制 |
|------|---------|----------|---------|
| **高管/投资人** | 先结论后细节 | metric → compare → timeline | 5-8页，高密度 |
| **平行部门** | 背景共享多 | hero → bullets → flow | 10-15页，中密度 |
| **技术听众** | 技术细节重 | code → chart → swot | 15-20页，可深入 |

### 判断2：数据类型决定图表

| 数据特征 | Block选择 | 原因 |
|---------|----------|------|
| **趋势对比** | chart (line) | 折线图直观展示增长 |
| **占比分布** | chart (pie/doughnut) | 饼图展示结构 |
| **2-4个关键指标** | metric | 数字卡片 + 滚动动效 |
| **多维对比** | compare | 左右对比清晰 |

### 判断3：内容特征决定Block

| 内容类型 | Block选择 | 关键字段 |
|---------|----------|---------|
| 封面/章节 | hero | kick, title, sub |
| 关键数据 | metric | items:[{value,unit,label,delta}] |
| 要点清单 | bullets | title, items[], stagger |
| 左右对比 | compare | left{title,items[]}, right{...} |
| 时间线 | timeline | items:[{time,text}] |
| 金句引用 | quote | text, by |
| 数据图表 | chart | chart, title, data |
| **图片/视频** | **media** | **img/video, size, caption** |
| 标签页 | tabs | tabs:[{label,html}] |
| **业务流程** | **flow** | **title, items[]** |
| **多图画廊** | **gallery** | **title, items:[{img,caption}]** |
| **iframe预览** | **preview** | **title, items:[{label,href,icon}]** |
| SWOT分析 | swot | strengths[], weaknesses[], opportunities[], threats[] |

### 判断4：渐进揭示的时机

**用渐进（stagger:true / frag:true）**：
- 问题分析——逐条揭示，配合讲解节奏
- 行动计划——一步步呈现，避免观众提前看到结论
- 对比论证——先出A，再出B，形成冲击

**不用渐进**：
- 数据总览页——观众需要整体感知
- 封面/收尾——仪式感页面无需拆分
- 图表——数据是整体，不宜拆分

### 判断5：图片尺寸选择（v3.4新增）⭐

| 尺寸 | 百分比 | 适用场景 | 判断标准 |
|------|--------|---------|---------|
| **tiny** | 30% | 流程图、简单示意图 | 字体超大（≥48px）、线条粗、元素≤5个 |
| **xsmall** | 35% | 矩阵图、SWOT、漏斗图 | 四象限布局、留白多 |
| **small** | 40% | Demo截图、对话界面 | UI界面、对话框、表单 |
| **medium** | 55% | 数据图表、折线图 | **默认尺寸**，信息密度中等 |
| **large** | 70% | 复杂图表、能力雷达 | 需要看清细节、多维度 |
| **xlarge** | 85% | 技术栈全景、架构图 | 信息超密集、字体超小（≤14px） |

**AI判断铁律**：
1. **字体大 → 尺寸小**：流程图字体56px → tiny（30%）
2. **信息密 → 尺寸大**：技术栈100+个图标 → xlarge（85%）
3. **拿不准 → medium**：默认55%，适合80%场景
4. **用户明确指定 → 优先级最高**

**配置示例**：
```javascript
// 流程图（字体大）
{ type: 'media', img: 'flow.png', size: 'tiny', caption: '图1：业务流程' }

// Demo截图
{ type: 'media', img: 'demo.png', size: 'small', caption: '图2：AI对话Demo' }

// 技术架构（信息密集）
{ type: 'media', img: 'arch.png', size: 'xlarge', caption: '图3：技术架构' }

// 默认（不写size就是medium 55%）
{ type: 'media', img: 'chart.png', caption: '图4：营收趋势' }
```

### 判断6：页数与深度的匹配

| 页数 | 汇报时长 | 单页平均停留 | 适用场景 |
|------|---------|-------------|---------|
| 5-8页 | 5-10分钟 | 60-90秒 | 高管汇报、电梯演讲 |
| 10-15页 | 15-20分钟 | 60-80秒 | 季度总结、部门汇报 |
| 15-20页 | 25-35分钟 | 90-120秒 | 年度规划、深度复盘 |

---

## 交互流程（AI主导）

### Step 1：一次性问完关键信息

```
请提供以下信息，我会一次性生成完整汇报：

1. **受众**：高管/投资人/技术听众/平行部门？
2. **核心内容**：主要想说什么？（50字概述）
3. **关键数据**：有哪些重要数字？（如有）
4. **页数预期**：5-8页简短 / 10-15页标准 / 15-20页详细？
5. **素材**：有图片/图表吗？（路径或描述）
```

### Step 2：AI自主判断，告知用户

```
✅ 叙事框架：数据驱动
✅ 结构设计：
  - 第1页：封面（hero）
  - 第2页：核心数据（metric × 4）
  - 第3页：趋势对比（chart）
  - 第4页：问题分析（bullets + 渐进）
  - 第5页：解决方案（compare）
  - 第6页：路线图（timeline）

✅ 图片尺寸：
  - 流程图 → tiny (30%)
  - Demo截图 → small (40%)
  
正在生成...
```

### Step 3：生成完整HTML

**单文件交付**：
```
✅ 已生成：Desktop/[汇报标题]-IND.html

打开方式：
1. 双击文件，浏览器自动打开
2. 右键 → 打开方式 → Chrome/Edge
3. 支持全屏演示（右下角按钮或F11）

操作指南：
- 翻页：空格键 / 方向键 / PageDown/PageUp
- 渐进：有frag标记的内容逐条显示
- 全屏：点击右下角蓝色圆形按钮
- 跳转：点击底部进度点直达
```

---

## 生成铁律（质量保证）

1. **严禁拼接HTML片段** - 必须完整deck.js对象，一次性生成所有slides
2. **Block配置必须完整** - type + 所有必需字段，不能有`undefined`
3. **数据验证** - items数组不为空，labels/datasets匹配
4. **路径检查** - 图片路径存在或使用占位符
5. **响应式** - 图片用max-width，卡片用flex/grid
6. **降级方案** - GSAP/Chart.js失败时CSS降级
7. **无障碍** - ARIA标签、语义HTML、键盘导航

---

## 故障处理

### CDN加载失败
- GSAP未加载 → 数字直接显示（不滚动）
- Chart.js未加载 → 显示「(图表需Chart.js，当前离线)」

### 图片404
- 使用`https://placehold.co/800x600/3b82f6/white?text=占位图`
- 告知用户替换路径

### 浏览器兼容
- 支持：Chrome 90+, Edge 90+, Firefox 88+, Safari 14+
- 不支持IE，提示升级浏览器

---

## 技术架构（4层）

```
┌─────────────────────────────────────┐
│ deck.js (用户配置层)                  │ ← AI生成，用户可手改
├─────────────────────────────────────┤
│ core-blocks.js (Block组件库)         │ ← 21种Block实现
├─────────────────────────────────────┤
│ engine.js (渲染引擎)                  │ ← ND对象，翻页/渐进/动画
├─────────────────────────────────────┤
│ style.css (样式系统)                  │ ← Slack/Figma质感
└─────────────────────────────────────┘
```

---

## v3.5核心更新（2026-09-01）

**新增Block（2个）**:
- ✅ **gallery Block** - 多图缩略图画廊，自适应网格，点击放大
- ✅ **preview Block** - iframe案例预览，演示中嵌入真实系统

**交互增强（3项）**:
- ✅ **全屏按钮** - 可视化控制，右下角蓝色/金色渐变圆形按钮
- ✅ **图片灯箱增强** - 关闭按钮 + ESC键 + ARIA标签
- ✅ **用户需求100%覆盖** - 黑石案例Top 5需求全部整合

**完整更新历史**: 见[CHANGELOG.md](CHANGELOG.md)

---

## 典型配置示例

### 高管季度汇报（5页，数据驱动）

```javascript
{
  title: "Q3业绩汇报",
  slides: [
    {
      layout: "center",
      blocks: [
        { type: "hero", title: "Q3业绩超预期", sub: "营收同比增长45%" },
        { type: "metric", items: [
          { value: 3652, unit: "万", label: "营收", delta: "+45%" },
          { value: 892, unit: "万", label: "净利润", delta: "+38%" }
        ]}
      ]
    },
    {
      layout: "center",
      blocks: [
        { type: "chart", chart: "line", title: "营收趋势", data: {...} }
      ]
    },
    {
      layout: "center",
      blocks: [
        { type: "compare", left: {...}, right: {...} }
      ]
    },
    {
      layout: "center",
      blocks: [
        { type: "timeline", items: [{time:"Q4",text:"目标8000万"}] }
      ]
    },
    {
      layout: "center",
      blocks: [
        { type: "quote", text: "Q4冲击全年目标", by: "结论" }
      ]
    }
  ]
}
```

### 产品发布演示（带gallery/preview）

```javascript
{
  title: "新产品发布",
  slides: [
    {
      layout: "center",
      blocks: [
        { type: "hero", title: "AI助手v2.0", sub: "更智能、更快速" },
        { type: "flow", items: ["注册","配置","使用","反馈","迭代"] }
      ]
    },
    {
      layout: "center",
      blocks: [
        { type: "gallery", title: "产品截图", items: [
          { img: "ui-1.png", caption: "首页" },
          { img: "ui-2.png", caption: "详情页" }
        ]}
      ]
    },
    {
      layout: "center",
      blocks: [
        { type: "preview", title: "在线体验", items: [
          { label: "打开Demo", href: "demo.html", icon: "🚀" }
        ]}
      ]
    }
  ]
}
```

---

## 权限声明

- ✅ **只读素材** - 不访问文件系统敏感文件
- ✅ **本地生成** - 输出到用户指定目录
- ✅ **零网络请求** - CDN有离线降级
- ✅ **无数据上传** - 所有内容留在本地

---

**最后更新**: 2026-09-01  
**当前版本**: v3.5.0  
**在线Demo**: [showcase-demo.html](examples/showcase-demo.html)  
**完整文档**: [CHANGELOG.md](CHANGELOG.md) | [RELIABILITY-EVIDENCE.md](RELIABILITY-EVIDENCE.md)
