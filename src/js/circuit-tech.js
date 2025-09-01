// 电路板科技风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加电路板动态效果
    initCircuitEffects();
    
    // 添加科技音效反馈
    initTechSoundEffects();
});

function initPageAnimations() {
    // 科技卡片入场动画
    const techCard = document.querySelector('.tech-card');
    if (techCard) {
        techCard.style.opacity = '0';
        techCard.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            techCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            techCard.style.opacity = '1';
            techCard.style.transform = 'translateY(0) scale(1)';
        }, 300);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.6s ease';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0)';
        }, 500);
    }

    // 电路线条延迟显示
    const circuitLines = document.querySelectorAll('.circuit-line');
    circuitLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.transition = 'opacity 0.5s ease';
            line.style.opacity = '0.6';
        }, 800 + index * 200);
    });
}

function initInteractiveEffects() {
    // 输入框聚焦效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                // 添加电路激活效果
                formGroup.style.boxShadow = '0 0 20px rgba(0, 255, 100, 0.3)';
                formGroup.style.transition = 'box-shadow 0.3s ease';
                
                // 创建电路脉冲效果
                createCircuitPulse(formGroup);
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.boxShadow = 'none';
            }
        });

        // 输入时的字符效果
        input.addEventListener('input', () => {
            createTypingEffect(input);
        });
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('.login-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createButtonRipple(e, button);
            addButtonGlow(button);
        });
    });

    // 链接悬停效果
    const techLinks = document.querySelectorAll('.tech-link');
    techLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            createLinkSpark(link);
        });
    });
}

function initCircuitEffects() {
    // 动态添加更多电路元素
    createDynamicCircuits();
    
    // 电路板扫描效果
    createScanningEffect();
    
    // 随机电路闪烁
    startRandomCircuitFlash();
}

function initTechSoundEffects() {
    // 模拟科技音效（通过视觉反馈）
    const statusIndicator = document.querySelector('.status-indicator');
    if (statusIndicator) {
        setInterval(() => {
            statusIndicator.style.transform = 'scale(1.2)';
            setTimeout(() => {
                statusIndicator.style.transform = 'scale(1)';
            }, 100);
        }, 3000);
    }
}

function createCircuitPulse(element) {
    const pulse = document.createElement('div');
    pulse.style.position = 'absolute';
    pulse.style.top = '0';
    pulse.style.left = '0';
    pulse.style.width = '100%';
    pulse.style.height = '2px';
    pulse.style.background = 'linear-gradient(90deg, transparent, #00ff64, transparent)';
    pulse.style.animation = 'circuitPulse 0.5s ease-out';
    pulse.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(pulse);
    
    setTimeout(() => {
        pulse.remove();
    }, 500);
}

function createTypingEffect(input) {
    const rect = input.getBoundingClientRect();
    const spark = document.createElement('div');
    spark.textContent = '⚡';
    spark.style.position = 'fixed';
    spark.style.left = rect.right - 20 + 'px';
    spark.style.top = rect.top + 'px';
    spark.style.color = '#00ff64';
    spark.style.fontSize = '12px';
    spark.style.pointerEvents = 'none';
    spark.style.animation = 'sparkFade 0.5s ease-out forwards';
    spark.style.zIndex = '1000';
    
    document.body.appendChild(spark);
    
    setTimeout(() => {
        spark.remove();
    }, 500);
}

function createButtonRipple(e, button) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = 'radial-gradient(circle, rgba(0, 255, 100, 0.6) 0%, transparent 70%)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addButtonGlow(button) {
    button.style.boxShadow = '0 0 30px rgba(0, 255, 100, 0.6)';
    setTimeout(() => {
        button.style.boxShadow = '0 0 25px rgba(0, 255, 100, 0.4)';
    }, 200);
}

function createLinkSpark(link) {
    const spark = document.createElement('span');
    spark.textContent = '✨';
    spark.style.marginLeft = '5px';
    spark.style.animation = 'sparkle 0.5s ease-out';
    
    link.appendChild(spark);
    
    setTimeout(() => {
        spark.remove();
    }, 500);
}

function createDynamicCircuits() {
    const circuitBackground = document.querySelector('.circuit-background');
    
    // 添加更多动态电路线
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'circuit-line dynamic';
        line.style.position = 'absolute';
        line.style.height = '1px';
        line.style.background = 'linear-gradient(90deg, transparent, rgba(0, 255, 100, 0.3), transparent)';
        line.style.top = Math.random() * 100 + '%';
        line.style.width = '100%';
        line.style.animation = `circuitFlow ${3 + Math.random() * 2}s linear infinite`;
        line.style.animationDelay = Math.random() * 2 + 's';
        
        circuitBackground.appendChild(line);
    }
}

function createScanningEffect() {
    const scanner = document.createElement('div');
    scanner.style.position = 'fixed';
    scanner.style.top = '0';
    scanner.style.left = '0';
    scanner.style.width = '100%';
    scanner.style.height = '2px';
    scanner.style.background = 'linear-gradient(90deg, transparent, #00c8ff, transparent)';
    scanner.style.animation = 'scanDown 4s ease-in-out infinite';
    scanner.style.pointerEvents = 'none';
    scanner.style.zIndex = '50';
    
    document.body.appendChild(scanner);
}

function startRandomCircuitFlash() {
    const components = document.querySelectorAll('.component');
    
    setInterval(() => {
        const randomComponent = components[Math.floor(Math.random() * components.length)];
        if (randomComponent) {
            randomComponent.style.filter = 'drop-shadow(0 0 20px currentColor) brightness(1.5)';
            setTimeout(() => {
                randomComponent.style.filter = '';
            }, 200);
        }
    }, 1500);
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes circuitPulse {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    @keyframes sparkFade {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
    
    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
    }
    
    @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes scanDown {
        0% { top: 0; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { top: 100%; opacity: 0; }
    }
`;
document.head.appendChild(style);
