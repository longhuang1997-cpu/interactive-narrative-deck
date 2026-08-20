/**
 * Business Blocks - 专业商业分析Block套件
 *
 * 包含主流商业方法论的可视化Block：
 * - SWOT分析矩阵
 * - OKR目标管理
 * - Gantt甘特图
 * - Fishbone鱼骨图（根因分析）
 * - BCG矩阵（波士顿矩阵）
 * - Kanban看板
 * - Pyramid金字塔思维（MECE结构）
 *
 * @version 3.1.0
 * @author interactive-narrative-deck
 */

(function() {
  'use strict';

  // ============================================================================
  // 通用验证错误提示组件
  // ============================================================================

  function createValidationError(modelName, validation) {
    const wrapper = document.createElement('div');
    wrapper.className = 'nd-block nd-validation-error';

    const header = document.createElement('div');
    header.className = 'nd-validation-header';
    header.innerHTML = `
      <span class="nd-validation-icon">⚠️</span>
      <span class="nd-validation-title">${modelName}数据验证失败</span>
      <span class="nd-validation-quality">数据质量：${validation.quality || 0}/100</span>
    `;

    wrapper.appendChild(header);

    // 错误列表
    if (validation.errors && validation.errors.length > 0) {
      const errorsSection = document.createElement('div');
      errorsSection.className = 'nd-validation-section nd-validation-errors';

      const errorsTitle = document.createElement('div');
      errorsTitle.className = 'nd-validation-section-title';
      errorsTitle.textContent = '❌ 错误（必须修复）';
      errorsSection.appendChild(errorsTitle);

      const errorsList = document.createElement('ul');
      validation.errors.forEach(err => {
        const li = document.createElement('li');
        li.textContent = err;
        errorsList.appendChild(li);
      });
      errorsSection.appendChild(errorsList);
      wrapper.appendChild(errorsSection);
    }

    // 警告列表
    if (validation.warnings && validation.warnings.length > 0) {
      const warningsSection = document.createElement('div');
      warningsSection.className = 'nd-validation-section nd-validation-warnings';

      const warningsTitle = document.createElement('div');
      warningsTitle.className = 'nd-validation-section-title';
      warningsTitle.textContent = '⚠️ 警告（建议优化）';
      warningsSection.appendChild(warningsTitle);

      const warningsList = document.createElement('ul');
      validation.warnings.forEach(warn => {
        const li = document.createElement('li');
        li.textContent = warn;
        warningsList.appendChild(li);
      });
      warningsSection.appendChild(warningsList);
      wrapper.appendChild(warningsSection);
    }

    // 建议列表
    if (validation.suggestions && validation.suggestions.length > 0) {
      const suggestionsSection = document.createElement('div');
      suggestionsSection.className = 'nd-validation-section nd-validation-suggestions';

      const suggestionsTitle = document.createElement('div');
      suggestionsTitle.className = 'nd-validation-section-title';
      suggestionsTitle.textContent = '💡 专业建议';
      suggestionsSection.appendChild(suggestionsTitle);

      const suggestionsList = document.createElement('ul');
      validation.suggestions.forEach(sugg => {
        const li = document.createElement('li');
        li.textContent = sugg;
        suggestionsList.appendChild(li);
      });
      suggestionsSection.appendChild(suggestionsList);
      wrapper.appendChild(suggestionsSection);
    }

    return wrapper;
  }

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
    // ========== 数据验证 ==========
    if (window.ModelValidator) {
      const validation = window.ModelValidator.swot(data);

      if (!validation.valid) {
        return createValidationError('SWOT分析', validation);
      }

      // 即使通过验证，也显示警告和建议
      if (validation.warnings.length > 0 || validation.suggestions.length > 0) {
        console.warn('[SWOT验证]', validation);
      }
    }

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

  // ============================================================================
  // 鱼骨图（Fishbone / Ishikawa Diagram）
  // ============================================================================

  /**
   * 鱼骨图Block
   *
   * 用途：问题根因分析、质量管理、故障排查
   * 结构：中心问题 + 6大类原因（人/机/料/法/环/测）
   *
   * @param {Object} data - 鱼骨图数据
   * @param {string} data.problem - 核心问题（鱼头）
   * @param {Object} data.causes - 原因分类
   * @param {Array<string>} [data.causes.people] - 人员因素
   * @param {Array<string>} [data.causes.machine] - 设备/技术因素
   * @param {Array<string>} [data.causes.material] - 材料/资源因素
   * @param {Array<string>} [data.causes.method] - 方法/流程因素
   * @param {Array<string>} [data.causes.environment] - 环境因素
   * @param {Array<string>} [data.causes.measurement] - 测量/监控因素
   * @param {string} [data.title] - 可选标题
   *
   * @example
   * {
   *   type: 'fishbone',
   *   title: '客户投诉率偏高根因分析',
   *   problem: '客户投诉率达8%',
   *   causes: {
   *     people: ['客服培训不足', '响应速度慢'],
   *     machine: ['系统频繁宕机', '工单派发延迟'],
   *     material: ['产品质量不稳定'],
   *     method: ['流程不规范', '无SOP'],
   *     environment: ['高峰期压力大'],
   *     measurement: ['投诉数据统计不准']
   *   }
   * }
   */
  BlockRegistry.register('fishbone', function(data) {
    // ========== 数据验证 ==========
    if (window.ModelValidator) {
      const validation = window.ModelValidator.fishbone(data);

      if (!validation.valid) {
        return createValidationError('Fishbone鱼骨图', validation);
      }

      if (validation.warnings.length > 0 || validation.suggestions.length > 0) {
        console.warn('[Fishbone验证]', validation);
      }
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'nd-block nd-fishbone-wrapper';

    if (data.title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'nd-fishbone-title';
      titleEl.textContent = data.title;
      wrapper.appendChild(titleEl);
    }

    // SVG鱼骨图 - 重构版：更精确的Ishikawa结构 + 分层鱼刺
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1200 650');
    svg.setAttribute('class', 'nd-fishbone-svg');

    const blue = '#0ea5e9';
    const gold = '#f59e0b';
    const sub = '#9fb0ca';
    const dim = '#64748b';

    // 定义渐变和阴影
    const defs = `
      <defs>
        <linearGradient id="fishbone-spine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${blue};stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:${gold};stop-opacity:0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    `;

    // 主干线（脊柱，带渐变）
    const mainLine = `<line x1="80" y1="325" x2="950" y2="325" stroke="url(#fishbone-spine)" stroke-width="4" filter="url(#glow)"/>`;

    // 鱼头（右侧箭头，增强视觉）
    const problemText = data.problem || '【待填入问题】';
    const fishHead = `
      <path d="M 950 325 L 1010 310 L 1050 325 L 1010 340 Z" fill="${gold}" opacity="0.9" filter="url(#glow)"/>
      <text x="1070" y="315" font-size="13" fill="${dim}" font-weight="500">Problem</text>
      <text x="1070" y="338" font-size="15" fill="#f8fafc" font-weight="700">${problemText.length > 20 ? problemText.substring(0,18) + '...' : problemText}</text>
    `;

    // 6M分支 - 重新计算间距，确保均匀分布
    const categories = [
      { key: 'people', label: '人员', labelEn: 'People', x: 200, side: 'top' },
      { key: 'machine', label: '设备', labelEn: 'Machine', x: 400, side: 'top' },
      { key: 'material', label: '材料', labelEn: 'Material', x: 600, side: 'top' },
      { key: 'method', label: '方法', labelEn: 'Method', x: 800, side: 'top' },
      { key: 'environment', label: '环境', labelEn: 'Environment', x: 200, side: 'bottom' },
      { key: 'measurement', label: '测量', labelEn: 'Measurement', x: 400, side: 'bottom' }
    ];

    let bones = '';
    let labels = '';
    let causes = '';

    categories.forEach((cat, catIndex) => {
      const items = (data.causes && data.causes[cat.key]) || [];
      const isTop = cat.side === 'top';
      const spineY = 325;
      const mainBoneLength = 140;
      const endY = isTop ? spineY - mainBoneLength : spineY + mainBoneLength;

      // 主刺（从脊柱斜向上/下，45度角）
      bones += `<line x1="${cat.x}" y1="${spineY}" x2="${cat.x + 100}" y2="${endY}"
                     stroke="${blue}" stroke-width="3" opacity="0.6"
                     stroke-linecap="round"
                     style="animation: fadeIn 0.5s ${catIndex * 0.1}s both"/>`;

      // 分类标签（中英文双行）
      const labelX = cat.x + 110;
      const labelY = isTop ? endY - 20 : endY + 30;
      labels += `
        <text x="${labelX}" y="${labelY}" font-size="12" fill="${dim}" font-weight="500" text-anchor="start">${cat.labelEn}</text>
        <text x="${labelX}" y="${labelY + 16}" font-size="14" fill="${gold}" font-weight="700" text-anchor="start">${cat.label}</text>
      `;

      // 子刺（具体原因，垂直于主刺）
      items.slice(0, 4).forEach((item, idx) => {
        const progress = (idx + 1) / 5; // 沿主刺均匀分布
        const boneX = cat.x + progress * 100;
        const boneY = isTop ? spineY - progress * mainBoneLength : spineY + progress * mainBoneLength;

        const subBoneLength = 60 - idx * 8; // 越靠近鱼头越短
        const subEndX = boneX + (isTop ? -subBoneLength : -subBoneLength);
        const subEndY = boneY + (isTop ? -25 : 25);

        // 子刺线
        causes += `<line x1="${boneX}" y1="${boneY}" x2="${subEndX}" y2="${subEndY}"
                        stroke="${sub}" stroke-width="2" opacity="0.5"
                        stroke-linecap="round"
                        style="animation: fadeIn 0.4s ${catIndex * 0.1 + idx * 0.05 + 0.2}s both"/>`;

        // 原因文本（自动换行处理）
        const textX = subEndX - 8;
        const textY = subEndY + (isTop ? -8 : 12);
        const truncated = item.length > 10 ? item.substring(0, 9) + '...' : item;
        causes += `<text x="${textX}" y="${textY}" font-size="11" fill="${sub}"
                        text-anchor="end" font-weight="500"
                        style="animation: fadeIn 0.4s ${catIndex * 0.1 + idx * 0.05 + 0.3}s both">${truncated}</text>`;
      });

      // 如果有超过4个原因，显示省略提示
      if (items.length > 4) {
        const moreX = cat.x + 100;
        const moreY = isTop ? endY - 8 : endY + 18;
        labels += `<text x="${moreX}" y="${moreY}" font-size="10" fill="${dim}" opacity="0.6">+${items.length - 4} more</text>`;
      }
    });

    svg.innerHTML = defs + mainLine + bones + labels + causes + fishHead;
    wrapper.appendChild(svg);

    return wrapper;
  }, {
    description: '鱼骨图（Ishikawa）- 6M根因分析工具，适用于问题排查和质量管理',
    category: 'business-analysis',
    framework: 'Root Cause Analysis',
    tags: ['fishbone', 'ishikawa', 'root-cause', 'quality', '6M'],
    author: 'interactive-narrative-deck',
    version: '1.0.0',
    useCase: [
      '质量问题根因分析',
      '故障排查复盘',
      '流程优化诊断',
      '客诉问题分析'
    ]
  });

  // ============================================================================
  // BCG矩阵（波士顿矩阵）
  // ============================================================================

  /**
   * BCG矩阵Block
   *
   * 用途：业务组合分析、产品portfolio管理、投资决策
   * 结构：2x2矩阵（明星/金牛/问题/瘦狗）
   *
   * @param {Object} data - BCG矩阵数据
   * @param {Array<Object>} data.items - 业务/产品列表
   * @param {string} data.items[].name - 业务名称
   * @param {number} data.items[].marketGrowth - 市场增长率（0-100）
   * @param {number} data.items[].marketShare - 相对市场份额（0-100）
   * @param {number} [data.items[].size] - 气泡大小（营收规模，可选）
   * @param {string} [data.title] - 可选标题
   *
   * @example
   * {
   *   type: 'bcg',
   *   title: '2026业务组合分析',
   *   items: [
   *     {name: '智慧卫生间', marketGrowth: 80, marketShare: 30, size: 50},
   *     {name: '安全管家', marketGrowth: 60, marketShare: 70, size: 120},
   *     {name: '能源管控', marketGrowth: 20, marketShare: 60, size: 200},
   *     {name: '传统物业', marketGrowth: 10, marketShare: 20, size: 80}
   *   ]
   * }
   */
  BlockRegistry.register('bcg', function(data) {
    // ========== 数据验证 ==========
    if (window.ModelValidator) {
      const validation = window.ModelValidator.bcg(data);

      if (!validation.valid) {
        return createValidationError('BCG矩阵', validation);
      }

      if (validation.warnings.length > 0 || validation.suggestions.length > 0) {
        console.warn('[BCG验证]', validation);
      }
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'nd-block nd-bcg-wrapper';

    if (data.title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'nd-bcg-title';
      titleEl.textContent = data.title;
      wrapper.appendChild(titleEl);
    }

    // SVG散点图 - 重构版：Canvas级别的坐标系 + 交互增强
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 800 650');
    svg.setAttribute('class', 'nd-bcg-svg');

    const margin = {left: 100, right: 60, top: 60, bottom: 100};
    const width = 800 - margin.left - margin.right;
    const height = 650 - margin.top - margin.bottom;

    // 定义渐变和滤镜
    const defs = `
      <defs>
        <linearGradient id="bcg-star" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.9" />
        </linearGradient>
        <linearGradient id="bcg-cash" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#34d399;stop-opacity:0.9" />
        </linearGradient>
        <filter id="bubble-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.3"/>
        </filter>
        <filter id="glow-text">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
        </filter>
      </defs>
    `;

    // 4象限背景色 + 精细网格
    let chartSVG = `
      <!-- 4象限背景渐变 -->
      <rect x="${margin.left}" y="${margin.top}" width="${width/2}" height="${height/2}" fill="rgba(245,158,11,0.06)" rx="4"/>
      <rect x="${margin.left + width/2}" y="${margin.top}" width="${width/2}" height="${height/2}" fill="rgba(59,130,246,0.10)" rx="4"/>
      <rect x="${margin.left}" y="${margin.top + height/2}" width="${width/2}" height="${height/2}" fill="rgba(107,114,128,0.06)" rx="4"/>
      <rect x="${margin.left + width/2}" y="${margin.top + height/2}" width="${width/2}" height="${height/2}" fill="rgba(16,185,129,0.08)" rx="4"/>

      <!-- 参考网格线 -->
      ${[0.25, 0.75].map(ratio => `
        <line x1="${margin.left}" y1="${margin.top + height * ratio}" x2="${margin.left + width}" y2="${margin.top + height * ratio}"
              stroke="#64748b" stroke-width="0.5" opacity="0.2" stroke-dasharray="4,4"/>
        <line x1="${margin.left + width * ratio}" y1="${margin.top}" x2="${margin.left + width * ratio}" y2="${margin.top + height}"
              stroke="#64748b" stroke-width="0.5" opacity="0.2" stroke-dasharray="4,4"/>
      `).join('')}

      <!-- 坐标轴（加粗箭头） -->
      <defs>
        <marker id="arrow-x" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="#9fb0ca" />
        </marker>
        <marker id="arrow-y" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <path d="M0,0 L0,6 L9,3 z" fill="#9fb0ca" />
        </marker>
      </defs>
      <line x1="${margin.left}" y1="${margin.top + height}" x2="${margin.left + width + 10}" y2="${margin.top + height}"
            stroke="#9fb0ca" stroke-width="2.5" marker-end="url(#arrow-x)"/>
      <line x1="${margin.left}" y1="${margin.top + height}" x2="${margin.left}" y2="${margin.top - 10}"
            stroke="#9fb0ca" stroke-width="2.5" marker-end="url(#arrow-y)"/>

      <!-- 关键分界线（高亮） -->
      <line x1="${margin.left}" y1="${margin.top + height/2}" x2="${margin.left + width}" y2="${margin.top + height/2}"
            stroke="#0ea5e9" stroke-width="2" stroke-dasharray="10,5" opacity="0.6"/>
      <line x1="${margin.left + width/2}" y1="${margin.top}" x2="${margin.left + width/2}" y2="${margin.top + height}"
            stroke="#0ea5e9" stroke-width="2" stroke-dasharray="10,5" opacity="0.6"/>

      <!-- Y轴刻度标签（市场增长率） -->
      <text x="${margin.left - 15}" y="${margin.top + 15}" font-size="11" fill="#94a3b8" text-anchor="end">100%</text>
      <text x="${margin.left - 15}" y="${margin.top + height/2 + 5}" font-size="13" fill="#f59e0b" text-anchor="end" font-weight="700">10%</text>
      <text x="${margin.left - 15}" y="${margin.top + height}" font-size="11" fill="#94a3b8" text-anchor="end">0%</text>
      <text x="${margin.left - 65}" y="${margin.top + height/2 + 5}" font-size="14" fill="#cbd5e1" text-anchor="middle" font-weight="600"
            transform="rotate(-90 ${margin.left - 65} ${margin.top + height/2})">市场增长率 (%)</text>

      <!-- X轴刻度标签（相对市场份额） -->
      <text x="${margin.left}" y="${margin.top + height + 30}" font-size="11" fill="#94a3b8" text-anchor="middle">0</text>
      <text x="${margin.left + width/2}" y="${margin.top + height + 30}" font-size="13" fill="#f59e0b" text-anchor="middle" font-weight="700">1.0x</text>
      <text x="${margin.left + width}" y="${margin.top + height + 30}" font-size="11" fill="#94a3b8" text-anchor="middle">2.0x</text>
      <text x="${margin.left + width/2}" y="${margin.top + height + 60}" font-size="14" fill="#cbd5e1" text-anchor="middle" font-weight="600">相对市场份额 (vs 竞品)</text>

      <!-- 象限标签（带emoji + 战略建议） -->
      <g opacity="0.9">
        <text x="${margin.left + width/4}" y="${margin.top + 30}" font-size="15" fill="#f59e0b" text-anchor="middle" font-weight="700">❓ 问题</text>
        <text x="${margin.left + width/4}" y="${margin.top + 48}" font-size="10" fill="#94a3b8" text-anchor="middle">高投入·低回报</text>

        <text x="${margin.left + width*3/4}" y="${margin.top + 30}" font-size="15" fill="#3b82f6" text-anchor="middle" font-weight="700">⭐ 明星</text>
        <text x="${margin.left + width*3/4}" y="${margin.top + 48}" font-size="10" fill="#94a3b8" text-anchor="middle">高投入·高回报</text>

        <text x="${margin.left + width/4}" y="${margin.top + height - 25}" font-size="15" fill="#6b7280" text-anchor="middle" font-weight="700">🐕 瘦狗</text>
        <text x="${margin.left + width/4}" y="${margin.top + height - 8}" font-size="10" fill="#94a3b8" text-anchor="middle">低投入·低回报</text>

        <text x="${margin.left + width*3/4}" y="${margin.top + height - 25}" font-size="15" fill="#10b981" text-anchor="middle" font-weight="700">🐄 金牛</text>
        <text x="${margin.left + width*3/4}" y="${margin.top + height - 8}" font-size="10" fill="#94a3b8" text-anchor="middle">低投入·高回报</text>
      </g>
    `;

    // 气泡数据 - 增强视觉层次
    const items = data.items || [];
    items.forEach((item, i) => {
      const growth = Math.max(0, Math.min(100, item.marketGrowth || 10));
      const share = Math.max(0, Math.min(200, item.marketShare || 50)); // 支持>100%份额
      const size = item.size || 50;

      // 映射坐标
      const x = margin.left + (share / 100) * (width / 2);
      const y = margin.top + height - (growth / 100) * height;
      const r = Math.sqrt(size / 100) * 35 + 18;

      // 颜色判断 + 渐变填充
      let fillColor = '#6b7280';
      let fillGradient = null;
      if (share >= 50 && growth >= 10) {
        fillGradient = 'url(#bcg-star)';
      } else if (share >= 50 && growth < 10) {
        fillGradient = 'url(#bcg-cash)';
      } else if (share < 50 && growth >= 10) {
        fillColor = '#f59e0b';
      } else {
        fillColor = '#6b7280';
      }

      const finalFill = fillGradient || fillColor;

      chartSVG += `
        <g class="bcg-bubble" style="cursor: pointer; animation: fadeIn 0.5s ${i*0.12}s both;">
          <!-- 气泡主体 -->
          <circle cx="${x}" cy="${y}" r="${r}" fill="${finalFill}" opacity="0.85"
                  stroke="#f8fafc" stroke-width="2.5" filter="url(#bubble-shadow)">
            <animate attributeName="r" from="0" to="${r}" dur="0.7s" begin="${i*0.12}s" fill="freeze"/>
          </circle>

          <!-- 业务名称 -->
          <text x="${x}" y="${y + 4}" font-size="${r > 30 ? 12 : 10}" fill="#fff" text-anchor="middle" font-weight="700"
                style="pointer-events: none;">${item.name}</text>

          <!-- 规模标注（气泡外） -->
          <text x="${x}" y="${y + r + 16}" font-size="9" fill="#64748b" text-anchor="middle" font-weight="500"
                style="pointer-events: none;">￥${size}M</text>
        </g>
      `;
    });

    svg.innerHTML = defs + chartSVG;
    wrapper.appendChild(svg);

    // 简洁图例
    const legend = document.createElement('div');
    legend.className = 'nd-bcg-legend';
    legend.innerHTML = `
      <span><b style="color:#3b82f6">⭐明星</b> 高增长+高份额</span>
      <span><b style="color:#10b981">🐄金牛</b> 低增长+高份额</span>
      <span><b style="color:#f59e0b">❓问题</b> 高增长+低份额</span>
      <span><b style="color:#6b7280">🐕瘦狗</b> 低增长+低份额</span>
    `;
    wrapper.appendChild(legend);

    return wrapper;
  }, {
    description: 'BCG矩阵（波士顿矩阵）- 业务组合分析，2x2矩阵+气泡图展示',
    category: 'business-analysis',
    framework: 'Portfolio Management',
    tags: ['bcg', 'portfolio', 'strategy', 'business', 'matrix'],
    author: 'interactive-narrative-deck',
    version: '1.0.0',
    useCase: [
      '业务组合战略分析',
      '产品portfolio评估',
      '投资决策优化',
      '资源分配规划'
    ]
  });

  // ============================================================================
  // 看板（Kanban Board）
  // ============================================================================

  /**
   * 看板Block
   *
   * 用途：任务流程管理、敏捷开发、工作流可视化
   * 结构：多列泳道（Backlog / In Progress / Done）
   *
   * @param {Object} data - 看板数据
   * @param {Array<Object>} data.columns - 列定义
   * @param {string} data.columns[].title - 列标题
   * @param {string} [data.columns[].color] - 列主题色
   * @param {Array<Object>} data.columns[].cards - 卡片列表
   * @param {string} data.columns[].cards[].title - 卡片标题
   * @param {string} [data.columns[].cards[].tag] - 标签（优先级/分类）
   * @param {string} [data.columns[].cards[].assignee] - 负责人
   * @param {string} [data.title] - 可选标题
   *
   * @example
   * {
   *   type: 'kanban',
   *   title: '开发看板（本周Sprint）',
   *   columns: [
   *     {
   *       title: '待开发',
   *       color: '#6b7280',
   *       cards: [
   *         {title: '功能A开发', tag: 'P1', assignee: '张三'},
   *         {title: '报表导出', tag: 'P2', assignee: '李四'}
   *       ]
   *     },
   *     {
   *       title: '开发中',
   *       color: '#3b82f6',
   *       cards: [
   *         {title: '数据接入', tag: 'P0', assignee: '王五'}
   *       ]
   *     },
   *     {
   *       title: '已完成',
   *       color: '#10b981',
   *       cards: [
   *         {title: '决策引擎', tag: 'P0', assignee: '赵六'}
   *       ]
   *     }
   *   ]
   * }
   */
  BlockRegistry.register('kanban', function(data) {
    // ========== 数据验证 ==========
    if (window.ModelValidator) {
      const validation = window.ModelValidator.kanban(data);

      if (!validation.valid) {
        return createValidationError('Kanban看板', validation);
      }

      if (validation.warnings.length > 0 || validation.suggestions.length > 0) {
        console.warn('[Kanban验证]', validation);
      }
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'nd-block nd-kanban-wrapper';

    if (data.title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'nd-kanban-title';
      titleEl.textContent = data.title;
      wrapper.appendChild(titleEl);
    }

    // 看板容器 - 增强版：WIP限制提示 + 卡片拖拽提示 + 交互反馈
    const board = document.createElement('div');
    board.className = 'nd-kanban-board';

    const columns = data.columns || [];
    columns.forEach((col, colIndex) => {
      const column = document.createElement('div');
      column.className = 'nd-kanban-column';
      column.style.setProperty('--col-color', col.color || '#6b7280');
      column.style.setProperty('--col-index', colIndex);

      // 列头 - 增强版：带任务数、WIP限制、进度百分比
      const cardCount = (col.cards || []).length;
      const wipLimit = col.wipLimit || null;
      const isOverWIP = wipLimit && cardCount > wipLimit;

      const header = document.createElement('div');
      header.className = 'nd-kanban-column-header';

      const titleDiv = document.createElement('div');
      titleDiv.className = 'nd-kanban-column-title';
      titleDiv.textContent = col.title;

      const countDiv = document.createElement('div');
      countDiv.className = 'nd-kanban-column-count';
      countDiv.style.color = isOverWIP ? '#ef4444' : 'inherit';
      countDiv.innerHTML = `
        <span style="font-size: 1.2em; font-weight: 700;">${cardCount}</span>
        ${wipLimit ? `<span style="opacity: 0.6; font-size: 0.9em;">/${wipLimit}</span>` : ''}
      `;

      if (isOverWIP) {
        countDiv.innerHTML += ` <span style="font-size: 0.8em; color: #ef4444;">⚠️ WIP超限</span>`;
      }

      header.appendChild(titleDiv);
      header.appendChild(countDiv);

      // 卡片列表 - 增强版：更丰富的信息展示
      const cardsList = document.createElement('div');
      cardsList.className = 'nd-kanban-cards';

      const cards = col.cards || [];
      if (cards.length === 0) {
        const emptyHint = document.createElement('div');
        emptyHint.className = 'nd-kanban-empty';
        emptyHint.innerHTML = `
          <div style="font-size: 2em; opacity: 0.3; margin-bottom: 0.5rem;">📭</div>
          <div style="opacity: 0.5;">暂无任务</div>
        `;
        cardsList.appendChild(emptyHint);
      } else {
        cards.forEach((card, cardIndex) => {
          const cardEl = document.createElement('div');
          cardEl.className = 'nd-kanban-card';
          cardEl.style.animationDelay = `${(colIndex * 0.1) + (cardIndex * 0.08)}s`;

          // 卡片头部：标题 + 标签
          const cardHeader = document.createElement('div');
          cardHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;';

          const cardTitle = document.createElement('div');
          cardTitle.className = 'nd-kanban-card-title';
          cardTitle.textContent = card.title;
          cardTitle.style.flex = '1';

          cardHeader.appendChild(cardTitle);

          // 优先级标签
          if (card.tag) {
            const tag = document.createElement('span');
            tag.className = 'nd-kanban-card-tag';
            tag.style.cssText = 'padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-left: 0.5rem;';

            if (card.tag.includes('P0') || card.tag.includes('高') || card.tag.includes('High')) {
              tag.style.background = '#ef4444';
              tag.style.color = '#fff';
            } else if (card.tag.includes('P1') || card.tag.includes('中') || card.tag.includes('Medium')) {
              tag.style.background = '#f59e0b';
              tag.style.color = '#fff';
            } else {
              tag.style.background = '#6b7280';
              tag.style.color = '#fff';
            }
            tag.textContent = card.tag;
            cardHeader.appendChild(tag);
          }

          cardEl.appendChild(cardHeader);

          // 卡片描述（可选）
          if (card.description) {
            const desc = document.createElement('div');
            desc.style.cssText = 'font-size: 0.85rem; color: #94a3b8; margin-bottom: 0.75rem; line-height: 1.4;';
            desc.textContent = card.description.length > 60 ? card.description.substring(0, 57) + '...' : card.description;
            cardEl.appendChild(desc);
          }

          // 卡片底部：负责人 + 截止日期 + 进度
          const cardFooter = document.createElement('div');
          cardFooter.className = 'nd-kanban-card-footer';
          cardFooter.style.cssText = 'display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; flex-wrap: wrap;';

          // 负责人
          if (card.assignee) {
            const assigneeDiv = document.createElement('div');
            assigneeDiv.className = 'nd-kanban-card-assignee';
            assigneeDiv.style.cssText = 'display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem;';

            const initial = card.assignee.charAt(0);
            const avatar = document.createElement('span');
            avatar.className = 'nd-kanban-avatar';
            avatar.style.cssText = `
              display: inline-flex; align-items: center; justify-content: center;
              width: 24px; height: 24px; border-radius: 50%;
              background: linear-gradient(135deg, ${col.color || '#6b7280'}, #0ea5e9);
              color: #fff; font-weight: 700; font-size: 0.75rem;
            `;
            avatar.textContent = initial;

            const name = document.createElement('span');
            name.style.color = '#cbd5e1';
            name.textContent = card.assignee;

            assigneeDiv.appendChild(avatar);
            assigneeDiv.appendChild(name);
            cardFooter.appendChild(assigneeDiv);
          }

          // 截止日期（可选）
          if (card.dueDate) {
            const dueDateDiv = document.createElement('div');
            dueDateDiv.style.cssText = 'font-size: 0.8rem; color: #94a3b8; display: flex; align-items: center; gap: 0.25rem;';
            dueDateDiv.innerHTML = `📅 ${card.dueDate}`;
            cardFooter.appendChild(dueDateDiv);
          }

          // 子任务进度（可选）
          if (card.subtasks) {
            const completed = card.subtasks.completed || 0;
            const total = card.subtasks.total || 0;
            const progressDiv = document.createElement('div');
            progressDiv.style.cssText = 'font-size: 0.8rem; color: #94a3b8; display: flex; align-items: center; gap: 0.25rem;';
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            progressDiv.innerHTML = `✓ ${completed}/${total} <span style="color: ${percent === 100 ? '#10b981' : '#f59e0b'}">(${percent}%)</span>`;
            cardFooter.appendChild(progressDiv);
          }

          if (card.assignee || card.dueDate || card.subtasks) {
            cardEl.appendChild(cardFooter);
          }

          cardsList.appendChild(cardEl);
        });
      }

      column.appendChild(header);
      column.appendChild(cardsList);
      board.appendChild(column);
    });

    wrapper.appendChild(board);

    return wrapper;
  }, {
    description: '看板（Kanban）- 任务流程可视化，多列泳道+增强卡片展示（支持WIP限制、优先级、负责人、进度）',
    category: 'business-analysis',
    framework: 'Agile/Lean',
    tags: ['kanban', 'agile', 'workflow', 'task', 'project', 'wip'],
    author: 'interactive-narrative-deck',
    version: '2.0.0',
    useCase: [
      '敏捷开发进度展示',
      '工作流管理',
      '任务分配追踪',
      '项目状态汇报',
      'WIP限制监控'
    ]
  });

  // ============================================================================
  // 金字塔思维模型（Pyramid Principle / MECE结构）
  // ============================================================================

  /**
   * 金字塔思维Block
   *
   * 用途：结构化思维、论证逻辑、战略分析
   * 结构：顶层结论 → 关键论据 → 支撑事实（MECE原则）
   *
   * @param {Object} data - 金字塔数据
   * @param {string} data.conclusion - 核心结论（塔尖）
   * @param {Array<Object>} data.pillars - 关键支撑论据
   * @param {string} data.pillars[].title - 论据标题
   * @param {Array<string>} data.pillars[].facts - 支撑事实列表
   * @param {string} [data.title] - 可选标题
   *
   * @example
   * {
   *   type: 'pyramid',
   *   title: '战略论证金字塔',
   *   conclusion: '方案A是最佳选择',
   *   pillars: [
   *     {
   *       title: '市场验证',
   *       facts: ['客户已签约', '试点已部署', '需求真实可测']
   *     },
   *     {
   *       title: '技术可行',
   *       facts: ['方案可落地', '1个月可交付', '成本可控']
   *     },
   *     {
   *       title: '复用路径清晰',
   *       facts: ['流程可标准化', '易复制推广', '可延伸至其他场景']
   *     }
   *   ]
   * }
   */
  BlockRegistry.register('pyramid', function(data) {
    // ========== 数据验证 ==========
    if (window.ModelValidator) {
      const validation = window.ModelValidator.pyramid(data);

      if (!validation.valid) {
        return createValidationError('Pyramid金字塔思维', validation);
      }

      if (validation.warnings.length > 0 || validation.suggestions.length > 0) {
        console.warn('[Pyramid验证]', validation);
      }
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'nd-block nd-pyramid-wrapper';

    if (data.title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'nd-pyramid-title';
      titleEl.textContent = data.title;
      wrapper.appendChild(titleEl);
    }

    // 金字塔容器
    const pyramid = document.createElement('div');
    pyramid.className = 'nd-pyramid';

    // 塔尖（核心结论）
    const apex = document.createElement('div');
    apex.className = 'nd-pyramid-apex';
    apex.innerHTML = `
      <div class="nd-pyramid-apex-icon">🎯</div>
      <div class="nd-pyramid-apex-text">${data.conclusion || '核心结论'}</div>
    `;
    pyramid.appendChild(apex);

    // SVG连接线 - 重构版：贝塞尔曲线优化 + 渐变效果 + 自适应布局
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'nd-pyramid-lines');
    svg.setAttribute('viewBox', '0 0 1000 120');
    svg.setAttribute('style', 'position: absolute; top: 50px; left: 0; width: 100%; height: 120px; z-index: 0; pointer-events: none;');

    const pillars = data.pillars || [];
    const pillarCount = pillars.length;
    const spacing = 900 / (pillarCount + 1);

    // 定义渐变
    const defs = `
      <defs>
        <linearGradient id="pyramid-line" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.7" />
          <stop offset="100%" style="stop-color:#0ea5e9;stop-opacity:0.5" />
        </linearGradient>
        <filter id="line-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    `;

    let lines = '';
    for (let i = 0; i < pillarCount; i++) {
      const x = 50 + spacing * (i + 1);

      // 使用贝塞尔曲线（二次曲线）连接塔尖和支柱
      // 控制点：中点偏下，形成优雅的弧线
      const midX = (500 + x) / 2;
      const controlY = 35 + Math.abs(i - (pillarCount - 1) / 2) * 8; // 中间支柱控制点更高，两侧更低

      lines += `
        <path d="M 500 15 Q ${midX} ${controlY} ${x} 100"
              fill="none"
              stroke="url(#pyramid-line)"
              stroke-width="2.5"
              opacity="0.7"
              stroke-linecap="round"
              filter="url(#line-glow)"
              style="animation: fadeIn 0.6s ${i * 0.15}s both;">
          <animate attributeName="opacity" from="0" to="0.7" dur="0.6s" begin="${i * 0.15}s" fill="freeze"/>
        </path>
      `;
    }

    svg.innerHTML = defs + lines;
    pyramid.appendChild(svg);

    // 支撑论据层
    const pillarsContainer = document.createElement('div');
    pillarsContainer.className = 'nd-pyramid-pillars';

    pillars.forEach((pillar, index) => {
      const pillarEl = document.createElement('div');
      pillarEl.className = 'nd-pyramid-pillar';
      pillarEl.style.animationDelay = `${index * 0.15}s`;

      // 论据标题
      const pillarHeader = document.createElement('div');
      pillarHeader.className = 'nd-pyramid-pillar-header';
      pillarHeader.innerHTML = `
        <span class="nd-pyramid-pillar-num">${index + 1}</span>
        <span class="nd-pyramid-pillar-title">${pillar.title}</span>
      `;

      // 支撑事实列表
      const factsList = document.createElement('ul');
      factsList.className = 'nd-pyramid-facts';

      (pillar.facts || []).forEach((fact, factIndex) => {
        const li = document.createElement('li');
        li.className = 'nd-pyramid-fact';
        li.style.animationDelay = `${index * 0.15 + factIndex * 0.08 + 0.3}s`;
        li.textContent = fact;
        factsList.appendChild(li);
      });

      pillarEl.appendChild(pillarHeader);
      pillarEl.appendChild(factsList);
      pillarsContainer.appendChild(pillarEl);
    });

    pyramid.appendChild(pillarsContainer);
    wrapper.appendChild(pyramid);

    return wrapper;
  }, {
    description: '金字塔思维（Pyramid Principle）- MECE结构化论证，顶层结论→关键论据→支撑事实',
    category: 'business-analysis',
    framework: 'Structured Thinking',
    tags: ['pyramid', 'mece', 'logic', 'mckinsey', 'structured-thinking'],
    author: 'interactive-narrative-deck',
    version: '1.0.0',
    useCase: [
      '战略分析论证',
      '方案选择说明',
      '问题拆解分析',
      '咨询报告结构'
    ]
  });

})();
