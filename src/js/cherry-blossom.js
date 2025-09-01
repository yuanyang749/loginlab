// 樱花飘落风格特效和交互
document.addEventListener('DOMContentLoaded', function() {
    // 初始化樱花效果
    initSakuraEffects();
    
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

// 初始化樱花效果
function initSakuraEffects() {
    // 初始化飘落的花瓣
    initFallingPetals();
    
    // 初始化输入框樱花效果
    initInputSakuraEffects();
    
    // 初始化按钮樱花效果
    initButtonSakuraEffects();
    
    // 初始化鼠标交互效果
    initMouseSakuraInteractions();
    
    // 初始化动态背景
    initDynamicBackground();
}

// 飘落的花瓣系统
function initFallingPetals() {
    const container = document.getElementById('fallingPetals');
    if (!container) return;
    
    // 创建飘落花瓣
    function createFallingPetal() {
        const petal = document.createElement('div');
        petal.className = 'falling-petal';
        
        // 花瓣样式
        const petalTypes = ['🌸', '🌺', '🌷', '💮'];
        const petalType = petalTypes[Math.floor(Math.random() * petalTypes.length)];
        petal.textContent = petalType;
        
        // 随机位置和属性
        const startX = Math.random() * window.innerWidth;
        const drift = (Math.random() - 0.5) * 100;
        const size = Math.random() * 0.5 + 0.8;
        const duration = Math.random() * 3 + 5;
        const delay = Math.random() * 2;
        
        petal.style.left = startX + 'px';
        petal.style.fontSize = (16 * size) + 'px';
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = delay + 's';
        
        // 添加飘移效果
        petal.style.setProperty('--drift', drift + 'px');
        
        container.appendChild(petal);
        
        // 花瓣完成动画后移除
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, (duration + delay) * 1000);
    }
    
    // 定期创建花瓣
    setInterval(createFallingPetal, 1500);
    
    // 初始创建一些花瓣
    for (let i = 0; i < 10; i++) {
        setTimeout(createFallingPetal, i * 300);
    }
}

// 输入框樱花效果
function initInputSakuraEffects() {
    const inputContainers = document.querySelectorAll('.bamboo-input-container');
    
    inputContainers.forEach(container => {
        const input = container.querySelector('input');
        
        input.addEventListener('focus', () => {
            createInputSakuraBloom(container);
        });
        
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                createTypingSakuraPetals(input);
            }
        });
        
        input.addEventListener('blur', () => {
            createInputSakuraWave(container);
        });
    });
}

// 按钮樱花效果
function initButtonSakuraEffects() {
    const buttons = document.querySelectorAll('.sakura-submit-btn, .verification-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createSakuraClickEffect(button, e);
        });
        
        button.addEventListener('mouseenter', () => {
            createButtonSakuraAura(button);
        });
    });
}

// 鼠标樱花交互
function initMouseSakuraInteractions() {
    const branches = document.querySelectorAll('.sakura-branch');
    const lanterns = document.querySelectorAll('.paper-lantern');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // 更新樱花分支
        branches.forEach((branch, index) => {
            const intensity = (index + 1) * 0.01;
            const offsetX = (mouseX - 0.5) * 20 * intensity;
            const offsetY = (mouseY - 0.5) * 20 * intensity;
            
            branch.style.transform += ` translate(${offsetX}px, ${offsetY}px)`;
        });
        
        // 更新纸灯笼
        lanterns.forEach((lantern, index) => {
            const intensity = (index + 1) * 0.02;
            const offsetX = (mouseX - 0.5) * 15 * intensity;
            const offsetY = (mouseY - 0.5) * 15 * intensity;
            
            lantern.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
        
        // 创建鼠标轨迹花瓣
        if (Math.random() > 0.85) {
            createMouseTrailPetal(e.clientX, e.clientY);
        }
    });
}

// 动态背景
function initDynamicBackground() {
    const background = document.querySelector('.sakura-background');
    if (!background) return;
    
    // 动态颜色变化
    setInterval(() => {
        const hue1 = Math.random() * 30 + 45; // 温暖的橙黄色范围
        const hue2 = Math.random() * 40 + 300; // 粉紫色范围
        const hue3 = Math.random() * 20 + 80; // 浅绿色范围
        
        document.body.style.background = `linear-gradient(135deg, 
            hsl(${hue1}, 60%, 92%) 0%, 
            hsl(${hue2}, 50%, 90%) 30%, 
            hsl(200, 20%, 95%) 70%, 
            hsl(${hue3}, 40%, 92%) 100%)`;
    }, 15000);
}

// 创建输入框樱花绽放
function createInputSakuraBloom(container) {
    const bloom = document.createElement('div');
    bloom.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, 
            rgba(236, 72, 153, 0.6) 0%, 
            rgba(251, 191, 36, 0.4) 30%, 
            transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 3;
        animation: sakuraBloom 1s ease-out;
        transform: translate(-50%, -50%);
    `;
    
    container.appendChild(bloom);
    
    setTimeout(() => {
        if (bloom.parentNode) {
            bloom.parentNode.removeChild(bloom);
        }
    }, 1000);
}

// 创建打字樱花花瓣
function createTypingSakuraPetals(input) {
    const rect = input.getBoundingClientRect();
    const petal = document.createElement('div');
    
    const x = rect.right - 30 + Math.random() * 20;
    const y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 20;
    
    petal.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 12px;
        color: #f8bbd9;
        pointer-events: none;
        z-index: 1000;
        animation: typingPetalFloat 2s ease-out forwards;
    `;
    
    const petalTypes = ['🌸', '🌺'];
    petal.textContent = petalTypes[Math.floor(Math.random() * petalTypes.length)];
    
    document.body.appendChild(petal);
    
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 2000);
}

// 创建输入框樱花波浪
function createInputSakuraWave(container) {
    const wave = document.createElement('div');
    wave.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, 
            rgba(236, 72, 153, 0.1) 0%, 
            rgba(251, 191, 36, 0.2) 50%, 
            rgba(167, 139, 250, 0.1) 100%);
        border-radius: 12px;
        pointer-events: none;
        z-index: 1;
        animation: sakuraWave 1.2s ease-out;
    `;
    
    container.appendChild(wave);
    
    setTimeout(() => {
        if (wave.parentNode) {
            wave.parentNode.removeChild(wave);
        }
    }, 1200);
}

// 创建樱花点击效果
function createSakuraClickEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // 主要樱花绽放
    const mainBloom = document.createElement('div');
    mainBloom.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, 
            rgba(255, 255, 255, 0.8) 0%, 
            rgba(236, 72, 153, 0.6) 30%, 
            transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
        animation: sakuraClickBloom 0.8s ease-out;
        transform: translate(-50%, -50%);
    `;
    
    button.appendChild(mainBloom);
    
    // 次要花瓣飞散
    for (let i = 0; i < 6; i++) {
        const petal = document.createElement('div');
        const angle = (i / 6) * Math.PI * 2;
        const distance = Math.random() * 80 + 40;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        petal.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            font-size: 14px;
            color: #f8bbd9;
            pointer-events: none;
            z-index: 9;
            animation: petalScatter 1.5s ease-out ${i * 0.1}s;
            transform: translate(-50%, -50%);
        `;
        
        petal.textContent = '🌸';
        petal.style.setProperty('--end-x', endX + 'px');
        petal.style.setProperty('--end-y', endY + 'px');
        
        button.appendChild(petal);
        
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, 1500 + i * 100);
    }
    
    setTimeout(() => {
        if (mainBloom.parentNode) {
            mainBloom.parentNode.removeChild(mainBloom);
        }
    }, 800);
}

// 创建按钮樱花光环
function createButtonSakuraAura(button) {
    const aura = document.createElement('div');
    aura.style.cssText = `
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: linear-gradient(45deg, 
            rgba(236, 72, 153, 0.3) 0%, 
            rgba(251, 191, 36, 0.3) 50%, 
            rgba(167, 139, 250, 0.3) 100%);
        border-radius: 22px;
        pointer-events: none;
        z-index: -1;
        animation: sakuraAura 3s ease-in-out;
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

// 创建鼠标轨迹花瓣
function createMouseTrailPetal(x, y) {
    const petal = document.createElement('div');
    petal.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 12px;
        color: #f8bbd9;
        pointer-events: none;
        z-index: 1000;
        animation: trailPetal 2s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    
    const petalTypes = ['🌸', '🌺', '💮'];
    petal.textContent = petalTypes[Math.floor(Math.random() * petalTypes.length)];
    
    document.body.appendChild(petal);
    
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 2000);
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
    const japaneseCard = form.querySelector('.japanese-card');
    
    japaneseCard.style.opacity = '0';
    japaneseCard.style.transform = 'scale(0.9) translateY(40px)';
    
    setTimeout(() => {
        japaneseCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        japaneseCard.style.opacity = '1';
        japaneseCard.style.transform = 'scale(1) translateY(0)';
        
        // 创建入场樱花效果
        createFormEntranceSakura(japaneseCard);
        
        setTimeout(() => {
            japaneseCard.style.transition = '';
        }, 800);
    }, 50);
}

// 表单入场樱花效果
function createFormEntranceSakura(card) {
    for (let i = 0; i < 12; i++) {
        const sakuraPetal = document.createElement('div');
        const angle = (i / 12) * Math.PI * 2;
        const distance = 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        sakuraPetal.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            font-size: 16px;
            color: #f8bbd9;
            pointer-events: none;
            z-index: 20;
            animation: entranceSakuraPetal 2s ease-out;
            transform: translate(-50%, -50%);
        `;
        
        sakuraPetal.textContent = i % 2 === 0 ? '🌸' : '🌺';
        sakuraPetal.style.setProperty('--end-x', x + 'px');
        sakuraPetal.style.setProperty('--end-y', y + 'px');
        
        card.appendChild(sakuraPetal);
        
        setTimeout(() => {
            if (sakuraPetal.parentNode) {
                sakuraPetal.parentNode.removeChild(sakuraPetal);
            }
        }, 2000);
    }
}

// 表单提交处理
function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.sakura-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // 按钮加载状态
    submitBtn.disabled = true;
    btnText.textContent = '樱花绽放中...';
    
    // 创建处理中樱花效果
    createProcessingSakuraEffect(submitBtn);
    
    // 模拟提交延迟
    setTimeout(() => {
        // 重置按钮状态
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        
        // 成功提示
        showSakuraNotification('🌸 樱花认证成功！', 'success');
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
    
    // 发送验证码樱花效果
    createVerificationSakuraEffect(btn);
    showSakuraNotification('🌸 验证码已随樱花飞至', 'info');
}

// 创建处理中樱花效果
function createProcessingSakuraEffect(button) {
    const processingPetals = [];
    
    for (let i = 0; i < 5; i++) {
        const petal = document.createElement('div');
        petal.style.cssText = `
            position: absolute;
            top: 50%;
            left: ${15 + i * 15}%;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            pointer-events: none;
            z-index: 10;
            animation: processingSakura 1.5s ease-in-out infinite;
            animation-delay: ${i * 0.3}s;
            transform: translateY(-50%);
        `;
        
        petal.textContent = '🌸';
        button.appendChild(petal);
        processingPetals.push(petal);
    }
    
    setTimeout(() => {
        processingPetals.forEach(petal => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        });
    }, 2000);
}

// 创建验证码樱花效果
function createVerificationSakuraEffect(button) {
    const waves = [];
    for (let i = 0; i < 4; i++) {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid rgba(236, 72, 153, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            animation: verificationSakuraWave 3s ease-out infinite;
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

// 显示樱花通知
function showSakuraNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(254, 249, 243, 0.95);
        border: 2px solid rgba(251, 191, 36, 0.4);
        border-radius: 15px;
        padding: 15px 20px;
        color: #92400e;
        font-size: 14px;
        max-width: 300px;
        backdrop-filter: blur(20px);
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        box-shadow: 0 8px 25px rgba(251, 191, 36, 0.15);
    `;
    
    if (type === 'success') {
        notification.style.background = 'rgba(236, 72, 153, 0.1)';
        notification.style.borderColor = 'rgba(236, 72, 153, 0.4)';
        notification.style.color = '#be185d';
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
    @keyframes sakuraBloom {
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
    
    @keyframes typingPetalFloat {
        0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-30px) scale(0) rotate(180deg);
            opacity: 0;
        }
    }
    
    @keyframes sakuraWave {
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
    
    @keyframes sakuraClickBloom {
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
    
    @keyframes petalScatter {
        0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes sakuraAura {
        0%, 100% {
            opacity: 0;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
    }
    
    @keyframes trailPetal {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) translateY(-20px) rotate(180deg);
        }
    }
    
    @keyframes entranceSakuraPetal {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
        }
        30% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2) rotate(90deg);
        }
        100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0) rotate(270deg);
        }
    }
    
    @keyframes processingSakura {
        0%, 100% {
            transform: translateY(-50%) scale(1) rotate(0deg);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-70%) scale(1.2) rotate(180deg);
            opacity: 1;
        }
    }
    
    @keyframes verificationSakuraWave {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 120px;
            height: 120px;
            opacity: 0;
        }
    }
    
    .falling-petal {
        animation: petalFall 8s linear infinite;
    }
    
    @keyframes petalFall {
        0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) translateX(var(--drift, 0px)) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成提示
window.addEventListener('load', () => {
    console.log('🌸 樱花飘落风格登录页面加载完成');
    console.log('🌺 特色：日式美学、樱花动效、禅意设计');
});

// 页面可见性变化时的性能优化
document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden;
    const animations = document.querySelectorAll('.falling-petal, .sakura-flower, .paper-lantern');
    
    animations.forEach(element => {
        if (isHidden) {
            element.style.animationPlayState = 'paused';
        } else {
            element.style.animationPlayState = 'running';
        }
    });
});