document.addEventListener('DOMContentLoaded', () => {
  // 想加几条轨道就在这里加几条
  // 支持：
  // - 纯文本：'小能苗完成作业了！'
  // - Markdown 链接：'[xuzhougeng完成作业了](https://xuzhougeng.com)'
  const messages = [
    '[小能苗完成作业!](https://oliachen.github.io)',
    '[shade doll完成作业了!](https://fy10086.github.io)',
    '[任完成作业了!](http://64.176.80.113)'
  ];

  // 找到第一条跑马灯容器作为模板
  const firstContainer = document.querySelector('.marquee-container');
  if (!firstContainer) return;

  // 创建舞台容器（垂直堆叠 N 条弹幕）
  const stage = document.createElement('div');
  stage.className = 'danmaku-stage';

  // 用 stage 包裹原来的第一条弹幕
  const parent = firstContainer.parentNode;
  parent.insertBefore(stage, firstContainer);
  stage.appendChild(firstContainer);

  // ---- 工具：解析 [text](url) ----
  function parseMarkdownLink(input) {
    const s = (input || '').trim();
    const m = s.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/i);
    if (!m) return null;
    return { text: m[1], url: m[2] };
  }

  // ---- 工具：设置某个 marquee-text 的内容（纯文本/链接）----
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

  // ---- 工具：给一个容器内的 wrapper/text id 做唯一化，避免冲突 ----
  function uniquifyIds(container, idx) {
    const wrapper = container.querySelector('#marqueeWrapper');
    const t = container.querySelector('#marqueeText');
    const td = container.querySelector('#marqueeTextDuplicate');

    if (wrapper) wrapper.id = `marqueeWrapper_${idx}`;
    if (t) t.id = `marqueeText_${idx}`;
    if (td) td.id = `marqueeTextDuplicate_${idx}`;

    return { wrapper, t, td };
  }

  // ---- 工具：设置某条轨道的 message + 速度 ----
  function configureTrack(container, idx, message) {
    const { wrapper, t, td } = uniquifyIds(container, idx);

    setMarqueeContent(t, message);
    setMarqueeContent(td, message);

    // 速度：基础 20s，按轨道编号 + 少量扰动
    // 你也可以改成固定规则，例如：20, 18, 22...
    const base = 20;
    const offsetByIdx = (idx % 5) - 2; // -2,-1,0,1,2 循环
    const jitter = (Math.random() * 1.5) - 0.75; // -0.75 ~ +0.75
    const duration = Math.max(8, base + offsetByIdx * 1.5 + jitter);

    if (wrapper) wrapper.style.animationDuration = `${duration.toFixed(2)}s`;
  }

  // ---- 第 0 条轨道：直接用原来的 firstContainer ----
  configureTrack(firstContainer, 0, messages[0] || '');

  // ---- 其余轨道：克隆 firstContainer ----
  for (let i = 1; i < messages.length; i++) {
    const cloned = firstContainer.cloneNode(true);
    configureTrack(cloned, i, messages[i] || '');
    stage.appendChild(cloned);
  }

  // 隐藏输入框区域（保险起见）
  const inputContainer = document.querySelector('.input-container');
  if (inputContainer) inputContainer.style.display = 'none';
});
