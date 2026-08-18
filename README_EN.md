# Interactive Narrative Deck

> Transform presentations into structured interactive narratives — Block-based components + progressive disclosure + data visualization + refined animations. Professional storytelling for the modern workplace.

[中文文档](./README.md) | [Installation Guide](./安装指引.md) | [Change Log](./CHANGELOG.md)

---

## What It Is

An AI-powered presentation skill that distills 10+ years of professional reporting experience into automated judgments. Instead of wrestling with slide layouts, you tell Claude **who you're presenting to** and **what you want to say** — the skill handles audience analysis, narrative framework selection, chart type decisions, and pacing.

**Core value:** It's not just a tool, it's **experience codification**. The implicit judgment calls that senior presenters make instinctively — "executives need conclusions first," "trend data needs line charts not bars," "break down the problem progressively" — are encoded into the skill's knowledge base and executed by AI.

---

## When to Use

✅ **Use for:**
- Product launches, strategy reviews, data retrospectives, investor pitches, technical talks
- Scenarios requiring real-time presentation control (clicker + progressive reveal)
- Data-driven content where numbers need motion (animated counters, chart transitions)

❌ **Don't use for:**
- Editable PowerPoint deliverables → Use a PPTX generator instead
- Static image-based decks → Export to PDF instead
- Video content for distribution → Use video editing tools
- Gamified training/icebreakers → Different skill domain

---

## 5 Core Judgment Rules (Built-in Experience)

### Rule 1: Audience → Structure

| Audience | Principle | Structure | Pages |
|----------|-----------|-----------|-------|
| C-suite/Executives | **Conclusion first, data second** | Cover → Conclusion → Data → Action | ≤6 |
| Management | Problem-solution-resources | Problem → Analysis → Solution → Plan | 8 |
| Clients/Investors | Value proposition first | Pain → Solution → Proof → Next steps | 10 |
| Team | Full context, execution-oriented | Background → Goals → Roles → Timeline | 8-12 |

**Executive Rule:** Never make them guess what you want. First slide = answer.

### Rule 2: Data Type → Chart Type

| Data Characteristic | Correct Choice | Wrong Choice |
|---------------------|----------------|--------------|
| Time trends | Line chart | Bar chart |
| Category comparison | Bar chart | Pie chart |
| Composition (<5 items) | Pie/Doughnut | Line chart |
| Key metric highlight | Animated metric card | Buried in bullet points |

### Rule 3: Content → Block Selection

| Content Type | Block | Rationale |
|--------------|-------|-----------|
| 3+ parallel points | bullets + stagger | Progressive reveal matches speech rhythm |
| Decision/trade-offs | compare | Side-by-side comparison is instant clarity |
| Timeline/roadmap | timeline | Visual progress representation |
| Core thesis/CTA | quote | Amplify key message, create memory anchor |
| Impressive numbers | metric | Animated scroll draws attention |

### Rule 4: Progressive Disclosure Timing

**Use progressive reveal:** Problem analysis, action plans, logical arguments  
**Don't use:** Data overviews, opening/closing slides, charts (data needs holistic view)

### Rule 5: Pages × Duration

5 min = 5 pages tight | 15 min = 8 pages standard | 30 min = 12 pages complete + 2 backup

---

## Quick Start

### Installation

```bash
# Clone to Claude Code skills directory
cd ~/.claude/skills  # or %USERPROFILE%\.claude\skills on Windows
git clone https://github.com/longhuang1997-cpu/interactive-narrative-deck.git

# Verify installation
claude  # Start Claude Code
# Say: "List available skills" — should see interactive-narrative-deck
```

### Usage

Simply describe your presentation need to Claude:

```
"Help me create a [scenario] presentation for [audience], topic is [content]"
```

Trigger words: presentation, deck, report, launch, strategy, review, pitch

AI will ask 5 questions:
1. Audience: Who's watching?
2. Topic: Core message in one sentence?
3. Content: Data, key points, materials?
4. Duration: How long?
5. Style: Visual preference? (optional)

AI determines framework → generates preview → outputs complete deck.js → open index.html + F11 to present.

### Controls

- **Arrow keys / PageUp/PageDown**: Navigate slides
- **Space**: Progressive reveal (on supported blocks)
- **O key**: Overview mode
- **Home/End**: Jump to first/last slide
- **Works with presentation clickers**: Standard PageUp/PageDown support

---

## Architecture

```
interactive-narrative-deck/
├─ SKILL.md              # Control layer: AI interaction flow
├─ knowledge/            # Knowledge layer: judgment rules
│   ├─ block-reference.md       Complete Block API
│   ├─ layout-patterns.md       Content → layout decision tree
│   ├─ anti-hallucination.md    Hallucination risk checklist
│   └─ narrative-engine.md      4 narrative frameworks
├─ templates/            # Standard layer: reusable patterns
├─ examples/             # 3 complete demos
├─ config_ui/            # Visual editor (post-generation tweaks)
│   └─ config_ui.html           Real-time canvas + Block library
└─ engine/               # Execution layer: renderer (don't modify)
```

---

## 9 Block Components

```javascript
hero      // Cover/section title
metric    // Animated counter: {value, unit, label, delta}
bullets   // Staggered bullet points
compare   // Left/right comparison
timeline  // Horizontal timeline
quote     // Pull quote/callout
chart     // bar/line/pie/doughnut with Chart.js
tabs      // Tabbed content panels
media     // Image/video embed
```

Add `frag: true` to any block for progressive disclosure.

---

## Technical Stack

- Single-file HTML + engine/ (don't touch) + deck.js (edit here)
- GSAP + Chart.js via CDN, auto-fallback offline
- LocalStorage for progress persistence
- Clicker-friendly (PageUp/PageDown native support)

---

## Competitive Edge

**Replaces:** 2 hours of manual slide layout — pure labor with no thinking value

**Beats generic AI approaches:** Vibe coding produces random quality with static chart screenshots

**Key differentiators:**
- vs PPT tools: Animated data + script-driven + Git-friendly
- vs other AI deck skills: Component-based (predictable) + judgment rules (experience) + offline fallback (zero risk)

**Target user:** Mid-level managers who need regular data presentations, lack design skills, but demand quality output.

---

## Examples

Three complete demos included:

1. **Strategy Report** (`examples/data-review/`) — Quarterly review with metrics + trends
2. **Product Launch** (`examples/quick-demo/`) — Feature announcement with timeline
3. **Tech Talk** (`examples/tech-talk/`) — Technical presentation with code samples

Open any `index.html` to see live example.

---

## License

MIT © 2026

---

## Credits

Built on top of:
- [GSAP](https://greensock.com/gsap/) for animations
- [Chart.js](https://www.chartjs.org/) for data visualization
- Inspired by Slack Block Kit's component philosophy and reveal.js's presentation paradigm

---

**Version:** 2.0.0  
**Status:** Competition Entry (Claude Code Skill Contest #1)  
**Author:** [longhuang1997-cpu](https://github.com/longhuang1997-cpu)
