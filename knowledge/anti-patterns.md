# 反模式与规避指南

> 知识层 - 常见错误模式、幻觉自检清单、质量保障规则

---

## 一、内容幻觉反模式

### 🚫 反模式1：编造数据

**错误示例**：
```javascript
// 用户只说"医疗产品Q2汇报"，没给数据
{ type: "metric", items: [
  { value: "1250", unit: "万", label: "Q2营收", delta: "+35%" },  // ← 编造的！
  { value: "89", unit: "%", label: "客户满意度", delta: "+12%" }  // ← 编造的！
]}
```

**正确做法**：
```javascript
{ type: "metric", items: [
  { value: "【待填入】", unit: "万", label: "Q2营收", delta: "" },
  { value: "【待填入】", unit: "%", label: "客户满意度", delta: "" }
]}
```

**检测规则**：
- 用户未提供具体数字 → 一律用`【待填入】`
- 生成后扫描所有`value`字段，标记非用户提供的数字
- 在交付说明中列出"需手动填写的数据项"

---

### 🚫 反模式2：捏造案例/引用

**错误示例**：
```javascript
// 用户没提供客户名字
{ type: "quote", 
  text: "这套系统帮我们节省了40%的人力成本", 
  by: "—— 三甲医院院长 张某某"  // ← 编造的人名！
}
```

**正确做法**：
```javascript
{ type: "quote", 
  text: "【客户证言待补充】", 
  by: "—— 客户名称"
}
```

**检测规则**：
- 人名、公司名、具体案例 → 100%来自用户提供
- 无素材时用占位符，不要"合理推测"

---

### 🚫 反模式3：臆造时间线

**错误示例**：
```javascript
// 用户只说"做个路线图"
{ type: "timeline", items: [
  { time: "2026 Q1", text: "立项启动" },       // ← 猜的
  { time: "2026 Q2", text: "试点医院上线" },  // ← 猜的
  { time: "2026 Q3", text: "规模化推广" }     // ← 猜的
]}
```

**正确做法**：
```javascript
{ type: "timeline", items: [
  { time: "阶段1", text: "【里程碑待填入】" },
  { time: "阶段2", text: "【里程碑待填入】" },
  { time: "阶段3", text: "【里程碑待填入】" }
]}
```

**检测规则**：
- 用户未明确时间点 → 用"阶段1/2/3"替代
- 用户说"Q2"但未说具体任务 → 任务用占位符

---

## 二、结构反模式

### 🚫 反模式4：Block堆叠（信息过载）

**错误示例**：
```javascript
{
  title: "产品分析",
  blocks: [
    { type: "hero", title: "..." },
    { type: "metric", items: [...] },
    { type: "bullets", items: [...] },
    { type: "swot", ... },
    { type: "timeline", ... }
  ]  // ← 5个Block！页面爆炸
}
```

**正确做法**：拆成3页
```javascript
// P1: 定位
{ title: "产品定位", blocks: [hero, metric] },

// P2: 战略分析
{ title: "SWOT分析", blocks: [hero, swot] },

// P3: 路线图
{ title: "Roadmap", blocks: [hero, timeline] }
```

**检测规则**：
- 单页Block数>3 → 自动拆页
- 拆页优先级：hero独立 > 大型Block独立（swot/chart/split）> 小Block组合

---

### 🚫 反模式5：框架错配

**错误示例**：
```javascript
// 用户：向董事会汇报Q2进展（5分钟）
// 错误：用了"问题-方案"框架，8页推导过程

slides: [
  { title: "问题定义", ... },      // P1
  { title: "根因分析", ... },      // P2
  { title: "影响范围", ... },      // P3
  { title: "解决方案A", ... },     // P4
  { title: "解决方案B", ... },     // P5
  { title: "方案对比", ... },      // P6
  { title: "实施计划", ... },      // P7
  { title: "风险评估", ... }       // P8
]
// ← 董事会没耐心听完！
```

**正确做法**：用"结论先行"框架
```javascript
slides: [
  { title: "封面", ... },
  { title: "核心结论", blocks: [hero, metric] },  // P2：直接给答案
  { title: "关键数据", blocks: [chart] },        // P3：证据
  { title: "下一步", blocks: [timeline] }        // P4：行动
]
// 4页，2分钟讲完，留3分钟Q&A
```

**检测规则**：
- 受众=高管 → 强制用"结论先行"
- 时长<10分钟 → 页数≤6
- 场景=发布会 → 用"产品发布"框架

---

### 🚫 反模式6：叙事断裂

**错误示例**：
```javascript
slides: [
  { title: "封面" },
  { title: "市场数据" },        // ← 突然跳到市场？
  { title: "技术架构" },        // ← 又跳技术？
  { title: "Q2营收" },          // ← 再跳回业务？
  { title: "竞对分析" }         // ← 逻辑混乱
]
```

**正确做法**：清晰的逻辑链
```javascript
slides: [
  { title: "封面" },
  { title: "战略定位" },        // 先说"要做什么"
  { title: "市场机会" },        // 为什么做（外部）
  { title: "竞争优势" },        // 为什么是我们（内部）
  { title: "产品方案" },        // 怎么做
  { title: "商业模式" },        // 怎么赚钱
  { title: "时间表" }           // 什么时候做
]
```

**检测规则**：
- 生成后检查页面标题连贯性
- 每页标题回答一个问题：What/Why/How/When/Who

---

## 三、视觉反模式

### 🚫 反模式7：配色混乱

**错误示例**：
```javascript
theme: {
  blue: "#0ea5e9",    // 主色
  gold: "#f59e0b",    // 强调色
  green: "#34d399",   // 又来一个？
  purple: "#a78bfa",  // 还有？
  pink: "#f472b6"     // 停！
}
```

**正确做法**：
```javascript
theme: {
  blue: "#0ea5e9",    // 主色（品牌/信息）
  gold: "#f59e0b",    // 强调色（CTA/高亮）
  bg: "#0f172a"       // 背景
}
// 绿色/红色在delta中语义化使用，不列入主题色
```

**检测规则**：
- 主题色≤2种
- 绿/红仅用于delta（增长/下降）
- 一页不超过3种颜色（含背景）

---

### 🚫 反模式8：字号失衡

**错误示例**：
```javascript
{ type: "hero", title: "核心结论" },         // 假设渲染为36px
{ type: "metric", value: "9999" },           // 渲染为68px ← 喧宾夺主
{ type: "bullets", items: ["要点1"] }        // 渲染为24px
// 数字比标题大，视觉焦点错误
```

**正确做法**：
- 页面标题（hero.title）≥ 数字（metric.value）
- 或：hero独占一页，metric单独一页

**检测规则**：
- hero + metric 同页 → hero字号≥metric
- 或：hero.title很短（<8字）时可允许数字更大

---

### 🚫 反模式9：空间挤压

**错误示例**：
```css
.nd-metric {
  padding: 8px;        /* ← 太挤！ */
  margin-bottom: 4px;  /* ← Block贴太紧 */
}
```

**正确做法**：
```css
.nd-metric {
  padding: 48px 28px 32px 28px;  /* 上方留空给delta */
  margin-bottom: 40px;             /* Block间距充足 */
}
```

**检测规则**：
- 卡片内边距≥32px
- Block间距≥40px
- 页面边距≥5%

---

## 四、交互反模式

### 🚫 反模式10：过度动画

**错误示例**：
```javascript
// 每个Block都加动画，渐进揭示套娃
{
  blocks: [
    { type: "hero", frag: true },
    { type: "metric", frag: true },
    { type: "bullets", stagger: true, frag: true }  // ← 双重渐进
  ]
}
// 结果：按10次空格才看完一页
```

**正确做法**：
```javascript
{
  blocks: [
    { type: "hero" },                               // 直接显示
    { type: "metric" },                             // 直接显示
    { type: "bullets", stagger: true }              // 只有bullets渐进
  ]
}
```

**检测规则**：
- 单页最多1个stagger/frag
- hero/metric通常不用frag（信息密度低，无需拆分）
- bullets/timeline适合stagger（配合演讲节奏）

---

### 🚫 反模式11：图表数据结构错误

**错误示例**：
```javascript
{ type: "chart", chart: "line",
  data: {
    labels: ["Q1","Q2","Q3"],
    datasets: {                    // ← 错误！应该是数组
      label: "营收",
      data: [100,120,150]
    }
  }
}
```

**正确做法**：
```javascript
{ type: "chart", chart: "line",
  data: {
    labels: ["Q1","Q2","Q3"],
    datasets: [{                   // ← 必须是数组
      label: "营收",
      data: [100,120,150],
      borderColor: "#0ea5e9"
    }]
  }
}
```

**检测规则**：
- 生成后扫描所有chart block
- 检查`datasets`是否为数组
- 检查`data.length === labels.length`

---

## 五、质量检查清单

### 生成前检查（AI自检）
```
- [ ] 用户是否提供了受众信息？（缺失→询问）
- [ ] 用户是否提供了时长？（缺失→默认10分钟）
- [ ] 用户是否提供了具体数据/案例？（缺失→用占位符）
- [ ] 框架是否匹配场景？（高管→结论先行，发布→产品发布）
- [ ] 页数是否匹配时长？（5分钟→5-6页，10分钟→8-10页）
```

### 生成后检查（自动扫描）
```javascript
// 自检脚本（伪代码）
function validateDeck(deck) {
  const errors = [];
  
  deck.slides.forEach((slide, i) => {
    // 检查1：Block数量
    if (slide.blocks.length > 3) {
      errors.push(`P${i+1}：Block数量超过3个`);
    }
    
    // 检查2：图表数据结构
    slide.blocks.forEach(block => {
      if (block.type === 'chart') {
        if (!Array.isArray(block.data.datasets)) {
          errors.push(`P${i+1}：chart.datasets不是数组`);
        }
      }
    });
    
    // 检查3：占位符标记
    const json = JSON.stringify(slide);
    if (json.includes('【待填入】')) {
      errors.push(`P${i+1}：含占位符，需用户补充`);
    }
  });
  
  return errors;
}
```

### 交付前报告
生成完成后，告知用户：
```
✅ 已生成12页演示文稿

⚠️ 需要手动填写：
  - P3：Q2营收数字
  - P7：客户证言
  - P9：具体上线时间

✅ 质量检查通过：
  - 所有页面Block数≤3
  - 图表数据结构正确
  - 配色/字号符合规范
```

---

## 六、常见幻觉场景与应对

### 场景1：用户只给主题，无细节
**输入**："做个AI产品汇报"

**错误做法**：自行脑补功能、数据、案例

**正确做法**：
1. 先问受众、时长、目的
2. 生成框架草稿（标题+Block类型，内容用占位符）
3. 让用户填充具体内容

---

### 场景2：用户提供部分数据
**输入**："Q2营收120万，做个汇报"

**错误做法**：只用120万，其他数据自己编（如增长率、对比值）

**正确做法**：
- 用户提供的：`{ value: "120", unit: "万", label: "Q2营收" }`
- 未提供的：`{ value: "【待填入】", unit: "%", label: "同比增长", delta: "" }`

---

### 场景3：用户描述模糊
**输入**："介绍一下我们的优势"

**错误做法**：列举通用优势（"技术领先"、"服务优质"）

**正确做法**：
```javascript
{ type: "bullets", title: "核心优势", items: [
  "【优势1：具体技术/能力】",
  "【优势2：具体数据/案例】",
  "【优势3：差异化点】"
]}
```

---

## 七、降级策略

### 数据缺失 → 结构先行
**原则**：先搭框架（页面结构+Block类型），内容用占位符

**示例**：
```javascript
// 用户只说"做个产品汇报"
slides: [
  { title: "封面", blocks: [{ type: "hero", title: "【产品名称】" }] },
  { title: "定位", blocks: [
    { type: "hero", title: "【一句话定位】" },
    { type: "metric", items: [
      { value: "【待填入】", label: "【指标1】" },
      { value: "【待填入】", label: "【指标2】" }
    ]}
  ]},
  // ...
]
```

### 素材过多 → 优先级排序
**原则**：Top 3原则，其余放tabs或备份页

**示例**：
```javascript
// 用户提供10个功能点
// 错误：10个bullets（太长）
// 正确：
{ type: "bullets", title: "核心功能（Top 3）", items: [
  "功能1：最重要",
  "功能2：第二重要",
  "功能3：第三重要"
]},
{ type: "tabs", tabs: [
  { label: "其他功能", html: "<ul><li>功能4</li>...</ul>" }
]}
```

### 时间不足 → 精简版
**原则**：5分钟汇报 = 封面 + 结论 + 证据 + 行动（4页）

**示例**：
```javascript
// 用户："只有5分钟，讲Q2进展"
slides: [
  { title: "封面" },
  { title: "核心结论", blocks: [hero, metric] },  // 2分钟
  { title: "关键证据", blocks: [chart] },         // 1.5分钟
  { title: "下一步", blocks: [timeline] }         // 1分钟
]
// 总计4页，留0.5分钟缓冲
```

---

## 八、反模式速查表

| 反模式 | 症状 | 检测方法 | 修复方案 |
|--------|------|---------|---------|
| 编造数据 | 用户未提供但生成了具体数字 | 扫描所有value字段 | 改为【待填入】 |
| 捏造案例 | 出现用户未提及的人名/公司 | 扫描quote/split内容 | 改为占位符 |
| Block堆叠 | 单页>3个Block | 统计blocks.length | 拆页 |
| 框架错配 | 高管汇报用了8页推导 | 检查受众+页数 | 换框架 |
| 配色混乱 | 主题色>2种 | 统计theme字段 | 简化为2色 |
| 字号失衡 | 数字比标题大 | 人工检查排版 | 调整CSS或拆页 |
| 过度动画 | 单页多个frag/stagger | 扫描frag字段 | 保留1个 |
| 图表错误 | datasets不是数组 | `Array.isArray()` | 修复为`[{...}]` |
| 信息过载 | 单页文字>300字 | 统计字符数 | 拆页或tabs |
| 叙事断裂 | 页面标题无逻辑 | 人工审核标题序列 | 重新排序 |

---

## 九、金线规则（Red Lines）

这些是**绝对不能违反**的规则：

1. **不编造数据** - 宁可留空，不可捏造
2. **不捏造案例** - 无客户证言就不写
3. **不臆造时间** - 无明确日期就用"阶段1/2/3"
4. **不堆叠Block** - 单页最多3个，必须拆页
5. **datasets必须是数组** - 否则Chart.js报错
6. **主题色≤2种** - 否则视觉混乱
7. **受众=高管 → 结论先行** - 框架不可错配
8. **时长<10分钟 → 页数≤6** - 讲不完就是失败

---

**更新时间**：2026-01-20  
**维护者**：Interactive Narrative Deck Skill  
**版本**：v3.0
