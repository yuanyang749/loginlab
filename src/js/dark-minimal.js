// 深色极简风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化页面动画
    initPageAnimations();
    
    // 初始化霓虹效果
    initNeonEffects();
    
    // 初始化网格动画
    initGridAnimations();
    
    // 初始化打字机效果
    initTypewriterEffect();
});

function initPageAnimations() {
    // 卡片入场动画
    const darkCard = document.querySelector('.dark-card');
    if (darkCard) {
        darkCard.style.opacity = '0';
        darkCard.style.transform = 'translateY(30px) scale(0.95)';
        
        setTimeout(() => {
            darkCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            darkCard.style.opacity = '1';
            darkCard.style.transform = 'translateY(0) scale(1)';
        }, 300);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.6s ease';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0)';
        }, 500);
    }

    // 霓虹线条动画
    const neonLines = document.querySelectorAll('.neon-line');
    neonLines.forEach((line, index) => {
        line.style.opacity = '0';
        setTimeout(() => {
            line.style.transition = 'opacity 1s ease';
            line.style.opacity = '0.3';
        }, 800 + index * 200);
    });
}

function initNeonEffects() {
    // 输入框霓虹效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            createNeonPulse(input);
            addScanlineEffect(input);
        });

        input.addEventListener('blur', () => {
            removeScanlineEffect(input);
        });

        // 输入时的霓虹闪烁
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                createNeonFlicker(e.target);
            }
        });
    });

    // 按钮霓虹效果
    const buttons = document.querySelectorAll('.neon-btn, .neon-btn-small');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            createButtonGlow(button);
        });

        button.addEventListener('click', (e) => {
            createNeonExplosion(e, button);
        });
    });

    // 链接霓虹效果
    const links = document.querySelectorAll('.neon-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            createTextGlow(link);
        });
    });
}

function createNeonPulse(element) {
    const pulse = document.createElement('div');
    pulse.className = 'neon-pulse';
    
    const rect = element.getBoundingClientRect();
    pulse.style.cssText = `
        position: fixed;
        left: ${rect.left}px;
        top: ${rect.top}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        border: 2px solid #00ffff;
        border-radius: 4px;
        pointer-events: none;
        z-index: 1000;
        animation: neonPulse 0.6s ease-out;
    `;
    
    document.body.appendChild(pulse);
    
    setTimeout(() => {
        document.body.removeChild(pulse);
    }, 600);
}

function addScanlineEffect(input) {
    const scanline = document.createElement('div');
    scanline.className = 'scanline-effect';
    
    const rect = input.getBoundingClientRect();
    scanline.style.cssText = `
        position: fixed;
        left: ${rect.left}px;
        top: ${rect.top}px;
        width: ${rect.width}px;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ffff, transparent);
        pointer-events: none;
        z-index: 999;
        animation: scanline 2s linear infinite;
    `;
    
    input.scanlineElement = scanline;
    document.body.appendChild(scanline);
}

function removeScanlineEffect(input) {
    if (input.scanlineElement) {
        document.body.removeChild(input.scanlineElement);
        input.scanlineElement = null;
    }
}

function createNeonFlicker(input) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.style.animation = 'neonFlicker 0.1s ease-in-out';
        setTimeout(() => {
            formGroup.style.animation = '';
        }, 100);
    }
}

function createButtonGlow(button) {
    button.style.boxShadow = `
        0 0 30px rgba(0, 255, 255, 0.8),
        inset 0 0 30px rgba(0, 255, 255, 0.2)
    `;
    
    setTimeout(() => {
        button.style.boxShadow = '';
    }, 300);
}

function createNeonExplosion(event, button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'neon-particle';
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 4px;
            height: 4px;
            background: #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 10px #00ffff;
            animation: neonParticle 0.8s ease-out forwards;
            --end-x: ${endX}px;
            --end-y: ${endY}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 800);
    }
}

function createTextGlow(link) {
    link.style.textShadow = '0 0 20px #00ffff, 0 0 40px #00ffff';
    
    setTimeout(() => {
        link.style.textShadow = '0 0 10px #00ffff';
    }, 200);
}

function initGridAnimations() {
    // 鼠标移动时的网格响应
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        updateGridAnimation(mouseX, mouseY);
        updateNeonLines(mouseX, mouseY);
    });

    // 定期更新网格动画
    setInterval(() => {
        randomizeGridAnimation();
    }, 3000);
}

function updateGridAnimation(mouseX, mouseY) {
    const gridOverlay = document.querySelector('.grid-overlay');
    if (gridOverlay) {
        const intensity = mouseX * mouseY;
        gridOverlay.style.opacity = 0.1 + intensity * 0.3;
        gridOverlay.style.animationDuration = (20 - intensity * 10) + 's';
    }
}

function updateNeonLines(mouseX, mouseY) {
    const neonLines = document.querySelectorAll('.neon-line');
    neonLines.forEach((line, index) => {
        const factor = (index + 1) * 0.2;
        const intensity = (mouseX + mouseY) * factor;
        line.style.opacity = 0.1 + intensity * 0.7;
        line.style.boxShadow = `0 0 ${10 + intensity * 30}px #00ffff`;
    });
}

function randomizeGridAnimation() {
    const gridOverlay = document.querySelector('.grid-overlay');
    if (gridOverlay) {
        const randomDuration = 15 + Math.random() * 10;
        gridOverlay.style.animationDuration = randomDuration + 's';
    }
}

function initTypewriterEffect() {
    const titles = document.querySelectorAll('.card-header h2');
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            title.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(typeInterval);
                // 添加光标闪烁效果
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                cursor.textContent = '_';
                title.appendChild(cursor);
                
                setTimeout(() => {
                    title.removeChild(cursor);
                }, 2000);
            }
        }, 100);
    });
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes neonPulse {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(1.1);
        }
    }
    
    @keyframes scanline {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(40px);
            opacity: 0;
        }
    }
    
    @keyframes neonFlicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
    }
    
    @keyframes neonParticle {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0);
        }
    }
    
    .typing-cursor {
        animation: cursorBlink 1s infinite;
    }
    
    @keyframes cursorBlink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);
