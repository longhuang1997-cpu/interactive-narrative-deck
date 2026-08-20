// 战略汇报Demo - Q3业务复盘
// 受众：董事会/高管
// 结构：封面→结论→数据→行动（≤6页）
// 特点：结论优先、数字驱动、metric+line图

const DECK = [
  // P1: 封面
  {
    type: "hero",
    kick: "2026 Q3",
    title: "业务复盘",
    sub: "核心指标超预期，新业务线快速增长"
  },

  // P2: 核心结论（高管汇报铁律：第一页就给结论）
  {
    type: "hero",
    kick: "核心结论",
    title: "三项关键突破",
    sub: "营收增长 · 用户留存 · 产品矩阵"
  },
  {
    type: "metric",
    title: "关键指标",
    items: [
      {
        value: "125",
        unit: "M",
        label: "Q3营收",
        delta: "+25%",
        trend: "up"
      },
      {
        value: "78",
        unit: "%",
        label: "用户留存率",
        delta: "+12pp",
        trend: "up"
      },
      {
        value: "3",
        unit: "条",
        label: "新产品线",
        delta: "新增",
        trend: "up"
      }
    ]
  },

  // P3: 营收趋势分析
  {
    type: "hero",
    kick: "数据支撑",
    title: "营收持续增长",
    sub: "Q3环比增长25%，同比增长40%"
  },
  {
    type: "chart",
    title: "2026年营收趋势（单位：百万元）",
    chartType: "line",
    data: {
      labels: ["Q1", "Q2", "Q3", "Q4（预测）"],
      datasets: [
        {
          label: "2026年实际",
          data: [80, 100, 125, 150],
          borderColor: "#38BDF8",
          backgroundColor: "rgba(56, 189, 248, 0.1)",
          tension: 0.4
        },
        {
          label: "2025年同期",
          data: [70, 78, 90, 95],
          borderColor: "#94A3B8",
          backgroundColor: "rgba(148, 163, 184, 0.1)",
          tension: 0.4,
          borderDash: [5, 5]
        }
      ]
    }
  },

  // P4: 用户增长分析
  {
    type: "hero",
    kick: "用户洞察",
    title: "留存率创新高",
    sub: "付费转化与续约率双提升"
  },
  {
    type: "compare",
    left: {
      title: "Q2表现",
      items: [
        "留存率：66%",
        "付费转化：8.2%",
        "续约率：72%"
      ]
    },
    right: {
      title: "Q3突破",
      items: [
        "留存率：78% ↑12pp",
        "付费转化：11.5% ↑3.3pp",
        "续约率：85% ↑13pp"
      ]
    }
  },

  // P5: 产品矩阵扩展
  {
    type: "hero",
    kick: "产品布局",
    title: "新业务线快速起量",
    sub: "从单一产品到产品矩阵"
  },
  {
    type: "timeline",
    items: [
      { time: "Q1", text: "核心产品优化 - DAU破100万" },
      { time: "Q2", text: "企业版上线 - 签约15家头部客户" },
      { time: "Q3", text: "AI助手发布 - 贡献20%新增营收" },
      { time: "Q4", text: "国际化启动 - 目标东南亚3国" }
    ]
  },

  // P6: 行动计划
  {
    type: "hero",
    kick: "Q4行动",
    title: "三大战役",
    sub: "营收冲刺 · 产品打磨 · 组织升级"
  },
  {
    type: "bullets",
    title: "Q4关键举措",
    items: [
      "营收目标150M - 大客户深耕+渠道下沉双驱动",
      "AI助手2.0 - 性能优化+场景扩展，目标贡献35%营收",
      "组织扩编 - 技术团队扩招30人，销售团队建立3个区域中心"
    ],
    stagger: true
  },

  // P7: 结尾
  {
    type: "quote",
    text: "Q3超预期，Q4全力冲刺年度目标200M",
    by: "战略运营部 · 2026.10"
  }
];

// 配色方案（深蓝专业风格）
const PAGE_CONFIG = {
  bgColor: "#0F172A",
  textColor: "#F8FAFC",
  accentColor: "#38BDF8",
  secondaryColor: "#F59E0B",
  chartColors: ["#38BDF8", "#10B981", "#F59E0B", "#EF4444"]
};

// 导出为window.NARRATIVE_DECK供engine.js使用
window.NARRATIVE_DECK = {
  theme: {
    blue: PAGE_CONFIG.accentColor,
    gold: PAGE_CONFIG.secondaryColor,
    bg: PAGE_CONFIG.bgColor
  },
  slides: DECK.map(block => ({
    layout: 'center',
    blocks: [block]
  }))
};
