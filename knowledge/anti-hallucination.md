# 幻觉风险清单与输出稳定性保障

> 执行层 - 消除Claude生成不稳定输出的风险

## 🚨 高频幻觉风险

### 1. 使用不存在的block类型
**错误示例**：
```javascript
{ type: "table", ... }      // ❌ 不存在
{ type: "code", ... }       // ❌ 不存在
{ type: "list", ... }       // ❌ 不存在（应用bullets）
{ type: "card", ... }       // ❌ 不存在
```
**只有这9种block**：`hero` `metric` `bullets` `compare` `timeline` `quote` `chart` `media` `tabs`

### 2. Chart.js数据格式错误
```javascript
// ❌ 错误：datasets不是数组
data: { labels:[...], data:[...] }

// ✅ 正确：datasets必须是数组
data: { labels:[...], datasets:[{ label:"系列名", data:[...], borderColor:"#38bdf8" }] }
```

### 3. metric的value必须是字符串
```javascript
{ value: 128.5, ... }   // ❌ 数字类型
{ value: "128.5", ... } // ✅ 字符串类型
```

### 4. frag和stagger混用
```javascript
// ❌ 错误：bullets已有stagger，再加frag会双重触发
{ type:"bullets", stagger:true, frag:true }

// ✅ 正确：二选一
{ type:"bullets", stagger:true }   // 每条单独渐进
{ type:"bullets", frag:true }      // 整个block渐进
```

---

## 🛡️ 输出稳定性铁律

### 铁律1：每页block数量≤3
超过3个block会导致内容溢出、视觉拥挤。宁可多加一页，不堆一页。

### 铁律2：chart只用于有真实数据的场景
没有真实数据时，**不要编造数字**，改用bullets或quote。

### 铁律3：hero必须出现在每页的第一个block
hero作为页标题，始终放第一位。

### 铁律4：index.html和deck.js必须同目录
引擎路径是相对路径，两个文件必须在同一目录下。

### 铁律5：中文不交给AI生图
engine不支持图片生成，media block的img路径必须是用户提供的真实文件。

---

## ✅ 生成前检查清单

Claude在生成deck.js前，必须确认：

- [ ] 所有block的type是否在9种合法类型内？
- [ ] chart的data.datasets是否是数组格式？
- [ ] metric的value是否是字符串？
- [ ] 每页block数量是否≤3？
- [ ] media的img/video路径是否是用户提供的真实路径？
- [ ] frag和stagger是否没有同时使用？

---

## 🔄 视觉QA反馈机制（对标presentation-skills）

生成完deck.js后，建议执行：
1. 询问用户："要我检查每页的block数量和类型是否合规吗？"
2. 自动扫描deck.js中的所有type字段，对照合法列表验证
3. 报告任何不在列表中的type，提示修正
