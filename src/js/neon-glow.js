// 霓虹发光风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加霓虹动画效果
    initNeonAnimations();
});

function initPageAnimations() {
    // 卡片入场动画
    const neonCard = document.querySelector('.neon-card');
    if (neonCard) {
        neonCard.style.opacity = '0';
        neonCard.style.transform = 'translateY(50px) scale(0.8)';
        
        setTimeout(() => {
            neonCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            neonCard.style.opacity = '1';
            neonCard.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.6s ease-out';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0)';
        }, 400);
    }

    // 霓虹线条动画
    const neonLines = document.querySelectorAll('.neon-line');
    neonLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'scale(0)';
        
        setTimeout(() => {
            line.style.transition = 'all 1s ease-out';
            line.style.opacity = '1';
            line.style.transform = 'scale(1)';
        }, 600 + index * 300);
    });

    // 粒子动画
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.opacity = '0';
        particle.style.transform = 'scale(0)';
        
        setTimeout(() => {
            particle.style.transition = 'all 0.8s ease-out';
            particle.style.opacity = '1';
            particle.style.transform = 'scale(1)';
        }, 1000 + index * 200);
    });
}

function initInteractiveEffects() {
    // 输入框霓虹效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(-3px)';
                // 添加霓虹脉冲效果
                input.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.5)';
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(0)';
                input.style.boxShadow = 'none';
            }
        });

        // 输入时的霓虹效果
        input.addEventListener('input', () => {
            if (input.value) {
                input.style.color = '#00ffff';
                input.style.textShadow = '0 0 5px #00ffff';
            } else {
                input.style.color = '#ffffff';
                input.style.textShadow = 'none';
            }
        });
    });

    // 按钮霓虹点击效果
    const buttons = document.querySelectorAll('.neon-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 创建霓虹爆炸效果
            const explosion = document.createElement('div');
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            explosion.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, transparent 70%);
                animation: neonExplosion 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            button.style.position = 'relative';
            button.appendChild(explosion);
            
            setTimeout(() => {
                explosion.remove();
            }, 600);
        });

        // 按钮悬停霓虹效果
        button.addEventListener('mouseenter', () => {
            button.style.textShadow = '0 0 10px currentColor';
        });

        button.addEventListener('mouseleave', () => {
            button.style.textShadow = 'none';
        });
    });

    // 卡片霓虹悬停效果
    const card = document.querySelector('.neon-card');
    if (card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    }
}

function initNeonAnimations() {
    // 动态霓虹线条颜色变化
    const neonLines = document.querySelectorAll('.neon-line');
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#ff0080'];
    let colorIndex = 0;
    
    setInterval(() => {
        neonLines.forEach((line, index) => {
            const color = colors[(colorIndex + index) % colors.length];
            line.style.background = `linear-gradient(90deg, transparent, ${color}, transparent)`;
        });
        colorIndex = (colorIndex + 1) % colors.length;
    }, 2000);

    // 粒子随机闪烁
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        setInterval(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = randomColor;
            particle.style.boxShadow = `0 0 15px ${randomColor}`;
        }, Math.random() * 3000 + 1000);
    });

    // 霓虹边框动画
    const neonBorders = document.querySelectorAll('.neon-border');
    neonBorders.forEach(border => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            border.style.background = `linear-gradient(45deg, hsl(${hue}, 100%, 50%), hsl(${(hue + 60) % 360}, 100%, 50%), hsl(${(hue + 120) % 360}, 100%, 50%)) border-box`;
        }, 50);
    });

    // 背景霓虹脉冲
    let pulseIntensity = 0.1;
    let pulseDirection = 1;
    
    setInterval(() => {
        pulseIntensity += pulseDirection * 0.02;
        if (pulseIntensity >= 0.3 || pulseIntensity <= 0.1) {
            pulseDirection *= -1;
        }
        
        document.body.style.boxShadow = `inset 0 0 100px rgba(0, 255, 255, ${pulseIntensity})`;
    }, 100);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes neonExplosion {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            margin: -50px 0 0 -50px;
            opacity: 0;
        }
    }
    
    @keyframes neonPulse {
        0%, 100% {
            box-shadow: 0 0 5px currentColor;
        }
        50% {
            box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
        }
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .neon-card {
        transition: all 0.3s ease;
    }
    
    input {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// 页面加载完成提示
window.addEventListener('load', () => {
    console.log('💫 霓虹发光风格登录页面加载完成');
    console.log('🎨 特色：深色背景配霓虹色边框和发光效果');
});

// 键盘霓虹效果
document.addEventListener('keydown', (e) => {
    // 为按键添加霓虹闪烁效果
    const activeElement = document.activeElement;
    if (activeElement && activeElement.tagName === 'INPUT') {
        activeElement.style.animation = 'neonPulse 0.3s ease-out';
        setTimeout(() => {
            activeElement.style.animation = '';
        }, 300);
    }
});

// 鼠标移动霓虹跟踪效果
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.neon-cursor') || createNeonCursor();
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

function createNeonCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'neon-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #00ffff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: all 0.1s ease;
        box-shadow: 0 0 10px #00ffff;
    `;
    document.body.appendChild(cursor);
    return cursor;
}
