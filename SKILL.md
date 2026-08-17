---
name: interactive-narrative-deck
description: 把演讲/汇报材料做成"结构化交互叙事"演示——不是翻页PPT,而是 Block 积木组件 + 渐进揭示 + 数据可视化 + 克制动效,自由组合。对标 Slack Block Kit 结构化交互与 Figma 组件/微交互质感。当用户要做发布会/战略汇报/数据复盘/路演/技术分享,要"高级、专业、可交互、可组合"的现场演示(区别于年会派对游戏)时使用。单文件HTML+精选库(GSAP/Chart.js),浏览器投屏、翻页笔可用。
---

# 结构化交互叙事演示(Interactive Narrative Deck)

把一份演讲材料,做成由交互积木(Block)自由组合、随节奏渐进揭示、数据会动的高级演示。区别于:线性翻页PPT(太静)、年会闯关游戏(太娱乐)。定位职场正式场合的"高级交互演讲"。

## 定位:三个维度的交叉(不是游戏化)
经调研,"高级"落在三维交叉:
1. 结构化组件(Slack Block Kit 精髓):每页=Block 积木组合(标题/指标/对比/图表/时间线),职责单一、可交互、可复用,不是自由画布乱摆。
2. 渐进叙事(reveal.js/scrollytelling 精髓):内容随推进层层揭示,演讲者控节奏。
3. 数据可视化+克制动效(D3/Chart.js/GSAP 精髓):数字滚动、图表生长、平滑补间,但克制不炫技。

## 核心心法
- 内容即结构:一份 deck.js(结构化脚本)定义整场,引擎渲染成交互页。改脚本=改演示,不碰引擎。
- Block 自由组合:每页 blocks 任意拼装;任意 block 加 frag:true 即渐进揭示。
- 精选库增强质感:GSAP(动效)+Chart.js(数据图)CDN 引入;离线自动降级不阻塞。

## 快速开始
1. 复制 templates/(index.html + deck.js)成你的项目。
2. 改 deck.js 里的 window.NARRATIVE_DECK:填 slides、每页选 layout、拼 blocks。
3. 双击 index.html,F11 全屏,左右键/翻页笔翻页、空格渐进、O 键总览。

## deck 脚本结构
window.NARRATIVE_DECK = { theme:{blue,gold,bg}, slides:[ {title, layout, blocks:[...]} ] }
layout: center 居中 / left 左对齐 / grid 两列 / scroll 滚动叙事。
## Block 组件清单(可自由组合,加 frag:true 渐进)
| block | 用途 | 关键字段 |
|-------|------|---------|
| hero | 标题卡/章节封面 | kick, title, sub |
| metric | 数据指标卡(数字滚动) | items:[{value,unit,label,delta}] |
| bullets | 要点列表(stagger逐条渐进) | title, items[], stagger |
| compare | 左右对比(VS) | left{title,items[]}, right{...} |
| timeline | 横向时间线/路线图 | items:[{time,text}] |
| quote | 金句/引用 | text, by |
| chart | 数据图(bar/line/pie/doughnut) | chart, title, data, options |
| media | 图片/视频 | img 或 video, autoplay |
| tabs | 标签页切换(多视角) | tabs:[{label, html/text}] |

扩展新 block:在 engine/engine.js 的 Blocks 里加一个同名方法,返回 DOM 元素即可。

## 技术选型
- 单文件 HTML + engine/(engine.js 引擎 + style.css)。deck.js 是你的内容。
- 精选库 CDN:GSAP(数字滚动/入场/补间)、Chart.js(图表)。离线自动降级:GSAP缺失→CSS动画;Chart.js缺失→提示。现场无网就把两库下到本地改 script src。
- 键盘/翻页笔:左右键 / PageUp PageDown / 空格(渐进) / Home End / O(总览)。进度 localStorage 持久化。

## 版面与体验铁律
- 克制动效:只在有意义处动(数字滚动、图表生长、切换补间),不满屏乱飞。
- 层级清晰:一页一个主 block+辅助,别堆砌;留白是高级感来源。
- 渐进揭示讲重点:要点/论据用 frag 逐条出,跟着讲。
- 深色专业底+金色点缀,对标 Slack/Figma,不是 PPT 模板套壳。

## 与其他范式的分工(同属"高能级职场汇报产品"矩阵)
- 要可编辑 pptx → PPT-Master
- 要印刷手册/说明书 → a4-manual-maker
- 要传播动效视频 → Remotion
- 要年会/团建游戏化闯关 → interactive-quest-deck(娱乐场景)
- 要正式场合高级交互演讲 → 本 skill(发布会/战略汇报/数据复盘/路演/技术分享)

一句话:这是"高级交互演讲"这一环——比 PPT 更活、比游戏更专业。