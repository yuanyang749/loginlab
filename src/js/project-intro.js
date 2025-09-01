// 项目介绍卡片交互功能

class ProjectIntro {
  constructor() {
    this.init();
  }

  init() {
    this.setupExpandToggle();
    this.setupAnimations();
    this.setupMobileOptimization();
  }

  // 展开/收起功能
  setupExpandToggle() {
    const expandBtn = document.getElementById("introExpandBtn");
    const introContent = document.getElementById("introContent");

    if (!expandBtn || !introContent) return;

    // 检查是否为移动端，移动端默认收起
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
      // 桌面端默认展开
      introContent.classList.add("expanded");
      expandBtn.classList.add("expanded");
      expandBtn.querySelector(".expand-text").textContent = "收起详情";
    } else {
      // 移动端默认收起，确保文案正确
      expandBtn.querySelector(".expand-text").textContent = "展开了解更多";
    }

    expandBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isExpanded = introContent.classList.contains("expanded");

      if (isExpanded) {
        // 收起
        introContent.classList.remove("expanded");
        expandBtn.classList.remove("expanded");
        expandBtn.querySelector(".expand-text").textContent = "展开了解更多";

        // 强制设置样式确保隐藏
        introContent.style.maxHeight = "0";
        introContent.style.opacity = "0";

        // 添加收起动画
        this.animateCollapse(introContent);
      } else {
        // 展开
        introContent.classList.add("expanded");
        expandBtn.classList.add("expanded");
        expandBtn.querySelector(".expand-text").textContent = "收起详情";

        // 强制设置样式确保显示
        introContent.style.maxHeight = "600px";
        introContent.style.opacity = "1";
        introContent.style.visibility = "visible";

        // 添加展开动画
        this.animateExpand(introContent);
      }
    });

    // 监听窗口大小变化，重新设置状态
    window.addEventListener("resize", () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        // 屏幕尺寸发生变化，重新初始化
        location.reload();
      }
    });
  }

  // 展开动画
  animateExpand(element) {
    const highlights = element.querySelectorAll(".highlight-item");
    highlights.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";

      setTimeout(() => {
        item.style.transition = "all 0.4s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 100 + 200);
    });
  }

  // 收起动画
  animateCollapse(element) {
    const highlights = element.querySelectorAll(".highlight-item");
    highlights.forEach((item, index) => {
      setTimeout(() => {
        item.style.transition = "all 0.3s ease";
        item.style.opacity = "0";
        item.style.transform = "translateY(-10px)";
      }, index * 50);
    });
  }

  // 设置动画效果
  setupAnimations() {
    // Logo悬浮动画
    const logoImg = document.querySelector(".logo-img");
    if (logoImg) {
      // 鼠标悬停时增强动画
      const introCard = document.querySelector(".project-intro-card");
      if (introCard) {
        introCard.addEventListener("mouseenter", () => {
          logoImg.style.animationDuration = "2s";
          logoImg.style.transform = "translateY(-5px) scale(1.05)";
        });

        introCard.addEventListener("mouseleave", () => {
          logoImg.style.animationDuration = "4s";
          logoImg.style.transform = "";
        });
      }
    }

    // 高亮项目悬浮效果
    const highlightItems = document.querySelectorAll(".highlight-item");
    highlightItems.forEach((item, index) => {
      // 添加延迟动画
      item.style.animationDelay = `${index * 0.1}s`;

      // 悬浮时的粒子效果
      item.addEventListener("mouseenter", () => {
        this.createParticleEffect(item);
      });
    });

    // 按钮悬浮效果
    const introButtons = document.querySelectorAll(".intro-btn");
    introButtons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        this.addButtonGlow(btn);
      });

      btn.addEventListener("mouseleave", () => {
        this.removeButtonGlow(btn);
      });
    });
  }

  // 创建粒子效果
  createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const particles = [];

    for (let i = 0; i < 3; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, #2ea0ff, #28d19c);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: particleFloat 1.5s ease-out forwards;
            `;

      document.body.appendChild(particle);
      particles.push(particle);

      // 清理粒子
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1500);
    }
  }

  // 添加按钮发光效果
  addButtonGlow(button) {
    if (button.classList.contains("intro-btn--primary")) {
      button.style.boxShadow =
        "0 0 30px rgba(46,160,255,0.5), 0 12px 30px rgba(46,160,255,0.35)";
    } else {
      button.style.boxShadow =
        "0 0 20px rgba(46,160,255,0.3), 0 8px 25px rgba(46,160,255,0.2)";
    }
  }

  // 移除按钮发光效果
  removeButtonGlow(button) {
    if (button.classList.contains("intro-btn--primary")) {
      button.style.boxShadow = "";
    } else {
      button.style.boxShadow = "";
    }
  }

  // 移动端优化
  setupMobileOptimization() {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const introContent = document.getElementById("introContent");
      const expandBtn = document.getElementById("introExpandBtn");

      if (!introContent || !expandBtn) return;

      if (isMobile) {
        // 移动端：默认收起，显示展开按钮
        expandBtn.style.display = "flex";
        if (!introContent.classList.contains("expanded")) {
          introContent.style.maxHeight = "0";
        }
      } else {
        // 桌面端：默认展开，隐藏展开按钮
        expandBtn.style.display = "none";
        introContent.classList.add("expanded");
        introContent.style.maxHeight = "none";
      }
    };

    // 初始化
    handleResize();

    // 监听窗口大小变化
    window.addEventListener("resize", handleResize);

    // 移动端触摸优化
    if ("ontouchstart" in window) {
      const introCard = document.querySelector(".project-intro-card");
      if (introCard) {
        introCard.addEventListener("touchstart", () => {
          introCard.style.transform = "translateY(-1px)";
        });

        introCard.addEventListener("touchend", () => {
          introCard.style.transform = "";
        });
      }
    }
  }
}

// 添加粒子动画样式
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px) scale(0.5);
        }
    }
    
    @media (max-width: 767px) {
        .project-intro-card {
            margin: 20px 10px;
            padding: 24px 20px;
        }
        
        .intro-header {
            flex-direction: column;
            text-align: center;
            gap: 16px;
        }
        
        .intro-actions {
            flex-direction: column;
            gap: 12px;
        }
        
        .intro-btn {
            width: 100%;
            justify-content: center;
        }
        
        .intro-expand-btn {
            order: -1;
            margin-bottom: 16px;
        }
        
        .intro-highlights {
            grid-template-columns: 1fr;
            gap: 12px;
        }
        
        .highlight-item {
            padding: 10px 14px;
        }
    }
    
    @media (max-width: 480px) {
        .ai-icon {
            width: 50px;
            height: 50px;
        }
        
        .intro-title h2 {
            font-size: 1.3rem;
        }
        
        .intro-tagline {
            font-size: 0.85rem;
        }
        
        .intro-description {
            font-size: 0.9rem;
        }
    }
`;
document.head.appendChild(particleStyle);

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", () => {
  new ProjectIntro();
});

// 导出类以供其他脚本使用
window.ProjectIntro = ProjectIntro;
