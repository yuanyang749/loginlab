// 温馨粉色风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化页面动画
    initPageAnimations();
    
    // 初始化温馨效果
    initWarmEffects();
    
    // 初始化花瓣动画
    initPetalAnimations();
    
    // 初始化爱心效果
    initHeartEffects();
});

function initPageAnimations() {
    // 卡片入场动画
    const pinkCard = document.querySelector('.pink-card');
    if (pinkCard) {
        pinkCard.style.opacity = '0';
        pinkCard.style.transform = 'translateY(50px) scale(0.8)';
        
        setTimeout(() => {
            pinkCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            pinkCard.style.opacity = '1';
            pinkCard.style.transform = 'translateY(0) scale(1)';
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

    // 花朵图标动画
    const flowerIcon = document.querySelector('.flower-icon');
    if (flowerIcon) {
        flowerIcon.style.opacity = '0';
        flowerIcon.style.transform = 'scale(0) rotate(-180deg)';
        
        setTimeout(() => {
            flowerIcon.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            flowerIcon.style.opacity = '1';
            flowerIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
    }
}

function initWarmEffects() {
    // 输入框温馨效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            createWarmGlow(input);
            addFloatingHearts(input);
        });

        input.addEventListener('blur', () => {
            removeWarmGlow(input);
        });

        // 输入时的温馨反馈
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                createInputSparkle(e.target);
            }
        });
    });

    // 按钮温馨效果
    const buttons = document.querySelectorAll('.pink-btn, .pink-btn-small');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            createButtonWarmth(button);
        });

        button.addEventListener('click', (e) => {
            createHeartExplosion(e, button);
        });
    });

    // 链接温馨效果
    const links = document.querySelectorAll('.pink-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            createLinkGlow(link);
        });
    });
}

function createWarmGlow(element) {
    const formGroup = element.closest('.form-group');
    if (formGroup) {
        formGroup.style.filter = 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.3))';
        formGroup.style.transform = 'scale(1.02)';
        formGroup.style.transition = 'all 0.3s ease';
    }
}

function removeWarmGlow(element) {
    const formGroup = element.closest('.form-group');
    if (formGroup) {
        formGroup.style.filter = '';
        formGroup.style.transform = 'scale(1)';
    }
}

function addFloatingHearts(input) {
    const rect = input.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.cssText = `
            position: fixed;
            left: ${rect.right - 20}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
            animation: floatingHeart 2s ease-out forwards;
            animation-delay: ${i * 0.2}s;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 2000);
    }
}

function createInputSparkle(input) {
    const rect = input.getBoundingClientRect();
    const sparkle = document.createElement('div');
    
    sparkle.style.cssText = `
        position: fixed;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top + Math.random() * rect.height}px;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #ff6b9d, #ff8fab);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleEffect 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        document.body.removeChild(sparkle);
    }, 1000);
}

function createButtonWarmth(button) {
    button.style.background = 'linear-gradient(135deg, #ff8fab, #ffa8c5)';
    button.style.boxShadow = '0 12px 35px rgba(255, 107, 157, 0.5)';
    
    setTimeout(() => {
        button.style.background = 'linear-gradient(135deg, #ff6b9d, #ff8fab)';
        button.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.3)';
    }, 200);
}

function createHeartExplosion(event, button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const hearts = ['💖', '💕', '💗', '💓', '💝'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 60;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        heart.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 1000;
            animation: heartExplosion 1.2s ease-out forwards;
            --end-x: ${endX}px;
            --end-y: ${endY}px;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 1200);
    }
}

function createLinkGlow(link) {
    link.style.textShadow = '0 0 15px rgba(255, 107, 157, 0.8)';
    link.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        link.style.textShadow = '0 0 10px rgba(255, 107, 157, 0.5)';
        link.style.transform = 'scale(1)';
    }, 200);
}

function initPetalAnimations() {
    // 鼠标移动时的花瓣响应
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        updatePetalAnimation(mouseX, mouseY);
        updateBackgroundGradient(mouseX, mouseY);
    });

    // 定期添加新花瓣
    setInterval(() => {
        addRandomPetal();
    }, 3000);
}

function updatePetalAnimation(mouseX, mouseY) {
    const petals = document.querySelectorAll('.petal');
    petals.forEach((petal, index) => {
        const factor = (index + 1) * 0.1;
        const offsetX = (mouseX - 0.5) * 30 * factor;
        const offsetY = (mouseY - 0.5) * 20 * factor;
        
        petal.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX}deg)`;
    });
}

function updateBackgroundGradient(mouseX, mouseY) {
    const background = document.querySelector('.background');
    if (background) {
        const hue1 = 330 + (mouseX * 20);
        const hue2 = 300 + (mouseY * 30);
        
        background.style.background = `linear-gradient(135deg, 
            hsl(${hue1}, 80%, 75%) 0%, 
            hsl(${hue2}, 70%, 85%) 50%, 
            hsl(${hue2}, 70%, 85%) 100%)`;
    }
}

function addRandomPetal() {
    const petalContainer = document.querySelector('.petal-container');
    if (!petalContainer) return;
    
    const petal = document.createElement('div');
    petal.className = 'petal extra-petal';
    
    petal.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-delay: 0s;
        animation-duration: ${6 + Math.random() * 4}s;
        opacity: ${0.5 + Math.random() * 0.3};
        transform: scale(${0.8 + Math.random() * 0.4});
    `;
    
    petalContainer.appendChild(petal);
    
    setTimeout(() => {
        petalContainer.removeChild(petal);
    }, 10000);
}

function initHeartEffects() {
    // 点击页面时产生爱心
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.pink-card')) {
            createClickHeart(e);
        }
    });

    // 定期产生随机爱心
    setInterval(() => {
        createRandomHeart();
    }, 5000);
}

function createClickHeart(event) {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.style.cssText = `
        position: fixed;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: clickHeart 1.5s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 1500);
}

function createRandomHeart() {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 20}px;
        font-size: 14px;
        pointer-events: none;
        z-index: 1;
        animation: randomHeart 4s ease-out forwards;
        opacity: 0.6;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 4000);
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes floatingHeart {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.5);
        }
    }
    
    @keyframes sparkleEffect {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes heartExplosion {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0.3);
        }
    }
    
    @keyframes clickHeart {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.5);
        }
    }
    
    @keyframes randomHeart {
        0% {
            opacity: 0.6;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) rotate(360deg);
        }
    }
    
    .extra-petal {
        animation: petalFall 8s linear infinite;
    }
`;
document.head.appendChild(style);
