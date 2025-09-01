// 🦠 网络朋克病毒感染风格 JavaScript

class CyberVirusInfection {
    constructor() {
        this.matrixCanvas = document.getElementById('matrixCanvas');
        this.virusCanvas = document.getElementById('virusCanvas');
        this.matrixCtx = this.matrixCanvas.getContext('2d');
        this.virusCtx = this.virusCanvas.getContext('2d');
        
        this.matrixDrops = [];
        this.virusParticles = [];
        this.systemCorrupted = false;
        this.infectionLevel = 0;
        this.hackingInProgress = false;
        
        this.mousePos = { x: 0, y: 0 };
        
        this.init();
    }

    init() {
        this.setupCanvases();
        this.initMatrixRain();
        this.initVirusParticles();
        this.bindEvents();
        this.startAnimations();
        this.showSystemWarning();
        this.initMouseTracking();
        this.startSystemMonitoring();
        this.playAmbientHacking();
    }

    // 设置画布
    setupCanvases() {
        const resize = () => {
            this.matrixCanvas.width = window.innerWidth;
            this.matrixCanvas.height = window.innerHeight;
            this.virusCanvas.width = window.innerWidth;
            this.virusCanvas.height = window.innerHeight;
        };
        
        resize();
        window.addEventListener('resize', resize);
    }

    // 初始化矩阵代码雨
    initMatrixRain() {
        const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.matrixChars = chars.split('');
        
        const columns = Math.floor(this.matrixCanvas.width / 20);
        this.matrixDrops = [];
        
        for (let i = 0; i < columns; i++) {
            this.matrixDrops[i] = {
                y: Math.random() * this.matrixCanvas.height,
                speed: Math.random() * 3 + 2,
                char: this.getRandomChar(),
                opacity: Math.random()
            };
        }
    }

    getRandomChar() {
        return this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
    }

    // 绘制矩阵代码雨
    drawMatrixRain() {
        this.matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.matrixCtx.fillRect(0, 0, this.matrixCanvas.width, this.matrixCanvas.height);
        
        this.matrixCtx.font = '15px Source Code Pro';
        
        for (let i = 0; i < this.matrixDrops.length; i++) {
            const drop = this.matrixDrops[i];
            
            // 绿色主要字符
            this.matrixCtx.fillStyle = `rgba(0, 255, 65, ${drop.opacity})`;
            this.matrixCtx.fillText(drop.char, i * 20, drop.y);
            
            // 红色病毒字符（随机出现）
            if (Math.random() < 0.02) {
                this.matrixCtx.fillStyle = `rgba(255, 0, 65, ${drop.opacity + 0.3})`;
                this.matrixCtx.fillText('🦠', i * 20, drop.y - 20);
            }
            
            // 更新位置
            drop.y += drop.speed;
            
            if (drop.y > this.matrixCanvas.height && Math.random() > 0.975) {
                drop.y = 0;
                drop.char = this.getRandomChar();
                drop.opacity = Math.random();
            }
        }
    }

    // 初始化病毒粒子系统
    initVirusParticles() {
        this.virusParticles = [];
        
        for (let i = 0; i < 50; i++) {
            this.createVirusParticle();
        }
    }

    createVirusParticle() {
        this.virusParticles.push({
            x: Math.random() * this.virusCanvas.width,
            y: Math.random() * this.virusCanvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: Math.random() < 0.7 ? '#00ff41' : '#ff0041',
            life: Math.random() * 100 + 50,
            maxLife: 100,
            infected: false,
            connections: []
        });
    }

    // 绘制病毒粒子系统
    drawVirusParticles() {
        this.virusCtx.clearRect(0, 0, this.virusCanvas.width, this.virusCanvas.height);
        
        // 更新粒子
        for (let i = this.virusParticles.length - 1; i >= 0; i--) {
            const particle = this.virusParticles[i];
            
            // 移动粒子
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 边界反弹
            if (particle.x < 0 || particle.x > this.virusCanvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.virusCanvas.height) particle.vy *= -1;
            
            // 生命周期
            particle.life--;
            if (particle.life <= 0) {
                this.virusParticles.splice(i, 1);
                continue;
            }
            
            // 绘制粒子
            const alpha = particle.life / particle.maxLife;
            this.virusCtx.beginPath();
            this.virusCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.virusCtx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            this.virusCtx.fill();
            
            // 病毒感染效果
            if (particle.infected) {
                this.virusCtx.beginPath();
                this.virusCtx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                this.virusCtx.strokeStyle = '#ff0041' + '44';
                this.virusCtx.stroke();
            }
        }
        
        // 绘制连接线
        this.drawParticleConnections();
        
        // 创建新粒子
        if (Math.random() < 0.1) {
            this.createVirusParticle();
        }
    }

    drawParticleConnections() {
        for (let i = 0; i < this.virusParticles.length; i++) {
            for (let j = i + 1; j < this.virusParticles.length; j++) {
                const p1 = this.virusParticles[i];
                const p2 = this.virusParticles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const alpha = (100 - distance) / 100 * 0.3;
                    this.virusCtx.beginPath();
                    this.virusCtx.moveTo(p1.x, p1.y);
                    this.virusCtx.lineTo(p2.x, p2.y);
                    this.virusCtx.strokeStyle = `rgba(0, 255, 65, ${alpha})`;
                    this.virusCtx.stroke();
                }
            }
        }
    }

    // 鼠标跟踪和粒子效果
    initMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
            
            // 创建鼠标跟随粒子（降低频率避免性能问题）
            if (Math.random() < 0.1) {
                this.createMouseParticle(e.clientX, e.clientY);
            }
        });
    }

    createMouseParticle(x, y) {
        this.virusParticles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            size: Math.random() * 2 + 1,
            color: '#ff0041',
            life: 30,
            maxLife: 30,
            infected: true,
            connections: []
        });
    }

    // 绑定事件
    bindEvents() {
        // 登录表单事件
        this.bindFormEvents();
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
        
        // 窗口失焦事件（模拟病毒活动）
        window.addEventListener('blur', () => {
            this.triggerSystemCorruption();
        });
        
        window.addEventListener('focus', () => {
            this.recoverSystem();
        });
    }

    bindFormEvents() {
        // 登录表单
        const loginForm = document.querySelector('#loginForm form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleVirusLogin();
            });
        }

        // 注册表单
        const registerForm = document.querySelector('#registerForm form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleVirusRegister();
            });
        }

        // 忘记密码表单
        const forgotForm = document.querySelector('#forgotPasswordForm form');
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleVirusRecover();
            });
        }

        // 发送验证码
        const sendCodeBtn = document.getElementById('sendCode');
        if (sendCodeBtn) {
            sendCodeBtn.addEventListener('click', () => {
                this.sendVirusCode();
            });
        }

        // 输入框病毒感染效果
        document.querySelectorAll('.virus-input').forEach(input => {
            input.addEventListener('focus', () => {
                this.infectInput(input);
            });
            
            input.addEventListener('input', () => {
                this.corruptInput(input);
            });
        });

        // 按钮病毒效果
        document.querySelectorAll('.virus-button').forEach(button => {
            button.addEventListener('click', () => {
                this.virusButtonEffect(button);
            });
        });
    }

    // 处理键盘按键
    handleKeyPress(e) {
        // Ctrl + Alt + V - 触发病毒爆发
        if (e.ctrlKey && e.altKey && e.key === 'v') {
            e.preventDefault();
            this.triggerVirusOutbreak();
        }
        
        // Esc - 系统净化
        if (e.key === 'Escape') {
            this.purgeSystem();
        }
        
        // F12 - 黑客模式
        if (e.key === 'F12') {
            e.preventDefault();
            this.enterHackerMode();
        }
    }

    // 病毒登录处理
    handleVirusLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            this.showVirusError('访问代码不完整，病毒载体无法建立连接');
            return;
        }

        this.hackingInProgress = true;
        this.simulateHacking();
        
        setTimeout(() => {
            this.hackingInProgress = false;
            
            if (username === 'virus' && password === 'infection') {
                this.showVirusSuccess('病毒感染成功！系统已被完全控制');
                setTimeout(() => {
                    this.completeInfection();
                }, 3000);
            } else if (username === 'admin' && password === 'admin') {
                this.showVirusSuccess('管理员权限获取成功！正在植入后门...');
                setTimeout(() => {
                    this.completeInfection();
                }, 3000);
            } else {
                this.showVirusError('病毒签名验证失败，目标系统防护过强');
                this.triggerSystemCorruption();
            }
        }, 3000);
    }

    // 病毒注册处理
    handleVirusRegister() {
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;
        
        if (!username || !email || !password || !confirmPassword) {
            this.showVirusError('载体参数不完整，无法完成病毒编译');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showVirusError('病毒基因序列不匹配，载体创建失败');
            return;
        }

        this.hackingInProgress = true;
        this.simulateVirusCreation();
        
        setTimeout(() => {
            this.hackingInProgress = false;
            this.showVirusSuccess('病毒载体创建成功！正在部署到目标网络...');
            setTimeout(() => {
                this.switchToLogin();
            }, 2000);
        }, 4000);
    }

    // 病毒恢复处理
    handleVirusRecover() {
        const email = document.getElementById('forgot-email').value;
        const verificationCode = document.getElementById('verification-code').value;
        const newPassword = document.getElementById('new-password').value;
        
        if (!email || !verificationCode || !newPassword) {
            this.showVirusError('恢复参数不完整，病毒修复协议终止');
            return;
        }

        this.hackingInProgress = true;
        this.simulateVirusRecovery();
        
        setTimeout(() => {
            this.hackingInProgress = false;
            this.showVirusSuccess('病毒恢复完成！新的感染载体已部署');
            setTimeout(() => {
                this.switchToLogin();
            }, 2000);
        }, 3500);
    }

    // 发送病毒验证码
    sendVirusCode() {
        const email = document.getElementById('forgot-email').value;
        if (!email) {
            this.showVirusError('通信频道未建立，无法发送病毒载荷');
            return;
        }

        const sendCodeBtn = document.getElementById('sendCode');
        sendCodeBtn.disabled = true;
        sendCodeBtn.querySelector('.button-text').textContent = '传播中...';
        
        // 模拟病毒传播过程
        setTimeout(() => {
            sendCodeBtn.querySelector('.button-text').textContent = '已投放';
            this.showVirusSuccess('病毒载荷已投放到目标通道');
            
            // 倒计时
            let countdown = 60;
            const timer = setInterval(() => {
                sendCodeBtn.querySelector('.button-text').textContent = `${countdown}秒冷却`;
                countdown--;
                
                if (countdown < 0) {
                    clearInterval(timer);
                    sendCodeBtn.disabled = false;
                    sendCodeBtn.querySelector('.button-text').textContent = '发送病毒';
                }
            }, 1000);
        }, 2000);
    }

    // 模拟黑客入侵过程
    simulateHacking() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        const messages = [
            '>>> 初始化病毒载体...',
            '>>> 扫描目标防火墙...',
            '>>> 发现安全漏洞 CVE-2024-VIRUS',
            '>>> 注入恶意代码...',
            '>>> 绕过入侵检测系统...',
            '>>> 提升权限到ROOT...',
            '>>> 植入持久化后门...',
            '>>> 建立命令控制通道...'
        ];
        
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                if (index < messages.length) {
                    line.textContent = messages[index];
                    line.style.color = index < 4 ? '#00ff41' : '#ff0041';
                }
            }, index * 400);
        });
    }

    simulateVirusCreation() {
        const terminalLines = document.querySelectorAll('#registerForm .terminal-line');
        const messages = [
            '>>> 启动载体生成程序...',
            '>>> 编译病毒基因序列...',
            '>>> 加密通信协议...',
            '>>> 测试感染能力...',
            '>>> 优化传播算法...',
            '>>> 部署到病毒库...'
        ];
        
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                if (index < messages.length) {
                    line.textContent = messages[index];
                }
            }, index * 600);
        });
    }

    simulateVirusRecovery() {
        const terminalLines = document.querySelectorAll('#forgotPasswordForm .terminal-line');
        const messages = [
            '>>> 启动恢复协议...',
            '>>> 扫描备份病毒库...',
            '>>> 验证病毒签名...',
            '>>> 重建感染载体...',
            '>>> 更新加密算法...'
        ];
        
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                if (index < messages.length) {
                    line.textContent = messages[index];
                }
            }, index * 700);
        });
    }

    // 输入框感染效果
    infectInput(input) {
        input.style.borderColor = '#ff0041';
        input.style.boxShadow = '0 0 20px rgba(255, 0, 65, 0.8)';
        
        // 创建感染粒子
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createInfectionParticle(input);
            }, i * 100);
        }
    }

    createInfectionParticle(element) {
        const rect = element.getBoundingClientRect();
        this.virusParticles.push({
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 3,
            size: Math.random() * 3 + 1,
            color: '#ff0041',
            life: 60,
            maxLife: 60,
            infected: true,
            connections: []
        });
    }

    // 输入损坏效果
    corruptInput(input) {
        if (Math.random() < 0.1) {
            const corruption = input.nextElementSibling;
            if (corruption && corruption.classList.contains('input-corruption')) {
                corruption.style.opacity = '1';
                setTimeout(() => {
                    corruption.style.opacity = '0';
                }, 200);
            }
        }
    }

    // 按钮病毒效果
    virusButtonEffect(button) {
        button.style.transform = 'scale(0.95)';
        button.style.boxShadow = '0 0 30px rgba(255, 0, 65, 0.8)';
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.boxShadow = '';
        }, 150);
        
        // 播放病毒音效
        this.playVirusSound();
    }

    // 表单切换
    switchToLogin() {
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('forgotPasswordForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
    }

    switchToRegister() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('forgotPasswordForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
    }

    switchToForgotPassword() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('forgotPasswordForm').classList.remove('hidden');
    }

    // 显示病毒错误
    showVirusError(message) {
        const errorDialog = document.getElementById('errorDialog');
        const errorMessage = document.getElementById('errorMessage');
        
        if (errorMessage) errorMessage.textContent = message;
        if (errorDialog) {
            errorDialog.classList.remove('hidden');
            this.playErrorSound();
        }
    }

    hideErrorDialog() {
        const errorDialog = document.getElementById('errorDialog');
        if (errorDialog) errorDialog.classList.add('hidden');
    }

    // 显示病毒成功
    showVirusSuccess(message) {
        const successDialog = document.getElementById('successDialog');
        const successMessage = document.getElementById('successMessage');
        
        if (successMessage) successMessage.textContent = message;
        if (successDialog) {
            successDialog.classList.remove('hidden');
            this.playSuccessSound();
        }
    }

    hideSuccessDialog() {
        const successDialog = document.getElementById('successDialog');
        if (successDialog) successDialog.classList.add('hidden');
    }

    // 显示系统警告
    showSystemWarning() {
        setTimeout(() => {
            const warning = document.getElementById('systemWarning');
            if (warning) {
                warning.classList.remove('hidden');
            }
        }, 2000);
    }

    closeSystemWarning() {
        const warning = document.getElementById('systemWarning');
        if (warning) {
            warning.classList.add('hidden');
        }
    }

    // 系统损坏效果
    triggerSystemCorruption() {
        this.systemCorrupted = true;
        document.body.style.filter = 'hue-rotate(180deg) contrast(1.2)';
        
        // 增加病毒粒子
        for (let i = 0; i < 20; i++) {
            this.createVirusParticle();
        }
        
        // 显示损坏效果
        const corruption = document.querySelector('.system-corruption');
        if (corruption) {
            corruption.style.opacity = '0.3';
        }
    }

    recoverSystem() {
        this.systemCorrupted = false;
        document.body.style.filter = '';
        
        const corruption = document.querySelector('.system-corruption');
        if (corruption) {
            corruption.style.opacity = '0.1';
        }
    }

    // 病毒爆发
    triggerVirusOutbreak() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                this.createVirusParticle();
            }, i * 10);
        }
        
        this.showVirusSuccess('🦠 病毒爆发！系统正在被感染...');
        
        // 屏幕闪烁效果
        let flickers = 0;
        const flickerInterval = setInterval(() => {
            document.body.style.background = flickers % 2 === 0 ? '#ff0041' : '#000';
            flickers++;
            
            if (flickers > 10) {
                clearInterval(flickerInterval);
                document.body.style.background = '#000';
            }
        }, 100);
    }

    // 系统净化
    purgeSystem() {
        this.virusParticles = [];
        this.recoverSystem();
        this.showVirusSuccess('系统净化完成，病毒已被清除');
    }

    // 黑客模式
    enterHackerMode() {
        document.body.classList.add('hacker-mode');
        this.showVirusSuccess('黑客模式已激活！获得系统最高权限');
        
        // 加速所有动画
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.1s';
        });
    }

    // 完成感染
    completeInfection() {
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
                color: #ff0041;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: 'Source Code Pro', monospace;
                font-size: 24px;
                text-align: center;
                z-index: 10000;
            ">
                <div style="font-size: 48px; margin-bottom: 20px;">🦠</div>
                <div class="glitch-text" style="margin-bottom: 20px;">SYSTEM INFECTED</div>
                <div style="font-size: 16px; color: #00ff41;">病毒感染完成</div>
                <div style="font-size: 14px; margin-top: 20px; color: #666;">
                    按 F5 重新启动系统
                </div>
            </div>
        `;
    }

    // 系统监控
    startSystemMonitoring() {
        setInterval(() => {
            this.updateSystemStatus();
        }, 1000);
    }

    updateSystemStatus() {
        const cpuUsage = document.querySelector('.cpu-usage');
        const memUsage = document.querySelector('.mem-usage');
        const cpuFill = document.querySelector('.cpu-fill');
        const memFill = document.querySelector('.mem-fill');
        
        if (cpuUsage && memUsage) {
            const cpu = Math.floor(Math.random() * 20) + 80;
            const mem = Math.floor(Math.random() * 10) + 90;
            
            cpuUsage.textContent = cpu + '%';
            memUsage.textContent = mem + '%';
            
            if (cpuFill) cpuFill.style.width = cpu + '%';
            if (memFill) memFill.style.width = mem + '%';
        }
    }

    // 音效系统
    playVirusSound() {
        this.playTone(800, 0.1, 'square');
    }

    playErrorSound() {
        this.playTone(200, 0.3, 'sawtooth');
        setTimeout(() => this.playTone(150, 0.2, 'sawtooth'), 100);
    }

    playSuccessSound() {
        this.playTone(523, 0.2, 'sine');
        setTimeout(() => this.playTone(659, 0.2, 'sine'), 100);
        setTimeout(() => this.playTone(784, 0.3, 'sine'), 200);
    }

    playAmbientHacking() {
        const hackingSound = document.getElementById('hackingSound');
        if (hackingSound) {
            hackingSound.volume = 0.1;
            hackingSound.loop = true;
            hackingSound.play().catch(() => {});
        }
    }

    playTone(frequency, duration, waveType = 'sine') {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = waveType;
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            // 静默处理音效错误
        }
    }

    // 启动动画循环
    startAnimations() {
        const animate = () => {
            this.drawMatrixRain();
            this.drawVirusParticles();
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// 全局函数
function hideErrorDialog() {
    if (window.cyberVirusInfection) {
        window.cyberVirusInfection.hideErrorDialog();
    }
}

function hideSuccessDialog() {
    if (window.cyberVirusInfection) {
        window.cyberVirusInfection.hideSuccessDialog();
    }
}

function closeSystemWarning() {
    if (window.cyberVirusInfection) {
        window.cyberVirusInfection.closeSystemWarning();
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.cyberVirusInfection = new CyberVirusInfection();
    
    // 绑定共用登录系统的切换事件
    const toRegister = document.getElementById('toRegister');
    const toForgotPassword = document.getElementById('toForgotPassword');
    const backToLogin = document.getElementById('backToLogin');
    const backToLoginFromReset = document.getElementById('backToLoginFromReset');
    
    if (toRegister) {
        toRegister.addEventListener('click', () => {
            window.cyberVirusInfection.switchToRegister();
        });
    }
    
    if (toForgotPassword) {
        toForgotPassword.addEventListener('click', () => {
            window.cyberVirusInfection.switchToForgotPassword();
        });
    }
    
    if (backToLogin) {
        backToLogin.addEventListener('click', () => {
            window.cyberVirusInfection.switchToLogin();
        });
    }
    
    if (backToLoginFromReset) {
        backToLoginFromReset.addEventListener('click', () => {
            window.cyberVirusInfection.switchToLogin();
        });
    }
});