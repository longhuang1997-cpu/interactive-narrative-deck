# SKILL Golden Test Cases

> 这些测试用例验证SKILL.md中的AI判断逻辑是否正常工作
> 每次修改SKILL.md后，手动运行这些case，确保核心能力不退化

---

## Test Case 1: 高管汇报识别（结论优先）

### Input
```
用户：我要向董事会汇报Q3业绩
受众：董事会
时长：5分钟
内容：营收增长25%，用户留存78%，新签客户120家
```

### Expected Behavior
```yaml
narrative_framework: "结论优先框架"
page_count: ≤6
first_block: hero (封面)
second_block: metric (数字卡片，不是bullets)
key_decisions:
  - "高管受众 → 结论优先，第一页就给核心数据"
  - "5分钟 → 页数控制在6页内"
  - "数字是亮点 → 用metric滚动动效，不埋在bullets里"
```

### Validation Checklist
- [ ] 生成的deck.js第2页必须包含`{type: "metric"}`
- [ ] 总页数 ≤ 6
- [ ] metric.items包含value/unit/delta字段
- [ ] 没有用bullets展示核心数字

---

## Test Case 2: 技术分享识别（逻辑完整）

### Input
```
用户：给团队分享微服务架构演进
受众：技术团队
时长：30分钟
内容：从单体→SOA→微服务，三个阶段，每阶段的痛点和解法
```

### Expected Behavior
```yaml
narrative_framework: "逻辑展开框架（问题-方案）"
page_count: 8-12
key_blocks: [timeline, compare, bullets+stagger]
layout: "left" 或 "center"
key_decisions:
  - "技术受众 → 逻辑完整性优先，展开过程"
  - "三阶段 → 用timeline展示时间线"
  - "痛点和解法 → 用compare左右对比"
```

### Validation Checklist
- [ ] 生成的deck.js包含`{type: "timeline"}`
- [ ] timeline.items按时间顺序（单体→SOA→微服务）
- [ ] 包含compare或bullets+stagger展示痛点/解法
- [ ] 总页数在8-12之间

---

## Test Case 3: 产品发布会识别（视觉冲击）

### Input
```
用户：做个新产品发布会演示
受众：客户/市场
时长：15分钟
内容：痛点、产品截图、核心功能3个、价格方案
```

### Expected Behavior
```yaml
narrative_framework: "价值主张框架（痛点-解法-证明）"
page_count: 10-12
key_blocks: [hero, quote(痛点金句), media(产品截图), bullets, compare(价格)]
layout: "center"
key_decisions:
  - "客户受众 → 情感共鸣，先展示痛点"
  - "产品截图 → 用media block，视觉冲击"
  - "价格方案 → 用compare左右对比"
```

### Validation Checklist
- [ ] 第1-2页包含hero或quote（痛点呈现）
- [ ] 包含`{type: "media", img: "..."}`
- [ ] 价格方案用compare，不是bullets
- [ ] 视觉元素（media/quote）占比>30%

---

## Test Case 4: 数据对比场景（图表选择）

### Input
```
用户：对比今年Q1-Q4的营收趋势
数据：Q1:100M, Q2:120M, Q3:150M, Q4:180M
```

### Expected Behavior
```yaml
chart_type: "line" (不是bar)
reasoning: "时间趋势数据 → 必须用line折线图"
data_structure:
  labels: ["Q1", "Q2", "Q3", "Q4"]
  datasets: [{data: [100, 120, 150, 180]}]
```

### Validation Checklist
- [ ] `chart: "line"`（不是"bar"）
- [ ] datasets是数组格式：`[{data: [...]}]`
- [ ] labels按时间顺序排列
- [ ] 如果用户没说要bar，绝不能生成bar

---

## Test Case 5: 混合受众场景（高管+技术）

### Input
```
用户：向CEO和CTO汇报AI项目进展
受众：CEO（要结论）+ CTO（要细节）
时长：15分钟
内容：ROI数据、技术架构、风险评估
```

### Expected Behavior
```yaml
strategy: "分层展示"
structure:
  - 前3页: hero + metric (满足CEO，结论优先)
  - 后5页: tabs切换 (技术细节，满足CTO)
key_decisions:
  - "双受众 → 用tabs，让CEO看核心，CTO按需深入"
  - "ROI数据 → 前置到第2页metric"
  - "技术架构 → 放tabs里，不强制全员看"
```

### Validation Checklist
- [ ] 前3页包含hero + metric
- [ ] 包含tabs block，至少2个tab（如"技术细节"/"风险评估"）
- [ ] 第3页有提示："技术细节见tabs"

---

## Test Case 6: 反幻觉检查（数据一致性）

### Input
```
用户：汇报Q3营收
P1: {type: "metric", items: [{value: "125", label: "Q3营收(M)"}]}
P3: {type: "quote", text: "Q3营收130M，超预期"}
```

### Expected Error Detection
```yaml
error: "数据不一致"
detail: "P1显示125M，P3引用130M"
action: "AI自检发现后，拒绝生成或标注问题"
fix: "统一为125M或要求用户确认正确数字"
```

### Validation Checklist
- [ ] AI在生成后自动执行数据一致性检查
- [ ] 发现不一致时，在HTML注释中标注：`<!-- ⚠️ 数据冲突: P1=125, P3=130 -->`
- [ ] 控制台输出警告
- [ ] 建议用户检查

---

## Test Case 7: 边界情况（超长deck拒绝）

### Input
```
用户：做个100页的产品手册
```

### Expected Behavior
```yaml
action: "拒绝生成"
reason: "超过50页建议用a4-manual-maker skill"
alternative: "或拆分为多个10-15页演示"
```

### Validation Checklist
- [ ] AI不生成100页deck
- [ ] 明确告知用户超出范围
- [ ] 推荐a4-manual-maker skill
- [ ] 或建议拆分

---

## Test Case 8: 图表数据验证（datasets必须是数组）

### Input
```javascript
// 错误写法（AI常犯）
{
  type: "chart",
  chart: "line",
  data: {
    labels: ["Q1", "Q2"],
    datasets: {data: [100, 120]}  // ❌ 对象，不是数组
  }
}
```

### Expected Behavior
```yaml
error: "datasets格式错误"
fix: "datasets: [{data: [100, 120]}]"  # 必须是数组
```

### Validation Checklist
- [ ] AI生成后自检chart.data.datasets是否为数组
- [ ] 如果是对象，自动包裹为`[{...}]`
- [ ] 在SKILL.md中明确规则："datasets必须是数组"

---

## 运行测试的方法

### 手动测试（当前）
1. 在Claude中说出Test Case的Input
2. 检查生成的deck.js是否符合Expected Behavior
3. 在Validation Checklist中打勾

### 自动化测试（未来）
```python
# tests/test_skill_logic.py
import anthropic

def test_executive_report():
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-opus-4",
        messages=[{
            "role": "user",
            "content": "我要向董事会汇报Q3业绩，营收增长25%"
        }],
        skills=["interactive-narrative-deck"]
    )
    
    # 验证
    assert "metric" in response.output
    assert response.page_count <= 6
```

---

## 测试覆盖率目标

- [x] 高管汇报场景
- [x] 技术分享场景
- [x] 产品发布会场景
- [x] 数据图表选择
- [x] 混合受众场景
- [x] 反幻觉检查
- [x] 边界情况拒绝
- [x] 数据格式验证

**当前覆盖率：8/8 核心场景**

---

## 版本记录

- v1.0.0 (2026-08-19) - 初始版本，8个核心场景
- 下次更新：添加性能边界测试（30+页deck）
