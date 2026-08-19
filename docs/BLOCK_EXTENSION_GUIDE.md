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

## 💡 贡献你的Block

如果你创建了通用的自定义Block，欢迎提交PR：

1. 在`engine/custom-blocks.js`中添加你的Block
2. 在`examples/`中添加演示案例
3. 更新本文档
4. 提交PR到 https://github.com/longhuang1997-cpu/interactive-narrative-deck

---

**最后更新：v2.0.3 (2026-08-19)**
