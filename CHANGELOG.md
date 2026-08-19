# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-08-19

### 🔌 架构升级：Block插件化系统

#### Added
- ✨ **BlockRegistry插件注册系统** - 用户可扩展自定义Block无需修改engine.js
  - `BlockRegistry.register(type, renderer, meta)` - 注册新Block
  - `BlockRegistry.render(blockData, index)` - 统一渲染接口
  - `BlockRegistry.has/list/getMeta` - 工具方法
  - 自动错误处理和降级显示
  
- 📦 **核心Block模块化** - 将原engine.js的Blocks拆分为独立文件
  - `engine/block-registry.js` - 插件注册系统
  - `engine/core-blocks.js` - 9个内置Block（hero/metric/bullets等）
  - `engine/custom-blocks.js` - 3个自定义示例（accordion/progress/alert）
  
- 📚 **开发者文档**
  - `docs/BLOCK_EXTENSION_GUIDE.md` - Block扩展开发完整指南
  - `tests/skill-golden-cases.md` - 8个核心场景的Golden Test Cases
  - API参考、完整示例、注意事项

#### Changed
- 🏗️ **engine.js架构优化** - 从1200行精简至300行
  - 移除Blocks对象（迁移至core-blocks.js）
  - 使用`BlockRegistry.render()`替代`Blocks.render()`
  - 保持API向后兼容

- 📄 **模板更新** - templates/index.html引入新架构文件
  ```html
  <script src="../engine/block-registry.js"></script>
  <script src="../engine/core-blocks.js"></script>
  <script src="../engine/engine.js"></script>
  ```

#### Technical Details
- **插件化收益**：
  - ✅ 开发者可贡献Block而不fork整个项目
  - ✅ 用户可扩展企业内部专用Block（如OKR卡片、审批流程）
  - ✅ 支持Block热插拔，按需加载
  - ✅ 错误隔离，单个Block渲染失败不影响整体
  
- **测试覆盖**：
  - 8个Golden Test Cases覆盖核心场景
  - 高管汇报/技术分享/产品发布/混合受众/反幻觉检查/边界情况

- **代码质量**：
  - ES5语法兼容旧浏览器
  - 完整的错误处理和降级方案
  - console日志辅助调试

#### Migration Guide
现有deck.js无需修改，完全向后兼容。如需扩展自定义Block：

```javascript
// 在HTML中引入custom-blocks.js或自定义脚本
BlockRegistry.register('myblock', function(data) {
  const div = document.createElement('div');
  div.textContent = data.content;
  return div;
});
```

详见：[docs/BLOCK_EXTENSION_GUIDE.md](./docs/BLOCK_EXTENSION_GUIDE.md)

---

## [2.0.1] - 2026-08-18

### Added
- 🔒 **权限与安全边界说明** - 详细的权限声明和安全特性说明
- 🛡️ **故障场景与降级方案** - CDN失败处理、大数据集优化、浏览器兼容性
- 📊 **对比传统PPT章节** - 真实场景价值证明，诚实告知不适合场景
- 📚 **全新README** - 3分钟快速开始结构，清晰的文档导航
- 📝 **CHANGELOG** - 版本历史记录
- 🔧 **版本管理工具** - 自动递增脚本和检查工具

### Improved
- 📖 **SKILL.md结构优化** - 增加Trust/Reliability/Effectiveness维度内容
- 🎯 **marketplace.json完善** - 补充demo_url和verified_cases字段

### Fixed
- 🐛 常见错误排查表 - 图表不显示、渐进揭示失效、翻页笔无响应等

## [2.0.0] - 2026-08-10

### Changed
- 🏗️ **架构重构** - 四层架构：主控层/知识层/规范层/执行层
- 🧠 **AI化汇报经验萃取** - 从工具定位升级为"汇报判断力AI化"
- 📋 **五大判断框架** - 受众决定结构、数据类型决定图表、内容特征决定Block、渐进揭示时机、页数与深度匹配

### Added
- 🎨 **Block积木系统** - hero/metric/bullets/compare/timeline/quote/chart/tabs/media
- 📐 **layout-patterns** - 6种专业布局模式
- 🚫 **anti-hallucination** - 防幻觉规范，确保内容100%来自用户素材
- 🎭 **narrative-engine** - 叙事框架自动判断

### Removed
- ❌ 移除v1.x的模板预设（改为AI判断动态生成）

## [1.0.0] - 2026-06-15

### Added
- 🎉 **首次发布** - 单文件HTML+GSAP+Chart.js
- 📄 **3个预设模板** - 战略汇报/产品发布/技术分享
- ⌨️ **键盘控制** - 左右键翻页、F11全屏、O键总览
- 🎨 **config_ui** - 可视化配置工具

---

## 版本号规则

- **主版本号(X.0.0)** - 架构重构、不兼容变更
- **次版本号(0.X.0)** - 新功能、新Block、新模板
- **修订号(0.0.X)** - Bug修复、文档更新、性能优化

---

## 路线图

### v2.1.0（计划中）
- [ ] 增加`code` Block - 代码高亮展示
- [ ] 增加`split` Block - 左图右文分栏
- [ ] 增加`grid` Block - 多列卡片网格
- [ ] 支持导出PDF（使用Playwright）
- [ ] 增加更多图表类型（radar/scatter）

### v2.2.0（规划中）
- [ ] 移动端适配优化
- [ ] 演讲者备注模式（双屏投影）
- [ ] 实时协作编辑（WebSocket）
- [ ] AI语音演讲稿生成

### v3.0.0（远期愿景）
- [ ] 完全可视化编辑器（拖拽Block）
- [ ] 组件市场（用户上传自定义Block）
- [ ] 多语言支持（i18n）

---

[Unreleased]: https://github.com/longhuang1997-cpu/interactive-narrative-deck/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/longhuang1997-cpu/interactive-narrative-deck/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/longhuang1997-cpu/interactive-narrative-deck/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/longhuang1997-cpu/interactive-narrative-deck/releases/tag/v1.0.0
