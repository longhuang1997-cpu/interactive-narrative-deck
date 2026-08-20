/* 新增专业Block演示
   演示fishbone/bcg/kanban三个新Block的实际使用 */

window.NARRATIVE_DECK = {
  theme: {
    blue: "#0ea5e9",
    gold: "#f59e0b",
    bg: "#0f172a"
  },

  slides: [
    // P1: 封面
    {
      title: "封面",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "Interactive Narrative Deck v3.1",
          title: "新增专业Block演示",
          sub: "fishbone鱼骨图 · bcg矩阵 · kanban看板"
        }
      ]
    },

    // P2: 鱼骨图 - 问题根因分析
    {
      title: "鱼骨图演示",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "01 · 鱼骨图",
          title: "问题根因分析",
          sub: "6M方法论（人/机/料/法/环/测）"
        },
        {
          type: "fishbone",
          title: "客户投诉率偏高根因分析",
          problem: "客户投诉率达8%（目标≤3%）",
          causes: {
            people: [
              "客服团队培训不足",
              "响应速度慢（平均2小时）",
              "夜班人手不够"
            ],
            machine: [
              "系统频繁宕机（月均3次）",
              "工单派发延迟",
              "移动端APP闪退"
            ],
            material: [
              "产品质量不稳定",
              "配件供应不及时"
            ],
            method: [
              "处理流程不规范",
              "无标准SOP",
              "跨部门协作混乱"
            ],
            environment: [
              "高峰期压力大",
              "办公环境嘈杂影响沟通"
            ],
            measurement: [
              "投诉数据统计口径不一致",
              "缺少实时监控"
            ]
          }
        }
      ]
    },

    // P3: BCG矩阵 - 业务组合分析
    {
      title: "BCG矩阵演示",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "02 · BCG矩阵",
          title: "业务组合分析",
          sub: "2x2矩阵：明星/金牛/问题/瘦狗"
        },
        {
          type: "bcg",
          title: "2026年业务组合战略分析",
          items: [
            {
              name: "智慧卫生间",
              marketGrowth: 85,
              marketShare: 35,
              size: 50
            },
            {
              name: "安全管家",
              marketGrowth: 65,
              marketShare: 75,
              size: 120
            },
            {
              name: "能源管控",
              marketGrowth: 25,
              marketShare: 65,
              size: 200
            },
            {
              name: "传统物业",
              marketGrowth: 10,
              marketShare: 25,
              size: 80
            },
            {
              name: "AI巡检",
              marketGrowth: 90,
              marketShare: 20,
              size: 30
            },
            {
              name: "门禁系统",
              marketGrowth: 15,
              marketShare: 80,
              size: 150
            }
          ]
        }
      ]
    },

    // P4: 看板 - 任务流程管理
    {
      title: "看板演示",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "03 · 看板",
          title: "任务流程管理",
          sub: "敏捷开发 · 工作流可视化"
        },
        {
          type: "kanban",
          title: "项目开发看板（本周Sprint）",
          columns: [
            {
              title: "待开发 Backlog",
              color: "#6b7280",
              cards: [
                {title: "看板功能开发", tag: "P1", assignee: "张三"},
                {title: "报表导出功能", tag: "P2", assignee: "李四"},
                {title: "数据通道优化", tag: "P1", assignee: "王五"}
              ]
            },
            {
              title: "开发中 In Progress",
              color: "#3b82f6",
              cards: [
                {title: "传感器数据接入", tag: "P0", assignee: "赵六"},
                {title: "阈值规则引擎", tag: "P0", assignee: "陈七"}
              ]
            },
            {
              title: "测试中 Testing",
              color: "#f59e0b",
              cards: [
                {title: "工单派发逻辑", tag: "P0", assignee: "周八"}
              ]
            },
            {
              title: "已完成 Done",
              color: "#10b981",
              cards: [
                {title: "用户登录模块", tag: "P0", assignee: "吴九"},
                {title: "数据库设计", tag: "P0", assignee: "郑十"}
              ]
            }
          ]
        }
      ]
    },

    // P5: 适用场景总结
    {
      title: "适用场景",
      layout: "left",
      blocks: [
        {
          type: "hero",
          kick: "04 · 使用指南",
          title: "三个新Block的适用场景",
          sub: "什么时候用哪个？"
        },
        {
          type: "split",
          img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect fill='%230f172a' width='300' height='200'/%3E%3Ctext x='150' y='60' fill='%230ea5e9' font-size='24' text-anchor='middle' font-family='Arial'%3E🐟 Fishbone%3C/text%3E%3Ctext x='150' y='90' fill='%2394a3b8' font-size='14' text-anchor='middle' font-family='Arial'%3E根因分析%3C/text%3E%3Ctext x='150' y='130' fill='%230ea5e9' font-size='24' text-anchor='middle' font-family='Arial'%3E📊 BCG%3C/text%3E%3Ctext x='150' y='160' fill='%2394a3b8' font-size='14' text-anchor='middle' font-family='Arial'%3E业务组合%3C/text%3E%3C/svg%3E",
          content: `<h3 style='color:#0ea5e9;margin:0 0 1rem 0'>使用决策树</h3>
<ul style='list-style:none;padding:0;line-height:1.8;color:#cbd5e1'>
<li><strong style='color:#0ea5e9'>🐟 Fishbone</strong> - 问题排查、质量分析、故障复盘时使用</li>
<li><strong style='color:#0ea5e9'>📊 BCG</strong> - 业务组合战略、产品portfolio评估、投资决策时使用</li>
<li><strong style='color:#f59e0b'>📋 Kanban</strong> - 敏捷开发汇报、任务进度展示、工作流管理时使用</li>
</ul>
<p style='color:#64748b;margin-top:1rem;font-size:.9rem'>三个Block互补，覆盖"分析-决策-执行"全链条</p>`
        }
      ]
    },

    // P6: 总结
    {
      title: "总结",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "v3.1 更新",
          title: "新增3个专业Block",
          sub: "fishbone · bcg · kanban"
        },
        {
          type: "metric",
          items: [
            { value: "18", unit: "种", label: "Block总数", delta: "+3" },
            { value: "6", unit: "种", label: "专业Block", delta: "翻倍" },
            { value: "100", unit: "%", label: "生产就绪", delta: "已测试" }
          ]
        },
        {
          type: "quote",
          text: "好的汇报工具，应该让汇报者专注于内容本身，而不是格式调整。",
          by: "Interactive Narrative Deck Design Philosophy"
        }
      ]
    }
  ]
};
