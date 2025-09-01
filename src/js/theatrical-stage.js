// 戏剧舞台风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加动态背景效果
    initTheaterBackground();
    
    // 添加音效反馈
    initTheaterSounds();
});

function initPageAnimations() {
    // 帷幕拉开动画
    setTimeout(() => {
        const curtains = document.querySelectorAll('.curtain');
        curtains.forEach(curtain => {
            curtain.classList.add('open');
        });
    }, 500);

    // 剧院包厢入场动画
    const theaterBox = document.querySelector('.theater-box');
    if (theaterBox) {
        theaterBox.style.opacity = '0';
        theaterBox.style.transform = 'translateY(80px) scale(0.9)';
        
        setTimeout(() => {
            theaterBox.style.transition = 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            theaterBox.style.opacity = '1';
            theaterBox.style.transform = 'translateY(0) scale(1)';
        }, 1000);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.8s ease';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0)';
        }, 1200);
    }

    // 剧院灯光启动动画
    const theaterLights = document.querySelectorAll('.theater-light');
    theaterLights.forEach((light, index) => {
        setTimeout(() => {
            light.style.background = '#FFD700';
            light.style.boxShadow = '0 0 20px #FFD700';
            
            setTimeout(() => {
                if (!light.classList.contains('active')) {
                    light.style.background = 'rgba(255, 215, 0, 0.3)';
                    light.style.boxShadow = 'none';
                }
            }, 800);
        }, index * 300 + 1500);
    });

    // 聚光灯渐现
    const spotlights = document.querySelectorAll('.spotlight');
    spotlights.forEach((spotlight, index) => {
        spotlight.style.opacity = '0';
        setTimeout(() => {
            spotlight.style.transition = 'opacity 2s ease';
            spotlight.style.opacity = '1';
        }, index * 500 + 2000);
    });
}

function initInteractiveEffects() {
    // 输入框聚光灯效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1.03)';
                formGroup.style.transition = 'transform 0.4s ease';
                
                // 添加聚光灯照射效果
                createSpotlightEffect(input);
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1)';
            }
        });

        // 输入时的金色粒子效果
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                createGoldenParticles(e.target);
            }
        });

        // 键盘输入音效
        input.addEventListener('keydown', () => {
            playTypingSound();
        });
    });

    // 按钮帷幕效果
    const buttons = document.querySelectorAll('.login-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createCurtainEffect(e, button);
            playApplauseSound();
        });

        // 按钮悬停效果
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-4px) scale(1.02)';
            button.style.boxShadow = '0 12px 35px rgba(255, 215, 0, 0.6)';
            
            // 添加舞台灯光效果
            createStageLight(button);
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '0 5px 20px rgba(255, 215, 0, 0.3)';
        });
    });

    // 链接悬停效果
    const links = document.querySelectorAll('.additional-links a');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.1)';
            link.style.textShadow = '0 0 25px rgba(255, 215, 0, 1)';
            createLinkGlow(link);
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
            link.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.3)';
        });
    });
}

function createSpotlightEffect(input) {
    const rect = input.getBoundingClientRect();
    const spotlight = document.createElement('div');
    
    spotlight.style.cssText = `
        position: fixed;
        width: ${rect.width + 40}px;
        height: ${rect.height + 40}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 215, 0, 0.1) 40%, transparent 70%);
        left: ${rect.left - 20}px;
        top: ${rect.top - 20}px;
        pointer-events: none;
        z-index: 999;
        border-radius: 50%;
        animation: spotlightPulse 2s ease-in-out infinite;
    `;
    
    document.body.appendChild(spotlight);
    
    setTimeout(() => {
        document.body.removeChild(spotlight);
    }, 2000);
}

function createGoldenParticles(input) {
    const rect = input.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.right - 30 + Math.random() * 20}px;
            top: ${rect.top + rect.height / 2 + Math.random() * 20 - 10}px;
            animation: goldenFloat 2s ease-out forwards;
            box-shadow: 0 0 10px #FFD700;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 2000);
    }
}

function createCurtainEffect(event, button) {
    const curtain = button.querySelector('.btn-curtain');
    if (curtain) {
        curtain.style.left = '-100%';
        curtain.style.background = 'linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.4) 50%, transparent 100%)';
        
        setTimeout(() => {
            curtain.style.transition = 'left 0.8s ease';
            curtain.style.left = '100%';
        }, 10);
        
        setTimeout(() => {
            curtain.style.transition = 'none';
            curtain.style.background = 'linear-gradient(90deg, transparent 0%, rgba(139, 0, 0, 0.3) 50%, transparent 100%)';
        }, 810);
    }
}

function createStageLight(button) {
    const stageLight = document.createElement('div');
    stageLight.style.cssText = `
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        background: radial-gradient(ellipse, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
        border-radius: 15px;
        pointer-events: none;
        animation: stageLightPulse 1s ease-in-out infinite;
    `;
    
    button.style.position = 'relative';
    button.appendChild(stageLight);
    
    setTimeout(() => {
        button.removeChild(stageLight);
    }, 1000);
}

function createLinkGlow(link) {
    const glowEffect = document.createElement('div');
    glowEffect.style.cssText = `
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        background: linear-gradient(45deg, #FFD700, #FFA500, #FFD700);
        border-radius: 6px;
        opacity: 0.4;
        z-index: -1;
        animation: linkGlow 1.5s ease-in-out infinite;
    `;
    
    link.style.position = 'relative';
    link.appendChild(glowEffect);
    
    setTimeout(() => {
        link.removeChild(glowEffect);
    }, 1500);
}

function initTheaterBackground() {
    // 鼠标移动时的聚光灯跟随
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        updateSpotlightPositions(mouseX, mouseY);
        updateParticleMovement(mouseX, mouseY);
    });

    // 随机生成额外的金色粒子
    setInterval(() => {
        createRandomGoldenParticle();
    }, 3000);
    
    // 动态调整装饰元素
    setInterval(() => {
        updateOrnamentAnimation();
    }, 4000);
    
    // 添加额外的舞台烟雾
    createExtraSmoke();
}

function updateSpotlightPositions(mouseX, mouseY) {
    const spotlights = document.querySelectorAll('.spotlight');
    spotlights.forEach((spotlight, index) => {
        const factor = (index + 1) * 0.1;
        const offsetX = (mouseX - 0.5) * 50 * factor;
        const offsetY = (mouseY - 0.5) * 50 * factor;
        
        spotlight.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}

function updateParticleMovement(mouseX, mouseY) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const factor = (index + 1) * 0.05;
        const offsetX = (mouseX - 0.5) * 20 * factor;
        const offsetY = (mouseY - 0.5) * 20 * factor;
        
        particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}

function createRandomGoldenParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle extra-particle';
    
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #FFD700 0%, #FFA500 50%, transparent 70%);
        border-radius: 50%;
        top: ${startY}%;
        left: ${startX}%;
        animation: particleFloat 10s ease-in-out infinite;
        box-shadow: 0 0 15px #FFD700;
        opacity: ${Math.random() * 0.8 + 0.2};
    `;
    
    document.querySelector('.golden-particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 10000);
}

function updateOrnamentAnimation() {
    const ornaments = document.querySelectorAll('.ornament');
    ornaments.forEach(ornament => {
        const currentDelay = parseFloat(ornament.style.animationDelay) || 0;
        ornament.style.animationDelay = (currentDelay + Math.random() * 2) + 's';
    });
}

function createExtraSmoke() {
    const smokeContainer = document.querySelector('.stage-smoke');
    if (!smokeContainer) return;
    
    for (let i = 0; i < 3; i++) {
        const smoke = document.createElement('div');
        smoke.className = 'smoke-cloud extra-smoke';
        
        smoke.style.cssText = `
            position: absolute;
            bottom: 0;
            width: ${150 + Math.random() * 100}px;
            height: ${80 + Math.random() * 40}px;
            background: radial-gradient(ellipse, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: smokeRise ${12 + Math.random() * 6}s ease-in-out infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        
        smokeContainer.appendChild(smoke);
    }
}

function initTheaterSounds() {
    // 创建音频上下文（如果支持）
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        window.audioContext = new (AudioContext || webkitAudioContext)();
    }
}

function playTypingSound() {
    if (!window.audioContext) return;
    
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600 + Math.random() * 200, window.audioContext.currentTime);
    oscillator.type = 'triangle';
    
    gainNode.gain.setValueAtTime(0.05, window.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.15);
    
    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + 0.15);
}

function playApplauseSound() {
    if (!window.audioContext) return;
    
    // 创建掌声效果
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const oscillator = window.audioContext.createOscillator();
            const gainNode = window.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(window.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200 + Math.random() * 300, window.audioContext.currentTime);
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0.1, window.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.1);
            
            oscillator.start(window.audioContext.currentTime);
            oscillator.stop(window.audioContext.currentTime + 0.1);
        }, i * 50);
    }
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes spotlightPulse {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(1.1); }
    }
    
    @keyframes goldenFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0) rotate(360deg);
        }
    }
    
    @keyframes stageLightPulse {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.05); }
    }
    
    @keyframes linkGlow {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.02); }
    }
    
    .extra-smoke {
        animation: smokeRise 15s ease-in-out infinite;
    }
    
    .extra-particle {
        animation: particleFloat 12s ease-in-out infinite;
    }
    
    .form-group {
        transition: transform 0.4s ease;
    }
    
    .additional-links a {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
