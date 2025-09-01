// 赛博朋克霓虹风格 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initCyberEffects();
    initFormHandlers();
    initParticleSystem();
});

// 初始化赛博朋克特效
function initCyberEffects() {
    // 创建动态数据流效果
    createDataStreams();
    
    // 创建随机闪烁效果
    createGlitchEffect();
    
    // 创建霓虹粒子
    createNeonParticles();
}

// 创建数据流效果
function createDataStreams() {
    const cyberBg = document.querySelector('.cyber-bg');
    
    // 创建多个数据流
    for (let i = 0; i < 5; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream-line';
        stream.style.cssText = `
            position: absolute;
            width: 2px;
            height: 100px;
            background: linear-gradient(to bottom, transparent, #00FFFF, transparent);
            left: ${Math.random() * 100}%;
            top: -100px;
            animation: streamFall ${3 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
            opacity: 0.7;
        `;
        cyberBg.appendChild(stream);
    }
    
    // 添加CSS动画
    if (!document.querySelector('#stream-animation')) {
        const style = document.createElement('style');
        style.id = 'stream-animation';
        style.textContent = `
            @keyframes streamFall {
                0% { top: -100px; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100vh; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// 创建故障效果
function createGlitchEffect() {
    const card = document.querySelector('.cyber-card');
    
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% 概率触发故障效果
            card.style.filter = 'hue-rotate(180deg) contrast(1.2)';
            card.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
            
            setTimeout(() => {
                card.style.filter = '';
                card.style.transform = '';
            }, 100);
        }
    }, 2000);
}

// 创建霓虹粒子系统
function createNeonParticles() {
    const particleContainer = document.querySelector('.neon-particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        const colors = ['#00FFFF', '#FF00FF', '#00FF00'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleDrift ${5 + Math.random() * 5}s ease-in-out infinite;
            opacity: 0.8;
        `;
        
        particleContainer.appendChild(particle);
        
        // 移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }
    
    // 定期创建粒子
    setInterval(createParticle, 3000);
    
    // 添加粒子动画
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes particleDrift {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
                25% { transform: translate(20px, -20px) scale(1.2); opacity: 1; }
                50% { transform: translate(-15px, 15px) scale(0.8); opacity: 0.6; }
                75% { transform: translate(25px, 10px) scale(1.1); opacity: 0.9; }
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化表单处理
function initFormHandlers() {
    // 表单切换
    window.showForm = function(formId) {
        const forms = document.querySelectorAll('.form-container');
        forms.forEach(form => {
            form.classList.add('hidden');
        });
        
        const targetForm = document.getElementById(formId);
        if (targetForm) {
            targetForm.classList.remove('hidden');
            
            // 添加出现动画
            targetForm.style.opacity = '0';
            targetForm.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                targetForm.style.transition = 'all 0.5s ease';
                targetForm.style.opacity = '1';
                targetForm.style.transform = 'translateY(0)';
            }, 50);
        }
    };
    
    // 输入框焦点效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            createInputGlow(this);
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // 输入时的特效
        input.addEventListener('input', function() {
            if (this.value) {
                createTypingEffect(this);
            }
        });
    });
    
    // 按钮点击效果
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createClickRipple(e, this);
        });
    });
    
    // 表单提交处理
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    });
}

// 创建输入框发光效果
function createInputGlow(input) {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 2px solid #00FFFF;
        border-radius: 4px;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        pointer-events: none;
        animation: inputGlowPulse 2s ease-in-out infinite;
    `;
    
    input.parentElement.appendChild(glow);
    
    setTimeout(() => {
        if (glow.parentNode) {
            glow.parentNode.removeChild(glow);
        }
    }, 2000);
    
    // 添加发光动画
    if (!document.querySelector('#input-glow-animation')) {
        const style = document.createElement('style');
        style.id = 'input-glow-animation';
        style.textContent = `
            @keyframes inputGlowPulse {
                0%, 100% { opacity: 0.5; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 创建打字效果
function createTypingEffect(input) {
    const rect = input.getBoundingClientRect();
    const spark = document.createElement('div');
    
    spark.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: #00FFFF;
        border-radius: 50%;
        left: ${rect.right - 10}px;
        top: ${rect.top + rect.height / 2}px;
        box-shadow: 0 0 10px #00FFFF;
        animation: sparkFade 0.5s ease-out forwards;
        pointer-events: none;
        z-index: 1000;
    `;
    
    document.body.appendChild(spark);
    
    setTimeout(() => {
        if (spark.parentNode) {
            spark.parentNode.removeChild(spark);
        }
    }, 500);
    
    // 添加火花动画
    if (!document.querySelector('#spark-animation')) {
        const style = document.createElement('style');
        style.id = 'spark-animation';
        style.textContent = `
            @keyframes sparkFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(2) translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 创建点击波纹效果
function createClickRipple(e, button) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
    
    // 添加波纹动画
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes rippleEffect {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// 处理表单提交
function handleFormSubmit(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // 按钮加载状态
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    submitBtn.querySelector('.btn-text').textContent = '处理中...';
    submitBtn.disabled = true;
    
    // 模拟提交过程
    setTimeout(() => {
        submitBtn.querySelector('.btn-text').textContent = originalText;
        submitBtn.disabled = false;
        
        // 显示成功效果
        showSuccessEffect();
    }, 2000);
}

// 显示成功效果
function showSuccessEffect() {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 255, 0, 0.9);
        color: #000;
        padding: 20px 40px;
        border-radius: 8px;
        font-size: 18px;
        font-weight: bold;
        z-index: 10000;
        animation: successPop 2s ease-out forwards;
        box-shadow: 0 0 30px rgba(0, 255, 0, 0.8);
    `;
    effect.textContent = '操作成功！';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 2000);
    
    // 添加成功动画
    if (!document.querySelector('#success-animation')) {
        const style = document.createElement('style');
        style.id = 'success-animation';
        style.textContent = `
            @keyframes successPop {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化粒子系统
function initParticleSystem() {
    // 鼠标移动时创建粒子轨迹
    document.addEventListener('mousemove', function(e) {
        if (Math.random() < 0.1) { // 10% 概率创建粒子
            createMouseParticle(e.clientX, e.clientY);
        }
    });
}

// 创建鼠标粒子
function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    const colors = ['#00FFFF', '#FF00FF', '#00FF00'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: ${color};
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        box-shadow: 0 0 6px ${color};
        pointer-events: none;
        z-index: 999;
        animation: mouseParticleFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
    
    // 添加鼠标粒子动画
    if (!document.querySelector('#mouse-particle-animation')) {
        const style = document.createElement('style');
        style.id = 'mouse-particle-animation';
        style.textContent = `
            @keyframes mouseParticleFade {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
}
