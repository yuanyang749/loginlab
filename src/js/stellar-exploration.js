// 星际探索风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加动态背景效果
    initStellarBackground();
    
    // 添加音效反馈
    initSoundEffects();
});

function initPageAnimations() {
    // 太空舱入场动画
    const spaceCapsule = document.querySelector('.space-capsule');
    if (spaceCapsule) {
        spaceCapsule.style.opacity = '0';
        spaceCapsule.style.transform = 'translateY(100px) scale(0.8)';
        
        setTimeout(() => {
            spaceCapsule.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            spaceCapsule.style.opacity = '1';
            spaceCapsule.style.transform = 'translateY(0) scale(1)';
        }, 300);
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
        }, 600);
    }

    // 状态灯启动动画
    const statusLights = document.querySelectorAll('.status-light');
    statusLights.forEach((light, index) => {
        setTimeout(() => {
            light.style.background = '#00ff88';
            light.style.boxShadow = '0 0 15px #00ff88';
            
            setTimeout(() => {
                if (!light.classList.contains('active')) {
                    light.style.background = 'rgba(255, 255, 255, 0.2)';
                    light.style.boxShadow = 'none';
                }
            }, 500);
        }, index * 200 + 800);
    });
}

function initInteractiveEffects() {
    // 输入框扫描效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1.02)';
                formGroup.style.transition = 'transform 0.3s ease';
                
                // 添加扫描线效果
                createScanEffect(input);
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1)';
            }
        });

        // 输入时的能量粒子效果
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                createEnergyParticles(e.target);
            }
        });

        // 键盘输入音效
        input.addEventListener('keydown', () => {
            playTypingSound();
        });
    });

    // 按钮能量波效果
    const buttons = document.querySelectorAll('.login-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createEnergyWave(e, button);
            playButtonSound();
        });

        // 按钮悬停效果
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
            button.style.boxShadow = '0 10px 30px rgba(100, 50, 200, 0.5)';
            
            // 添加能量充电效果
            chargeButton(button);
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '0 5px 20px rgba(100, 50, 200, 0.3)';
        });
    });

    // 链接悬停效果
    const links = document.querySelectorAll('.additional-links a');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.1)';
            link.style.textShadow = '0 0 20px rgba(0, 255, 136, 1)';
            createLinkGlow(link);
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
            link.style.textShadow = '0 0 10px rgba(0, 255, 136, 0.3)';
        });
    });
}

function createScanEffect(input) {
    const rect = input.getBoundingClientRect();
    const scanLine = document.createElement('div');
    
    scanLine.style.cssText = `
        position: fixed;
        width: ${rect.width}px;
        height: 2px;
        background: linear-gradient(90deg, transparent 0%, #00ff88 50%, transparent 100%);
        left: ${rect.left}px;
        top: ${rect.top}px;
        pointer-events: none;
        z-index: 1000;
        animation: scanMove 0.8s ease-out;
    `;
    
    document.body.appendChild(scanLine);
    
    setTimeout(() => {
        document.body.removeChild(scanLine);
    }, 800);
}

function createEnergyParticles(input) {
    const rect = input.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #00ff88 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.right - 20 + Math.random() * 10}px;
            top: ${rect.top + rect.height / 2 + Math.random() * 10 - 5}px;
            animation: energyFloat 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 1500);
    }
}

function createEnergyWave(event, button) {
    const energy = button.querySelector('.btn-energy');
    if (energy) {
        energy.style.left = '-100%';
        energy.style.background = 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 136, 0.6) 50%, transparent 100%)';
        
        setTimeout(() => {
            energy.style.transition = 'left 0.6s ease';
            energy.style.left = '100%';
        }, 10);
        
        setTimeout(() => {
            energy.style.transition = 'none';
            energy.style.background = 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)';
        }, 610);
    }
}

function chargeButton(button) {
    const chargeEffect = document.createElement('div');
    chargeEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 0%, rgba(0, 255, 136, 0.1) 50%, transparent 100%);
        border-radius: 10px;
        pointer-events: none;
        animation: chargeUp 0.5s ease-out;
    `;
    
    button.style.position = 'relative';
    button.appendChild(chargeEffect);
    
    setTimeout(() => {
        button.removeChild(chargeEffect);
    }, 500);
}

function createLinkGlow(link) {
    const glowEffect = document.createElement('div');
    glowEffect.style.cssText = `
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #00ff88, #0088ff, #00ff88);
        border-radius: 4px;
        opacity: 0.3;
        z-index: -1;
        animation: linkPulse 1s ease-in-out infinite;
    `;
    
    link.style.position = 'relative';
    link.appendChild(glowEffect);
    
    setTimeout(() => {
        link.removeChild(glowEffect);
    }, 1000);
}

function initStellarBackground() {
    // 鼠标移动时的星系响应
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        updateGalaxyPositions(mouseX, mouseY);
        updatePlanetSpeeds(mouseX, mouseY);
    });

    // 随机生成额外的流星
    setInterval(() => {
        createRandomMeteor();
    }, 5000);
    
    // 动态调整星星亮度
    setInterval(() => {
        updateStarBrightness();
    }, 3000);
    
    // 添加太空尘埃
    createExtraSpaceDust();
}

function updateGalaxyPositions(mouseX, mouseY) {
    const galaxies = document.querySelectorAll('.galaxy');
    galaxies.forEach((galaxy, index) => {
        const factor = (index + 1) * 0.05;
        const offsetX = (mouseX - 0.5) * 30 * factor;
        const offsetY = (mouseY - 0.5) * 30 * factor;
        
        galaxy.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
}

function updatePlanetSpeeds(mouseX, mouseY) {
    const orbits = document.querySelectorAll('.planet-orbit');
    orbits.forEach((orbit, index) => {
        const baseSpeed = [30, 45, 60][index];
        const speedMultiplier = 0.5 + (mouseX + mouseY) * 0.5;
        const newSpeed = baseSpeed * speedMultiplier;
        
        orbit.style.animationDuration = `${newSpeed}s`;
    });
}

function createRandomMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'meteor extra-meteor';
    
    const startX = Math.random() * 100;
    const startY = Math.random() * 50;
    
    meteor.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: linear-gradient(45deg, #ffffff 0%, #00ff88 50%, transparent 70%);
        border-radius: 50%;
        top: ${startY}%;
        left: ${startX}%;
        animation: meteorFall 4s linear forwards;
        box-shadow: 0 0 10px #00ff88;
    `;
    
    document.querySelector('.meteors').appendChild(meteor);
    
    setTimeout(() => {
        meteor.remove();
    }, 4000);
}

function updateStarBrightness() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        const brightness = Math.random();
        star.style.opacity = brightness;
        star.style.boxShadow = `0 0 ${brightness * 10}px rgba(255, 255, 255, ${brightness})`;
    });
}

function createExtraSpaceDust() {
    const dustContainer = document.querySelector('.space-dust');
    if (!dustContainer) return;
    
    for (let i = 0; i < 10; i++) {
        const dust = document.createElement('div');
        dust.className = 'dust-particle extra-dust';
        
        dust.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: dustFloat ${8 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 8}s;
        `;
        
        dustContainer.appendChild(dust);
    }
}

function initSoundEffects() {
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
    
    oscillator.frequency.setValueAtTime(800 + Math.random() * 200, window.audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, window.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.1);
    
    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + 0.1);
}

function playButtonSound() {
    if (!window.audioContext) return;
    
    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, window.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, window.audioContext.currentTime + 0.2);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.2, window.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, window.audioContext.currentTime + 0.2);
    
    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + 0.2);
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes scanMove {
        0% { transform: translateY(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(${document.querySelector('input')?.offsetHeight || 50}px); opacity: 0; }
    }
    
    @keyframes energyFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0) rotate(180deg);
        }
    }
    
    @keyframes chargeUp {
        0% { opacity: 0; transform: scale(0.8); }
        50% { opacity: 0.5; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(1); }
    }
    
    @keyframes linkPulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.05); }
    }
    
    .extra-dust {
        animation: dustFloat 12s ease-in-out infinite;
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .additional-links a {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
