// 🏰 梦幻童话王国登录页面 - 高级魔法交互系统
// ✨ 欢迎来到充满魔法的童话世界 🧚‍♀️

class FairyTaleApp {
    constructor() {
        this.isLoaded = false;
        this.magicParticles = [];
        this.maxParticles = 30;
        this.animationId = null;
        this.canvas = null;
        this.ctx = null;
        
        this.init();
    }

    init() {
        console.log('🏰 初始化童话王国...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startMagic());
        } else {
            this.startMagic();
        }
    }

    startMagic() {
        this.initParticleCanvas();
        this.initPageAnimations();
        this.initInteractiveEffects();
        this.initAdvancedMagic();
        this.initKeyboardMagic();
        this.startAmbientMagic();
        this.showWelcomeMagic();
        
        this.isLoaded = true;
        console.log('✨ 童话王国魔法系统启动完成！');
    }

    // 🎨 粒子画布系统
    initParticleCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
        `;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });

        this.startParticleAnimation();
    }

    createParticle(x, y, options = {}) {
        if (this.magicParticles.length >= this.maxParticles) {
            this.magicParticles.shift();
        }

        const particle = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * (options.velocity || 2),
            vy: (Math.random() - 0.5) * (options.velocity || 2) - 1,
            size: Math.random() * (options.size || 4) + 2,
            color: options.color || this.getRandomColor(),
            life: 1,
            decay: options.decay || 0.02,
            type: options.type || 'circle'
        };

        this.magicParticles.push(particle);
    }

    getRandomColor() {
        const colors = ['#FFD700', '#FF69B4', '#8A2BE2', '#00FFFF', '#FF1493', '#9370DB'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    startParticleAnimation() {
        const animate = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.magicParticles = this.magicParticles.filter(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.05;
                particle.life -= particle.decay;

                this.ctx.globalAlpha = particle.life;
                this.ctx.fillStyle = particle.color;
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = particle.color;

                if (particle.type === 'star') {
                    this.drawStar(particle.x, particle.y, particle.size);
                } else {
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    this.ctx.fill();
                }

                this.ctx.globalAlpha = 1;
                this.ctx.shadowBlur = 0;

                return particle.life > 0;
            });

            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }

    drawStar(x, y, radius) {
        const spikes = 5;
        const outerRadius = radius;
        const innerRadius = radius * 0.4;
        
        this.ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const angle = (i * Math.PI) / spikes;
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            const pointX = x + Math.cos(angle) * r;
            const pointY = y + Math.sin(angle) * r;
            
            if (i === 0) this.ctx.moveTo(pointX, pointY);
            else this.ctx.lineTo(pointX, pointY);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    // 🎪 页面动画初始化
    initPageAnimations() {
        const card = document.querySelector('.fairy-card');
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.8)';
            
            setTimeout(() => {
                card.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 300);
        }

        const sparkles = document.querySelectorAll('.sparkle');
        sparkles.forEach((sparkle, index) => {
            sparkle.style.opacity = '0';
            setTimeout(() => {
                sparkle.style.transition = 'all 1s ease-out';
                sparkle.style.opacity = '1';
            }, 500 + index * 200);
        });
    }

    // ✨ 交互效果
    initInteractiveEffects() {
        // 输入框魔法
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => this.onInputFocus(e));
            input.addEventListener('input', (e) => this.onInputChange(e));
            input.addEventListener('blur', (e) => this.onInputBlur(e));
        });

        // 按钮魔法
        const buttons = document.querySelectorAll('button, .fairy-btn, .verify-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.onButtonClick(e));
            button.addEventListener('mouseenter', (e) => this.onButtonHover(e));
        });

        // 卡片魔法
        const card = document.querySelector('.fairy-card');
        if (card) {
            card.addEventListener('mouseenter', () => this.onCardHover(card));
        }
    }

    onInputFocus(e) {
        const rect = e.target.getBoundingClientRect();
        
        // 创建聚焦粒子
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createParticle(
                    rect.left + Math.random() * rect.width,
                    rect.top + rect.height / 2,
                    { size: 3, color: '#00FFFF', velocity: 1 }
                );
            }, i * 50);
        }

        // 输入框发光
        e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.6)';
    }

    onInputChange(e) {
        const rect = e.target.getBoundingClientRect();
        
        // 打字星星效果
        if (Math.random() > 0.7) {
            this.createParticle(
                rect.right - 15,
                rect.top + rect.height / 2,
                { size: 2, color: '#FFD700', type: 'star', velocity: 0.5 }
            );
        }
    }

    onInputBlur(e) {
        e.target.style.boxShadow = '';
    }

    onButtonClick(e) {
        const rect = e.target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 爆炸效果
        for (let i = 0; i < 15; i++) {
            this.createParticle(centerX, centerY, {
                size: Math.random() * 5 + 3,
                velocity: Math.random() * 6 + 2,
                type: 'star',
                color: this.getRandomColor()
            });
        }

        // 按钮缩放效果
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }

    onButtonHover(e) {
        const rect = e.target.getBoundingClientRect();
        
        // 悬停光环
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = rect.left + rect.width / 2 + Math.cos(angle) * rect.width * 0.4;
            const y = rect.top + rect.height / 2 + Math.sin(angle) * rect.height * 0.4;
            
            setTimeout(() => {
                this.createParticle(x, y, {
                    size: 3,
                    color: '#FF69B4',
                    velocity: 0.3,
                    decay: 0.03
                });
            }, i * 100);
        }
    }

    onCardHover(card) {
        const rect = card.getBoundingClientRect();
        
        // 卡片光环粒子
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const radius = Math.max(rect.width, rect.height) * 0.5;
            const x = rect.left + rect.width / 2 + Math.cos(angle) * radius;
            const y = rect.top + rect.height / 2 + Math.sin(angle) * radius;
            
            setTimeout(() => {
                this.createParticle(x, y, {
                    size: 4,
                    color: '#8A2BE2',
                    velocity: 0.2,
                    type: 'star'
                });
            }, i * 50);
        }
    }

    // 🎮 高级魔法系统
    initAdvancedMagic() {
        // 鼠标轨迹魔法
        document.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.1) {
                this.createParticle(e.clientX, e.clientY, {
                    size: 2,
                    velocity: 0.5,
                    decay: 0.05
                });
            }
        });

        // 点击魔法
        document.addEventListener('click', (e) => {
            this.createClickMagic(e.clientX, e.clientY);
        });
    }

    createClickMagic(x, y) {
        // 冲击波粒子
        for (let i = 0; i < 10; i++) {
            this.createParticle(x, y, {
                size: Math.random() * 4 + 2,
                velocity: Math.random() * 4 + 1,
                type: 'star',
                color: this.getRandomColor()
            });
        }

        // 创建视觉冲击波
        const shockwave = document.createElement('div');
        shockwave.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0;
            height: 0;
            border: 2px solid rgba(255, 215, 0, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9998;
            animation: shockwaveExpand 0.6s ease-out forwards;
        `;

        document.body.appendChild(shockwave);
        setTimeout(() => shockwave.remove(), 600);
    }

    // ⌨️ 键盘魔法
    initKeyboardMagic() {
        let spellBuffer = '';
        
        document.addEventListener('keydown', (e) => {
            spellBuffer += e.key.toLowerCase();
            
            // 检查魔法咒语
            if (spellBuffer.includes('magic')) {
                this.castMagicSpell();
                spellBuffer = '';
            } else if (spellBuffer.includes('sparkle')) {
                this.castSparkleSpell();
                spellBuffer = '';
            }
            
            // 清除过长的缓冲区
            if (spellBuffer.length > 20) {
                spellBuffer = spellBuffer.slice(-10);
            }
        });
    }

    castMagicSpell() {
        console.log('✨ 魔法咒语生效！');
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createParticle(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    {
                        size: Math.random() * 6 + 3,
                        velocity: Math.random() * 3 + 1,
                        type: 'star',
                        color: this.getRandomColor()
                    }
                );
            }, i * 100);
        }
    }

    castSparkleSpell() {
        console.log('💫 闪光咒语生效！');
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            this.createParticle(
                centerX + Math.cos(angle) * 150,
                centerY + Math.sin(angle) * 150,
                {
                    size: 4,
                    velocity: 2,
                    color: '#FFD700',
                    type: 'star'
                }
            );
        }
    }

    // 🌟 环境魔法
    startAmbientMagic() {
        // 随机粒子生成
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createParticle(
                    Math.random() * window.innerWidth,
                    window.innerHeight + 10,
                    {
                        size: Math.random() * 3 + 1,
                        velocity: -0.5,
                        decay: 0.01,
                        color: this.getRandomColor()
                    }
                );
            }
        }, 1000);

        // 定期魔法爆发
        setInterval(() => {
            this.createMagicBurst();
        }, 15000);
    }

    createMagicBurst() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createParticle(x, y, {
                    size: Math.random() * 5 + 2,
                    velocity: Math.random() * 3 + 1,
                    type: 'star',
                    color: this.getRandomColor()
                });
            }, i * 50);
        }
    }

    // 🎪 欢迎魔法
    showWelcomeMagic() {
        console.log('🏰 欢迎来到梦幻童话王国！');
        
        // 创建欢迎粒子爆炸
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                this.createParticle(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    {
                        size: Math.random() * 6 + 3,
                        velocity: Math.random() * 4 + 1,
                        type: 'star',
                        color: this.getRandomColor(),
                        decay: 0.02
                    }
                );
            }, i * 50);
        }
    }
}

// 🎨 动态样式注入
const magicStyles = document.createElement('style');
magicStyles.textContent = `
    @keyframes shockwaveExpand {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 200px; height: 200px; opacity: 0; }
    }
    
    @keyframes fairyFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .fairy-card {
        animation: fairyFloat 3s ease-in-out infinite;
    }
    
    .sparkle {
        animation: sparkleRotate 2s linear infinite;
    }
    
    @keyframes sparkleRotate {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.2); }
        100% { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(magicStyles);

// 🌟 启动童话王国
const fairyTaleApp = new FairyTaleApp();

window.addEventListener('load', () => {
    console.log('🧚 梦幻童话王国登录页面加载完成');
    console.log('🎨 包含：粒子系统、交互魔法、键盘咒语、环境效果');
});
