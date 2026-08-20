# Business Blocks 演示案例

本演示展示三个专业商业分析Block的实际应用场景。

## 📂 文件说明

- `business-blocks-demo.html` - 演示入口（双击打开）
- `business-blocks-demo.js` - 演示内容配置

## 🎯 三个专业Block

### 1. fishbone（鱼骨图）
**用途**：问题根因分析、质量管理  
**结构**：6M分类（人/机/料/法/环/测） + 中心问题  
**适用场景**：
- 质量问题根因分析
- 故障排查复盘
- 流程优化诊断
- 客诉问题分析

### 2. bcg（BCG矩阵）
**用途**：业务组合分析、战略规划  
**结构**：2x2矩阵（明星/金牛/问题/瘦狗） + 气泡图  
**适用场景**：
- 业务组合战略分析
- 产品portfolio评估
- 投资决策优化
- 资源分配规划

### 3. kanban（看板）
**用途**：任务流程管理、敏捷开发  
**结构**：多列泳道 + 卡片 + 状态流转  
**适用场景**：
- 敏捷开发进度展示
- 工作流管理
- 任务分配追踪
- 项目状态汇报

## 🚀 如何使用

### 预览演示
```bash
# 在当前目录双击打开
business-blocks-demo.html
```

### 集成到自己的项目
```javascript
// 1. 在deck.js中引用对应Block
{
  type: 'fishbone',
  problem: '核心问题描述',
  causes: {
    people: ['人员因素1', '人员因素2'],
    machine: ['设备因素1'],
    // ... 其他分类
  }
}

// 2. 确保HTML引入了business-blocks.js和.css
<script src="engine/business-blocks.js"></script>
<link rel="stylesheet" href="engine/business-blocks.css">
```

## 📚 完整API文档

详见 `../knowledge/block-reference.md`：
- fishbone: L253-285
- bcg: L288-314
- kanban: L317-362

## 🎮 演示操作

- **翻页**：左右方向键
- **总览**：按 `O` 键
- **全屏**：按 `F11`
- **退出全屏**：按 `ESC`

## 💡 演示内容概览

| 页码 | 内容 | Block类型 |
|------|------|-----------|
| P1 | 封面 | hero |
| P2 | 鱼骨图演示 | hero + fishbone |
| P3 | 鱼骨图应用场景 | bullets + quote |
| P4 | BCG矩阵演示 | hero + bcg |
| P5 | BCG战略决策 | grid |
| P6 | Kanban看板演示 | hero + kanban |
| P7 | Kanban应用场景 | bullets + metric |
| P8 | 三个Block对比 | hero + compare |
| P9 | 收尾总结 | quote + bullets |

## 🎨 视觉特点

- **统一配色**：商业分析蓝(#3b82f6) + 决策橙(#f59e0b)
- **专业动画**：渐进揭示、气泡弹出、卡片滑入
- **响应式布局**：桌面/移动端自适应
- **深色主题**：专业演示风格

---

**创建时间**：2026-01-20  
**版本**：v3.0.0  
**维护**：Interactive Narrative Deck Skill
