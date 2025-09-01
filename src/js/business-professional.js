// 商务专业风格特定的JavaScript功能
document.addEventListener('DOMContentLoaded', () => {
    // 初始化页面动画
    initPageAnimations();
    
    // 初始化专业效果
    initProfessionalEffects();
    
    // 初始化几何动画
    initGeometricAnimations();
    
    // 初始化商务交互
    initBusinessInteractions();
});

function initPageAnimations() {
    // 卡片入场动画
    const businessCard = document.querySelector('.business-card');
    if (businessCard) {
        businessCard.style.opacity = '0';
        businessCard.style.transform = 'translateY(40px) scale(0.95)';
        
        setTimeout(() => {
            businessCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            businessCard.style.opacity = '1';
            businessCard.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }

    // 返回按钮动画
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.style.opacity = '0';
        backButton.style.transform = 'translateX(-40px)';
        
        setTimeout(() => {
            backButton.style.transition = 'all 0.6s ease';
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateX(0)';
        }, 400);
    }

    // 公司Logo动画
    const companyLogo = document.querySelector('.company-logo');
    if (companyLogo) {
        companyLogo.style.opacity = '0';
        companyLogo.style.transform = 'scale(0.5) rotate(-90deg)';
        
        setTimeout(() => {
            companyLogo.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            companyLogo.style.opacity = '1';
            companyLogo.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
    }

    // 分割线动画
    const headerDivider = document.querySelector('.header-divider');
    if (headerDivider) {
        headerDivider.style.width = '0';
        
        setTimeout(() => {
            headerDivider.style.transition = 'width 0.8s ease';
            headerDivider.style.width = '60px';
        }, 800);
    }
}

function initProfessionalEffects() {
    // 输入框专业效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            createProfessionalFocus(input);
            addProgressIndicator(input);
        });

        input.addEventListener('blur', () => {
            removeProfessionalFocus(input);
            removeProgressIndicator(input);
        });

        // 输入验证效果
        input.addEventListener('input', (e) => {
            validateInputProfessionally(e.target);
        });
    });

    // 按钮专业效果
    const buttons = document.querySelectorAll('.business-btn, .business-btn-small');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            createButtonElevation(button);
        });

        button.addEventListener('mouseleave', () => {
            removeButtonElevation(button);
        });

        button.addEventListener('click', (e) => {
            createProfessionalRipple(e, button);
        });
    });

    // 链接专业效果
    const links = document.querySelectorAll('.business-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            createLinkUnderline(link);
        });
    });
}

function createProfessionalFocus(input) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.style.transform = 'translateX(5px)';
        formGroup.style.transition = 'transform 0.3s ease';
        
        // 添加专业阴影
        formGroup.style.filter = 'drop-shadow(2px 0 8px rgba(0, 123, 255, 0.1))';
    }
}

function removeProfessionalFocus(input) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.style.transform = 'translateX(0)';
        formGroup.style.filter = '';
    }
}

function addProgressIndicator(input) {
    const progressBar = document.createElement('div');
    progressBar.className = 'input-progress';
    progressBar.style.cssText = `
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 2px;
        background: linear-gradient(90deg, #007bff, #0056b3);
        width: 0;
        transition: width 0.3s ease;
        border-radius: 1px;
    `;
    
    const formGroup = input.closest('.form-group');
    formGroup.appendChild(progressBar);
    
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);
    
    input.progressBar = progressBar;
}

function removeProgressIndicator(input) {
    if (input.progressBar) {
        input.progressBar.style.width = '0';
        setTimeout(() => {
            if (input.progressBar && input.progressBar.parentNode) {
                input.progressBar.parentNode.removeChild(input.progressBar);
            }
            input.progressBar = null;
        }, 300);
    }
}

function validateInputProfessionally(input) {
    const value = input.value;
    const formGroup = input.closest('.form-group');
    
    // 移除之前的验证状态
    formGroup.classList.remove('valid', 'invalid');
    
    if (value.length > 0) {
        let isValid = true;
        
        // 根据输入类型进行验证
        if (input.type === 'tel') {
            isValid = /^1[3-9]\d{9}$/.test(value);
        } else if (input.pattern) {
            const regex = new RegExp(input.pattern);
            isValid = regex.test(value);
        } else if (input.type === 'password') {
            isValid = value.length >= 6;
        }
        
        formGroup.classList.add(isValid ? 'valid' : 'invalid');
        
        if (isValid) {
            createValidationCheckmark(input);
        }
    }
}

function createValidationCheckmark(input) {
    const checkmark = document.createElement('div');
    checkmark.textContent = '✓';
    checkmark.style.cssText = `
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #28a745;
        font-weight: bold;
        font-size: 18px;
        opacity: 0;
        animation: checkmarkAppear 0.3s ease forwards;
    `;
    
    const formGroup = input.closest('.form-group');
    const existingCheckmark = formGroup.querySelector('.validation-checkmark');
    if (existingCheckmark) {
        formGroup.removeChild(existingCheckmark);
    }
    
    checkmark.className = 'validation-checkmark';
    formGroup.appendChild(checkmark);
}

function createButtonElevation(button) {
    button.style.transform = 'translateY(-3px) scale(1.02)';
    button.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.4)';
}

function removeButtonElevation(button) {
    button.style.transform = 'translateY(0) scale(1)';
    button.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
}

function createProfessionalRipple(event, button) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: professionalRipple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        button.removeChild(ripple);
    }, 600);
}

function createLinkUnderline(link) {
    link.style.position = 'relative';
    
    if (!link.querySelector('.link-underline')) {
        const underline = document.createElement('div');
        underline.className = 'link-underline';
        underline.style.cssText = `
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: #007bff;
            transition: width 0.3s ease;
        `;
        
        link.appendChild(underline);
        
        setTimeout(() => {
            underline.style.width = '100%';
        }, 50);
    }
}

function initGeometricAnimations() {
    // 鼠标移动时的几何响应
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        updateGeometricShapes(mouseX, mouseY);
        updateBrandLines(mouseX, mouseY);
    });

    // 定期更新几何动画
    setInterval(() => {
        randomizeShapeAnimations();
    }, 4000);
}

function updateGeometricShapes(mouseX, mouseY) {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const factor = (index + 1) * 0.1;
        const offsetX = (mouseX - 0.5) * 20 * factor;
        const offsetY = (mouseY - 0.5) * 15 * factor;
        
        shape.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX}deg)`;
        shape.style.opacity = 0.1 + (mouseX * mouseY) * 0.2;
    });
}

function updateBrandLines(mouseX, mouseY) {
    const brandLines = document.querySelectorAll('.brand-line');
    brandLines.forEach((line, index) => {
        const intensity = (mouseX + mouseY) * 0.5;
        line.style.opacity = 0.1 + intensity * 0.3;
        
        if (index === 0) {
            line.style.width = (200 + intensity * 100) + 'px';
        } else {
            line.style.height = (150 + intensity * 75) + 'px';
        }
    });
}

function randomizeShapeAnimations() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 6 + Math.random() * 4;
        
        shape.style.animationDelay = randomDelay + 's';
        shape.style.animationDuration = randomDuration + 's';
    });
}

function initBusinessInteractions() {
    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            const visibleForm = document.querySelector('.form-container:not(.hidden)');
            if (visibleForm) {
                const submitButton = visibleForm.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.click();
                }
            }
        }
    });

    // 添加专业提示
    addProfessionalTooltips();
}

function addProfessionalTooltips() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('mouseenter', () => {
            showProfessionalTooltip(input);
        });
        
        input.addEventListener('mouseleave', () => {
            hideProfessionalTooltip();
        });
    });
}

function showProfessionalTooltip(input) {
    const tooltips = {
        'username': '请输入您的企业用户名',
        'password': '密码长度至少6位字符',
        'regPhone': '请输入11位手机号码',
        'regVerificationCode': '请输入6位数字验证码'
    };
    
    const tooltipText = tooltips[input.id];
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'professional-tooltip';
    tooltip.textContent = tooltipText;
    
    const rect = input.getBoundingClientRect();
    tooltip.style.cssText = `
        position: fixed;
        left: ${rect.left}px;
        top: ${rect.bottom + 5}px;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        opacity: 0;
        animation: tooltipFadeIn 0.3s ease forwards;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(tooltip);
}

function hideProfessionalTooltip() {
    const tooltip = document.querySelector('.professional-tooltip');
    if (tooltip) {
        tooltip.style.animation = 'tooltipFadeOut 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 300);
    }
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes checkmarkAppear {
        0% {
            opacity: 0;
            transform: translateY(-50%) scale(0);
        }
        100% {
            opacity: 1;
            transform: translateY(-50%) scale(1);
        }
    }
    
    @keyframes professionalRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes tooltipFadeIn {
        0% {
            opacity: 0;
            transform: translateY(-5px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes tooltipFadeOut {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-5px);
        }
    }
    
    .form-group.valid .input-line {
        background: #28a745;
    }
    
    .form-group.invalid .input-line {
        background: #dc3545;
    }
`;
document.head.appendChild(style);
