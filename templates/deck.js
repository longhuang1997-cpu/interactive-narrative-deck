/* 演示脚本:定义 window.NARRATIVE_DECK。改这里=改你的演示,无需碰引擎。
   deck = { theme, slides:[ {title, layout, blocks:[...]} ] }
   layout: center | left | grid | scroll
   block: hero/metric/bullets/compare/timeline/quote/media/chart/tabs
   加 frag:true 或 bullets 加 stagger:true → 渐进揭示 */
window.NARRATIVE_DECK = {
  theme:{ blue:"#2563eb", gold:"#e8c874", bg:"#0b1220" },
  slides:[
    { title:"封面", layout:"center", blocks:[
      { type:"hero", kick:"2026 Q2 · 业务复盘", title:"增长的引擎", sub:"从数据到洞察,再到下一步行动" }
    ]},
    { title:"核心指标", layout:"center", blocks:[
      { type:"hero", kick:"一、总览", title:"本季关键数据", sub:"" },
      { type:"metric", items:[
        {value:"1280", unit:"万", label:"营收", delta:"+18%"},
        {value:"92.5", unit:"%", label:"续约率", delta:"+4.2%"},
        {value:"37", unit:"个", label:"新客户", delta:"+12"},
        {value:"6.8", unit:"天", label:"平均交付", delta:"-1.5"}
      ]}
    ]},
    { title:"趋势图", layout:"center", blocks:[
      { type:"hero", kick:"二、趋势", title:"营收逐月增长", sub:"" },
      { type:"chart", chart:"line", title:"2026 上半年营收(万元)",
        data:{ labels:["1月","2月","3月","4月","5月","6月"],
          datasets:[{ label:"营收", data:[160,175,190,210,230,258], borderColor:"#e8c874", backgroundColor:"rgba(232,200,116,.2)", fill:true, tension:.3 }] } }
    ]},
    { title:"问题剖析", layout:"left", blocks:[
      { type:"bullets", title:"三、问题在哪", stagger:true, items:[
        "获客成本上升:单客成本同比 +22%",
        "交付瓶颈:高峰期人力缺口约 30%",
        "复购乏力:老客二次转化率仅 18%"
      ]}
    ]},
    { title:"方案对比", layout:"center", blocks:[
      { type:"hero", kick:"四、怎么解", title:"两条路径", sub:"" },
      { type:"compare",
        left:{ title:"A · 自建团队", items:["可控性强","长期成本低","但见效慢、前期重投入"] },
        right:{ title:"B · 外部协同", items:["快速起量","前期轻","但依赖外部、毛利受挤压"] } }
    ]},
    { title:"路线图", layout:"center", blocks:[
      { type:"hero", kick:"五、路线图", title:"下季三步走", sub:"" },
      { type:"timeline", items:[
        {time:"7月", text:"试点自动化交付"},
        {time:"8月", text:"老客复购计划上线"},
        {time:"9月", text:"复盘 + 全量推广"}
      ]}
    ]},
    { title:"收尾", layout:"center", blocks:[
      { type:"quote", text:"数据只是起点,行动才是答案。", by:"—— 业务发展中心" }
    ]}
  ]
};