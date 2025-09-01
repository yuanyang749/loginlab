// 风格选择页面的JavaScript功能
document.addEventListener("DOMContentLoaded", () => {
  // 初始化页面动画
  initPageAnimations();

  // 初始化滚动触发动画
  initScrollAnimations();

  // 绑定风格卡片点击事件
  bindStyleCardEvents();

  // 自动为所有风格卡片添加下载按钮
  addMissingDownloadButtons();

  // 绑定下载按钮事件
  bindDownloadEvents();

  // 初始化交互效果
  initInteractiveEffects();

  // 初始化魔法传送门
  initMagicPortal();
});

function initPageAnimations() {
  // 标题入场动画
  const title = document.querySelector(".title");
  if (title) {
    title.style.opacity = "0";
    title.style.transform = "translateY(-30px)";

    setTimeout(() => {
      title.style.transition = "all 0.8s ease";
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    }, 200);
  }

  // 副标题入场动画
  const subtitle = document.querySelector(".subtitle");
  if (subtitle) {
    subtitle.style.opacity = "0";
    subtitle.style.transform = "translateY(-20px)";

    setTimeout(() => {
      subtitle.style.transition = "all 0.8s ease";
      subtitle.style.opacity = "1";
      subtitle.style.transform = "translateY(0)";
    }, 400);
  }

  // 为风格卡片添加动画变体类，但不立即触发动画
  const styleCards = document.querySelectorAll(".style-card");
  styleCards.forEach((card, index) => {
    // 根据索引添加不同的动画变体
    const animationType = index % 4;
    switch (animationType) {
      case 0:
        // 默认从下方滑入
        break;
      case 1:
        card.classList.add("slide-left");
        break;
      case 2:
        card.classList.add("fade-scale");
        break;
      case 3:
        card.classList.add("slide-right");
        break;
    }

    // 添加延迟类，创造层次感
    const delayClass = `delay-${(index % 3) + 1}`;
    card.classList.add(delayClass);
  });
}

function initScrollAnimations() {
  // 检查浏览器是否支持 Intersection Observer
  if (!("IntersectionObserver" in window)) {
    // 如果不支持，直接显示所有卡片
    const styleCards = document.querySelectorAll(".style-card");
    styleCards.forEach((card) => {
      card.classList.add("animate-in");
    });
    return;
  }

  // 创建 Intersection Observer
  const observerOptions = {
    root: null, // 使用视口作为根
    rootMargin: "0px 0px -100px 0px", // 当元素距离视口底部100px时触发
    threshold: 0.1, // 当10%的元素可见时触发
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 元素进入视口，添加动画类
        const card = entry.target;

        // 添加一个小延迟，让动画更自然
        setTimeout(() => {
          card.classList.add("animate-in");
        }, 50);

        // 动画完成后停止观察该元素，提升性能
        setTimeout(() => {
          observer.unobserve(card);
          // 移除will-change以节省资源
          card.style.willChange = "auto";
        }, 1000);
      }
    });
  }, observerOptions);

  // 观察所有风格卡片
  const styleCards = document.querySelectorAll(".style-card");

  if (styleCards.length === 0) {
    console.warn("没有找到风格卡片元素");
    return;
  }

  styleCards.forEach((card) => {
    observer.observe(card);
  });

  // 存储observer以便后续使用
  window.scrollAnimationObserver = observer;

  console.log(`🎬 滚动动画已初始化，正在观察 ${styleCards.length} 个风格卡片`);
}

function bindStyleCardEvents() {
  const styleCards = document.querySelectorAll(".style-card");
  const styleUrls = {
    "modern-gradient": "styles/modern-gradient.html",
    "dark-minimal": "styles/dark-minimal.html",
    "warm-pink": "styles/warm-pink.html",
    "business-professional": "styles/business-professional.html",
    "ocean-blue": "styles/ocean-blue.html",
    "starry-scifi": "styles/starry-scifi.html",
    "sunset-glow": "styles/sunset-glow.html",
    "nature-forest": "styles/nature-forest.html",
    "luxury-diamond": "styles/luxury-diamond.html",
    "cyber-punk": "styles/cyber-punk.html",
    "pixel-retro": "styles/pixel-retro.html",
    "aurora-borealis": "styles/aurora-borealis.html",
    // 新增风格
    "minimalist-white": "styles/minimalist-white.html",
    "neon-glow": "styles/neon-glow.html",
    "watercolor-art": "styles/watercolor-art.html",
    "metallic-shine": "styles/metallic-shine.html",
    glassmorphism: "styles/glassmorphism.html",
    "vintage-retro": "styles/vintage-retro.html",
    "futuristic-tech": "styles/futuristic-tech.html",
    "organic-nature": "styles/organic-nature.html",
    "geometric-abstract": "styles/geometric-abstract.html",
    "hand-drawn": "styles/hand-drawn.html",
    "industrial-steel": "styles/industrial-steel.html",
    "fairy-tale": "styles/fairy-tale.html",
    "moonlit-mystery": "styles/moonlit-mystery.html",
    "fluid-art": "styles/fluid-art.html",
    "cherry-blossom": "styles/cherry-blossom.html",
    "flame-lava": "styles/flame-lava.html",
    "crystal-ice": "styles/crystal-ice.html",
    "sakura-zen": "styles/sakura-zen.html",
    "cyberpunk-neon": "styles/cyberpunk-neon.html",
    "stellar-exploration": "styles/stellar-exploration.html",
    "theatrical-stage": "styles/theatrical-stage.html",
    "circuit-tech": "styles/circuit-tech.html",
    "calligraphy-ink": "styles/calligraphy-ink.html",
    "neon-cyber-city": "styles/neon-cyber-city.html",
    "threejs-scifi": "styles/threejs-scifi.html",
    "windows98-retro": "styles/windows98-retro.html",
    "cyber-virus-infection": "styles/cyber-virus-infection.html",
  };

  styleCards.forEach((card) => {
    card.addEventListener("click", async () => {
      const style = card.dataset.style;
      const url = "/src/" + styleUrls[style];

      if (url) {
        // 记录浏览统计
        try {
          if (window.analyticsService) {
            window.analyticsService.trackEvent('view', style);
          }
        } catch (error) {
          console.warn('⚠️ Failed to track view event:', error);
        }

        // 添加点击动画
        card.style.transform = "scale(0.95)";

        setTimeout(() => {
          // 页面跳转新开窗口
          window.open(url, "_blank");
          // window.location.href = url;
        }, 150);
      }
    });

    // 悬停效果
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
      card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
    });
  });
}

function initInteractiveEffects() {
  // 鼠标移动时的背景响应
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    updateBackgroundGradient(mouseX, mouseY);
    updateFloatingElements(mouseX, mouseY);
  });

  // 滚动时的视差效果
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;

    const background = document.querySelector(".background");
    if (background) {
      background.style.transform = `translateY(${parallax}px)`;
    }
  });
}

function updateBackgroundGradient(mouseX, mouseY) {
  const background = document.querySelector(".background");
  if (background) {
    const hue1 = 220 + mouseX * 40;
    const hue2 = 280 + mouseY * 40;

    background.style.background = `linear-gradient(135deg, 
            hsl(${hue1}, 70%, 60%) 0%, 
            hsl(${hue2}, 60%, 50%) 100%)`;
  }
}

function updateFloatingElements(mouseX, mouseY) {
  // 更新浮动气泡位置
  const bubbles = document.querySelectorAll(".floating-bubble");
  bubbles.forEach((bubble, index) => {
    const factor = (index + 1) * 0.1;
    const offsetX = (mouseX - 0.5) * 30 * factor;
    const offsetY = (mouseY - 0.5) * 20 * factor;

    bubble.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  // 更新花瓣位置
  const petals = document.querySelectorAll(".petal");
  petals.forEach((petal, index) => {
    const factor = (index + 1) * 0.15;
    const offsetX = (mouseX - 0.5) * 25 * factor;
    const offsetY = (mouseY - 0.5) * 15 * factor;

    petal.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX}deg)`;
  });

  // 更新几何图形位置
  const shapes = document.querySelectorAll(".geometric-shape");
  shapes.forEach((shape, index) => {
    const factor = (index + 1) * 0.2;
    const offsetX = (mouseX - 0.5) * 20 * factor;
    const offsetY = (mouseY - 0.5) * 10 * factor;

    shape.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${
      offsetX * 2
    }deg)`;
  });

  // 更新海洋元素
  const waves = document.querySelectorAll(".wave-animation");
  waves.forEach((wave) => {
    const intensity = mouseX * mouseY;
    wave.style.animationDuration = 3 - intensity * 1 + "s";
  });

  // 更新星空元素
  const stars = document.querySelectorAll(".star-twinkle");
  stars.forEach((star, index) => {
    const factor = (index + 1) * 0.1;
    const intensity = mouseX * mouseY * factor;
    star.style.opacity = 0.3 + intensity * 0.7;
    star.style.transform = `scale(${1 + intensity * 0.5})`;
  });
}

// 添加键盘导航支持
document.addEventListener("keydown", (e) => {
  const styleCards = document.querySelectorAll(".style-card");
  const currentFocus = document.activeElement;
  const currentIndex = Array.from(styleCards).indexOf(currentFocus);

  switch (e.key) {
    case "ArrowRight":
    case "ArrowDown": {
      e.preventDefault();
      let nextIndex = (currentIndex + 1) % styleCards.length;
      console.log(nextIndex);
      styleCards[nextIndex].focus();
      break;
    }

    case "ArrowLeft":
    case "ArrowUp": {
      e.preventDefault();
      let prevIndex =
        currentIndex === -1
          ? 0
          : (currentIndex - 1 + styleCards.length) % styleCards.length;
      console.log(prevIndex);
      styleCards[prevIndex].focus();
      break;
    }

    case "Enter":
    case " ":
      if (currentFocus && currentFocus.classList.contains("style-card")) {
        e.preventDefault();
        currentFocus.click();
      }
      break;
  }
});

// 使风格卡片可聚焦
document.querySelectorAll(".style-card").forEach((card) => {
  card.setAttribute("tabindex", "0");

  // 聚焦时的视觉反馈
  card.addEventListener("focus", () => {
    card.style.outline = "3px solid rgba(255, 255, 255, 0.5)";
    card.style.outlineOffset = "4px";
  });

  card.addEventListener("blur", () => {
    card.style.outline = "none";
  });
});

function initMagicPortal() {
  const magicPortal = document.getElementById("magicPortal");
  if (!magicPortal) return;

  // 监听滚动事件，控制传送门显示
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
      magicPortal.classList.add("visible");
    } else {
      magicPortal.classList.remove("visible");
    }
  });

  // 点击传送门返回顶部
  magicPortal.addEventListener("click", (e) => {
    e.preventDefault();

    // 创建魔法爆炸效果
    createMagicExplosion(e);

    // 平滑滚动到顶部
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // 鼠标悬停效果
  magicPortal.addEventListener("mouseenter", () => {
    const particles = magicPortal.querySelectorAll(".particle");
    particles.forEach((particle) => {
      particle.style.animationDuration = "2s";
    });
  });

  magicPortal.addEventListener("mouseleave", () => {
    const particles = magicPortal.querySelectorAll(".particle");
    particles.forEach((particle) => {
      particle.style.animationDuration = "4s";
    });
  });
}

function createMagicExplosion(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 创建魔法粒子爆炸
  const magicEmojis = ["✨", "⭐", "💫", "🌟", "🎆", "💥"];

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.textContent =
      magicEmojis[Math.floor(Math.random() * magicEmojis.length)];

    const angle = (i / 12) * Math.PI * 2;
    const distance = 100 + Math.random() * 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.cssText = `
      position: fixed;
      left: ${centerX}px;
      top: ${centerY}px;
      font-size: ${16 + Math.random() * 8}px;
      pointer-events: none;
      z-index: 10000;
      animation: magicParticleExplosion 1s ease-out forwards;
      --dx: ${dx}px;
      --dy: ${dy}px;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
      document.body.removeChild(particle);
    }, 1000);
  }

  // 创建彩虹光环效果
  const rainbow = document.createElement("div");
  rainbow.style.cssText = `
    position: fixed;
    left: ${centerX - 40}px;
    top: ${centerY - 40}px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      #ff0080,
      #ff8c00,
      #ffd700,
      #00ff80,
      #00bfff,
      #8a2be2,
      #ff0080
    );
    pointer-events: none;
    z-index: 9999;
    animation: magicExplosion 0.8s ease-out forwards;
  `;

  document.body.appendChild(rainbow);

  setTimeout(() => {
    document.body.removeChild(rainbow);
  }, 800);
}

// 自动为所有风格卡片添加下载按钮
function addMissingDownloadButtons() {
  const styleCards = document.querySelectorAll('.style-card');

  styleCards.forEach(card => {
    const cardInfo = card.querySelector('.card-info');
    const existingActions = card.querySelector('.card-actions');

    // 如果已经有下载按钮，跳过
    if (existingActions) {
      return;
    }

    // 获取风格ID
    const styleId = card.dataset.style;
    if (!styleId) {
      return;
    }

    // 创建下载按钮HTML
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'card-actions';
    actionsDiv.innerHTML = `
      <button class="download-btn" data-style="${styleId}">
        <span class="download-icon">📦</span>
        <span class="download-text">下载文件包</span>
        <div class="download-progress">
          <div class="progress-bar"></div>
          <span class="progress-text">0%</span>
        </div>
      </button>
    `;

    // 添加到card-info中
    if (cardInfo) {
      cardInfo.appendChild(actionsDiv);
    }
  });

  console.log('✅ 已为所有风格卡片自动添加下载按钮');
}

// 绑定下载按钮事件
function bindDownloadEvents() {
  const downloadButtons = document.querySelectorAll('.download-btn');

  downloadButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.stopPropagation(); // 阻止事件冒泡到卡片点击事件

      const styleId = button.dataset.style;
      if (!styleId) {
        console.error('未找到风格ID');
        return;
      }

      // 检查是否正在下载
      if (window.downloadManager.isCurrentlyDownloading()) {
        showNotification('已有下载任务正在进行中，请稍后再试', 'warning');
        return;
      }

      try {
        // 设置下载状态
        setDownloadState(button, 'downloading');

        // 开始下载
        const result = await window.downloadManager.downloadStyle(styleId, (progress) => {
          updateDownloadProgress(button, progress);
        });

        // 下载成功
        setDownloadState(button, 'success');
        showNotification(`✅ ${result.fileName} 下载成功！文件大小：${window.downloadManager.formatFileSize(result.fileSize)}`, 'success');

        // 记录下载统计
        try {
          if (window.analyticsService) {
            await window.analyticsService.trackEvent('download', styleId, {
              // file_size: result.fileSize,
              // file_name: result.fileName
            });
          }
        } catch (error) {
          console.warn('⚠️ Failed to track download event:', error);
        }

        // 3秒后恢复正常状态
        setTimeout(() => {
          setDownloadState(button, 'normal');
        }, 3000);

      } catch (error) {
        console.error('下载失败:', error);
        setDownloadState(button, 'error');
        showNotification(`❌ 下载失败：${error.message}`, 'error');

        // 3秒后恢复正常状态
        setTimeout(() => {
          setDownloadState(button, 'normal');
        }, 3000);
      }
    });

    // 阻止下载按钮的悬停效果影响卡片
    button.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
    });

    button.addEventListener('mouseleave', (e) => {
      e.stopPropagation();
    });
  });
}

// 设置下载按钮状态
function setDownloadState(button, state) {
  // 清除所有状态类
  button.classList.remove('downloading', 'success', 'error');

  switch (state) {
    case 'downloading':
      button.classList.add('downloading');
      break;
    case 'success':
      button.classList.add('success');
      button.querySelector('.download-text').textContent = '下载成功';
      button.querySelector('.download-icon').textContent = '✅';
      break;
    case 'error':
      button.classList.add('error');
      button.querySelector('.download-text').textContent = '下载失败';
      button.querySelector('.download-icon').textContent = '❌';
      break;
    case 'normal':
    default:
      button.querySelector('.download-text').textContent = '下载文件包';
      button.querySelector('.download-icon').textContent = '📦';
      updateDownloadProgress(button, 0);
      break;
  }
}

// 更新下载进度
function updateDownloadProgress(button, progress) {
  const progressBar = button.querySelector('.progress-bar');
  const progressText = button.querySelector('.progress-text');

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }

  if (progressText) {
    progressText.textContent = `${progress}%`;
  }
}

// 显示通知
function showNotification(message, type = 'info') {
  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">×</button>
    </div>
  `;

  // 添加样式
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196f3'};
    color: white;
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    max-width: 400px;
    animation: slideInRight 0.3s ease-out;
    font-size: 14px;
    line-height: 1.4;
  `;

  // 添加到页面
  document.body.appendChild(notification);

  // 绑定关闭事件
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    removeNotification(notification);
  });

  // 自动关闭
  setTimeout(() => {
    removeNotification(notification);
  }, 5000);
}

// 移除通知
function removeNotification(notification) {
  if (notification && notification.parentNode) {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
}

// 页面加载完成提示
window.addEventListener("load", () => {
  console.log("🎨 Beautiful Login - 风格选择页面加载完成");
  console.log("🎬 新特性：基于滚动位置的懒加载动画已启用");
  console.log("📦 新功能：支持下载每个风格的完整文件包");
  console.log(
    "📱 支持的风格：现代渐变、深色极简、温馨粉色、商务专业、海洋蓝调、星空科幻、日落余晖、自然森林、奢华钻石、赛博朋克等"
  );
  console.log("🚀 总共39种精美登录风格可供选择！");
  console.log("💡 提示：滚动页面查看优雅的卡片入场动画效果");
});
