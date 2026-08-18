# Interactive Narrative Deck · 结构化交互叙事演示

> 把演讲材料做成"会呼吸"的交互演示——不是翻页 PPT,而是 Block 积木组件 + 渐进揭示 + 数据可视化 + 克制动效,自由组合。对标 Slack Block Kit 的结构化交互与 Figma 的组件/微交互质感。单文件 HTML,浏览器投屏、翻页笔可用、离线降级。

一句话:比 PPT 更活,比游戏更专业——职场正式场合的高级交互演讲。

## 📊 效果对比

| 维度 | 传统PPT | Interactive Deck |
|------|---------|------------------|
| **制作时间** | 2小时（调版式/动画） | 30分钟（改脚本即可） |
| **交互性** | ❌ 只能翻页 | ✅ 渐进揭示+数字滚动+图表生长 |
| **数据图表** | ❌ 静态截图 | ✅ 实时渲染（Chart.js） |
| **版本管理** | ❌ 二进制难diff | ✅ 纯文本Git友好 |
| **现场控制** | ❌ 误操作易穿帮 | ✅ 空格渐进/总览模式 |
| **离线可用** | ✅ | ✅ CDN失败自动降级 |

## 🎯 典型场景

✅ **战略汇报** - 数据指标卡+趋势图+路线图  
✅ **产品发布** - hero封面+对比卡+时间线  
✅ **技术分享** - 代码演示+架构图+要点渐进  
✅ **数据复盘** - metric滚动数字+chart图表+bullets分析

❌ 不适合：一对一汇报（用PPT）、印刷物料（用PDF手册）、传播视频（用Remotion）

## 为什么不是又一个 PPT / 又一个游戏
- 线性翻页 PPT:太静,信息一次砸给观众
- 年会闯关/抽奖:太娱乐,正式场合显不专业
- 本工具:结构化组件(每页是积木组合)+ 渐进叙事(随讲随现)+ 数据会动(数字滚动、图表生长)+ 克制动效

## 能做什么(Block 组件,自由组合)
标题卡 hero / 数据指标卡 metric(数字滚动)/ 要点渐进 bullets / 左右对比 compare / 时间线 timeline / 金句 quote / 数据图 chart(柱线饼)/ 图片视频 media / 标签页 tabs。任意 block 加 frag:true 即随空格渐进揭示。

## ⚡ 3分钟快速开始

```bash
# 1. 复制模板到你的项目目录
cp -r templates/ my-presentation/
cd my-presentation/

# 2. 编辑 deck.js 定义你的内容
# 只需改 window.NARRATIVE_DECK = { theme, slides:[ ... ] }

# 3. 双击 index.html 预览
# F11 全屏 | 左右键翻页 | 空格渐进揭示 | O键总览
```

**零依赖** - 纯HTML，浏览器直接打开  
**离线可用** - CDN失败自动降级到CSS动画

---

## 📚 完整文档

- **[3分钟上手指南](./QUICKSTART.md)** - 从安装到第一个演示
- **[可运行示例 & 验证](./EXAMPLES.md)** - 3个完整Demo + 测试脚本 + 实现细节审计
- **[Block组件参考](./knowledge/block-reference.md)** - 完整API文档
- **[使用场景说明](./CASES.md)** - 典型场景与价值分析
- **[更新日志](./CHANGELOG.md)** - 版本迭代记录  
**翻页笔友好** - PageUp/PageDown/方向键全支持

## 📐 项目结构

```
interactive-narrative-deck/
├── SKILL.md              # Claude skill定义
├── README.md             # 本文档
├── LICENSE               # MIT协议
├── .claude-plugin/
│   └── marketplace.json  # Skill市场元数据
├── engine/
│   ├── engine.js         # 渲染引擎（一般不改）
│   └── style.css         # 视觉样式
└── templates/            # 👈 复制这个文件夹开始你的项目
    ├── index.html        # 主文件（引入CDN+引擎）
    └── deck.js           # 👈 你的演示内容脚本
```

## 💡 核心概念：deck.js脚本结构

```javascript
window.NARRATIVE_DECK = {
  theme: {
    blue: "#2563eb",    // 主色调
    gold: "#e8c874",    // 强调色
    bg: "#0b1220"       // 背景色
  },
  slides: [
    {
      title: "页标题",          // 显示在进度条
      layout: "center",        // center | left | grid | scroll
      blocks: [                // Block积木数组
        { type:"hero", title:"标题", sub:"副标题" },
        { type:"metric", items:[...] },
        { type:"bullets", items:[...], frag:true }  // frag=渐进揭示
      ]
    }
  ]
}
```

## 📦 Block组件API

每个block都是独立组件，可自由组合、加`frag:true`渐进揭示：

```javascript
// 标题卡 - 封面/章节页
{ type:"hero", kick:"章节标", title:"主标题", sub:"副标题" }

// 数据指标 - 数字滚动动画
{ type:"metric", items:[
  {value:"1280", unit:"万", label:"营收", delta:"+18%"}
]}

// 要点列表 - 逐条渐进
{ type:"bullets", title:"标题", stagger:true, items:["要点1","要点2"] }

// 左右对比 - VS场景
{ type:"compare",
  left:{title:"方案A", items:["优点1","优点2"]},
  right:{title:"方案B", items:["优点1","优点2"]} }

// 时间线 - 路线图
{ type:"timeline", items:[{time:"Q1",text:"里程碑"}] }

// 金句引用
{ type:"quote", text:"引用文字", by:"出处" }

// 数据图表 - Chart.js驱动
{ type:"chart", chart:"line|bar|pie|doughnut", 
  title:"图表标题", data:{...Chart.js格式} }

// 图片/视频
{ type:"media", img:"path.jpg" }  // 或 video:"path.mp4"

// 标签页 - 多视角切换
{ type:"tabs", tabs:[{label:"视角1", html:"<p>内容</p>"}] }
```

## 🔧 常见问题

**Q: CDN加载失败怎么办？**  
A: 引擎内置自动降级：GSAP失败→CSS动画、Chart.js失败→提示文字。现场无网可提前下载库文件到本地，改`index.html`里的script src。

**Q: 浏览器兼容性？**  
A: Chrome/Edge/Safari/Firefox现代版本均支持。IE不支持（已退役）。

**Q: 现场演示卡顿？**  
A: 单页block数量建议≤5个，大数据集图表提前优化（采样/聚合）。

**Q: 能导出PDF吗？**  
A: 浏览器打印→另存为PDF。布局已优化打印样式。

**Q: 翻页笔不工作？**  
A: 确认翻页笔映射为PageUp/PageDown或方向键，F11全屏后即可使用。

## 🎨 扩展开发

添加自定义Block组件：

```javascript
// 在 engine/engine.js 的 Blocks 对象里加方法
Blocks.myBlock = function(cfg) {
  const el = document.createElement('div');
  el.className = 'my-block';
  el.innerHTML = `<h3>${cfg.title}</h3>`;
  return el;
}

// deck.js 里直接用
{ type:"myBlock", title:"自定义内容" }
```

## 🛡️ 可靠性保障

**离线降级机制**  
- GSAP CDN失败 → 自动切换CSS动画  
- Chart.js CDN失败 → 显示数据表格文字  
- 无需手动配置，引擎自动检测

**浏览器兼容**  
- ✅ Chrome 90+  
- ✅ Edge 90+  
- ✅ Safari 14+  
- ✅ Firefox 88+

**性能优化**  
- 单页建议≤5个Block  
- 大数据图表自动采样  
- 渐进加载避免卡顿

## 🔐 安全与隐私

- **零服务器** - 纯本地HTML，不上传任何数据  
- **零依赖安装** - CDN库可选，离线可用  
- **零权限** - 不访问文件系统/网络（除CDN）

## 📄 License

MIT License - 自由使用/修改/分发

源自"高能级职场汇报产品"系列，专注职场正式场合的交互演示。

## 技术
- 引擎纯 JS 零构建;GSAP(动效/数字滚动)+ Chart.js(数据图)CDN。
- 离线降级:无网时 GSAP→CSS动画、Chart.js→提示;现场无网可把两库下本地改 script src。
- 键盘/翻页笔:左右键 / PageUp PageDown / 空格(渐进) / Home End / O(总览);进度 localStorage 持久化。

## 扩展
加新 block:在 engine/engine.js 的 Blocks 里加同名方法返回 DOM,即可在 deck.js 用。

## License
MIT。源自"高能级职场汇报产品"矩阵,补齐"高级交互演讲"这一环。