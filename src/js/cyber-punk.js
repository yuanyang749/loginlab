// 赛博朋克风格特效和交互
document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initCyberEffects();
    
    // 添加表单提交处理
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // 初始化故障效果
    initGlitchEffects();
});

// 初始化赛博特效
function initCyberEffects() {
    // 创建矩阵雨效果
    createMatrixRain();
    
    // 扫描线效果
    createScanLines();
    
    // 霓虹闪烁
    animateNeonLights();
}

// 创建矩阵雨效果
function createMatrixRain() {
    const background = document.querySelector('.background');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 10; i++) {
        const stream = document.createElement('div');
        stream.className = 'matrix-stream';
        stream.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: -100px;
            color: #00ff00;
            font-family: monospace;
            font-size: 12px;
            writing-mode: vertical-rl;
            text-orientation: upright;
            pointer-events: none;
            opacity: 0.8;
        `;
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '\n';
        }
        stream.textContent = text;
        
        background.appendChild(stream);
        
        stream.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(100vh)', opacity: 0 }
        ], {
            duration: 5000 + Math.random() * 5000,
            iterations: Infinity,
            delay: Math.random() * 5000
        });
    }
}

// 创建扫描线
function createScanLines() {
    const container = document.querySelector('.container');
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    scanLine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ffff, transparent);
        pointer-events: none;
        z-index: 100;
    `;
    
    container.appendChild(scanLine);
    
    scanLine.animate([
        { top: '0%' },
        { top: '100%' }
    ], {
        duration: 8000,
        iterations: Infinity,
        easing: 'linear'
    });
}

// 霓虹灯闪烁
function animateNeonLights() {
    const neonElements = document.querySelectorAll('.neon-text, .form-title');
    neonElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                element.style.animation = 'neonFlicker 0.2s';
                setTimeout(() => {
                    element.style.animation = '';
                }, 200);
            }
        }, 1000);
    });
}

// 初始化故障效果
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        setInterval(() => {
            if (Math.random() > 0.9) {
                element.classList.add('glitching');
                setTimeout(() => {
                    element.classList.remove('glitching');
                }, 200);
            }
        }, 2000);
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
    
    // 创建赛博爆发效果
    createCyberBurst(submitBtn);
    
    // 添加故障效果
    glitchScreen();
    
    // 模拟API调用
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        if (formType === 'login') {
            showCyberMessage('[系统] 身份验证成功 - 欢迎回来', 'success');
        } else if (formType === 'register') {
            showCyberMessage('[系统] 新身份创建成功 - ID已激活', 'success');
        } else {
            showCyberMessage('[系统] 密码重置协议已启动', 'success');
        }
    }, 2000);
}

// 创建赛博爆发效果
function createCyberBurst(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#ff00ff', '#00ffff', '#ffff00'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: ${Math.random() * 20 + 5}px;
            height: 2px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 10px currentColor;
        `;
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        
        particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// 屏幕故障效果
function glitchScreen() {
    const glitchOverlay = document.createElement('div');
    glitchOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
    `;
    
    // 创建RGB分离效果
    const colors = ['#ff00ff', '#00ffff', '#ffff00'];
    for (let i = 0; i < 3; i++) {
        const bar = document.createElement('div');
        bar.style.cssText = `
            position: absolute;
            left: 0;
            right: 0;
            height: ${Math.random() * 100}px;
            top: ${Math.random() * 100}%;
            background: ${colors[i]};
            opacity: 0.1;
        `;
        glitchOverlay.appendChild(bar);
    }
    
    document.body.appendChild(glitchOverlay);
    
    glitchOverlay.animate([
        { transform: 'translateX(0) scaleY(1)', opacity: 1 },
        { transform: 'translateX(-5px) scaleY(1.1)', opacity: 0.8 },
        { transform: 'translateX(5px) scaleY(0.9)', opacity: 0.8 },
        { transform: 'translateX(0) scaleY(1)', opacity: 0 }
    ], {
        duration: 300,
        easing: 'steps(4)'
    }).onfinish = () => glitchOverlay.remove();
}

// 显示赛博消息
function showCyberMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `cyber-message ${type}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        background: rgba(10, 0, 20, 0.95);
        color: #00ff00;
        border: 2px solid #00ffff;
        font-family: 'Orbitron', monospace;
        font-size: 12px;
        letter-spacing: 1px;
        text-transform: uppercase;
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        z-index: 10000;
        clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    `;
    
    // 添加打字机效果
    const text = message;
    messageDiv.textContent = '';
    document.body.appendChild(messageDiv);
    
    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            messageDiv.textContent += text[index];
            index++;
        } else {
            clearInterval(typeInterval);
            
            // 添加闪烁光标
            const cursor = document.createElement('span');
            cursor.textContent = '_';
            cursor.style.animation = 'blink 1s steps(2) infinite';
            messageDiv.appendChild(cursor);
            
            setTimeout(() => {
                messageDiv.style.animation = 'cyberFadeOut 0.5s ease-out';
                setTimeout(() => messageDiv.remove(), 500);
            }, 3000);
        }
    }, 50);
}

// 添加输入框焦点效果
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
        // 添加霓虹光晕
        this.style.textShadow = '0 0 10px #00ffff';
        
        // 创建输入扫描效果
        const scanEffect = document.createElement('div');
        scanEffect.className = 'input-scan';
        scanEffect.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #ff00ff, #00ffff, transparent);
            box-shadow: 0 0 10px #00ffff;
        `;
        this.parentElement.appendChild(scanEffect);
        
        scanEffect.animate([
            { width: '0' },
            { width: '100%' }
        ], {
            duration: 500,
            fill: 'forwards'
        });
    });
    
    input.addEventListener('blur', function() {
        this.style.textShadow = '';
        const scan = this.parentElement.querySelector('.input-scan');
        if (scan) {
            scan.animate([
                { width: '100%', opacity: 1 },
                { width: '100%', opacity: 0 }
            ], {
                duration: 300
            }).onfinish = () => scan.remove();
        }
    });
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes neonFlicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
    
    @keyframes cyberFadeOut {
        from { 
            opacity: 1; 
            transform: translateX(-50%) scale(1);
        }
        to { 
            opacity: 0; 
            transform: translateX(-50%) scale(0.8);
        }
    }
    
    .glitching {
        animation: glitchEffect 0.2s;
    }
    
    @keyframes glitchEffect {
        0%, 100% { 
            transform: translateX(0);
            filter: hue-rotate(0deg);
        }
        20% { 
            transform: translateX(-2px);
            filter: hue-rotate(90deg);
        }
        40% { 
            transform: translateX(2px);
            filter: hue-rotate(180deg);
        }
        60% { 
            transform: translateX(-1px);
            filter: hue-rotate(270deg);
        }
        80% { 
            transform: translateX(1px);
            filter: hue-rotate(360deg);
        }
    }
    
    .loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .loading .btn-text::before {
        content: '[ ';
        animation: loadingBrackets 1s steps(4) infinite;
    }
    
    .loading .btn-text::after {
        content: ' ]';
        animation: loadingBrackets 1s steps(4) infinite reverse;
    }
    
    @keyframes loadingBrackets {
        0% { opacity: 1; }
        100% { opacity: 0.3; }
    }
`;
document.head.appendChild(style);
