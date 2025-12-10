// 配置和全局变量
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// 核心信息
let coreMessage = "GZDLab love everyone";
const heartEmoji = "❤️";
let chars = [...coreMessage.split(''), heartEmoji, heartEmoji, heartEmoji];

// 样式配置
const fontSize = 22;

// 状态
let columns = [];
let specialMessage = null;
let messageStartTime = Date.now() + 5000;

// 设置画布大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 更新字符集
function updateChars(newMessage) {
    coreMessage = newMessage || "GZDLab love everyone";
    chars = [...coreMessage.split(''), heartEmoji, heartEmoji, heartEmoji];
}

