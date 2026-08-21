"""
自动截图工具 - 使用Playwright截取演示页面

依赖安装：
  pip install playwright
  playwright install chromium

使用方法：
  python screenshot_generator.py
"""

from playwright.sync_api import sync_playwright
import time
import os

def capture_screenshots():
    # 确保输出目录存在
    output_dir = "docs/images"
    os.makedirs(output_dir, exist_ok=True)

    # 页面配置
    pages = [
        {"index": 1, "name": "demo-okr.png", "title": "OKR目标管理"},
        {"index": 2, "name": "demo-gantt.png", "title": "甘特图"},
        {"index": 3, "name": "demo-fishbone.png", "title": "鱼骨图"},
        {"index": 4, "name": "demo-bcg.png", "title": "BCG矩阵"},
        {"index": 5, "name": "demo-kanban.png", "title": "看板"},
    ]

    with sync_playwright() as p:
        # 启动浏览器
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            device_scale_factor=2  # 2x分辨率，更清晰
        )
        page = context.new_page()

        # 访问演示页面
        url = "http://localhost:8080/examples/all-professional-blocks/"
        print(f"📡 访问: {url}")
        page.goto(url, wait_until="networkidle")

        # 等待页面完全加载
        time.sleep(2)

        # 截取每个页面
        for pg in pages:
            print(f"📸 截取第{pg['index']+1}页: {pg['title']}...")

            # 模拟按右键翻页
            for _ in range(pg['index']):
                page.keyboard.press("ArrowRight")
                time.sleep(0.8)  # 等待动画完成

            # 等待内容渲染
            time.sleep(1.5)

            # 截图
            output_path = os.path.join(output_dir, pg['name'])
            page.screenshot(path=output_path, full_page=False)
            print(f"  ✅ 保存到: {output_path}")

            # 回到首页
            page.reload()
            time.sleep(1)

        browser.close()

    print("\n🎉 所有截图完成！")
    print(f"📁 保存位置: {os.path.abspath(output_dir)}")
    print("\n下一步:")
    print("  1. 检查截图质量")
    print("  2. git add docs/images/*.png")
    print("  3. git commit -m 'docs: 添加演示截图'")
    print("  4. git push origin main")

if __name__ == "__main__":
    print("🚀 Interactive Narrative Deck 自动截图工具\n")

    # 检查服务器是否运行
    import urllib.request
    try:
        urllib.request.urlopen("http://localhost:8080", timeout=2)
        print("✅ 检测到本地服务器运行中\n")
    except:
        print("❌ 错误: 本地服务器未运行")
        print("请先运行: python -m http.server 8080\n")
        exit(1)

    capture_screenshots()
