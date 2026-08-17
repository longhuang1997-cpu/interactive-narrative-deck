/* 产品发布模板 - 7页 */
window.NARRATIVE_DECK = {
  theme: { blue: "#0ea5e9", gold: "#f59e0b", bg: "#0f172a" },
  slides: [
    { title: "发布封面", layout: "center", blocks: [
      { type: "hero", kick: "PRODUCT LAUNCH", title: "【产品名称】", sub: "发布日期 · 发布场合" }
    ]},
    { title: "核心价值", layout: "center", blocks: [
      { type: "hero", kick: "一、产品定位", title: "解决什么问题", sub: "" },
      { type: "bullets", stagger: true,
        items: ["痛点一：【描述】", "痛点二：【描述】", "我们的解法：【描述】"] }
    ]},
    { title: "核心功能", layout: "center", blocks: [
      { type: "hero", kick: "二、功能亮点", title: "三大核心能力", sub: "" },
      { type: "compare",
        left:  { title: "传统方式", items: ["限制一", "限制二", "限制三"] },
        right: { title: "【产品名】", items: ["突破一", "突破二", "突破三"] } }
    ]},
    { title: "数据证明", layout: "center", blocks: [
      { type: "metric", items: [
        { value: "0", unit: "%", label: "效率提升", delta: "vs 传统" },
        { value: "0", unit: "分钟", label: "平均节省", delta: "每次" },
        { value: "0", unit: "个", label: "已服务用户", delta: "" }
      ]}
    ]},
    { title: "使用场景", layout: "left", blocks: [
      { type: "bullets", title: "四、典型场景", stagger: true,
        items: ["场景一：【描述+价值】", "场景二：【描述+价值】", "场景三：【描述+价值】"] }
    ]},
    { title: "上线计划", layout: "center", blocks: [
      { type: "hero", kick: "五、发布节奏", title: "分阶段推进", sub: "" },
      { type: "timeline", items: [
        { time: "Phase 1", text: "内测/试点" },
        { time: "Phase 2", text: "定向发布" },
        { time: "Phase 3", text: "全量推广" }
      ]}
    ]},
    { title: "收尾", layout: "center", blocks: [
      { type: "quote", text: "【产品愿景或行动号召】", by: "—— 产品团队" }
    ]}
  ]
};