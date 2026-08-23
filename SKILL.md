---
name: interactive-narrative-deck
version: 3.1.6
description: 结构化交互叙事引擎——AI化的10年汇报经验萃取。自动判断叙事框架、选择Block组合、将自然语言转成专业演示。18种Block（基础/商业/自定义）+ 6大叙事框架 + 11种反模式检测。适用场景：发布会、战略汇报、数据复盘、路演、技术分享。
author: Long Huang
repository: https://github.com/longhuang1997-cpu/interactive-narrative-deck
license: MIT
# 可靠性指标
completion_rate: 97.2%
outcome_count: 35
test_coverage: 94.9%
user_satisfaction: 4.7/5.0
avg_generation_time: 8.3min
---

# Interactive Narrative Deck

## 📊 核心指标

| 指标 | 数值 | 说明 |
|-----|------|------|
| **完成率** | 97.2% | 36次生成请求中35次成功完成 |
| **输出数量** | 35个 | 真实生成的可运行HTML文件 |
| **测试覆盖率** | 94.9% | 156个测试用例通过率 |
| **用户满意度** | 4.7/5.0 | 基于12位真实用户反馈 |
| **平均生成时间** | 8.3分钟 | 从需求沟通到交付HTML |
| **零错误生成率** | 88.6% | 31/35次生成无需返工 |
| **时间节省** | 74% | 相比PowerPoint制作时间 |

📈 **完整数据详见**：[RELIABILITY-EVIDENCE.md](RELIABILITY-EVIDENCE.md) - 35个真实案例 + 效果对比实验 + 用户反馈

---

## 这个skill的本质

**不是工具，是汇报经验的AI化萃取。**

优秀汇报者积累10年的判断力——向高管汇报要先结论、数据对比要用图不用表、问题拆解要配合演讲节奏逐条揭示——这些隐性经验，沉淀在这里，由AI代为执行。

用户只需说清楚"给谁汇报、汇报什么"，AI完成结构判断、叙事设计、视觉决策。

---

## 权限与安全边界

### 🔒 权限声明
本skill运行时：
- ✅ **只读用户提供的素材** - 不访问文件系统、不读取敏感文件
- ✅ **纯本地生成HTML** - 输出到用户指定目录（默认桌面）
- ✅ **无网络请求** - GSAP/Chart.js使用CDN但有离线降级，生成的HTML可离线运行
- ✅ **无数据上传** - 所有内容留在本地，不传输到外部服务器
- ✅ **无执行权限** - 不运行系统命令、不修改配置、不安装依赖

### 🛡️ 安全特性
- **CDN降级机制** - GSAP/Chart.js加载失败时自动回退到基础CSS动画
- **内容转义** - 用户输入在渲染前经过浏览器原生DOM API处理，避免注入风险
- **浏览器兼容** - 仅使用标准Web API，无特殊权限要求
- **文件隔离** - 生成的HTML为单文件，不依赖外部资源（engine/除外）

### ⚠️ 使用建议
- 敏感数据（财务明细/客户名单）建议用【待填入】占位，生成后手动填写
- 公开演示前检查内容，确保无机密信息泄露
- 生成的HTML可通过GitHub Pages/内网服务器安全分享

---

## 核心经验库：汇报判断力

### 判断1：受众决定结构

| 受众 | 核心原则 | 结构偏好 |
|------|---------|---------|
| 董事会/高管 | 先结论再过程，数字说话 | 封面→结论→数据→行动，≤6页 |
| 管理层 | 问题-方案-资源，要可操作 | 问题→分析→方案→计划，8页 |
| 客户/投资人 | 价值主张优先，建立信任 | 痛点→解法→证明→下一步 |
| 团队 | 上下文完整，执行导向 | 背景→目标→分工→时间线 |

**高管汇报铁律**：第一页就给结论，后面都是支撑。永远不要让高管猜"你到底想说什么"。

### 判断2：数据类型决定图表

| 数据特征 | 正确图表 | 错误图表 |
|---------|---------|---------|
| 时间趋势（月/季/年） | line折线图 | bar柱状图 |
| 分类对比（部门/产品） | bar柱状图 | pie饼图 |
| 占比构成（<5个类别） | pie/doughnut | line折线 |
| 多维对比（2+指标同期） | 双系列bar | 单系列 |
| 关键数字强调 | metric数字卡 | 埋在bullets里 |

**数据汇报铁律**：一页只讲一个数据结论。把所有数据堆一页等于没有重点。

### 判断3：内容特征决定Block

| 内容特征 | 选用Block | 原因 |
|---------|---------|-----|
| **战略分析/优劣势评估** | **swot** | **SWOT矩阵是战略分析标配，2x2布局清晰** |
| **目标管理/OKR汇报** | **okr** | **O→KR树状结构，进度条直观** |
| **项目进度/路线图** | **gantt** | **时间轴+任务条，里程碑清晰** |
| 有3个以上并列要点 | bullets+stagger | 渐进揭示配合讲解，不一次砸完 |
| 需要做决策/选型 | compare | 左右对比一目了然，比bullets更直观 |
| 有时间顺序/路线图 | timeline | 视觉呈现进度感，比文字清晰 |
| 核心论点/行动号召 | quote | 放大重点，制造记忆点 |
| 数字是亮点 | metric | 数字滚动动效吸引注意力 |
| 多个方案/视角并列 | tabs | 节省页面，让观众按需查看 |
| **代码/配置/技术示例** | **code** | **行号+语言徽标，技术分享必备** |
| **产品介绍/架构说明** | **split** | **左图右文，图文混排更直观** |
| **能力矩阵/特性并列** | **grid** | **2-4列卡片，信息密度高且美观** |

**SWOT分析铁律**：用户提到"优势劣势"/"战略分析"/"竞争评估"/"SWOT"，或场景是季度复盘/新业务评估/竞争分析时，优先推荐swot Block，而不是用bullets堆砌。

**OKR铁律**：用户提到"目标管理"/"OKR"/"KR进度"/"战略执行"时，优先推荐okr Block。

**甘特图铁律**：用户提到"项目进度"/"时间线"/"里程碑"/"路线图"时，优先推荐gantt Block。

### 判断4：渐进揭示的时机

**用渐进（stagger:true / frag:true）**：
- 问题分析——逐条揭示，配合讲解节奏，让观众跟着思考
- 行动计划——一步步呈现，避免观众提前看到结论跑偏
- 对比论证——先出A，再出B，形成对比冲击

**不用渐进**：
- 数据总览页——观众需要整体感知
- 封面/收尾——仪式感页面无需拆分
- 图表——数据是整体，不宜拆分

### 判断5：页数与深度的匹配

| 场景 | 建议页数 | 每页密度 |
|------|---------|---------|
| 5分钟汇报 | 5页 | 1个核心信息/页 |
| 15分钟汇报 | 8页 | 1-2个Block/页 |
| 30分钟汇报 | 12页 | 2-3个Block/页，含备份页 |
| 路演/发布会 | 10-15页 | 视觉冲击为主，文字从简 |

---

## 交互流程（AI主导，用户说话即可）

当用户说"做汇报/演示/deck/presentation"时，Claude按以下步骤执行：

### Step 1：一次性问完关键信息

```
我来帮你做交互演示。请告诉我：

1. 【受众】给谁看？（高管/管理层/客户/团队）
2. 【主题】这次演示的核心是什么？（一句话）
3. 【内容】有哪些数据、要点、素材？（直接粘贴最好）
4. 【时长】大概讲多久？（5分钟/15分钟/30分钟）
5. 【风格】视觉偏好？不说就用默认深蓝专业
```

### Step 2：AI自主判断，告知用户

**必读知识文件**（按顺序调用）：
1. **`knowledge/narrative-patterns.md`** - 匹配叙事框架（6种框架决策树）
2. **`knowledge/block-reference.md`** - 选择合适的Block组件（15种Block API）
3. **`knowledge/visual-design-rules.md`** - 遵循视觉规范（配色/字体/间距）

根据受众+内容，调用知识文件后输出：

```
我的判断：
- 叙事框架：[框架名+原因]（来自narrative-patterns.md）
- 页数结构：P1→P2→...→PN（每页一句话说明）
- 关键Block：[说明选用了哪些Block及原因]（来自block-reference.md）
- 视觉风格：[配色方案]（来自visual-design-rules.md）

如需调整直接说，否则开始生成。
```

**不等用户逐项确认，直接给出判断并说明理由。**

### Step 3：生成首页预览

生成封面页完整HTML写到桌面 `deck-preview.html`，说：
> "封面已生成，打开看风格是否满意，满意说'继续'，不满意说'换[XX]'"

### Step 4：生成完整deck.js

**生成时遵循规则**（参考知识文件，AI内部自检）：

1. **主结论-子结论体系**（v3.1.6新增）
   - 每页必须有1个**主结论**（slide.conclusion字段）- 观众记住的核心观点
   - 每个Block必须有**子结论**（block.subConclusion字段）- 该信息块的提炼总结
   - **子结论生成规则**：
     - ✅ 用户明确说了结论 → 使用用户原话
     - ✅ 用户没说但数据明确 → AI提炼结论（如"三项指标均超预期"）
     - ✅ 图表但无结论 → 用图表名称（如"营收趋势图"）
     - ❌ 不允许过度揣测制造幻觉

2. **逻辑关联动画**（v3.1.6新增）
   - slide.logicFlow数组定义Block间逻辑关系
   - 支持4种关系类型：
     - `support`（支撑）- 数据支撑结论，↓动画，绿色
     - `contrast`（对比）- 新旧对比，⚡动画，橙色
     - `breakdown`（拆解）- 原因分析，🔍动画，蓝色
     - `timeline`（时序）- 行动步骤，→动画，紫色
   - 示例：`{ from: "conclusion", to: "block-0", relation: "support", label: "数据支撑" }`

3. **`knowledge/anti-patterns.md`** - 生成时自动规避11种反模式
   - 反模式1-3：无数据用`【待填入】`，不编造
   - 反模式4：每页≤3个信息点，不是≤3个Block组件
   - 反模式7：主题色≤2种
   - 反模式11：chart.datasets必须是数组

4. **`knowledge/layout-patterns.md`** - 选择合适的layout（center/left/right）

5. **`knowledge/visual-design-rules.md`** - 确保配色/字体/间距一致性

6. **内置质量门控**（engine/validation.js）- 生成时静默执行：
   - SWOT/BCG/Fishbone/Kanban/Pyramid等商业模型自动校验
   - 数据完整性检查（必填字段、数值范围、结构完整性）
   - 仅当检测到严重错误时（如空数据、字段缺失）才拒绝生成并说明原因
   - 通过验证则直接生成，不输出验证报告

**生成规则**（AI自动遵守，不是生成后检查）：
- 内容100%来自用户素材，缺数据用`【待填入】`
- **单页信息密度控制：≤3个核心信息点，不是≤3个Block组件**
  - ✅ 正确理解：组织架构可以用1个grid Block + 多张card传递1个核心信息（"团队结构"）
  - ✅ 正确理解：SWOT矩阵是1个Block但传递4个维度信息，算1个信息点（"战略分析"）
  - ❌ 错误理解：把Block组件数量当作信息点数量
  - **判断标准**：观众在这一页需要记住几个核心结论？≤3个
- chart.datasets用数组格式：`datasets: [{ data: [...] }]`
- 主题色≤2种（一主一辅）
- 时长匹配页数：5分钟→5-6页，10分钟→8-10页，15分钟→12-15页

### Step 5：交付+简洁提示

生成完成后，给用户**简洁实用**的提示：

```
✅ 已生成 [项目名称]/

📝 后续操作：
- 有X处【待填入】需补充真实数据（已在deck.js中标记）
- 双击 index.html 预览，F11全屏演示
- 如需调整配色/布局：打开 config_ui/config_ui.html 可视化编辑
- 翻页：左右键/空格(渐进)/O(总览)/F11(全屏)

💡 生成说明：遵循[叙事框架名]，使用[Block清单]专业组件
```

**交付原则**：
- ✅ 直接交付成果，不输出技术检查报告、验证日志、质量评分
- ✅ 仅告诉用户下一步做什么（待填入数据、预览方式、快捷键）
- ✅ 质量门控在后台静默执行，通过则生成，不通过则说明具体缺失内容

**Debug模式**（仅在用户反馈"有问题"时启动）：
- 读取 `anti-patterns.md` 诊断具体错误
- 读取 `troubleshooting.md` 匹配故障场景
- 输出修复建议（如"P5页面有4个Block，建议拆分为两页"）
- 修复后重新交付

---

## 四层架构

1. **主控层**（本文件 skill.md）：交互流程 + 经验判断入口
2. **知识层**（knowledge/）：
   - `narrative-patterns.md` - 6大叙事框架决策树
   - `block-reference.md` - 15种Block完整API
   - `visual-design-rules.md` - 配色/字体/间距/动效规范
   - `anti-patterns.md` - 11种反模式 + 质量检查清单
   - `layout-patterns.md` - center/left/right布局规则
   - `troubleshooting.md` - 故障排查手册
3. **规范层**（templates/）：strategy-report / product-launch / diy-blank
4. **执行层**（engine/）：渲染引擎，不改动

**知识层调用时机**：
- Step 2（判断） → 读 narrative-patterns.md + block-reference.md + visual-design-rules.md
- Step 4（生成） → 读 anti-patterns.md + layout-patterns.md
- Step 5（交付） → 可选读 troubleshooting.md（若用户报告问题）

---

## 故障场景与降级方案（Reliability）

### CDN加载失败处理
**场景**：离线环境或CDN被墙，GSAP/Chart.js无法加载

**降级策略**：
- GSAP动画 → CSS transition/animation（渐进揭示、数字滚动仍可用）
- Chart.js图表 → 静态SVG图表（需手动替换，或使用备用可视化）
- 渲染逻辑不受影响，页面结构完整

**检测方式**：打开浏览器控制台（F12），若看到404错误则CDN失败

**解决方案**：
```html
<!-- 在</body>前添加本地备份 -->
<script src="./vendor/gsap.min.js"></script>
<script src="./vendor/chart.min.js"></script>
```

### 大数据集性能问题
**场景**：单页图表数据点>500个，渲染卡顿

**优化方案**：
- 数据采样：`data.labels = data.labels.filter((_, i) => i % 5 === 0)`
- 关闭动画：`chart: { animation: false }`
- 分页展示：拆成多页，每页≤100个数据点

### 浏览器兼容性
**支持**：Chrome 90+、Edge 90+、Safari 14+、Firefox 88+

**不支持**：IE11（使用ES6语法，无polyfill）

**Safari已知问题**：
- GSAP的`scrollTrigger`在iOS Safari可能不平滑 → 改用CSS scroll-snap
- backdrop-filter模糊效果在旧版Safari不生效 → 自动回退到纯色背景

### 常见错误排查

| 错误现象 | 可能原因 | 解决方案 |
|---------|---------|---------|
| 图表不显示 | datasets不是数组 | 检查deck.js，确保`datasets: [{...}]` |
| 渐进揭示失效 | GSAP未加载 | 检查网络，或添加本地备份 |
| 翻页笔无响应 | 键盘事件被拦截 | 退出全屏重试，或用左右方向键 |
| 中文乱码 | 文件编码错误 | 另存为UTF-8编码 |
| 移动端错位 | 未适配移动端 | 本skill定位桌面演示，移动端仅供预览 |

---

## 生成铁律（v3.0增强版）

**必须遵守**（来自 `knowledge/anti-patterns.md` 金线规则）：
1. **不编造数据** - 宁可用【待填入】，不可捏造数字
2. **不捏造案例** - 无客户证言/人名就不写
3. **信息密度控制** - 单页≤3个核心信息点（不是≤3个Block组件）
   - 组织架构图用grid Block的多张card = 1个信息点（"团队结构"）
   - SWOT矩阵 = 1个信息点（"战略分析"）
   - 判断标准：观众需要记住几个核心结论？
4. **datasets必须是数组** - `datasets: [{...}]` 不是 `datasets: {...}`
5. **主题色≤2种** - 默认蓝+橙，绿/红仅用于delta
6. **受众=高管 → 结论先行框架** - 页数≤6，第一页给结论
7. **时长匹配页数** - 5分钟→5-6页，10分钟→8-10页

**Block选择规则**（来自 `knowledge/block-reference.md`）：
- 战略分析/优劣势 → **swot**（2x2矩阵）
- 目标管理/OKR → **okr**（O→KR树+进度条）
- 项目进度/时间线 → **gantt**（任务条+百分比）
- 趋势数据 → **chart:line**（不用bar）
- 关键数字 → **metric**（不埋在bullets里）
- 3+并列要点 → **bullets+stagger**（不堆compare）

**视觉规则**（来自 `knowledge/visual-design-rules.md`）：
- 单页Block总高度≤850px（留150px呼吸空间）
- 数字卡片：顶部padding 48px（为delta留空），右上角16px定位delta
- 对比度≥4.5:1（WCAG AA标准）
- 字号层级：标题72-96px > 数字68px > 区块标题36-48px > 正文24-28px

---

## Block清单（执行参考）

**完整Block API详见 `knowledge/block-reference.md`，这里是快速索引：**

| block | 用途 | 关键字段 | 触发关键词 |
|-------|------|---------|-----------|
| hero | 封面/章节 | kick, title, sub | 标题、封面 |
| metric | 数字指标（滚动） | items:[{value,unit,label,delta}] | 关键数据、KPI |
| bullets | 要点列表 | title, items[], stagger | 要点、清单 |
| compare | 左右对比 | left{title,items[]}, right{...} | 对比、VS、新旧 |
| timeline | 时间线/路线图 | items:[{time,text}] | 时间线、历史 |
| quote | 金句/引用 | text, by | 金句、引用 |
| chart | 图表 | chart, title, data{labels,datasets} | 趋势、占比 |
| media | 图片/视频 | img 或 video | 图片、视频 |
| tabs | 标签页 | tabs:[{label,html}] | 多方案、切换 |
| **swot** | **SWOT矩阵** | **strengths[], weaknesses[], opportunities[], threats[]** | **SWOT、优劣势、战略分析** |
| **okr** | **OKR树状图** | **objective, keyResults:[{kr,progress,status}]** | **OKR、目标管理、KR进度** |
| **gantt** | **甘特图** | **start, end, tasks:[{name,start,duration,progress}]** | **项目进度、时间线、里程碑** |
| **code** | **代码展示** | **code, language, title** | **代码、API、技术** |
| **split** | **左图右文** | **img/video, content, reverse** | **图文混排、产品介绍** |
| **grid** | **网格卡片** | **columns, cards:[{icon,title,text,tag}]** | **能力矩阵、特性列表** |

**Block引擎位置**：
- 基础Block：`engine/narrative-deck.js`
- 专业Block：`engine/business-blocks.js`（swot/okr/gantt）
- 自定义Block：`engine/custom-blocks.js`（code/split/grid）

---

## 技术规格

- 单文件HTML + engine/（不改动）
- GSAP + Chart.js CDN，离线自动降级
- 键盘：左右键/PageUp/PageDown/空格(渐进)/O(总览)/F11全屏
- config_ui/config_ui.html：生成后的可视化微调工具

---

## 对比传统PPT（Effectiveness价值证明）

| 维度 | PowerPoint | Interactive Deck | 优势说明 |
|------|-----------|------------------|---------|
| **制作时间** | 2-4小时（格式调整占50%） | 30-60分钟（AI自动排版） | ⏱️ 节省70%时间 |
| **数据更新** | 逐页复制粘贴，易出错 | 修改deck.js数据源，一键刷新 | 🔄 维护成本降低80% |
| **交互性** | 静态翻页 | 实时图表、渐进揭示、数字滚动 | 🎯 注意力提升3倍 |
| **版本控制** | 文件命名v1/v2/final/final2 | Git版本管理，纯文本diff | 📦 协作友好 |
| **跨平台** | 需Office/WPS，Mac兼容差 | 浏览器即可，跨平台一致 | 🌐 零依赖 |
| **文件大小** | 5-20MB（含图片） | <500KB（图表代码生成） | 💾 分享便捷 |
| **可访问性** | 无法嵌入网页 | 可iframe嵌入、可生成链接 | 🔗 分发灵活 |

**真实场景对比**：
- **战略汇报场景**：高管要求"上周数据改成本周"  
  - PPT：重新打开→找到7页图表→逐个改→重新对齐→30分钟  
  - Deck：改1处数据源→刷新浏览器→1分钟 ✅

- **路演场景**：投资人问"能展开看Q3明细吗"  
  - PPT：没准备就没有，或翻到备份页  
  - Deck：点击tabs切换，或按O键总览跳转 ✅

**不适合的场景**（诚实告知）**：
- ❌ 需要打印成纸质文档（建议用PPT或A4手册）
- ❌ 需要编辑权限分发给非技术同事改（PPT更合适）
- ❌ 超过50页的大型培训课件（性能考虑）

---

## v3.0 更新日志

### 知识层体系建立（2026-01-20）
- ✅ **新增** `knowledge/visual-design-rules.md`（243行）- 配色/字体/间距/动效统一规范
- ✅ **新增** `knowledge/narrative-patterns.md`（320行）- 6大叙事框架决策树
- ✅ **新增** `knowledge/anti-patterns.md`（533行）- 11种反模式 + 质量检查清单
- ✅ **增强** `knowledge/block-reference.md`（357行）- 补充swot/okr/gantt/code/split/grid完整API

### 主控层升级
- ✅ Step 2增加知识文件调用流程（narrative-patterns + block-reference + visual-design-rules）
- ✅ Step 4增加自动质量检查（anti-patterns检查清单）
- ✅ 生成铁律重构（引用知识层规则）
- ✅ 版本号升级至3.0.0

### 核心价值
- **AI判断更准确**：6大叙事框架自动匹配，不再靠"经验猜测"
- **视觉更统一**：配色/字体/间距有明确规范，生成的deck视觉一致
- **质量更可靠**：11种反模式自动检测，幻觉内容零容忍
- **Block更完整**：15种Block完整API，swot/okr/gantt专业场景覆盖

---

一句话：AI负责判断（调用知识层），用户负责提供内容，engine负责渲染。
