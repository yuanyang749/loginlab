// 流体艺术风格特效和交互
document.addEventListener('DOMContentLoaded', function() {
    // 初始化流体效果
    initFluidEffects();
    
    // 添加表单提交处理
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // 添加验证码按钮事件
    const verificationBtns = document.querySelectorAll('.verification-btn');
    verificationBtns.forEach(btn => {
        btn.addEventListener('click', handleVerificationCode);
    });
});

// 初始化流体效果
function initFluidEffects() {
    // 初始化粒子系统
    initFluidParticleSystem();
    
    // 初始化输入框流体效果
    initInputFluidEffects();
    
    // 初始化按钮流体效果
    initButtonFluidEffects();
    
    // 初始化鼠标交互效果
    initMouseFluidInteractions();
    
    // 初始化动态背景
    initDynamicBackground();
}

// 流体粒子系统
function initFluidParticleSystem() {
    const container = document.getElementById('fluidParticles');
    if (!container) return;
    
    // 创建粒子
    function createFluidParticle() {
        const particle = document.createElement('div');
        particle.className = 'fluid-particle';
        
        // 随机位置和属性
        const startX = Math.random() * window.innerWidth;
        const drift = (Math.random() - 0.5) * 200;
        const size = Math.random() * 8 + 4;
        const duration = Math.random() * 8 + 8;
        const delay = Math.random() * 3;
        
        particle.style.left = startX + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        // 随机颜色
        const colors = [
            'rgba(102, 126, 234, 0.8)',
            'rgba(118, 75, 162, 0.8)',
            'rgba(240, 147, 251, 0.8)',
            'rgba(255, 154, 158, 0.8)',
            'rgba(255, 255, 255, 0.9)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
        
        // 添加飘移效果
        particle.style.setProperty('--drift', drift + 'px');
        
        container.appendChild(particle);
        
        // 粒子完成动画后移除
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }
    
    // 定期创建粒子
    setInterval(createFluidParticle, 800);
    
    // 初始创建一些粒子
    for (let i = 0; i < 15; i++) {
        setTimeout(createFluidParticle, i * 200);
    }
}

// 输入框流体效果
function initInputFluidEffects() {
    const inputContainers = document.querySelectorAll('.liquid-input-container');
    
    inputContainers.forEach(container => {
        const input = container.querySelector('input');
        
        input.addEventListener('focus', () => {
            createInputFluidRipple(container);
        });
        
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                createTypingBubbles(input);
            }
        });
        
        input.addEventListener('blur', () => {
            createInputFluidWave(container);
        });
    });
}

// 按钮流体效果
function initButtonFluidEffects() {
    const buttons = document.querySelectorAll('.fluid-submit-btn, .verification-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createFluidClickEffect(button, e);
        });
        
        button.addEventListener('mouseenter', () => {
            createButtonFluidAura(button);
        });
    });
}

// 鼠标流体交互
function initMouseFluidInteractions() {
    const fluidLayers = document.querySelectorAll('.fluid-layer');
    const bubbles = document.querySelectorAll('.fluid-bubble');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // 更新流体层
        fluidLayers.forEach((layer, index) => {
            const intensity = (index + 1) * 0.02;
            const offsetX = (mouseX - 0.5) * 100 * intensity;
            const offsetY = (mouseY - 0.5) * 100 * intensity;
            
            layer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + intensity})`;
        });
        
        // 更新气泡
        bubbles.forEach((bubble, index) => {
            const intensity = (index + 1) * 0.03;
            const offsetX = (mouseX - 0.5) * 50 * intensity;
            const offsetY = (mouseY - 0.5) * 50 * intensity;
            
            bubble.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + intensity * 0.5})`;
        });
        
        // 创建鼠标轨迹粒子
        if (Math.random() > 0.7) {
            createMouseTrailParticle(e.clientX, e.clientY);
        }
    });
}

// 动态背景
function initDynamicBackground() {
    const background = document.querySelector('.fluid-background');
    if (!background) return;
    
    // 动态颜色变化
    setInterval(() => {
        const hue1 = Math.random() * 60 + 220; // 蓝紫色范围
        const hue2 = Math.random() * 60 + 280; // 紫粉色范围
        const hue3 = Math.random() * 60 + 320; // 粉红色范围
        
        document.body.style.background = `linear-gradient(135deg, 
            hsl(${hue1}, 70%, 60%) 0%, 
            hsl(${hue2}, 60%, 55%) 50%, 
            hsl(${hue3}, 65%, 65%) 100%)`;
    }, 10000);
}

// 创建输入框流体涟漪
function createInputFluidRipple(container) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, 
            rgba(255, 255, 255, 0.6) 0%, 
            rgba(102, 126, 234, 0.4) 30%, 
            transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 3;
        animation: fluidRipple 1.2s ease-out;
        transform: translate(-50%, -50%);
    `;
    
    container.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 1200);
}

// 创建打字气泡
function createTypingBubbles(input) {
    const rect = input.getBoundingClientRect();
    const bubble = document.createElement('div');
    
    const x = rect.right - 30 + Math.random() * 20;
    const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 20;
    
    bubble.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, 
            rgba(255, 255, 255, 0.9) 0%, 
            rgba(102, 126, 234, 0.6) 50%, 
            transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: typingBubbleFloat 2s ease-out forwards;
    `;
    
    document.body.appendChild(bubble);
    
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
    }, 2000);
}

// 创建输入框流体波
function createInputFluidWave(container) {
    const wave = document.createElement('div');
    wave.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, 
            rgba(102, 126, 234, 0.1) 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(240, 147, 251, 0.1) 100%);
        border-radius: 15px;
        pointer-events: none;
        z-index: 1;
        animation: fluidWave 1.5s ease-out;
    `;
    
    container.appendChild(wave);
    
    setTimeout(() => {
        if (wave.parentNode) {
            wave.parentNode.removeChild(wave);
        }
    }, 1500);
}

// 创建流体点击效果
function createFluidClickEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // 主要涟漪
    const mainRipple = document.createElement('div');
    mainRipple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, 
            rgba(255, 255, 255, 0.8) 0%, 
            rgba(102, 126, 234, 0.6) 30%, 
            transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
        animation: fluidClickRipple 0.8s ease-out;
        transform: translate(-50%, -50%);
    `;
    
    button.appendChild(mainRipple);
    
    // 次要波纹
    for (let i = 0; i < 5; i++) {
        const secondaryRipple = document.createElement('div');
        const delay = i * 0.1;
        const size = Math.random() * 50 + 30;
        
        secondaryRipple.style.cssText = `
            position: absolute;
            left: ${x + (Math.random() - 0.5) * 60}px;
            top: ${y + (Math.random() - 0.5) * 60}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.4) 0%, 
                transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9;
            animation: secondaryRipple 1.2s ease-out ${delay}s;
            transform: translate(-50%, -50%);
            opacity: 0;
        `;
        
        button.appendChild(secondaryRipple);
        
        setTimeout(() => {
            if (secondaryRipple.parentNode) {
                secondaryRipple.parentNode.removeChild(secondaryRipple);
            }
        }, 1200 + delay * 1000);
    }
    
    setTimeout(() => {
        if (mainRipple.parentNode) {
            mainRipple.parentNode.removeChild(mainRipple);
        }
    }, 800);
}

// 创建按钮流体光环
function createButtonFluidAura(button) {
    const aura = document.createElement('div');
    aura.style.cssText = `
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: linear-gradient(45deg, 
            rgba(102, 126, 234, 0.3) 0%, 
            rgba(240, 147, 251, 0.3) 50%, 
            rgba(102, 126, 234, 0.3) 100%);
        border-radius: 25px;
        pointer-events: none;
        z-index: -1;
        animation: fluidAura 3s ease-in-out;
        opacity: 0;
    `;
    
    button.style.position = 'relative';
    button.appendChild(aura);
    
    setTimeout(() => {
        if (aura.parentNode) {
            aura.parentNode.removeChild(aura);
        }
    }, 3000);
}

// 创建鼠标轨迹粒子
function createMouseTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, 
            rgba(255, 255, 255, 0.8) 0%, 
            rgba(102, 126, 234, 0.6) 50%, 
            transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: trailParticle 1.5s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1500);
}

// 表单切换函数
function showLogin() {
    hideAllForms();
    document.getElementById('loginForm').style.display = 'block';
    animateFormEntrance(document.getElementById('loginForm'));
}

function showRegister() {
    hideAllForms();
    document.getElementById('registerForm').style.display = 'block';
    animateFormEntrance(document.getElementById('registerForm'));
}

function showForgotPassword() {
    hideAllForms();
    document.getElementById('forgotForm').style.display = 'block';
    animateFormEntrance(document.getElementById('forgotForm'));
}

function hideAllForms() {
    const forms = ['loginForm', 'registerForm', 'forgotForm'];
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.style.display = 'none';
        }
    });
}

// 表单入场动画
function animateFormEntrance(form) {
    const fluidCard = form.querySelector('.fluid-card');
    
    fluidCard.style.opacity = '0';
    fluidCard.style.transform = 'scale(0.8) translateY(50px)';
    
    setTimeout(() => {
        fluidCard.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        fluidCard.style.opacity = '1';
        fluidCard.style.transform = 'scale(1) translateY(0)';
        
        // 创建入场流体效果
        createFormEntranceFluid(fluidCard);
        
        setTimeout(() => {
            fluidCard.style.transition = '';
        }, 600);
    }, 50);
}

// 表单入场流体效果
function createFormEntranceFluid(card) {
    for (let i = 0; i < 8; i++) {
        const fluidDrop = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const distance = 150;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        fluidDrop.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            width: 12px;
            height: 12px;
            background: radial-gradient(circle, 
                rgba(255, 255, 255, 0.8) 0%, 
                rgba(102, 126, 234, 0.6) 50%, 
                transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 20;
            animation: entranceFluidDrop 1.5s ease-out;
            transform: translate(-50%, -50%);
        `;
        
        fluidDrop.style.setProperty('--end-x', x + 'px');
        fluidDrop.style.setProperty('--end-y', y + 'px');
        
        card.appendChild(fluidDrop);
        
        setTimeout(() => {
            if (fluidDrop.parentNode) {
                fluidDrop.parentNode.removeChild(fluidDrop);
            }
        }, 1500);
    }
}

// 表单提交处理
function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.fluid-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // 按钮加载状态
    submitBtn.disabled = true;
    btnText.textContent = '流体处理中...';
    
    // 创建处理中流体效果
    createProcessingFluidEffect(submitBtn);
    
    // 模拟提交延迟
    setTimeout(() => {
        // 重置按钮状态
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
        // 成功提示
        showFluidNotification('🌊 流体认证成功！', 'success');
    }, 2000);
}

// 验证码处理
function handleVerificationCode(e) {
    const btn = e.target;
    const originalText = btn.textContent;
    let countdown = 60;
    
    btn.disabled = true;
    
    const timer = setInterval(() => {
        btn.textContent = `${countdown}s`;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(timer);
            btn.textContent = originalText;
            btn.disabled = false;
        }
    }, 1000);
    
    // 发送验证码流体效果
    createVerificationFluidEffect(btn);
    showFluidNotification('💧 验证码已通过流体传送', 'info');
}

// 创建处理中流体效果
function createProcessingFluidEffect(button) {
    const processingDrops = [];
    
    for (let i = 0; i < 6; i++) {
        const drop = document.createElement('div');
        drop.style.cssText = `
            position: absolute;
            top: 50%;
            left: ${20 + i * 10}%;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            animation: processingDrop 1.5s ease-in-out infinite;
            animation-delay: ${i * 0.2}s;
            transform: translateY(-50%);
        `;
        
        button.appendChild(drop);
        processingDrops.push(drop);
    }
    
    setTimeout(() => {
        processingDrops.forEach(drop => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        });
    }, 2000);
}

// 创建验证码流体效果
function createVerificationFluidEffect(button) {
    const waves = [];
    for (let i = 0; i < 4; i++) {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid rgba(102, 126, 234, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            animation: verificationFluidWave 3s ease-out infinite;
            animation-delay: ${i * 0.5}s;
            transform: translate(-50%, -50%);
        `;
        
        button.appendChild(wave);
        waves.push(wave);
    }
    
    setTimeout(() => {
        waves.forEach(wave => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        });
    }, 4000);
}

// 显示流体通知
function showFluidNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 15px;
        padding: 15px 20px;
        color: white;
        font-size: 14px;
        max-width: 300px;
        backdrop-filter: blur(20px);
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    `;
    
    if (type === 'success') {
        notification.style.background = 'rgba(102, 126, 234, 0.2)';
        notification.style.borderColor = 'rgba(102, 126, 234, 0.4)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes fluidRipple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    @keyframes typingBubbleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-30px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes fluidWave {
        0% {
            opacity: 0;
            transform: scaleY(0);
        }
        50% {
            opacity: 0.8;
            transform: scaleY(1);
        }
        100% {
            opacity: 0;
            transform: scaleY(0);
        }
    }
    
    @keyframes fluidClickRipple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes secondaryRipple {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 0.6;
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
        }
    }
    
    @keyframes fluidAura {
        0%, 100% {
            opacity: 0;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
    }
    
    @keyframes trailParticle {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) translateY(-20px);
        }
    }
    
    @keyframes entranceFluidDrop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
        }
    }
    
    @keyframes processingDrop {
        0%, 100% {
            transform: translateY(-50%) scale(1);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-70%) scale(1.5);
            opacity: 1;
        }
    }
    
    @keyframes verificationFluidWave {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 150px;
            height: 150px;
            opacity: 0;
        }
    }
    
    .fluid-particle {
        animation: particleDrift 12s linear infinite;
    }
    
    @keyframes particleDrift {
        0% {
            opacity: 0;
            transform: translateY(100vh) translateX(0) scale(0);
        }
        10% {
            opacity: 1;
            transform: translateY(90vh) translateX(var(--drift, 0px)) scale(1);
        }
        90% {
            opacity: 1;
            transform: translateY(-10vh) translateX(var(--drift, 0px)) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-20vh) translateX(var(--drift, 0px)) scale(0);
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成提示
window.addEventListener('load', () => {
    console.log('🌊 流体艺术风格登录页面加载完成');
    console.log('💧 特色：动态流体背景、液体交互效果、艺术渐变');
});

// 页面可见性变化时的性能优化
document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden;
    const animations = document.querySelectorAll('.fluid-layer, .fluid-bubble, .fluid-ripple, .fluid-particle');
    
    animations.forEach(element => {
        if (isHidden) {
            element.style.animationPlayState = 'paused';
        } else {
            element.style.animationPlayState = 'running';
        }
    });
});