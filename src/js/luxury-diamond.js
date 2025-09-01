// 奢华钻石风格特效和交互
document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initLuxuryEffects();
    
    // 添加表单提交处理
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
});

// 初始化奢华特效
function initLuxuryEffects() {
    // 钻石闪烁效果
    createDiamondSparkles();
    
    // 金线流动效果
    animateGoldLines();
    
    // VIP徽章动画
    animateLuxuryBadge();
}

// 创建钻石闪烁
function createDiamondSparkles() {
    const diamonds = document.querySelectorAll('.diamond');
    diamonds.forEach(diamond => {
        setInterval(() => {
            // 随机闪烁
            diamond.style.filter = `drop-shadow(0 0 ${Math.random() * 20 + 10}px rgba(212, 175, 55, ${Math.random() * 0.5 + 0.5}))`;
        }, 2000);
    });
}

// 金线流动动画
function animateGoldLines() {
    setInterval(() => {
        const background = document.querySelector('.background');
        const goldParticle = document.createElement('div');
        goldParticle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #d4af37;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 10px #d4af37;
            pointer-events: none;
        `;
        
        background.appendChild(goldParticle);
        
        goldParticle.animate([
            { transform: 'scale(0)', opacity: 0 },
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(0)', opacity: 0 }
        ], {
            duration: 3000,
            easing: 'ease-in-out'
        }).onfinish = () => goldParticle.remove();
    }, 500);
}

// VIP徽章动画
function animateLuxuryBadge() {
    const badges = document.querySelectorAll('.luxury-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.animate([
                { transform: 'translateX(-50%) rotate(0deg) scale(1)' },
                { transform: 'translateX(-50%) rotate(360deg) scale(1.2)' },
                { transform: 'translateX(-50%) rotate(360deg) scale(1)' }
            ], {
                duration: 600,
                easing: 'ease-in-out'
            });
        });
    });
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formType = e.target.closest('.login-form') ? 'login' : 
                    e.target.closest('.register-form') ? 'register' : 'forgot';
    
    // 添加提交动画
    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    
    // 创建钻石爆发效果
    createDiamondBurst(submitBtn);
    
    // 模拟API调用
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        if (formType === 'login') {
            showLuxuryMessage('尊贵会员，欢迎回来', 'success');
        } else if (formType === 'register') {
            showLuxuryMessage('恭喜您成为尊贵会员', 'success');
        } else {
            showLuxuryMessage('密码重置邮件已发送至您的邮箱', 'success');
        }
    }, 2000);
}

// 创建钻石爆发效果
function createDiamondBurst(element) {
    const rect = element.getBoundingClientRect();
    const particles = ['💎', '✨', '⭐'];
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: ${15 + Math.random() * 10}px;
            pointer-events: none;
            z-index: 10000;
            filter: drop-shadow(0 0 5px #d4af37);
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 12;
        const distance = 80 + Math.random() * 40;
        
        particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0) rotate(720deg)`,
                opacity: 0 
            }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// 显示奢华消息提示
function showLuxuryMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `luxury-message ${type}`;
    messageDiv.innerHTML = `
        <span style="color: #d4af37; margin-right: 10px;">👑</span>
        ${message}
        <span style="color: #d4af37; margin-left: 10px;">👑</span>
    `;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        padding: 20px 40px;
        background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
        color: #d4af37;
        border: 2px solid #d4af37;
        font-size: 14px;
        letter-spacing: 2px;
        text-transform: uppercase;
        box-shadow: 0 10px 40px rgba(212, 175, 55, 0.4);
        z-index: 10000;
        animation: luxurySlideIn 0.5s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    // 添加闪光效果
    const shimmer = document.createElement('div');
    shimmer.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
        animation: shimmerMove 2s linear infinite;
    `;
    messageDiv.appendChild(shimmer);
    
    setTimeout(() => {
        messageDiv.style.animation = 'luxurySlideOut 0.5s ease-out';
        setTimeout(() => messageDiv.remove(), 500);
    }, 3500);
}

// 添加输入框焦点效果
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
        // 添加金色光晕
        const glow = document.createElement('div');
        glow.className = 'input-glow';
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            border-bottom: 2px solid #d4af37;
            box-shadow: 0 2px 10px rgba(212, 175, 55, 0.5);
        `;
        this.parentElement.appendChild(glow);
    });
    
    input.addEventListener('blur', function() {
        const glow = this.parentElement.querySelector('.input-glow');
        if (glow) {
            glow.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => glow.remove(), 300);
        }
    });
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes luxurySlideIn {
        from { 
            transform: translate(-50%, -100px) scale(0.8); 
            opacity: 0; 
        }
        to { 
            transform: translate(-50%, 0) scale(1); 
            opacity: 1; 
        }
    }
    
    @keyframes luxurySlideOut {
        from { 
            transform: translate(-50%, 0) scale(1); 
            opacity: 1; 
        }
        to { 
            transform: translate(-50%, -100px) scale(0.8); 
            opacity: 0; 
        }
    }
    
    @keyframes shimmerMove {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .loading {
        pointer-events: none;
        opacity: 0.8;
    }
    
    .loading .btn-text {
        animation: goldPulse 1s ease-in-out infinite;
    }
    
    @keyframes goldPulse {
        0%, 100% { color: #d4af37; }
        50% { color: #f4e5c2; }
    }
`;
document.head.appendChild(style);
