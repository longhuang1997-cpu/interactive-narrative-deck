# Quick Demo - 3分钟战略汇报示例

这是一个**最小可运行示例**，演示 Interactive Narrative Deck 的核心能力。

## 🎯 这个Demo展示了什么

7页完整汇报流程，覆盖所有核心Block：

1. **封面** (`hero`) - 标题卡 + 金色分割线
2. **核心指标** (`metric`) - 3个KPI + 数字滚动动效 + 同比增长
3. **问题分析** (`bullets`) - 逐条渐进揭示（演讲节奏）
4. **方案对比** (`compare`) - 左右VS布局
5. **趋势图表** (`chart`) - 折线图 + Chart.js实时渲染
6. **时间线** (`timeline`) - Q4行动路线图
7. **金句收尾** (`quote`) - 引用 + 出处

## ⚡ 3步运行（<1分钟）

```bash
# 1. 进入这个目录
cd examples/quick-demo

# 2. 双击 index.html（或用浏览器打开）
# Windows: start index.html
# macOS: open index.html

# 3. F11全屏，左右键翻页，空格键逐条揭示
```

## 🎮 键盘控制

| 按键 | 功能 |
|------|------|
| **←→ 方向键** | 翻页（支持翻页笔） |
| **空格** | 渐进揭示（逐个显示block） |
| **O键** | 总览模式（缩略图） |
| **F11** | 全屏 |
| **Home/End** | 跳到首页/末页 |

## 📝 修改这个Demo

打开 `deck.js`，找到 `window.NARRATIVE_DECK`：

```javascript
window.NARRATIVE_DECK = {
  theme: {
    blue: "#38bdf8",  // 改这里 = 改主色调
    gold: "#f59e0b",  // 改这里 = 改强调色
    bg: "#0f172a"     // 改这里 = 改背景色
  },
  slides: [
    // 每个对象 = 一页
    {
      title: "第1页标题",
      layout: "center",  // center / left / grid / scroll
      blocks: [
        // 每个block = 一个组件
        { type: "hero", title: "改成你的标题" }
      ]
    }
  ]
};
```

## 📊 数据来自哪里？

**这是虚构数据**，仅用于演示视觉效果。

实际使用时：
1. 从你的业务系统导出数据
2. 或用 Claude 根据你的描述生成
3. 或直接在 `deck.js` 里手写

## 🔗 进阶示例

完整项目请看：
- `templates/` - 带完整注释的7页业务复盘（更详细）
- `SKILL.md` - 所有Block组件的API文档
- `README.md` - 完整使用指南

## ❓ 常见问题

**Q: 图表不显示？**  
A: 检查网络（需加载Chart.js CDN）。离线使用需下载Chart.js到本地。

**Q: 数字不滚动？**  
A: 检查GSAP CDN。没有GSAP会降级到CSS动画（仍可用，只是不平滑）。

**Q: 能改成横版/竖版？**  
A: 改 `engine/style.css` 里的 `--nd-width` 和 `--nd-height`。

**Q: 能导出PDF吗？**  
A: 浏览器打印（Ctrl+P）→ 保存为PDF。建议每页单独打印。

---

**制作**: 2分钟 | **修改**: 改deck.js即可 | **部署**: 单文件HTML，拖到服务器就行