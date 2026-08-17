/* 示例2：数据复盘 - 6页 */
window.NARRATIVE_DECK = {
  theme: { blue: "#0ea5e9", gold: "#f59e0b", bg: "#0f172a" },
  slides: [
    { title: "复盘封面", layout: "center", blocks: [
      { type: "hero", kick: "Q3 DATA REVIEW · 2026",
        title: "增长背后的三个信号", sub: "数据驱动 · 持续改进" }
    ]},
    { title: "核心指标", layout: "center", blocks: [
      { type: "hero", kick: "一、总览", title: "季度关键数据", sub: "" },
      { type: "metric", items: [
        { value: "128.5", unit: "万", label: "季度营收",  delta: "+23.4%" },
        { value: "92.3",  unit: "%",  label: "续约率",    delta: "+5.1%"  },
        { value: "4200",  unit: "个", label: "新增用户",  delta: "+18%"   },
        { value: "6.2",   unit: "天", label: "平均交付",  delta: "-1.8"   }
      ]}
    ]},
    { title: "趋势", layout: "center", blocks: [
      { type: "chart", chart: "line", title: "营收趋势对比（万元）",
        data: { labels: ["Q1","Q2","Q3","Q4预测"],
          datasets: [
            { label: "本年", data: [95.2, 104.8, 128.5, 145.0],
              borderColor: "#0ea5e9", backgroundColor: "rgba(14,165,233,.1)", tension: 0.4 },
            { label: "去年同期", data: [88.0, 92.3, 98.7, 102.1],
              borderColor: "#64748b", backgroundColor: "rgba(100,116,139,.1)", tension: 0.4 }
          ]}}
    ]},
    { title: "三个信号", layout: "left", blocks: [
      { type: "bullets", title: "二、数据背后的三个信号", stagger: true, items: [
        "信号①：续约率回升 → 服务质量改善开始显效",
        "信号②：交付周期缩短 → 流程优化初见成效",
        "信号③：新用户增速放缓 → 获客成本上升，需关注"
      ]}
    ]},
    { title: "下步行动", layout: "center", blocks: [
      { type: "hero", kick: "三、Q4重点", title: "三项行动", sub: "" },
      { type: "timeline", items: [
        { time: "10月", text: "针对获客成本：试点新渠道" },
        { time: "11月", text: "针对交付：推广自动化流程" },
        { time: "12月", text: "全面复盘 + Q1规划" }
      ]}
    ]},
    { title: "收尾", layout: "center", blocks: [
      { type: "quote", text: "数据是镜子，行动才是改变。", by: "—— 季度复盘小结" }
    ]}
  ]
};