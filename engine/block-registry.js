/* Block插件注册系统
   允许用户和开发者扩展Block组件，无需修改engine.js核心代码
   使用: BlockRegistry.register('myblock', (data) => { return domElement; }) */
"use strict";

const BlockRegistry = {
  blocks: new Map(),

  /**
   * 注册一个Block渲染器
   * @param {string} type - Block类型名称（如'hero', 'metric'）
   * @param {Function} renderer - 渲染函数，接收block数据，返回DOM元素
   * @param {Object} meta - 可选的元数据（描述、作者、版本等）
   */
  register(type, renderer, meta = {}) {
    if (this.blocks.has(type)) {
      console.warn(`[BlockRegistry] Block "${type}" 已存在，将被覆盖`);
    }

    if (typeof renderer !== 'function') {
      console.error(`[BlockRegistry] Block "${type}" 的渲染器必须是函数`);
      return false;
    }

    this.blocks.set(type, {
      renderer: renderer,
      meta: meta,
      registeredAt: Date.now()
    });

    console.log(`[BlockRegistry] ✓ 注册Block: ${type}${meta.author ? ' by ' + meta.author : ''}`);
    return true;
  },

  /**
   * 渲染一个Block
   * @param {Object} blockData - Block数据对象，必须包含type字段
   * @param {number} index - Block在slide中的索引
   * @returns {HTMLElement|null} 渲染后的DOM元素
   */
  render(blockData, index) {
    if (!blockData || !blockData.type) {
      console.error('[BlockRegistry] Block数据无效：缺少type字段');
      return this._renderError('缺少type字段');
    }

    const entry = this.blocks.get(blockData.type);

    if (!entry) {
      console.error(`[BlockRegistry] 未知的Block类型: ${blockData.type}`);
      return this._renderError(`未知block: ${blockData.type}`);
    }

    try {
      const el = entry.renderer(blockData, index);

      if (!el || !(el instanceof HTMLElement)) {
        console.error(`[BlockRegistry] Block "${blockData.type}" 渲染器必须返回HTMLElement`);
        return this._renderError(`${blockData.type}渲染失败`);
      }

      // 添加通用class和属性
      el.classList.add('nd-block');
      el.dataset.blockType = blockData.type;

      // 渐进揭示支持
      if (blockData.frag) {
        el.setAttribute('data-frag', '1');
      }

      return el;
    } catch (err) {
      console.error(`[BlockRegistry] Block "${blockData.type}" 渲染出错:`, err);
      return this._renderError(`${blockData.type}渲染异常: ${err.message}`);
    }
  },

  /**
   * 批量注册多个Block
   * @param {Object} blocks - {type: renderer} 映射对象
   */
  registerBatch(blocks) {
    Object.keys(blocks).forEach(type => {
      this.register(type, blocks[type]);
    });
  },

  /**
   * 检查Block类型是否已注册
   * @param {string} type - Block类型
   * @returns {boolean}
   */
  has(type) {
    return this.blocks.has(type);
  },

  /**
   * 获取所有已注册的Block类型列表
   * @returns {Array<string>}
   */
  list() {
    return Array.from(this.blocks.keys());
  },

  /**
   * 获取Block的元数据
   * @param {string} type - Block类型
   * @returns {Object|null}
   */
  getMeta(type) {
    const entry = this.blocks.get(type);
    return entry ? entry.meta : null;
  },

  /**
   * 注销一个Block（慎用）
   * @param {string} type - Block类型
   * @returns {boolean}
   */
  unregister(type) {
    return this.blocks.delete(type);
  },

  /**
   * 渲染错误提示Block
   * @private
   */
  _renderError(message) {
    const div = document.createElement('div');
    div.className = 'nd-block nd-block-error';
    div.style.cssText = 'padding:20px;border:2px dashed #ef4444;border-radius:8px;color:#fca5a5;background:#450a0a;';
    div.textContent = `⚠️ ${message}`;
    return div;
  }
};

// 导出（如果环境支持）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlockRegistry;
}
