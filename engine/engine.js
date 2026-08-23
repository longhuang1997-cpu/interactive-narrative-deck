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
    this.calculateGlobalScales(); // 自适应缩放
    this.render(); this.buildProgress(); this.bindKeys();
  },
  save(){localStorage.setItem("nd_cur",this.cur);},
  render(){
    const s=this.deck.slides[this.cur]; this.frag=0; this.root.innerHTML="";
    const slide=document.createElement("section");
    slide.className="nd-slide nd-layout-"+(s.layout||"center");
    const blocks=s.blocks||[];
    // 自动网格布局：≥3块触发2列
    if(blocks.length>=3&&!s.layout){slide.classList.add("nd-layout-grid");slide.dataset.gridMode="auto";}
    blocks.forEach((b,bi)=>{const el=BlockRegistry.render(b,bi); if(el)slide.appendChild(el);});
    // 应用页面缩放
    if(s._scale){slide.style.setProperty("--page-scale",s._scale.toFixed(3));}
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
/* ===== 自适应缩放系统 ===== */
ND.calculateGlobalScales = function(){
  this.deck.slides.forEach(s=>{
    const density = this.getContentDensity(s);
    let scale = 1.0;
    if(density>=80)scale=0.75;
    else if(density>=50)scale=0.85;
    s._scale = scale;
  });
};
ND.getContentDensity = function(slide){
  const blocks = slide.blocks||[];
  let score = blocks.length * 10;
  const complexity = {hero:5,metric:8,bullets:12,compare:20,timeline:15,quote:5,
    media:10,chart:18,tabs:22,swot:25,okr:20,gantt:30,fishbone:28,bcg:15,
    kanban:25,pyramid:18,orgchart:25,process:20};
  blocks.forEach(b=>{score += (complexity[b.type]||10);
    if(b.type==='bullets'&&b.items)score+=b.items.length*2;
    if(b.type==='compare'&&b.left)score+=15;
    if(b.type==='chart'&&b.data)score+=b.data.length*3;});
  return Math.min(score,100);
};
/* ===== Blocks已迁移至block-registry.js + core-blocks.js ===== */
/* 用户可通过custom-blocks.js扩展Block，无需修改此文件 */
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