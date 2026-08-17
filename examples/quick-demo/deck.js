/* Quick Demo - 3分钟战略汇报示例
   演示所有核心Block组件的基础用法 */
window.NARRATIVE_DECK = {
  theme: {
    blue: "#38bdf8",   // 天空蓝（主色调）
    gold: "#f59e0b",   // 琥珀金（强调色）
    bg: "#0f172a"      // 深蓝灰底
  },
  slides: [
    // 1. 封面 - hero block
    {
      title: "2026 Q3 业务战略汇报",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "QUARTERLY STRATEGY REVIEW",
          title: "业务突破与下季规划",
          sub: "2026年8月17日 · 战略研讨会"
        }
      ]
    },

    // 2. 核心指标 - metric block（数字滚动动效）
    {
      title: "核心指标",
      layout: "center",
      blocks: [
        {
          type: "metric",
          items: [
            { value: "128.5", unit: "万", label: "季度营收", delta: "+23.4%" },
            { value: "4200", unit: "家", label: "新增客户", delta: "+18%" },
            { value: "92.3", unit: "%", label: "续约率", delta: "+5.1%" }
          ]
        }
      ]
    },

    // 3. 问题分析 - bullets + 渐进揭示
    {
      title: "三大瓶颈",
      layout: "left",
      blocks: [
        {
          type: "bullets",
          title: "Q2复盘发现的核心问题",
          items: [
            "交付周期过长（平均45天 vs 行业30天）",
            "中小客户流失率偏高（15% vs 目标8%）",
            "跨部门协同效率低（项目延期占比32%）"
          ],
          stagger: true  // 逐条渐进揭示
        }
      ]
    },

    // 4. 方案对比 - compare block
    {
      title: "解决方案对比",
      layout: "center",
      blocks: [
        {
          type: "compare",
          left: {
            title: "传统方案",
            items: [
              "人工排期（易冲突）",
              "邮件沟通（响应慢）",
              "Excel管理（易丢失）"
            ]
          },
          right: {
            title: "AI驱动方案",
            items: [
              "智能排期（冲突自动解决）",
              "实时协同（消息秒达）",
              "知识图谱（永不丢失）"
            ]
          }
        }
      ]
    },

    // 5. 趋势图表 - chart block（Chart.js）
    {
      title: "增长趋势",
      layout: "center",
      blocks: [
        {
          type: "chart",
          chart: "line",
          title: "季度营收走势（万元）",
          data: {
            labels: ["Q1", "Q2", "Q3", "Q4预测"],
            datasets: [{
              label: "2026年",
              data: [95.2, 104.8, 128.5, 145.0],
              borderColor: "#38bdf8",
              backgroundColor: "rgba(56,189,248,0.1)",
              tension: 0.4
            }, {
              label: "2025年同期",
              data: [88.0, 92.3, 98.7, 102.1],
              borderColor: "#64748b",
              backgroundColor: "rgba(100,116,139,0.1)",
              tension: 0.4
            }]
          }
        }
      ]
    },

    // 6. 时间线 - timeline block
    {
      title: "Q4行动路线图",
      layout: "center",
      blocks: [
        {
          type: "timeline",
          items: [
            { time: "9月", text: "AI排期系统上线" },
            { time: "10月", text: "中小客户专属服务包发布" },
            { time: "11月", text: "跨部门协同平台试点" },
            { time: "12月", text: "全面推广 + 效果复盘" }
          ]
        }
      ]
    },

    // 7. 金句收尾 - quote block
    {
      title: "结语",
      layout: "center",
      blocks: [
        {
          type: "quote",
          text: "效率不是做得更快，而是用AI做对的事。",
          by: "—— 战略复盘小结"
        }
      ]
    }
  ]
};
