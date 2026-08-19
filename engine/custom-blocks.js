/* Interactive Narrative Deck · 自定义Block插件
   v2.1.0 插件化扩展：通过 BlockRegistry.register 注册，无需修改核心引擎
   组件：code / split / grid（经过交互动效增强）
   模板 index.html 需在 core-blocks.js 之后、engine.js 之前引入本文件 */
(function () {
  "use strict";

  function wrap(html, cls) {
    var div = document.createElement("div");
    if (cls) div.className = cls;
    div.innerHTML = html;
    return div;
  }

  // ===== code - 代码展示（行号/语言徽标，内容自动转义） =====
  BlockRegistry.register("code", function (b) {
    function esc(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
    var head = (b.title || b.lang)
      ? "<div class='nd-code-head'><span class='nd-code-title'>" + esc(b.title || "") + "</span>" +
        (b.lang ? "<span class='nd-code-lang'>" + esc(b.lang) + "</span>" : "") + "</div>"
      : "";
    var rows = String(b.code || "").split("\n").map(function (r, i) {
      return "<div class='nd-code-row'>" +
        (b.lines === false ? "" : "<span class='nd-code-no'>" + (i + 1) + "</span>") +
        "<code>" + esc(r) + "</code></div>";
    }).join("");
    return wrap(head + "<pre class='nd-code'><div class='nd-code-body'>" + rows + "</div></pre>", "nd-code-wrap");
  }, {
    description: "代码展示，支持文件名、语言徽标、行号；内容自动转义 HTML",
    author: "custom"
  });

  // ===== split - 左图右文分栏 =====
  BlockRegistry.register("split", function (b) {
    var media = b.video
      ? '<video src="' + b.video + '" controls ' + (b.autoplay ? "autoplay" : "") + ' class="nd-media"></video>'
      : '<img src="' + b.img + '" alt="' + (b.alt || "") + '" class="nd-media">';
    var items = (b.items || []).map(function (x) { return "<li>" + x + "</li>"; }).join("");
    var content = "<div class='nd-split-content'>" +
      (b.title ? "<h2>" + b.title + "</h2>" : "") +
      (b.text ? "<p>" + b.text + "</p>" : "") +
      (items ? "<ul>" + items + "</ul>" : "") + "</div>";
    return wrap(
      "<div class='nd-split" + (b.reverse ? " nd-split-rev" : "") + "'>" +
        (b.mediaFirst === false ? content + "<div class='nd-split-media'>" + media + "</div>"
                                : "<div class='nd-split-media'>" + media + "</div>" + content) +
      "</div>",
      ""
    );
  }, {
    description: "左图右文分栏，支持图片/视频；reverse 可左右互换，mediaFirst 可调整顺序",
    author: "custom"
  });

  // ===== grid - 多列卡片网格 =====
  BlockRegistry.register("grid", function (b) {
    var cols = Math.max(2, Math.min(4, parseInt(b.cols, 10) || 3));
    var cards = (b.items || []).map(function (c) {
      return "<div class='nd-grid-card'>" +
        (c.icon ? "<div class='nd-grid-ic'>" + c.icon + "</div>" : "") +
        (c.title ? "<div class='nd-grid-t'>" + c.title + "</div>" : "") +
        (c.text ? "<div class='nd-grid-x'>" + c.text + "</div>" : "") +
        (c.tag ? "<div class='nd-grid-tag'>" + c.tag + "</div>" : "") +
      "</div>";
    }).join("");
    var el = wrap("<div class='nd-grid' style='--nd-cols:" + cols + "'>" + cards + "</div>");
    if (b.stagger) {
      el.querySelectorAll(".nd-grid-card").forEach(function (c) { c.setAttribute("data-frag", "1"); });
    }
    return el;
  }, {
    description: "多列卡片网格（2-4列），支持图标/标签；stagger 可逐卡渐进揭示",
    author: "custom"
  });

  console.log("[CustomBlocks] ✓ 已注册3个自定义Block: code, split, grid");
  console.log("[CustomBlocks] 当前所有Block:", BlockRegistry.list().join(", "));
})();
