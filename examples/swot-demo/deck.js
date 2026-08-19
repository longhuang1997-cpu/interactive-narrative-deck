/* Q3战略复盘 - SWOT分析示例
   展示SWOT Block的完整使用方式 */

const DECK = {
  theme: {
    blue: '#2563eb',
    gold: '#e8c874',
    bg: '#0b1220'
  },

  slides: [
    // P1: 封面
    {
      layout: 'center',
      blocks: [
        {
          type: 'hero',
          kick: 'Q3 STRATEGIC REVIEW',
          title: '业务战略复盘',
          sub: '2026年第三季度 · 战略分析与行动计划'
        }
      ]
    },

    // P2: 关键数据
    {
      layout: 'center',
      blocks: [
        {
          type: 'metric',
          items: [
            {value: '125', unit: 'M', label: '营收', delta: '+25%'},
            {value: '78', unit: '%', label: '用户留存率', delta: '+5%'},
            {value: '120', unit: '家', label: '新签客户', delta: '+40'}
          ]
        }
      ]
    },

    // P3: SWOT分析（核心）
    {
      layout: 'center',
      blocks: [
        {
          type: 'swot',
          title: '战略形势分析',
          strengths: [
            '品牌知名度行业TOP3，用户心智强',
            '技术团队200+人，AI能力领先',
            '大客户续费率98%，远超行业平均75%',
            '现金流充裕，账上5亿可用资金'
          ],
          weaknesses: [
            '国际化能力弱，海外营收占比仅5%',
            '供应链成本高于行业平均15%',
            '产品迭代速度慢，竞争对手2周一版我们1月一版',
            '销售团队流失率高（30%），影响客户关系'
          ],
          opportunities: [
            'AI技术成熟，大模型成本下降50%，普及加速',
            '东南亚市场年增长30%，本地化竞争弱',
            '政策鼓励数字化转型，企业采购预算增加',
            '主要竞争对手A裁员20%，客户关系受影响'
          ],
          threats: [
            '监管趋严，数据合规成本提高，部分业务受限',
            '头部竞争对手B融资10亿，准备打价格战',
            '开源替代方案兴起，威胁中低端市场',
            '宏观经济下行，客户预算削减20%'
          ],
          showLegend: true
        }
      ]
    },

    // P4: 战略方向（基于SWOT结论）
    {
      layout: 'center',
      blocks: [
        {
          type: 'bullets',
          title: 'Q4战略方向',
          items: [
            'SO策略：用AI能力+产品易用性，抢竞争对手A的大客户',
            'ST策略：强化数据安全认证，对抗巨头竞争和合规压力',
            'WO策略：拓展AI产品线，降低获客成本，加速迭代',
            'WT策略：暂缓国际化，聚焦国内大客户，稳固现金流'
          ],
          stagger: true
        }
      ]
    },

    // P5: 行动计划
    {
      layout: 'left',
      blocks: [
        {
          type: 'timeline',
          items: [
            {time: '10月', text: '启动AI产品线开发'},
            {time: '11月', text: '完成数据安全认证'},
            {time: '12月', text: '发起大客户攻坚战'},
            {time: 'Q1 2027', text: '复盘战略执行成果'}
          ]
        }
      ]
    },

    // P6: 金句收尾
    {
      layout: 'center',
      blocks: [
        {
          type: 'quote',
          text: '抓住AI红利期，用优势打机会，用速度对抗威胁',
          by: 'Q4行动纲领'
        }
      ]
    }
  ]
};

window.NARRATIVE_DECK = DECK;
