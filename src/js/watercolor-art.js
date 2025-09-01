// 水彩艺术风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加水彩动画效果
    initWatercolorAnimations();
});

function initPageAnimations() {
    // 卡片入场动画
    const watercolorCard = document.querySelector('.watercolor-card');
    if (watercolorCard) {
        watercolorCard.style.opacity = '0';
        watercolorCard.style.transform = 'translateY(50px) scale(0.8)';
        watercolorCard.style.filter = 'blur(10px)';
        
        setTimeout(() => {
            watercolorCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            watercolorCard.style.opacity = '1';
            watercolorCard.style.transform = 'translateY(0) scale(1)';
            watercolorCard.style.filter = 'blur(0)';
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

    // 水彩斑点动画
    const blobs = document.querySelectorAll('.watercolor-blob');
    blobs.forEach((blob, index) => {
        blob.style.opacity = '0';
        blob.style.transform = 'scale(0)';
        
        setTimeout(() => {
            blob.style.transition = 'all 1.2s ease-out';
            blob.style.opacity = '0.6';
            blob.style.transform = 'scale(1)';
        }, 700 + index * 200);
    });

    // 水彩飞溅动画
    const splashes = document.querySelectorAll('.watercolor-splash');
    splashes.forEach((splash, index) => {
        splash.style.opacity = '0';
        splash.style.transform = 'scale(0) rotate(0deg)';
        
        setTimeout(() => {
            splash.style.transition = 'all 1s ease-out';
            splash.style.opacity = '1';
            splash.style.transform = 'scale(1) rotate(360deg)';
        }, 1000 + index * 300);
    });
}

function initInteractiveEffects() {
    // 输入框水彩效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(-3px)';
                // 添加水彩扩散效果
                input.style.boxShadow = '0 0 20px rgba(253, 121, 168, 0.3)';
                
                // 创建水彩扩散动画
                createWatercolorRipple(input);
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(0)';
                input.style.boxShadow = 'none';
            }
        });

        // 输入时的颜色变化
        input.addEventListener('input', () => {
            if (input.value) {
                input.style.color = '#fd79a8';
                input.style.fontWeight = '500';
            } else {
                input.style.color = '#2d3436';
                input.style.fontWeight = 'normal';
            }
        });
    });

    // 按钮水彩点击效果
    const buttons = document.querySelectorAll('.watercolor-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 创建水彩爆炸效果
            createWatercolorExplosion(button, e);
        });

        // 按钮悬停水彩效果
        button.addEventListener('mouseenter', () => {
            button.style.filter = 'brightness(1.1) saturate(1.2)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.filter = 'brightness(1) saturate(1)';
        });
    });

    // 卡片水彩悬停效果
    const card = document.querySelector('.watercolor-card');
    if (card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.filter = 'brightness(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.filter = 'brightness(1)';
        });
    }
}

function initWatercolorAnimations() {
    // 动态水彩颜色变化
    const blobs = document.querySelectorAll('.watercolor-blob');
    const colors = [
        'rgba(255, 107, 107, 0.6)',
        'rgba(116, 185, 255, 0.6)',
        'rgba(162, 155, 254, 0.6)',
        'rgba(255, 234, 167, 0.6)',
        'rgba(253, 121, 168, 0.6)'
    ];
    
    setInterval(() => {
        blobs.forEach((blob, index) => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            blob.style.background = `radial-gradient(circle, ${randomColor} 0%, transparent 70%)`;
        });
    }, 3000);

    // 水滴动画
    const drops = document.querySelectorAll('.drop');
    drops.forEach(drop => {
        setInterval(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            drop.style.background = randomColor.replace('0.6', '0.8');
        }, Math.random() * 2000 + 1000);
    });

    // 背景渐变动画
    let gradientAngle = 135;
    setInterval(() => {
        gradientAngle = (gradientAngle + 1) % 360;
        document.body.style.background = `linear-gradient(${gradientAngle}deg, #ffeaa7 0%, #fab1a0 25%, #fd79a8 50%, #a29bfe 75%, #6c5ce7 100%)`;
    }, 100);

    // 水彩纹理动画
    createWatercolorTexture();
}

function createWatercolorRipple(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(253, 121, 168, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: watercolorRipple 1s ease-out;
        pointer-events: none;
        z-index: 5;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

function createWatercolorExplosion(button, event) {
    const explosion = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    explosion.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(253, 121, 168, 0.4) 50%, transparent 70%);
        border-radius: 50%;
        animation: watercolorExplosion 0.8s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    button.style.position = 'relative';
    button.appendChild(explosion);
    
    setTimeout(() => {
        explosion.remove();
    }, 800);
}

function createWatercolorTexture() {
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
    
    // 绘制水彩纹理
    function drawWatercolorTexture() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 100 + 20;
            const opacity = Math.random() * 0.3 + 0.1;
            
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, `rgba(253, 121, 168, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(162, 155, 254, ${opacity * 0.5})`);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    drawWatercolorTexture();
    setInterval(drawWatercolorTexture, 5000);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes watercolorRipple {
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
    
    @keyframes watercolorExplosion {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
        }
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .watercolor-card {
        transition: all 0.3s ease;
    }
    
    input {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// 页面加载完成提示
window.addEventListener('load', () => {
    console.log('🎨 水彩艺术风格登录页面加载完成');
    console.log('🎨 特色：柔和水彩背景，艺术感渐变效果');
});

// 鼠标移动水彩跟踪效果
document.addEventListener('mousemove', (e) => {
    // 创建跟随鼠标的水彩效果
    if (Math.random() < 0.1) { // 10%概率创建水彩点
        createMouseWatercolor(e.clientX, e.clientY);
    }
});

function createMouseWatercolor(x, y) {
    const watercolor = document.createElement('div');
    watercolor.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(253, 121, 168, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 3;
        animation: fadeOut 2s ease-out forwards;
    `;
    
    document.body.appendChild(watercolor);
    
    setTimeout(() => {
        watercolor.remove();
    }, 2000);
}

// 添加淡出动画
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(fadeOutStyle);
