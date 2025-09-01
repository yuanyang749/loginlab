// 自然有机风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    initPageAnimations();
    initInteractiveEffects();
    initNatureAnimations();
});

function initPageAnimations() {
    const natureCard = document.querySelector('.nature-card');
    if (natureCard) {
        natureCard.style.opacity = '0';
        natureCard.style.transform = 'translateY(50px) scale(0.8)';
        
        setTimeout(() => {
            natureCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            natureCard.style.opacity = '1';
            natureCard.style.transform = 'translateY(0) scale(1)';
        }, 300);
    }

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

    const organicShapes = document.querySelectorAll('.organic-shape');
    organicShapes.forEach((shape, index) => {
        shape.style.opacity = '0';
        shape.style.transform = 'scale(0)';
        
        setTimeout(() => {
            shape.style.transition = 'all 1.2s ease-out';
            shape.style.opacity = '1';
            shape.style.transform = 'scale(1)';
        }, 700 + index * 200);
    });

    const decorations = document.querySelectorAll('.leaf-decoration, .flower-decoration');
    decorations.forEach((decoration, index) => {
        decoration.style.opacity = '0';
        decoration.style.transform = 'scale(0) rotate(0deg)';
        
        setTimeout(() => {
            decoration.style.transition = 'all 1s ease-out';
            decoration.style.opacity = '1';
            decoration.style.transform = 'scale(1) rotate(360deg)';
        }, 1000 + index * 150);
    });
}

function initInteractiveEffects() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(-3px)';
                input.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.3)';
                createNatureRipple(input);
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(0)';
                input.style.boxShadow = 'none';
            }
        });

        input.addEventListener('input', () => {
            if (input.value) {
                input.style.color = '#2e7d32';
                input.style.fontWeight = '500';
            } else {
                input.style.color = '#4caf50';
                input.style.fontWeight = 'normal';
            }
        });
    });

    const buttons = document.querySelectorAll('.nature-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createNatureBloom(button, e);
        });

        button.addEventListener('mouseenter', () => {
            button.style.filter = 'brightness(1.1) saturate(1.2)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.filter = 'brightness(1) saturate(1)';
        });
    });

    const card = document.querySelector('.nature-card');
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

function initNatureAnimations() {
    const organicShapes = document.querySelectorAll('.organic-shape');
    organicShapes.forEach(shape => {
        setInterval(() => {
            const scale = Math.random() * 0.1 + 0.95;
            const rotation = Math.random() * 10 - 5;
            shape.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        }, Math.random() * 3000 + 2000);
    });

    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        setInterval(() => {
            const opacity = Math.random() * 0.3 + 0.7;
            const scale = Math.random() * 0.5 + 1;
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
        }, Math.random() * 2000 + 1000);
    });

    createNatureBreeze();
}

function createNatureRipple(element) {
    const ripple = document.createElement('div');
    
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(76, 175, 80, 0.4) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: natureRipple 1s ease-out;
        pointer-events: none;
        z-index: 5;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

function createNatureBloom(button, event) {
    const bloom = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    bloom.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(76, 175, 80, 0.8) 0%, rgba(139, 195, 74, 0.4) 50%, transparent 70%);
        border-radius: 50%;
        animation: natureBloom 0.8s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    button.style.position = 'relative';
    button.appendChild(bloom);
    
    // 创建花瓣效果
    for (let i = 0; i < 5; i++) {
        const petal = document.createElement('div');
        const angle = (i * 72) * Math.PI / 180;
        const distance = 30 + Math.random() * 20;
        
        petal.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: #4caf50;
            border-radius: 50%;
            animation: naturePetal 1s ease-out forwards;
            pointer-events: none;
            z-index: 11;
            --angle: ${angle};
            --distance: ${distance}px;
        `;
        
        button.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 1000);
    }
    
    setTimeout(() => {
        bloom.remove();
    }, 800);
}

function createNatureBreeze() {
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
    
    function drawNatureElements() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制叶子轨迹
        for (let i = 0; i < 8; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 15 + 5;
            
            ctx.fillStyle = `rgba(76, 175, 80, ${Math.random() * 0.3})`;
            ctx.beginPath();
            ctx.ellipse(x, y, size, size * 0.6, Math.random() * Math.PI, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // 绘制花朵
        for (let i = 0; i < 5; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 8 + 3;
            
            ctx.fillStyle = `rgba(139, 195, 74, ${Math.random() * 0.4})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    drawNatureElements();
    setInterval(drawNatureElements, 8000);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes natureRipple {
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
    
    @keyframes natureBloom {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            width: 150px;
            height: 150px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
        }
    }
    
    @keyframes naturePetal {
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
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .nature-card {
        transition: all 0.3s ease;
    }
    
    input {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    console.log('🌿 自然有机风格登录页面加载完成');
    console.log('🎨 特色：有机形状，自然元素，生态友好设计');
});

// 季节变化效果
let currentSeason = 0;
const seasons = ['spring', 'summer', 'autumn', 'winter'];
const seasonColors = [
    ['#a8e6cf', '#4caf50'], // 春天
    ['#ffd54f', '#ff8a65'], // 夏天
    ['#ffb74d', '#d32f2f'], // 秋天
    ['#e1f5fe', '#90a4ae']  // 冬天
];

setInterval(() => {
    currentSeason = (currentSeason + 1) % 4;
    const colors = seasonColors[currentSeason];
    
    document.body.style.background = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    
    const decorations = document.querySelectorAll('.leaf-decoration, .flower-decoration');
    decorations.forEach(decoration => {
        decoration.style.filter = `hue-rotate(${currentSeason * 90}deg)`;
    });
}, 15000); // 每15秒换一个季节
