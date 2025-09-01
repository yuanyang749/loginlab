// 工业风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    initPageAnimations();
    initInteractiveEffects();
    initIndustrialAnimations();
});

function initPageAnimations() {
    const industrialCard = document.querySelector('.industrial-card');
    if (industrialCard) {
        industrialCard.style.opacity = '0';
        industrialCard.style.transform = 'translateY(50px) scale(0.8)';
        industrialCard.style.filter = 'brightness(0.5)';
        
        setTimeout(() => {
            industrialCard.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            industrialCard.style.opacity = '1';
            industrialCard.style.transform = 'translateY(0) scale(1)';
            industrialCard.style.filter = 'brightness(1)';
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

    const steelPanels = document.querySelectorAll('.steel-panel');
    steelPanels.forEach((panel, index) => {
        panel.style.opacity = '0';
        panel.style.transform = 'scale(0) rotateY(90deg)';
        
        setTimeout(() => {
            panel.style.transition = 'all 1.2s ease-out';
            panel.style.opacity = '1';
            panel.style.transform = 'scale(1) rotateY(0deg)';
        }, 700 + index * 200);
    });

    const beams = document.querySelectorAll('.steel-beam');
    beams.forEach((beam, index) => {
        beam.style.opacity = '0';
        beam.style.transform = 'scaleX(0)';
        
        setTimeout(() => {
            beam.style.transition = 'all 1s ease-out';
            beam.style.opacity = '1';
            beam.style.transform = 'scaleX(1)';
        }, 1000 + index * 300);
    });

    const rivets = document.querySelectorAll('.rivet');
    rivets.forEach((rivet, index) => {
        rivet.style.opacity = '0';
        rivet.style.transform = 'scale(0)';
        
        setTimeout(() => {
            rivet.style.transition = 'all 0.5s ease-out';
            rivet.style.opacity = '1';
            rivet.style.transform = 'scale(1)';
        }, 1500 + index * 100);
    });
}

function initInteractiveEffects() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup) {
                formGroup.style.transform = 'translateY(-3px)';
                input.style.boxShadow = '0 0 15px rgba(160, 174, 192, 0.5)';
                createSteelSpark(input);
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
                input.style.color = '#e2e8f0';
                input.style.fontWeight = 'bold';
                input.style.textShadow = '1px 1px 2px rgba(0, 0, 0, 0.5)';
            } else {
                input.style.color = '#a0aec0';
                input.style.fontWeight = 'normal';
                input.style.textShadow = 'none';
            }
        });
    });

    const buttons = document.querySelectorAll('.industrial-btn, .verify-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            createSteelImpact(button, e);
        });

        button.addEventListener('mouseenter', () => {
            button.style.filter = 'brightness(1.2) contrast(1.1)';
            button.style.textShadow = '0 0 10px rgba(226, 232, 240, 0.8)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.filter = 'brightness(1) contrast(1)';
            button.style.textShadow = 'none';
        });
    });

    const card = document.querySelector('.industrial-card');
    if (card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.01)';
            card.style.filter = 'brightness(1.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.filter = 'brightness(1)';
        });
    }
}

function initIndustrialAnimations() {
    const panels = document.querySelectorAll('.steel-panel');
    panels.forEach(panel => {
        setInterval(() => {
            const brightness = Math.random() * 0.2 + 0.9;
            panel.style.filter = `brightness(${brightness})`;
        }, Math.random() * 4000 + 2000);
    });

    const rivets = document.querySelectorAll('.rivet');
    rivets.forEach(rivet => {
        setInterval(() => {
            const scale = Math.random() * 0.2 + 0.9;
            const opacity = Math.random() * 0.3 + 0.7;
            rivet.style.transform = `scale(${scale})`;
            rivet.style.opacity = opacity;
        }, Math.random() * 3000 + 1500);
    });

    const pipes = document.querySelectorAll('.pipe');
    pipes.forEach(pipe => {
        setInterval(() => {
            const vibration = Math.random() * 2 - 1;
            pipe.style.transform = `translateX(${vibration}px)`;
        }, 100);
    });

    createIndustrialSteam();
    startMachinerySound();
}

function createSteelSpark(element) {
    const spark = document.createElement('div');
    
    spark.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(160, 174, 192, 0.3), rgba(113, 128, 150, 0.3));
        border: 2px solid #a0aec0;
        animation: steelSpark 1s ease-out;
        pointer-events: none;
        z-index: 5;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
    `;
    
    element.style.position = 'relative';
    element.appendChild(spark);
    
    setTimeout(() => {
        spark.remove();
    }, 1000);
}

function createSteelImpact(button, event) {
    const impact = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    impact.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(226, 232, 240, 0.8) 0%, rgba(160, 174, 192, 0.4) 50%, transparent 70%);
        animation: steelImpact 0.8s ease-out;
        pointer-events: none;
        z-index: 10;
        box-shadow: 0 0 20px rgba(226, 232, 240, 0.5);
    `;
    
    button.style.position = 'relative';
    button.appendChild(impact);
    
    // 创建金属碎片
    for (let i = 0; i < 8; i++) {
        const fragment = document.createElement('div');
        const angle = (i * 45) * Math.PI / 180;
        const distance = 30 + Math.random() * 20;
        
        fragment.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #a0aec0, #718096);
            animation: steelFragment 1s ease-out forwards;
            pointer-events: none;
            z-index: 11;
            --angle: ${angle};
            --distance: ${distance}px;
            box-shadow: 0 0 5px rgba(160, 174, 192, 0.8);
        `;
        
        button.appendChild(fragment);
        
        setTimeout(() => {
            fragment.remove();
        }, 1000);
    }
    
    setTimeout(() => {
        impact.remove();
    }, 800);
}

function createIndustrialSteam() {
    const steamEffects = document.querySelectorAll('.steam-effect');
    
    steamEffects.forEach(steam => {
        setInterval(() => {
            // 创建蒸汽粒子
            const particle = document.createElement('div');
            const rect = steam.getBoundingClientRect();
            
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top}px;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: radial-gradient(circle, rgba(226, 232, 240, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 3;
                animation: steamRise 3s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }, Math.random() * 1000 + 500);
    });
}

function startMachinerySound() {
    // 模拟机械运转的视觉效果
    const panels = document.querySelectorAll('.steel-panel');
    
    setInterval(() => {
        panels.forEach(panel => {
            const intensity = Math.random();
            if (intensity > 0.8) {
                panel.style.boxShadow = 'inset 0 0 10px rgba(160, 174, 192, 0.5)';
                setTimeout(() => {
                    panel.style.boxShadow = '';
                }, 100);
            }
        });
    }, 200);
    
    // 模拟压力表指针摆动
    const rivets = document.querySelectorAll('.rivet');
    setInterval(() => {
        rivets.forEach(rivet => {
            const rotation = Math.random() * 20 - 10;
            rivet.style.transform = `scale(1) rotate(${rotation}deg)`;
        });
    }, 1000);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes steelSpark {
        0% {
            opacity: 0;
            transform: scale(0.8);
            filter: brightness(0.5);
        }
        50% {
            opacity: 1;
            transform: scale(1.1);
            filter: brightness(1.5);
        }
        100% {
            opacity: 0;
            transform: scale(1);
            filter: brightness(1);
        }
    }
    
    @keyframes steelImpact {
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
            transform: translate(-50%, -50%) scale(1.5);
        }
    }
    
    @keyframes steelFragment {
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
    
    @keyframes steamRise {
        0% {
            opacity: 0.6;
            transform: translateY(0px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(2);
        }
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .industrial-card {
        transition: all 0.3s ease;
    }
    
    input {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

window.addEventListener('load', () => {
    console.log('🏭 工业风格登录页面加载完成');
    console.log('🎨 特色：钢铁质感，机械元素，工业设计');
});

// 模拟工厂环境音效的视觉反馈
let machineRhythm = 0;
setInterval(() => {
    machineRhythm = (machineRhythm + 1) % 4;
    
    const beams = document.querySelectorAll('.steel-beam');
    beams.forEach((beam, index) => {
        if ((index + machineRhythm) % 2 === 0) {
            beam.style.filter = 'brightness(1.2)';
            setTimeout(() => {
                beam.style.filter = 'brightness(1)';
            }, 200);
        }
    });
}, 800);

// 压力释放效果
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const steamEffects = document.querySelectorAll('.steam-effect');
        steamEffects.forEach(steam => {
            steam.style.animation = 'steamBurst 0.5s ease-out';
            setTimeout(() => {
                steam.style.animation = '';
            }, 500);
        });
    }
});

// 添加压力释放动画
const pressureStyle = document.createElement('style');
pressureStyle.textContent = `
    @keyframes steamBurst {
        0% {
            transform: scale(1);
            opacity: 0.3;
        }
        50% {
            transform: scale(2);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 0.3;
        }
    }
`;
document.head.appendChild(pressureStyle);
