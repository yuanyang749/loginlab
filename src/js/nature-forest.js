// 自然森林风格特效和交互
document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initForestEffects();
    
    // 添加表单提交处理
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
});

// 初始化森林特效
function initForestEffects() {
    // 创建更多树叶
    createAdditionalLeaves();
    
    // 蝴蝶飞舞路径随机化
    randomizeButterflies();
    
    // 添加自然音效（可选）
    addNatureSounds();
}

// 创建额外的树叶
function createAdditionalLeaves() {
    const background = document.querySelector('.background');
    const leafEmojis = ['🍃', '🍂', '🌿', '🍀'];
    
    for (let i = 0; i < 5; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'dynamic-leaf';
        leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        leaf.style.cssText = `
            position: absolute;
            font-size: ${18 + Math.random() * 10}px;
            left: ${Math.random() * 100}%;
            animation: falling ${8 + Math.random() * 4}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: 0.8;
        `;
        background.appendChild(leaf);
    }
}

// 随机化蝴蝶飞行路径
function randomizeButterflies() {
    const butterflies = document.querySelectorAll('.butterfly');
    butterflies.forEach(butterfly => {
        setInterval(() => {
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 100 - 50;
            butterfly.style.transform = `translate(${x}px, ${y}px)`;
        }, 3000);
    });
}

// 添加自然音效
function addNatureSounds() {
    // 鸟鸣声、风声等（实际项目中可以添加音频）
    console.log('Forest ambience initialized');
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formType = e.target.closest('.login-form') ? 'login' : 
                    e.target.closest('.register-form') ? 'register' : 'forgot';
    
    // 添加提交动画
    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    
    // 创建树叶飞舞效果
    createLeafBurst(submitBtn);
    
    // 模拟API调用
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        if (formType === 'login') {
            showMessage('欢迎回到森林！', 'success');
        } else if (formType === 'register') {
            showMessage('种子已种下，期待成长！', 'success');
        } else {
            showMessage('找回路径已发送', 'success');
        }
    }, 2000);
}

// 创建树叶爆发效果
function createLeafBurst(element) {
    const leafEmojis = ['🍃', '🍂', '🌿'];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const leaf = document.createElement('div');
        leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        leaf.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(leaf);
        
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 100 + Math.random() * 50;
        
        leaf.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0) rotate(360deg)`,
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => leaf.remove();
    }
}

// 显示消息提示
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast ${type}`;
    messageDiv.innerHTML = `🌱 ${message}`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 30px;
        background: linear-gradient(135deg, #27ae60, #71b280);
        color: white;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(39,174,96,0.4);
        z-index: 10000;
        animation: growIn 0.5s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'growOut 0.5s ease-out';
        setTimeout(() => messageDiv.remove(), 500);
    }, 3000);
}

// 添加输入框焦点效果
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
        // 添加绿色光晕
        this.parentElement.style.filter = 'drop-shadow(0 4px 10px rgba(39,174,96,0.3))';
        
        // 创建小树叶装饰
        const leaf = document.createElement('span');
        leaf.textContent = '🌿';
        leaf.className = 'input-leaf';
        leaf.style.cssText = `
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 16px;
            animation: sway 2s ease-in-out infinite;
        `;
        this.parentElement.appendChild(leaf);
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.filter = '';
        const leaf = this.parentElement.querySelector('.input-leaf');
        if (leaf) leaf.remove();
    });
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes growIn {
        from { transform: translate(-50%, -50px) scale(0.8); opacity: 0; }
        to { transform: translate(-50%, 0) scale(1); opacity: 1; }
    }
    
    @keyframes growOut {
        from { transform: translate(-50%, 0) scale(1); opacity: 1; }
        to { transform: translate(-50%, -50px) scale(0.8); opacity: 0; }
    }
    
    @keyframes sway {
        0%, 100% { transform: rotate(-10deg); }
        50% { transform: rotate(10deg); }
    }
    
    .loading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .loading .btn-text::after {
        content: '...';
        animation: dots 1.5s steps(4) infinite;
    }
    
    @keyframes dots {
        0%, 20% { content: ''; }
        40% { content: '.'; }
        60% { content: '..'; }
        80%, 100% { content: '...'; }
    }
`;
document.head.appendChild(style);
