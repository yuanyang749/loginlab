// 书法墨韵风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加水墨动态效果
    initInkEffects();
    
    // 添加书法动画效果
    initCalligraphyEffects();
});

function initPageAnimations() {
    // 墨韵卡片入场动画
    const inkCard = document.querySelector('.ink-card');
    if (inkCard) {
        inkCard.style.opacity = '0';
        inkCard.style.transform = 'translateY(30px) scale(0.95)';
        
        setTimeout(() => {
            inkCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            inkCard.style.opacity = '1';
            inkCard.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.8s ease';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0)';
        }, 400);
    }

    // 水墨渐现效果
    const inkWashes = document.querySelectorAll('.ink-wash');
    inkWashes.forEach((wash, index) => {
        wash.style.opacity = '0';
        setTimeout(() => {
            wash.style.transition = 'opacity 1.5s ease';
            wash.style.opacity = '0.3';
        }, 600 + index * 300);
    });
}

function initInteractiveEffects() {
    // 输入框聚焦效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                // 添加墨韵扩散效果
                createInkSpread(formGroup);
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

        // 输入时的毛笔效果
        input.addEventListener('input', () => {
            createBrushStroke(input);
        });
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('.login-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createInkRipple(e, button);
            addButtonGlow(button);
        });
    });

    // 链接悬停效果
    const inkLinks = document.querySelectorAll('.ink-link');
    inkLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            createLinkBrush(link);
        });
    });
}

function initInkEffects() {
    // 动态添加更多墨滴
    createDynamicInkDrops();
    
    // 水墨流动效果
    createInkFlow();
    
    // 随机墨韵扩散
    startRandomInkSpread();
}

function initCalligraphyEffects() {
    // 动态书法笔画
    createDynamicBrushStrokes();
    
    // 印章闪烁效果
    animateSealStamp();
    
    // 浮动汉字动画
    animateFloatingCharacters();
}

function createInkSpread(element) {
    const spread = document.createElement('div');
    spread.style.position = 'absolute';
    spread.style.top = '50%';
    spread.style.left = '50%';
    spread.style.width = '10px';
    spread.style.height = '10px';
    spread.style.background = 'radial-gradient(circle, rgba(139, 69, 19, 0.3) 0%, transparent 70%)';
    spread.style.borderRadius = '50%';
    spread.style.transform = 'translate(-50%, -50%) scale(0)';
    spread.style.animation = 'inkSpreadEffect 0.8s ease-out forwards';
    spread.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(spread);
    
    setTimeout(() => {
        spread.remove();
    }, 800);
}

function createBrushStroke(input) {
    const rect = input.getBoundingClientRect();
    const stroke = document.createElement('div');
    stroke.textContent = '丶';
    stroke.style.position = 'fixed';
    stroke.style.left = rect.right - 25 + 'px';
    stroke.style.top = rect.top + 5 + 'px';
    stroke.style.color = 'rgba(139, 69, 19, 0.6)';
    stroke.style.fontSize = '14px';
    stroke.style.pointerEvents = 'none';
    stroke.style.animation = 'brushFade 0.8s ease-out forwards';
    stroke.style.zIndex = '1000';
    
    document.body.appendChild(stroke);
    
    setTimeout(() => {
        stroke.remove();
    }, 800);
}

function createInkRipple(e, button) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = 'radial-gradient(circle, rgba(139, 69, 19, 0.4) 0%, transparent 70%)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'inkRipple 0.8s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

function addButtonGlow(button) {
    button.style.boxShadow = '0 8px 30px rgba(139, 69, 19, 0.4)';
    setTimeout(() => {
        button.style.boxShadow = '0 8px 25px rgba(139, 69, 19, 0.3)';
    }, 300);
}

function createLinkBrush(link) {
    const brush = document.createElement('span');
    brush.textContent = '✒️';
    brush.style.marginLeft = '5px';
    brush.style.animation = 'brushTwirl 0.6s ease-out';
    
    link.appendChild(brush);
    
    setTimeout(() => {
        brush.remove();
    }, 600);
}

function createDynamicInkDrops() {
    const inkBackground = document.querySelector('.ink-background');
    
    setInterval(() => {
        const drop = document.createElement('div');
        drop.className = 'ink-drop dynamic';
        drop.textContent = '●';
        drop.style.position = 'absolute';
        drop.style.color = 'rgba(0, 0, 0, 0.2)';
        drop.style.fontSize = '6px';
        drop.style.top = Math.random() * 100 + '%';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animation = 'inkDrop 4s ease-out forwards';
        
        inkBackground.appendChild(drop);
        
        setTimeout(() => {
            drop.remove();
        }, 4000);
    }, 3000);
}

function createInkFlow() {
    const flow = document.createElement('div');
    flow.style.position = 'fixed';
    flow.style.top = '0';
    flow.style.left = '0';
    flow.style.width = '100%';
    flow.style.height = '100%';
    flow.style.background = 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.02) 50%, transparent 100%)';
    flow.style.animation = 'inkFlow 10s ease-in-out infinite';
    flow.style.pointerEvents = 'none';
    flow.style.zIndex = '-1';
    
    document.body.appendChild(flow);
}

function startRandomInkSpread() {
    const inkWashes = document.querySelectorAll('.ink-wash');
    
    setInterval(() => {
        const randomWash = inkWashes[Math.floor(Math.random() * inkWashes.length)];
        if (randomWash) {
            randomWash.style.transform = 'scale(1.3) rotate(10deg)';
            randomWash.style.opacity = '0.8';
            setTimeout(() => {
                randomWash.style.transform = 'scale(1) rotate(0deg)';
                randomWash.style.opacity = '0.3';
            }, 1000);
        }
    }, 4000);
}

function createDynamicBrushStrokes() {
    const calligraphyElements = document.querySelector('.calligraphy-elements');
    const strokes = ['一', '丨', '丿', '乀', '丶', '乙', '亅', '乚'];
    
    setInterval(() => {
        const stroke = document.createElement('div');
        stroke.className = 'brush-stroke dynamic';
        stroke.textContent = strokes[Math.floor(Math.random() * strokes.length)];
        stroke.style.position = 'absolute';
        stroke.style.color = 'rgba(139, 69, 19, 0.2)';
        stroke.style.fontSize = '30px';
        stroke.style.top = Math.random() * 80 + '%';
        stroke.style.left = Math.random() * 80 + '%';
        stroke.style.animation = 'brushWrite 3s ease-out forwards';
        
        calligraphyElements.appendChild(stroke);
        
        setTimeout(() => {
            stroke.remove();
        }, 3000);
    }, 5000);
}

function animateSealStamp() {
    const seal = document.querySelector('.seal-stamp');
    if (seal) {
        setInterval(() => {
            seal.style.transform = 'scale(1.1) rotate(5deg)';
            seal.style.color = '#ff4500';
            setTimeout(() => {
                seal.style.transform = 'scale(1) rotate(0deg)';
                seal.style.color = '#dc143c';
            }, 300);
        }, 6000);
    }
}

function animateFloatingCharacters() {
    const characters = document.querySelectorAll('.character');
    characters.forEach((char, index) => {
        setInterval(() => {
            char.style.transform = 'translateY(-15px) rotate(3deg) scale(1.1)';
            char.style.opacity = '0.7';
            setTimeout(() => {
                char.style.transform = 'translateY(0) rotate(0deg) scale(1)';
                char.style.opacity = '0.2';
            }, 800);
        }, 8000 + index * 2000);
    });
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes inkSpreadEffect {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
        100% { transform: translate(-50%, -50%) scale(8); opacity: 0; }
    }
    
    @keyframes brushFade {
        0% { opacity: 1; transform: translateY(0) rotate(0deg); }
        100% { opacity: 0; transform: translateY(-20px) rotate(15deg); }
    }
    
    @keyframes inkRipple {
        0% { transform: scale(0); opacity: 0.6; }
        100% { transform: scale(1); opacity: 0; }
    }
    
    @keyframes brushTwirl {
        0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
        50% { opacity: 1; transform: scale(1) rotate(180deg); }
    }
    
    @keyframes inkFlow {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(2deg) scale(1.05); }
    }
`;
document.head.appendChild(style);
