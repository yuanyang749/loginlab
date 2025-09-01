// 复古怀旧风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加复古动画效果
    initVintageAnimations();
});

function initPageAnimations() {
    // 卡片入场动画
    const vintageCard = document.querySelector('.vintage-card');
    if (vintageCard) {
        vintageCard.style.opacity = '0';
        vintageCard.style.transform = 'translateY(50px) scale(0.8)';
        vintageCard.style.filter = 'sepia(100%)';
        
        setTimeout(() => {
            vintageCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            vintageCard.style.opacity = '1';
            vintageCard.style.transform = 'translateY(0) scale(1)';
            vintageCard.style.filter = 'sepia(20%)';
        }, 300);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.8s ease-out';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0)';
        }, 500);
    }

    // 装饰元素动画
    const ornaments = document.querySelectorAll('.vintage-ornament');
    ornaments.forEach((ornament, index) => {
        ornament.style.opacity = '0';
        ornament.style.transform = 'scale(0) rotate(0deg)';
        
        setTimeout(() => {
            ornament.style.transition = 'all 1.2s ease-out';
            ornament.style.opacity = '0.3';
            ornament.style.transform = 'scale(1) rotate(360deg)';
        }, 700 + index * 200);
    });
}

function initInteractiveEffects() {
    // 输入框复古效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(-3px)';
                // 添加复古发光效果
                input.style.boxShadow = '0 0 15px rgba(139, 69, 19, 0.3)';
                input.style.background = 'rgba(255, 255, 255, 0.95)';
                
                // 创建复古波纹效果
                createVintageRipple(input);
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(0)';
                input.style.boxShadow = 'none';
                input.style.background = 'rgba(255, 255, 255, 0.8)';
            }
        });

        // 输入时的复古效果
        input.addEventListener('input', () => {
            if (input.value) {
                input.style.color = '#654321';
                input.style.fontWeight = 'bold';
            } else {
                input.style.color = '#2f1b14';
                input.style.fontWeight = 'normal';
            }
        });
    });

    // 按钮复古点击效果
    const buttons = document.querySelectorAll('.vintage-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 创建复古印章效果
            createVintageStamp(button, e);
        });

        // 按钮悬停复古效果
        button.addEventListener('mouseenter', () => {
            button.style.filter = 'sepia(30%) brightness(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.filter = 'sepia(20%) brightness(1)';
        });
    });

    // 卡片复古悬停效果
    const card = document.querySelector('.vintage-card');
    if (card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.filter = 'sepia(10%) brightness(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.filter = 'sepia(20%) brightness(1)';
        });
    }
}

function initVintageAnimations() {
    // 动态复古色调变化
    let sepiaValue = 20;
    let direction = 1;
    
    setInterval(() => {
        sepiaValue += direction * 2;
        if (sepiaValue >= 40 || sepiaValue <= 10) {
            direction *= -1;
        }
        
        const card = document.querySelector('.vintage-card');
        if (card) {
            card.style.filter = `sepia(${sepiaValue}%) brightness(1)`;
        }
    }, 3000);

    // 装饰元素旋转
    const ornaments = document.querySelectorAll('.vintage-ornament');
    ornaments.forEach(ornament => {
        let rotation = 0;
        setInterval(() => {
            rotation += 1;
            ornament.style.transform = `scale(1) rotate(${rotation}deg)`;
        }, 100);
    });

    // 胶片颗粒动画
    const filmGrain = document.querySelector('.film-grain');
    if (filmGrain) {
        setInterval(() => {
            const opacity = Math.random() * 0.1 + 0.05;
            filmGrain.style.opacity = opacity;
        }, 100);
    }

    // 复古纸张纹理
    createVintageTexture();
}

function createVintageRipple(element) {
    const ripple = document.createElement('div');
    
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(139, 69, 19, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: vintageRipple 1s ease-out;
        pointer-events: none;
        z-index: 5;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

function createVintageStamp(button, event) {
    const stamp = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    stamp.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(139, 69, 19, 0.8) 0%, rgba(160, 82, 45, 0.4) 50%, transparent 70%);
        border-radius: 50%;
        animation: vintageStamp 0.8s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    button.style.position = 'relative';
    button.appendChild(stamp);
    
    setTimeout(() => {
        stamp.remove();
    }, 800);
}

function createVintageTexture() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
        opacity: 0.1;
        mix-blend-mode: multiply;
    `;
    
    document.body.appendChild(canvas);
    
    // 绘制复古纹理
    function drawVintageTexture() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制纸张纹理
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 2 + 0.5;
            
            ctx.fillStyle = `rgba(139, 69, 19, ${Math.random() * 0.3})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // 绘制复古斑点
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const width = Math.random() * 10 + 5;
            const height = Math.random() * 10 + 5;
            
            ctx.fillStyle = `rgba(160, 82, 45, ${Math.random() * 0.2})`;
            ctx.fillRect(x, y, width, height);
        }
    }
    
    drawVintageTexture();
    setInterval(drawVintageTexture, 10000);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes vintageRipple {
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
    
    @keyframes vintageStamp {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
        }
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .vintage-card {
        transition: all 0.3s ease;
    }
    
    input {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// 页面加载完成提示
window.addEventListener('load', () => {
    console.log('📻 复古怀旧风格登录页面加载完成');
    console.log('🎨 特色：复古色调，老式字体，怀旧元素');
});

// 打字机效果
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 为标题添加打字机效果
const title = document.querySelector('.vintage-card h2');
if (title) {
    const originalText = title.textContent;
    setTimeout(() => {
        typewriterEffect(title, originalText, 150);
    }, 1000);
}
