// 共用的登录逻辑和功能
class LoginSystem {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupFormValidation();
    }

    bindEvents() {
        // 获取所有表单容器
        this.loginForm = document.getElementById('loginForm');
        this.registerForm = document.getElementById('registerForm');
        this.forgotPasswordForm = document.getElementById('forgotPasswordForm');

        // 获取所有切换按钮
        this.toRegister = document.getElementById('toRegister');
        this.toForgotPassword = document.getElementById('toForgotPassword');
        this.backToLogin = document.getElementById('backToLogin');
        this.backToLoginFromReset = document.getElementById('backToLoginFromReset');

        // 绑定切换事件
        if (this.toRegister) {
            this.toRegister.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchForm(this.loginForm, this.registerForm);
            });
        }

        if (this.toForgotPassword) {
            this.toForgotPassword.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchForm(this.loginForm, this.forgotPasswordForm);
            });
        }

        if (this.backToLogin) {
            this.backToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchForm(this.registerForm, this.loginForm);
            });
        }

        if (this.backToLoginFromReset) {
            this.backToLoginFromReset.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchForm(this.forgotPasswordForm, this.loginForm);
            });
        }

        // 绑定表单提交事件
        this.bindFormSubmissions();
        this.bindVerificationCode();
    }

    switchForm(hideForm, showForm) {
        if (!hideForm || !showForm) return;

        // 隐藏当前表单
        hideForm.classList.add('hidden');

        // 显示目标表单
        setTimeout(() => {
            showForm.classList.remove('hidden');
        }, 100);
    }

    bindFormSubmissions() {
        // 登录表单
        const loginFormElement = document.querySelector('#loginForm form');
        if (loginFormElement) {
            loginFormElement.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // 注册表单
        const registerFormElement = document.querySelector('#registerForm form');
        if (registerFormElement) {
            registerFormElement.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // 重置密码表单
        const resetFormElement = document.querySelector('#forgotPasswordForm form');
        if (resetFormElement) {
            resetFormElement.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handlePasswordReset();
            });
        }
    }

    handleLogin() {
        const username = document.getElementById('username')?.value;
        const password = document.getElementById('password')?.value;

        if (!username || !password) {
            this.showMessage('请填写完整的登录信息', 'error');
            return;
        }

        // 模拟登录API调用
        this.showMessage('登录中...', 'info');
        setTimeout(() => {
            console.log('登录信息：', { username, password });
            this.showMessage('登录成功！', 'success');
            // 这里可以跳转到主页
            // window.location.href = '../home.html';
        }, 1000);
    }

    handleRegister() {
        const username = document.getElementById('regUsername')?.value;
        const phone = document.getElementById('regPhone')?.value;
        const code = document.getElementById('regVerificationCode')?.value;
        const password = document.getElementById('regPassword')?.value;
        const confirmPassword = document.getElementById('regConfirmPassword')?.value;

        if (!this.validateRegisterForm(username, phone, code, password, confirmPassword)) {
            return;
        }

        // 模拟注册API调用
        this.showMessage('注册中...', 'info');
        setTimeout(() => {
            console.log('注册信息：', { username, phone, code, password });
            this.showMessage('注册成功！', 'success');
            setTimeout(() => {
                this.switchForm(this.registerForm, this.loginForm);
            }, 1500);
        }, 1000);
    }

    handlePasswordReset() {
        const phone = document.getElementById('resetPhone')?.value;
        const code = document.getElementById('verificationCode')?.value;
        const newPassword = document.getElementById('newPassword')?.value;
        const confirmNewPassword = document.getElementById('confirmNewPassword')?.value;

        if (!this.validateResetForm(phone, code, newPassword, confirmNewPassword)) {
            return;
        }

        // 模拟重置密码API调用
        this.showMessage('重置密码中...', 'info');
        setTimeout(() => {
            console.log('重置密码：', { phone, code, newPassword });
            this.showMessage('密码重置成功！', 'success');
            setTimeout(() => {
                this.switchForm(this.forgotPasswordForm, this.loginForm);
            }, 1500);
        }, 1000);
    }

    validateRegisterForm(username, phone, code, password, confirmPassword) {
        if (!username || !phone || !code || !password || !confirmPassword) {
            this.showMessage('请填写完整的注册信息', 'error');
            return false;
        }

        if (!this.isValidPhone(phone)) {
            this.showMessage('请输入正确的手机号码', 'error');
            return false;
        }

        if (code.length !== 6) {
            this.showMessage('请输入6位验证码', 'error');
            return false;
        }

        if (password !== confirmPassword) {
            this.showMessage('两次输入的密码不一致', 'error');
            return false;
        }

        if (password.length < 6) {
            this.showMessage('密码长度至少6位', 'error');
            return false;
        }

        return true;
    }

    validateResetForm(phone, code, newPassword, confirmNewPassword) {
        if (!phone || !code || !newPassword || !confirmNewPassword) {
            this.showMessage('请填写完整的重置信息', 'error');
            return false;
        }

        if (!this.isValidPhone(phone)) {
            this.showMessage('请输入正确的手机号码', 'error');
            return false;
        }

        if (code.length !== 6) {
            this.showMessage('请输入6位验证码', 'error');
            return false;
        }

        if (newPassword !== confirmNewPassword) {
            this.showMessage('两次输入的密码不一致', 'error');
            return false;
        }

        if (newPassword.length < 6) {
            this.showMessage('密码长度至少6位', 'error');
            return false;
        }

        return true;
    }

    isValidPhone(phone) {
        return /^1[3-9]\d{9}$/.test(phone);
    }

    bindVerificationCode() {
        // 注册页面验证码
        const regSendCodeBtn = document.getElementById('regSendCodeBtn');
        const regPhoneInput = document.getElementById('regPhone');
        if (regSendCodeBtn && regPhoneInput) {
            regSendCodeBtn.addEventListener('click', () => {
                this.sendVerificationCode(regPhoneInput.value, regSendCodeBtn, 'reg');
            });
        }

        // 重置密码页面验证码
        const sendCodeBtn = document.getElementById('sendCodeBtn');
        const resetPhoneInput = document.getElementById('resetPhone');
        if (sendCodeBtn && resetPhoneInput) {
            sendCodeBtn.addEventListener('click', () => {
                this.sendVerificationCode(resetPhoneInput.value, sendCodeBtn, 'reset');
            });
        }
    }

    sendVerificationCode(phone, button, type) {
        if (!this.isValidPhone(phone)) {
            this.showMessage('请输入正确的手机号码', 'error');
            return;
        }

        // 模拟发送验证码
        console.log(`${type === 'reg' ? '注册' : '重置密码'}发送验证码到：`, phone);
        this.showMessage('验证码已发送', 'success');
        this.startCountdown(button);
    }

    startCountdown(button) {
        let countdown = 60;
        const originalText = button.textContent;
        
        button.disabled = true;
        button.textContent = `${countdown}秒后重试`;
        
        const timer = setInterval(() => {
            countdown--;
            button.textContent = `${countdown}秒后重试`;
            
            if (countdown === 0) {
                clearInterval(timer);
                button.disabled = false;
                button.textContent = originalText;
            }
        }, 1000);
    }

    showMessage(message, type = 'info') {
        // 创建消息提示
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        // 添加样式
        Object.assign(messageDiv.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            zIndex: '10000',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });

        // 根据类型设置背景色
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            info: '#2196F3',
            warning: '#ff9800'
        };
        messageDiv.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(messageDiv);

        // 显示动画
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }

    setupFormValidation() {
        // 实时验证手机号
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const value = e.target.value.replace(/\D/g, '');
                e.target.value = value.slice(0, 11);
            });
        });

        // 实时验证验证码
        const codeInputs = document.querySelectorAll('input[pattern="[0-9]{6}"]');
        codeInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const value = e.target.value.replace(/\D/g, '');
                e.target.value = value.slice(0, 6);
            });
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new LoginSystem();
});
