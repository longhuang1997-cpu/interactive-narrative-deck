# SWOT Block 测试清单

## 浏览器测试

### ✅ 基础渲染
- [ ] 打开 `examples/swot-demo/index.html`
- [ ] 6页内容正常显示
- [ ] P3的SWOT矩阵是2x2布局，4个象限清晰
- [ ] 4象限配色正确：绿色（优势）、红色（劣势）、蓝色（机会）、橙色（威胁）

### ✅ 交互功能
- [ ] 左右键翻页正常
- [ ] P4按空格键，战略方向逐条显示（渐进揭示）
- [ ] 鼠标悬停SWOT象限，有上浮动效
- [ ] 按O键进入总览模式，能看到所有页面缩略图
- [ ] 按F11全屏演示

### ✅ 内容完整性
- [ ] P1：封面（Q3战略复盘）
- [ ] P2：3个关键数据（营收/留存率/新签客户）
- [ ] P3：SWOT矩阵
  - Strengths：4条优势
  - Weaknesses：4条劣势
  - Opportunities：4条机会
  - Threats：4条威胁
  - 底部图例显示
- [ ] P4：Q4战略方向（4条SO/ST/WO/WT策略）
- [ ] P5：时间线（4个里程碑）
- [ ] P6：金句收尾

### ✅ 动画效果
- [ ] SWOT列表项逐条淡入（stagger动画）
- [ ] P2数字卡有滚动动效
- [ ] 翻页有淡入动画

### ✅ 响应式
- [ ] 调整浏览器窗口，布局自适应
- [ ] 小窗口时SWOT矩阵变为单列（移动端）

---

## 代码自检

### ✅ JavaScript
- [ ] `business-blocks.js` 正确加载
- [ ] BlockRegistry.register('swot', ...) 注册成功
- [ ] deck.js 中的 type: 'swot' 被识别
- [ ] 控制台无报错（F12查看）

### ✅ CSS
- [ ] `style.css` 包含 `.nd-swot-*` 样式
- [ ] 4象限CSS变量 `--quad-color` 生效
- [ ] 动画 `@keyframes swotItemIn` 正常

### ✅ 文件结构
```
examples/swot-demo/
├── index.html        ✅ 引用正确路径（../../engine/）
├── deck.js           ✅ 6页slide定义完整
└── README.md         ✅ 使用说明清晰
```

---

## 边界测试

### ✅ 空状态
修改 `deck.js` 临时测试：
```javascript
strengths: []  // 空数组
```
预期：显示"暂无数据"灰色文字

### ✅ 长文本
```javascript
strengths: ['这是一条非常非常非常长的优势描述，测试文本换行和布局是否正常']
```
预期：文本自动换行，不溢出

### ✅ 隐藏图例
```javascript
showLegend: false
```
预期：底部图例不显示

---

## 跨浏览器测试

- [ ] Chrome/Edge（主要）
- [ ] Firefox
- [ ] Safari（macOS）

---

## 集成测试

### ✅ 在真实演示中使用
1. 准备自己的SWOT数据
2. 复制 `swot-demo/deck.js`
3. 修改4个数组内容
4. 双击 `index.html` 预览
5. F11全屏演示给同事

---

## 性能测试

- [ ] 首次加载时间 < 2秒
- [ ] 翻页流畅无卡顿
- [ ] 浏览器内存占用正常

---

## 已知限制

1. **CDN依赖**：GSAP/Chart.js需要网络，离线环境会降级
2. **桌面优先**：移动端仅供预览，不适合手机演示
3. **浏览器要求**：现代浏览器（Chrome 90+, Edge 90+, Firefox 88+）

---

## 下一步

- [ ] 测试完成后，在真实汇报场景中使用
- [ ] 收集用户反馈
- [ ] 开发下一个专业Block（OKR树/甘特图/漏斗分析）

---

**测试时间**：2026-08-19  
**版本**：business-blocks.js v1.0.0
