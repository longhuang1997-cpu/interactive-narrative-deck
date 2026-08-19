# Block扩展开发指南

> 如何在不修改engine.js的情况下添加自定义Block组件

---

## 🔌 快速开始

### 1. 创建自定义Block

```javascript
// 在HTML中引入，放在core-blocks.js之后
BlockRegistry.register('myblock', function(blockData) {
  const div = document.createElement('div');
  div.className = 'nd-myblock';
  div.textContent = blockData.content || '';
  return div;
}, {
  description: 'My custom block',
  author: 'yourname',
  version: '1.0.0'
});
```

### 2. 在deck.js中使用

```javascript
const DECK = {
  slides: [{
    blocks: [
      {type: 'myblock', content: 'Hello World'}
    ]
  }]
};
```

---

## 📚 API参考

### BlockRegistry.register(type, renderer, meta)

注册一个新的Block类型。

**参数**：
- `type` (string) - Block类型名称，必须唯一
- `renderer` (function) - 渲染函数，接收`(blockData, index)`，返回HTMLElement
- `meta` (object, 可选) - 元数据
  - `description` (string) - Block描述
  - `author` (string) - 作者
  - `version` (string) - 版本号

**返回值**：
- `true` - 注册成功
- `false` - 注册失败（如renderer不是函数）

**示例**：
```javascript
BlockRegistry.register('alert', function(data) {
  const div = document.createElement('div');
  div.className = 'nd-alert nd-alert-' + (data.type || 'info');
  div.textContent = data.message || '';
  return div;
}, {
  description: '提示框组件',
  author: 'custom',
  version: '1.0.0'
});
```

---

### renderer函数规范

```javascript
function renderer(blockData, index) {
  // blockData: 用户在deck.js中定义的数据对象
  // index: Block在slide中的索引（0开始）
  
  // 1. 创建DOM元素
  const element = document.createElement('div');
  
  // 2. 应用样式
  element.className = 'nd-custom-block';
  
  // 3. 填充内容
  element.innerHTML = blockData.content;
  
  // 4. 绑定事件（可选）
  element.onclick = function() {
    console.log('Block clicked');
  };
  
  // 5. 返回DOM元素（必须）
  return element;
}
```

**要求**：
- ✅ 必须返回HTMLElement
- ✅ 不能返回null或undefined
- ✅ 不能抛出异常（会被捕获并显示错误Block）
- ⚠️ 不需要手动添加`.nd-block` class（自动添加）
- ⚠️ 不需要处理`frag`属性（自动处理）

---

## 🎨 高级特性

### 1. 渐进揭示支持

用户在deck.js中设置`frag: true`，Block会被延迟显示：

```javascript
{type: 'myblock', content: '...', frag: true}
```

无需在renderer中处理，引擎会自动添加`data-frag="1"`属性。

---

### 2. 异步渲染（图表/媒体）

如果Block需要等待外部库加载（如Chart.js），使用`setTimeout`：

```javascript
BlockRegistry.register('chart', function(data) {
  const div = document.createElement('div');
  const canvas = document.createElement('canvas');
  div.appendChild(canvas);
  
  // 延迟渲染，等待Chart.js加载
  setTimeout(function() {
    if (window.Chart) {
      new Chart(canvas, {
        type: data.chartType,
        data: data.data
      });
    } else {
      div.innerHTML = '(Chart.js未加载)';
    }
  }, 100);
  
  return div;
});
```

---

### 3. 动画集成（GSAP）

如果想使用GSAP动画，检查`window.gsap`是否存在：

```javascript
BlockRegistry.register('animated-box', function(data) {
  const div = document.createElement('div');
  div.textContent = data.content;
  
  // 进入动画（引擎会自动触发slide进入动画）
  // 但如果想自定义Block内部动画：
  setTimeout(function() {
    if (window.gsap) {
      gsap.from(div.querySelector('.inner'), {
        scale: 0,
        duration: 0.5
      });
    }
  }, 300);
  
  return div;
});
```

---

### 4. 添加自定义CSS

```javascript
// 在注册Block后，动态插入样式
const style = document.createElement('style');
style.textContent = `
.nd-myblock {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}
`;
document.head.appendChild(style);
```

---

## 🛠️ 工具函数

### BlockRegistry.render(blockData, index)

渲染一个Block（引擎内部调用，通常用户不需要直接调用）。

**参数**：
- `blockData` (object) - 必须包含`type`字段
- `index` (number) - Block索引

**返回值**：
- HTMLElement - 渲染后的DOM（已添加`.nd-block` class）
- 错误Block - 如果type未注册或renderer出错

---

### BlockRegistry.has(type)

检查Block类型是否已注册。

```javascript
if (BlockRegistry.has('accordion')) {
  console.log('accordion已注册');
}
```

---

### BlockRegistry.list()

获取所有已注册的Block类型列表。

```javascript
console.log('已注册Block:', BlockRegistry.list());
// 输出: ['hero', 'metric', 'bullets', 'compare', ...]
```

---

### BlockRegistry.getMeta(type)

获取Block的元数据。

```javascript
const meta = BlockRegistry.getMeta('accordion');
console.log(meta.description); // "FAQ折叠面板"
console.log(meta.author);      // "custom"
```

---

### BlockRegistry.unregister(type)

注销一个Block（慎用，可能导致现有deck.js无法渲染）。

```javascript
BlockRegistry.unregister('myblock');
```

---

## 📦 完整示例：Accordion折叠面板

### 1. 注册Block

```javascript
BlockRegistry.register('accordion', function(data) {
  const wrapper = document.createElement('div');
  wrapper.className = 'nd-accordion';
  
  (data.items || []).forEach(function(item) {
    const section = document.createElement('div');
    section.className = 'nd-accordion-item';
    
    const header = document.createElement('div');
    header.className = 'nd-accordion-header';
    header.textContent = item.title || '展开查看';
    header.onclick = function() {
      section.classList.toggle('open');
    };
    
    const content = document.createElement('div');
    content.className = 'nd-accordion-content';
    content.innerHTML = item.content || '';
    
    section.appendChild(header);
    section.appendChild(content);
    wrapper.appendChild(section);
  });
  
  return wrapper;
}, {
  description: 'FAQ折叠面板',
  author: 'custom'
});
```

### 2. 添加CSS

```javascript
const style = document.createElement('style');
style.textContent = `
.nd-accordion-item {
  margin-bottom: 8px;
  border: 1px solid #334155;
  border-radius: 6px;
  overflow: hidden;
}

.nd-accordion-header {
  padding: 12px 16px;
  background: #1e293b;
  cursor: pointer;
  transition: background 0.2s;
}

.nd-accordion-header:hover {
  background: #334155;
}

.nd-accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: 0 16px;
}

.nd-accordion-item.open .nd-accordion-content {
  max-height: 500px;
  padding: 16px;
}
`;
document.head.appendChild(style);
```

### 3. 在deck.js中使用

```javascript
const DECK = {
  slides: [{
    blocks: [{
      type: 'accordion',
      items: [
        {
          title: '什么是Interactive Deck?',
          content: '一个交互式演示框架，用Block积木组合演示内容。'
        },
        {
          title: '如何安装?',
          content: '<code>claude skill install https://github.com/...</code>'
        },
        {
          title: '支持哪些Block?',
          content: 'hero, metric, bullets, compare, timeline, quote, chart, tabs, media等9种。'
        }
      ]
    }]
  }]
};
```

---

## ⚠️ 注意事项

### 1. 命名冲突

如果注册了与核心Block同名的类型，会覆盖原有Block：

```javascript
// ❌ 不推荐：覆盖核心Block
BlockRegistry.register('hero', function(data) {
  // 自定义hero实现
});

// ✅ 推荐：使用不同名称
BlockRegistry.register('hero-custom', function(data) {
  // 自定义实现
});
```

### 2. 性能考虑

- 避免在renderer中执行耗时操作
- 大量DOM操作用`DocumentFragment`优化
- 图片/视频使用懒加载

### 3. 兼容性

- 使用ES5语法（兼容旧浏览器）
- 检查`window.gsap` / `window.Chart`是否存在
- 提供降级方案

---

## 🔗 相关文档

- [核心Block参考](../knowledge/block-reference.md)
- [引擎架构](./ARCHITECTURE.md)
- [测试指南](../tests/skill-golden-cases.md)

---

## 💡 完整示例代码包

以下是3个实用自定义Block的完整实现（Accordion折叠面板、Progress进度条、Alert提示框）：

```javascript
/* 自定义Block扩展示例 - 完整代码
   展示如何在不修改engine.js的情况下添加新的Block类型 */

"use strict";

// ===== 示例1: Accordion折叠面板 =====
BlockRegistry.register('accordion', function(blockData) {
  const items = blockData.items || [];
  const div = document.createElement('div');
  div.className = 'nd-accordion';

  items.forEach(function(item, index) {
    const section = document.createElement('div');
    section.className = 'nd-accordion-item';

    const header = document.createElement('div');
    header.className = 'nd-accordion-header';
    header.textContent = item.title || '展开查看';
    header.onclick = function() {
      section.classList.toggle('open');
    };

    const content = document.createElement('div');
    content.className = 'nd-accordion-content';
    content.innerHTML = item.content || '';

    section.appendChild(header);
    section.appendChild(content);
    div.appendChild(section);
  });

  return div;
}, {
  description: 'FAQ折叠面板，适合Q&A场景',
  author: 'custom',
  version: '1.0.0'
});

// ===== 示例2: Progress进度条 =====
BlockRegistry.register('progress', function(blockData) {
  const items = blockData.items || [];
  const div = document.createElement('div');
  div.className = 'nd-progress-list';

  items.forEach(function(item) {
    const row = document.createElement('div');
    row.className = 'nd-progress-row';

    const label = document.createElement('div');
    label.className = 'nd-progress-label';
    label.textContent = item.label || '';

    const bar = document.createElement('div');
    bar.className = 'nd-progress-bar';

    const fill = document.createElement('div');
    fill.className = 'nd-progress-fill';
    fill.style.width = (item.value || 0) + '%';
    fill.textContent = (item.value || 0) + '%';

    bar.appendChild(fill);
    row.appendChild(label);
    row.appendChild(bar);
    div.appendChild(row);
  });

  return div;
}, {
  description: '进度条组件，展示完成度、完成率',
  author: 'custom',
  version: '1.0.0'
});

// ===== 示例3: Alert提示框 =====
BlockRegistry.register('alert', function(blockData) {
  const type = blockData.type || 'info'; // info/success/warning/error
  const div = document.createElement('div');
  div.className = 'nd-alert nd-alert-' + type;

  const icon = document.createElement('div');
  icon.className = 'nd-alert-icon';
  icon.textContent = {
    'info': 'ℹ️',
    'success': '✅',
    'warning': '⚠️',
    'error': '❌'
  }[type] || 'ℹ️';

  const content = document.createElement('div');
  content.className = 'nd-alert-content';
  content.innerHTML = blockData.content || '';

  div.appendChild(icon);
  div.appendChild(content);

  return div;
}, {
  description: '提示框，支持info/success/warning/error类型',
  author: 'custom',
  version: '1.0.0'
});

// ===== 添加自定义Block的CSS样式 =====
const customStyle = document.createElement('style');
customStyle.textContent = `
/* Accordion折叠面板 */
.nd-accordion-item {
  margin-bottom: 8px;
  border: 1px solid #334155;
  border-radius: 6px;
  overflow: hidden;
}
.nd-accordion-header {
  padding: 12px 16px;
  background: #1e293b;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
}
.nd-accordion-header:hover {
  background: #334155;
}
.nd-accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: 0 16px;
  color: #cbd5e1;
}
.nd-accordion-item.open .nd-accordion-content {
  max-height: 500px;
  padding: 16px;
}

/* Progress进度条 */
.nd-progress-row {
  margin-bottom: 16px;
}
.nd-progress-label {
  color: #e2e8f0;
  margin-bottom: 6px;
  font-size: 14px;
}
.nd-progress-bar {
  height: 24px;
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
}
.nd-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  transition: width 0.6s ease;
}

/* Alert提示框 */
.nd-alert {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid;
}
.nd-alert-info {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
}
.nd-alert-success {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
}
.nd-alert-warning {
  background: rgba(251, 191, 36, 0.1);
  border-color: #fbbf24;
}
.nd-alert-error {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}
.nd-alert-icon {
  font-size: 20px;
  margin-right: 12px;
}
.nd-alert-content {
  flex: 1;
  color: #e2e8f0;
  line-height: 1.6;
}
`;
document.head.appendChild(customStyle);
```

**使用方法**：将上述代码保存为独立的.js文件，在HTML中的core-blocks.js之后引入即可。

---

## 💡 贡献你的Block

如果你创建了通用的自定义Block，欢迎提交PR到：  
https://github.com/longhuang1997-cpu/interactive-narrative-deck

---

**最后更新：v2.1.0 (2026-08-19)**
