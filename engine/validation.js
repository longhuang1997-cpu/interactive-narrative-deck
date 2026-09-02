/**
 * Interactive Narrative Deck - Quality Gate & Validation Engine
 * v3.0.0 - 质量门控：商业模型校验 + 数据完整性检查 + 反模式检测
 */

const ValidationEngine = {
  /**
   * 主入口：校验整个deck数据结构
   * @param {Object} deckData - deck.js的完整数据对象
   * @returns {Object} { valid: boolean, errors: [], warnings: [] }
   */
  validate(deckData) {
    const result = {
      valid: true,
      errors: [],
      warnings: []
    };

    if (!deckData || !deckData.slides || !Array.isArray(deckData.slides)) {
      result.valid = false;
      result.errors.push('数据结构错误：缺少slides数组');
      return result;
    }

    // 遍历所有页面，逐个校验
    deckData.slides.forEach((slide, index) => {
      const pageNum = index + 1;

      // 检查Block数量（反模式4）
      const blockCount = this._countBlocks(slide);
      if (blockCount > 3) {
        result.warnings.push(`P${pageNum}: 包含${blockCount}个Block，建议拆分（单页≤3个）`);
      }

      // 检查每个Block的数据完整性
      if (slide.blocks && Array.isArray(slide.blocks)) {
        slide.blocks.forEach((block, bIndex) => {
          const blockValidation = this._validateBlock(block, pageNum, bIndex);
          result.errors.push(...blockValidation.errors);
          result.warnings.push(...blockValidation.warnings);

          if (blockValidation.errors.length > 0) {
            result.valid = false;
          }
        });
      }
    });

    // 全局检查
    this._checkGlobalPatterns(deckData, result);

    // 跨结构引用完整性检查（防"点了没反应"类静默失效）
    this._checkReferentialIntegrity(deckData, result);

    return result;
  },

  /**
   * 引用完整性检查
   *
   * 背景：slides 数组是 progress 圆点、O 键总览、frag 序列三者的同一份数据源。
   * 单 Block 字段校验发现不了"导航目标不存在"这类跨结构错位——
   * 表现是点击无反应/跳空，而不是报错，所以必须单独查。
   */
  _checkReferentialIntegrity(deckData, result) {
    const slides = deckData.slides;

    // 1. 每一页都要能在 progress 条上被指到：需要可用的标题
    slides.forEach((slide, i) => {
      const pageNum = i + 1;

      if (!slide.blocks || !Array.isArray(slide.blocks) || slide.blocks.length === 0) {
        result.valid = false;
        result.errors.push(`P${pageNum}: blocks为空——progress圆点会指向空白页`);
      }

      if (!slide.title) {
        result.warnings.push(`P${pageNum}: 缺少title——progress圆点悬停无提示，O键总览难定位`);
      }

      // 2. layout 必须是引擎认得的值，否则 CSS 类名落空、布局静默失效
      const LAYOUTS = ['center', 'left', 'grid', 'scroll'];
      if (slide.layout && !LAYOUTS.indexOf) {
        // 保护性分支，正常不会走到
      }
      if (slide.layout && LAYOUTS.indexOf(slide.layout) === -1) {
        result.valid = false;
        result.errors.push(
          `P${pageNum}: layout="${slide.layout}" 不是合法值（${LAYOUTS.join('/')}）——` +
          `会生成不存在的CSS类 .nd-layout-${slide.layout}，布局静默失效`
        );
      }

      // 3. block.type 必须有对应渲染器，否则 BlockRegistry.render 返回 null，该块无声消失
      (slide.blocks || []).forEach((block, bi) => {
        if (!block || !block.type) return; // 已由 _validateBlock 报过
        if (typeof BlockRegistry !== 'undefined' && BlockRegistry.blocks &&
            !BlockRegistry.blocks.has(block.type)) {
          result.valid = false;
          result.errors.push(
            `P${pageNum}-Block${bi + 1}: type="${block.type}" 无已注册渲染器——` +
            `该块会被静默跳过（不报错、页面上直接没有）`
          );
        }
      });

      // 4. tabs：每个标签都要有对应内容，否则点了切不出东西
      (slide.blocks || []).forEach((block, bi) => {
        if (!block || block.type !== 'tabs') return;
        const label = `P${pageNum}-Block${bi + 1}(tabs)`;
        if (!block.tabs || !Array.isArray(block.tabs) || block.tabs.length === 0) {
          result.valid = false;
          result.errors.push(`${label}: 缺少tabs数组——标签页渲染为空壳`);
          return;
        }
        block.tabs.forEach((t, ti) => {
          if (!t || !t.label) {
            result.errors.push(`${label}: 第${ti + 1}个标签缺少label——按钮上无文字，用户不知道点什么`);
            result.valid = false;
          }
          if (!t || (t.html === undefined || t.html === null || t.html === '')) {
            result.valid = false;
            result.errors.push(
              `${label}: 标签"${(t && t.label) || ti + 1}"缺少html——点击后面板空白（典型"点了没反应"）`
            );
          }
        });
      });

      // 5. scroll 布局依赖 nd-step 结构，缺了 Scrolly 直接 return，滚动叙事无声失效
      if (slide.layout === 'scroll') {
        const hasSteps = (slide.blocks || []).some(
          b => b && (b.steps || b.type === 'scrolly')
        );
        if (!hasSteps) {
          result.warnings.push(
            `P${pageNum}: layout="scroll" 但没有 steps 内容——Scrolly.init 会直接返回，滚动联动不生效`
          );
        }
      }
    });

    // 6. 渐进揭示：整份 deck 若声明了 frag/stagger，必须真有可揭示元素
    let fragDeclared = 0;
    slides.forEach(slide => {
      (slide.blocks || []).forEach(b => {
        if (!b) return;
        if (b.frag === true) fragDeclared++;
        if (b.stagger === true) {
          const n = Array.isArray(b.items) ? b.items.length : 0;
          if (n === 0) {
            result.warnings.push(
              `${b.type}: 声明了 stagger 但 items 为空——按空格没有任何揭示动作`
            );
          } else {
            fragDeclared += n;
          }
        }
      });
    });

    // 7. 主题 mode 必须是引擎认得的值（否则用户以为切了浅色，实际还是深色）
    if (deckData.theme && deckData.theme.mode &&
        ['light', 'dark'].indexOf(deckData.theme.mode) === -1) {
      result.valid = false;
      result.errors.push(
        `theme.mode="${deckData.theme.mode}" 非法（只支持 light/dark）——` +
        `引擎会回落到深色，与预期不符`
      );
    }

    return result;
  },

  /**
   * 计算单页Block数量
   */
  _countBlocks(slide) {
    if (!slide.blocks) return 0;
    return Array.isArray(slide.blocks) ? slide.blocks.length : 1;
  },

  /**
   * 校验单个Block
   */
  _validateBlock(block, pageNum, blockIndex) {
    const result = { errors: [], warnings: [] };
    const blockLabel = `P${pageNum}-Block${blockIndex + 1}`;

    if (!block.type) {
      result.errors.push(`${blockLabel}: 缺少type字段`);
      return result;
    }

    // 根据Block类型执行专项校验
    switch (block.type) {
      case 'swot':
        this._validateSWOT(block, blockLabel, result);
        break;
      case 'okr':
        this._validateOKR(block, blockLabel, result);
        break;
      case 'gantt':
        this._validateGantt(block, blockLabel, result);
        break;
      case 'chart':
        this._validateChart(block, blockLabel, result);
        break;
      case 'metric':
        this._validateMetric(block, blockLabel, result);
        break;
      case 'bcg':
        this._validateBCG(block, blockLabel, result);
        break;
      case 'fishbone':
        this._validateFishbone(block, blockLabel, result);
        break;
      case 'kanban':
        this._validateKanban(block, blockLabel, result);
        break;
    }

    return result;
  },

  /**
   * SWOT矩阵校验
   */
  _validateSWOT(block, label, result) {
    const required = ['strengths', 'weaknesses', 'opportunities', 'threats'];
    const missing = required.filter(key => !block[key] || !Array.isArray(block[key]));

    if (missing.length > 0) {
      result.errors.push(`${label}(swot): 缺少字段 ${missing.join(', ')}`);
    }

    // 检查是否所有象限都为空
    const allEmpty = required.every(key =>
      !block[key] || block[key].length === 0
    );

    if (allEmpty) {
      result.errors.push(`${label}(swot): 所有象限均为空，无法生成SWOT矩阵`);
    }
  },

  /**
   * OKR树校验
   */
  _validateOKR(block, label, result) {
    if (!block.objective || typeof block.objective !== 'string' || block.objective.trim() === '') {
      result.errors.push(`${label}(okr): 缺少objective字段或为空`);
    }

    if (!block.keyResults || !Array.isArray(block.keyResults) || block.keyResults.length === 0) {
      result.errors.push(`${label}(okr): 缺少keyResults数组或为空`);
      return;
    }

    block.keyResults.forEach((kr, idx) => {
      if (!kr.kr || typeof kr.kr !== 'string') {
        result.errors.push(`${label}(okr): KR${idx + 1}缺少kr文本`);
      }
      if (typeof kr.progress !== 'number' || kr.progress < 0 || kr.progress > 100) {
        result.warnings.push(`${label}(okr): KR${idx + 1}进度值异常(${kr.progress})，应为0-100`);
      }
    });
  },

  /**
   * 甘特图校验
   */
  _validateGantt(block, label, result) {
    if (!block.tasks || !Array.isArray(block.tasks) || block.tasks.length === 0) {
      result.errors.push(`${label}(gantt): 缺少tasks数组或为空`);
      return;
    }

    block.tasks.forEach((task, idx) => {
      if (!task.name) {
        result.errors.push(`${label}(gantt): Task${idx + 1}缺少name字段`);
      }
      if (!task.start) {
        result.warnings.push(`${label}(gantt): Task${idx + 1}缺少start时间`);
      }
      if (typeof task.progress !== 'number' || task.progress < 0 || task.progress > 100) {
        result.warnings.push(`${label}(gantt): Task${idx + 1}进度值异常`);
      }
    });
  },

  /**
   * 图表校验（反模式11：datasets必须是数组）
   */
  _validateChart(block, label, result) {
    if (!block.chart || typeof block.chart !== 'object') {
      result.errors.push(`${label}(chart): 缺少chart配置对象`);
      return;
    }

    if (!block.data || typeof block.data !== 'object') {
      result.errors.push(`${label}(chart): 缺少data对象`);
      return;
    }

    // 关键检查：datasets必须是数组
    if (!block.data.datasets || !Array.isArray(block.data.datasets)) {
      result.errors.push(`${label}(chart): data.datasets必须是数组，当前为${typeof block.data.datasets}`);
    }

    if (!block.data.labels || !Array.isArray(block.data.labels)) {
      result.warnings.push(`${label}(chart): data.labels应为数组`);
    }
  },

  /**
   * Metric数字卡校验
   */
  _validateMetric(block, label, result) {
    if (!block.items || !Array.isArray(block.items) || block.items.length === 0) {
      result.errors.push(`${label}(metric): 缺少items数组或为空`);
      return;
    }

    block.items.forEach((item, idx) => {
      if (!item.value) {
        result.warnings.push(`${label}(metric): Item${idx + 1}缺少value值`);
      }
      if (!item.label) {
        result.warnings.push(`${label}(metric): Item${idx + 1}缺少label标签`);
      }
    });
  },

  /**
   * BCG矩阵校验
   */
  _validateBCG(block, label, result) {
    if (!block.items || !Array.isArray(block.items) || block.items.length === 0) {
      result.errors.push(`${label}(bcg): 缺少items数组或为空`);
      return;
    }

    block.items.forEach((item, idx) => {
      if (!item.name) {
        result.errors.push(`${label}(bcg): Item${idx + 1}缺少name字段`);
      }
      if (typeof item.marketGrowth !== 'number') {
        result.warnings.push(`${label}(bcg): Item${idx + 1}的marketGrowth应为数字`);
      }
      if (typeof item.marketShare !== 'number') {
        result.warnings.push(`${label}(bcg): Item${idx + 1}的marketShare应为数字`);
      }
    });
  },

  /**
   * 鱼骨图校验
   */
  _validateFishbone(block, label, result) {
    if (!block.problem || typeof block.problem !== 'string') {
      result.errors.push(`${label}(fishbone): 缺少problem问题描述`);
    }

    if (!block.causes || typeof block.causes !== 'object') {
      result.errors.push(`${label}(fishbone): 缺少causes原因对象`);
      return;
    }

    const categories = Object.keys(block.causes);
    if (categories.length === 0) {
      result.errors.push(`${label}(fishbone): causes对象为空，至少需要一个分类`);
    }
  },

  /**
   * 看板校验
   */
  _validateKanban(block, label, result) {
    if (!block.columns || !Array.isArray(block.columns) || block.columns.length === 0) {
      result.errors.push(`${label}(kanban): 缺少columns数组或为空`);
      return;
    }

    block.columns.forEach((col, idx) => {
      if (!col.title) {
        result.errors.push(`${label}(kanban): Column${idx + 1}缺少title`);
      }
      if (!col.cards || !Array.isArray(col.cards)) {
        result.warnings.push(`${label}(kanban): Column${idx + 1}缺少cards数组`);
      }
    });
  },

  /**
   * 全局模式检查
   */
  _checkGlobalPatterns(deckData, result) {
    // 检查主题色数量（反模式7）
    if (deckData.theme && deckData.theme.colors) {
      const colorCount = Object.keys(deckData.theme.colors).filter(
        key => !['bg', 'text', 'sub'].includes(key)
      ).length;

      if (colorCount > 2) {
        result.warnings.push(`主题色过多(${colorCount}种)，建议≤2种（一主一辅）`);
      }
    }

    // 检查时长匹配（反模式8）
    if (deckData.meta && deckData.meta.duration) {
      const pageCount = deckData.slides.length;
      const duration = deckData.meta.duration; // 分钟

      if (duration === 5 && pageCount > 6) {
        result.warnings.push(`5分钟汇报建议5-6页，当前${pageCount}页`);
      } else if (duration === 10 && pageCount > 10) {
        result.warnings.push(`10分钟汇报建议8-10页，当前${pageCount}页`);
      } else if (duration === 15 && pageCount > 15) {
        result.warnings.push(`15分钟汇报建议12-15页，当前${pageCount}页`);
      }
    }
  }
};

// 浏览器环境导出
if (typeof window !== 'undefined') {
  window.ValidationEngine = ValidationEngine;
}

// Node.js环境导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ValidationEngine;
}
