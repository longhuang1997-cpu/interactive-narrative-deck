# 将7张截图制作成GIF演示

## 在线工具方法（推荐）

1. 访问 https://ezgif.com/maker
2. 点击"Choose Files"上传7张截图（按顺序）
3. 设置参数：
   - Delay time: 150（每张停留1.5秒）
   - Loop count: 0（无限循环）
4. 点击"Make a GIF"
5. 下载生成的GIF到本地

## ImageMagick命令行方法

```bash
# 安装ImageMagick（Windows用Chocolatey）
choco install imagemagick

# 生成GIF
cd C:/Users/huangl265/.claude/skills/interactive-narrative-deck/examples/screenshots/strategy-report
magick convert -delay 150 -loop 0 page*.png ../demo.gif
```

## Python脚本方法

```python
from PIL import Image
import glob

images = []
for filename in sorted(glob.glob('page*.png')):
    images.append(Image.open(filename))

images[0].save('demo.gif',
               save_all=True,
               append_images=images[1:],
               duration=1500,  # 每张1.5秒
               loop=0)
```

## 参数建议

- **每张停留时间**: 1-2秒（让观众看清内容）
- **循环**: 无限循环
- **尺寸**: 建议缩小到800px宽度（GitHub加载更快）
- **优化**: 用ezgif的"Optimize"功能压缩到<3MB
