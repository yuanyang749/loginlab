// 极光风格登录页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 初始化极光粒子效果
    createAuroraParticles();
    
    // 绑定表单事件
    bindFormEvents();
    
    // 绑定链接事件
    bindLinkEvents();
    
    // 动态极光颜色变化
    startAuroraColorChange();
});

// 创建极光粒子效果
function createAuroraParticles() {
    const colors = ['#00ff92', '#8a2be2', '#00bfff', '#ff1493'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 5 + 5}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
            pointer-events: none;
            z-index: 1;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 10000);
    }, 300);
}

// 绑定表单事件
function bindFormEvents() {
    // 登录表单
    const loginForm = document.querySelector('#loginForm .login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin(this);
        });
    }
    
    // 注册表单
    const registerForm = document.querySelector('#registerForm .register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister(this);
        });
    }
    
    // 忘记密码表单
    const forgotForm = document.querySelector('#forgotForm .forgot-form');
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleForgotPassword(this);
        });
    }
}

// 绑定链接事件
function bindLinkEvents() {
    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            switchForm(action);
        });
    });
}

// 处理登录
function handleLogin(form) {
    const button = form.querySelector('.aurora-button');
    const originalText = button.textContent;
    
    // 模拟登录过程
    button.textContent = 'Connecting...';
    button.style.background = 'linear-gradient(135deg, #666, #999)';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Welcome to Aurora!';
        button.style.background = 'linear-gradient(135deg, #00ff92, #00bfff)';
        
        setTimeout(() => {
            showMessage('🌌 Welcome to the Aurora Realm!', 'success');
            button.textContent = originalText;
            button.style.background = 'linear-gradient(135deg, #00ff92, #8a2be2)';
            button.disabled = false;
            form.reset();
        }, 1500);
    }, 2000);
}

// 处理注册
function handleRegister(form) {
    const button = form.querySelector('.aurora-button');
    const originalText = button.textContent;
    
    // 验证密码匹配
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        showMessage('🌌 Passwords do not match!', 'error');
        return;
    }
    
    // 模拟注册过程
    button.textContent = 'Creating...';
    button.style.background = 'linear-gradient(135deg, #666, #999)';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Account Created!';
        button.style.background = 'linear-gradient(135deg, #00ff92, #00bfff)';
        
        setTimeout(() => {
            showMessage('🌌 Account created successfully!', 'success');
            switchForm('login');
        }, 1500);
    }, 2000);
}

// 处理忘记密码
function handleForgotPassword(form) {
    const button = form.querySelector('.aurora-button');
    const originalText = button.textContent;
    
    // 模拟发送过程
    button.textContent = 'Sending...';
    button.style.background = 'linear-gradient(135deg, #666, #999)';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Link Sent!';
        button.style.background = 'linear-gradient(135deg, #00ff92, #00bfff)';
        
        setTimeout(() => {
            showMessage('🌌 Reset link sent to your email!', 'success');
            switchForm('login');
        }, 1500);
    }, 2000);
}

// 切换表单
function switchForm(formType) {
    const forms = ['login', 'register', 'forgot'];
    
    forms.forEach(type => {
        const container = document.getElementById(type + 'Form');
        if (container) {
            container.style.display = type === formType ? 'block' : 'none';
        }
    });
    
    // 重置所有表单
    document.querySelectorAll('form').forEach(form => {
        form.reset();
        const button = form.querySelector('.aurora-button');
        if (button) {
            button.disabled = false;
            button.style.background = 'linear-gradient(135deg, #00ff92, #8a2be2)';
            
            // 重置按钮文本
            if (form.classList.contains('login-form')) {
                button.textContent = 'Enter the Aurora';
            } else if (form.classList.contains('register-form')) {
                button.textContent = 'Join the Aurora';
            } else if (form.classList.contains('forgot-form')) {
                button.textContent = 'Send Reset Link';
            }
        }
    });
}

// 显示消息
function showMessage(message, type) {
    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid ${type === 'success' ? '#00ff92' : '#ff1493'};
        border-radius: 15px;
        color: ${type === 'success' ? '#00ff92' : '#ff1493'};
        padding: 20px 30px;
        font-family: 'Orbitron', monospace;
        font-size: 14px;
        font-weight: 700;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: messageShow 0.3s ease-out;
        text-shadow: 0 0 10px ${type === 'success' ? 'rgba(0, 255, 146, 0.8)' : 'rgba(255, 20, 147, 0.8)'};
    `;
    
    // 添加动画样式
    if (!document.getElementById('aurora-message-style')) {
        const style = document.createElement('style');
        style.id = 'aurora-message-style';
        style.textContent = `
            @keyframes messageShow {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: scale(1);
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-10px) translateX(100px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageEl);
    
    // 3秒后移除消息
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
    }, 3000);
}

// 动态极光颜色变化
function startAuroraColorChange() {
    setInterval(() => {
        const auroraElements = document.querySelectorAll('.aurora-bg, .aurora-wave');
        auroraElements.forEach(element => {
            element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        });
    }, 5000);
}

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 添加鼠标移动效果
    document.addEventListener('mousemove', function(e) {
        const auroraWave = document.querySelector('.aurora-wave');
        if (auroraWave) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            auroraWave.style.transform = `translateX(${-100 + x * 20}%) skewX(-15deg) translateY(${y * 10}px)`;
        }
    });
});
