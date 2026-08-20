// 技术分享Demo - 微服务架构演进
// 受众：技术团队
// 结构：背景→问题→方案→Demo→Q&A
// 特点：代码演示、技术细节、tabs切换

const DECK = [
  // P1: 封面
  {
    type: "hero",
    kick: "技术分享",
    title: "微服务架构演进",
    sub: "从单体到微服务的实战经验"
  },

  // P2: 背景
  {
    type: "hero",
    kick: "背景",
    title: "为什么要拆分？",
    sub: "单体架构的三大痛点"
  },
  {
    type: "bullets",
    title: "单体架构痛点",
    items: [
      "部署慢 - 每次上线需要30分钟，影响所有模块",
      "扩展难 - 高峰期只能整体扩容，成本高昂",
      "协作乱 - 10个团队改同一个代码库，冲突频繁"
    ],
    stagger: true
  },

  // P3: 架构对比
  {
    type: "hero",
    kick: "方案",
    title: "微服务架构设计",
    sub: "服务拆分 + API网关 + 服务治理"
  },
  {
    type: "compare",
    left: {
      title: "单体架构",
      items: [
        "一个代码库",
        "一个部署单元",
        "一个数据库",
        "团队紧耦合"
      ]
    },
    right: {
      title: "微服务架构",
      items: [
        "12个独立服务",
        "独立部署/扩展",
        "数据库隔离",
        "团队自治"
      ]
    }
  },

  // P4: 技术栈选型
  {
    type: "hero",
    kick: "技术栈",
    title: "核心组件",
    sub: "Spring Cloud + Kubernetes + Istio"
  },
  {
    type: "tabs",
    tabs: [
      {
        label: "服务框架",
        html: `
          <div style="padding:2rem;font-size:0.9rem;line-height:1.8;">
            <strong style="color:#38BDF8;">Spring Cloud Alibaba</strong><br>
            • Nacos - 服务注册与配置中心<br>
            • Sentinel - 流量控制与熔断降级<br>
            • Seata - 分布式事务<br>
            • Gateway - API网关
          </div>
        `
      },
      {
        label: "容器编排",
        html: `
          <div style="padding:2rem;font-size:0.9rem;line-height:1.8;">
            <strong style="color:#10B981;">Kubernetes</strong><br>
            • Deployment - 服务部署<br>
            • Service - 负载均衡<br>
            • Ingress - 路由转发<br>
            • HPA - 自动扩缩容
          </div>
        `
      },
      {
        label: "服务网格",
        html: `
          <div style="padding:2rem;font-size:0.9rem;line-height:1.8;">
            <strong style="color:#F59E0B;">Istio</strong><br>
            • 流量管理 - 灰度发布<br>
            • 可观测性 - 链路追踪<br>
            • 安全 - mTLS加密<br>
            • 策略 - 访问控制
          </div>
        `
      }
    ]
  },

  // P5: 迁移时间线
  {
    type: "hero",
    kick: "实施",
    title: "分三阶段迁移",
    sub: "6个月完成全量切换"
  },
  {
    type: "timeline",
    items: [
      { time: "Phase 1", text: "基础设施搭建 - K8s集群+Nacos+网关（2个月）" },
      { time: "Phase 2", text: "核心服务拆分 - 用户/订单/支付独立（3个月）" },
      { time: "Phase 3", text: "全量切换+优化 - 监控告警+性能调优（1个月）" }
    ]
  },

  // P6: 效果数据
  {
    type: "hero",
    kick: "成果",
    title: "关键指标提升",
    sub: "部署效率与系统稳定性显著改善"
  },
  {
    type: "metric",
    title: "迁移前后对比",
    items: [
      {
        value: "5",
        unit: "分钟",
        label: "部署时间",
        delta: "从30分钟",
        trend: "down"
      },
      {
        value: "99.95",
        unit: "%",
        label: "可用性",
        delta: "+0.5%",
        trend: "up"
      },
      {
        value: "200",
        unit: "ms",
        label: "P95响应时间",
        delta: "-100ms",
        trend: "down"
      }
    ]
  },

  // P7: 踩坑与经验
  {
    type: "hero",
    kick: "经验",
    title: "三个关键教训",
    sub: "避免重复踩坑"
  },
  {
    type: "bullets",
    title: "踩坑总结",
    items: [
      "服务拆分粒度 - 太细导致运维成本高，建议按业务域聚合",
      "数据一致性 - 分布式事务性能差，80%场景用最终一致性",
      "链路追踪 - 必须第一天就上，否则后期排查问题困难"
    ],
    stagger: true
  },

  // P8: Q&A
  {
    type: "quote",
    text: "微服务不是银弹，但对我们来说是正确的选择",
    by: "架构组 · 2026.10"
  }
];

// 配色方案（科技蓝风格）
const PAGE_CONFIG = {
  bgColor: "#0B0E14",
  textColor: "#F8FAFC",
  accentColor: "#38BDF8",
  secondaryColor: "#10B981",
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
