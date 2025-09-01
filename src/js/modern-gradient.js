// 现代渐变风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加动态背景效果
    initDynamicBackground();
});

function initPageAnimations() {
    // 玻璃卡片入场动画
    const glassCard = document.querySelector('.glass-card');
    if (glassCard) {
        glassCard.style.opacity = '0';
        glassCard.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            glassCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            glassCard.style.opacity = '1';
            glassCard.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.6s ease';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0)';
        }, 400);
    }
}

function initInteractiveEffects() {
    // 输入框聚焦效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1.02)';
                formGroup.style.transition = 'transform 0.3s ease';
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1)';
            }
        });

        // 输入时的粒子效果
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                createInputParticles(e.target);
            }
        });
    });

    // 按钮点击波纹效果
    const buttons = document.querySelectorAll('.login-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createRippleEffect(e, button);
        });

        // 按钮悬停效果
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
            button.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
    });

    // 链接悬停效果
    const links = document.querySelectorAll('.additional-links a');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.1)';
            link.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
            link.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        });
    });
}

function createRippleEffect(event, button) {
    const ripple = button.querySelector('.btn-ripple');
    if (ripple) {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '1';
        
        setTimeout(() => {
            ripple.style.transform = 'scale(1)';
            ripple.style.opacity = '0';
        }, 10);
    }
}

function createInputParticles(input) {
    const rect = input.getBoundingClientRect();
    const particle = document.createElement('div');
    
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${rect.right - 10}px;
        top: ${rect.top + rect.height / 2}px;
        animation: particleFloat 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        document.body.removeChild(particle);
    }, 1000);
}

function initDynamicBackground() {
    // 鼠标移动时的背景响应
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        updateBackgroundGradient(mouseX, mouseY);
        updateBubblePositions(mouseX, mouseY);
    });

    // 添加额外的浮动气泡
    createExtraBubbles();
    
    // 定期更新背景
    setInterval(() => {
        updateBackgroundAnimation();
    }, 5000);
}

function updateBackgroundGradient(mouseX, mouseY) {
    const background = document.querySelector('.background');
    if (background) {
        const hue1 = 240 + (mouseX * 30);
        const hue2 = 280 + (mouseY * 30);
        
        background.style.background = `linear-gradient(45deg, 
            hsl(${hue1}, 70%, 65%) 0%, 
            hsl(${hue2}, 60%, 60%) 100%)`;
    }
}

function updateBubblePositions(mouseX, mouseY) {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, index) => {
        const factor = (index + 1) * 0.1;
        const offsetX = (mouseX - 0.5) * 20 * factor;
        const offsetY = (mouseY - 0.5) * 20 * factor;
        
        bubble.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}

function createExtraBubbles() {
    const background = document.querySelector('.background');
    if (!background) return;
    
    for (let i = 0; i < 3; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble extra-bubble';
        
        const size = Math.random() * 40 + 30;
        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
            opacity: ${Math.random() * 0.3 + 0.1};
        `;
        
        background.appendChild(bubble);
    }
}

function updateBackgroundAnimation() {
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach(bubble => {
        const currentDelay = parseFloat(bubble.style.animationDelay) || 0;
        bubble.style.animationDelay = (currentDelay + Math.random() * 2) + 's';
    });
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px) scale(0);
        }
    }
    
    .extra-bubble {
        animation: float 12s ease-in-out infinite;
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .additional-links a {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
