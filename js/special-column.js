// 特殊信息列 - 完整显示核心信息
class SpecialColumn {
    constructor() {
        this.message = "❤️ " + coreMessage + " ❤️";
        this.specialFontSize = fontSize + 10;
        this.x = canvas.width / 2 - (this.message.length * this.specialFontSize) / 4;
        this.y = -this.message.length * this.specialFontSize * 1.5;
        this.speed = 1.5;
        this.chars = [];
        this.opacity = 0;
        this.targetOpacity = 1;
        
        // 初始化每个字符
        for (let i = 0; i < this.message.length; i++) {
            this.chars.push({
                char: this.message[i],
                delay: i * 100,
                currentDelay: i * 100,
                isHeart: this.message[i] === '❤'
            });
        }
    }

    update() {
        // 延迟开始
        if (Date.now() < messageStartTime) return;
        
        this.y += this.speed;
        
        // 淡出效果
        if (this.y > canvas.height / 3) {
            this.targetOpacity = 0;
        }
        
        // 平滑透明度变化
        if (this.opacity < this.targetOpacity) {
            this.opacity += 0.02;
        } else if (this.opacity > this.targetOpacity) {
            this.opacity -= 0.02;
        }
        
        // 更新字符延迟
        this.chars.forEach(charObj => {
            if (charObj.currentDelay > 0) {
                charObj.currentDelay -= 16;
            }
        });

        // 重置到顶部
        if (this.y > canvas.height + this.message.length * this.specialFontSize * 1.5) {
            this.y = -this.message.length * this.specialFontSize * 1.5;
            this.opacity = 0;
            this.targetOpacity = 1;
            this.chars.forEach(charObj => {
                charObj.currentDelay = charObj.delay;
            });
        }
    }

    draw() {
        if (Date.now() < messageStartTime) return;
        
        this.chars.forEach((charObj, index) => {
            if (charObj.currentDelay > 0) return;
            
            const charY = this.y + index * this.specialFontSize * 1.2;
            
            if (charY > -this.specialFontSize && charY < canvas.height) {
                ctx.save();
                
                if (charObj.char === ' ') {
                    ctx.fillStyle = `rgba(255, 255, 255, 0)`;
                } else if (charObj.char === '❤' || charObj.char === '️') {
                    // 爱心用红色显示
                    ctx.fillStyle = `rgba(255, 50, 100, ${this.opacity})`;
                    ctx.font = `bold ${this.specialFontSize + 6}px monospace`;
                    
                    ctx.shadowColor = '#ff1493';
                    ctx.shadowBlur = 25;
                    ctx.fillText(charObj.char, this.x, charY);
                    
                    ctx.shadowColor = '#ff69b4';
                    ctx.shadowBlur = 35;
                    ctx.fillText(charObj.char, this.x, charY);
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                    ctx.font = `bold ${this.specialFontSize}px monospace`;
                    
                    ctx.shadowColor = '#fff';
                    ctx.shadowBlur = 20;
                    ctx.fillText(charObj.char, this.x, charY);
                    
                    ctx.shadowColor = '#0f0';
                    ctx.shadowBlur = 30;
                    ctx.fillText(charObj.char, this.x, charY);
                }
                
                ctx.restore();
            }
        });
    }
}

