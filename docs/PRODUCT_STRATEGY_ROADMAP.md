# 产品战略升级路线图

> 从演示工具升级为**专业方法论可视化平台**

---

## 🎯 核心愿景

### 当前定位（v2.1.0）
**交互演示生成器** - 把汇报做成Block积木式演示

### 目标定位（v3.0.0）
**专业方法论可视化平台** - 让商业方法论和管理模型可执行、可视化、可复用

---

## 📊 战略三支柱

你提出的三个核心方向：

### 1️⃣ 扩充Block套件（基础设施）

**目标**：从9个通用Block → 30+专业Block，覆盖主流方法论的可视化需求

**分层设计**：

```
通用层（已有9个）
  ├─ hero/metric/bullets/compare/timeline/quote/chart/tabs/media
  
专业层（新增20+）
  ├─ 战略分析
  │   ├─ swot - SWOT分析矩阵
  │   ├─ pestel - PESTEL宏观环境分析
  │   ├─ porter5 - 波特五力模型
  │   ├─ bcg-matrix - BCG矩阵（现金牛/明星/问号/瘦狗）
  │   └─ ansoff - 安索夫增长矩阵
  │
  ├─ 流程管理
  │   ├─ gantt - 甘特图（项目进度）
  │   ├─ kanban - 看板（敏捷管理）
  │   ├─ flowchart - 流程图
  │   ├─ swimlane - 泳道图（跨部门协作）
  │   └─ roadmap - 产品路线图
  │
  ├─ 组织架构
  │   ├─ org-chart - 组织架构图
  │   ├─ raci - RACI责任矩阵
  │   └─ okr-tree - OKR树状展开
  │
  ├─ 数据分析
  │   ├─ funnel - 漏斗图（转化分析）
  │   ├─ cohort - 队列分析
  │   ├─ heatmap - 热力图
  │   └─ sankey - 桑基图（流量分布）
  │
  └─ 决策工具
      ├─ decision-tree - 决策树
      ├─ radar - 雷达图（多维对比）
      ├─ impact-effort - 影响力-努力矩阵
      └─ force-field - 力场分析

行业层（v3.1+）
  ├─ 金融：杜邦分析、财务三表联动
  ├─ 咨询：麦肯锡金字塔、议题树
  ├─ 产品：用户旅程地图、功能优先级
  └─ HR：人才九宫格、继任计划
```

**实现路径**：
1. **Phase 1（v2.2.0）**：5个高频Block
   - `swot`（SWOT分析）
   - `gantt`（甘特图）
   - `funnel`（漏斗图）
   - `okr-tree`（OKR树）
   - `radar`（雷达图）

2. **Phase 2（v2.5.0）**：10个战略Block
   - BCG矩阵、波特五力、安索夫矩阵等

3. **Phase 3（v3.0.0）**：行业专用Block + Block Marketplace

---

### 2️⃣ 增加方法论知识库（AI智能）

**目标**：让AI能识别用户意图，主动推荐最合适的方法论和Block组合

**知识库架构**：

```
knowledge/
├─ frameworks/          # 方法论库
│  ├─ strategy/
│  │  ├─ swot.md
│  │  ├─ pestel.md
│  │  ├─ porter-five-forces.md
│  │  ├─ bcg-matrix.md
│  │  └─ ...
│  │
│  ├─ process/
│  │  ├─ agile-scrum.md
│  │  ├─ lean-startup.md
│  │  ├─ design-thinking.md
│  │  └─ ...
│  │
│  ├─ finance/
│  │  ├─ dupont-analysis.md
│  │  ├─ roi-analysis.md
│  │  └─ ...
│  │
│  └─ hr/
│     ├─ talent-9box.md
│     ├─ competency-model.md
│     └─ ...
│
├─ scenarios/          # 场景知识库
│  ├─ quarterly-review.md    # Q3复盘 → SWOT + metric + gantt
│  ├─ market-entry.md        # 市场进入 → PESTEL + porter5 + ansoff
│  ├─ product-launch.md      # 产品发布 → roadmap + funnel + okr
│  └─ ...
│
└─ recommendation-engine.md  # AI推荐引擎规则
```

**方法论知识卡片结构**：

```markdown
# SWOT分析

## 定义
SWOT = Strengths（优势）+ Weaknesses（劣势）+ Opportunities（机会）+ Threats（威胁）

## 适用场景
- 战略规划（年度/季度）
- 新业务评估
- 竞争分析
- 项目启动

## 典型结构
4象限矩阵，左上S/右上W/左下O/右下T

## Block映射
```yaml
primary_block: swot
support_blocks: [metric, compare, bullets]
typical_pages: 3-5
flow:
  - P1: hero(战略分析)
  - P2: swot({左上:[...], 右上:[...], 左下:[...], 右下:[...]})
  - P3: bullets(行动计划, 基于SWOT结论)
```

## AI判断规则
触发条件：
- 用户提到"优势劣势"/"SWOT"/"战略分析"
- 受众=高管 + 内容=业务评估
- 场景=年度规划/季度复盘

推荐理由模板：
"检测到战略分析需求，推荐SWOT框架：4象限清晰展示内外部因素，高管决策常用"

## 案例库
- 某互联网公司Q3业务复盘
- 某制造企业新市场进入评估
- 某零售品牌数字化转型战略
```

**AI推荐引擎逻辑**：

```markdown
## 推荐引擎规则（recommendation-engine.md）

### 规则1：显式触发
用户直接提到方法论名称 → 直接使用对应Block
- "用SWOT分析" → swot block
- "画个甘特图" → gantt block

### 规则2：场景匹配
用户描述场景 → 匹配scenarios库 → 推荐方法论组合

```yaml
场景: "Q3业务复盘，向董事会汇报"
匹配: scenarios/quarterly-review.md
推荐:
  primary_framework: "SWOT分析（战略评估）"
  blocks: [hero, metric, swot, gantt, bullets]
  reasoning: "复盘需要优劣势分析（SWOT）+ 关键数据（metric）+ 下季度计划（gantt）"
```

### 规则3：角色推断
受众类型 → 匹配常用方法论

```yaml
高管/董事会:
  - SWOT（战略）
  - BCG矩阵（资源配置）
  - 财务三表（经营状况）
  
业务团队:
  - OKR（目标管理）
  - 甘特图（项目进度）
  - 漏斗图（转化分析）
  
产品团队:
  - 用户旅程地图
  - 功能优先级矩阵
  - 产品路线图
```

### 规则4：数据特征推断
用户提供的数据类型 → 推荐可视化Block

```yaml
数据特征: "6个月营收趋势"
推荐: chart(line) - 折线图最适合展示趋势

数据特征: "3个部门的KPI完成率"
推荐: radar - 雷达图多维对比

数据特征: "注册→激活→付费的转化率"
推荐: funnel - 漏斗图天然适配转化路径
```

### 规则5：多方法论组合
复杂场景 → 方法论工具箱

```yaml
场景: "新市场进入决策，向CEO汇报"
推荐组合:
  - PESTEL（宏观环境扫描）
  - Porter五力（行业竞争分析）
  - SWOT（综合评估）
  - 安索夫矩阵（增长策略选择）
  - Gantt（实施计划）
```
```

**AI推荐流程**：

```
用户输入
  ↓
意图识别
  ├─ 显式方法论名称？→ 直接使用
  ├─ 场景关键词？→ 匹配scenarios库
  ├─ 受众+内容？→ 推断常用方法论
  └─ 数据特征？→ 推荐可视化Block
  ↓
方法论推荐
  ├─ 主方法论（1个）
  ├─ 辅助工具（2-3个）
  └─ 推荐理由（告诉用户为什么）
  ↓
Block选择
  ├─ 读取方法论的Block映射
  ├─ 结合narrative-engine判断叙事框架
  └─ 生成deck.js
```

---

### 3️⃣ Block支撑方法论可视化（技术实现）

**目标**：每个专业Block都能完美还原对应方法论的视觉语言

**设计原则**：

```yaml
专业性:
  - 严格遵循方法论的标准可视化形式
  - SWOT必须是2x2矩阵，不能是列表
  - BCG必须是气泡图，横轴市场增长率、纵轴市场份额

交互性:
  - 点击SWOT象限高亮
  - 甘特图可拖拽调整时间
  - OKR树可展开/折叠

可配置:
  - 配色适配企业VI
  - 可导出为PNG/PDF
  - 可嵌入Notion/飞书文档
```

**实现示例：SWOT Block**

```javascript
// engine/business-blocks.js
BlockRegistry.register('swot', function(data) {
  const wrapper = document.createElement('div');
  wrapper.className = 'nd-swot';
  
  const quadrants = [
    {key: 'strengths', title: 'Strengths 优势', class: 'top-left', color: '#10b981'},
    {key: 'weaknesses', title: 'Weaknesses 劣势', class: 'top-right', color: '#ef4444'},
    {key: 'opportunities', title: 'Opportunities 机会', class: 'bottom-left', color: '#3b82f6'},
    {key: 'threats', title: 'Threats 威胁', class: 'bottom-right', color: '#f59e0b'}
  ];
  
  quadrants.forEach(q => {
    const quad = document.createElement('div');
    quad.className = `nd-swot-quad ${q.class}`;
    quad.style.borderColor = q.color;
    
    const header = document.createElement('div');
    header.className = 'nd-swot-header';
    header.style.background = q.color;
    header.textContent = q.title;
    
    const list = document.createElement('ul');
    (data[q.key] || []).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    
    quad.appendChild(header);
    quad.appendChild(list);
    wrapper.appendChild(quad);
  });
  
  return wrapper;
}, {
  description: 'SWOT分析矩阵，4象限展示优势/劣势/机会/威胁',
  author: 'business',
  framework: 'Strategic Analysis'
});
```

**CSS样式**：

```css
.nd-swot {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 20px;
}

.nd-swot-quad {
  border: 2px solid;
  border-radius: 8px;
  overflow: hidden;
  min-height: 200px;
}

.nd-swot-header {
  padding: 12px;
  font-weight: 600;
  color: white;
  text-align: center;
}

.nd-swot-quad ul {
  padding: 16px 24px;
  list-style: none;
}

.nd-swot-quad li {
  padding: 8px 0;
  border-bottom: 1px solid #334155;
}

.nd-swot-quad li:before {
  content: "▪ ";
  color: inherit;
}
```

**使用方式**：

```javascript
// deck.js
{
  type: 'swot',
  strengths: [
    '品牌知名度高',
    '用户粘性强',
    '技术团队优秀'
  ],
  weaknesses: [
    '国际化能力弱',
    '供应链成本高'
  ],
  opportunities: [
    'AI技术红利',
    '新兴市场增长'
  ],
  threats: [
    '政策监管趋严',
    '头部竞争加剧'
  ]
}
```

---

## 🚀 实施路线图

### v2.2.0 (1个月) - Block扩展MVP
- [ ] 新增5个高频Block：swot/gantt/funnel/okr-tree/radar
- [ ] 创建`knowledge/frameworks/`目录，补充5个方法论知识卡片
- [ ] 在SKILL.md中添加场景识别规则（初步）

### v2.5.0 (2个月) - 方法论知识库
- [ ] 补充20个方法论知识卡片
- [ ] 实现AI推荐引擎（规则匹配版本）
- [ ] 新增10个专业Block
- [ ] 创建`scenarios/`场景库

### v3.0.0 (3-4个月) - 专业方法论平台
- [ ] 30+专业Block全覆盖
- [ ] AI推荐引擎升级（语义理解 + 案例学习）
- [ ] Block Marketplace（用户贡献Block）
- [ ] 方法论模板库（一键生成）
- [ ] 企业定制化支持（私有方法论）

### v3.1.0+ - 行业深化
- [ ] 金融行业包（杜邦分析/财务三表）
- [ ] 咨询行业包（麦肯锡金字塔/议题树）
- [ ] 产品行业包（用户旅程/功能优先级）
- [ ] HR行业包（人才九宫格/继任计划）

---

## 💡 核心竞争力

### 为什么这个方向有价值？

1. **从工具到方法论**
   - 当前：演示工具（竞争对手：PPT、Prezi、reveal.js）
   - 未来：方法论执行平台（竞争对手：咨询公司、管理软件）

2. **AI + 专业知识**
   - 当前：AI生成演示（技术门槛低，易被模仿）
   - 未来：AI识别场景推荐方法论（需要深厚的商业知识沉淀）

3. **可视化 + 可执行**
   - 当前：静态展示方法论（如PPT中的SWOT矩阵）
   - 未来：可交互、可填写、可迭代的方法论工具（如填写数据自动生成SWOT）

4. **标准化 + 个性化**
   - 标准化：内置主流方法论，降低学习成本
   - 个性化：企业可定制私有方法论（如阿里的六脉神剑、字节的OKR）

---

## 📊 商业价值

### ToB场景
- **管理咨询公司**：标准化项目交付，复用方法论
- **企业战略部/PMO**：规范化汇报语言，统一方法论工具
- **培训机构**：教学工具，让学员"动手做"而不是"看PPT"

### 定价策略
```
免费版：9个基础Block + 有限方法论
专业版：30+ Block + 全方法论库 ($29/月)
企业版：私有方法论 + 定制Block + API ($299/月)
```

---

## 🎯 近期行动（本周）

你可以选择以下一个开始：

### Option A：实现1个专业Block（SWOT）
- 验证Block支撑方法论的可行性
- 完成度高，可以立即展示给用户
- **ROI：⭐⭐⭐⭐⭐**（最快见效）

### Option B：补充5个方法论知识卡片
- 建立知识库结构
- 为AI推荐做准备
- **ROI：⭐⭐⭐⭐**（打基础）

### Option C：设计AI推荐引擎规则
- 定义场景→方法论的匹配逻辑
- 在SKILL.md中实现规则匹配
- **ROI：⭐⭐⭐**（需配合知识库）

---

**我的建议：Option A（实现SWOT Block）**

理由：
1. 快速验证"Block支撑方法论"的核心假设
2. 有实物Demo，更容易说服用户和投资人
3. 为后续20+Block积累经验

完成后，你会有：
- 1个专业级SWOT Block
- 1个SWOT方法论知识卡片
- 1个完整案例（如"Q3战略复盘用SWOT"）

---

你想从哪个开始？我立即帮你实现！
