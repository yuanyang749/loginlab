// 像素复古风格登录页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子效果
    createPixelParticles();
    
    // 绑定表单事件
    bindFormEvents();
    
    // 绑定链接事件
    bindLinkEvents();
    
    // 键盘音效反馈
    bindKeyboardEffects();
});

// 创建像素粒子效果
function createPixelParticles() {
    const colors = ['#00ff00', '#ffcd3c', '#ff6b35', '#f7931e'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'pixel-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 3000);
    }, 500);
}

// 8位音效视觉反馈
function createSoundWave() {
    const soundWave = document.getElementById('soundWave');
    if (soundWave) {
        soundWave.style.opacity = '1';
        soundWave.style.animation = 'soundWave 1s ease-out';
        
        setTimeout(() => {
            soundWave.style.opacity = '0';
        }, 1000);
    }
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
            createSoundWave();
        });
    });
}

// 绑定键盘效果
function bindKeyboardEffects() {
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('form-input')) {
            e.target.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
            setTimeout(() => {
                e.target.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)';
            }, 100);
        }
    });
}

// 处理登录
function handleLogin(form) {
    createSoundWave();
    
    const button = form.querySelector('.pixel-button');
    const originalText = button.textContent;
    
    // 模拟登录过程
    button.textContent = 'LOADING...';
    button.style.background = 'linear-gradient(45deg, #666, #999)';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'SUCCESS!';
        button.style.background = 'linear-gradient(45deg, #00ff00, #32cd32)';
        
        setTimeout(() => {
            showMessage('🎮 Welcome to the Pixel World!', 'success');
            button.textContent = originalText;
            button.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
            button.disabled = false;
            form.reset();
        }, 1000);
    }, 2000);
}

// 处理注册
function handleRegister(form) {
    createSoundWave();
    
    const button = form.querySelector('.pixel-button');
    const originalText = button.textContent;
    
    // 验证密码匹配
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    
    if (password !== confirmPassword) {
        showMessage('🎮 Passwords do not match!', 'error');
        return;
    }
    
    // 模拟注册过程
    button.textContent = 'CREATING...';
    button.style.background = 'linear-gradient(45deg, #666, #999)';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'CREATED!';
        button.style.background = 'linear-gradient(45deg, #00ff00, #32cd32)';
        
        setTimeout(() => {
            showMessage('🎮 Player created successfully!', 'success');
            switchForm('login');
        }, 1000);
    }, 2000);
}

// 处理忘记密码
function handleForgotPassword(form) {
    createSoundWave();
    
    const button = form.querySelector('.pixel-button');
    const originalText = button.textContent;
    
    // 模拟发送过程
    button.textContent = 'SENDING...';
    button.style.background = 'linear-gradient(45deg, #666, #999)';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'SENT!';
        button.style.background = 'linear-gradient(45deg, #00ff00, #32cd32)';
        
        setTimeout(() => {
            showMessage('🎮 Reset code sent to your email!', 'success');
            switchForm('login');
        }, 1000);
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
        const button = form.querySelector('.pixel-button');
        if (button) {
            button.disabled = false;
            button.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
            
            // 重置按钮文本
            if (form.classList.contains('login-form')) {
                button.textContent = 'START GAME';
            } else if (form.classList.contains('register-form')) {
                button.textContent = 'CREATE PLAYER';
            } else if (form.classList.contains('forgot-form')) {
                button.textContent = 'SEND CODE';
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
        background: ${type === 'success' ? '#00ff00' : '#ff0000'};
        color: #000;
        padding: 20px;
        border: 3px solid #000;
        font-family: 'Press Start 2P', monospace;
        font-size: 10px;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        animation: messageShow 0.3s ease-out;
    `;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes messageShow {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageEl);
    
    // 3秒后移除消息
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.remove();
        }
        if (style.parentNode) {
            style.remove();
        }
    }, 3000);
}

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 预加载音效反馈
    createSoundWave();
    setTimeout(() => {
        const soundWave = document.getElementById('soundWave');
        if (soundWave) {
            soundWave.style.opacity = '0';
        }
    }, 100);
});
