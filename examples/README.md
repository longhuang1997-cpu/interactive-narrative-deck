# 📂 Examples - 演示案例库

本目录包含Interactive Narrative Deck的实际应用演示案例。

## 🎯 演示列表

### 1️⃣ [all-professional-blocks](./all-professional-blocks/)
**完整专业方法论Block演示**  
包含：OKR · 甘特图 · 鱼骨图 · BCG矩阵 · 看板  
**推荐用途**：了解所有专业Block的综合演示

**包含Block**：
- OKR目标管理（Objectives and Key Results）
- 甘特图（Gantt Chart）项目时间线
- 鱼骨图（Fishbone/Ishikawa）6M根因分析
- BCG矩阵（Boston Consulting Group Matrix）业务组合
- 看板（Kanban）敏捷任务管理

---

### 2️⃣ [swot-demo](./swot-demo/)
**SWOT分析矩阵演示**  
包含：SWOT分析 · 战略建议 · 实施计划  
**推荐用途**：战略规划、竞争分析、业务评估汇报

**适用场景**：
- 企业战略分析
- 产品评估
- 竞争对手分析
- 新业务机会评估

---

### 3️⃣ [strategy-report](./strategy-report/)
**战略报告综合演示**  
包含：多种Block组合 · 完整汇报结构  
**推荐用途**：学习如何构建完整的战略汇报deck

**包含元素**：
- 封面设计
- 目标与愿景
- 战略规划
- 执行路径
- 总结与展望

---

### 4️⃣ [tech-talk](./tech-talk/)
**技术演讲演示**  
包含：技术主题演示 · 代码展示 · 架构图  
**推荐用途**：技术分享、架构汇报、产品发布

**特点**：
- 技术风格配色
- 代码高亮展示
- 架构图可视化
- 互动式演示

---

## 🚀 如何使用

### 方式1：本地HTTP服务器（推荐）
```bash
# 在项目根目录启动服务器
python -m http.server 8080

# 在浏览器访问
http://localhost:8080/examples/
```

### 方式2：直接打开HTML
某些演示支持直接双击`index.html`打开（不保证所有功能正常）

---

## 🎮 演示操作

| 快捷键 | 功能 |
|--------|------|
| `→` / `↓` | 下一页 |
| `←` / `↑` | 上一页 |
| `Home` | 回到首页 |
| `End` | 跳到最后一页 |
| `O` | 总览模式 |
| `F11` | 全屏 |
| `ESC` | 退出全屏 |

---

## 📚 Block参考

| Block类型 | 用途 | 文档 |
|-----------|------|------|
| **hero** | 封面、标题页 | 基础Block |
| **swot** | SWOT分析矩阵 | [business-blocks.js](../engine/business-blocks.js) |
| **okr** | OKR目标管理 | [business-blocks.js](../engine/business-blocks.js) |
| **gantt** | 甘特图项目时间线 | [business-blocks.js](../engine/business-blocks.js) |
| **fishbone** | 鱼骨图根因分析 | [business-blocks.js](../engine/business-blocks.js) |
| **bcg** | BCG矩阵业务组合 | [business-blocks.js](../engine/business-blocks.js) |
| **kanban** | 看板敏捷管理 | [business-blocks.js](../engine/business-blocks.js) |
| **pyramid** | 金字塔MECE思维 | [business-blocks.js](../engine/business-blocks.js) |
| **bullets** | 要点列表 | 基础Block |
| **metric** | 关键指标卡片 | 基础Block |
| **quote** | 引用/格言 | 基础Block |
| **timeline** | 时间轴 | 基础Block |

---

## 💡 学习路径

1. **新手入门** → 从 `swot-demo` 开始，了解基础Block使用
2. **专业工具** → 查看 `all-professional-blocks`，掌握5大方法论
3. **综合应用** → 学习 `strategy-report`，构建完整汇报
4. **场景定制** → 参考 `tech-talk`，打造专属风格

---

## 🎨 自定义演示

### 创建新演示
```bash
# 复制模板
cp -r examples/swot-demo examples/my-demo

# 编辑内容
cd examples/my-demo
# 修改 deck.js 配置数据
# 修改 index.html 标题
```

### 核心配置文件
- `deck.js` - 演示内容和数据
- `index.html` - 入口页面
- `style.css` - 自定义样式（可选）

---

**版本**：v3.1.0  
**更新时间**：2026-08-21  
**维护者**：Interactive Narrative Deck Skill
