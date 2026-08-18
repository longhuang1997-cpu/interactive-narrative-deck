# 可运行示例 & 验证案例

本文档提供 **3个完整可运行的演示**，用于验证工具功能和审计实现细节。

---

## 📂 示例文件结构

```
examples/
├── strategy-report/          # 示例1：战略汇报
│   ├── index.html
│   ├── deck.js
│   └── README.md
├── product-launch/           # 示例2：产品发布会
│   ├── index.html
│   ├── deck.js
│   └── README.md
└── tech-talk/                # 示例3：技术分享
    ├── index.html
    ├── deck.js
    └── README.md
```

**验证方式**：进入任意目录，双击 `index.html` 即可在浏览器中查看完整演示。

---

## 示例1：战略汇报（Strategy Report）

**场景**：Q3业务复盘向管理层汇报  
**时长**：15分钟  
**页数**：8页  

**包含的 Block 组件**：
- `hero` - 封面
- `metric` - 3个关键指标（营收/用户数/满意度）+ 滚动动效
- `chart` (line) - 月度营收趋势图
- `bullets` + `stagger` - 问题分析（渐进揭示）
- `compare` - 两个方案对比
- `timeline` - 下季度计划时间线
- `quote` - 行动号召

**验证点**：
- ✅ 数字滚动动效（metric block）
- ✅ Chart.js 图表渲染（line chart）
- ✅ 渐进揭示（空格键逐条显示 bullets）
- ✅ 翻页笔兼容性（PageUp/PageDown）

**运行方式**：
```bash
cd examples/strategy-report
# 双击 index.html 或执行：
open index.html  # macOS
start index.html # Windows
```

---

## 示例2：产品发布会（Product Launch）

**场景**：新功能对外发布  
**时长**：20分钟  
**页数**：10页  

**包含的 Block 组件**：
- `hero` - 封面 + 副标题
- `bullets` - 功能亮点列表
- `chart` (bar) - 性能对比柱状图
- `tabs` - 3个版本方案切换展示
- `media` - 产品演示视频嵌入
- `compare` - 定价方案对比
- `timeline` - 发布路线图
- `quote` - 用户评价引用

**验证点**：
- ✅ 标签页切换（tabs block）
- ✅ 视频嵌入播放（media block）
- ✅ 柱状图渲染（bar chart）
- ✅ 左右对比布局（compare block）

**运行方式**：
```bash
cd examples/product-launch
open index.html
```

---

## 示例3：技术分享（Tech Talk）

**场景**：技术社区分享  
**时长**：30分钟  
**页数**：12页  

**包含的 Block 组件**：
- `hero` - 封面
- `bullets` - 技术要点
- `chart` (doughnut) - 架构占比饼图
- `media` - 架构图嵌入
- `timeline` - 技术演进历史
- `quote` - 设计哲学引用
- `compare` - 旧架构 vs 新架构对比

**验证点**：
- ✅ 饼图渲染（doughnut chart）
- ✅ 架构图嵌入（media block）
- ✅ 时间线水平展示（timeline block）
- ✅ 全屏模式（F11）+ 总览模式（O键）

**运行方式**：
```bash
cd examples/tech-talk
open index.html
```

---

## 🧪 自动化测试脚本

为了验证工具在不同环境下的可靠性，提供以下测试脚本：

### 测试1：离线降级验证

**目的**：验证 CDN 失败时是否能正常降级

```bash
# 1. 断开网络
# 2. 打开任意示例的 index.html
# 3. 检查：
#    - 页面能正常加载
#    - 基础布局和样式正常显示
#    - 图表降级为静态占位符（或提示"图表需要在线环境"）
```

**预期结果**：页面不崩溃，基础内容可读。

### 测试2：翻页笔兼容性

**目的**：验证演示器（翻页笔）兼容性

```bash
# 1. 连接翻页笔设备
# 2. 全屏打开任意示例（F11）
# 3. 使用翻页笔的"下一页"按钮
# 4. 检查：页面是否正常翻页
```

**预期结果**：翻页笔的 PageUp/PageDown 信号能被正确捕获。

### 测试3：渐进揭示机制

**目的**：验证 `frag: true` 的渐进揭示功能

```bash
# 1. 打开 examples/strategy-report/index.html
# 2. 翻到"问题分析"页
# 3. 按空格键
# 4. 检查：每按一次空格，是否逐条显示 bullet 要点
```

**预期结果**：bullets 逐条淡入，配合演讲节奏。

---

## 📊 实现细节审计

### 1. 渲染引擎实现（engine/engine.js）

**关键逻辑**：
- 读取 `deck.js` 中的 `DECK` 数组
- 遍历每个 slide，根据 `blocks` 数组渲染对应组件
- 监听键盘事件（左右箭头 / PageUp/PageDown / 空格 / O键）
- 使用 GSAP 实现页面切换动画和 stagger 渐进效果

**可验证性**：
- 打开浏览器开发者工具（F12）
- 在 Console 中输入 `DECK` 即可查看当前演示的完整数据结构
- 输入 `currentSlide` 可查看当前页码

### 2. Chart.js 集成（engine/engine.js）

**实现方式**：
- 检测到 `type: 'chart'` 的 block 时，调用 `Chart.js` 渲染
- 如果 CDN 未加载成功，降级显示文字提示

**验证方式**：
```javascript
// 打开开发者工具，执行：
console.log(typeof Chart)
// 输出 "function" 说明 Chart.js 已加载
// 输出 "undefined" 说明 CDN 失败，已降级
```

### 3. 翻页笔兼容性实现

**实现逻辑**（engine/engine.js）：
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'PageDown' || e.key === 'ArrowRight') nextSlide()
  if (e.key === 'PageUp' || e.key === 'ArrowLeft') prevSlide()
  if (e.key === ' ') triggerFragment()
})
```

翻页笔发送的是标准的 `PageUp`/`PageDown` 键盘事件，因此无需额外适配。

---

## 🔍 代码审查要点

### 可审计性清单

| 审查维度 | 位置 | 说明 |
|---------|------|------|
| Block 组件定义 | `knowledge/block-reference.md` | 完整的 API 文档和字段说明 |
| 渲染引擎逻辑 | `engine/engine.js` | 核心渲染循环和事件监听 |
| 样式规范 | `engine/style.css` | CSS 变量定义和响应式布局 |
| 生成流程 | `SKILL.md` | AI 生成演示的完整流程 |
| 叙事判断规则 | `knowledge/narrative-engine.md` | 受众→结构的决策树 |
| 布局模式 | `knowledge/layout-patterns.md` | 内容→Layout的映射表 |

### Trust（信任）验证

- ✅ 所有依赖明确声明（GSAP 3.12 + Chart.js 4.4）
- ✅ 无隐藏网络请求（仅 CDN，失败时降级）
- ✅ 无本地存储滥用（仅 localStorage 记录进度）
- ✅ 开源协议清晰（MIT License）

### Reliability（可靠性）验证

- ✅ CDN 失败时不崩溃（降级机制）
- ✅ 数据格式错误时有友好提示（console.warn）
- ✅ 边界情况处理（空 DECK 数组、缺失 block type）

---

## 📝 更新日志

**2.0.0 版本改进（针对评审反馈）**：
- ✅ 补充 3 个完整可运行示例
- ✅ 增加 QUICKSTART.md 快速开始指南
- ✅ 修复 marketplace.json 中 author 信息不一致问题
- ✅ 增加实现细节审计章节
- ✅ 补充离线降级验证和翻页笔测试说明

---

**有问题？** 提 Issue：https://github.com/longhuang1997-cpu/interactive-narrative-deck/issues
