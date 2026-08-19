# 安全与隐私声明

> Interactive Narrative Deck的安全架构与数据隐私保护

---

## 🔒 安全特性

### 1. 纯本地运行
- ✅ **100%本地生成**：所有HTML文件在本地电脑生成，无需连接任何服务器
- ✅ **无数据上传**：用户提供的素材、数据、内容绝不上传到任何第三方服务
- ✅ **无追踪代码**：生成的HTML不包含任何统计、追踪、分析代码
- ✅ **离线可用**：生成后的HTML可完全离线使用（CDN降级后）

### 2. 权限边界

#### Skill运行时权限
- **文件读取**：仅读取用户明确提供的素材（如用户粘贴的文本、指定的数据）
- **文件写入**：仅生成HTML文件到用户桌面或指定目录
- **无系统权限**：不访问系统文件、环境变量、网络配置
- **无网络请求**：Skill本身不发起任何网络请求

#### 生成HTML的权限
- **浏览器沙箱运行**：生成的HTML在浏览器沙箱内运行，无系统级权限
- **仅加载CDN资源**：GSAP和Chart.js从公共CDN加载（可选）
- **无Cookie**：不设置任何Cookie或LocalStorage（仅用LocalStorage记录当前页码）
- **无第三方脚本**：除GSAP/Chart.js外，无任何第三方脚本

---

## 🛡️ 数据隐私

### 1. 无数据收集
- ❌ 不收集用户信息（姓名、邮箱、IP地址）
- ❌ 不收集使用统计（生成次数、使用时长）
- ❌ 不收集内容数据（用户提供的素材、生成的演示内容）
- ❌ 不收集设备信息（浏览器版本、操作系统、屏幕分辨率）

### 2. 敏感数据处理建议

#### 在生成时
如果演示内容包含敏感数据（财务数据、客户信息、内部战略），建议：
1. **用占位符代替**：生成时用【待填入】占位，演示前手动填写
2. **脱敏处理**：对人名、公司名、具体数字进行脱敏
3. **分离存储**：将敏感版本存储在加密磁盘

#### 在演示时
如果需要在公开场合演示：
1. **准备两个版本**：内部版本（真实数据）+ 公开版本（脱敏数据）
2. **检查截图**：演示前检查是否有敏感信息泄露在页面某处
3. **全屏演示**：使用F11全屏，避免浏览器地址栏泄露文件路径

---

## 🔐 代码审计

### 开源可审计
- ✅ **完整开源**：所有代码托管在GitHub，任何人可审计
- ✅ **MIT许可证**：允许自由使用、修改、分发
- ✅ **无混淆**：所有JavaScript代码未混淆，可直接阅读
- ✅ **单文件架构**：engine.js + style.css，代码结构清晰

### 审计要点
```bash
# 克隆仓库进行审计
git clone https://github.com/longhuang1997-cpu/interactive-narrative-deck.git
cd interactive-narrative-deck

# 检查是否有网络请求（除CDN外）
grep -r "fetch\|XMLHttpRequest\|axios" engine/

# 检查是否有敏感权限调用
grep -r "require\|import\|eval\|Function" engine/

# 检查是否有数据上传
grep -r "upload\|post\|send" engine/
```

**审计结论**：无网络请求、无eval、无数据上传。

---

## 🌐 第三方依赖

### CDN依赖（可选）
生成的HTML默认从CDN加载两个库：

1. **GSAP 3.12.5**
   - 来源：`https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js`
   - 用途：页面进入动画、数字滚动动效
   - 隐私：开源库，无追踪代码
   - 降级：CDN失败时自动降级为纯CSS动画

2. **Chart.js 4.4.1**
   - 来源：`https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js`
   - 用途：图表渲染（折线图/柱状图/饼图）
   - 隐私：开源库，无追踪代码
   - 降级：CDN失败时显示"(图表需Chart.js，当前离线)"

### 完全离线方案
如需完全离线使用（不依赖CDN）：
```bash
# 下载库到本地
mkdir vendor
curl -o vendor/gsap.min.js https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js
curl -o vendor/chart.min.js https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js

# 修改index.html引用路径
# 将 <script src="https://cdn..."> 改为 <script src="vendor/...">
```

---

## ⚠️ 安全注意事项

### 1. 用户输入验证
Skill会对用户输入进行HTML转义，防止XSS注入：
```javascript
// 示例：用户输入的标题会被转义
const title = escapeHtml(userInput.title);
```

但**不保证100%防御**，建议：
- ❌ 不要将未知来源的HTML直接粘贴到deck.js
- ✅ 检查生成的HTML，确保无恶意脚本

### 2. CDN劫持风险
虽然GSAP和Chart.js来自可信CDN（jsDelivr），但理论上存在CDN劫持风险。

**缓解措施**：
- 使用完全离线方案（下载到本地）
- 或使用Subresource Integrity (SRI)：
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
        integrity="sha384-..."
        crossorigin="anonymous"></script>
```

### 3. 浏览器漏洞
生成的HTML运行在浏览器中，受浏览器安全机制保护，但：
- ❌ 如果浏览器本身有漏洞，本Skill无法防御
- ✅ 建议使用最新版Chrome/Firefox/Edge

---

## 🔍 常见安全问题FAQ

### Q1: 生成的HTML会不会泄露我的数据？
**A**: 不会。HTML完全存储在本地，除非你主动分享，否则任何人无法访问。

### Q2: 我可以在内网使用吗？
**A**: 可以。Skill本身100%本地运行，生成的HTML也可以离线使用（需下载GSAP和Chart.js到本地）。

### Q3: 如果我的演示包含机密信息，安全吗？
**A**: 
- ✅ 如果存储在本地电脑，安全
- ⚠️ 如果上传到公开服务器（如GitHub Pages），有泄露风险
- 建议：机密演示只存储在本地或内网服务器

### Q4: 我可以在生产环境使用吗？
**A**: 可以，但建议：
- 对敏感数据进行脱敏
- 使用离线版本（不依赖CDN）
- 定期更新到最新版本

### Q5: 代码开源意味着有安全风险吗？
**A**: 恰恰相反。开源代码可被任何人审计，比闭源更安全。如果有安全漏洞，社区会快速发现并修复。

---

## 📞 安全问题报告

如果发现安全漏洞，请通过以下方式报告：

1. **GitHub Security Advisory**（推荐）：
   https://github.com/longhuang1997-cpu/interactive-narrative-deck/security/advisories

2. **GitHub Issues**：
   https://github.com/longhuang1997-cpu/interactive-narrative-deck/issues
   （如果漏洞不严重，可公开Issue）

3. **私密邮件**：
   （待补充）

---

## 📝 安全更新日志

### v2.1.0 (2026-08-19)
- ✅ 补充完整安全与隐私声明文档
- ✅ 明确权限边界和数据隐私承诺
- ✅ 提供完全离线方案指导

### v2.0.0 (2026-08-10)
- ✅ 单文件HTML架构，无服务器依赖
- ✅ 用户输入HTML转义防XSS

### v1.0.0 (2026-06-15)
- ✅ 初始版本，纯本地运行

---

**最后更新：2026-08-19**

**承诺**：我们承诺Interactive Narrative Deck永久保持：
1. 100%本地运行
2. 无数据收集
3. 完全开源
4. MIT许可证

如有违背，用户可自由fork并维护自己的版本。
