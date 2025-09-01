// 资源加载失败备用方案

class ResourceFallback {
    constructor() {
        this.init();
    }

    init() {
        this.checkMaterialIcons();
        this.checkImages();
    }

    // 检测Material Icons是否加载成功
    checkMaterialIcons() {
        // 创建测试元素
        const testIcon = document.createElement('span');
        testIcon.className = 'material-icons';
        testIcon.textContent = 'home';
        testIcon.style.cssText = 'position:absolute;left:-9999px;visibility:hidden;';
        document.body.appendChild(testIcon);

        // 延迟检测，确保字体有时间加载
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(testIcon);
            const fontFamily = computedStyle.fontFamily.toLowerCase();
            
            // 如果没有加载Material Icons字体
            if (fontFamily.indexOf('material icons') === -1) {
                console.warn('Material Icons 字体加载失败，使用备用方案');
                this.applyIconFallback();
            }
            
            // 清理测试元素
            if (testIcon.parentNode) {
                testIcon.parentNode.removeChild(testIcon);
            }
        }, 500);
    }

    // 应用图标备用方案
    applyIconFallback() {
        const iconMap = {
            'arrow_back': '←',
            'menu': '☰',
            'list': '≡',
            'rocket_launch': '🚀',
            'auto_awesome': '✨',
            'psychology': '🧠',
            'code': '</>',
            'palette': '🎨',
            'diamond': '💎',
            'lightbulb': '💡',
            'school': '🎓',
            'speed': '⚡',
            'brush': '🖌',
            'color_lens': '🎨',
            'animation': '🎬',
            'groups': '👥',
            'forum': '💬',
            'science': '🔬',
            'settings': '⚙',
            'devices': '📱',
            'auto_fix_high': '✨',
            'accessibility': '♿',
            'group_work': '🤝',
            'description': '📄',
            'bug_report': '🐛',
            'favorite': '❤',
            'play_arrow': '▶',
            'contact_mail': '📧',
            'keyboard_arrow_up': '↑'
        };

        document.querySelectorAll('.material-icons').forEach(icon => {
            const iconName = icon.textContent.trim();
            const fallbackChar = iconMap[iconName];
            
            if (fallbackChar) {
                icon.textContent = fallbackChar;
                icon.style.fontFamily = 'Arial, sans-serif';
                icon.style.fontSize = '1.2em';
            } else {
                // 如果没有映射，使用通用符号
                icon.textContent = '●';
                icon.style.fontFamily = 'Arial, sans-serif';
            }
        });
    }

    // 检测图片加载
    checkImages() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', (e) => {
                console.warn(`图片加载失败: ${img.src}`);
                this.handleImageError(img);
            });
        });
    }

    // 处理图片加载错误
    handleImageError(img) {
        // 如果是logo图片，创建一个简单的替代
        if (img.classList.contains('logo-img')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'logo-placeholder';
            placeholder.innerHTML = 'AI';
            placeholder.style.cssText = `
                width: ${img.offsetWidth || 60}px;
                height: ${img.offsetHeight || 60}px;
                background: linear-gradient(135deg, #2ea0ff, #28d19c);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 1.2rem;
                animation: logoFloat 4s ease-in-out infinite;
            `;
            
            // 替换图片
            if (img.parentNode) {
                img.parentNode.replaceChild(placeholder, img);
            }
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new ResourceFallback();
});

// 导出类
window.ResourceFallback = ResourceFallback;
