# 📸 演示截图制作指南

本文档详细说明如何为Interactive Narrative Deck制作高质量的演示截图。

---

## 🎯 截图目标

需要截取以下5张演示截图：

| 文件名 | 页面位置 | 内容 | 用途 |
|--------|----------|------|------|
| `demo-okr.png` | P2（第2页） | OKR目标管理 | README展示 |
| `demo-gantt.png` | P3（第3页） | 甘特图项目时间线 | README展示 |
| `demo-fishbone.png` | P4（第4页） | 鱼骨图根因分析 | README展示 |
| `demo-bcg.png` | P5（第5页） | BCG矩阵业务组合 | README展示 |
| `demo-kanban.png` | P6（第6页） | 看板任务管理 | 可选 |

---

## 方式1：手动截图（推荐）⭐

### 优点
- ✅ 无需安装额外依赖
- ✅ 质量可控，可以手动调整
- ✅ 适合所有操作系统

### 详细步骤

#### 1️⃣ 启动本地服务器

```bash
cd /c/Users/huangl265/.claude/skills/interactive-narrative-deck
python -m http.server 8080
```

保持终端运行，不要关闭。

---

#### 2️⃣ 打开浏览器访问演示

访问：http://localhost:8080/examples/all-professional-blocks/

**推荐浏览器**：Chrome或Edge（动画效果最佳）

---

#### 3️⃣ 准备截图环境

1. **调整浏览器窗口**
   - 按F11进入全屏模式（隐藏地址栏和标签栏）
   - 或者最大化窗口

2. **等待页面完全加载**
   - 确保所有动画播放完成
   - 数字滚动动画结束
   - 图表渲染完成

---

#### 4️⃣ 截取每个Block页面

**页面导航**：
- 使用方向键 **→** 前进到下一页
- 使用方向键 **←** 返回上一页
- 页面标题会显示当前位置

**截图工具选择**：

##### Windows系统

**方法A：Windows截图工具（推荐）**
```
Win + Shift + S
→ 选择"窗口截图"或"矩形截图"
→ 自动保存到剪贴板
→ 粘贴到画图或其他工具
→ 另存为PNG
```

**方法B：浏览器开发者工具（最精确）**
```
1. 按F12打开开发者工具
2. 按Ctrl+Shift+P（命令面板）
3. 输入"screenshot"
4. 选择"Capture screenshot"（整页截图）
   或"Capture node screenshot"（选择元素）
5. 自动下载PNG文件
```

**方法C：第三方工具**
- Snagit
- Greenshot
- ShareX

##### Mac系统

**方法A：系统快捷键**
```
Cmd + Shift + 4
→ 空格键切换到窗口模式
→ 点击浏览器窗口
→ 自动保存到桌面
```

**方法B：浏览器开发者工具**
```
1. 按Cmd+Option+I打开开发者工具
2. 按Cmd+Shift+P（命令面板）
3. 输入"screenshot"
4. 选择截图类型
```

---

#### 5️⃣ 截图清单

按顺序截取：

**📍 第2页：OKR目标管理**
```
→ 按方向键→前进到第2页
→ 等待2秒（动画完成）
→ 截图
→ 保存为: docs/images/demo-okr.png
```

**📍 第3页：甘特图**
```
→ 继续按→前进到第3页
→ 等待进度条动画完成
→ 截图
→ 保存为: docs/images/demo-gantt.png
```

**📍 第4页：鱼骨图**
```
→ 继续按→前进到第4页
→ 等待鱼骨图淡入动画
→ 截图
→ 保存为: docs/images/demo-fishbone.png
```

**📍 第5页：BCG矩阵**
```
→ 继续按→前进到第5页
→ 等待气泡弹出动画
→ 截图
→ 保存为: docs/images/demo-bcg.png
```

**📍 第6页：看板（可选）**
```
→ 继续按→前进到第6页
→ 等待卡片滑入动画
→ 截图
→ 保存为: docs/images/demo-kanban.png
```

---

#### 6️⃣ 优化截图质量

**分辨率建议**：
- 最小：1200 × 800px
- 推荐：1920 × 1080px（标准1080p）
- 最佳：2560 × 1440px（2K，适合高清屏幕）

**优化技巧**：
1. **避免模糊**
   - 使用原生分辨率
   - 不要缩放浏览器（Ctrl+0重置缩放）
   - 截图后不要再压缩

2. **色彩准确**
   - 使用PNG格式（无损）
   - 不要使用JPG（有损压缩）
   - 确保显示器色彩正常

3. **内容完整**
   - 确保Block内容不被裁剪
   - 保留足够的边距
   - 避免截取到浏览器UI

---

#### 7️⃣ 保存截图

将截图保存到正确位置：

```bash
interactive-narrative-deck/
└── docs/
    └── images/
        ├── demo-okr.png       ✅ OKR截图
        ├── demo-gantt.png     ✅ 甘特图截图
        ├── demo-fishbone.png  ✅ 鱼骨图截图
        ├── demo-bcg.png       ✅ BCG截图
        └── demo-kanban.png    ✅ 看板截图（可选）
```

---

#### 8️⃣ 验证截图

检查清单：
- [ ] 文件格式是PNG（不是JPG）
- [ ] 文件大小合理（每张<1MB）
- [ ] 分辨率至少1200×800px
- [ ] 图片清晰，没有模糊
- [ ] 内容完整，没有裁剪
- [ ] 动画已完成（数字/进度条/气泡）
- [ ] 配色正确（深蓝背景#0f172a）

---

## 方式2：自动化截图脚本

### Python版本（Playwright）

#### 安装依赖
```bash
pip install playwright
playwright install chromium
```

#### 运行脚本
```bash
# 确保HTTP服务器运行
python -m http.server 8080

# 新终端运行截图脚本
python screenshot_generator.py
```

---

### Node.js版本（Puppeteer）

#### 安装依赖
```bash
npm install puppeteer
```

#### 运行脚本
```bash
# 确保HTTP服务器运行
python -m http.server 8080

# 新终端运行截图脚本
node screenshot_generator.js
```

---

## 🎨 截图后处理（可选）

如果需要进一步优化：

### 使用在线工具

1. **压缩PNG（保持质量）**
   - TinyPNG: https://tinypng.com/
   - Squoosh: https://squoosh.app/

2. **添加边框/阴影**
   - Photopea: https://www.photopea.com/（免费在线PS）
   - Canva: https://www.canva.com/

3. **批量处理**
   - IrfanView（Windows）
   - ImageMagick（命令行）

### 使用命令行工具

**ImageMagick批量添加阴影**：
```bash
cd docs/images
for file in demo-*.png; do
  convert "$file" \
    -bordercolor none -border 20 \
    \( +clone -background black -shadow 80x3+10+10 \) \
    +swap -background none -layers merge +repage \
    "shadow_$file"
done
```

---

## ✅ 提交截图到Git

截图完成后：

```bash
# 查看文件
ls docs/images/

# 添加到Git
git add docs/images/*.png

# 提交
git commit -m "docs: 添加演示截图

- OKR目标管理演示
- 甘特图项目时间线演示
- 鱼骨图根因分析演示
- BCG矩阵业务组合演示
- 看板任务管理演示"

# 推送到GitHub
git push origin main
```

---

## 📊 截图质量标准

### ✅ 合格标准
- 分辨率 ≥ 1200×800px
- 文件格式 PNG
- 文件大小 < 1MB
- 内容完整清晰
- 动画已完成

### ⭐ 优秀标准
- 分辨率 ≥ 1920×1080px
- 2x设备像素比（高清屏幕）
- 文件大小 < 500KB（经过压缩）
- 构图美观，留白合理
- 色彩准确

---

## 🐛 常见问题

### Q1: 截图模糊怎么办？
**A**: 
- 按Ctrl+0重置浏览器缩放
- 使用原生分辨率
- 使用浏览器开发者工具截图

### Q2: 动画截取到一半？
**A**: 
- 等待2-3秒再截图
- 或使用自动化脚本（有延迟）

### Q3: 文件太大？
**A**: 
- 使用TinyPNG压缩
- 或降低分辨率到1200×800

### Q4: 截图颜色不对？
**A**: 
- 检查显示器色彩设置
- 确保保存为PNG（不是JPG）
- 使用正确的浏览器（Chrome/Edge）

---

## 📮 需要帮助？

如果遇到问题：
1. 检查本文档的常见问题部分
2. 在GitHub Issues提问
3. 提供截图和错误信息

---

**祝截图顺利！** 📸✨
