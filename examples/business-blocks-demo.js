/* 专业商业Block演示 - fishbone / bcg / kanban
   展示三个新增Block的实际应用场景 */

window.NARRATIVE_DECK = {
  theme: {
    blue: "#3b82f6",    // 商业分析蓝
    gold: "#f59e0b",    // 决策橙
    bg: "#0f172a"       // 深蓝背景
  },

  slides: [
    // P1: 封面
    {
      title: "封面",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "Business Blocks 演示",
          title: "三个专业商业分析Block",
          sub: "fishbone鱼骨图 / BCG矩阵 / Kanban看板"
        }
      ]
    },

    // P2: 鱼骨图演示
    {
      title: "鱼骨图-根因分析",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "Block 1 · Fishbone",
          title: "鱼骨图（Ishikawa）",
          sub: "6M根因分析法 - 人/机/料/法/环/测"
        },
        {
          type: "fishbone",
          title: "客户投诉率偏高根因分析",
          problem: "Q2客户投诉率达8%（目标<3%）",
          causes: {
            people: [
              "客服培训体系缺失",
              "响应速度SLA未达标",
              "夜班人员配置不足"
            ],
            machine: [
              "工单系统频繁宕机",
              "派单算法延迟>2分钟",
              "移动端APP崩溃率5%"
            ],
            material: [
              "产品功能缺陷率12%",
              "文档更新不及时",
              "演示环境不稳定"
            ],
            method: [
              "售后流程不规范",
              "无标准SOP文档",
              "跨部门协作低效"
            ],
            environment: [
              "Q2业务高峰期压力",
              "竞品降价策略冲击",
              "行业监管政策变化"
            ],
            measurement: [
              "投诉数据统计口径不一",
              "客户满意度调研缺失",
              "问题分类标签混乱"
            ]
          }
        }
      ]
    },

    // P3: 鱼骨图应用场景
    {
      title: "鱼骨图应用场景",
      layout: "left",
      blocks: [
        {
          type: "bullets",
          title: "fishbone适用场景",
          items: [
            "质量问题根因分析 - 制造业/医疗/食品安全",
            "故障排查复盘 - IT系统宕机/生产事故",
            "流程优化诊断 - 效率瓶颈/成本超支",
            "客诉问题分析 - 服务质量/产品缺陷"
          ]
        },
        {
          type: "quote",
          text: "不要问'谁的错'，要问'为什么会发生'。",
          by: "—— 石川馨（鱼骨图发明者）"
        }
      ]
    },

    // P4: BCG矩阵演示
    {
      title: "BCG矩阵-业务组合",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "Block 2 · BCG Matrix",
          title: "BCG矩阵（波士顿矩阵）",
          sub: "业务组合战略分析 - 明星/金牛/问题/瘦狗"
        },
        {
          type: "bcg",
          title: "2026业务组合战略规划",
          items: [
            {name: "AI助手", marketGrowth: 85, marketShare: 35, size: 60},
            {name: "数据分析", marketGrowth: 70, marketShare: 25, size: 40},
            {name: "企业SaaS", marketGrowth: 25, marketShare: 75, size: 200},
            {name: "传统咨询", marketGrowth: 10, marketShare: 50, size: 150},
            {name: "硬件销售", marketGrowth: 5, marketShare: 15, size: 30}
          ]
        }
      ]
    },

    // P5: BCG矩阵决策建议
    {
      title: "BCG战略决策",
      layout: "center",
      blocks: [
        {
          type: "grid",
          columns: 2,
          cards: [
            {
              icon: "⭐",
              title: "明星业务（AI助手）",
              text: "高增长+高份额 → 持续加大投入，抢占市场",
              tag: "重点"
            },
            {
              icon: "🐄",
              title: "金牛业务（企业SaaS）",
              text: "低增长+高份额 → 收割利润，维持运营",
              tag: "现金流"
            },
            {
              icon: "❓",
              title: "问题业务（数据分析）",
              text: "高增长+低份额 → 选择性投资或退出",
              tag: "观察"
            },
            {
              icon: "🐶",
              title: "瘦狗业务（硬件销售）",
              text: "低增长+低份额 → 考虑剥离或转型",
              tag: "优化"
            }
          ]
        }
      ]
    },

    // P6: Kanban看板演示
    {
      title: "Kanban看板",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "Block 3 · Kanban",
          title: "Kanban看板",
          sub: "敏捷开发可视化 - 任务流程管理"
        },
        {
          type: "kanban",
          title: "Q3产品开发看板（本周）",
          columns: [
            {
              title: "待开发 Backlog",
              color: "#6b7280",
              cards: [
                {title: "用户画像2.0功能", tag: "P1", assignee: "张三"},
                {title: "API限流优化", tag: "P2", assignee: "李四"},
                {title: "移动端适配", tag: "P2", assignee: "王五"}
              ]
            },
            {
              title: "开发中 In Progress",
              color: "#3b82f6",
              cards: [
                {title: "支付模块重构", tag: "P0", assignee: "赵六"},
                {title: "数据导出功能", tag: "P1", assignee: "孙七"}
              ]
            },
            {
              title: "测试中 Testing",
              color: "#f59e0b",
              cards: [
                {title: "权限系统升级", tag: "P0", assignee: "周八"}
              ]
            },
            {
              title: "已完成 Done",
              color: "#10b981",
              cards: [
                {title: "登录页面改版", tag: "P1", assignee: "吴九"},
                {title: "性能监控埋点", tag: "P2", assignee: "郑十"}
              ]
            }
          ]
        }
      ]
    },

    // P7: Kanban应用场景
    {
      title: "Kanban应用场景",
      layout: "left",
      blocks: [
        {
          type: "bullets",
          title: "kanban适用场景",
          items: [
            "敏捷开发进度展示 - Sprint计划/每日站会",
            "工作流管理 - 客服工单/设计需求/内容生产",
            "任务分配追踪 - 团队协作透明化",
            "项目状态汇报 - 周会/月度复盘"
          ]
        },
        {
          type: "metric",
          items: [
            {value: "12", unit: "个", label: "本周任务数", delta: "+3"},
            {value: "4.5", unit: "天", label: "平均完成周期", delta: "-1.2天"},
            {value: "83", unit: "%", label: "按时交付率", delta: "+8%"}
          ]
        }
      ]
    },

    // P8: 三个Block对比总结
    {
      title: "Block对比总结",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "总结",
          title: "三个专业Block何时用？",
          sub: "根因分析 / 战略规划 / 流程管理"
        },
        {
          type: "compare",
          left: {
            title: "诊断型场景",
            items: [
              "fishbone → 问题已发生，找根因",
              "适合：质量/故障/投诉分析",
              "产出：6M分类根因清单"
            ]
          },
          right: {
            title: "决策型场景",
            items: [
              "bcg → 多业务并存，定优先级",
              "适合：战略规划/资源分配",
              "产出：投资/收割/退出决策"
            ]
          }
        }
      ]
    },

    // P9: 收尾
    {
      title: "收尾",
      layout: "center",
      blocks: [
        {
          type: "quote",
          text: "好的可视化工具，让复杂决策变得直观。",
          by: "—— Interactive Narrative Deck"
        },
        {
          type: "bullets",
          title: "如何使用这些Block？",
          items: [
            "在deck.js的blocks数组中添加对应配置",
            "参考 knowledge/block-reference.md 查看完整API",
            "三个Block的CSS样式已在 engine/business-blocks.css",
            "支持所有标准交互：空格渐进/O总览/F11全屏"
          ]
        }
      ]
    }
  ]
};
