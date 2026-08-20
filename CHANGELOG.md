# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-01-20

### 🎯 Major Update: 知识层体系建立

**核心变化**：从"经验内嵌"升级为"知识文件驱动"，删除过度设计的质量报告

### Added

#### 新增知识文件（4个）
- ✅ **knowledge/visual-design-rules.md**（243行）
  - 配色系统（主色/辅色/语义色/对比度检查）
  - 字体层级（标题/数字/区块/正文/辅助/代码）
  - 间距系统（页面边距/Block间距/段落间距/卡片内边距）
  - 动效规则（渐进揭示/数字滚动/hover交互）

- ✅ **knowledge/narrative-patterns.md**（320行）
  - 6大叙事框架决策树
    1. 结论先行（高管/董事会）
    2. 价值主张优先（客户/投资人）
    3. OKR进展汇报（团队/季度复盘）
    4. 产品发布叙事（发布会/路演）
    5. 问题-方案架构（管理层/项目汇报）
    6. 通用三段式（教学/培训）
  - 受众+场景自动匹配规则

- ✅ **knowledge/anti-patterns.md**（533行）
  - 11种反模式检测（幻觉/内容过载/图表错误/配色混乱等）
  - 生成时规则（不是生成后检查）
  - 降级策略（CDN失败/大数据集/浏览器兼容）
  - 金线规则（不可妥协的7条铁律）

- ✅ **knowledge/block-reference.md 增强**（357行）
  - 补充swot/okr/gantt完整API
  - 补充code/split/grid自定义Block
  - 新增触发关键词列表
  - 新增Block引擎位置索引

#### 主控层升级（skill.md）
- ✅ Step 2增加知识文件调用流程
  - 读取 narrative-patterns.md 匹配框架
  - 读取 block-reference.md 选择Block
  - 读取 visual-design-rules.md 确定视觉规范

- ✅ Step 4重构：生成时规则（删除Step 4.5质量报告）
  - anti-patterns.md改为AI生成时内部参考，不是生成后检查
  - 删除过度设计的技术报告输出
  - 改为简洁用户提示（X处待填入/下一步操作）

- ✅ Step 5简化：用户友好提示
  - 只告诉用户"有几处待填入"+"下一步怎么做"
  - 不输出技术细节（datasets格式/Block数量等）
  - 新增Debug模式（仅在用户反馈"有问题"时启动）

- ✅ 生成铁律重构
  - 从口头描述变为引用知识层规则
  - 增加视觉规则（单页高度≤850px/数字卡片padding规范/对比度标准）

#### 文档完善
- ✅ README.md 重写（v3.0架构说明）
- ✅ 版本号升级至3.0.0
- ✅ CHANGELOG.md 新增本条目

### Changed

#### Block清单优化
- 从9种基础Block扩展到15种（+swot/okr/gantt/code/split/grid）
- 新增"触发关键词"列，方便AI快速匹配
- 新增"Block引擎位置"索引

#### 四层架构明确化
```
主控层 (skill.md) 
  ↓ 调用
知识层 (knowledge/) - 新增4个文件
  ↓ 指导
规范层 (templates/)
  ↓ 调用
执行层 (engine/)
```

#### 交互流程优化
- **删除**：Step 4.5质量检查报告（过度设计）
- **改进**：anti-patterns.md从"检查清单"变为"生成规则"
- **简化**：交付时只给用户实用提示，不输出技术报告
- **新增**：Debug模式（仅在故障时启动诊断）

### Removed

- ❌ 删除Step 4.5自动质量检查报告（原因：过度设计，用户不需要技术细节）
- ❌ 删除质量报告输出模板（datasets格式/Block数量检查等技术报告）

### Fixed

#### 布局与Block优化
- ✅ Metric卡片布局问题（delta右上角定位）
- ✅ SWOT分析完整API实现
- ✅ OKR进度汇报（O→KR树+进度条）
- ✅ 甘特图时间线（任务条+百分比）

### Impact

**AI判断更准确**：
- 之前：靠skill.md内嵌经验，不稳定
- 现在：读narrative-patterns.md自动匹配6大框架

**视觉更统一**：
- 之前：口头描述配色/字体，易遗漏
- 现在：visual-design-rules.md明确规范，生成一致

**质量更可靠**：
- 之前：依赖生成后人工检查
- 现在：anti-patterns.md作为生成规则，AI自动遵守

**Block更完整**：
- 之前：9种基础Block，专业场景覆盖不足
- 现在：15种Block，swot/okr/gantt专业场景覆盖

**用户体验更好**：
- 之前：收到技术报告（datasets/Block数量），不知道有什么用
- 现在：收到实用提示（3处待填入/打开index.html预览）

### Migration Guide

**从v2.x升级到v3.0**：
- 无需代码变更，向后兼容
- AI自动调用新知识文件
- 生成质量提升，用户收到的是简洁提示而非技术报告

### Design Philosophy

v3.0设计原则：
1. **质量保障前置** - 生成时遵守规则，不是生成后检查
2. **用户友好输出** - 只告诉用户下一步做什么，不输出技术细节
3. **Debug按需启动** - 仅在故障时诊断，不是常规流程
4. **知识文件驱动** - AI读文件生成，经验可积累可维护

---

## [2.0.0] - 2026-08-19

### Added
- 🎯 **SWOT矩阵Block** - 内置SWOT分析组件，支持四象限独立编辑
- 🎨 **可视化配置工具config_ui** - 拖拽式Block编辑器，实时预览
- 📊 **9种专业Block** - hero/metric/bullets/compare/timeline/quote/chart/media/tabs
- 🧠 **叙事框架引擎** - AI自动匹配4种汇报框架（结论先行/问题驱动/时间线/对比）
- 🎬 **渐进揭示动效** - GSAP驱动的专业过渡动画
- 📱 **响应式布局** - 4种布局模式（center/left/grid/scroll）

### Changed
- ♻️ 重构Block注册机制 - 统一business-blocks.js管理
- 📝 README全面改版 - TRACE五维度优化，目标86.4分
- 🔒 完善安全文档 - 权限清单、数据流向图

### Fixed
- 🐛 修复Chart.js datasets类型错误
- 🐛 修复CDN离线降级逻辑

## [1.0.0] - 2026-07-15

### Added
- 🎉 初始发布
- ✨ 基础Block系统（hero/bullets/chart）
- 📄 单文件HTML输出
- ⌨️ 键盘控制（左右键/空格/O总览）

---

## 版本命名规则

- **Major (x.0.0)** - 重大架构变更、不兼容更新
- **Minor (0.x.0)** - 新增功能、Block类型
- **Patch (0.0.x)** - Bug修复、文档更新

## 即将发布

查看 [产品路线图](docs/PRODUCT_STRATEGY_ROADMAP.md) 了解未来规划。
