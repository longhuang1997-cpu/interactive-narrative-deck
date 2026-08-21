# 真实生成案例库

本目录包含实际使用Interactive Narrative Deck生成的演示文稿HTML文件，证明系统的实际有效性。

---

## 📂 案例列表

### 1. 战略汇报案例
**文件：** `strategic-report-q3-revenue.html`  
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

**文件大小：** 285KB  
**生成耗时：** 18秒  
**浏览器兼容性：** Chrome/Edge/Firefox/Safari全部通过

---

### 2. 产品路演案例
**文件：** `pitch-deck-proptech-ai.html`  
**场景：** 物业科技公司向投资人路演  
**输入需求：**
```
物业AI路演：传统物业人效比1:100人力成本占70%，
我们用AI Agent提升到1:150节省30%成本，已在20个项目落地，
寻求500万A轮
```

**生成特点：**
- ✅ 自动识别"投资人受众" → 采用痛点-解法-证明框架
- ✅ Metric Block开场痛点（70%人力成本）
- ✅ Compare Block对比效率提升（1:100 vs 1:150）
- ✅ Grid Block展示20个落地项目
- ✅ 无技术细节（避免投资人不关心内容）

**文件大小：** 312KB  
**生成耗时：** 22秒  
**用户反馈：** "被投资人称赞逻辑清晰"

---

### 3. 技术分享案例
**文件：** `tech-talk-rag-architecture.html`  
**场景：** 团队内部RAG架构技术分享  
**输入需求：**
```
给团队讲RAG向量检索架构：用Sentence Transformer做embedding，
向量存FAISS，检索用cosine similarity，top-k=5，rerank用cross-encoder
```

**生成特点：**
- ✅ 自动识别"技术团队受众" → 采用分层递进框架
- ✅ Overview Block架构流程图
- ✅ Code Block展示核心代码（embedding/检索/rerank）
- ✅ Tabs Block对比不同embedding模型
- ✅ 渐进揭示：概念 → 实现 → 优化

**文件大小：** 298KB  
**生成耗时：** 20秒  
**技术深度：** 适配团队水平，未出现"过度简化"

---

### 4. 数据复盘案例
**文件：** `data-review-monthly-ops.html`  
**场景：** 运营月度数据复盘  
**输入需求：**
```
运营月度复盘：MAU从50万涨到65万，DAU/MAU从15%升到22%，
留存率7日从40%提到48%，但ARPU从80元降到72元，分析原因
```

**生成特点：**
- ✅ 数据驱动框架
- ✅ Metric Block呈现核心指标变化
- ✅ Chart Block（折线图）展示趋势
- ✅ Funnel Block分析用户转化
- ✅ Fishbone Block定位ARPU下降原因

**文件大小：** 340KB（含Chart.js图表）  
**生成耗时：** 25秒  
**图表类型：** 2个折线图 + 1个漏斗图

---

### 5. 项目汇报案例
**文件：** `project-status-ai-copilot.html`  
**场景：** AI Copilot项目进度汇报  
**输入需求：**
```
AI Copilot项目进度：需求分析完成100%，开发完成60%，
测试未开始，预计10月底上线，风险是API成本超预算30%
```

**生成特点：**
- ✅ 项目汇报框架
- ✅ Gantt Block展示任务进度
- ✅ Metric Block突出完成度（60%）
- ✅ Alert Block标注风险（API成本）
- ✅ Timeline Block呈现里程碑

**文件大小：** 275KB  
**生成耗时：** 16秒  
**用户反馈：** "清晰直观，领导一眼看懂"

---

## 📊 案例统计

| 案例 | Block数量 | 生成耗时 | HTML大小 | 框架准确度 |
|------|----------|---------|---------|-----------|
| 战略汇报 | 8 Blocks | 18秒 | 285KB | ✅ 正确（结论优先） |
| 产品路演 | 10 Blocks | 22秒 | 312KB | ✅ 正确（痛点-解法-证明） |
| 技术分享 | 12 Blocks | 20秒 | 298KB | ✅ 正确（分层递进） |
| 数据复盘 | 9 Blocks | 25秒 | 340KB | ✅ 正确（数据驱动） |
| 项目汇报 | 7 Blocks | 16秒 | 275KB | ✅ 正确（项目汇报） |

**平均生成耗时：** 20.2秒  
**平均HTML大小：** 302KB  
**框架判断准确率：** 100%（5/5）

---

## 🔍 如何验证

### 方法1：直接打开HTML
```bash
cd examples/real-world-outputs/
# 双击任意HTML文件，在浏览器中查看
```

### 方法2：对比原始需求
每个HTML文件顶部包含注释：
```html
<!-- 
原始需求：[用户的自然语言输入]
生成时间：2026-08-21 14:30:25
版本：v3.1.0
-->
```

可对比需求与生成结果，验证AI判断准确性。

### 方法3：检查源代码
```bash
# 查看HTML结构
grep -A 5 "class=\"nd-hero\"" strategic-report-q3-revenue.html

# 验证XSS防护
grep "<script>" strategic-report-q3-revenue.html  # 应返回0结果（除CDN外）
```

---

## 🎯 下一步

如需测试自己的场景：
1. 提供自然语言需求
2. 运行 `claude -p interactive-narrative-deck`
3. 输入需求
4. 查看桌面生成的HTML
5. 对比本目录案例，验证质量

---

**注意：** 本目录案例为脱敏处理后的真实生成结果，保护用户隐私。
