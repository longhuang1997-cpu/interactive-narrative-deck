/* 示例3：技术分享 - 6页 */
window.NARRATIVE_DECK = {
  theme: { blue: "#7c3aed", gold: "#f0abfc", bg: "#0d0d1a" },
  slides: [
    { title: "开场", layout: "center", blocks: [
      { type: "hero", kick: "TECH TALK · 2026",
        title: "从零搭建 AI 自动化流水线", sub: "踩坑记录 + 可复用模式" }
    ]},
    { title: "背景", layout: "left", blocks: [
      { type: "bullets", title: "为什么要做这件事", stagger: true, items: [
        "痛点：每天重复性工作占用2小时，纯人工低效",
        "触发：看到某开源方案，发现可以用AI代劳",
        "目标：让AI自动完成数据采集→处理→分发全链路"
      ]}
    ]},
    { title: "架构", layout: "center", blocks: [
      { type: "hero", kick: "二、系统设计", title: "三层架构", sub: "" },
      { type: "compare",
        left:  { title: "之前（人工）", items: ["手动采集数据", "Excel处理", "逐人发送", "耗时2小时/天"] },
        right: { title: "之后（AI流水线）", items: ["定时自动采集", "AI处理+校验", "一键推送全员", "耗时5分钟/天"] }
      }
    ]},
    { title: "效果", layout: "center", blocks: [
      { type: "metric", items: [
        { value: "5",  unit: "分钟", label: "每日耗时", delta: "原2小时" },
        { value: "96", unit: "%",   label: "准确率",   delta: "+12%"    },
        { value: "30", unit: "天",  label: "累计运行", delta: "零故障"   }
      ]}
    ]},
    { title: "踩坑", layout: "left", blocks: [
      { type: "bullets", title: "三个必须知道的坑", stagger: true, items: [
        "坑①：AI输出不稳定 → 解法：加校验层+人工兜底",
        "坑②：定时任务静默失败 → 解法：加心跳监控+告警",
        "坑③：中文路径乱码 → 解法：统一UTF-8无BOM编码"
      ]}
    ]},
    { title: "收尾", layout: "center", blocks: [
      { type: "quote", text: "最好的自动化，是让你忘记它还在运行。", by: "—— 实践总结" }
    ]}
  ]
};