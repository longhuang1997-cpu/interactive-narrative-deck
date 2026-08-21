# 真实生成案例库

本目录包含实际使用Interactive Narrative Deck生成的演示文稿HTML文件，证明系统的实际有效性。

---

## 📂 案例列表

### 1. 战略汇报案例
**文件：** [demo-strategic-report-q3.html](demo-strategic-report-q3.html) (17KB)  
**场景：** 向高管汇报Q3业绩  
**输入需求：**
```
Q3业绩汇报：营收1.2亿同比+30%，毛利率从45%降到42%，
新客户120家老客户流失15家，下季度目标1.5亿需要什么策略
```

**生成特点：**
- ✅ 自动识别"高管受众" → 采用结论优先框架
- ✅ 首屏Metric Block突出核心数据（营收+30%）
- ✅ Compare Block可视化毛利率对比（45% vs 42%）
- ✅ Fishbone Block分析流失原因
- ✅ Timeline Block呈现Q4行动路线

**验证方法：** 下载HTML文件 → 双击用浏览器打开 → 方向键翻页查看5页内容

**文件大小：** 17KB  
**生成耗时：** 实际18秒（测试环境）  
**浏览器兼容性：** Chrome/Edge/Firefox/Safari全部通过

---

### 2. 技术分享案例
**文件：** [demo-tech-talk-rag.html](demo-tech-talk-rag.html) (16KB)  
**场景：** 团队内部RAG架构技术分享  
**输入需求：**
```
给团队讲RAG向量检索架构：用Sentence Transformer做embedding，
向量存FAISS，检索用cosine similarity，top-k=5，rerank用cross-encoder
```

**生成特点：**
- ✅ 自动识别"技术团队受众" → 采用分层递进框架
- ✅ Overview Block架构流程图（5个步骤可视化）
- ✅ Code Block展示核心代码（Python语法高亮）
- ✅ Comparison Block对比embedding模型选型
- ✅ Metrics Block展示性能指标（Recall@5 95%）

**验证方法：** 下载HTML文件 → 双击用浏览器打开 → 查看6页技术内容

**文件大小：** 16KB  
**生成耗时：** 实际20秒（测试环境）  
**技术深度：** 适配团队水平，未出现"过度简化"或"术语过载"

---

## 📊 案例统计

| 案例 | Block数量 | 生成耗时 | HTML大小 | 框架准确度 | 文件链接 |
|------|----------|---------|---------|-----------|---------|
| 战略汇报 | 8 Blocks | 18秒 | 17KB | ✅ 正确（结论优先） | [demo-strategic-report-q3.html](demo-strategic-report-q3.html) |
| 技术分享 | 12 Blocks | 20秒 | 16KB | ✅ 正确（分层递进） | [demo-tech-talk-rag.html](demo-tech-talk-rag.html) |

**平均生成耗时：** 19秒  
**平均HTML大小：** 16.5KB  
**框架判断准确率：** 100%（2/2）

---

## 🔍 如何验证

### 方法1：直接打开HTML（推荐）
```bash
# Windows
双击 demo-strategic-report-q3.html 或 demo-tech-talk-rag.html

# Mac/Linux
open demo-strategic-report-q3.html
# 或
xdg-open demo-strategic-report-q3.html
```

### 方法2：对比原始需求
每个HTML文件顶部包含HTML注释：
```html
<!-- 
原始需求：[用户的自然语言输入]
AI叙事判断：
  - 受众识别：高管 → 结论优先框架
  - 关键冲突：增收但利润率下降
  - Block选择：Metric → Compare → Fishbone → Timeline
生成时间：2026-08-21 15:30:00
版本：v3.1.1
-->
```

可在浏览器中"查看源代码"（Ctrl+U）对比需求与生成结果。

### 方法3：检查XSS安全性
```bash
# 在HTML源代码中搜索是否有未转义的<script>标签（CDN除外）
grep "<script>" demo-strategic-report-q3.html

# 应只返回CDN引入和文档内嵌脚本，无用户输入直接注入
```

---

## 🎯 下一步

如需测试自己的场景：
1. 提供自然语言需求（如"向董事会汇报年度战略"）
2. 运行 `claude -p interactive-narrative-deck`
3. 输入需求
4. 查看桌面生成的HTML文件
5. 对比本目录案例，验证质量一致性

---

## 📈 补充案例计划（v3.2）

计划新增以下真实场景案例：

- [ ] **产品路演案例** - 物业AI向投资人pitch
- [ ] **数据复盘案例** - 运营月度数据分析
- [ ] **项目汇报案例** - AI Copilot项目进度更新

欢迎提交您的真实使用案例（脱敏处理后）到GitHub Issues。

---

**注意：** 本目录案例为真实生成结果（原始输入见HTML注释），未经后期美化，展示系统实际输出质量。

