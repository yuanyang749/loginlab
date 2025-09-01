// 手绘风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    initPageAnimations();
    initInteractiveEffects();
    initSketchAnimations();
});

function initPageAnimations() {
    const sketchCard = document.querySelector('.sketch-card');
    if (sketchCard) {
        sketchCard.style.opacity = '0';
        sketchCard.style.transform = 'translateY(50px) scale(0.8) rotate(-5deg)';
        
        setTimeout(() => {
            sketchCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            sketchCard.style.opacity = '1';
            sketchCard.style.transform = 'translateY(0) scale(1) rotate(-1deg)';
        }, 300);
    }

    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-30px) rotate(-5deg)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.8s ease-out';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0) rotate(-2deg)';
        }, 500);
    }

    const doodles = document.querySelectorAll('.sketch-doodle');
    doodles.forEach((doodle, index) => {
        doodle.style.opacity = '0';
        doodle.style.transform = 'scale(0) rotate(0deg)';
        
        setTimeout(() => {
            doodle.style.transition = 'all 1.2s ease-out';
            doodle.style.opacity = '1';
            const rotation = Math.random() * 40 - 20;
            doodle.style.transform = `scale(1) rotate(${rotation}deg)`;
        }, 700 + index * 200);
    });

    const lines = document.querySelectorAll('.sketch-line');
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'scaleX(0)';
        
        setTimeout(() => {
            line.style.transition = 'all 1s ease-out';
            line.style.opacity = '1';
            line.style.transform = 'scaleX(1)';
        }, 1000 + index * 300);
    });
}

function initInteractiveEffects() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(-3px) rotate(0.5deg)';
                input.style.boxShadow = '3px 3px 0px rgba(231, 76, 60, 0.3)';
                input.style.transform = 'rotate(0deg)';
                createSketchStroke(input);
            }
        });

        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(0) rotate(0deg)';
                input.style.boxShadow = 'none';
                input.style.transform = 'rotate(-0.5deg)';
            }
        });

        input.addEventListener('input', () => {
            if (input.value) {
                input.style.color = '#2c3e50';
                input.style.fontWeight = 'bold';
                // 添加手写效果
                const jitter = Math.random() * 2 - 1;
                input.style.transform = `rotate(${jitter * 0.5}deg)`;
            } else {
                input.style.color = '#7f8c8d';
                input.style.fontWeight = 'normal';
                input.style.transform = 'rotate(-0.5deg)';
            }
        });
    });

    const buttons = document.querySelectorAll('.sketch-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createSketchSplash(button, e);
        });

        button.addEventListener('mouseenter', () => {
            const rotation = Math.random() * 4 - 2;
            button.style.transform = `rotate(${rotation}deg) translateY(-2px)`;
            button.style.filter = 'brightness(1.1) saturate(1.2)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'rotate(-1deg) translateY(0)';
            button.style.filter = 'brightness(1) saturate(1)';
        });
    });

    const card = document.querySelector('.sketch-card');
    if (card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02) rotate(0deg)';
            card.style.filter = 'brightness(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotate(-1deg)';
            card.style.filter = 'brightness(1)';
        });
    }
}

function initSketchAnimations() {
    const doodles = document.querySelectorAll('.sketch-doodle');
    doodles.forEach(doodle => {
        setInterval(() => {
            const rotation = Math.random() * 40 - 20;
            const scale = Math.random() * 0.2 + 0.9;
            doodle.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        }, Math.random() * 5000 + 3000);
    });

    const lines = document.querySelectorAll('.sketch-line');
    lines.forEach(line => {
        setInterval(() => {
            const opacity = Math.random() * 0.2 + 0.1;
            const scaleX = Math.random() * 0.3 + 0.85;
            const rotation = Math.random() * 10 - 5;
            line.style.opacity = opacity;
            line.style.transform = `scaleX(${scaleX}) rotate(${rotation}deg)`;
        }, Math.random() * 4000 + 2000);
    });

    createSketchTexture();
    startHandDrawingEffect();
}

function createSketchStroke(element) {
    const stroke = document.createElement('div');
    
    stroke.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: none;
        border: 3px solid #e74c3c;
        border-radius: 15px;
        animation: sketchStroke 1s ease-out;
        pointer-events: none;
        z-index: 5;
        transform: rotate(${Math.random() * 4 - 2}deg);
    `;
    
    element.style.position = 'relative';
    element.appendChild(stroke);
    
    setTimeout(() => {
        stroke.remove();
    }, 1000);
}

function createSketchSplash(button, event) {
    const splash = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    splash.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(231, 76, 60, 0.8) 0%, rgba(243, 156, 18, 0.4) 50%, transparent 70%);
        border-radius: 50%;
        animation: sketchSplash 0.8s ease-out;
        pointer-events: none;
        z-index: 10;
        transform: rotate(${Math.random() * 360}deg);
    `;
    
    button.style.position = 'relative';
    button.appendChild(splash);
    
    // 创建手绘线条
    for (let i = 0; i < 6; i++) {
        const line = document.createElement('div');
        const angle = (i * 60) * Math.PI / 180;
        const length = 20 + Math.random() * 15;
        const thickness = Math.random() * 3 + 1;
        
        line.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${length}px;
            height: ${thickness}px;
            background: #2c3e50;
            border-radius: ${thickness}px;
            animation: sketchLine 1s ease-out forwards;
            pointer-events: none;
            z-index: 11;
            transform-origin: 0 50%;
            --angle: ${angle}rad;
        `;
        
        button.appendChild(line);
        
        setTimeout(() => {
            line.remove();
        }, 1000);
    }
    
    setTimeout(() => {
        splash.remove();
    }, 800);
}

function createSketchTexture() {
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
        opacity: 0.05;
        mix-blend-mode: multiply;
    `;
    
    document.body.appendChild(canvas);
    
    function drawSketchTexture() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制手绘线条
        for (let i = 0; i < 50; i++) {
            const x1 = Math.random() * canvas.width;
            const y1 = Math.random() * canvas.height;
            const x2 = x1 + (Math.random() * 100 - 50);
            const y2 = y1 + (Math.random() * 100 - 50);
            
            ctx.strokeStyle = `rgba(44, 62, 80, ${Math.random() * 0.3})`;
            ctx.lineWidth = Math.random() * 3 + 1;
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            
            // 添加手绘的不规则性
            const steps = 5;
            for (let j = 1; j <= steps; j++) {
                const t = j / steps;
                const x = x1 + (x2 - x1) * t + (Math.random() * 10 - 5);
                const y = y1 + (y2 - y1) * t + (Math.random() * 10 - 5);
                ctx.lineTo(x, y);
            }
            
            ctx.stroke();
        }
        
        // 绘制手绘圆圈
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = Math.random() * 30 + 10;
            
            ctx.strokeStyle = `rgba(44, 62, 80, ${Math.random() * 0.2})`;
            ctx.lineWidth = Math.random() * 2 + 1;
            
            ctx.beginPath();
            // 手绘不完美的圆
            for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
                const r = radius + Math.random() * 5 - 2.5;
                const px = x + Math.cos(angle) * r;
                const py = y + Math.sin(angle) * r;
                
                if (angle === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }
            ctx.stroke();
        }
    }
    
    drawSketchTexture();
    setInterval(drawSketchTexture, 10000);
}

function startHandDrawingEffect() {
    // 模拟手绘过程的动态效果
    const elements = document.querySelectorAll('.sketch-card, .sketch-btn');
    
    elements.forEach(element => {
        setInterval(() => {
            const jitter = Math.random() * 2 - 1;
            element.style.transform += ` translate(${jitter * 0.5}px, ${jitter * 0.5}px)`;
            
            setTimeout(() => {
                element.style.transform = element.style.transform.replace(/translate\([^)]*\)/g, '');
            }, 100);
        }, Math.random() * 3000 + 2000);
    });
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes sketchStroke {
        0% {
            opacity: 0;
            transform: scale(0.8) rotate(${Math.random() * 10 - 5}deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.1) rotate(${Math.random() * 10 - 5}deg);
        }
        100% {
            opacity: 0;
            transform: scale(1) rotate(${Math.random() * 10 - 5}deg);
        }
    }
    
    @keyframes sketchSplash {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
        }
    }
    
    @keyframes sketchLine {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--angle)) scaleX(0);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--angle)) scaleX(1);
        }
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .sketch-card {
        transition: all 0.3s ease;
    }
    
    input {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    console.log('✏️ 手绘风格登录页面加载完成');
    console.log('🎨 特色：手绘线条，涂鸦元素，随性设计');
});

// 模拟铅笔绘制效果
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.05) { // 5%概率创建铅笔痕迹
        createPencilMark(e.clientX, e.clientY);
    }
});

function createPencilMark(x, y) {
    const mark = document.createElement('div');
    mark.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(44, 62, 80, 0.1);
        border-radius: 50%;
        pointer-events: none;
        z-index: 3;
        animation: pencilFade 3s ease-out forwards;
        transform: rotate(${Math.random() * 360}deg);
    `;
    
    document.body.appendChild(mark);
    
    setTimeout(() => {
        mark.remove();
    }, 3000);
}

// 添加铅笔痕迹淡出动画
const pencilStyle = document.createElement('style');
pencilStyle.textContent = `
    @keyframes pencilFade {
        0% {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(2) rotate(180deg);
        }
    }
`;
document.head.appendChild(pencilStyle);
