document.addEventListener('DOMContentLoaded', () => {
  const messages = [
    '[小能苗完成作业!](https://oliachen.github.io)',
    '[shade doll完成作业了!](https://fy10086.github.io)',
    '[任完成作业了!](http://64.176.80.113)',
    '[市民廖女士完成作业了!](https://liaoyuan919.github.io)',
    '[发条鸟完成作业了!](https://entpyf.github.io)',
    '[Violet完成作业了!](https://jymtop.github.io/aihomework.github.io/)',
    '[珠珠完成作业了!](http://124.223.166.76)',
    '[xinyi完成作业了!](https://xinyi-jane.github.io)',
    '[小雷完成作业了!](https://2473651157.github.io/bazi-generator/)',
    '[huhu完成作业了!](https://hulilly.github.io/)',
    '[小淇同学完成作业了!](https://Microqi.github.io)',
    '[💤完成作业了!](https://sssshanzhap.github.io/)',
    '[maosancai完成作业了!](http://keren.waatlab.com/zh/)',
    '[伟祥完成作业了!](https://lwx0727.github.io/)',
    '[Yuang 完成作业了!](https://yeungyuenming.github.io/zh/)',
    '[7ason 完成作业了!](http://www.8bit.uno/)',
    '[up_and_downs 完成作业了!](http://43.152.67.223/)',
    '[Hayes 完成作业了!](http://43.134.45.178/)',
    '[小冯Joe 完成作业了!](https://huazhuofeng.top/)',
    '[宗辉 完成作业了!](https://scsksprings.github.io/zombie-nutrition/',
    '[绪 完成作业了!](https://www.ahys.asia)',
    '[果子完成作业了!](https://shipeng-guo.github.io/yyspin/)'
  ];

  const firstContainer = document.querySelector('.marquee-container');
  if (!firstContainer) return;

  // 创建舞台容器（垂直堆叠 N 条弹幕）
  const stage = document.createElement('div');
  stage.className = 'danmaku-stage';

  // 用 stage 包裹原来的第一条弹幕
  const parent = firstContainer.parentNode;
  parent.insertBefore(stage, firstContainer);
  stage.appendChild(firstContainer);

  function parseMarkdownLink(input) {
    const s = (input || '').trim();
    const m = s.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/i);
    if (!m) return null;
    return { text: m[1], url: m[2] };
  }

  function setMarqueeContent(el, rawMessage) {
    if (!el) return;

    const link = parseMarkdownLink(rawMessage);
    el.classList.remove('is-link');
    el.innerHTML = '';

    if (link) {
      const a = document.createElement('a');
      a.className = 'danmaku-link';
      a.textContent = link.text;
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      el.appendChild(a);
      el.classList.add('is-link');
    } else {
      el.textContent = rawMessage || '';
    }
  }

  // 关键：不要再用 #id 查找，全部用 class + 顺序定位
  function configureTrack(container, idx, message) {
    const wrapper = container.querySelector('.marquee-wrapper');
    const texts = container.querySelectorAll('.marquee-text');

    const t = texts[0] || null;
    const td = texts[1] || null;

    setMarqueeContent(t, message);
    setMarqueeContent(td, message);

    // 可选：仍然给 id 唯一化（不是必须，但不会出问题）
    if (wrapper) wrapper.id = `marqueeWrapper_${idx}`;
    if (t) t.id = `marqueeText_${idx}`;
    if (td) td.id = `marqueeTextDuplicate_${idx}`;

    // 速度：基础 20s + 轨道差异 + 少量扰动
    const base = 20;
    const offsetByIdx = (idx % 5) - 2;          // -2,-1,0,1,2 循环
    const jitter = (Math.random() * 1.5) - 0.75; // -0.75 ~ +0.75
    const duration = Math.max(8, base + offsetByIdx * 1.5 + jitter);

    if (wrapper) wrapper.style.animationDuration = `${duration.toFixed(2)}s`;
  }

  // 第 0 条轨道：直接用 firstContainer
  configureTrack(firstContainer, 0, messages[0] || '');

  // 其余轨道：clone firstContainer（此时即使 id 已被改过，也不影响，因为我们不用 id 查找）
  for (let i = 1; i < messages.length; i++) {
    const cloned = firstContainer.cloneNode(true);
    configureTrack(cloned, i, messages[i] || '');
    stage.appendChild(cloned);
  }

  // 隐藏输入框区域
  const inputContainer = document.querySelector('.input-container');
  if (inputContainer) inputContainer.style.display = 'none';
});
