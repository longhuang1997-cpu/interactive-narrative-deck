# 🚀 部署指南

本文档说明如何将Interactive Narrative Deck部署到GitHub Pages或其他静态网站托管服务。

---

## 📋 部署前准备

### 1. 截取演示截图

README中的演示截图目前是占位符，需要替换为实际截图：

```bash
# 启动本地服务器
python -m http.server 8080

# 访问演示页面
http://localhost:8080/examples/all-professional-blocks/
```

**截图步骤**：
1. 用方向键→切换到目标页面
2. 按F11全屏
3. 截图（Windows: Win+Shift+S，Mac: Cmd+Shift+4）
4. 保存为PNG，推荐尺寸1200×800px
5. 保存到`docs/images/`目录，命名为：
   - `demo-okr.png`
   - `demo-gantt.png`
   - `demo-fishbone.png`
   - `demo-bcg.png`

**临时方案**：如果暂时没有截图，可以暂时保留占位符文字，GitHub会正确处理图片路径（显示为broken image icon）

---

## 🌐 方式1：GitHub Pages（推荐）

### 步骤

1. **在GitHub仓库中启用GitHub Pages**
   - 访问：`https://github.com/longhuang1997-cpu/interactive-narrative-deck/settings/pages`
   - Source: 选择 `Deploy from a branch`
   - Branch: 选择 `main` / `/ (root)`
   - 点击Save

2. **等待部署完成**（约1-2分钟）
   - 部署成功后，访问：
   ```
   https://longhuang1997-cpu.github.io/interactive-narrative-deck/
   ```

3. **更新README中的演示链接**
   
   编辑`README.md`，将：
   ```markdown
   👉 [查看完整演示](https://yourname.github.io/interactive-narrative-deck/examples/all-professional-blocks/)  
   （部署后替换链接）
   ```
   
   替换为：
   ```markdown
   👉 [查看完整演示](https://longhuang1997-cpu.github.io/interactive-narrative-deck/examples/all-professional-blocks/)
   ```

4. **提交并推送**
   ```bash
   git add README.md
   git commit -m "docs: 更新演示链接为实际GitHub Pages地址"
   git push origin main
   ```

---

## 🖥️ 方式2：Vercel

### 步骤

1. 访问 [vercel.com](https://vercel.com)
2. 点击"Import Project"
3. 选择GitHub仓库：`longhuang1997-cpu/interactive-narrative-deck`
4. 配置：
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: 留空
   - Output Directory: `./`
5. 点击Deploy

部署完成后，Vercel会提供一个域名，如：
```
https://interactive-narrative-deck.vercel.app
```

---

## 📦 方式3：Netlify

### 步骤

1. 访问 [netlify.com](https://netlify.com)
2. 点击"Add new site" → "Import an existing project"
3. 选择GitHub仓库
4. 配置：
   - Build command: 留空
   - Publish directory: `./`
5. 点击Deploy

---

## 🔧 自定义域名（可选）

### GitHub Pages

1. 在仓库根目录创建`CNAME`文件：
   ```
   demo.yourdomain.com
   ```

2. 在域名DNS设置中添加CNAME记录：
   ```
   demo  CNAME  longhuang1997-cpu.github.io
   ```

3. 在GitHub Pages设置中输入自定义域名并勾选"Enforce HTTPS"

### Vercel/Netlify

在项目设置中直接添加自定义域名，平台会自动配置HTTPS证书。

---

## ✅ 验证部署

部署完成后，访问以下URL确认：

- 主页：`https://your-domain/`
- 完整演示：`https://your-domain/examples/all-professional-blocks/`
- SWOT演示：`https://your-domain/examples/swot-demo/`

**检查项**：
- ✅ 页面正常加载，无404错误
- ✅ CSS样式正确应用
- ✅ 动画效果正常（数字滚动、渐进揭示）
- ✅ 图表正常渲染（如果使用Chart.js）
- ✅ 键盘快捷键工作（方向键翻页、F11全屏）

---

## 🐛 常见问题

### 1. 样式丢失或404错误

**原因**：相对路径问题

**解决**：检查`index.html`中的资源路径是否正确：
```html
<!-- ✅ 正确 - 相对路径 -->
<link rel="stylesheet" href="../../engine/style.css">
<script src="../../engine/engine.js"></script>

<!-- ❌ 错误 - 绝对路径会在子路径部署时失效 -->
<link rel="stylesheet" href="/engine/style.css">
```

### 2. 图表不显示

**原因**：CDN被墙或网络问题

**解决**：
- 检查浏览器控制台是否有CDN加载错误
- 使用国内CDN镜像（如bootcdn.cn）
- 或下载Chart.js到本地

### 3. GitHub Pages显示旧版本

**原因**：浏览器缓存

**解决**：
- 硬刷新（Ctrl+Shift+R / Cmd+Shift+R）
- 或等待GitHub Pages缓存更新（约5分钟）

---

## 📊 监控和分析（可选）

### 添加Google Analytics

在`examples/*/index.html`的`<head>`中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔄 持续部署

GitHub Pages、Vercel、Netlify都支持自动部署：

**每次推送到main分支时，自动重新部署**

工作流：
```bash
# 本地修改
git add .
git commit -m "feat: 新增XXX功能"
git push origin main

# 自动触发部署（无需手动操作）
# 约1-3分钟后，更新生效
```

---

## 📝 后续TODO

部署完成后，建议完成以下任务：

- [ ] 替换演示截图占位符为实际截图
- [ ] 更新README中的演示链接
- [ ] 添加GitHub仓库描述和主题标签
- [ ] 创建GitHub Release（v3.1.0）
- [ ] 在社交媒体/技术社区分享
- [ ] 收集用户反馈，持续改进

---

**祝部署顺利！** 🎉

如有问题，请在GitHub Issues中提出。
