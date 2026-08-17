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
