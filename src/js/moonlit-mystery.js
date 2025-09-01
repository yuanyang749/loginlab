// 月夜神秘风格特效和交互
document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initMoonlitEffects();
    initParticleSystem();
    
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

// 初始化月夜特效
function initMoonlitEffects() {
    // 月相变化效果
    const moon = document.querySelector('.moon');
    if (moon) {
        setInterval(() => {
            const phase = Math.sin(Date.now() / 10000) * 0.1 + 1;
            moon.style.transform = `scale(${phase})`;
        }, 100);
    }
    
    // 符文随机闪烁
    const runes = document.querySelectorAll('.rune');
    runes.forEach((rune, index) => {
        setInterval(() => {
            if (Math.random() > 0.7) {
                rune.style.animation = 'none';
                setTimeout(() => {
                    rune.style.animation = `runeGlow 3s ease-in-out infinite`;
                    rune.style.animationDelay = `${index * 0.5}s`;
                }, 50);
            }
        }, 3000 + index * 1000);
    });
    
    // 雾气互动效果
    const mistLayers = document.querySelectorAll('.mist-layer');
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        mistLayers.forEach((mist, index) => {
            const offsetX = (clientX - centerX) * (0.02 + index * 0.01);
            const offsetY = (clientY - centerY) * (0.02 + index * 0.01);
            mist.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });
}

// 粒子系统
function initParticleSystem() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    // 创建粒子
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机位置
        const startX = Math.random() * window.innerWidth;
        const drift = (Math.random() - 0.5) * 100;
        
        particle.style.left = startX + 'px';
        particle.style.animationDuration = (5 + Math.random() * 8) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // 添加飘移效果
        particle.style.setProperty('--drift', drift + 'px');
        
        container.appendChild(particle);
        
        // 粒子完成动画后移除
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 13000);
    }
    
    // 定期创建粒子
    setInterval(createParticle, 800);
    
    // 初始创建一些粒子
    for (let i = 0; i < 8; i++) {
        setTimeout(createParticle, i * 300);
    }
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
    form.style.opacity = '0';
    form.style.transform = 'scale(0.9) translateY(20px)';
    
    setTimeout(() => {
        form.style.transition = 'all 0.4s ease';
        form.style.opacity = '1';
        form.style.transform = 'scale(1) translateY(0)';
        
        setTimeout(() => {
            form.style.transition = '';
        }, 400);
    }, 50);
}

// 表单提交处理
function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    // 按钮加载状态
    submitBtn.disabled = true;
    btnText.textContent = '处理中...';
    submitBtn.style.background = 'linear-gradient(135deg, #8b45c5 0%, #6a3093 100%)';
    
    // 创建月光特效
    createMoonlightEffect(submitBtn);
    
    // 模拟提交延迟
    setTimeout(() => {
        // 重置按钮状态
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, #b58bff 0%, #8b45c5 100%)';
        
        // 成功提示
        showMysticalNotification('✨ 月光指引您前行...', 'success');
    }, 2000);
}

// 验证码处理
function handleVerificationCode(e) {
    const btn = e.target;
    const originalText = btn.textContent;
    let countdown = 60;
    
    btn.disabled = true;
    btn.style.background = 'rgba(139, 69, 197, 0.3)';
    
    const timer = setInterval(() => {
        btn.textContent = `${countdown}s`;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(timer);
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.background = 'rgba(181, 139, 255, 0.2)';
        }
    }, 1000);
    
    // 发送验证码特效
    createRuneEffect(btn);
    showMysticalNotification('🌙 验证码已通过月光传递', 'info');
}

// 月光特效
function createMoonlightEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const ray = document.createElement('div');
        ray.style.cssText = `
            position: fixed;
            top: ${centerY}px;
            left: ${centerX}px;
            width: 2px;
            height: 60px;
            background: linear-gradient(to bottom, rgba(245, 245, 245, 0.8), transparent);
            transform-origin: 50% 0%;
            transform: rotate(${i * 30}deg);
            animation: moonRay 1.5s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(ray);
        
        setTimeout(() => {
            if (ray.parentNode) {
                ray.parentNode.removeChild(ray);
            }
        }, 1500);
    }
}

// 符文特效
function createRuneEffect(element) {
    const rect = element.getBoundingClientRect();
    const symbols = ['◯', '◈', '◇', '◎', '◐', '◑'];
    
    for (let i = 0; i < 6; i++) {
        const rune = document.createElement('div');
        rune.style.cssText = `
            position: fixed;
            top: ${rect.top + rect.height / 2}px;
            left: ${rect.left + rect.width / 2}px;
            color: #b58bff;
            font-size: 20px;
            text-shadow: 0 0 15px rgba(181, 139, 255, 0.8);
            transform-origin: center;
            animation: runeSpiral 2s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        rune.textContent = symbols[i];
        rune.style.animationDelay = i * 0.2 + 's';
        
        document.body.appendChild(rune);
        
        setTimeout(() => {
            if (rune.parentNode) {
                rune.parentNode.removeChild(rune);
            }
        }, 2200);
    }
}

// 神秘通知
function showMysticalNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(20, 10, 40, 0.95);
        border: 1px solid rgba(181, 139, 255, 0.5);
        border-radius: 10px;
        padding: 15px 20px;
        color: #f0f0f0;
        font-size: 14px;
        max-width: 300px;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(181, 139, 255, 0.3);
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    if (type === 'success') {
        notification.style.borderColor = 'rgba(139, 255, 139, 0.5)';
        notification.style.boxShadow = '0 4px 20px rgba(139, 255, 139, 0.3)';
    } else if (type === 'error') {
        notification.style.borderColor = 'rgba(255, 139, 139, 0.5)';
        notification.style.boxShadow = '0 4px 20px rgba(255, 139, 139, 0.3)';
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

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes moonRay {
        0% { 
            height: 0; 
            opacity: 1; 
        }
        50% { 
            height: 60px; 
            opacity: 0.8; 
        }
        100% { 
            height: 100px; 
            opacity: 0; 
        }
    }
    
    @keyframes runeSpiral {
        0% { 
            transform: scale(0) rotate(0deg); 
            opacity: 1; 
        }
        50% { 
            transform: scale(1.2) rotate(180deg); 
            opacity: 0.8; 
        }
        100% { 
            transform: scale(0.8) rotate(360deg) translateY(-50px); 
            opacity: 0; 
        }
    }
    
    .particle {
        animation: particleFloat 8s linear infinite;
    }
    
    @keyframes particleFloat {
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

// 窗口大小变化时重新初始化粒子系统
window.addEventListener('resize', () => {
    // 清除现有粒子
    const container = document.getElementById('particles');
    if (container) {
        container.innerHTML = '';
    }
    
    // 重新初始化
    setTimeout(() => {
        initParticleSystem();
    }, 500);
});

// 页面可见性变化时的性能优化
document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden;
    const animations = document.querySelectorAll('.moon, .mist-layer, .rune, .particle');
    
    animations.forEach(element => {
        if (isHidden) {
            element.style.animationPlayState = 'paused';
        } else {
            element.style.animationPlayState = 'running';
        }
    });
});