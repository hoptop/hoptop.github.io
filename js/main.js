document.addEventListener('DOMContentLoaded', () => {
  // 你想要的两个人弹幕内容：只需要在这里加/改文案即可
  // 支持两种格式：
  // 1) 纯文本：'小能苗完成作业了！'
  // 2) Markdown 链接：'[xuzhougeng完成作业了](https://xuzhougeng.com)'
  const messages = [
    '[小能苗完成作业!](https://oliachen.github.io)',
    '[shade doll完成作业了!](https://fy10086.github.io)',
    '[任完成作业了!](http://64.176.80.113)'
      
  ];

  // 找到你原本的那条跑马灯容器
  const firstContainer = document.querySelector('.marquee-container');
  if (!firstContainer) return;

  // 创建舞台容器（用于垂直堆叠多条弹幕）
  const stage = document.createElement('div');
  stage.className = 'danmaku-stage';

  // 用 stage 包裹原来的第一条弹幕
  const parent = firstContainer.parentNode;
  parent.insertBefore(stage, firstContainer);
  stage.appendChild(firstContainer);

  // -------- 工具函数：解析 [text](url) --------
  function parseMarkdownLink(input) {
    // 只解析一整段完全匹配的 Markdown 链接
    // 例: [xxx](https://example.com)
    const s = (input || '').trim();
    const m = s.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/i);
    if (!m) return null;
    return { text: m[1], url: m[2] };
  }

  // -------- 工具函数：把弹幕元素设置为「纯文本」或「可点击链接」--------
  function setMarqueeContent(el, rawMessage) {
    if (!el) return;

    const link = parseMarkdownLink(rawMessage);
    el.classList.remove('is-link');
    el.innerHTML = ''; // 清空，避免残留

    if (link) {
      // 使用 a 标签实现可点击跳转
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

  // 生成/更新第一条弹幕文本
  const t1 = document.getElementById('marqueeText');
  const t1d = document.getElementById('marqueeTextDuplicate');
  setMarqueeContent(t1, messages[0] || '');
  setMarqueeContent(t1d, messages[0] || '');

  // 如果只有一条消息就不再生成第二条
  if (messages.length < 2) return;

  // 克隆第一条弹幕容器，生成第二条轨道
  const secondContainer = firstContainer.cloneNode(true);

  // 修正 clone 后的重复 id，避免 DOM 冲突
  const wrapper2 = secondContainer.querySelector('#marqueeWrapper');
  const text2 = secondContainer.querySelector('#marqueeText');
  const text2d = secondContainer.querySelector('#marqueeTextDuplicate');

  if (wrapper2) wrapper2.id = 'marqueeWrapper2';
  if (text2) text2.id = 'marqueeText2';
  if (text2d) text2d.id = 'marqueeTextDuplicate2';

  // 设置第二条弹幕内容
  setMarqueeContent(text2, messages[1] || '');
  setMarqueeContent(text2d, messages[1] || '');

  // 可选：让第二条速度略微不同，看起来更像弹幕（不想要就删掉这行）
  if (wrapper2) wrapper2.style.animationDuration = '18s';

  // 添加到舞台
  stage.appendChild(secondContainer);

  // 隐藏输入框区域
  const inputContainer = document.querySelector('.input-container');
  if (inputContainer) inputContainer.style.display = 'none';
});
