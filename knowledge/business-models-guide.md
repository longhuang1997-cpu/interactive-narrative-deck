# 专业商业模型使用指南

> 4个专业分析模型的完整使用手册：Fishbone 鱼骨图、BCG 矩阵、Kanban 看板、Pyramid 金字塔思维

---

## 🐟 Fishbone — 鱼骨图（Ishikawa Diagram）

### 用途
根因分析、质量问题诊断、流程故障排查

### 标准格式
- 水平主干线（中线）
- 6M鱼刺（从主干斜向上下）：人/机/料/法/测/环
- 右侧鱼头（核心问题）
- 子刺（每个M下的具体原因）

### 触发场景
- 项目延期根因分析
- 质量问题诊断
- 故障排查
- "为什么会出现XX问题"

### 使用示例
```javascript
{
  type: 'fishbone',
  title: '项目延期根因分析',
  problem: '项目延期2周',
  causes: {
    man: ['人力不足', '经验不足', '跨团队协调难'],
    machine: ['测试环境不稳定', '硬件延迟'],
    material: ['SDK缺失', '数据接口未开放'],
    method: ['需求变更频繁', '流程不完善'],
    measurement: ['缺少监控', '风险预警缺失'],
    environment: ['网络限制', '现场条件受限']
  }
}
```

### 关键字段
| 字段 | 必填 | 说明 |
|------|------|------|
| problem | 是 | 核心问题（鱼头） |
| causes.man | 否 | 人员原因 |
| causes.machine | 否 | 设备/技术原因 |
| causes.material | 否 | 材料/资源原因 |
| causes.method | 否 | 方法/流程原因 |
| causes.measurement | 否 | 测量/监控原因 |
| causes.environment | 否 | 环境原因 |

---

## 📊 BCG — BCG矩阵（波士顿矩阵）

### 用途
业务组合分析、产品战略规划、资源分配决策

### 标准格式
- 2x2坐标轴（X=相对市场份额，Y=市场增长率）
- 10%分界线（虚线标注）
- 气泡散点图（气泡大小=营收规模）
- 4象限标注：⭐明星 / 🐄金牛 / ❓问题 / 🐕瘦狗

### 触发场景
- 业务组合评估
- 产品线优先级排序
- 投资决策分析
- 战略规划

### 使用示例
```javascript
{
  type: 'bcg',
  title: '2026业务组合分析',
  items: [
    {name: '智慧卫生间', marketGrowth: 75, marketShare: 35, size: 60},
    {name: '安全管家', marketGrowth: 65, marketShare: 80, size: 150},
    {name: '能源管控', marketGrowth: 15, marketShare: 70, size: 220}
  ]
}
```

### 关键字段
| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 业务/产品名称 |
| marketGrowth | 是 | 市场增长率（0-100） |
| marketShare | 是 | 相对市场份额（0-100） |
| size | 是 | 营收规模（影响气泡大小） |

### 象限判断逻辑
- marketShare ≥ 50 && marketGrowth ≥ 10 → ⭐明星（持续投入）
- marketShare ≥ 50 && marketGrowth < 10 → 🐄金牛（收割利润）
- marketShare < 50 && marketGrowth ≥ 10 → ❓问题（选择性投资）
- marketShare < 50 && marketGrowth < 10 → 🐕瘦狗（考虑退出）

---

## 📋 Kanban — 看板（Kanban Board）

### 用途
项目进度管理、任务可视化、团队协作

### 标准格式
- 多列泳道布局（To Do / In Progress / Testing / Done）
- 卡片式任务（带阴影、hover效果）
- WIP限制提示（列头显示"3/5"）
- 优先级标签配色（P0红/P1橙/P2灰）
- 负责人头像（首字母圆形头像）

### 触发场景
- 项目进度汇报
- 团队周/月度总结
- Sprint规划
- 工作流可视化

### 使用示例
```javascript
{
  type: 'kanban',
  title: '开发看板（本周）',
  columns: [
    {
      title: '待开发 Backlog',
      color: '#6b7280',
      wipLimit: 5,
      cards: [
        {title: '工单看板功能', tag: 'P0', assignee: '张三'},
        {title: '飞检报表导出', tag: 'P1', assignee: '李四'}
      ]
    },
    {
      title: '开发中 In Progress',
      color: '#3b82f6',
      wipLimit: 3,
      cards: [{title: '传感器接入', tag: 'P0', assignee: '王五'}]
    },
    {title: '已完成 Done', color: '#10b981', cards: [...]}
  ]
}
```

### 关键字段
| 字段 | 必填 | 说明 |
|------|------|------|
| columns | 是 | 列数组 |
| title | 是 | 列标题 |
| color | 否 | 列顶部配色 |
| wipLimit | 否 | WIP上限（显示为"3/5"） |
| cards | 是 | 卡片数组 |
| tag | 否 | 优先级标签（P0红/P1橙/P2灰） |
| assignee | 否 | 负责人（显示首字母头像） |

### 配色建议
- Backlog：灰色 `#6b7280`
- In Progress：蓝色 `#3b82f6`
- Testing/Review：橙色 `#f59e0b`
- Done：绿色 `#10b981`

---

## 🎯 Pyramid — 金字塔思维（Pyramid Principle）

### 用途
结构化论证、战略分析、方案说明、咨询报告

### 标准格式
- 顶层塔尖（核心结论，渐变色卡片）
- SVG连接线（从塔尖到论据的引导线）
- MECE论据层（3-5个关键论据，编号①②③）
- 支撑事实列表（每个论据下的具体事实）

### 触发场景
- 战略分析论证
- 方案选择说明
- 问题拆解分析
- "为什么选择XX"
- "凭什么说XX是最佳方案"

### 使用示例
```javascript
{
  type: 'pyramid',
  title: '战略论证',
  conclusion: '智慧卫生间是最佳0→1突破口',
  pillars: [
    {
      title: '市场验证充分',
      facts: [
        '三水医院已签约，传感器已部署',
        '医院物业80%工作量在环境管理',
        '异味投诉真实存在，需求可量化'
      ]
    },
    {
      title: '技术可行性高',
      facts: [
        '雷总30年经验可量化为阈值规则',
        '传感器为主，不依赖视觉算法',
        '1个月可交付，成本<20万'
      ]
    },
    {
      title: '复用路径清晰',
      facts: [
        '卫生间SOP可标准化',
        '1→N复制门槛低',
        'Q4可延伸至手术室/能耗场景'
      ]
    }
  ]
}
```

### 关键字段
| 字段 | 必填 | 说明 |
|------|------|------|
| conclusion | 是 | 核心结论（塔尖） |
| pillars | 是 | 支撑论据数组（3-5个） |
| title | 是 | 论据标题 |
| facts | 是 | 支撑事实列表（每个论据≥2条） |

### MECE原则
- 论据数量：3-5个（太少不充分，太多不聚焦）
- 相互独立（Mutually Exclusive）：各论据不重叠
- 完全穷尽（Collectively Exhaustive）：覆盖全部关键维度

### 使用铁律
- 用户提到"为什么"/"凭什么"/"论证"/"说服" → 优先推荐pyramid
- 结论必须具体明确，不能是"需要进一步分析"
- 每个论据下至少2-3个支撑事实
- 事实要具体可验证，不能是空话套话

---

## 🎯 模型选型决策树

```
分析目的输入
    │
    ├─ 找原因（问题已发生）？ → fishbone
    ├─ 做决策（资源分配/优先级）？ → bcg
    ├─ 看进度（任务可视化）？ → kanban
    └─ 论证逻辑（说服/报告）？ → pyramid
```

## 🔄 组合使用案例

### 战略汇报场景
1. **pyramid**：核心结论论证
2. **bcg**：业务组合分析
3. **kanban**：实施计划进度

### 问题分析场景
1. **fishbone**：根因分析
2. **pyramid**：解决方案论证

### 项目复盘场景
1. **kanban**：进度回顾
2. **fishbone**：延期原因分析

---

**更新时间**：2026-08-20  
**版本**：v3.1 - 新增4个专业商业模型