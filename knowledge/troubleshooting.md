# 故障排查指南 (Troubleshooting)

## 🔍 快速诊断

打开浏览器控制台（F12）查看错误信息：
- **404错误** → CDN加载失败
- **Uncaught ReferenceError** → 依赖库未加载
- **Uncaught TypeError** → 数据格式错误

---

## 常见问题与解决方案

### 1. 图表不显示

**症状**：页面显示正常，但chart区域空白

**可能原因**：
- ❌ `datasets`不是数组格式
- ❌ `data.labels`和`data.datasets[0].data`长度不一致
- ❌ Chart.js未加载

**解决方案**：
```javascript
// ❌ 错误写法
chart: {
  data: {
    labels: ["Q1", "Q2"],
    datasets: {data: [100, 200]}  // ← 应该是数组
  }
}

// ✅ 正确写法
chart: {
  data: {
    labels: ["Q1", "Q2"],
    datasets: [{data: [100, 200]}]  // ← 数组包裹对象
  }
}
```

**检查步骤**：
1. 打开控制台，查看是否有Chart.js加载失败
2. 检查deck.js中所有chart的datasets字段
3. 确保labels和data长度相同

---

### 2. 渐进揭示失效

**症状**：设置了`stagger: true`，但bullets一次全显示

**可能原因**：
- ❌ GSAP未加载（CDN失败）
- ❌ `stagger`拼写错误
- ❌ 未按空格键触发

**解决方案**：
1. 检查网络连接，GSAP是否加载成功
2. 添加本地备份：
```html
<!-- 在index.html的</body>前添加 -->
<script>
if (typeof gsap === 'undefined') {
  document.write('<script src="./vendor/gsap.min.js"><\/script>');
}
</script>
```

3. 降级为CSS动画（自动触发）：
```javascript
// deck.js中添加
const USE_CSS_FALLBACK = true;
```

---

### 3. 翻页笔无响应

**症状**：翻页笔点击无反应，左右键正常

**可能原因**：
- ❌ 翻页笔映射的不是标准键盘事件
- ❌ 全屏模式下键盘事件被拦截

**解决方案**：
1. 退出全屏（ESC）重新进入
2. 测试翻页笔是否映射为PageUp/PageDown
3. 使用左右方向键替代
4. 部分翻页笔需要切换模式（查看说明书）

---

### 4. 中文乱码

**症状**：中文显示为 `锟斤拷` 或 `???`

**原因**：文件编码不是UTF-8

**解决方案**：
```bash
# VS Code: 右下角点击编码 → "通过编码保存" → UTF-8

# 命令行转换
iconv -f GBK -t UTF-8 index.html > index_utf8.html
```

---

### 5. CDN加载失败

**症状**：离线环境或公司网络拦截CDN

**解决方案**：
```bash
# 1. 下载到本地
mkdir vendor
curl -o vendor/gsap.min.js https://cdn.jsdelivr.net/npm/gsap@3.12.2/dist/gsap.min.js
curl -o vendor/chart.min.js https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js

# 2. 修改index.html
# 将CDN链接改为：
<script src="./vendor/gsap.min.js"></script>
<script src="./vendor/chart.min.js"></script>
```

**降级效果**：
- GSAP失效 → 渐进揭示变为立即显示，数字滚动变为直接显示
- Chart.js失效 → 需要手动替换为静态图片

---

### 6. 数据量过大卡顿

**症状**：图表有500+数据点，翻页卡顿

**优化方案**：
```javascript
// 方案1: 数据采样
const sampledLabels = data.labels.filter((_, i) => i % 5 === 0);
const sampledData = data.values.filter((_, i) => i % 5 === 0);

// 方案2: 关闭动画
chart: {
  options: {
    animation: false
  }
}

// 方案3: 分页展示
// 拆成多页，每页≤100个数据点
```

---

### 7. 浏览器兼容性问题

**支持的浏览器**：
- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ❌ IE11（不支持）

**Safari已知问题**：
```javascript
// 问题1: backdrop-filter不生效
// 解决: 自动回退到纯色背景（无需修改）

// 问题2: scrollTrigger不平滑
// 解决: 改用CSS scroll-snap
.page {
  scroll-snap-type: y mandatory;
}
```

---

### 8. 移动端显示错位

**症状**：手机/平板上布局错乱

**说明**：本skill定位**桌面演示**，移动端仅供预览

**临时修复**：
```css
/* 在style.css中添加 */
@media (max-width: 768px) {
  .block { font-size: 14px; }
  .metric .value { font-size: 36px; }
}
```

---

### 9. F11全屏后顶部有白边

**原因**：浏览器全屏API的默认边距

**解决方案**：
```css
/* 在style.css中添加 */
:-webkit-full-screen { padding: 0; }
:-moz-full-screen { padding: 0; }
:fullscreen { padding: 0; }
```

---

### 10. Git提交后版本号不一致

**症状**：SKILL.md是2.0.1，但marketplace.json还是2.0.0

**解决方案**：
```bash
# 方式1: 手动检查
cat SKILL.md | grep version
cat .claude-plugin/marketplace.json | grep version

# 方式2: 自动检查（需要Git仓库）
./check-version.sh

# 方式3: 让Claude帮你
# 说："递增版本号" 或 "bump version"
```

---

## 🆘 仍然无法解决？

1. **查看控制台完整错误信息**（F12 → Console）
2. **检查文件完整性**：
   ```bash
   ls -lh index.html deck.js engine/
   ```
3. **尝试官方示例**：
   ```bash
   cp examples/strategy-report/index.html ./test.html
   open test.html
   ```
4. **提交Issue**：[GitHub Issues](https://github.com/longhuang1997-cpu/interactive-narrative-deck/issues)
   - 贴上完整错误信息
   - 说明操作步骤
   - 浏览器版本和操作系统

---

## 📞 联系方式

- GitHub: [@longhuang1997-cpu](https://github.com/longhuang1997-cpu)
- Email: your-email@example.com
- 技能大赛交流群: [加入讨论]

---

**小贴士**：80%的问题都是`datasets`格式错误或CDN加载失败，先检查这两项！
