# SWOT分析示例

> 展示专业商业分析Block（SWOT）的完整使用

---

## 📄 案例说明

**场景**：某SaaS公司Q3战略复盘，向董事会汇报

**受众**：董事会成员（高管）

**目标**：
- 呈现Q3关键数据
- 通过SWOT分析战略形势
- 推导Q4战略方向和行动计划

**页数**：6页

---

## 🎯 页面结构

```
P1: 封面（hero）
    ├─ 标题：业务战略复盘
    └─ 副标题：2026年Q3

P2: 关键数据（metric）
    ├─ 营收：125M（+25%）
    ├─ 用户留存率：78%（+5%）
    └─ 新签客户：120家（+40）

P3: SWOT分析（swot）★ 核心
    ├─ Strengths（优势）：4条
    ├─ Weaknesses（劣势）：4条
    ├─ Opportunities（机会）：4条
    └─ Threats（威胁）：4条

P4: 战略方向（bullets + stagger）
    ├─ SO策略：用AI能力抢大客户
    ├─ ST策略：强化数据安全认证
    ├─ WO策略：拓展AI产品线
    └─ WT策略：暂缓国际化，聚焦国内

P5: 行动计划（timeline）
    ├─ 10月：启动AI产品线开发
    ├─ 11月：完成数据安全认证
    ├─ 12月：发起大客户攻坚战
    └─ Q1 2027：复盘战略执行成果

P6: 金句收尾（quote）
    └─ "抓住AI红利期，用优势打机会，用速度对抗威胁"
```

---

## 🔑 SWOT Block使用要点

### 基础用法

```javascript
{
  type: 'swot',
  strengths: ['优势1', '优势2', ...],
  weaknesses: ['劣势1', '劣势2', ...],
  opportunities: ['机会1', '机会2', ...],
  threats: ['威胁1', '威胁2', ...]
}
```

### 可选参数

```javascript
{
  type: 'swot',
  title: 'Q3战略分析',  // 可选标题
  strengths: [...],
  weaknesses: [...],
  opportunities: [...],
  threats: [...],
  showLegend: true  // 是否显示图例（默认true）
}
```

### 样式特点

- **2x2矩阵布局**：标准SWOT视觉语言
- **4象限配色**：
  - 优势（Strengths）：绿色 #10b981
  - 劣势（Weaknesses）：红色 #ef4444
  - 机会（Opportunities）：蓝色 #3b82f6
  - 威胁（Threats）：橙色 #f59e0b
- **悬停交互**：鼠标悬停象限会上浮
- **逐条动画**：列表项依次淡入

---

## 📐 填写建议

### Strengths（优势）
**问题**：相比竞争对手，我们什么做得更好？

**维度**：品牌、产品、资源、能力

**示例**：
```yaml
strengths:
  - 品牌知名度行业TOP3，用户心智强
  - 技术团队200+人，AI能力领先
  - 大客户续费率98%，远超行业平均75%
```

### Weaknesses（劣势）
**问题**：我们哪些地方落后于竞争对手？

**维度**：成本、能力、资源、组织

**示例**：
```yaml
weaknesses:
  - 国际化能力弱，海外营收占比仅5%
  - 供应链成本高于行业平均15%
```

### Opportunities（机会）
**问题**：外部环境哪些趋势对我们有利？

**维度**：政策、技术、市场、竞争

**示例**：
```yaml
opportunities:
  - AI技术成熟，大模型成本下降50%
  - 东南亚市场年增长30%，本地化竞争弱
```

### Threats（威胁）
**问题**：外部环境哪些因素可能伤害我们？

**维度**：政策、技术、市场、竞争

**示例**：
```yaml
threats:
  - 监管趋严，数据合规成本提高
  - 头部竞争对手B融资10亿，准备打价格战
```

---

## 🚀 如何运行

### 方式1：直接打开
```bash
# Windows
双击 index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 方式2：本地服务器
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# 然后访问
http://localhost:8000/examples/swot-demo/
```

---

## ⌨️ 快捷键

| 按键 | 功能 |
|------|------|
| `←` / `→` | 上一页 / 下一页 |
| `PageUp` / `PageDown` | 上一页 / 下一页 |
| `Space` | 渐进揭示（P4的战略方向会逐条显示）|
| `O` | 总览模式（查看所有页面）|
| `Home` / `End` | 跳到第一页 / 最后一页 |
| `F11` | 全屏演示 |

---

## 🎨 自定义样式

### 修改SWOT配色

编辑 `../../engine/style.css`：

```css
.nd-swot-quad {
  --quad-color: #your-color;  /* 自定义颜色 */
}
```

### 修改主题色

编辑 `deck.js`：

```javascript
theme: {
  blue: '#2563eb',   // 主色调
  gold: '#e8c874',   // 强调色
  bg: '#0b1220'      // 背景色
}
```

---

## 📚 相关文档

- [SWOT方法论知识卡片](../../knowledge/frameworks/swot-analysis.md)
- [Block扩展开发指南](../../docs/BLOCK_EXTENSION_GUIDE.md)
- [产品战略路线图](../../docs/PRODUCT_STRATEGY_ROADMAP.md)

---

## 🔗 更多案例

- [战略汇报](../strategy-report/) - 高管汇报场景
- [技术分享](../tech-talk/) - 技术团队分享
- [产品发布](../data-review/) - 数据复盘场景

---

**创建时间**：2026-08-19  
**Block版本**：business-blocks.js v1.0.0
