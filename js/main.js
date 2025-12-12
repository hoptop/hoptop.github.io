document.addEventListener('DOMContentLoaded', () => {
    // 你想要的两个人弹幕内容：只需要在这里加/改文案即可
    const messages = [
        '小能苗完成作业了！',
        '任完成作业了！'
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

    // 生成/更新第一条弹幕文本
    const t1 = document.getElementById('marqueeText');
    const t1d = document.getElementById('marqueeTextDuplicate');
    if (t1) t1.textContent = messages[0] || '';
    if (t1d) t1d.textContent = messages[0] || '';

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
    if (text2) text2.textContent = messages[1];
    if (text2d) text2d.textContent = messages[1];

    // 可选：让第二条速度略微不同，看起来更像弹幕（不想要就删掉这两行）
    if (wrapper2) wrapper2.style.animationDuration = '18s';

    // 添加到舞台
    stage.appendChild(secondContainer);

    // 如页面还残留 input-container，这里再保险隐藏一次（即使 CSS 已隐藏也不冲突）
    const inputContainer = document.querySelector('.input-container');
    if (inputContainer) inputContainer.style.display = 'none';
});
