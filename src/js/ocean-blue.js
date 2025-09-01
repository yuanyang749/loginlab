// 海洋蓝调风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化页面动画
    initPageAnimations();
    
    // 初始化海洋效果
    initOceanEffects();
    
    // 初始化波浪动画
    initWaveAnimations();
    
    // 初始化水滴效果
    initWaterDropEffects();
});

function initPageAnimations() {
    // 卡片入场动画
    const oceanCard = document.querySelector('.ocean-card');
    if (oceanCard) {
        oceanCard.style.opacity = '0';
        oceanCard.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            oceanCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            oceanCard.style.opacity = '1';
            oceanCard.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-30px) scale(0.8)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.8s ease';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0) scale(1)';
        }, 400);
    }

    // 海洋图标动画
    const oceanIcon = document.querySelector('.ocean-icon');
    if (oceanIcon) {
        oceanIcon.style.opacity = '0';
        oceanIcon.style.transform = 'scale(0) rotate(-180deg)';
        
        setTimeout(() => {
            oceanIcon.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            oceanIcon.style.opacity = '1';
            oceanIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
    }
}

function initOceanEffects() {
    // 输入框海洋效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            createOceanRipple(input);
            addFloatingBubbles(input);
        });

        input.addEventListener('blur', () => {
            removeOceanRipple(input);
        });

        // 输入时的水波效果
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                createWaterSplash(e.target);
            }
        });
    });

    // 按钮海洋效果
    const buttons = document.querySelectorAll('.ocean-btn, .ocean-btn-small');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            createButtonWave(button);
        });

        button.addEventListener('click', (e) => {
            createWaveExplosion(e, button);
        });
    });

    // 链接海洋效果
    const links = document.querySelectorAll('.ocean-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            createLinkRipple(link);
        });
    });
}

function createOceanRipple(element) {
    const formGroup = element.closest('.form-group');
    if (formGroup) {
        formGroup.style.filter = 'drop-shadow(0 0 15px rgba(0, 119, 190, 0.3))';
        formGroup.style.transform = 'scale(1.02)';
        formGroup.style.transition = 'all 0.3s ease';
    }
}

function removeOceanRipple(element) {
    const formGroup = element.closest('.form-group');
    if (formGroup) {
        formGroup.style.filter = '';
        formGroup.style.transform = 'scale(1)';
    }
}

function addFloatingBubbles(input) {
    const rect = input.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const bubble = document.createElement('div');
        bubble.textContent = '💧';
        bubble.style.cssText = `
            position: fixed;
            left: ${rect.right - 30 + Math.random() * 20}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: ${8 + Math.random() * 6}px;
            pointer-events: none;
            z-index: 1000;
            animation: floatingBubble 3s ease-out forwards;
            animation-delay: ${i * 0.2}s;
        `;
        
        document.body.appendChild(bubble);
        
        setTimeout(() => {
            document.body.removeChild(bubble);
        }, 3000);
    }
}

function createWaterSplash(input) {
    const rect = input.getBoundingClientRect();
    const splash = document.createElement('div');
    
    splash.style.cssText = `
        position: fixed;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.bottom - 5}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #87CEEB, #0077be);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: waterSplash 1s ease-out forwards;
    `;
    
    document.body.appendChild(splash);
    
    setTimeout(() => {
        document.body.removeChild(splash);
    }, 1000);
}

function createButtonWave(button) {
    button.style.background = 'linear-gradient(135deg, #4682B4, #0077be)';
    button.style.boxShadow = '0 12px 35px rgba(0, 119, 190, 0.5)';
    
    setTimeout(() => {
        button.style.background = 'linear-gradient(135deg, #87CEEB, #0077be)';
        button.style.boxShadow = '0 8px 25px rgba(0, 119, 190, 0.3)';
    }, 200);
}

function createWaveExplosion(event, button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const waterEmojis = ['💧', '🌊', '💦', '🔵'];
    
    for (let i = 0; i < 8; i++) {
        const wave = document.createElement('div');
        wave.textContent = waterEmojis[Math.floor(Math.random() * waterEmojis.length)];
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 60;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        wave.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 1000;
            animation: waveExplosion 1.2s ease-out forwards;
            --end-x: ${endX}px;
            --end-y: ${endY}px;
        `;
        
        document.body.appendChild(wave);
        
        setTimeout(() => {
            document.body.removeChild(wave);
        }, 1200);
    }
}

function createLinkRipple(link) {
    link.style.textShadow = '0 0 15px rgba(0, 119, 190, 0.8)';
    link.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        link.style.textShadow = '0 0 10px rgba(0, 119, 190, 0.5)';
        link.style.transform = 'scale(1)';
    }, 200);
}

function initWaveAnimations() {
    // 鼠标移动时的波浪响应
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        updateWaveAnimation(mouseX, mouseY);
        updateBackgroundGradient(mouseX, mouseY);
    });

    // 定期更新波浪动画
    setInterval(() => {
        randomizeWaveAnimation();
    }, 5000);
}

function updateWaveAnimation(mouseX, mouseY) {
    const waves = document.querySelectorAll('.wave');
    waves.forEach((wave, index) => {
        const factor = (index + 1) * 0.1;
        const speed = 8 + (mouseX * mouseY) * 5;
        wave.style.animationDuration = speed + 's';
        
        const intensity = mouseX * mouseY;
        wave.style.opacity = 0.3 + intensity * 0.4;
    });
}

function updateBackgroundGradient(mouseX, mouseY) {
    const background = document.querySelector('.ocean-background');
    if (background) {
        const hue1 = 200 + (mouseX * 30);
        const hue2 = 220 + (mouseY * 40);
        
        background.style.background = `linear-gradient(180deg, 
            hsl(${hue1}, 60%, 75%) 0%, 
            hsl(${hue2}, 50%, 55%) 50%, 
            hsl(240, 70%, 25%) 100%)`;
    }
}

function randomizeWaveAnimation() {
    const waves = document.querySelectorAll('.wave');
    waves.forEach(wave => {
        const randomDuration = 8 + Math.random() * 6;
        wave.style.animationDuration = randomDuration + 's';
    });
}

function initWaterDropEffects() {
    // 点击页面时产生水滴
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.ocean-card')) {
            createClickDrop(e);
        }
    });

    // 定期产生随机水滴
    setInterval(() => {
        createRandomDrop();
    }, 3000);
}

function createClickDrop(event) {
    const drop = document.createElement('div');
    drop.textContent = '💧';
    drop.style.cssText = `
        position: fixed;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: clickDrop 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(drop);
    
    setTimeout(() => {
        document.body.removeChild(drop);
    }, 1500);
}

function createRandomDrop() {
    const drop = document.createElement('div');
    drop.textContent = '💦';
    drop.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: -20px;
        font-size: 14px;
        pointer-events: none;
        z-index: 1;
        animation: randomDrop 4s linear forwards;
        opacity: 0.7;
    `;
    
    document.body.appendChild(drop);
    
    setTimeout(() => {
        document.body.removeChild(drop);
    }, 4000);
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes floatingBubble {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }
    
    @keyframes waterSplash {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes waveExplosion {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0.3);
        }
    }
    
    @keyframes clickDrop {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(60px) scale(1.5);
        }
    }
    
    @keyframes randomDrop {
        0% {
            opacity: 0.7;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
