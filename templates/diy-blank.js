/* DIY空白模板 - 自由组合 */
window.NARRATIVE_DECK = {
  // 🎨 主题配色（改这里即可换风格）
  theme: {
    blue: "#2563eb",   // 主色：深蓝（商务）/ #0ea5e9（科技蓝）/ #7c3aed（紫色）
    gold: "#e8c874",   // 强调色：金色 / #f59e0b（琥珀）/ #10b981（绿色）
    bg:   "#0b1220"    // 背景：深蓝黑 / #0f172a（近黑）/ #1e1e2e（深紫）
  },
  slides: [
    // 📋 复制下面任意block组合，拼出你需要的每一页
    // ──────────────────────────────────────────────
    // 【封面页示例】
    { title: "页标题（显示在进度条）", layout: "center",
      blocks: [
        { type: "hero", kick: "小标签", title: "主标题", sub: "副标题" }
      ]
    },

    // 【数据页示例】
    { title: "数据页", layout: "center",
      blocks: [
        { type: "metric", items: [
          { value: "数字", unit: "单位", label: "指标名", delta: "+变化" }
        ]}
      ]
    },

    // 【要点页示例（加stagger逐条揭示）】
    { title: "要点页", layout: "left",
      blocks: [
        { type: "bullets", title: "标题", stagger: true,
          items: ["要点一", "要点二", "要点三"] }
      ]
    },

    // 【图表页示例】
    { title: "图表页", layout: "center",
      blocks: [
        { type: "chart", chart: "bar", title: "图表标题",
          data: {
            labels: ["分类A", "分类B", "分类C"],
            datasets: [{ label: "系列", data: [10, 20, 15], backgroundColor: "#2563eb" }]
          }
        }
      ]
    }

    // 💡 可用的block类型：
    // hero / metric / bullets / compare / timeline / quote / chart / media / tabs
    // 详见 knowledge/block-reference.md
  ]
};