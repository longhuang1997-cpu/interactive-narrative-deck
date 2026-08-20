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

  // ============================================================================
  // OKR 树状图
  // ============================================================================

  /**
   * OKR树Block
   *
   * 用途：目标管理、战略规划、团队对齐
   * 结构：1个Objective + 多个Key Results，带进度条和状态标识
   *
   * @param {Object} data - OKR数据
   * @param {string} data.objective - 目标（Objective）
   * @param {Array<Object>} data.keyResults - 关键结果列表
   * @param {string} data.keyResults[].kr - KR描述
   * @param {number} data.keyResults[].progress - 进度百分比（0-100）
   * @param {string} [data.keyResults[].status] - 状态：'achieved'|'on-track'|'at-risk'|'not-started'
   * @param {string} [data.title] - 可选标题
   *
   * @example
   * {
   *   type: 'okr',
   *   title: 'Q4战略目标',
   *   objective: '营收增长30%，成为行业前三',
   *   keyResults: [
   *     {kr: 'KR1: 新客户转化率提升至15%', progress: 75, status: 'on-track'},
   *     {kr: 'KR2: 客单价提升20%', progress: 60, status: 'at-risk'},
   *     {kr: 'KR3: 复购率达到40%', progress: 90, status: 'achieved'}
   *   ]
   * }
   */
  BlockRegistry.register('okr', function(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'nd-block nd-okr-wrapper';

    // 标题（可选）
    if (data.title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'nd-okr-title';
      titleEl.textContent = data.title;
      wrapper.appendChild(titleEl);
    }

    // Objective卡片
    const objCard = document.createElement('div');
    objCard.className = 'nd-okr-objective';
    objCard.innerHTML = `
      <div class="nd-okr-obj-label">🎯 Objective</div>
      <div class="nd-okr-obj-text">${data.objective || '【待填入目标】'}</div>
    `;
    wrapper.appendChild(objCard);

    // Key Results容器
    const krsContainer = document.createElement('div');
    krsContainer.className = 'nd-okr-krs';

    const krs = data.keyResults || [];
    krs.forEach((kr, index) => {
      const krCard = document.createElement('div');
      krCard.className = 'nd-okr-kr';
      krCard.style.setProperty('--kr-index', index);

      // 状态颜色映射
      const statusColors = {
        'achieved': '#10b981',
        'on-track': '#3b82f6',
        'at-risk': '#f59e0b',
        'not-started': '#6b7280'
      };
      const statusLabels = {
        'achieved': '已达成',
        'on-track': '正常',
        'at-risk': '风险',
        'not-started': '未开始'
      };
      const status = kr.status || 'on-track';
      const color = statusColors[status];

      krCard.style.setProperty('--kr-color', color);

      // KR内容
      const krContent = document.createElement('div');
      krContent.className = 'nd-okr-kr-content';

      const krText = document.createElement('div');
      krText.className = 'nd-okr-kr-text';
      krText.textContent = kr.kr;

      const krStatus = document.createElement('div');
      krStatus.className = 'nd-okr-kr-status';
      krStatus.style.color = color;
      krStatus.textContent = statusLabels[status];

      krContent.appendChild(krText);
      krContent.appendChild(krStatus);

      // 进度条
      const progressBar = document.createElement('div');
      progressBar.className = 'nd-okr-progress-bar';

      const progressFill = document.createElement('div');
      progressFill.className = 'nd-okr-progress-fill';
      progressFill.style.width = '0%';
      progressFill.style.background = color;
      progressFill.setAttribute('data-progress', kr.progress || 0);

      progressBar.appendChild(progressFill);

      const progressLabel = document.createElement('div');
      progressLabel.className = 'nd-okr-progress-label';
      progressLabel.textContent = `${kr.progress || 0}%`;

      krCard.appendChild(krContent);
      krCard.appendChild(progressBar);
      krCard.appendChild(progressLabel);
      krsContainer.appendChild(krCard);
    });

    wrapper.appendChild(krsContainer);

    // 动画：进度条填充
    setTimeout(() => {
      wrapper.querySelectorAll('.nd-okr-progress-fill').forEach(fill => {
        fill.style.width = fill.getAttribute('data-progress') + '%';
      });
    }, 100);

    return wrapper;
  }, {
    description: 'OKR树状图 - 目标与关键结果可视化，带进度条和状态标识',
    category: 'business-analysis',
    framework: 'Goal Management',
    tags: ['okr', 'goal', 'strategy', 'progress'],
    author: 'interactive-narrative-deck',
    version: '1.0.0',
    useCase: [
      '季度/年度目标汇报',
      '团队OKR对齐',
      '战略执行进度展示',
      '目标复盘分析'
    ]
  });

  // ============================================================================
  // 甘特图
  // ============================================================================

  /**
   * 甘特图Block
   *
   * 用途：项目管理、进度展示、里程碑规划
   * 结构：时间轴 + 任务条，支持进度百分比显示
   *
   * @param {Object} data - 甘特图数据
   * @param {string} data.start - 起始月份（如'2026-08'）
   * @param {string} data.end - 结束月份（如'2026-12'）
   * @param {Array<Object>} data.tasks - 任务列表
   * @param {string} data.tasks[].name - 任务名称
   * @param {string} data.tasks[].start - 任务开始月份
   * @param {number} data.tasks[].duration - 持续月数
   * @param {number} [data.tasks[].progress] - 进度百分比（0-100）
   * @param {string} [data.title] - 可选标题
   *
   * @example
   * {
   *   type: 'gantt',
   *   title: 'Q3-Q4项目路线图',
   *   start: '2026-08',
   *   end: '2026-12',
   *   tasks: [
   *     {name: '需求分析', start: '2026-08', duration: 2, progress: 100},
   *     {name: '开发阶段', start: '2026-09', duration: 8, progress: 60},
   *     {name: '测试上线', start: '2026-11', duration: 4, progress: 0}
   *   ]
   * }
   */
  BlockRegistry.register('gantt', function(data) {
    const wrapper = document.createElement('div');
    wrapper.className = 'nd-block nd-gantt-wrapper';

    // 标题（可选）
    if (data.title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'nd-gantt-title';
      titleEl.textContent = data.title;
      wrapper.appendChild(titleEl);
    }

    // 计算月份范围
    const parseMonth = (str) => {
      const [y, m] = str.split('-').map(Number);
      return new Date(y, m - 1);
    };
    const startDate = parseMonth(data.start);
    const endDate = parseMonth(data.end);
    const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12
                        + (endDate.getMonth() - startDate.getMonth()) + 1;

    // 时间轴容器
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'nd-gantt-timeline';

    // 生成月份标签
    const monthsRow = document.createElement('div');
    monthsRow.className = 'nd-gantt-months';
    for (let i = 0; i < totalMonths; i++) {
      const month = new Date(startDate.getFullYear(), startDate.getMonth() + i);
      const label = document.createElement('div');
      label.className = 'nd-gantt-month';
      label.textContent = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
      monthsRow.appendChild(label);
    }
    timelineContainer.appendChild(monthsRow);

    // 任务条容器
    const tasksContainer = document.createElement('div');
    tasksContainer.className = 'nd-gantt-tasks';

    const tasks = data.tasks || [];
    tasks.forEach((task, index) => {
      const taskRow = document.createElement('div');
      taskRow.className = 'nd-gantt-task-row';
      taskRow.style.setProperty('--task-index', index);

      // 任务名称
      const taskName = document.createElement('div');
      taskName.className = 'nd-gantt-task-name';
      taskName.textContent = task.name;

      // 任务时间轴
      const taskTimeline = document.createElement('div');
      taskTimeline.className = 'nd-gantt-task-timeline';

      // 计算任务条位置和宽度
      const taskStart = parseMonth(task.start);
      const offsetMonths = (taskStart.getFullYear() - startDate.getFullYear()) * 12
                          + (taskStart.getMonth() - startDate.getMonth());
      const widthPercent = (task.duration / totalMonths) * 100;
      const leftPercent = (offsetMonths / totalMonths) * 100;

      const taskBar = document.createElement('div');
      taskBar.className = 'nd-gantt-task-bar';
      taskBar.style.left = `${leftPercent}%`;
      taskBar.style.width = `${widthPercent}%`;

      // 进度填充
      if (task.progress !== undefined) {
        const progressFill = document.createElement('div');
        progressFill.className = 'nd-gantt-task-progress';
        progressFill.style.width = '0%';
        progressFill.setAttribute('data-progress', task.progress);
        taskBar.appendChild(progressFill);

        const progressLabel = document.createElement('span');
        progressLabel.className = 'nd-gantt-task-progress-label';
        progressLabel.textContent = `${task.progress}%`;
        taskBar.appendChild(progressLabel);
      }

      taskTimeline.appendChild(taskBar);

      taskRow.appendChild(taskName);
      taskRow.appendChild(taskTimeline);
      tasksContainer.appendChild(taskRow);
    });

    timelineContainer.appendChild(tasksContainer);
    wrapper.appendChild(timelineContainer);

    // 动画：进度条填充
    setTimeout(() => {
      wrapper.querySelectorAll('.nd-gantt-task-progress').forEach(fill => {
        fill.style.width = fill.getAttribute('data-progress') + '%';
      });
    }, 100);

    return wrapper;
  }, {
    description: '甘特图 - 项目时间线与任务进度可视化，适用于项目管理汇报',
    category: 'business-analysis',
    framework: 'Project Management',
    tags: ['gantt', 'project', 'timeline', 'progress', 'roadmap'],
    author: 'interactive-narrative-deck',
    version: '1.0.0',
    useCase: [
      '项目进度汇报',
      '产品路线图展示',
      '里程碑规划',
      '多项目并行展示'
    ]
  });

})();
