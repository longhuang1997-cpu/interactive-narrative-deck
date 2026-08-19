/* 自定义Block扩展示例
   展示如何在不修改engine.js的情况下添加新的Block类型
   将此文件放在HTML中引入，放在core-blocks.js之后 */
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
  position: relative;
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

console.log('[CustomBlocks] ✓ 已注册3个自定义Block: accordion, progress, alert');
console.log('[CustomBlocks] 当前所有Block:', BlockRegistry.list().join(', '));
