# Changelog

All notable changes to Interactive Narrative Deck will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2026-08-21

### Added
- **鱼骨图（Fishbone）** - 6M方法论根因分析，支持点击展开详情
- **BCG矩阵（BCG Matrix）** - 波士顿矩阵业务组合分析，气泡图可视化
- **看板（Kanban）** - 敏捷任务管理，支持卡片展开/收起，单行水平布局
- 完整的examples索引页（`examples/README.md`）
- 演示截图目录结构（`docs/images/`）

### Changed
- **甘特图优化** - 移除滚动条，任务条不超出时间轴，画布自适应铺满
- **看板布局** - 从多行换行改为单行水平布局，列宽固定260px居中显示
- **鱼骨图排版** - 增大字体，标签框加宽，数字不超出框，整体居中不超出画布
- 重写README为用户友好版本，添加演示截图占位符
- 优化examples目录结构，删除重复的`advanced-blocks-demo`

### Fixed
- 修复CSS中看板样式重复定义导致的grid覆盖flex布局问题
- 修复鱼骨图business-blocks.js中多余的`});`导致语法错误
- 修复鱼骨图鱼头问题框超出viewBox右边界问题
- 修复甘特图任务条可能超出时间轴范围的边界检查

### Documentation
- 新增面向用户的完整README（包含演示、快速开始、API参考）
- 新增CHANGELOG版本历史文档
- 优化.gitignore，排除临时文件和IDE配置

## [3.0.0] - 2026-01-20

### Added
- **知识层架构** - 将汇报经验萃取为AI可调用的知识文件
  - `narrative-patterns.md` - 6大叙事框架决策树
  - `block-reference.md` - 18种Block完整API文档
  - `visual-design-rules.md` - 视觉规范（配色/字体/间距）
  - `anti-patterns.md` - 11种反模式检测清单
- **专业Block** 
  - SWOT分析矩阵（优势/劣势/机会/威胁）
  - OKR目标管理树状图
  - 甘特图项目时间线
- **自定义Block**
  - code（代码展示）
  - split（左图右文）
  - grid（网格卡片）
- **质量检查** - 11种反模式自动检测（幻觉数据、配色混乱、内容过载等）

### Changed
- 架构重构：四层设计（主控层/知识层/规范层/执行层）
- 视觉规范系统化：配色、字体、间距、动效统一标准

### Documentation
- 完整的knowledge目录文档（4个新增文件）
- 项目架构说明
- Block API完整文档

## [2.3.0] - 2025-12-15

### Added
- 基础Block（9种）：hero, metric, bullets, compare, timeline, quote, chart, media, tabs
- 核心演示引擎（基于GSAP动画）
- 基础配置UI工具

### Features
- 键盘快捷键控制
- 响应式布局
- 动画渐进揭示
- CDN依赖（GSAP + Chart.js）

---

## 版本号规则

遵循语义化版本 (Semantic Versioning)：

- **主版本号(Major)** - 架构重构、不兼容的API变更
- **次版本号(Minor)** - 新增功能、新增Block
- **修订号(Patch)** - Bug修复、文档更新

---

[3.1.0]: https://github.com/yourname/interactive-narrative-deck/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/yourname/interactive-narrative-deck/compare/v2.3.0...v3.0.0
[2.3.0]: https://github.com/yourname/interactive-narrative-deck/releases/tag/v2.3.0
