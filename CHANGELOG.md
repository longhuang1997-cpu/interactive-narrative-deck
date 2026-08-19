# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
