# 🔒 安全与隐私声明

## 可验证的安全承诺

### 1. 本地生成，零网络传输

**验证方法**：
```bash
# 方法1：断网测试
1. 断开网络连接
2. 运行 interactive-narrative-deck skill
3. 生成的deck.js和index.html完全可用

# 方法2：网络监控
1. 打开浏览器开发者工具（F12 → Network）
2. 生成演示文稿
3. 验证：仅有CDN请求（GSAP/Chart.js），无用户数据上传
```

**代码证据**：
- 所有生成逻辑在 `skill.md` 中，无API调用
- HTML单文件输出，不依赖服务器
- 查看源码：[skill.md](skill.md) 无网络请求代码

---

### 2. 无敏感数据存储

**验证方法**：
```bash
# 检查是否有数据收集
grep -r "fetch\|XMLHttpRequest\|analytics\|tracking" engine/
# 结果：仅CDN库引用，无追踪代码
```

**文件系统证明**：
```bash
# 生成的所有文件
./
├── deck.js          # 用户数据（本地）
├── index.html       # 演示文件（本地）
└── style.css        # 样式（本地）

# 无任何日志/缓存/上传文件
```

---

### 3. 权限边界明确

**Skill权限清单**：
```json
{
  "permissions": {
    "file_read": ["knowledge/", "templates/"],
    "file_write": ["./**/deck.js", "./**/index.html"],
    "network": "none"
  }
}
```

**用户控制**：
- ✅ 所有文件写入前显示路径和内容预览
- ✅ 用户可选择保存位置
- ✅ 每次生成前显示将使用的框架和数据

---

### 4. 开源可审计

**代码透明度**：
- GitHub仓库：https://github.com/longhuang1997-cpu/interactive-narrative-deck
- 所有源码公开，可审计
- 无混淆、无加密、无隐藏逻辑

**第三方依赖审计**：
```javascript
// 仅两个CDN依赖，均可替换为本地
"https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"      // 动画库
"https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"  // 图表库

// 离线降级：自动禁用动效和图表，不影响内容
```

---

## 安全最佳实践

### 用户数据保护

**输入数据**：
- ✅ 用户提供的数据仅存储在本地文件
- ✅ 不传输到任何服务器
- ✅ 不写入日志或缓存

**输出文件**：
- ✅ 单文件HTML，可断网使用
- ✅ 包含用户数据，需用户自行管理权限
- ✅ 建议：敏感数据演示后删除本地文件

---

### 企业使用建议

**内网部署**：
```bash
# 1. 下载依赖到本地（可选）
npm install gsap chart.js
# 修改HTML中的CDN链接为本地路径

# 2. 禁止外网访问
# 在HTML中删除CDN引用，使用本地库
```

**数据脱敏**：
```javascript
// 建议：演示前对敏感数据脱敏
const data = {
  metric: [
    { value: "1200万", label: "营收" }  // ✅ 真实数据
    // 或
    { value: "XXX万", label: "营收" }   // ✅ 脱敏后
  ]
}
```

---

## 隐私政策

### 数据收集

**我们不收集**：
- ❌ 用户输入的任何内容
- ❌ 生成的文件
- ❌ 使用行为
- ❌ 个人信息

**CDN提供商可能收集**：
- ⚠️ GSAP/Chart.js的CDN访问日志（IP、时间）
- 💡 解决方案：使用本地库替代CDN

---

## 漏洞报告

如发现安全问题，请：
1. 邮件：security@example.com（私密报告）
2. GitHub Security Advisory：https://github.com/longhuang1997-cpu/interactive-narrative-deck/security/advisories/new

**不要公开披露**，直到我们有机会修复。

---

## 合规声明

- ✅ GDPR兼容（无个人数据收集）
- ✅ 企业内网可用（无外网依赖）
- ✅ 审计友好（开源，可审计）

---

**最后更新**：2026-08-21  
**版本**：v3.1.0
