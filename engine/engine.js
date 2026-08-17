/* Interactive Narrative Deck · 引擎
   结构化交互叙事:deck(slides[blocks[]]) -> 交互演示
   底座:单文件HTML + 精选库(GSAP/Chart.js,CDN,可降级) */
"use strict";
const ND = {
  deck:null, cur:0, frag:0, root:null,
  init(deck){
    this.deck=deck; this.root=document.getElementById("nd-stage");
    if(deck.theme){const t=deck.theme,rs=document.documentElement.style;
      if(t.blue)rs.setProperty("--nd-blue",t.blue);
      if(t.gold)rs.setProperty("--nd-gold",t.gold);
      if(t.bg)rs.setProperty("--nd-bg",t.bg);}
    const saved=+(localStorage.getItem("nd_cur")||0);
    this.cur=(saved>=0&&saved<deck.slides.length)?saved:0;
    this.render(); this.buildProgress(); this.bindKeys();
  },
  save(){localStorage.setItem("nd_cur",this.cur);},
  render(){
    const s=this.deck.slides[this.cur]; this.frag=0; this.root.innerHTML="";
    const slide=document.createElement("section");
    slide.className="nd-slide nd-layout-"+(s.layout||"center");
    (s.blocks||[]).forEach((b,bi)=>{const el=Blocks.render(b,bi); if(el)slide.appendChild(el);});
    this.root.appendChild(slide);
    this._enter(slide); this.updateProgress(); this.save();
    if(s.layout==="scroll"&&window.Scrolly)Scrolly.init(slide,s);
  },
  _enter(slide){
    const items=slide.querySelectorAll(".nd-block");
    if(window.gsap){gsap.from(items,{y:28,opacity:0,duration:.6,stagger:.08,ease:"power2.out"});}
    else{items.forEach((it,i)=>{it.style.animation="ndIn .5s ease "+(i*0.08)+"s both";});}
  },
  _frags(){return Array.prototype.slice.call(this.root.querySelectorAll("[data-frag]"));},
  next(){
    const fr=this._frags();
    if(this.frag<fr.length){const el=fr[this.frag];el.classList.add("nd-show");if(window.gsap)gsap.from(el,{y:16,opacity:0,duration:.4,ease:"power2.out"});this.frag++;return;}
    if(this.cur<this.deck.slides.length-1){this.cur++;this.render();}
  },
  prev(){
    if(this.frag>0){this.frag--;const fr=this._frags();if(fr[this.frag])fr[this.frag].classList.remove("nd-show");return;}
    if(this.cur>0){this.cur--;this.render();this.frag=this._frags().length;this._frags().forEach(e=>e.classList.add("nd-show"));}
  },
  goto(i){if(i>=0&&i<this.deck.slides.length){this.cur=i;this.render();}},
  bindKeys(){document.addEventListener("keydown",e=>{const k=e.key;
    if(k==="ArrowRight"||k==="PageDown"||k===" "){this.next();e.preventDefault();}
    else if(k==="ArrowLeft"||k==="PageUp"){this.prev();e.preventDefault();}
    else if(k==="Home")this.goto(0); else if(k==="End")this.goto(this.deck.slides.length-1);
    else if(k.toLowerCase()==="o")this.toggleOverview();});},
  buildProgress(){let bar=document.getElementById("nd-progress");
    if(!bar){bar=document.createElement("div");bar.id="nd-progress";document.body.appendChild(bar);}
    bar.innerHTML="";this.deck.slides.forEach((s,i)=>{const d=document.createElement("div");d.className="nd-dot";d.title=s.title||("第"+(i+1)+"节");d.onclick=()=>this.goto(i);bar.appendChild(d);});},
  updateProgress(){document.querySelectorAll("#nd-progress .nd-dot").forEach((d,i)=>d.classList.toggle("on",i===this.cur));},
  toggleOverview(){document.body.classList.toggle("nd-overview");}
};
/* ===== Blocks 组件库:可自由组合的结构化交互积木 ===== */
const Blocks = {
  render(b,i){const fn=this[b.type];if(!fn){const d=document.createElement("div");d.className="nd-block";d.textContent="[未知block: "+b.type+"]";return d;}
    const el=fn.call(this,b,i);el.classList.add("nd-block");if(b.frag)el.setAttribute("data-frag","1");return el;},
  _wrap(html,cls){const d=document.createElement("div");d.className=cls||"";d.innerHTML=html;return d;},
  hero(b){return this._wrap('<div class="nd-hero"><div class="nd-kick">'+(b.kick||"")+'</div><h1>'+(b.title||"")+'</h1><div class="nd-goldline"></div><div class="nd-sub">'+(b.sub||"")+'</div></div>',"nd-hero-wrap");},
  metric(b){var items=(b.items||[]).map(function(m){return '<div class="nd-metric"><div class="nd-mnum" data-count="'+m.value+'">'+m.value+'</div><div class="nd-munit">'+(m.unit||"")+'</div><div class="nd-mlabel">'+(m.label||"")+'</div>'+(m.delta?'<div class="nd-mdelta '+(m.delta[0]==="-"?"down":"up")+'">'+m.delta+'</div>':"")+'</div>';}).join("");
    var el=this._wrap('<div class="nd-metrics">'+items+'</div>',"");var self=this;setTimeout(function(){self._countUp(el);},50);return el;},
  _countUp(el){el.querySelectorAll(".nd-mnum").forEach(function(n){var raw=n.getAttribute("data-count");var num=parseFloat(raw);if(isNaN(num))return;var dec=(raw.split(".")[1]||"").length;if(window.gsap){var o={v:0};gsap.to(o,{v:num,duration:1.2,ease:"power2.out",onUpdate:function(){n.textContent=o.v.toFixed(dec);}});}});},
  bullets(b){var lis=(b.items||[]).map(function(t){return "<li>"+t+"</li>";}).join("");var el=this._wrap((b.title?"<h2>"+b.title+"</h2>":"")+'<ul class="nd-bullets">'+lis+"</ul>","");if(b.stagger){el.querySelectorAll("li").forEach(function(li){li.setAttribute("data-frag","1");});}return el;},
  compare(b){function col(c,side){return '<div class="nd-cmp-col '+side+'"><div class="nd-cmp-h">'+(c.title||"")+'</div><ul>'+((c.items||[]).map(function(x){return "<li>"+x+"</li>";}).join(""))+'</ul></div>';}return this._wrap('<div class="nd-compare">'+col(b.left||{},"L")+'<div class="nd-cmp-vs">VS</div>'+col(b.right||{},"R")+'</div>',"");},
  timeline(b){var nodes=(b.items||[]).map(function(t){return '<div class="nd-tl-node"><div class="nd-tl-dot"></div><div class="nd-tl-t">'+(t.time||"")+'</div><div class="nd-tl-c">'+(t.text||"")+'</div></div>';}).join("");return this._wrap('<div class="nd-timeline">'+nodes+'</div>',"");},
  quote(b){return this._wrap('<blockquote class="nd-quote">'+(b.text||"")+'<cite>'+(b.by||"")+'</cite></blockquote>',"");},
  media(b){if(b.video)return this._wrap('<video src="'+b.video+'" controls '+(b.autoplay?"autoplay":"")+' class="nd-media"></video>',"");return this._wrap('<img src="'+b.img+'" alt="'+(b.alt||"")+'" class="nd-media">',"");},
  chart(b){var el=this._wrap('<div class="nd-chart-box">'+(b.title?'<div class="nd-chart-t">'+b.title+'</div>':"")+'<canvas></canvas></div>',"");setTimeout(function(){var cv=el.querySelector("canvas");if(window.Chart&&cv){var isPie=(b.chart==="pie"||b.chart==="doughnut");new Chart(cv,{type:b.chart||"bar",data:b.data,options:Object.assign({responsive:true,plugins:{legend:{labels:{color:"#c3cee0"}}},scales:isPie?{}:{x:{ticks:{color:"#9fb0ca"}},y:{ticks:{color:"#9fb0ca"}}}},b.options||{})});}else if(cv){cv.parentNode.innerHTML+="<div style='color:#9fb0ca;padding:20px'>(图表需 Chart.js,当前离线)</div>";}},60);return el;},
  tabs(b){var el=this._wrap('<div class="nd-tabs"><div class="nd-tabhead">'+((b.tabs||[]).map(function(t,i){return '<button class="nd-tab '+(i===0?"on":"")+'" data-i="'+i+'">'+t.label+'</button>';}).join(""))+'</div><div class="nd-tabbody">'+((b.tabs||[]).map(function(t,i){return '<div class="nd-pane '+(i===0?"on":"")+'" data-i="'+i+'">'+(t.html||t.text||"")+'</div>';}).join(""))+'</div></div>',"");el.querySelectorAll(".nd-tab").forEach(function(btn){btn.onclick=function(){var i=btn.dataset.i;el.querySelectorAll(".nd-tab").forEach(function(x){x.classList.toggle("on",x.dataset.i===i);});el.querySelectorAll(".nd-pane").forEach(function(x){x.classList.toggle("on",x.dataset.i===i);});};});return el;}
};
/* ===== 滚动叙事 ===== */
const Scrolly = {
  init(slide, s){
    const steps = slide.querySelectorAll(".nd-step");
    if(!steps.length) return;
    const io = new IntersectionObserver(function(ents){
      ents.forEach(function(e){ if(e.isIntersecting){
        steps.forEach(function(x){x.classList.remove("active");});
        e.target.classList.add("active");
        const idx=e.target.getAttribute("data-step");
        const sticky=slide.querySelector(".nd-sticky[data-for='"+idx+"']");
        if(sticky){ slide.querySelectorAll(".nd-sticky").forEach(function(k){k.classList.remove("on");}); sticky.classList.add("on"); }
      }});
    },{threshold:.6});
    steps.forEach(function(st){io.observe(st);});
  }
};
/* ===== 启动 ===== */
window.addEventListener("DOMContentLoaded",function(){
  if(window.NARRATIVE_DECK){ ND.init(window.NARRATIVE_DECK); }
  else{ document.getElementById("nd-stage").innerHTML="<div style='color:#9fb0ca;text-align:center;padding:80px;font-size:22px'>未找到演示脚本。请引入 deck.js(定义 window.NARRATIVE_DECK)。</div>"; }
});