/**
 * Block Registry 单元测试
 * 测试18种Block的正常渲染、边界情况、降级机制
 */

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// 模拟DOM环境
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// 加载引擎代码
const engineCode = fs.readFileSync(path.join(__dirname, '../engine/engine.js'), 'utf-8');
const blockRegistryCode = fs.readFileSync(path.join(__dirname, '../engine/block-registry.js'), 'utf-8');
eval(engineCode);
eval(blockRegistryCode);

describe('核心Block测试', () => {

  describe('Hero Block', () => {
    test('正常渲染：完整数据', () => {
      const config = {
        type: 'hero',
        title: '2026战略发布会',
        subtitle: 'AI驱动的下一个十年',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelector('.nd-hero-title').textContent).toBe('2026战略发布会');
      expect(block.querySelector('.nd-hero-subtitle').textContent).toBe('AI驱动的下一个十年');
      expect(block.style.background).toContain('linear-gradient');
    });

    test('边界情况：缺少subtitle', () => {
      const config = {
        type: 'hero',
        title: '仅标题'
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelector('.nd-hero-title')).toBeTruthy();
      expect(block.querySelector('.nd-hero-subtitle')).toBeFalsy();
    });

    test('降级机制：空标题应显示占位符', () => {
      const config = { type: 'hero', title: '' };

      const block = BlockRegistry.create(config);

      expect(block.querySelector('.nd-hero-title').textContent).toBe('[标题待填入]');
    });
  });

  describe('Metric Block', () => {
    test('正常渲染：带增长指示器', () => {
      const config = {
        type: 'metric',
        items: [
          { value: '1200', unit: '万', label: 'Q3营收', delta: '+30%', trend: 'up' }
        ]
      };

      const block = BlockRegistry.create(config);
      const metric = block.querySelector('.nd-metric');

      expect(metric.querySelector('.nd-metric-value').textContent).toBe('1200');
      expect(metric.querySelector('.nd-metric-unit').textContent).toBe('万');
      expect(metric.querySelector('.nd-metric-delta').textContent).toBe('+30%');
      expect(metric.querySelector('.nd-metric-delta').classList.contains('positive')).toBe(true);
    });

    test('边界情况：负增长应用红色样式', () => {
      const config = {
        type: 'metric',
        items: [{ value: '42', unit: '%', label: '毛利率', delta: '-3%', trend: 'down' }]
      };

      const block = BlockRegistry.create(config);
      const delta = block.querySelector('.nd-metric-delta');

      expect(delta.textContent).toBe('-3%');
      expect(delta.classList.contains('negative')).toBe(true);
    });

    test('降级机制：缺失数据用占位符', () => {
      const config = {
        type: 'metric',
        items: [{ label: '待填入指标' }]
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelector('.nd-metric-value').textContent).toBe('[数据待填入]');
    });
  });

  describe('Comparison Block', () => {
    test('正常渲染：左右对比', () => {
      const config = {
        type: 'comparison',
        left: { title: '传统方案', items: ['成本高', '效率低'] },
        right: { title: 'AI方案', items: ['成本降30%', '效率提升2倍'] }
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelectorAll('.nd-comparison-side')).toHaveLength(2);
      expect(block.querySelector('.nd-comparison-side:first-child h3').textContent).toBe('传统方案');
      expect(block.querySelector('.nd-comparison-side:last-child h3').textContent).toBe('AI方案');
    });
  });

  describe('Timeline Block', () => {
    test('正常渲染：里程碑事件', () => {
      const config = {
        type: 'timeline',
        items: [
          { date: '2026-09', title: '产品上线', description: 'MVP版本发布' },
          { date: '2026-12', title: '规模化', description: '覆盖100个项目' }
        ]
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelectorAll('.nd-timeline-item')).toHaveLength(2);
      expect(block.querySelector('.nd-timeline-date').textContent).toBe('2026-09');
    });
  });

  describe('Code Block', () => {
    test('正常渲染：语法高亮', () => {
      const config = {
        type: 'code',
        language: 'javascript',
        code: 'const greeting = "Hello World";'
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelector('code').textContent).toContain('const greeting');
      expect(block.querySelector('code').className).toContain('language-javascript');
    });

    test('安全性：XSS防护', () => {
      const config = {
        type: 'code',
        code: '<script>alert("XSS")</script>'
      };

      const block = BlockRegistry.create(config);
      const code = block.querySelector('code').textContent;

      // 应该被转义
      expect(code).toContain('&lt;script&gt;');
      expect(code).not.toContain('<script>');
    });
  });

});

describe('商业Block测试', () => {

  describe('Fishbone Block', () => {
    test('正常渲染：鱼骨图结构', () => {
      const config = {
        type: 'fishbone',
        problem: '客户流失率上升',
        categories: [
          { name: '价格', causes: ['竞品降价', '合同到期'] },
          { name: '服务', causes: ['响应慢', '满意度下降'] }
        ]
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelector('.nd-fishbone-problem').textContent).toBe('客户流失率上升');
      expect(block.querySelectorAll('.nd-fishbone-category')).toHaveLength(2);
    });
  });

  describe('Gantt Block', () => {
    test('正常渲染：项目甘特图', () => {
      const config = {
        type: 'gantt',
        tasks: [
          { name: '需求分析', start: '2026-09-01', end: '2026-09-15', progress: 100 },
          { name: '开发', start: '2026-09-16', end: '2026-10-31', progress: 60 }
        ]
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelectorAll('.nd-gantt-task')).toHaveLength(2);
      expect(block.querySelector('.nd-gantt-progress').style.width).toBe('100%');
    });
  });

  describe('Funnel Block', () => {
    test('正常渲染：转化漏斗', () => {
      const config = {
        type: 'funnel',
        stages: [
          { label: '访客', value: 10000 },
          { label: '注册', value: 3000 },
          { label: '付费', value: 500 }
        ]
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelectorAll('.nd-funnel-stage')).toHaveLength(3);
      // 第一阶段应该是100%宽度
      expect(block.querySelector('.nd-funnel-stage:first-child .nd-funnel-bar').style.width).toBe('100%');
    });

    test('计算转化率', () => {
      const config = {
        type: 'funnel',
        stages: [
          { label: '访客', value: 1000 },
          { label: '付费', value: 50 }
        ]
      };

      const block = BlockRegistry.create(config);
      const conversionRate = block.querySelector('.nd-funnel-conversion').textContent;

      expect(conversionRate).toContain('5%');
    });
  });

});

describe('自定义Block测试', () => {

  describe('Tabs Block', () => {
    test('正常渲染：标签页切换', () => {
      const config = {
        type: 'tabs',
        tabs: [
          { label: '方案A', content: '内容A' },
          { label: '方案B', content: '内容B' }
        ]
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelectorAll('.nd-tab-button')).toHaveLength(2);
      expect(block.querySelector('.nd-tab-panel.active').textContent).toBe('内容A');
    });

    test('交互测试：点击切换标签页', () => {
      const config = {
        type: 'tabs',
        tabs: [
          { label: '方案A', content: '内容A' },
          { label: '方案B', content: '内容B' }
        ]
      };

      const block = BlockRegistry.create(config);
      const secondTab = block.querySelectorAll('.nd-tab-button')[1];

      secondTab.click();

      expect(block.querySelectorAll('.nd-tab-panel')[1].classList.contains('active')).toBe(true);
      expect(block.querySelectorAll('.nd-tab-panel')[0].classList.contains('active')).toBe(false);
    });
  });

  describe('Grid Block', () => {
    test('正常渲染：卡片网格', () => {
      const config = {
        type: 'grid',
        columns: 3,
        items: [
          { title: '项目A', description: '描述A' },
          { title: '项目B', description: '描述B' },
          { title: '项目C', description: '描述C' }
        ]
      };

      const block = BlockRegistry.create(config);

      expect(block.querySelectorAll('.nd-grid-item')).toHaveLength(3);
      expect(block.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
    });
  });

});

describe('异常处理测试', () => {

  test('无效Block类型应返回错误Block', () => {
    const config = { type: 'nonexistent' };

    const block = BlockRegistry.create(config);

    expect(block.classList.contains('nd-error-block')).toBe(true);
    expect(block.textContent).toContain('未知Block类型');
  });

  test('空配置应返回错误Block', () => {
    const block = BlockRegistry.create(null);

    expect(block.classList.contains('nd-error-block')).toBe(true);
  });

  test('XSS注入防护：所有用户输入应转义', () => {
    const config = {
      type: 'hero',
      title: '<img src=x onerror=alert(1)>',
      subtitle: '<script>alert("XSS")</script>'
    };

    const block = BlockRegistry.create(config);

    // HTML应该被转义，不会执行
    expect(block.innerHTML).not.toContain('<script>');
    expect(block.innerHTML).toContain('&lt;script&gt;');
  });

});

// 运行测试
console.log('Running Block Registry Tests...');
