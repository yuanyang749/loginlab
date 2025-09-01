// About Page JavaScript - AI驱动的登录页实验室

class AboutPage {
  constructor() {
    this.init();
  }

  init() {
    this.setupPageLoader();
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupTabs();
    this.setupCounters();
  }

  // 页面加载动画
  setupPageLoader() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const loader = document.getElementById("pageLoader");
        if (loader) {
          loader.classList.add("hide");
          setTimeout(() => {
            loader.style.display = "none";
          }, 500);
        }
      }, 1000);
    });
  }

  // 导航功能
  setupNavigation() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-links a");

    // 切换导航菜单
    navToggle?.addEventListener("click", () => {
      navMenu?.classList.toggle("show");
    });

    // 点击外部关闭菜单
    document.addEventListener("click", (e) => {
      if (!navToggle?.contains(e.target) && !navMenu?.contains(e.target)) {
        navMenu?.classList.remove("show");
      }
    });

    // 导航链接点击
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }

        navMenu?.classList.remove("show");
        this.updateActiveNavLink(link);
      });
    });
  }

  // 更新活跃导航链接
  updateActiveNavLink(activeLink) {
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active");
    });
    activeLink.classList.add("active");
  }

  // 滚动效果
  setupScrollEffects() {
    const readingProgress = document.getElementById("readingProgress");
    const magicPortal = document.getElementById("magicPortal");
    const sections = document.querySelectorAll(".content-section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
      // 阅读进度条
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (readingProgress) {
        readingProgress.style.width = `${scrollPercent}%`;
      }

      // 魔法传送门显示控制
      if (magicPortal) {
        if (scrollTop > 300) {
          magicPortal.classList.add("visible");
        } else {
          magicPortal.classList.remove("visible");
        }
      }

      // 更新导航活跃状态
      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          currentSection = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    });

    // 魔法传送门点击事件
    magicPortal?.addEventListener("click", (e) => {
      e.preventDefault();

      // 创建魔法爆炸效果
      this.createMagicExplosion(e);

      // 平滑滚动到顶部
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // 鼠标悬停效果
    magicPortal?.addEventListener("mouseenter", () => {
      const particles = magicPortal.querySelectorAll(".particle");
      particles.forEach((particle) => {
        particle.style.animationDuration = "2s";
      });
    });

    magicPortal?.addEventListener("mouseleave", () => {
      const particles = magicPortal.querySelectorAll(".particle");
      particles.forEach((particle) => {
        particle.style.animationDuration = "4s";
      });
    });
  }

  // 动画效果
  setupAnimations() {
    // 观察器用于触发动画
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll(
      ".highlight-card, .value-item, .feature-item, .tech-layer"
    );
    animateElements.forEach((el) => {
      observer.observe(el);
    });

    // 技术栈悬浮动画
    const techLayers = document.querySelectorAll(".tech-layer");
    techLayers.forEach((layer, index) => {
      layer.style.animationDelay = `${index * 0.2}s`;

      layer.addEventListener("mouseenter", () => {
        layer.style.transform = "translateY(-10px) scale(1.05)";
      });

      layer.addEventListener("mouseleave", () => {
        layer.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  // 标签页功能
  setupTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab");

        // 更新按钮状态
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // 更新面板状态
        tabPanels.forEach((panel) => {
          panel.classList.remove("active");
          if (panel.id === targetTab) {
            panel.classList.add("active");
          }
        });
      });
    });
  }

  // 数字计数动画
  setupCounters() {
    const counters = document.querySelectorAll(".stat-number");

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
      }, 16);
    };

    // 使用观察器触发计数动画
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains("counted")
          ) {
            entry.target.classList.add("counted");
            animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  // 创建魔法爆炸效果
  createMagicExplosion(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 创建爆炸容器
    const explosion = document.createElement("div");
    explosion.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 0;
        height: 0;
        pointer-events: none;
        z-index: 9999;
    `;

    // 创建多个爆炸粒子
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      const angle = (i / 12) * Math.PI * 2;
      const distance = 100 + Math.random() * 50;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      particle.textContent = ["✨", "⭐", "💫", "🌟"][
        Math.floor(Math.random() * 4)
      ];
      particle.style.cssText = `
            position: absolute;
            left: -10px;
            top: -10px;
            font-size: 16px;
            animation: magicParticleExplosion 1s ease-out forwards;
            --dx: ${dx}px;
            --dy: ${dy}px;
        `;

      explosion.appendChild(particle);
    }

    document.body.appendChild(explosion);

    // 清理爆炸效果
    setTimeout(() => {
      if (explosion.parentNode) {
        explosion.parentNode.removeChild(explosion);
      }
    }, 1000);
  }
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", () => {
  new AboutPage();
});

// 添加一些全局动画样式
const style = document.createElement("style");
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .tech-layer {
        transition: all 0.3s ease;
        animation: techFloat 3s ease-in-out infinite;
    }
    
    @keyframes techFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
    
    .tech-layer:nth-child(1) { animation-delay: 0s; }
    .tech-layer:nth-child(2) { animation-delay: 1s; }
    .tech-layer:nth-child(3) { animation-delay: 2s; }
`;
document.head.appendChild(style);
