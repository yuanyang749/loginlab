// Windows 98 复古风格登录页面 JavaScript

class Windows98Login {
    constructor() {
        this.currentTime = document.getElementById('currentTime');
        this.windows = document.querySelectorAll('.window');
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.currentWindow = null;
        
        this.init();
    }

    init() {
        this.updateClock();
        this.bindEvents();
        this.initializeWindowSystem();
        this.playStartupSound();
        this.showLoginWindow();
    }

    // 更新时钟显示
    updateClock() {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            if (this.currentTime) {
                this.currentTime.textContent = `${hours}:${minutes}`;
            }
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    // 播放启动音效
    playStartupSound() {
        // 模拟Windows 98启动音效
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        const playTone = (frequency, duration, delay = 0) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            }, delay);
        };

        // Windows 98 风格的启动音效序列
        playTone(523, 0.2, 0);    // C5
        playTone(659, 0.3, 200);  // E5
        playTone(784, 0.4, 400);  // G5
        playTone(1047, 0.5, 600); // C6
    }

    // 绑定事件
    bindEvents() {
        // 桌面图标双击事件
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('dblclick', (e) => {
                this.handleIconDoubleClick(e.currentTarget);
            });
        });

        // 开始按钮点击事件
        const startButton = document.querySelector('.start-button');
        if (startButton) {
            startButton.addEventListener('click', () => {
                this.showStartMenu();
            });
        }

        // 窗口控制按钮事件
        this.bindWindowControls();

        // 表单提交事件
        this.bindFormEvents();

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // 右键菜单
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e);
        });

        // 点击隐藏右键菜单
        document.addEventListener('click', () => {
            this.hideContextMenu();
        });
    }

    // 初始化窗口系统
    initializeWindowSystem() {
        this.windows.forEach(window => {
            this.makeWindowDraggable(window);
            this.setupWindowZIndex(window);
        });
    }

    // 使窗口可拖拽
    makeWindowDraggable(windowElement) {
        const header = windowElement.querySelector('.window-header');
        if (!header) return;

        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('window-button')) return;
            
            this.isDragging = true;
            this.currentWindow = windowElement;
            
            const rect = windowElement.getBoundingClientRect();
            this.dragOffset = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            
            this.bringToFront(windowElement);
            
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            document.addEventListener('mouseup', this.handleMouseUp.bind(this));
            
            e.preventDefault();
        });
    }

    handleMouseMove(e) {
        if (!this.isDragging || !this.currentWindow) return;
        
        const x = e.clientX - this.dragOffset.x;
        const y = e.clientY - this.dragOffset.y;
        
        // 限制窗口在屏幕范围内
        const maxX = window.innerWidth - this.currentWindow.offsetWidth;
        const maxY = window.innerHeight - this.currentWindow.offsetHeight - 28; // 减去任务栏高度
        
        const finalX = Math.max(0, Math.min(x, maxX));
        const finalY = Math.max(0, Math.min(y, maxY));
        
        this.currentWindow.style.left = finalX + 'px';
        this.currentWindow.style.top = finalY + 'px';
        this.currentWindow.style.transform = 'none';
    }

    handleMouseUp() {
        this.isDragging = false;
        this.currentWindow = null;
        
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    // 设置窗口层级
    setupWindowZIndex(windowElement) {
        windowElement.addEventListener('mousedown', () => {
            this.bringToFront(windowElement);
        });
    }

    bringToFront(windowElement) {
        const allWindows = document.querySelectorAll('.window');
        allWindows.forEach(w => w.style.zIndex = '10');
        windowElement.style.zIndex = '100';
    }

    // 绑定窗口控制按钮
    bindWindowControls() {
        document.querySelectorAll('.window-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = button.classList.contains('close') ? 'close' :
                              button.classList.contains('minimize') ? 'minimize' : 'maximize';
                
                const window = button.closest('.window');
                this.handleWindowAction(window, action);
                
                // 播放点击音效
                this.playButtonClickSound();
            });
        });
    }

    handleWindowAction(windowElement, action) {
        switch (action) {
            case 'close':
                this.closeWindow(windowElement);
                break;
            case 'minimize':
                this.minimizeWindow(windowElement);
                break;
            case 'maximize':
                this.maximizeWindow(windowElement);
                break;
        }
    }

    closeWindow(windowElement) {
        if (windowElement.id === 'loginForm') {
            // 不能关闭主登录窗口，只能最小化
            this.minimizeWindow(windowElement);
        } else {
            windowElement.classList.add('hidden');
        }
    }

    minimizeWindow(windowElement) {
        windowElement.style.transform = 'translate(-50%, -50%) scale(0)';
        windowElement.style.opacity = '0';
        
        setTimeout(() => {
            windowElement.classList.add('hidden');
            windowElement.style.transform = 'translate(-50%, -50%) scale(1)';
            windowElement.style.opacity = '1';
        }, 200);
    }

    maximizeWindow(windowElement) {
        if (windowElement.classList.contains('maximized')) {
            // 还原窗口
            windowElement.classList.remove('maximized');
            windowElement.style.width = '';
            windowElement.style.height = '';
            windowElement.style.top = '50%';
            windowElement.style.left = '50%';
            windowElement.style.transform = 'translate(-50%, -50%)';
        } else {
            // 最大化窗口
            windowElement.classList.add('maximized');
            windowElement.style.width = '100vw';
            windowElement.style.height = 'calc(100vh - 28px)';
            windowElement.style.top = '0';
            windowElement.style.left = '0';
            windowElement.style.transform = 'none';
        }
    }

    // 显示登录窗口
    showLoginWindow() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.classList.remove('hidden');
            this.bringToFront(loginForm);
        }
    }

    // 绑定表单事件
    bindFormEvents() {
        // 登录表单
        const loginForm = document.querySelector('#loginForm form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // 注册表单
        const registerForm = document.querySelector('#registerForm form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // 忘记密码表单
        const forgotForm = document.querySelector('#forgotPasswordForm form');
        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleForgotPassword();
            });
        }

        // 发送验证码按钮
        const sendCodeBtn = document.getElementById('sendCode');
        if (sendCodeBtn) {
            sendCodeBtn.addEventListener('click', () => {
                this.sendVerificationCode();
            });
        }

        // 添加输入音效
        document.querySelectorAll('.win98-input').forEach(input => {
            input.addEventListener('focus', () => {
                this.playInputFocusSound();
            });
            
            input.addEventListener('keypress', () => {
                this.playKeystrokeSound();
            });
        });

        // 添加按钮音效
        document.querySelectorAll('.win98-button').forEach(button => {
            button.addEventListener('click', () => {
                this.playButtonClickSound();
            });
        });
    }

    // 处理登录
    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            this.showErrorDialog('请输入用户名和密码');
            return;
        }

        // 模拟登录验证
        this.showLoadingDialog('正在验证用户身份...');
        
        setTimeout(() => {
            this.hideLoadingDialog();
            if (username === 'admin' && password === 'admin') {
                this.showSuccessDialog('登录成功！欢迎使用 Windows 98');
                setTimeout(() => {
                    this.hideSuccessDialog();
                    this.showDesktop();
                }, 2000);
            } else {
                this.showErrorDialog('用户名或密码错误，请重试');
            }
        }, 2000);
    }

    // 处理注册
    handleRegister() {
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;
        
        if (!username || !email || !password || !confirmPassword) {
            this.showErrorDialog('请填写所有必填字段');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showErrorDialog('两次输入的密码不一致');
            return;
        }

        this.showLoadingDialog('正在创建用户账户...');
        
        setTimeout(() => {
            this.hideLoadingDialog();
            this.showSuccessDialog('账户创建成功！请使用新账户登录');
            setTimeout(() => {
                this.hideSuccessDialog();
                this.switchToLogin();
            }, 2000);
        }, 2000);
    }

    // 处理忘记密码
    handleForgotPassword() {
        const email = document.getElementById('forgot-email').value;
        const verificationCode = document.getElementById('verification-code').value;
        const newPassword = document.getElementById('new-password').value;
        
        if (!email || !verificationCode || !newPassword) {
            this.showErrorDialog('请填写所有必填字段');
            return;
        }

        this.showLoadingDialog('正在重置密码...');
        
        setTimeout(() => {
            this.hideLoadingDialog();
            this.showSuccessDialog('密码重置成功！请使用新密码登录');
            setTimeout(() => {
                this.hideSuccessDialog();
                this.switchToLogin();
            }, 2000);
        }, 2000);
    }

    // 发送验证码
    sendVerificationCode() {
        const email = document.getElementById('forgot-email').value;
        if (!email) {
            this.showErrorDialog('请先输入邮箱地址');
            return;
        }

        const sendCodeBtn = document.getElementById('sendCode');
        sendCodeBtn.disabled = true;
        sendCodeBtn.textContent = '发送中...';
        
        setTimeout(() => {
            sendCodeBtn.textContent = '已发送';
            this.showSuccessDialog('验证码已发送到您的邮箱');
            
            // 倒计时
            let countdown = 60;
            const timer = setInterval(() => {
                sendCodeBtn.textContent = `${countdown}秒后重试`;
                countdown--;
                
                if (countdown < 0) {
                    clearInterval(timer);
                    sendCodeBtn.disabled = false;
                    sendCodeBtn.textContent = '发送验证码';
                }
            }, 1000);
        }, 1000);
    }

    // 切换表单
    switchToLogin() {
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('forgotPasswordForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
        this.bringToFront(document.getElementById('loginForm'));
    }

    switchToRegister() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('forgotPasswordForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
        this.bringToFront(document.getElementById('registerForm'));
    }

    switchToForgotPassword() {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('forgotPasswordForm').classList.remove('hidden');
        this.bringToFront(document.getElementById('forgotPasswordForm'));
    }

    // 显示错误对话框
    showErrorDialog(message) {
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

    // 显示成功对话框
    showSuccessDialog(message) {
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

    // 显示加载对话框
    showLoadingDialog(message) {
        // 创建加载对话框
        const loadingDialog = document.createElement('div');
        loadingDialog.id = 'loadingDialog';
        loadingDialog.className = 'error-dialog';
        loadingDialog.innerHTML = `
            <div class="window">
                <div class="window-header">
                    <div class="window-title">
                        <span class="window-icon">⏳</span>
                        <span>请稍候</span>
                    </div>
                </div>
                <div class="window-content">
                    <div class="error-content">
                        <div class="error-icon">⏳</div>
                        <div class="error-message">${message}</div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(loadingDialog);
    }

    hideLoadingDialog() {
        const loadingDialog = document.getElementById('loadingDialog');
        if (loadingDialog) {
            loadingDialog.remove();
        }
    }

    // 音效系统
    playButtonClickSound() {
        this.playTone(800, 0.1);
    }

    playInputFocusSound() {
        this.playTone(1000, 0.05);
    }

    playKeystrokeSound() {
        this.playTone(1200, 0.03);
    }

    playErrorSound() {
        this.playTone(200, 0.3);
        setTimeout(() => this.playTone(150, 0.2), 100);
    }

    playSuccessSound() {
        this.playTone(523, 0.2);
        setTimeout(() => this.playTone(659, 0.2), 100);
        setTimeout(() => this.playTone(784, 0.3), 200);
    }

    playTone(frequency, duration) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            // 静默处理音效错误
        }
    }

    // 键盘快捷键
    handleKeyboardShortcuts(e) {
        // Alt + Tab - 切换窗口
        if (e.altKey && e.key === 'Tab') {
            e.preventDefault();
            this.cycleWindows();
        }
        
        // Ctrl + Alt + Del - 显示任务管理器消息
        if (e.ctrlKey && e.altKey && e.key === 'Delete') {
            e.preventDefault();
            this.showErrorDialog('任务管理器已被系统管理员停用');
        }
        
        // F1 - 帮助
        if (e.key === 'F1') {
            e.preventDefault();
            this.showHelpDialog();
        }
        
        // Esc - 关闭当前对话框
        if (e.key === 'Escape') {
            this.hideErrorDialog();
            this.hideSuccessDialog();
        }
    }

    cycleWindows() {
        const visibleWindows = Array.from(this.windows).filter(w => !w.classList.contains('hidden'));
        if (visibleWindows.length > 1) {
            const currentIndex = visibleWindows.findIndex(w => w.style.zIndex === '100');
            const nextIndex = (currentIndex + 1) % visibleWindows.length;
            this.bringToFront(visibleWindows[nextIndex]);
        }
    }

    showHelpDialog() {
        this.showErrorDialog('Windows 98 登录帮助：\n\n• 使用鼠标点击输入用户名和密码\n• 按回车键快速登录\n• 右键点击显示菜单\n• 拖拽窗口标题栏移动窗口');
    }

    // 右键菜单
    showContextMenu(e) {
        this.hideContextMenu();
        
        const menu = document.createElement('div');
        menu.id = 'contextMenu';
        menu.className = 'context-menu';
        menu.style.left = e.clientX + 'px';
        menu.style.top = e.clientY + 'px';
        
        menu.innerHTML = `
            <div class="context-menu-item" onclick="windows98Login.showHelpDialog()">帮助</div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" onclick="windows98Login.showAboutDialog()">关于 Windows 98</div>
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" onclick="windows98Login.refreshDesktop()">刷新</div>
        `;
        
        document.body.appendChild(menu);
    }

    hideContextMenu() {
        const menu = document.getElementById('contextMenu');
        if (menu) menu.remove();
    }

    showAboutDialog() {
        this.showSuccessDialog('Microsoft Windows 98 复古登录\n\n版本 4.10.1998\n构建于怀旧与创新之上\n\n© 2024 LoginLab Project');
    }

    refreshDesktop() {
        // 桌面刷新动画
        document.querySelector('.desktop').style.opacity = '0.5';
        setTimeout(() => {
            document.querySelector('.desktop').style.opacity = '1';
        }, 200);
    }

    // 显示桌面（登录成功后）
    showDesktop() {
        document.body.innerHTML = `
            <div class="desktop">
                <div class="desktop-icons">
                    <div class="desktop-icon">
                        <div class="icon my-computer"></div>
                        <span>我的电脑</span>
                    </div>
                    <div class="desktop-icon">
                        <div class="icon recycle-bin"></div>
                        <span>回收站</span>
                    </div>
                    <div class="desktop-icon">
                        <div class="icon network"></div>
                        <span>网络邻居</span>
                    </div>
                </div>
                
                <div class="taskbar">
                    <div class="start-button">
                        <span class="start-icon">🏠</span>
                        <span>开始</span>
                    </div>
                    <div class="taskbar-separator"></div>
                    <div class="taskbar-time" id="currentTime">12:34</div>
                </div>
                
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 24px; text-shadow: 2px 2px 4px #000;">
                    欢迎使用 Windows 98！
                </div>
            </div>
        `;
        
        // 重新初始化时钟
        this.currentTime = document.getElementById('currentTime');
        this.updateClock();
    }

    // 显示开始菜单
    showStartMenu() {
        this.showErrorDialog('开始菜单功能正在开发中...\n\n这是一个演示版本的 Windows 98 登录界面');
    }

    // 处理桌面图标双击
    handleIconDoubleClick(icon) {
        const iconType = icon.querySelector('.icon').className;
        
        if (iconType.includes('my-computer')) {
            this.showErrorDialog('我的电脑\n\n系统信息：\n• 处理器：怀旧486\n• 内存：64MB RAM\n• 操作系统：Windows 98');
        } else if (iconType.includes('recycle-bin')) {
            this.showErrorDialog('回收站\n\n回收站是空的');
        } else if (iconType.includes('network')) {
            this.showErrorDialog('网络邻居\n\n未找到网络连接');
        }
    }
}

// 全局函数
function hideErrorDialog() {
    if (window.windows98Login) {
        window.windows98Login.hideErrorDialog();
    }
}

function hideSuccessDialog() {
    if (window.windows98Login) {
        window.windows98Login.hideSuccessDialog();
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.windows98Login = new Windows98Login();
    
    // 绑定共用登录系统的切换事件
    const toRegister = document.getElementById('toRegister');
    const toForgotPassword = document.getElementById('toForgotPassword');
    const backToLogin = document.getElementById('backToLogin');
    const backToLoginFromReset = document.getElementById('backToLoginFromReset');
    
    if (toRegister) {
        toRegister.addEventListener('click', () => {
            window.windows98Login.switchToRegister();
        });
    }
    
    if (toForgotPassword) {
        toForgotPassword.addEventListener('click', () => {
            window.windows98Login.switchToForgotPassword();
        });
    }
    
    if (backToLogin) {
        backToLogin.addEventListener('click', () => {
            window.windows98Login.switchToLogin();
        });
    }
    
    if (backToLoginFromReset) {
        backToLoginFromReset.addEventListener('click', () => {
            window.windows98Login.switchToLogin();
        });
    }
});