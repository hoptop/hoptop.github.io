// 单列字符雨
class Column {
    constructor(x) {
        this.x = x;
        this.y = -Math.random() * canvas.height;
        this.chars = [];
        this.speed = Math.random() * 3 + 2;
        this.length = Math.floor(Math.random() * 25 + 15);
        this.headBrightness = 1;
        
        // 初始化字符列
        for (let i = 0; i < this.length; i++) {
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            const displayChar = randomChar === ' ' ? '❤️' : randomChar;
            this.chars.push({
                char: displayChar,
                brightness: Math.max(0, 1 - i * 0.08),
                originalChar: randomChar,
                isHeart: randomChar === '❤️' || randomChar === ' '
            });
        }
    }

    update() {
        this.y += this.speed;
        
        // 如果列超出屏幕底部，重置到顶部
        if (this.y > canvas.height + this.length * fontSize) {
            this.y = -this.length * fontSize;
            this.x = Math.random() * (canvas.width / fontSize) * fontSize;
            this.speed = Math.random() * 3 + 2;
        }

        // 随机更新列中的字符
        if (Math.random() < 0.1) {
            const randomIndex = Math.floor(Math.random() * this.chars.length);
            const newChar = chars[Math.floor(Math.random() * chars.length)];
            this.chars[randomIndex].char = newChar === ' ' ? '❤️' : newChar;
            this.chars[randomIndex].originalChar = newChar;
            this.chars[randomIndex].isHeart = newChar === '❤️' || newChar === ' ';
        }
    }

    draw() {
        this.chars.forEach((charObj, index) => {
            const charY = this.y + index * fontSize;
            
            if (charY > -fontSize && charY < canvas.height) {
                const isHead = index === 0;
                const brightness = isHead ? 1 : charObj.brightness;
                
                // 爱心用红色/粉色显示
                if (charObj.isHeart) {
                    const redValue = Math.floor(255 * brightness);
                    const alpha = isHead ? 1 : brightness * 0.9;
                    ctx.fillStyle = `rgba(${redValue}, 50, 100, ${alpha})`;
                    ctx.shadowColor = '#ff1493';
                    ctx.shadowBlur = 8;
                } else {
                    const greenValue = Math.floor(255 * brightness);
                    const alpha = isHead ? 1 : brightness * 0.9;
                    ctx.fillStyle = `rgba(0, ${greenValue}, 0, ${alpha})`;
                    ctx.shadowColor = '#0f0';
                    ctx.shadowBlur = isHead ? 10 : 0;
                }
                
                if (isHead) {
                    ctx.font = `bold ${fontSize + 4}px monospace`;
                } else {
                    ctx.font = `${fontSize}px monospace`;
                }
                
                ctx.fillText(charObj.char, this.x, charY);
                ctx.shadowBlur = 0;
            }
        });
    }
}

