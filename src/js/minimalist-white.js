// 极简白色风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加简约动画效果
    initMinimalAnimations();
});

function initPageAnimations() {
    // 卡片入场动画
    const minimalCard = document.querySelector('.minimal-card');
    if (minimalCard) {
        minimalCard.style.opacity = '0';
        minimalCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            minimalCard.style.transition = 'all 0.6s ease-out';
            minimalCard.style.opacity = '1';
            minimalCard.style.transform = 'translateY(0)';
        }, 100);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.5s ease-out';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0)';
        }, 300);
    }

    // 装饰元素动画
    const circles = document.querySelectorAll('.floating-circle');
    circles.forEach((circle, index) => {
        circle.style.opacity = '0';
        circle.style.transform = 'scale(0)';
        
        setTimeout(() => {
            circle.style.transition = 'all 0.8s ease-out';
            circle.style.opacity = '1';
            circle.style.transform = 'scale(1)';
        }, 500 + index * 200);
    });
}

function initInteractiveEffects() {
    // 输入框聚焦效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(-2px)';
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(0)';
            }
        });
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('.login-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 创建点击波纹效果
            const ripple = document.createElement('div');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 卡片悬停效果
    const card = document.querySelector('.minimal-card');
    if (card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    }
}

function initMinimalAnimations() {
    // 网格图案动画
    const gridPattern = document.querySelector('.grid-pattern');
    if (gridPattern) {
        let opacity = 0.5;
        let direction = 1;
        
        setInterval(() => {
            opacity += direction * 0.01;
            if (opacity >= 0.7 || opacity <= 0.3) {
                direction *= -1;
            }
            gridPattern.style.opacity = opacity;
        }, 100);
    }

    // 浮动圆圈交互
    const circles = document.querySelectorAll('.floating-circle');
    circles.forEach(circle => {
        circle.addEventListener('mouseenter', () => {
            circle.style.transform = 'scale(1.1)';
            circle.style.borderColor = '#d0d0d0';
        });

        circle.addEventListener('mouseleave', () => {
            circle.style.transform = 'scale(1)';
            circle.style.borderColor = '#f0f0f0';
        });
    });
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .floating-circle {
        transition: all 0.3s ease;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// 页面加载完成提示
window.addEventListener('load', () => {
    console.log('⚪ 极简白色风格登录页面加载完成');
    console.log('🎨 特色：纯净白色背景，简洁线条设计');
});

// 表单验证增强
document.addEventListener('submit', (e) => {
    const form = e.target;
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    formGroup.style.animation = '';
                }, 500);
            }
        }
    });

    if (!isValid) {
        e.preventDefault();
    }
});

// 添加震动动画
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);
