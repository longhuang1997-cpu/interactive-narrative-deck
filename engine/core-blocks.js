/* Interactive Narrative Deck · 核心Block库
   将原engine.js中的Blocks对象拆分，使用BlockRegistry注册机制
   这些是内置的标准Block，用户可以通过custom-blocks.js扩展 */
"use strict";

// 辅助函数：创建包装元素
function _wrap(html, cls) {
  const div = document.createElement('div');
  if (cls) div.className = cls;
  div.innerHTML = html;
  return div;
}

// 辅助函数：数字滚动动画
function _countUp(el) {
  el.querySelectorAll('.nd-mnum').forEach(function(n) {
    const raw = n.getAttribute('data-count');
    const num = parseFloat(raw);
    if (isNaN(num)) return;
    const dec = (raw.split('.')[1] || '').length;

    if (window.gsap) {
      const obj = {v: 0};
      gsap.to(obj, {
        v: num,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: function() {
          n.textContent = obj.v.toFixed(dec);
        }
      });
    }
  });
}

// ===== 注册所有内置Block =====

// Hero - 封面/章节标题
BlockRegistry.register('hero', function(b) {
  return _wrap(
    '<div class="nd-hero">' +
      '<div class="nd-kick">' + (b.kick || '') + '</div>' +
      '<h1>' + (b.title || '') + '</h1>' +
      '<div class="nd-goldline"></div>' +
      '<div class="nd-sub">' + (b.sub || '') + '</div>' +
    '</div>',
    'nd-hero-wrap'
  );
}, {
  description: '封面或章节标题，支持副标题和装饰线',
  author: 'core'
});

// Metric - 数字指标卡片（带滚动动效）
BlockRegistry.register('metric', function(b) {
  const items = (b.items || []).map(function(m) {
    // 支持两种方式：1) data-count（推荐，零依赖） 2) 兼容旧的nd-mnum
    const prefix = m.prefix || '';
    const suffix = m.unit || '';
    return '<div class="nd-metric">' +
      '<div class="nd-mnum" data-count="' + m.value + '" data-prefix="' + prefix + '" data-suffix="' + suffix + '">0</div>' +
      '<div class="nd-mlabel">' + (m.label || '') + '</div>' +
      (m.delta ? '<div class="nd-mdelta ' + (m.delta[0] === '-' ? 'down' : 'up') + '">' + m.delta + '</div>' : '') +
    '</div>';
  }).join('');

  const el = _wrap('<div class="nd-metrics">' + items + '</div>', '');

  // 数字滚动由ND._enter()统一触发，无需在此处重复调用

  return el;
}, {
  description: '数字指标卡片，支持单位、增长标识、零依赖数字滚动动效（data-count）',
  author: 'core'
});

// Bullets - 要点列表
BlockRegistry.register('bullets', function(b) {
  const lis = (b.items || []).map(function(t) {
    return '<li>' + t + '</li>';
  }).join('');

  const el = _wrap(
    (b.title ? '<h2>' + b.title + '</h2>' : '') +
    '<ul class="nd-bullets">' + lis + '</ul>',
    ''
  );

  // 渐进揭示支持
  if (b.stagger) {
    el.querySelectorAll('li').forEach(function(li) {
      li.setAttribute('data-frag', '1');
    });
  }

  return el;
}, {
  description: '要点列表，支持标题和逐条渐进揭示（stagger:true）',
  author: 'core'
});

// Compare - 左右对比
BlockRegistry.register('compare', function(b) {
  function col(c, side) {
    return '<div class="nd-cmp-col ' + side + '">' +
      '<div class="nd-cmp-h">' + (c.title || '') + '</div>' +
      '<ul>' + ((c.items || []).map(function(x) {
        return '<li>' + x + '</li>';
      }).join('')) + '</ul>' +
    '</div>';
  }

  return _wrap(
    '<div class="nd-compare">' +
      col(b.left || {}, 'L') +
      '<div class="nd-cmp-vs">VS</div>' +
      col(b.right || {}, 'R') +
    '</div>',
    ''
  );
}, {
  description: '左右对比卡片，适合方案选型、优劣对比',
  author: 'core'
});

// Timeline - 时间线/路线图
BlockRegistry.register('timeline', function(b) {
  const nodes = (b.items || []).map(function(t) {
    return '<div class="nd-tl-node">' +
      '<div class="nd-tl-dot"></div>' +
      '<div class="nd-tl-t">' + (t.time || '') + '</div>' +
      '<div class="nd-tl-c">' + (t.text || '') + '</div>' +
    '</div>';
  }).join('');

  return _wrap('<div class="nd-timeline">' + nodes + '</div>', '');
}, {
  description: '时间线或路线图，展示进度、历程',
  author: 'core'
});

// Quote - 金句/引用
BlockRegistry.register('quote', function(b) {
  return _wrap(
    '<blockquote class="nd-quote">' +
      (b.text || '') +
      '<cite>' + (b.by || '') + '</cite>' +
    '</blockquote>',
    ''
  );
}, {
  description: '金句或引用，适合行动号召、记忆点',
  author: 'core'
});

// Media - 图片/视频（支持6档尺寸+标题+点击放大）
BlockRegistry.register('media', function(b) {
  if (b.video) {
    return _wrap(
      '<video src="' + b.video + '" controls ' +
      (b.autoplay ? 'autoplay' : '') +
      ' class="nd-media"></video>',
      ''
    );
  }

  // 尺寸映射：tiny(30%) / xsmall(35%) / small(40%) / medium(55%,默认) / large(70%) / xlarge(85%)
  const sizeClass = b.size ? 'nd-media-' + b.size : 'nd-media-medium';

  const el = _wrap(
    '<div class="nd-media-container ' + sizeClass + '">' +
      '<img src="' + b.img + '" alt="' + (b.alt || '') + '" class="nd-media" style="cursor:pointer">' +
      (b.caption ? '<div class="nd-media-caption">' + b.caption + '</div>' : '') +
    '</div>',
    ''
  );

  // 绑定点击放大
  const img = el.querySelector('img');
  if (img && window.ND && window.ND.openLightbox) {
    img.onclick = function() {
      window.ND.openLightbox(b.img);
    };
  }

  return el;
}, {
  description: '图片或视频，支持6档语义化尺寸（tiny/xsmall/small/medium/large/xlarge）+标题+点击放大',
  author: 'core',
  category: 'media',
  tags: ['image', 'video', 'responsive-sizing']
});

// Chart - 图表（基于Chart.js）
BlockRegistry.register('chart', function(b) {
  const el = _wrap(
    '<div class="nd-chart-box">' +
      (b.title ? '<div class="nd-chart-t">' + b.title + '</div>' : '') +
      '<canvas></canvas>' +
    '</div>',
    ''
  );

  // 延迟渲染图表（等待Chart.js加载）
  setTimeout(function() {
    const canvas = el.querySelector('canvas');
    if (!canvas) return;

    if (window.Chart) {
      const isPie = (b.chart === 'pie' || b.chart === 'doughnut');

      const chartConfig = {
        type: b.chart || 'bar',
        data: b.data,
        options: Object.assign({
          responsive: true,
          plugins: {
            legend: {
              labels: {color: '#c3cee0'}
            },
            datalabels: isPie && window.ChartDataLabels ? {
              color: '#ffffff',
              font: {
                size: 20,
                weight: 'bold'
              },
              formatter: function(value, context) {
                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return percentage + '%';
              }
            } : false
          },
          scales: isPie ? {} : {
            x: {ticks: {color: '#9fb0ca'}},
            y: {ticks: {color: '#9fb0ca'}}
          }
        }, b.options || {})
      };

      // 饼图/环形图需要显式传递datalabels插件
      if (isPie && window.ChartDataLabels) {
        chartConfig.plugins = [window.ChartDataLabels];
      }

      new Chart(canvas, chartConfig);
    } else {
      canvas.parentNode.innerHTML += '<div style="color:#9fb0ca;padding:20px">(图表需 Chart.js，当前离线)</div>';
    }
  }, 60);

  return el;
}, {
  description: '数据图表，支持line/bar/pie/doughnut等类型',
  author: 'core'
});

// Tabs - 标签页切换
BlockRegistry.register('tabs', function(b) {
  const el = _wrap(
    '<div class="nd-tabs">' +
      '<div class="nd-tabhead">' +
        ((b.tabs || []).map(function(t, i) {
          return '<button class="nd-tab ' + (i === 0 ? 'on' : '') + '" data-i="' + i + '">' + t.label + '</button>';
        }).join('')) +
      '</div>' +
      '<div class="nd-tabbody">' +
        ((b.tabs || []).map(function(t, i) {
          return '<div class="nd-pane ' + (i === 0 ? 'on' : '') + '" data-i="' + i + '">' + (t.html || t.text || '') + '</div>';
        }).join('')) +
      '</div>' +
    '</div>',
    ''
  );

  // 绑定切换事件
  el.querySelectorAll('.nd-tab').forEach(function(btn) {
    btn.onclick = function() {
      const idx = btn.dataset.i;
      el.querySelectorAll('.nd-tab').forEach(function(x) {
        x.classList.toggle('on', x.dataset.i === idx);
      });
      el.querySelectorAll('.nd-pane').forEach(function(x) {
        x.classList.toggle('on', x.dataset.i === idx);
      });
    };
  });

  return el;
}, {
  description: '标签页切换，适合多方案并列、深度展开',
  author: 'core'
});

// Flow - 业务流程带状图（新增v3.3）
BlockRegistry.register('flow', function(b) {
  const steps = (b.items || []).map(function(item, i) {
    return '<div class="nd-flow-step" style="animation-delay:' + (i * 0.1) + 's">' +
      '<div class="nd-flow-num">' + String(i + 1).padStart(2, '0') + '</div>' +
      '<div class="nd-flow-label">' + item + '</div>' +
    '</div>';
  }).join('');

  return _wrap(
    (b.title ? '<h2>' + b.title + '</h2>' : '') +
    '<div class="nd-flow">' + steps + '</div>',
    ''
  );
}, {
  description: '业务流程带状图，展示端到端链路/服务流程/技术架构，比timeline适合平行流程',
  author: 'core',
  category: 'business-visualization',
  tags: ['flow', 'process', 'pipeline', 'funnel']
});

// Gallery - 多图缩略图画廊（新增v3.4）
BlockRegistry.register('gallery', function(b) {
  const items = (b.items || []).map(function(item, i) {
    return '<figure class="nd-gallery-item" style="animation-delay:' + (i * 0.08) + 's">' +
      '<img src="' + item.img + '" alt="' + (item.alt || '') + '" class="nd-gallery-img" data-gallery-src="' + item.img + '">' +
      (item.caption ? '<figcaption class="nd-gallery-caption">' + item.caption + '</figcaption>' : '') +
    '</figure>';
  }).join('');

  const el = _wrap(
    (b.title ? '<h2>' + b.title + '</h2>' : '') +
    '<div class="nd-gallery">' + items + '</div>',
    ''
  );

  // 绑定点击放大（复用灯箱）
  el.querySelectorAll('.nd-gallery-img').forEach(function(img) {
    img.style.cursor = 'pointer';
    img.onclick = function() {
      if (window.ND && window.ND.openLightbox) {
        window.ND.openLightbox(img.dataset.gallerySrc);
      }
    };
  });

  return el;
}, {
  description: '多图缩略图画廊，支持2-6列网格，点击查看大图，适合展示产品截图/设计稿/案例图集',
  author: 'core',
  category: 'media',
  tags: ['gallery', 'images', 'showcase', 'portfolio']
});

// Preview - iframe案例预览（新增v3.4）
BlockRegistry.register('preview', function(b) {
  const items = (b.items || []).map(function(item, i) {
    return '<a class="nd-preview-link" data-preview-src="' + item.href + '" data-preview-title="' + (item.label || '') + '" style="animation-delay:' + (i * 0.08) + 's">' +
      '<span class="nd-preview-icon">' + (item.icon || '📄') + '</span>' +
      '<span class="nd-preview-label">' + item.label + '</span>' +
      '<span class="nd-preview-arrow" aria-hidden="true">↗</span>' +
    '</a>';
  }).join('');

  const el = _wrap(
    (b.title ? '<h2>' + b.title + '</h2>' : '') +
    '<nav class="nd-preview-links" aria-label="案例预览入口">' + items + '</nav>',
    ''
  );

  // 绑定点击事件
  el.querySelectorAll('.nd-preview-link').forEach(function(link) {
    link.onclick = function(e) {
      e.preventDefault();
      if (window.ND && window.ND.openPreview) {
        window.ND.openPreview(link.dataset.previewSrc, link.dataset.previewTitle);
      }
    };
  });

  return el;
}, {
  description: 'iframe案例预览，在模态框中打开真实案例（HTML/Dashboard/原型），适合产品演示/项目展示',
  author: 'core',
  category: 'interactive',
  tags: ['preview', 'iframe', 'demo', 'case-study']
});

console.log('[CoreBlocks] ✓ 已注册12个核心Block:', BlockRegistry.list().join(', '));
