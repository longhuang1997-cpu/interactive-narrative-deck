# Changelog

## v2.0.0 (2026-08-17)
### 新增
- 四层架构重构（主控/知识/规范/执行）
- knowledge/ 目录：block-reference、layout-patterns、anti-hallucination、narrative-engine
- config_ui/config_ui.html：5维度可视化配置向导
- templates/：strategy-report、product-launch、diy-blank 三个开箱即用模板
- examples/data-review/、examples/tech-talk/ 两个完整示例

### 优化
- SKILL.md 加入四层调用顺序 + 生成后自检指令
- README 补完对比表、FAQ、API参考
- TESTING.md 兼容性矩阵、性能基准、边界测试

## v1.0.0 (2026-07-21)
### 初始版本
- engine/：engine.js 渲染引擎 + style.css
- templates/：index.html + deck.js 基础模板
- 9个Block组件：hero/metric/bullets/compare/timeline/quote/chart/media/tabs
- GSAP/Chart.js CDN + 离线降级策略
- 键盘/翻页笔支持 + localStorage进度持久化