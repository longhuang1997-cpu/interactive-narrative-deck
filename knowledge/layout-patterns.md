# 布局决策树：什么内容用什么布局

> 知识层 - 内容特征到布局/block组合的映射

## 核心决策：layout选哪个？

| 内容特征 | layout | 说明 |
|---------|--------|------|
| 单一核心观点、封面、章节过渡 | `center` | 居中聚焦，视觉冲击 |
| 要点列表、分析推导、步骤说明 | `left` | 左对齐，阅读节奏自然 |
| 两列并排比较、指标+图表组合 | `grid` | 两列等宽，适合并列内容 |
| 叙事故事线、长文阅读 | `scroll` | 滚动叙事，适合深度内容 |

---

## 场景→Block组合配方

### 开场封面
```
hero（主题+会议名称） → center
```

### KPI总览页
```
hero（"核心指标"） + metric（3-4个指标） → center
```

### 趋势分析页
```
hero（章节名） + chart（line趋势图） → center
```

### 问题拆解页（配合演讲渐进）
```
bullets（stagger:true，逐条揭示） → left
```

### 方案决策页
```
hero（"路径选择"） + compare（A vs B） → center
```

### 行动路线图
```
hero（"下步计划"） + timeline（季度节点） → center
```

### 数据+分析组合页
```
metric（关键数字） + bullets（原因分析） → grid
```

### 收尾金句页
```
quote（核心论点/行动号召） → center
```

---

## 典型完整结构（8页标准汇报）

```
P1: 封面        hero → center
P2: 核心数据    hero + metric → center
P3: 趋势图      hero + chart(line) → center
P4: 问题分析    bullets(stagger) → left
P5: 方案对比    hero + compare → center
P6: 推荐方案    bullets(frag) → left
P7: 行动路线    hero + timeline → center
P8: 收尾        quote → center
```
