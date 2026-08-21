# 🎬 GIF Demo录制指南

本文档说明如何为Interactive Narrative Deck录制高质量的演示GIF。

---

## 📁 准备工作

### 1. 演示文件已准备

位置：`C:\Users\huangl265\Desktop\`
- `all-blocks-demo.html` - HTML入口
- `deck-all-blocks.js` - 配置文件（16页完整演示）

### 2. 启动HTTP服务器

```bash
cd C:\Users\huangl265\.claude\skills\interactive-narrative-deck
python -m http.server 8080
```

### 3. 打开演示页面

双击桌面的 `all-blocks-demo.html` 或访问：
```
file:///C:/Users/huangl265/Desktop/all-blocks-demo.html
```

按 **F11** 进入全屏模式。

---

## 🎥 录制工具选择

### ⭐ 推荐：ScreenToGif（Windows）

**优点**：
- ✅ 完全免费开源
- ✅ 录制、编辑、导出一体化
- ✅ 支持裁剪、删帧、添加文字
- ✅ 文件小、质量高

**下载**：https://www.screentogif.com/

**安装**：
```
1. 下载 ScreenToGif.Setup.msi
2. 双击安装
3. 启动 ScreenToGif
```

---

### 方案2：LICEcap（轻量级）

**优点**：
- ✅ 轻量简单
- ✅ 跨平台（Windows/Mac）
- ✅ 直接录制GIF

**下载**：https://www.cockos.com/licecap/

---

### 方案3：OBS Studio + FFmpeg（专业级）

**优点**：
- ✅ 专业级录屏
- ✅ 高清视频，后转GIF
- ✅ 自定义参数

**下载**：https://obsproject.com/

---

## 📹 录制步骤（ScreenToGif）

### 1️⃣ 启动ScreenToGif

打开软件 → 点击 **Recorder（录制器）**

### 2️⃣ 设置录制区域

1. **调整录制窗口大小**
   - 推荐尺寸：**1280×720** 或 **1920×1080**
   - 确保完整覆盖浏览器内容区

2. **对齐到浏览器窗口**
   - 隐藏浏览器地址栏和标签栏（F11全屏）
   - 录制框对齐到内容区

### 3️⃣ 设置录制参数

点击 **Options（选项）**：
- **帧率（FPS）**：15-20 FPS（流畅但文件小）
- **录制质量**：高（High）
- **鼠标光标**：可选显示或隐藏

### 4️⃣ 开始录制

1. 点击 **Record（录制）** 按钮
2. 倒计时3秒后开始
3. 演示操作：
   - 在封面停留 **2秒**
   - 按方向键 **→** 翻到下一页
   - 每页停留 **2-3秒**
   - 连续翻页展示16页内容
4. 点击 **Stop（停止）** 结束录制

### 5️⃣ 编辑GIF

录制完成后自动打开编辑器：

**删除多余帧**：
- 选中开头/结尾的停顿帧
- 按 **Delete** 删除

**调整速度**：
- 选中所有帧（Ctrl+A）
- 右键 → **Override Delay（覆盖延迟）**
- 设置为 **66ms**（15 FPS）或 **50ms**（20 FPS）

**添加标题文字**（可选）：
- **Image** → **Caption（字幕）**
- 在第1帧添加："Interactive Narrative Deck v3.1"
- 字体：Arial Bold，大小：36，颜色：白色

**裁剪边缘**：
- **Image** → **Crop（裁剪）**
- 去除多余的空白边缘

### 6️⃣ 导出GIF

1. 点击 **File** → **Save as（另存为）**
2. 选择 **Gif**
3. 编码器选择：**System.Drawing**（兼容性最好）
4. 设置：
   - **Quality（质量）**：85-95
   - **Loop（循环）**：Forever（无限循环）
5. 保存位置：`docs/images/demo.gif`

---

## 🎨 录制建议

### 分辨率选择

| 分辨率 | 用途 | 文件大小 |
|--------|------|----------|
| **1280×720** | README展示（推荐） | 3-8 MB |
| **1920×1080** | 高清演示 | 8-15 MB |
| **800×600** | 快速预览 | 1-3 MB |

### 帧率选择

| 帧率 | 效果 | 文件大小 |
|------|------|----------|
| **10 FPS** | 略卡顿，但文件很小 | 小 |
| **15 FPS** | 流畅度够用（推荐） | 中 |
| **20 FPS** | 很流畅 | 中偏大 |
| **30 FPS** | 极度流畅，但不必要 | 大 |

### 时长控制

**完整演示（推荐）**：
- 16页 × 2.5秒/页 = **40秒**
- 适合README顶部展示

**快速预览**：
- 精选6-8个核心Block
- 时长控制在 **20秒** 内

**详细演示**：
- 每页停留3-4秒
- 时长约 **60秒**
- 适合产品页面

---

## 🗜️ GIF优化压缩

### 在线工具（推荐）

**ezgif.com**：
```
1. 访问: https://ezgif.com/optimize
2. 上传GIF
3. 优化级别: 35-50（损失质量小）
4. Compression method: Lossy GIF
5. 点击 Optimize
6. 下载压缩后的GIF
```

**GIPHY优化**：
```
1. 访问: https://giphy.com/create/gifmaker
2. 上传GIF
3. 自动优化
4. 下载优化版本
```

### 命令行工具

**gifsicle**（最强大）：
```bash
# 安装
choco install gifsicle

# 优化压缩
gifsicle -O3 --colors 256 input.gif -o output.gif

# 调整尺寸
gifsicle --resize 1280x720 input.gif -o output.gif

# 减少颜色数
gifsicle --colors 128 input.gif -o output.gif
```

---

## 📊 质量标准

### ✅ 合格标准
- 分辨率 ≥ 1280×720
- 帧率 ≥ 15 FPS
- 文件大小 < 10 MB
- 循环播放正常
- 内容清晰可读

### ⭐ 优秀标准
- 分辨率 1280×720（最佳平衡）
- 帧率 15-20 FPS
- 文件大小 3-5 MB（经过优化）
- 色彩准确，动画流畅
- 每页停留时间合理

---

## 🎯 演示脚本建议

### 快速版（20秒，8页）

```
P1  封面 (2s)
P2  Metric (2s)
P6  SWOT (2.5s)
P7  OKR (2.5s)
P8  Gantt (2.5s)
P9  Fishbone (2.5s)
P10 BCG (2.5s)
P16 总结 (2s)
```

### 完整版（40秒，16页）

按顺序展示所有16页，每页2.5秒。

### 精选版（30秒，12页）

跳过Chart、Code、Split、Grid，聚焦核心商业Block。

---

## 📝 提交GIF到仓库

录制完成后：

```bash
# 保存到正确位置
# docs/images/demo.gif

cd /c/Users/huangl265/.claude/skills/interactive-narrative-deck

# 添加到Git
git add docs/images/demo.gif

# 提交
git commit -m "docs: 添加完整演示GIF

- 16页18种Block完整演示
- 分辨率1280×720，15FPS
- 文件大小约5MB
- 循环播放"

# 推送
git push origin main
```

---

## 🔗 在README中使用

### 顶部展示

```markdown
# Interactive Narrative Deck

![Demo](docs/images/demo.gif)

> 用AI生成专业商业演示文稿...
```

### 居中显示

```markdown
<p align="center">
  <img src="docs/images/demo.gif" alt="Demo" width="800">
</p>
```

### 带标题

```markdown
## 🎬 演示效果

<table>
<tr>
<td align="center">
  <img src="docs/images/demo.gif" alt="完整演示" width="600"><br>
  <b>18种Block完整演示</b>
</td>
</tr>
</table>
```

---

## 🐛 常见问题

### Q1: GIF文件太大怎么办？
**A**: 
- 降低分辨率到1280×720
- 降低帧率到15 FPS
- 使用ezgif.com压缩
- 减少颜色数到128色

### Q2: 录制时卡顿？
**A**: 
- 关闭其他程序
- 降低录制帧率
- 使用更高性能的电脑
- 或先录视频，再转GIF

### Q3: 文字模糊不清？
**A**: 
- 提高录制分辨率
- 使用更大的字体
- 录制时确保浏览器100%缩放（Ctrl+0）

### Q4: 颜色失真？
**A**: 
- GIF只支持256色，有损失
- 使用ScreenToGif的System.Drawing编码器
- 或录制MP4视频，质量更高

---

## 💡 额外建议

### 录制前检查清单
- [ ] HTTP服务器已启动
- [ ] 浏览器已全屏（F11）
- [ ] 浏览器缩放100%（Ctrl+0）
- [ ] 动画已加载完成
- [ ] 录制工具参数已设置

### 录制时注意
- [ ] 每页停留时间一致
- [ ] 翻页节奏平稳
- [ ] 不要有鼠标乱晃
- [ ] 不要有弹窗干扰

### 录制后处理
- [ ] 删除开头结尾多余帧
- [ ] 调整播放速度
- [ ] 裁剪多余边缘
- [ ] 优化压缩文件大小

---

**祝录制顺利！** 🎬✨

有问题请参考ScreenToGif官方文档：https://www.screentogif.com/
