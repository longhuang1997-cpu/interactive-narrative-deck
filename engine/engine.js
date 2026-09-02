/* Interactive Narrative Deck · 引擎
   结构化交互叙事:deck(slides[blocks[]]) -> 交互演示
   底座:单文件HTML + 精选库(GSAP/Chart.js,CDN,可降级) */
"use strict";
const ND = {
  deck:null, cur:0, frag:0, root:null,
  init(deck){
    this.deck=deck; this.root=document.getElementById("nd-stage");
    this.applyTheme(deck.theme);
    // 总是从第一页开始，不记忆上次位置
    this.cur = 0;
    this.calculateGlobalScales(); // 自适应缩放
    this.render(); this.buildProgress(); this.bindKeys();
  },
  /* 主题层:mode 切换语义token(light/dark),品牌色可单独覆写。
     所有颜色都收敛成 style.css 里的语义token,这里只负责挂 data-nd-theme
     和覆写品牌色——不再逐个塞具体颜色值,避免改 bg 就让浅底文字糊掉。 */
  applyTheme(t){
    const root=document.documentElement, rs=root.style;
    const mode=(t&&t.mode==="light")?"light":"dark";
    if(mode==="light")root.setAttribute("data-nd-theme","light");
    else root.removeAttribute("data-nd-theme");
    if(!t)return;
    if(t.blue)rs.setProperty("--nd-blue",t.blue);
    if(t.gold)rs.setProperty("--nd-gold",t.gold);
    // bg 仅在显式给出时覆写;未给出则用 mode 的预设底色
    if(t.bg)rs.setProperty("--nd-bg",t.bg);
  },
  save(){
    // 不再保存当前页码到localStorage，每次打开都从第一页开始
  },
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
    // 触发数字滚动动画
    setTimeout(() => {
      this.triggerNumberAnimations(slide);
    }, 300);
  },
  /* ===== 数字滚动动画（零依赖实现） ===== */
  animateNumber(el){
    if(el.dataset.animated==='true')return;
    const target=parseFloat(el.dataset.count);
    if(isNaN(target))return;
    const prefix=el.dataset.prefix||'';
    const suffix=el.dataset.suffix||'';
    const duration=1800;
    const start=performance.now();
    el.dataset.animated='true';
    function frame(now){
      const progress=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-progress,3); // easeOutCubic
      el.textContent=prefix+Math.round(target*eased)+suffix;
      if(progress<1)requestAnimationFrame(frame);
      else el.textContent=prefix+target+suffix;
    }
    requestAnimationFrame(frame);
  },
  triggerNumberAnimations(slide){
    const els=slide?slide.querySelectorAll('[data-count]'):document.querySelectorAll('[data-count]');
    els.forEach(el=>this.animateNumber(el));
  },
  /* ===== 图片灯箱（点击放大）===== */
  openLightbox(src){
    const modal=document.createElement('div');
    modal.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;z-index:10000;cursor:pointer;animation:ndFadeIn 0.3s ease';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-label','图片预览');

    const img=document.createElement('img');
    img.src=src;
    img.style.cssText='max-width:95%;max-height:95%;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,0.5);animation:ndZoomIn 0.3s ease;cursor:default';
    img.onclick=function(e){e.stopPropagation();};

    const closeBtn=document.createElement('button');
    closeBtn.innerHTML='×';
    closeBtn.setAttribute('aria-label','关闭');
    closeBtn.style.cssText='position:absolute;top:20px;right:20px;width:48px;height:48px;border:none;border-radius:50%;background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);color:#fff;font-size:32px;cursor:pointer;transition:all .3s ease;z-index:10001';
    closeBtn.onmouseover=function(){this.style.background='rgba(255,255,255,0.25)';this.style.transform='scale(1.1)';};
    closeBtn.onmouseout=function(){this.style.background='rgba(255,255,255,0.15)';this.style.transform='scale(1)';};

    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);

    const closeModal=function(){
      modal.style.animation='ndFadeOut 0.3s ease';
      setTimeout(function(){document.body.removeChild(modal);},300);
    };

    modal.onclick=closeModal;
    closeBtn.onclick=closeModal;

    document.addEventListener('keydown',function escHandler(e){
      if(e.key==='Escape'){closeModal();document.removeEventListener('keydown',escHandler);}
    });
  },
  /* ===== iframe预览模态框 ===== */
  openPreview(src,title){
    let viewer=document.getElementById('nd-preview-viewer');
    if(!viewer){
      viewer=document.createElement('div');
      viewer.id='nd-preview-viewer';
      viewer.className='nd-preview-viewer';
      viewer.setAttribute('role','dialog');
      viewer.setAttribute('aria-label','案例预览');

      viewer.innerHTML='<div class="nd-preview-header">'+
        '<strong class="nd-preview-title"></strong>'+
        '<button class="nd-preview-close" aria-label="关闭案例预览">×</button>'+
        '</div>'+
        '<iframe class="nd-preview-iframe" title="案例预览"></iframe>';

      document.body.appendChild(viewer);

      viewer.querySelector('.nd-preview-close').onclick=function(){
        viewer.classList.remove('on');
        viewer.querySelector('iframe').src='about:blank';
      };

      viewer.onclick=function(e){
        if(e.target===viewer)viewer.classList.remove('on');
      };

      document.addEventListener('keydown',function escHandler(e){
        if(e.key==='Escape'&&viewer.classList.contains('on')){
          viewer.classList.remove('on');
          viewer.querySelector('iframe').src='about:blank';
        }
      });
    }

    viewer.querySelector('.nd-preview-title').textContent=title||'案例预览';
    viewer.querySelector('iframe').src=src;
    viewer.classList.add('on');
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
    bar.innerHTML="";this.deck.slides.forEach((s,i)=>{const d=document.createElement("div");d.className="nd-dot";d.title=s.title||("第"+(i+1)+"节");d.onclick=()=>this.goto(i);bar.appendChild(d);});
    this.buildFullscreenButton();},
  buildFullscreenButton(){let btn=document.getElementById("nd-fullscreen");
    if(!btn){btn=document.createElement("button");btn.id="nd-fullscreen";btn.className="nd-fullscreen-btn";btn.title="进入全屏";btn.setAttribute("aria-label","进入全屏");btn.innerHTML="⛶";document.body.appendChild(btn);
    btn.onclick=async ()=>{
      console.log('[Fullscreen] Button clicked');
      try {
        if(!document.fullscreenElement) {
          console.log('[Fullscreen] Requesting fullscreen...');
          await document.documentElement.requestFullscreen();
          console.log('[Fullscreen] Fullscreen entered');
        } else {
          console.log('[Fullscreen] Exiting fullscreen...');
          await document.exitFullscreen();
          console.log('[Fullscreen] Fullscreen exited');
        }
      } catch(err) {
        console.error('[Fullscreen] Error:', err.name, err.message);
        alert('全屏功能失败：' + err.message + '\n\n可能原因：\n1. 浏览器安全策略限制\n2. 浏览器不支持全屏API\n3. 文件协议限制');
      }
    };
    document.addEventListener("fullscreenchange",()=>{const active=Boolean(document.fullscreenElement);btn.title=active?"退出全屏":"进入全屏";btn.setAttribute("aria-label",active?"退出全屏":"进入全屏");btn.classList.toggle("active",active);console.log('[Fullscreen] State changed:', active);});
    }},
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
/* 暴露引擎实例:供 config_ui / 渲染后验证脚本读取当前页码等状态 */
window.ND = ND;

/* ===== 启动 ===== */
window.addEventListener("DOMContentLoaded",function(){
  if(window.NARRATIVE_DECK){ ND.init(window.NARRATIVE_DECK); }
  else{ document.getElementById("nd-stage").innerHTML="<div style='color:#9fb0ca;text-align:center;padding:80px;font-size:22px'>未找到演示脚本。请引入 deck.js(定义 window.NARRATIVE_DECK)。</div>"; }
});