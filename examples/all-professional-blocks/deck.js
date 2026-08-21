/* 完整专业Block演示 - 5大方法论工具
   OKR目标管理 · 甘特图 · 鱼骨图 · BCG矩阵 · 看板 */

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
          kick: "Interactive Narrative Deck v3.0",
          title: "5大专业方法论Block",
          sub: "OKR · 甘特图 · 鱼骨图 · BCG矩阵 · 看板"
        }
      ]
    },

    // P2: OKR目标管理
    {
      title: "OKR演示",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "01 · OKR",
          title: "目标与关键结果",
          sub: "Objective → Key Results · 进度可视化"
        },
        {
          type: "okr",
          title: "Q4战略目标",
          objective: "营收增长30%，实现可持续增长",
          keyResults: [
            {
              kr: "KR1: 新客户转化率提升至15%（当前12%）",
              progress: 75,
              status: "on-track"
            },
            {
              kr: "KR2: 客单价提升20%（目标￥8000）",
              progress: 60,
              status: "at-risk"
            },
            {
              kr: "KR3: 老客户复购率达到40%（当前35%）",
              progress: 90,
              status: "achieved"
            },
            {
              kr: "KR4: NPS净推荐值达到60分",
              progress: 45,
              status: "at-risk"
            }
          ]
        }
      ]
    },

    // P3: 甘特图项目进度
    {
      title: "甘特图演示",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "02 · 甘特图",
          title: "项目进度管理",
          sub: "时间轴 · 里程碑 · 任务依赖"
        },
        {
          type: "gantt",
          title: "AI系统开发项目（2026 Q3-Q4）",
          start: "2026-08",
          end: "2026-12",
          tasks: [
            {
              name: "需求调研",
              start: "2026-08",
              duration: 2,
              progress: 100,
              assignee: "产品组"
            },
            {
              name: "架构设计",
              start: "2026-09",
              duration: 3,
              progress: 100,
              assignee: "架构组"
            },
            {
              name: "核心开发",
              start: "2026-09",
              duration: 8,
              progress: 65,
              assignee: "研发组"
            },
            {
              name: "集成测试",
              start: "2026-11",
              duration: 4,
              progress: 30,
              assignee: "测试组"
            },
            {
              name: "上线部署",
              start: "2026-12",
              duration: 2,
              progress: 0,
              assignee: "运维组"
            }
          ]
        }
      ]
    },

    // P4: 鱼骨图根因分析
    {
      title: "鱼骨图演示",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "03 · 鱼骨图",
          title: "问题根因分析",
          sub: "Ishikawa · 6M方法论"
        },
        {
          type: "fishbone",
          title: "客户投诉率偏高根因分析",
          problem: "客户投诉率达8%（目标≤3%）",
          causes: {
            people: [
              "客服培训不足，专业度不够",
              "响应速度慢（平均2小时）",
              "夜班人手不够导致积压"
            ],
            machine: [
              "工单系统频繁宕机（月均3次）",
              "CRM数据不同步",
              "移动端APP闪退率高"
            ],
            material: [
              "产品质量不稳定",
              "配件供应不及时",
              "包装破损率高"
            ],
            method: [
              "处理流程不规范",
              "无标准SOP文档",
              "跨部门协作混乱"
            ],
            environment: [
              "旺季压力大人手不足",
              "办公环境嘈杂影响沟通",
              "座席设备老旧"
            ],
            measurement: [
              "投诉数据统计口径不一致",
              "缺少实时监控大屏",
              "无预警机制"
            ]
          }
        }
      ]
    },

    // P5: BCG业务组合矩阵
    {
      title: "BCG矩阵演示",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "04 · BCG矩阵",
          title: "业务组合分析",
          sub: "市场增长率 × 相对市场份额"
        },
        {
          type: "bcg",
          title: "2026年业务组合战略分析",
          items: [
            {
              name: "智慧卫生间（明星）",
              marketGrowth: 85,
              marketShare: 35,
              size: 50
            },
            {
              name: "安全管家（明星）",
              marketGrowth: 65,
              marketShare: 75,
              size: 120
            },
            {
              name: "能源管控（现金牛）",
              marketGrowth: 25,
              marketShare: 65,
              size: 200
            },
            {
              name: "传统物业（瘦狗）",
              marketGrowth: 10,
              marketShare: 25,
              size: 80
            },
            {
              name: "AI巡检（问题）",
              marketGrowth: 90,
              marketShare: 20,
              size: 30
            },
            {
              name: "门禁系统（现金牛）",
              marketGrowth: 15,
              marketShare: 80,
              size: 150
            }
          ]
        }
      ]
    },

    // P6: 看板任务流程
    {
      title: "看板演示",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "05 · 看板",
          title: "敏捷任务管理",
          sub: "Kanban · 工作流可视化"
        },
        {
          type: "kanban",
          title: "研发Sprint看板（本周任务）",
          columns: [
            {
              title: "待办 Backlog",
              color: "#6b7280",
              cards: [
                {
                  title: "看板功能优化",
                  tag: "P1",
                  assignee: "张三",
                  description: "优化看板UI交互，增加卡片展开功能",
                  plan: [
                    "设计卡片展开/收起动画效果",
                    "实现点击展开详细信息",
                    "确保一次只展开一张卡片",
                    "添加过渡动画避免重叠"
                  ],
                  notes: "需要参考Trello的交互模式"
                },
                {
                  title: "报表导出功能",
                  tag: "P2",
                  assignee: "李四",
                  description: "支持Excel和PDF格式导出",
                  plan: [
                    "集成ExcelJS库",
                    "设计导出模板",
                    "实现数据转换逻辑"
                  ]
                },
                {
                  title: "数据通道重构",
                  tag: "P0",
                  assignee: "王五",
                  description: "重构传感器数据采集通道，提升性能",
                  plan: [
                    "分析现有性能瓶颈",
                    "设计新的数据流架构",
                    "实现批量采集机制",
                    "压测验证性能提升"
                  ],
                  notes: "目标：吞吐量提升3倍"
                }
              ]
            },
            {
              title: "开发中 In Progress",
              color: "#3b82f6",
              cards: [
                {
                  title: "传感器数据接入",
                  tag: "P0",
                  assignee: "赵六",
                  description: "接入50+类型传感器数据流",
                  subtasks: { completed: 3, total: 5 },
                  plan: [
                    "✓ 温湿度传感器接入完成",
                    "✓ 烟感传感器接入完成",
                    "✓ 门磁传感器接入完成",
                    "⏳ 人体红外传感器开发中",
                    "⏳ 水浸传感器待开发"
                  ],
                  notes: "预计明天完成剩余2个类型"
                },
                {
                  title: "阈值规则引擎",
                  tag: "P0",
                  assignee: "陈七",
                  description: "可视化配置阈值告警规则",
                  plan: [
                    "设计规则DSL语法",
                    "实现规则解析器",
                    "开发可视化配置界面",
                    "集成告警通知"
                  ]
                }
              ]
            },
            {
              title: "测试中 Testing",
              color: "#f59e0b",
              cards: [
                {
                  title: "工单派发逻辑",
                  tag: "P0",
                  assignee: "周八",
                  description: "智能派发工单到最优工人",
                  plan: [
                    "功能测试完成",
                    "性能测试进行中",
                    "边界场景测试待开始"
                  ],
                  notes: "发现2个边界case bug，已修复"
                },
                {
                  title: "权限系统重构",
                  tag: "P1",
                  assignee: "吴九",
                  description: "RBAC权限模型升级",
                  plan: [
                    "单元测试覆盖率95%",
                    "集成测试进行中",
                    "安全渗透测试待进行"
                  ]
                }
              ]
            },
            {
              title: "已完成 Done",
              color: "#10b981",
              cards: [
                {
                  title: "用户登录模块",
                  tag: "P0",
                  assignee: "郑十",
                  description: "支持账号密码和SSO登录",
                  plan: [
                    "✓ JWT token机制",
                    "✓ SSO集成完成",
                    "✓ 测试通过",
                    "✓ 已上线"
                  ],
                  notes: "已在生产环境稳定运行3天"
                },
                {
                  title: "数据库设计",
                  tag: "P0",
                  assignee: "孙十一",
                  description: "完成核心表结构设计",
                  plan: [
                    "✓ ER图设计评审通过",
                    "✓ 索引优化完成",
                    "✓ 迁移脚本ready"
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    // P7: 使用场景对比
    {
      title: "使用场景",
      layout: "left",
      blocks: [
        {
          type: "hero",
          kick: "使用指南",
          title: "5个Block的适用场景",
          sub: "什么时候用哪个？"
        },
        {
          type: "bullets",
          title: "决策树",
          items: [
            "🎯 OKR - 战略目标汇报、季度复盘、团队对齐时使用",
            "📅 甘特图 - 项目进度汇报、路线图规划、资源协调时使用",
            "🐟 鱼骨图 - 问题排查、质量分析、故障复盘时使用",
            "📊 BCG矩阵 - 业务组合战略、产品评估、投资决策时使用",
            "📋 看板 - 敏捷开发汇报、任务进度、工作流管理时使用"
          ],
          stagger: true
        }
      ]
    },

    // P8: 总结
    {
      title: "总结",
      layout: "center",
      blocks: [
        {
          type: "hero",
          kick: "v3.0 专业版",
          title: "5大方法论Block已就绪",
          sub: "OKR · 甘特图 · 鱼骨图 · BCG · 看板"
        },
        {
          type: "metric",
          items: [
            { value: "18", unit: "种", label: "Block总数", delta: "+5" },
            { value: "8", unit: "种", label: "专业Block", delta: "翻倍" },
            { value: "100", unit: "%", label: "生产就绪", delta: "已测试" }
          ]
        },
        {
          type: "quote",
          text: "专业方法论可视化，让汇报更有说服力。",
          by: "Interactive Narrative Deck v3.0"
        }
      ]
    }
  ]
};
