// 日落余晖风格特效和交互
document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initSunsetEffects();
    
    // 添加表单提交处理
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
});

// 初始化日落特效
function initSunsetEffects() {
    // 添加太阳光晕效果
    const sun = document.querySelector('.sun');
    if (sun) {
        setInterval(() => {
            const randomScale = 0.9 + Math.random() * 0.2;
            sun.style.transform = `scale(${randomScale})`;
        }, 3000);
    }
    
    // 添加云朵随机飘动
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((cloud, index) => {
        cloud.style.animationDuration = `${20 + index * 5}s`;
        cloud.style.animationDelay = `${index * 2}s`;
    });
    
    // 鸟儿飞行音效（可选）
    const birds = document.querySelectorAll('.bird');
    birds.forEach(bird => {
        bird.addEventListener('animationiteration', () => {
            // 每次动画循环时可以添加音效
            console.log('Bird flying...');
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
    
    // 创建日落光晕效果
    createSunsetBurst(submitBtn);
    
    // 模拟API调用
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        if (formType === 'login') {
            showMessage('登录成功！欢迎回到美好的一天', 'success');
        } else if (formType === 'register') {
            showMessage('注册成功！开始您的美好旅程', 'success');
        } else {
            showMessage('密码重置链接已发送', 'success');
        }
    }, 2000);
}

// 创建日落爆发效果
function createSunsetBurst(element) {
    const burst = document.createElement('div');
    burst.className = 'sunset-burst';
    burst.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,99,72,0.8), transparent);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.appendChild(burst);
    
    // 动画效果
    burst.animate([
        { width: '0', height: '0', opacity: 1 },
        { width: '300px', height: '300px', opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    }).onfinish = () => burst.remove();
}

// 显示消息提示
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        background: linear-gradient(135deg, #ff6348, #ffa502);
        color: white;
        border-radius: 30px;
        box-shadow: 0 10px 30px rgba(255,99,72,0.4);
        z-index: 10000;
        animation: slideDown 0.5s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.5s ease-out';
        setTimeout(() => messageDiv.remove(), 500);
    }, 3000);
}

// 添加输入框焦点效果
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
        // 添加日落色光晕
        this.parentElement.style.filter = 'drop-shadow(0 4px 10px rgba(255,99,72,0.3))';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.filter = '';
    });
});

// 添加按钮悬停音效
document.querySelectorAll('.submit-btn, .social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        
        // 创建光晕效果
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle, rgba(255,165,2,0.3), transparent);
            pointer-events: none;
            animation: pulse 0.5s ease-out;
        `;
        this.appendChild(glow);
        setTimeout(() => glow.remove(), 500);
    });
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translate(-50%, -100px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -100px); opacity: 0; }
    }
    
    @keyframes pulse {
        from { transform: scale(0.8); opacity: 1; }
        to { transform: scale(1.2); opacity: 0; }
    }
    
    .loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .loading .btn-text {
        animation: pulse 1s ease-in-out infinite;
    }
`;
document.head.appendChild(style);
