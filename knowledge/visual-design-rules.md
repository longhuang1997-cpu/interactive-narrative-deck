# 视觉设计规范

> 知识层 - 配色、字体、间距、动效的统一规范

---

## 配色系统

### 主题色定义
```javascript
theme: {
  blue: "#0ea5e9",   // 主色：科技蓝（信息、冷静、专业）
  gold: "#f59e0b",   // 强调色：行动橙（CTA、警示、高亮）
  bg: "#0f172a"      // 背景：深蓝黑（沉浸感、专业感）
}
```

### 语义色扩展
- **成功/增长**：`#34d399`（绿）- 用于delta正向变化、成功状态
- **警示/下降**：`#f87171`（红）- 用于delta负向变化、风险标识
- **中性/次要**：`#94a3b8`（灰）- 用于单位、说明文字、分隔线

### 配色原则
1. **单页最多2种主题色**：避免视觉混乱（如blue+gold，或blue+green）
2. **60-30-10法则**：背景60% + 主色30% + 强调色10%
3. **对比度要求**：文字与背景对比度≥4.5:1（WCAG AA标准）
4. **一致性映射**：
   - 蓝色 = 信息、现状、客观数据
   - 橙色 = 行动、决策、主观判断
   - 绿色 = 成功、增长、正向变化
   - 红色 = 风险、下降、负向变化

---

## 字体系统

### 字号层级（16:9屏幕优化）
```
层级1 - 页面标题：72-96px（hero.title）
层级2 - 大数字：68px（metric.value）
层级3 - 区块标题：36-48px（bullets.title, compare.title）
层级4 - 正文：24-28px（bullets.items, timeline.text）
层级5 - 辅助信息：16-20px（metric.label, delta标签）
层级6 - 注释：12-14px（页脚、来源标注）
```

### 字重规范
- **800 Black**：大数字（metric.value）
- **700 Bold**：标题、强调点
- **600 SemiBold**：次级标题
- **500 Medium**：正文、列表项
- **400 Regular**：说明文字

### 行高规范
- **大标题**：line-height: 1.1（紧凑有力）
- **正文**：line-height: 1.5-1.6（可读性）
- **多行说明**：line-height: 1.7（舒适阅读）

---

## 间距系统（8px基准）

### 垂直间距
```
微间距：8px    - 图标与文字
小间距：16px   - 列表项之间
中间距：24px   - Block内部分组
大间距：40px   - Block之间
章节间距：64px - 页面之间（通过layout调节）
```

### 内边距（Padding）
```
卡片内边距：32-48px（metric, swot, compare）
列表左缩进：44px（bullets带装饰点）
页面边距：5%（防止内容贴边）
```

### 外边距（Margin）
```
hero → metric：40px
metric → bullets：48px
bullets → 下一Block：32px
```

**原则**：Block之间用gap统一控制，Block内部用padding/margin微调

---

## 布局规则

### 每页Block数量限制
- **1个Block**：hero独占页、大图、金句
- **2个Block**：hero + metric/bullets/timeline（最常见）
- **3个Block**：hero + 2个小Block（如metric + bullets）
- **≥4个Block**：❌ 禁止！必须拆页

### Block高度估算（1080p基准）
```
hero（标题）：~200px
metric（3卡片）：~280px
bullets（5条）：~320px
swot（4象限）：~450px
timeline（3节点）：~180px
compare（左右对比）：~350px
chart（图表）：~400px
split（左图右文）：~500px
tabs（标签页）：~400px
okr（3个KR）：~350px
```

**安全高度**：单页所有Block总高度≤850px（留150px呼吸空间）

---

## 动效规范

### 渐进揭示（Fragment）
- **触发方式**：空格键/右箭头
- **动画时长**：300-500ms
- **缓动函数**：ease-out（入场）/ ease-in（退场）
- **适用场景**：bullets列表、timeline节点、tabs切换

### Hover交互
```css
transform: translateY(-6px) scale(1.02);  /* 卡片悬浮 */
box-shadow: 0 12px 40px rgba(0,0,0,.4);   /* 投影加深 */
transition: .3s;                           /* 流畅过渡 */
```

### 数字滚动（GSAP可用时）
- **滚动时长**：1.2s
- **缓动**：`power2.out`
- **触发**：页面切入时自动播放
- **降级**：GSAP不可用时直接显示最终值（无报错）

### 页面切换
- **淡入淡出**：opacity 0→1，500ms
- **位移**：translateX(50px)→0（入场从右）
- **禁用**：快速翻页时禁用动画（防卡顿）

---

## 响应式规则

### 断点（非必需，优先16:9）
- **主屏幕**：1920×1080（100%基准）
- **小屏幕**：1366×768（缩放90%）
- **大屏幕**：3840×2160（4K，缩放150%）

### 降级策略
1. **图表不可用**：显示"图表需要网络加载Chart.js"提示
2. **GSAP不可用**：数字静态显示，不影响功能
3. **字体未加载**：降级到系统字体（sans-serif）

---

## 可访问性（A11y）

### 颜色对比
- ✅ 黄色（#f59e0b）在深蓝背景（#0f172a）上：对比度7.2:1
- ✅ 白色（#ffffff）在深蓝背景上：对比度15.8:1
- ⚠️ 灰色（#94a3b8）在深蓝背景上：对比度5.1:1（最低限度）

### 键盘导航
- **空格/右箭头**：下一个Fragment
- **左箭头**：上一页
- **右箭头**：下一页（无Fragment时）
- **Home/End**：首页/末页

### 屏幕阅读器
- 所有图片需`alt`属性
- 数据图表需`aria-label`描述
- 避免纯色块传递信息（需配合文字）

---

## 设计检查清单

生成deck.js后检查：
- [ ] 单页Block数≤3
- [ ] 数字/标题居中对齐
- [ ] Delta标签不与内容重叠
- [ ] 主题色不超过2种
- [ ] 字号层级清晰（大→小有节奏）
- [ ] Block间距统一（40-48px）
- [ ] 长文本有行高支撑（line-height≥1.5）
- [ ] hover态正常（无错位/闪烁）
- [ ] 离线模式可降级（图表/动画非必需）

---

## 常见错误

### ❌ 配色混乱
```javascript
// 错误：一页3种主题色
blocks: [
  { type: "hero", /* 蓝色标题 */ },
  { type: "metric", /* 黄色数字 */ },
  { type: "bullets", /* 绿色列表点 */ }  // ← 过多！
]
```

### ❌ 字号失衡
```javascript
// 错误：标题比数字还小
{ type: "hero", title: "..." },  // 假设36px
{ type: "metric", value: "999" } // 68px ← 喧宾夺主
```

### ❌ Block堆叠
```javascript
// 错误：5个Block塞一页
blocks: [hero, metric, bullets, timeline, compare] // ← 必然溢出
```

### ✅ 正确示例
```javascript
// 正确：2个Block，主次分明
{
  title: "产品定位",
  layout: "center",
  blocks: [
    { type: "hero", kick: "01", title: "锁定智慧卫生间" },
    { type: "metric", items: [/* 3个数据卡片 */] }
  ]
}
```

---

## 参考资源

- **配色工具**：https://coolors.co （调色板生成）
- **对比度检查**：https://contrast-ratio.com
- **字体配对**：Inter/SF Pro Display（无衬线）+ Georgia（衬线，用于引用）
- **动效参考**：Apple Keynote、Pitch.com

---

**更新时间**：2026-01-20
**维护者**：Interactive Narrative Deck Skill
