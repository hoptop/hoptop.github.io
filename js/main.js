document.addEventListener('DOMContentLoaded', () => {
    const marqueeText = document.getElementById('marqueeText');
    const marqueeTextDuplicate = document.getElementById('marqueeTextDuplicate');
    const marqueeWrapper = document.getElementById('marqueeWrapper');
    const messageInput = document.getElementById('messageInput');
    const applyBtn = document.getElementById('applyBtn');

    function updateMarquee() {
        const text = messageInput.value.trim();
        if (text) {
            // Update both text elements for seamless loop
            marqueeText.innerText = text;
            marqueeTextDuplicate.innerText = text;
            
            // Reset animation by removing and re-adding the class
            marqueeWrapper.style.animation = 'none';
            // Force reflow
            void marqueeWrapper.offsetWidth;
            marqueeWrapper.style.animation = '';
            
            // Visual feedback
            applyBtn.style.background = 'rgba(0, 255, 0, 0.4)';
            setTimeout(() => {
                applyBtn.style.background = '';
            }, 300);
        }
    }

    applyBtn.addEventListener('click', updateMarquee);

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateMarquee();
        }
    });
});
