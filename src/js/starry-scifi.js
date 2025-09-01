// 星空科幻风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化页面动画
    initPageAnimations();
    
    // 初始化科幻效果
    initSciFiEffects();
    
    // 初始化星空动画
    initStarryAnimations();
    
    // 初始化粒子系统
    initParticleSystem();
});

function initPageAnimations() {
    // 卡片入场动画
    const scifiCard = document.querySelector('.scifi-card');
    if (scifiCard) {
        scifiCard.style.opacity = '0';
        scifiCard.style.transform = 'translateY(50px) scale(0.8)';
        
        setTimeout(() => {
            scifiCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            scifiCard.style.opacity = '1';
            scifiCard.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-50px) scale(0.8)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.8s ease';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0) scale(1)';
        }, 400);
    }

    // 星系图标动画
    const galaxyIcon = document.querySelector('.galaxy-icon');
    if (galaxyIcon) {
        galaxyIcon.style.opacity = '0';
        galaxyIcon.style.transform = 'scale(0) rotate(-360deg)';
        
        setTimeout(() => {
            galaxyIcon.style.transition = 'all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            galaxyIcon.style.opacity = '1';
            galaxyIcon.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
    }
}

function initSciFiEffects() {
    // 输入框科幻效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            createLaserScan(input);
            addHologramEffect(input);
        });

        input.addEventListener('blur', () => {
            removeLaserScan(input);
        });

        // 输入时的能量脉冲
        input.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                createEnergyPulse(e.target);
            }
        });
    });

    // 按钮科幻效果
    const buttons = document.querySelectorAll('.scifi-btn, .scifi-btn-small');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            createButtonCharge(button);
        });

        button.addEventListener('click', (e) => {
            createEnergyBlast(e, button);
        });
    });

    // 链接科幻效果
    const links = document.querySelectorAll('.scifi-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            createHologramGlow(link);
        });
    });
}

function createLaserScan(element) {
    const formGroup = element.closest('.form-group');
    if (formGroup) {
        formGroup.style.filter = 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))';
        formGroup.style.transform = 'scale(1.02)';
        formGroup.style.transition = 'all 0.3s ease';
        
        // 添加扫描线效果
        const scanLine = document.createElement('div');
        scanLine.className = 'laser-scan';
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #FFD700, transparent);
            animation: laserScan 1s ease-in-out;
        `;
        
        formGroup.appendChild(scanLine);
        element.scanLine = scanLine;
    }
}

function removeLaserScan(element) {
    const formGroup = element.closest('.form-group');
    if (formGroup) {
        formGroup.style.filter = '';
        formGroup.style.transform = 'scale(1)';
        
        if (element.scanLine) {
            formGroup.removeChild(element.scanLine);
            element.scanLine = null;
        }
    }
}

function addHologramEffect(input) {
    const rect = input.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        const hologram = document.createElement('div');
        hologram.textContent = '◆';
        hologram.style.cssText = `
            position: fixed;
            left: ${rect.right - 20}px;
            top: ${rect.top + rect.height / 2}px;
            color: #FFD700;
            font-size: ${10 + Math.random() * 8}px;
            pointer-events: none;
            z-index: 1000;
            animation: hologramFloat 2s ease-out forwards;
            animation-delay: ${i * 0.3}s;
        `;
        
        document.body.appendChild(hologram);
        
        setTimeout(() => {
            document.body.removeChild(hologram);
        }, 2000);
    }
}

function createEnergyPulse(input) {
    const rect = input.getBoundingClientRect();
    const pulse = document.createElement('div');
    
    pulse.style.cssText = `
        position: fixed;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top + Math.random() * rect.height}px;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #FFD700, #FFA500);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: energyPulse 1s ease-out forwards;
    `;
    
    document.body.appendChild(pulse);
    
    setTimeout(() => {
        document.body.removeChild(pulse);
    }, 1000);
}

function createButtonCharge(button) {
    button.style.background = 'rgba(255, 215, 0, 0.3)';
    button.style.boxShadow = '0 0 25px rgba(255, 215, 0, 0.7), inset 0 0 25px rgba(255, 215, 0, 0.2)';
    
    setTimeout(() => {
        button.style.background = 'rgba(255, 215, 0, 0.1)';
        button.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5), inset 0 0 20px rgba(255, 215, 0, 0.1)';
    }, 200);
}

function createEnergyBlast(event, button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const energySymbols = ['⚡', '✦', '◆', '▲', '●'];
    
    for (let i = 0; i < 12; i++) {
        const energy = document.createElement('div');
        energy.textContent = energySymbols[Math.floor(Math.random() * energySymbols.length)];
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 80;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        energy.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            color: #FFD700;
            font-size: 16px;
            pointer-events: none;
            z-index: 1000;
            animation: energyBlast 1.5s ease-out forwards;
            --end-x: ${endX}px;
            --end-y: ${endY}px;
        `;
        
        document.body.appendChild(energy);
        
        setTimeout(() => {
            document.body.removeChild(energy);
        }, 1500);
    }
}

function createHologramGlow(link) {
    link.style.textShadow = '0 0 20px #FFD700, 0 0 40px #FFD700';
    link.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        link.style.textShadow = '0 0 10px #FFD700';
        link.style.transform = 'scale(1)';
    }, 200);
}

function initStarryAnimations() {
    // 鼠标移动时的星空响应
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        updateStarAnimations(mouseX, mouseY);
        updateNebulaEffect(mouseX, mouseY);
    });

    // 定期添加新星星
    setInterval(() => {
        addRandomStar();
    }, 3000);

    // 定期添加流星
    setInterval(() => {
        addRandomMeteor();
    }, 8000);
}

function updateStarAnimations(mouseX, mouseY) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        const factor = (index + 1) * 0.1;
        const intensity = mouseX * mouseY * factor;
        
        star.style.opacity = 0.3 + intensity * 0.7;
        star.style.boxShadow = `0 0 ${5 + intensity * 15}px #FFD700`;
        
        const offsetX = (mouseX - 0.5) * 20 * factor;
        const offsetY = (mouseY - 0.5) * 15 * factor;
        star.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + intensity * 0.5})`;
    });
}

function updateNebulaEffect(mouseX, mouseY) {
    const nebula = document.querySelector('.nebula');
    if (nebula) {
        const intensity = mouseX * mouseY;
        nebula.style.opacity = 0.3 + intensity * 0.3;
        
        const hue1 = 270 + (mouseX * 60);
        const hue2 = 240 + (mouseY * 90);
        
        nebula.style.background = `
            radial-gradient(circle at ${30 + mouseX * 40}% ${70 - mouseY * 40}%, 
                hsla(${hue1}, 70%, 50%, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${70 - mouseX * 40}% ${30 + mouseY * 40}%, 
                hsla(${hue2}, 80%, 40%, 0.1) 0%, transparent 50%)
        `;
    }
}

function addRandomStar() {
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) return;
    
    const star = document.createElement('div');
    star.className = 'star extra-star';
    
    const size = 2 + Math.random() * 3;
    star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation-delay: 0s;
        animation-duration: ${2 + Math.random() * 4}s;
    `;
    
    starsContainer.appendChild(star);
    
    setTimeout(() => {
        starsContainer.removeChild(star);
    }, 6000);
}

function addRandomMeteor() {
    const meteorsContainer = document.querySelector('.meteors-container');
    if (!meteorsContainer) return;
    
    const meteor = document.createElement('div');
    meteor.className = 'meteor extra-meteor';
    
    meteor.style.cssText = `
        top: ${Math.random() * 50}%;
        left: ${80 + Math.random() * 20}%;
        animation-delay: 0s;
        animation-duration: ${6 + Math.random() * 4}s;
    `;
    
    meteorsContainer.appendChild(meteor);
    
    setTimeout(() => {
        meteorsContainer.removeChild(meteor);
    }, 10000);
}

function initParticleSystem() {
    // 点击页面时产生粒子爆炸
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.scifi-card')) {
            createParticleExplosion(e);
        }
    });

    // 定期产生随机粒子
    setInterval(() => {
        createRandomParticle();
    }, 2000);
}

function createParticleExplosion(event) {
    const symbols = ['✦', '◆', '▲', '●', '⚡'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const endX = event.clientX + Math.cos(angle) * distance;
        const endY = event.clientY + Math.sin(angle) * distance;
        
        particle.style.cssText = `
            position: fixed;
            left: ${event.clientX}px;
            top: ${event.clientY}px;
            color: #FFD700;
            font-size: ${12 + Math.random() * 8}px;
            pointer-events: none;
            z-index: 1000;
            animation: particleExplosion 2s ease-out forwards;
            --end-x: ${endX}px;
            --end-y: ${endY}px;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 2000);
    }
}

function createRandomParticle() {
    const particle = document.createElement('div');
    particle.textContent = '✦';
    particle.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 20}px;
        color: #FFD700;
        font-size: ${8 + Math.random() * 6}px;
        pointer-events: none;
        z-index: 1;
        animation: randomParticle 8s linear forwards;
        opacity: 0.7;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        document.body.removeChild(particle);
    }, 8000);
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes laserScan {
        0% {
            transform: translateY(0);
            opacity: 1;
        }
        100% {
            transform: translateY(40px);
            opacity: 0;
        }
    }
    
    @keyframes hologramFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.5);
        }
    }
    
    @keyframes energyPulse {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes energyBlast {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0.3);
        }
    }
    
    @keyframes particleExplosion {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0.5) rotate(360deg);
        }
    }
    
    @keyframes randomParticle {
        0% {
            opacity: 0.7;
            transform: translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) rotate(720deg);
        }
    }
    
    .extra-star {
        animation: starTwinkle 3s ease-in-out infinite;
    }
    
    .extra-meteor {
        animation: meteorFall 8s linear infinite;
    }
`;
document.head.appendChild(style);
