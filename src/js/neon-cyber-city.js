// 霓虹赛博城市风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 添加页面加载动画
    initPageAnimations();
    
    // 添加交互效果
    initInteractiveEffects();
    
    // 添加城市动态效果
    initCityEffects();
    
    // 添加赛博音效反馈
    initCyberSoundEffects();
});

function initPageAnimations() {
    // 赛博卡片入场动画
    const cyberCard = document.querySelector('.cyber-card');
    if (cyberCard) {
        cyberCard.style.opacity = '0';
        cyberCard.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            cyberCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            cyberCard.style.opacity = '1';
            cyberCard.style.transform = 'translateY(0) scale(1)';
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

    // 建筑物延迟显示
    const buildings = document.querySelectorAll('.building');
    buildings.forEach((building, index) => {
        building.style.opacity = '0';
        building.style.transform = 'translateY(50px)';
        setTimeout(() => {
            building.style.transition = 'all 0.8s ease';
            building.style.opacity = '1';
            building.style.transform = 'translateY(0)';
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
                // 添加霓虹激活效果
                createNeonPulse(formGroup);
                formGroup.style.transform = 'scale(1.02)';
                formGroup.style.transition = 'transform 0.3s ease';
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'scale(1)';
            }
        });

        // 输入时的数字雨效果
        input.addEventListener('input', () => {
            createDigitalRain(input);
        });
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('.login-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createCyberRipple(e, button);
            addButtonGlow(button);
        });
    });

    // 链接悬停效果
    const cyberLinks = document.querySelectorAll('.cyber-link');
    cyberLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            createLinkGlitch(link);
        });
    });
}

function initCityEffects() {
    // 动态添加更多飞行汽车
    createDynamicFlyingCars();
    
    // 霓虹招牌闪烁效果
    createNeonFlicker();
    
    // 全息广告动画
    animateHologramAds();
    
    // 随机建筑物闪烁
    startRandomBuildingFlash();
}

function initCyberSoundEffects() {
    // 模拟赛博音效（通过视觉反馈）
    const statusLed = document.querySelector('.status-led');
    if (statusLed) {
        setInterval(() => {
            statusLed.style.transform = 'scale(1.3)';
            setTimeout(() => {
                statusLed.style.transform = 'scale(1)';
            }, 100);
        }, 3000);
    }
    
    // 信号条动画
    const bars = document.querySelectorAll('.bar');
    setInterval(() => {
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transform = 'scaleY(1.5)';
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1)';
                }, 200);
            }, index * 100);
        });
    }, 4000);
}

function createNeonPulse(element) {
    const pulse = document.createElement('div');
    pulse.style.position = 'absolute';
    pulse.style.top = '0';
    pulse.style.left = '0';
    pulse.style.width = '100%';
    pulse.style.height = '2px';
    pulse.style.background = 'linear-gradient(90deg, transparent, #00ffff, #ff0080, transparent)';
    pulse.style.animation = 'neonPulse 0.6s ease-out';
    pulse.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(pulse);
    
    setTimeout(() => {
        pulse.remove();
    }, 600);
}

function createDigitalRain(input) {
    const rect = input.getBoundingClientRect();
    const digits = ['0', '1', '0', '1', '0', '1'];
    
    for (let i = 0; i < 3; i++) {
        const digit = document.createElement('div');
        digit.textContent = digits[Math.floor(Math.random() * digits.length)];
        digit.style.position = 'fixed';
        digit.style.left = rect.right - 30 + (i * 10) + 'px';
        digit.style.top = rect.top - 10 + 'px';
        digit.style.color = '#00ffff';
        digit.style.fontSize = '12px';
        digit.style.pointerEvents = 'none';
        digit.style.animation = 'digitalFall 0.8s ease-out forwards';
        digit.style.zIndex = '1000';
        digit.style.fontFamily = 'Orbitron, monospace';
        
        document.body.appendChild(digit);
        
        setTimeout(() => {
            digit.remove();
        }, 800);
    }
}

function createCyberRipple(e, button) {
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
    ripple.style.background = 'radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, rgba(255, 0, 128, 0.3) 50%, transparent 70%)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'cyberRipple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function addButtonGlow(button) {
    button.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
    setTimeout(() => {
        button.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.4)';
    }, 200);
}

function createLinkGlitch(link) {
    const originalText = link.textContent;
    const glitchChars = ['█', '▓', '▒', '░', '▄', '▀'];
    
    // 创建故障效果
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        if (glitchCount < 3) {
            const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            link.style.color = '#ff0080';
            link.style.textShadow = '2px 0 #00ffff, -2px 0 #ff0080';
            glitchCount++;
        } else {
            link.style.color = '#00ffff';
            link.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.5)';
            clearInterval(glitchInterval);
        }
    }, 50);
}

function createDynamicFlyingCars() {
    const flyingCars = document.querySelector('.flying-cars');
    const carEmojis = ['🚗', '🚙', '🚐', '🚕', '🚓'];
    
    setInterval(() => {
        const car = document.createElement('div');
        car.className = 'flying-car dynamic';
        car.textContent = carEmojis[Math.floor(Math.random() * carEmojis.length)];
        car.style.position = 'absolute';
        car.style.fontSize = '14px';
        car.style.filter = 'drop-shadow(0 0 8px #00ffff)';
        car.style.top = Math.random() * 60 + 20 + '%';
        car.style.left = '-50px';
        car.style.animation = 'flyAcross 6s linear forwards';
        
        flyingCars.appendChild(car);
        
        setTimeout(() => {
            car.remove();
        }, 6000);
    }, 4000);
}

function createNeonFlicker() {
    const neonSigns = document.querySelectorAll('.neon-sign');
    
    setInterval(() => {
        const randomSign = neonSigns[Math.floor(Math.random() * neonSigns.length)];
        if (randomSign) {
            randomSign.style.opacity = '0.3';
            setTimeout(() => {
                randomSign.style.opacity = '1';
            }, 100);
            setTimeout(() => {
                randomSign.style.opacity = '0.7';
            }, 200);
            setTimeout(() => {
                randomSign.style.opacity = '1';
            }, 300);
        }
    }, 2000);
}

function animateHologramAds() {
    const holograms = document.querySelectorAll('.hologram');
    
    setInterval(() => {
        holograms.forEach((hologram, index) => {
            setTimeout(() => {
                hologram.style.transform = 'translateY(-25px) scale(1.2)';
                hologram.style.opacity = '1';
                setTimeout(() => {
                    hologram.style.transform = 'translateY(0) scale(1)';
                    hologram.style.opacity = '0.7';
                }, 500);
            }, index * 800);
        });
    }, 6000);
}

function startRandomBuildingFlash() {
    const buildings = document.querySelectorAll('.building');
    
    setInterval(() => {
        const randomBuilding = buildings[Math.floor(Math.random() * buildings.length)];
        if (randomBuilding) {
            randomBuilding.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.8)';
            setTimeout(() => {
                randomBuilding.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.2)';
            }, 300);
        }
    }, 3000);
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes neonPulse {
        0% { transform: translateX(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes digitalFall {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(30px); }
    }
    
    @keyframes cyberRipple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
    }
`;
document.head.appendChild(style);
