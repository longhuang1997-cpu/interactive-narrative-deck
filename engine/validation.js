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
