// 初始化画布
resizeCanvas();

// 初始化列
function initColumns() {
    columns = [];
    const columnCount = Math.floor(canvas.width / fontSize) + 10;
    
    // 分批创建列，错开启动时间
    for (let i = 0; i < columnCount; i++) {
        setTimeout(() => {
            columns.push(new Column(i * fontSize));
        }, Math.random() * 2000);
    }
    
    // 添加特殊信息列
    specialMessage = new SpecialColumn();
}

// 动画循环
function animate() {
    // 半透明黑色覆盖，创造拖尾效果
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 更新和绘制所有列
    columns.forEach(column => {
        column.update();
        column.draw();
    });

    // 绘制特殊信息
    if (specialMessage) {
        specialMessage.update();
        specialMessage.draw();
    }

    requestAnimationFrame(animate);
}

// 窗口大小改变时重新初始化
window.addEventListener('resize', () => {
    resizeCanvas();
    initColumns();
});

// 启动动画
initColumns();
animate();

// 每5秒随机添加新列
setInterval(() => {
    if (columns.length < Math.floor(canvas.width / fontSize) + 20) {
        columns.push(new Column(Math.random() * canvas.width));
    }
}, 5000);

// 点击屏幕添加新列（排除输入框区域）
document.addEventListener('click', (e) => {
    if (e.target.closest('.input-container')) return;
    
    const column = new Column(e.clientX);
    column.y = e.clientY - Math.random() * 200;
    columns.push(column);
});

// 应用新消息
const messageInput = document.getElementById('messageInput');
const applyBtn = document.getElementById('applyBtn');

function applyNewMessage() {
    const newMessage = messageInput.value.trim();
    if (newMessage) {
        updateChars(newMessage);
        specialMessage = new SpecialColumn();
        
        // 添加视觉反馈
        applyBtn.style.background = 'rgba(0, 255, 0, 0.4)';
        setTimeout(() => {
            applyBtn.style.background = '';
        }, 300);
    }
}

applyBtn.addEventListener('click', applyNewMessage);

// 按回车键也可以应用
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        applyNewMessage();
    }
});

