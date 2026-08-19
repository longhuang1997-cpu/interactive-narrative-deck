/**
 * Business Blocks - 专业商业分析Block套件
 *
 * 包含主流商业方法论的可视化Block：
 * - SWOT分析矩阵
 * - 更多专业Block（gantt/funnel/okr-tree等）将陆续添加
 *
 * @version 1.0.0
 * @author interactive-narrative-deck
 */

(function() {
  'use strict';

  // ============================================================================
  // SWOT 分析矩阵
  // ============================================================================

  /**
   * SWOT分析Block
   *
   * 用途：战略分析、竞争评估、业务复盘
   * 结构：2x2矩阵，4个象限（优势/劣势/机会/威胁）
   *
   * @param {Object} data - SWOT数据
   * @param {Array<string>} data.strengths - 优势列表
   * @param {Array<string>} data.weaknesses - 劣势列表
   * @param {Array<string>} data.opportunities - 机会列表
   * @param {Array<string>} data.threats - 威胁列表
   * @param {string} [data.title] - 可选标题
   * @param {boolean} [data.showLegend=true] - 是否显示图例
   *
   * @example
   * {
   *   type: 'swot',
   *   title: 'Q3业务战略分析',
   *   strengths: ['品牌知名度高', '用户粘性强', '技术团队优秀'],
   *   weaknesses: ['国际化能力弱', '供应链成本高'],
   *   opportunities: ['AI技术红利', '新兴市场增长'],
   *   threats: ['政策监管趋严', '头部竞争加剧']
   * }
   */
  BlockRegistry.register('swot', function(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'nd-block nd-swot-wrapper';

    // 标题（可选）
    if (data.title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'nd-swot-title';
      titleEl.textContent = data.title;
      wrapper.appendChild(titleEl);
    }

    // SWOT矩阵容器
    const matrix = document.createElement('div');
    matrix.className = 'nd-swot-matrix';

    // 4个象限配置
    const quadrants = [
      {
        key: 'strengths',
        title: 'Strengths',
        subtitle: '优势',
        position: 'top-left',
        color: '#10b981',
        colorDark: '#059669',
        icon: '💪'
      },
      {
        key: 'weaknesses',
        title: 'Weaknesses',
        subtitle: '劣势',
        position: 'top-right',
        color: '#ef4444',
        colorDark: '#dc2626',
        icon: '⚠️'
      },
      {
        key: 'opportunities',
        title: 'Opportunities',
        subtitle: '机会',
        position: 'bottom-left',
        color: '#3b82f6',
        colorDark: '#2563eb',
        icon: '🎯'
      },
      {
        key: 'threats',
        title: 'Threats',
        subtitle: '威胁',
        position: 'bottom-right',
        color: '#f59e0b',
        colorDark: '#d97706',
        icon: '⚡'
      }
    ];

    // 渲染每个象限
    quadrants.forEach(q => {
      const quad = document.createElement('div');
      quad.className = `nd-swot-quad nd-swot-${q.position}`;
      quad.style.setProperty('--quad-color', q.color);
      quad.style.setProperty('--quad-color-dark', q.colorDark);

      // 象限头部
      const header = document.createElement('div');
      header.className = 'nd-swot-header';

      const icon = document.createElement('span');
      icon.className = 'nd-swot-icon';
      icon.textContent = q.icon;

      const titleWrapper = document.createElement('div');
      titleWrapper.className = 'nd-swot-header-text';

      const titleEn = document.createElement('div');
      titleEn.className = 'nd-swot-title-en';
      titleEn.textContent = q.title;

      const titleCn = document.createElement('div');
      titleCn.className = 'nd-swot-title-cn';
      titleCn.textContent = q.subtitle;

      titleWrapper.appendChild(titleEn);
      titleWrapper.appendChild(titleCn);

      header.appendChild(icon);
      header.appendChild(titleWrapper);

      // 象限内容列表
      const content = document.createElement('div');
      content.className = 'nd-swot-content';

      const items = data[q.key] || [];

      if (items.length === 0) {
        // 空状态
        const emptyState = document.createElement('div');
        emptyState.className = 'nd-swot-empty';
        emptyState.textContent = '暂无数据';
        content.appendChild(emptyState);
      } else {
        // 列表项
        const list = document.createElement('ul');
        list.className = 'nd-swot-list';

        items.forEach((item, index) => {
          const li = document.createElement('li');
          li.className = 'nd-swot-item';
          li.style.setProperty('--item-index', index);
          li.textContent = item;
          list.appendChild(li);
        });

        content.appendChild(list);
      }

      quad.appendChild(header);
      quad.appendChild(content);
      matrix.appendChild(quad);
    });

    wrapper.appendChild(matrix);

    // 图例（可选）
    if (data.showLegend !== false) {
      const legend = document.createElement('div');
      legend.className = 'nd-swot-legend';
      legend.innerHTML = `
        <div class="nd-swot-legend-item">
          <span class="nd-swot-legend-dot" style="background: #10b981;"></span>
          <span>内部优势：发扬光大</span>
        </div>
        <div class="nd-swot-legend-item">
          <span class="nd-swot-legend-dot" style="background: #ef4444;"></span>
          <span>内部劣势：改进补齐</span>
        </div>
        <div class="nd-swot-legend-item">
          <span class="nd-swot-legend-dot" style="background: #3b82f6;"></span>
          <span>外部机会：抓住利用</span>
        </div>
        <div class="nd-swot-legend-item">
          <span class="nd-swot-legend-dot" style="background: #f59e0b;"></span>
          <span>外部威胁：防御化解</span>
        </div>
      `;
      wrapper.appendChild(legend);
    }

    return wrapper;
  }, {
    description: 'SWOT分析矩阵 - 4象限展示优势/劣势/机会/威胁，适用于战略分析和竞争评估',
    category: 'business-analysis',
    framework: 'Strategic Planning',
    tags: ['strategy', 'analysis', 'planning', 'competition'],
    author: 'interactive-narrative-deck',
    version: '1.0.0',
    useCase: [
      '年度/季度战略规划',
      '新业务进入评估',
      '竞争态势分析',
      '项目启动分析'
    ]
  });

})();
