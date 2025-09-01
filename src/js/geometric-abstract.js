// 几何抽象风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    initPageAnimations();
    initInteractiveEffects();
    initGeometricAnimations();
});

function initPageAnimations() {
    const geometricCard = document.querySelector('.geometric-card');
    if (geometricCard) {
        geometricCard.style.opacity = '0';
        geometricCard.style.transform = 'translateY(50px) scale(0.8)';
        geometricCard.style.clipPath = 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)';
        
        setTimeout(() => {
            geometricCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            geometricCard.style.opacity = '1';
            geometricCard.style.transform = 'translateY(0) scale(1)';
            geometricCard.style.clipPath = 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))';
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

    const geometricShapes = document.querySelectorAll('.geometric-shape');
    geometricShapes.forEach((shape, index) => {
        shape.style.opacity = '0';
        shape.style.transform = 'scale(0) rotate(0deg)';
        
        setTimeout(() => {
            shape.style.transition = 'all 1.2s ease-out';
            shape.style.opacity = '1';
            shape.style.transform = 'scale(1) rotate(360deg)';
        }, 700 + index * 150);
    });

    const lines = document.querySelectorAll('.line');
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'scaleX(0)';
        
        setTimeout(() => {
            line.style.transition = 'all 1s ease-out';
            line.style.opacity = '1';
            line.style.transform = 'scaleX(1)';
        }, 1000 + index * 200);
    });
}

function initInteractiveEffects() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(-3px)';
                input.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                createGeometricPulse(input);
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
                input.style.color = '#667eea';
                input.style.fontWeight = 'bold';
            } else {
                input.style.color = '#333333';
                input.style.fontWeight = 'normal';
            }
        });
    });

    const buttons = document.querySelectorAll('.geometric-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createGeometricExplosion(button, e);
        });

        button.addEventListener('mouseenter', () => {
            button.style.filter = 'brightness(1.1) contrast(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.filter = 'brightness(1) contrast(1)';
        });
    });

    const card = document.querySelector('.geometric-card');
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

function initGeometricAnimations() {
    const shapes = document.querySelectorAll('.geometric-shape');
    shapes.forEach(shape => {
        setInterval(() => {
            const rotation = Math.random() * 360;
            const scale = Math.random() * 0.2 + 0.9;
            shape.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        }, Math.random() * 4000 + 2000);
    });

    const lines = document.querySelectorAll('.line');
    lines.forEach(line => {
        setInterval(() => {
            const opacity = Math.random() * 0.4 + 0.6;
            const scaleX = Math.random() * 0.3 + 0.85;
            line.style.opacity = opacity;
            line.style.transform = `scaleX(${scaleX})`;
        }, Math.random() * 3000 + 1500);
    });

    createGeometricPatterns();
}

function createGeometricPulse(element) {
    const pulse = document.createElement('div');
    
    pulse.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
        clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
        animation: geometricPulse 1s ease-out;
        pointer-events: none;
        z-index: 5;
    `;
    
    element.style.position = 'relative';
    element.appendChild(pulse);
    
    setTimeout(() => {
        pulse.remove();
    }, 1000);
}

function createGeometricExplosion(button, event) {
    const explosion = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    explosion.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(240, 147, 251, 0.4) 50%, transparent 70%);
        animation: geometricExplosion 0.8s ease-out;
        pointer-events: none;
        z-index: 10;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    `;
    
    button.style.position = 'relative';
    button.appendChild(explosion);
    
    // 创建几何碎片
    for (let i = 0; i < 8; i++) {
        const fragment = document.createElement('div');
        const angle = (i * 45) * Math.PI / 180;
        const distance = 40 + Math.random() * 20;
        const shapeType = Math.floor(Math.random() * 3);
        
        let clipPath;
        switch(shapeType) {
            case 0: // 三角形
                clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                break;
            case 1: // 正方形
                clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
                break;
            case 2: // 六边形
                clipPath = 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)';
                break;
        }
        
        fragment.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            clip-path: ${clipPath};
            animation: geometricFragment 1s ease-out forwards;
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
        explosion.remove();
    }, 800);
}

function createGeometricPatterns() {
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
    
    function drawGeometricPatterns() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制几何图形
        for (let i = 0; i < 12; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 30 + 10;
            const shapeType = Math.floor(Math.random() * 4);
            
            ctx.fillStyle = `rgba(102, 126, 234, ${Math.random() * 0.3})`;
            ctx.strokeStyle = `rgba(118, 75, 162, ${Math.random() * 0.5})`;
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            switch(shapeType) {
                case 0: // 圆形
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    break;
                case 1: // 正方形
                    ctx.rect(x - size/2, y - size/2, size, size);
                    break;
                case 2: // 三角形
                    ctx.moveTo(x, y - size/2);
                    ctx.lineTo(x - size/2, y + size/2);
                    ctx.lineTo(x + size/2, y + size/2);
                    ctx.closePath();
                    break;
                case 3: // 六边形
                    for (let j = 0; j < 6; j++) {
                        const angle = (j * 60) * Math.PI / 180;
                        const px = x + Math.cos(angle) * size/2;
                        const py = y + Math.sin(angle) * size/2;
                        if (j === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    break;
            }
            
            if (Math.random() > 0.5) {
                ctx.fill();
            } else {
                ctx.stroke();
            }
        }
        
        // 绘制连接线
        for (let i = 0; i < 6; i++) {
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const x2 = Math.random() * canvas.width;
            const y2 = Math.random() * canvas.height;
            
            ctx.strokeStyle = `rgba(240, 147, 251, ${Math.random() * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    
    drawGeometricPatterns();
    setInterval(drawGeometricPatterns, 6000);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes geometricPulse {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
        }
        100% {
            opacity: 0;
            transform: scale(1);
        }
    }
    
    @keyframes geometricExplosion {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
        }
    }
    
    @keyframes geometricFragment {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(
                calc(-50% + cos(var(--angle)) * var(--distance)), 
                calc(-50% + sin(var(--angle)) * var(--distance))
            ) scale(0) rotate(360deg);
        }
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .geometric-card {
        transition: all 0.3s ease;
    }
    
    input {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    console.log('🔷 几何抽象风格登录页面加载完成');
    console.log('🎨 特色：几何图形，抽象设计，现代艺术');
});

// 动态几何变换
let transformationPhase = 0;
setInterval(() => {
    transformationPhase = (transformationPhase + 1) % 4;
    
    const shapes = document.querySelectorAll('.geometric-shape');
    shapes.forEach((shape, index) => {
        const delay = index * 100;
        setTimeout(() => {
            switch(transformationPhase) {
                case 0:
                    shape.style.transform = 'scale(1) rotate(0deg)';
                    break;
                case 1:
                    shape.style.transform = 'scale(1.2) rotate(90deg)';
                    break;
                case 2:
                    shape.style.transform = 'scale(0.8) rotate(180deg)';
                    break;
                case 3:
                    shape.style.transform = 'scale(1.1) rotate(270deg)';
                    break;
            }
        }, delay);
    });
}, 8000);
