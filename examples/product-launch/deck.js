// 产品发布Demo - 新产品发布会
// 受众：客户/媒体/投资人
// 结构：痛点→解法→证明→行动
// 特点：视觉冲击、价值主张优先、引用权威

const DECK = [
  // P1: 封面
  {
    type: "hero",
    kick: "新品发布",
    title: "AI智能助手 2.0",
    sub: "重新定义企业效率"
  },

  // P2: 行业痛点
  {
    type: "hero",
    kick: "痛点",
    title: "企业效率的三大黑洞",
    sub: "每天2小时浪费在重复性工作"
  },
  {
    type: "bullets",
    title: "企业员工的痛点",
    items: [
      "信息查找 - 45%的工作时间用于查找文档和数据",
      "重复劳动 - 每周20小时花在格式化报告、整理数据",
      "协作低效 - 跨部门沟通需要3-5个工作日才能得到反馈"
    ],
    stagger: true
  },

  // P3: 解决方案
  {
    type: "hero",
    kick: "解法",
    title: "AI智能助手",
    sub: "一句话解决80%重复工作"
  },
  {
    type: "compare",
    left: {
      title: "传统方式",
      items: [
        "人工查找文档 - 30分钟",
        "手动整理数据 - 2小时",
        "邮件来回确认 - 2天",
        "制作周报PPT - 1小时"
      ]
    },
    right: {
      title: "AI助手",
      items: [
        "语音查询 - 5秒",
        "自动生成报表 - 1分钟",
        "实时协作 - 即时",
        "一键生成周报 - 10秒"
      ]
    }
  },

  // P4: 核心能力
  {
    type: "hero",
    kick: "能力",
    title: "四大核心功能",
    sub: "智能搜索 · 文档生成 · 数据分析 · 工作流自动化"
  },
  {
    type: "tabs",
    tabs: [
      {
        label: "智能搜索",
        html: `
          <div style="padding:2rem;font-size:0.9rem;line-height:1.8;">
            <strong style="color:#38BDF8;">企业级知识库</strong><br>
            • 全文检索 - 支持自然语言查询<br>
            • 语义理解 - 理解上下文和意图<br>
            • 权限控制 - 按角色展示结果<br>
            • 多源整合 - 连接邮件/文档/数据库
          </div>
        `
      },
      {
        label: "文档生成",
        html: `
          <div style="padding:2rem;font-size:0.9rem;line-height:1.8;">
            <strong style="color:#10B981;">一键生成报告</strong><br>
            • 周报/月报 - 自动抓取数据生成<br>
            • 会议纪要 - 录音转文字+摘要<br>
            • PPT生成 - 数据可视化呈现<br>
            • 多格式导出 - PDF/Word/HTML
          </div>
        `
      },
      {
        label: "数据分析",
        html: `
          <div style="padding:2rem;font-size:0.9rem;line-height:1.8;">
            <strong style="color:#F59E0B;">智能洞察</strong><br>
            • 趋势预测 - 基于历史数据预测<br>
            • 异常检测 - 实时监控业务指标<br>
            • 对比分析 - 多维度数据对比<br>
            • 可视化 - 自动生成图表
          </div>
        `
      },
      {
        label: "工作流",
        html: `
          <div style="padding:2rem;font-size:0.9rem;line-height:1.8;">
            <strong style="color:#EF4444;">流程自动化</strong><br>
            • 审批流 - 智能路由+自动提醒<br>
            • 定时任务 - 周期性报表生成<br>
            • 集成API - 连接企业系统<br>
            • 触发器 - 事件驱动执行
          </div>
        `
      }
    ]
  },

  // P5: 客户案例
  {
    type: "hero",
    kick: "验证",
    title: "15家头部企业验证",
    sub: "平均效率提升40%"
  },
  {
    type: "metric",
    title: "真实客户数据",
    items: [
      {
        value: "42",
        unit: "%",
        label: "效率提升",
        delta: "平均每人每天节省3.4小时",
        trend: "up"
      },
      {
        value: "15",
        unit: "家",
        label: "头部客户",
        delta: "Fortune 500",
        trend: "up"
      },
      {
        value: "50",
        unit: "万",
        label: "活跃用户",
        delta: "+300%增长",
        trend: "up"
      }
    ]
  },

  // P6: 客户证言
  {
    type: "quote",
    text: "AI助手让我们的运营效率提升了50%，报表生成时间从2天缩短到10分钟",
    by: "某互联网公司 COO"
  },

  // P7: 定价与行动
  {
    type: "hero",
    kick: "定价",
    title: "灵活的订阅方案",
    sub: "从初创团队到大型企业"
  },
  {
    type: "compare",
    left: {
      title: "标准版",
      items: [
        "¥299/人/月",
        "基础AI能力",
        "10GB存储",
        "邮件支持"
      ]
    },
    right: {
      title: "企业版",
      items: [
        "¥599/人/月",
        "全功能+定制",
        "无限存储",
        "专属客户成功"
      ]
    }
  },

  // P8: 行动号召
  {
    type: "hero",
    kick: "立即开始",
    title: "30天免费试用",
    sub: "无需信用卡 · 随时取消"
  },
  {
    type: "bullets",
    title: "三步开始",
    items: [
      "1. 注册账号 - 30秒完成，无需信用卡",
      "2. 邀请团队 - 添加同事，开始协作",
      "3. 接入系统 - 连接企业数据，释放AI能力"
    ],
    stagger: true
  },

  // P9: 结尾
  {
    type: "quote",
    text: "让AI成为每个员工的超能力",
    by: "产品团队 · 2026.10"
  }
];

// 配色方案（现代渐变风格）
const PAGE_CONFIG = {
  bgColor: "#0F172A",
  textColor: "#F8FAFC",
  accentColor: "#38BDF8",
  secondaryColor: "#F59E0B",
  chartColors: ["#38BDF8", "#10B981", "#F59E0B", "#EF4444"]
};
