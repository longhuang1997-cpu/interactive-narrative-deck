/* 战略汇报模板 - 8页标准结构 */
window.NARRATIVE_DECK = {
  theme: { blue: "#2563eb", gold: "#e8c874", bg: "#0b1220" },
  slides: [
    { title: "封面", layout: "center", blocks: [
      { type: "hero", kick: "STRATEGY REVIEW · 2026", title: "【汇报主题】", sub: "日期 · 场合" }
    ]},
    { title: "核心数据", layout: "center", blocks: [
      { type: "hero", kick: "一、总览", title: "关键指标", sub: "" },
      { type: "metric", items: [
        { value: "0", unit: "万", label: "指标A", delta: "+0%" },
        { value: "0", unit: "%",  label: "指标B", delta: "+0%" },
        { value: "0", unit: "个", label: "指标C", delta: "+0" }
      ]}
    ]},
    { title: "趋势", layout: "center", blocks: [
      { type: "hero", kick: "二、趋势", title: "数据走势", sub: "" },
      { type: "chart", chart: "line", title: "趋势图标题",
        data: { labels: ["Q1","Q2","Q3","Q4"],
          datasets: [{ label: "本期", data: [0,0,0,0], borderColor: "#e8c874", tension: 0.4 }] }}
    ]},
    { title: "问题", layout: "left", blocks: [
      { type: "bullets", title: "三、核心问题", stagger: true,
        items: ["问题一：【描述】", "问题二：【描述】", "问题三：【描述】"] }
    ]},
    { title: "方案对比", layout: "center", blocks: [
      { type: "hero", kick: "四、路径选择", title: "方案对比", sub: "" },
      { type: "compare",
        left:  { title: "方案A", items: ["优点", "缺点"] },
        right: { title: "方案B", items: ["优点", "缺点"] } }
    ]},
    { title: "推荐方案", layout: "left", blocks: [
      { type: "bullets", title: "五、推荐：方案X", frag: true,
        items: ["理由一", "理由二", "预期效果"] }
    ]},
    { title: "路线图", layout: "center", blocks: [
      { type: "hero", kick: "六、行动计划", title: "下季三步走", sub: "" },
      { type: "timeline", items: [
        { time: "第1步", text: "【行动】" },
        { time: "第2步", text: "【行动】" },
        { time: "第3步", text: "【行动】" }
      ]}
    ]},
    { title: "收尾", layout: "center", blocks: [
      { type: "quote", text: "【核心论点或行动号召】", by: "—— 出处" }
    ]}
  ]
};