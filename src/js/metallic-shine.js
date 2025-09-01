// 真实金属质感风格特效和交互
document.addEventListener('DOMContentLoaded', function() {
    // 初始化金属效果
    initMetallicEffects();
    
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

// 初始化金属效果
function initMetallicEffects() {
    // 初始化输入框金属反光效果
    initInputReflections();
    
    // 初始化按钮金属效果
    initButtonMetallicEffects();
    
    // 初始化背景金属动画
    initBackgroundAnimations();
    
    // 初始化鼠标交互效果
    initMouseInteractions();
}

// 输入框金属反光效果
function initInputReflections() {
    const inputFrames = document.querySelectorAll('.metal-input-frame');
    
    inputFrames.forEach(frame => {
        const input = frame.querySelector('input');
        
        input.addEventListener('focus', () => {
            createMetallicInputFlash(frame);
        });
        
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                createTypingSparkle(input);
            }
        });
    });
}

// 按钮金属效果
function initButtonMetallicEffects() {
    const buttons = document.querySelectorAll('.metal-submit-btn, .verification-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createMetallicRipple(button, e);
        });
        
        button.addEventListener('mouseenter', () => {
            createButtonGlow(button);
        });
    });
}

// 背景金属动画
function initBackgroundAnimations() {
    // 金属条纹动态亮度
    const stripes = document.querySelectorAll('.metal-stripe');
    setInterval(() => {
        stripes.forEach((stripe, index) => {
            const delay = index * 2000;
            setTimeout(() => {
                stripe.style.opacity = Math.random() * 0.5 + 0.5;
            }, delay);
        });
    }, 8000);
    
    // 金属螺栓微光效果
    const bolts = document.querySelectorAll('.metal-bolt');
    bolts.forEach((bolt, index) => {
        setInterval(() => {
            const brightness = 0.8 + Math.random() * 0.4;
            bolt.style.filter = `brightness(${brightness})`;
        }, 3000 + index * 1000);
    });
    
    // 金属网格闪烁
    const grid = document.querySelector('.metal-grid');
    if (grid) {
        setInterval(() => {
            const opacity = 0.2 + Math.random() * 0.2;
            grid.style.opacity = opacity;
        }, 5000);
    }
}

// 鼠标交互效果
function initMouseInteractions() {
    const metalPanel = document.querySelector('.metal-panel');
    if (!metalPanel) return;
    
    document.addEventListener('mousemove', (e) => {
        updateMetallicReflections(e, metalPanel);
    });
}

// 创建输入框金属闪光
function createMetallicInputFlash(frame) {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(90, 159, 212, 0.4) 30%, 
            rgba(255, 255, 255, 0.6) 50%, 
            rgba(90, 159, 212, 0.4) 70%, 
            transparent 100%);
        border-radius: 6px;
        pointer-events: none;
        z-index: 5;
        animation: metallicFlash 0.8s ease-out;
    `;
    
    frame.appendChild(flash);
    
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 800);
}

// 创建打字火花效果
function createTypingSparkle(input) {
    const sparkle = document.createElement('div');
    const rect = input.getBoundingClientRect();
    const x = rect.right - 20;
    const y = rect.top + rect.height / 2;
    
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #5a9fd4 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleFloat 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// 创建金属涟漪效果
function createMetallicRipple(button, event) {
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, 
            rgba(255, 255, 255, 0.8) 0%, 
            rgba(90, 159, 212, 0.6) 30%, 
            transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
        animation: metallicRipple 0.6s ease-out;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// 创建按钮发光效果
function createButtonGlow(button) {
    const existingGlow = button.querySelector('.button-glow');
    if (existingGlow) return;
    
    const glow = document.createElement('div');
    glow.className = 'button-glow';
    glow.style.cssText = `
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, 
            rgba(90, 159, 212, 0.3) 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(90, 159, 212, 0.3) 100%);
        border-radius: 12px;
        opacity: 0;
        pointer-events: none;
        z-index: -1;
        animation: buttonGlow 2s ease-in-out infinite;
    `;
    
    button.style.position = 'relative';
    button.appendChild(glow);
    
    setTimeout(() => {
        if (glow.parentNode) {
            glow.parentNode.removeChild(glow);
        }
    }, 3000);
}

// 更新金属反光效果
function updateMetallicReflections(event, panel) {
    const rect = panel.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // 计算反光位置
    const reflectionX = (x / rect.width) * 100;
    const reflectionY = (y / rect.height) * 100;
    
    // 更新面板反光
    panel.style.background = `
        radial-gradient(circle at ${reflectionX}% ${reflectionY}%, 
            rgba(255, 255, 255, 0.1) 0%, 
            transparent 50%), 
        linear-gradient(145deg, #353535 0%, #2a2a2a 50%, #1f1f1f 100%)
    `;
    
    // 更新输入框反光
    const inputFrames = document.querySelectorAll('.metal-input-frame');
    inputFrames.forEach(frame => {
        const frameRect = frame.getBoundingClientRect();
        const frameX = event.clientX - frameRect.left;
        const frameY = event.clientY - frameRect.top;
        
        if (frameX >= 0 && frameX <= frameRect.width && 
            frameY >= 0 && frameY <= frameRect.height) {
            const intensity = Math.max(0, 1 - Math.sqrt(
                Math.pow(frameX - frameRect.width/2, 2) + 
                Math.pow(frameY - frameRect.height/2, 2)
            ) / (frameRect.width/2));
            
            frame.style.boxShadow = `
                inset 0 2px 4px rgba(0, 0, 0, 0.3),
                inset 0 -1px 0 rgba(255, 255, 255, 0.05),
                0 0 ${intensity * 20}px rgba(90, 159, 212, ${intensity * 0.3})
            `;
        }
    });
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
    const metalFrame = form.querySelector('.metal-frame');
    
    metalFrame.style.opacity = '0';
    metalFrame.style.transform = 'scale(0.9) translateY(30px)';
    
    setTimeout(() => {
        metalFrame.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        metalFrame.style.opacity = '1';
        metalFrame.style.transform = 'scale(1) translateY(0)';
        
        // 添加入场闪光效果
        createFormEntranceFlash(metalFrame);
        
        setTimeout(() => {
            metalFrame.style.transition = '';
        }, 500);
    }, 50);
}

// 表单入场闪光
function createFormEntranceFlash(frame) {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.3) 50%, 
            transparent 100%);
        border-radius: 15px;
        pointer-events: none;
        z-index: 20;
        animation: entranceFlash 1s ease-out;
    `;
    
    frame.appendChild(flash);
    
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 1000);
}

// 表单提交处理
function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.metal-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // 按钮加载状态
    submitBtn.disabled = true;
    btnText.textContent = '处理中...';
    
    // 创建处理中的金属效果
    createProcessingEffect(submitBtn);
    
    // 模拟提交延迟
    setTimeout(() => {
        // 重置按钮状态
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
        // 成功提示
        showMetallicNotification('⚡ 操作完成！', 'success');
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
    
    // 发送验证码特效
    createVerificationEffect(btn);
    showMetallicNotification('📱 验证码已发送', 'info');
}

// 创建处理中效果
function createProcessingEffect(button) {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: absolute;
        top: 50%;
        right: 15px;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: metallicSpin 1s linear infinite;
        transform: translateY(-50%);
    `;
    
    button.style.position = 'relative';
    button.appendChild(loader);
    
    setTimeout(() => {
        if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    }, 2000);
}

// 创建验证码发送效果
function createVerificationEffect(button) {
    const waves = [];
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid rgba(90, 159, 212, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            animation: verificationWave 2s ease-out infinite;
            animation-delay: ${i * 0.3}s;
        `;
        
        button.style.position = 'relative';
        button.appendChild(wave);
        waves.push(wave);
    }
    
    setTimeout(() => {
        waves.forEach(wave => {
            if (wave.parentNode) {
                wave.parentNode.removeChild(wave);
            }
        });
    }, 3000);
}

// 显示金属通知
function showMetallicNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(145deg, #353535, #2a2a2a);
        border: 2px solid #4a4a4a;
        border-radius: 10px;
        padding: 15px 20px;
        color: #e0e0e0;
        font-size: 14px;
        max-width: 300px;
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
    `;
    
    if (type === 'success') {
        notification.style.borderColor = '#5a9fd4';
        notification.style.boxShadow += ', 0 0 20px rgba(90, 159, 212, 0.3)';
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
        }, 300);
    }, 3000);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes metallicFlash {
        0% {
            left: -100%;
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            left: 100%;
            opacity: 0;
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-20px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes metallicRipple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes buttonGlow {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
    
    @keyframes entranceFlash {
        0% {
            opacity: 0;
            transform: translateX(-100%);
        }
        30% {
            opacity: 0.8;
        }
        100% {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes metallicSpin {
        0% {
            transform: translateY(-50%) rotate(0deg);
        }
        100% {
            transform: translateY(-50%) rotate(360deg);
        }
    }
    
    @keyframes verificationWave {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
            transform: translate(-50%, -50%);
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成提示
window.addEventListener('load', () => {
    console.log('⚡ 真实金属质感风格登录页面加载完成');
    console.log('🔧 特色：真实金属材质、工业级设计、专业反光效果');
});

// 页面可见性变化时的性能优化
document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden;
    const animations = document.querySelectorAll('.metal-stripe, .metal-bolt, .metal-grid');
    
    animations.forEach(element => {
        if (isHidden) {
            element.style.animationPlayState = 'paused';
        } else {
            element.style.animationPlayState = 'running';
        }
    });
});