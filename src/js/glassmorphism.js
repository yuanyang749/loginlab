// 玻璃拟态风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加玻璃动画效果
    initGlassAnimations();
});

function initPageAnimations() {
    // 卡片入场动画
    const glassCard = document.querySelector('.glass-card');
    if (glassCard) {
        glassCard.style.opacity = '0';
        glassCard.style.transform = 'translateY(50px) scale(0.8)';
        glassCard.style.backdropFilter = 'blur(0px)';
        
        setTimeout(() => {
            glassCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            glassCard.style.opacity = '1';
            glassCard.style.transform = 'translateY(0) scale(1)';
            glassCard.style.backdropFilter = 'blur(30px)';
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

    // 玻璃球体动画
    const orbs = document.querySelectorAll('.glass-orb');
    orbs.forEach((orb, index) => {
        orb.style.opacity = '0';
        orb.style.transform = 'scale(0)';
        
        setTimeout(() => {
            orb.style.transition = 'all 1.2s ease-out';
            orb.style.opacity = '1';
            orb.style.transform = 'scale(1)';
        }, 700 + index * 200);
    });

    // 粒子动画
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.opacity = '0';
        particle.style.transform = 'scale(0)';
        
        setTimeout(() => {
            particle.style.transition = 'all 1s ease-out';
            particle.style.opacity = '1';
            particle.style.transform = 'scale(1)';
        }, 1000 + index * 150);
    });
}

function initInteractiveEffects() {
    // 输入框玻璃效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(-3px)';
                // 添加玻璃发光效果
                input.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.2)';
                input.style.background = 'rgba(255, 255, 255, 0.2)';
                
                // 创建玻璃波纹效果
                createGlassRipple(input);
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(0)';
                input.style.boxShadow = 'none';
                input.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });

        // 输入时的玻璃效果
        input.addEventListener('input', () => {
            if (input.value) {
                input.style.color = 'rgba(255, 255, 255, 1)';
                input.style.fontWeight = '500';
            } else {
                input.style.color = 'rgba(255, 255, 255, 0.9)';
                input.style.fontWeight = 'normal';
            }
        });
    });

    // 按钮玻璃点击效果
    const buttons = document.querySelectorAll('.glass-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 创建玻璃破碎效果
            createGlassShatter(button, e);
        });

        // 按钮悬停玻璃效果
        button.addEventListener('mouseenter', () => {
            button.style.backdropFilter = 'blur(25px)';
            button.style.background = 'rgba(255, 255, 255, 0.25)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.backdropFilter = 'blur(20px)';
            button.style.background = 'rgba(255, 255, 255, 0.2)';
        });
    });

    // 卡片玻璃悬停效果
    const card = document.querySelector('.glass-card');
    if (card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.backdropFilter = 'blur(35px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.backdropFilter = 'blur(30px)';
        });
    }
}

function initGlassAnimations() {
    // 动态玻璃透明度变化
    const orbs = document.querySelectorAll('.glass-orb');
    setInterval(() => {
        orbs.forEach(orb => {
            const opacity = Math.random() * 0.3 + 0.7;
            orb.style.opacity = opacity;
        });
    }, 3000);

    // 粒子闪烁效果
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        setInterval(() => {
            const opacity = Math.random() * 0.4 + 0.6;
            const scale = Math.random() * 0.3 + 1;
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
        }, Math.random() * 2000 + 1000);
    });

    // 背景渐变动画
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        document.body.style.background = `linear-gradient(135deg, 
            hsl(${hue}, 70%, 70%) 0%, 
            hsl(${(hue + 60) % 360}, 70%, 70%) 25%, 
            hsl(${(hue + 120) % 360}, 70%, 70%) 50%, 
            hsl(${(hue + 180) % 360}, 70%, 70%) 75%, 
            hsl(${(hue + 240) % 360}, 70%, 70%) 100%)`;
    }, 100);

    // 玻璃反射效果
    createGlassReflections();
}

function createGlassRipple(element) {
    const ripple = document.createElement('div');
    
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: glassRipple 1s ease-out;
        pointer-events: none;
        z-index: 5;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

function createGlassShatter(button, event) {
    const shatter = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    shatter.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
        border-radius: 50%;
        animation: glassShatter 0.8s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    button.style.position = 'relative';
    button.appendChild(shatter);
    
    // 创建玻璃碎片
    for (let i = 0; i < 6; i++) {
        const fragment = document.createElement('div');
        const angle = (i * 60) * Math.PI / 180;
        const distance = 50 + Math.random() * 30;
        
        fragment.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: glassFragment 1s ease-out forwards;
            pointer-events: none;
            z-index: 11;
            --angle: ${angle};
            --distance: ${distance}px;
        `;
        
        button.appendChild(fragment);
        
        setTimeout(() => {
            fragment.remove();
        }, 1000);
    }
    
    setTimeout(() => {
        shatter.remove();
    }, 800);
}

function createGlassReflections() {
    const card = document.querySelector('.glass-card');
    if (!card) return;
    
    setInterval(() => {
        const reflection = document.createElement('div');
        reflection.style.cssText = `
            position: absolute;
            top: ${Math.random() * 100}%;
            left: -10%;
            width: 2px;
            height: 20%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: glassReflection 2s ease-out;
            pointer-events: none;
            z-index: 15;
        `;
        
        card.appendChild(reflection);
        
        setTimeout(() => {
            reflection.remove();
        }, 2000);
    }, 5000);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes glassRipple {
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
    
    @keyframes glassShatter {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
        }
    }
    
    @keyframes glassFragment {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(
                calc(-50% + cos(var(--angle)) * var(--distance)), 
                calc(-50% + sin(var(--angle)) * var(--distance))
            ) scale(0);
        }
    }
    
    @keyframes glassReflection {
        0% {
            left: -10%;
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            left: 110%;
            opacity: 0;
        }
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .glass-card {
        transition: all 0.3s ease;
    }
    
    input {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// 页面加载完成提示
window.addEventListener('load', () => {
    console.log('🔮 玻璃拟态风格登录页面加载完成');
    console.log('🎨 特色：毛玻璃效果，透明度，模糊背景');
});

// 鼠标移动玻璃跟踪效果
document.addEventListener('mousemove', (e) => {
    const card = document.querySelector('.glass-card');
    if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 计算鼠标相对于卡片中心的位置
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // 创建跟随鼠标的玻璃光点
        if (Math.random() < 0.1) {
            createMouseGlass(e.clientX, e.clientY);
        }
    }
});

function createMouseGlass(x, y) {
    const glass = document.createElement('div');
    glass.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 15px;
        height: 15px;
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 3;
        animation: glassFadeOut 2s ease-out forwards;
    `;
    
    document.body.appendChild(glass);
    
    setTimeout(() => {
        glass.remove();
    }, 2000);
}

// 添加淡出动画
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes glassFadeOut {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(3);
        }
    }
`;
document.head.appendChild(fadeOutStyle);
