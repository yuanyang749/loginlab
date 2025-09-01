/**
 * LoginLab华丽加载动画插件
 * 基于Anime.js v4.1.3实现的专业级品牌文字加载动画
 *
 * @version 1.0.0
 * @author LoginLab Team
 * @requires animejs@4.1.3
 */

/* global anime */

class LoginLabLoader {
  constructor(options = {}) {
    // 默认配置
    this.config = {
      // 容器选择器
      container: "#loginlabLoader",
      // 动画持续时间配置
      duration: {
        textAnimation: 1200,
        lineAnimation: 800,
        subtitleAnimation: 800,
        backgroundRotation: [20000, 15000, 10000],
        breathingEffect: 3000,
        hideAnimation: 800,
      },
      // 进度模拟配置
      progressSteps: [
        { progress: 20, delay: 500, text: "初始化中..." },
        { progress: 45, delay: 800, text: "加载资源..." },
        { progress: 70, delay: 600, text: "准备界面..." },
        { progress: 90, delay: 400, text: "即将完成..." },
        { progress: 100, delay: 300, text: "完成!" },
      ],
      // 延迟配置
      delays: {
        textAnimationStart: 0,
        progressStart: 1500,
        hideAfterComplete: 500,
      },
      // 回调函数
      onComplete: null,
      onProgress: null,
      onHide: null,
      // 自动隐藏
      autoHide: true,
      // 调试模式
      debug: false,
      ...options,
    };

    // 状态管理
    this.state = {
      isInitialized: false,
      isAnimating: false,
      currentProgress: 0,
      targetProgress: 0,
    };

    // DOM元素引用
    this.elements = {};

    this.init();
  }

  /**
   * 初始化加载器
   */
  init() {
    try {
      this.log("初始化LoginLab加载器...");

      // 检查依赖
      if (!this.checkDependencies()) {
        this.fallbackHide();
        return;
      }

      // 获取DOM元素
      if (!this.getDOMElements()) {
        this.fallbackHide();
        return;
      }

      // 设置文字动画
      this.setupTextAnimation();

      // 启动背景动画
      this.startBackgroundAnimation();

      // 模拟加载进度
      if (this.config.autoHide) {
        this.simulateLoading();
      }

      this.state.isInitialized = true;
      this.log("LoginLab加载器初始化完成");
    } catch (error) {
      this.error("初始化失败:", error);
      this.fallbackHide();
    }
  }

  /**
   * 检查依赖项
   */
  checkDependencies() {
    if (typeof anime === "undefined") {
      this.error("Anime.js库未加载，请确保已正确引入Anime.js v4.1.3");
      return false;
    }

    // 检查Anime.js v4的核心方法是否存在
    try {
      const animeLib = window.anime || anime;
      const { createTimeline, animate } = animeLib;

      // 更宽松的检查，只要核心方法存在即可
      if (
        typeof createTimeline !== "function" ||
        typeof animate !== "function"
      ) {
        this.error("Anime.js版本不兼容，请使用v4.1.3或更高版本");
        return false;
      }

      this.log("Anime.js依赖检查通过");
      return true;
    } catch (error) {
      this.error("Anime.js API访问失败:", error);
      return false;
    }
  }

  /**
   * 获取DOM元素
   */
  getDOMElements() {
    this.elements.loader = document.querySelector(this.config.container);
    if (!this.elements.loader) {
      this.error(`找不到加载器容器: ${this.config.container}`);
      return false;
    }

    this.elements.progressFill =
      this.elements.loader.querySelector(".progress-fill");
    this.elements.progressText = this.elements.loader.querySelector(
      ".progress-percentage"
    );
    this.elements.titleLetters = this.elements.loader.querySelector(".letters");
    this.elements.subtitleLetters =
      this.elements.loader.querySelector(".subtitle-letters");

    return true;
  }

  /**
   * 设置文字动画
   */
  setupTextAnimation() {
    // 将主标题文字包装成单个字母
    if (this.elements.titleLetters) {
      this.elements.titleLetters.innerHTML =
        this.elements.titleLetters.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
    }

    // 将副标题文字包装成单个字母
    if (this.elements.subtitleLetters) {
      this.elements.subtitleLetters.innerHTML =
        this.elements.subtitleLetters.textContent.replace(
          /\S/g,
          "<span class='subtitle-letter'>$&</span>"
        );
    }

    // 延迟启动文字动画
    setTimeout(() => {
      this.animateText();
    }, this.config.delays.textAnimationStart);
  }

  /**
   * 执行文字动画
   */
  animateText() {
    try {
      const { createTimeline, stagger } = anime;

      const timeline = createTimeline({
        defaults: {
          ease: "outExpo",
        },
      });

      // 装饰线条动画
      timeline.add(".line", {
        scaleX: [0, 1],
        opacity: [0, 0.8],
        duration: this.config.duration.lineAnimation,
        delay: stagger(200),
      });

      // 主标题字母动画
      timeline.add(
        ".letter",
        {
          scale: [0.3, 1],
          opacity: [0, 1],
          translateY: [50, 0],
          rotateZ: [180, 0],
          duration: this.config.duration.textAnimation,
          delay: stagger(100),
        },
        "-=400"
      );

      // 副标题字母动画
      timeline.add(
        ".subtitle-letter",
        {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: this.config.duration.subtitleAnimation,
          delay: stagger(50),
        },
        "-=600"
      );

      this.log("文字动画已启动");
    } catch (error) {
      this.error("文字动画执行失败:", error);
    }
  }

  /**
   * 启动背景动画
   */
  startBackgroundAnimation() {
    try {
      const animeLib = window.anime || anime;
      const { animate, stagger } = animeLib;

      // 背景圆圈旋转动画
      animate(".loader-circle-1", {
        rotate: 360,
        duration: this.config.duration.backgroundRotation[0],
        loop: true,
        ease: "linear",
      });

      animate(".loader-circle-2", {
        rotate: -360,
        duration: this.config.duration.backgroundRotation[1],
        loop: true,
        ease: "linear",
      });

      animate(".loader-circle-3", {
        rotate: 360,
        duration: this.config.duration.backgroundRotation[2],
        loop: true,
        ease: "linear",
      });

      // 圆圈缩放呼吸效果
      animate(".loader-circle", {
        scale: [1, 1.1, 1],
        opacity: [0.1, 0.3, 0.1],
        duration: this.config.duration.breathingEffect,
        loop: true,
        ease: "inOutSine",
        delay: stagger(1000),
      });

      this.log("背景动画已启动");
    } catch (error) {
      this.error("背景动画执行失败:", error);
    }
  }

  /**
   * 基于真实资源加载的进度跟踪
   */
  simulateLoading() {
    // 如果页面已经加载完成，直接隐藏
    if (document.readyState === "complete") {
      this.log("页面已加载完成，快速隐藏加载器");
      setTimeout(() => {
        this.updateProgress(100);
        if (this.config.autoHide) {
          this.hide();
        }
      }, 800); // 给文字动画一些时间
      return;
    }

    // 跟踪真实的加载状态
    this.trackRealLoadingProgress();
  }

  /**
   * 跟踪真实的页面加载进度
   */
  trackRealLoadingProgress() {
    let progress = 0;
    const maxLoadTime = 5000; // 最大加载时间5秒

    // 1. DOM内容加载完成
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        progress = Math.max(progress, 30);
        this.updateProgress(progress);
        this.log("DOM内容加载完成");
      });
    } else {
      progress = 30;
      this.updateProgress(progress);
    }

    // 2. 跟踪图片和其他资源加载
    this.trackResourceLoading((resourceProgress) => {
      progress = Math.max(progress, 30 + resourceProgress * 0.6); // 30-90%
      this.updateProgress(progress);
    });

    // 3. 页面完全加载完成
    const handleLoad = () => {
      progress = 100;
      this.updateProgress(progress);
      this.log("页面完全加载完成");

      if (this.config.autoHide) {
        setTimeout(() => this.hide(), this.config.delays.hideAfterComplete);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    // 4. 超时保护 - 确保加载器不会无限显示
    setTimeout(() => {
      if (progress < 100) {
        this.log("加载超时，强制完成");
        progress = 100;
        this.updateProgress(progress);
        if (this.config.autoHide) {
          this.hide();
        }
      }
    }, maxLoadTime);

    this.log("真实加载进度跟踪已启动");
  }

  /**
   * 跟踪资源加载进度
   */
  trackResourceLoading(onProgress) {
    const images = document.querySelectorAll("img");
    const scripts = document.querySelectorAll("script[src]");
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

    const totalResources = images.length + scripts.length + stylesheets.length;
    let loadedResources = 0;

    if (totalResources === 0) {
      onProgress(1);
      return;
    }

    const updateResourceProgress = () => {
      loadedResources++;
      const resourceProgress = loadedResources / totalResources;
      onProgress(resourceProgress);
      this.log(
        `资源加载进度: ${loadedResources}/${totalResources} (${Math.round(
          resourceProgress * 100
        )}%)`
      );
    };

    // 跟踪图片加载
    images.forEach((img) => {
      if (img.complete) {
        updateResourceProgress();
      } else {
        img.addEventListener("load", updateResourceProgress, { once: true });
        img.addEventListener("error", updateResourceProgress, { once: true });
      }
    });

    // 跟踪脚本加载（已加载的脚本）
    scripts.forEach((script) => {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        updateResourceProgress();
      } else {
        script.addEventListener("load", updateResourceProgress, { once: true });
        script.addEventListener("error", updateResourceProgress, {
          once: true,
        });
      }
    });

    // 跟踪样式表加载
    stylesheets.forEach((link) => {
      if (link.sheet) {
        updateResourceProgress();
      } else {
        link.addEventListener("load", updateResourceProgress, { once: true });
        link.addEventListener("error", updateResourceProgress, { once: true });
      }
    });
  }

  /**
   * 更新进度
   */
  updateProgress(target) {
    this.state.targetProgress = target;

    const animate = () => {
      if (this.state.currentProgress < this.state.targetProgress) {
        this.state.currentProgress +=
          (this.state.targetProgress - this.state.currentProgress) * 0.1;

        if (this.elements.progressFill) {
          this.elements.progressFill.style.width =
            this.state.currentProgress + "%";
        }

        if (this.elements.progressText) {
          this.elements.progressText.textContent =
            Math.round(this.state.currentProgress) + "%";
        }

        if (
          Math.abs(this.state.targetProgress - this.state.currentProgress) > 0.5
        ) {
          requestAnimationFrame(animate);
        }
      }
    };

    animate();
  }

  /**
   * 隐藏加载器
   */
  hide() {
    if (!this.state.isInitialized) {
      this.fallbackHide();
      return;
    }

    try {
      const animeLib =
        window.anime || (typeof anime !== "undefined" ? anime : null);
      if (animeLib) {
        const { animate } = animeLib;

        animate(this.config.container, {
          opacity: [1, 0],
          scale: [1, 1.1],
          duration: this.config.duration.hideAnimation,
          ease: "inExpo",
          onComplete: () => {
            if (this.elements.loader) {
              this.elements.loader.style.display = "none";
            }

            // 触发隐藏完成回调
            if (this.config.onHide) {
              this.config.onHide();
            }

            // 触发完成回调
            if (this.config.onComplete) {
              this.config.onComplete();
            }

            this.log("加载器已隐藏");
          },
        });
      } else {
        this.fallbackHide();
      }
    } catch (error) {
      this.error("隐藏动画执行失败:", error);
      this.fallbackHide();
    }
  }

  /**
   * 降级隐藏方案
   */
  fallbackHide() {
    this.log("使用降级隐藏方案");

    setTimeout(() => {
      if (this.elements.loader) {
        this.elements.loader.classList.add("hide");
        setTimeout(() => {
          this.elements.loader.style.display = "none";

          if (this.config.onComplete) {
            this.config.onComplete();
          }
        }, 500);
      }
    }, 2000);
  }

  /**
   * 手动设置进度
   */
  setProgress(progress) {
    this.updateProgress(Math.max(0, Math.min(100, progress)));
  }

  /**
   * 获取当前进度
   */
  getProgress() {
    return this.state.currentProgress;
  }

  /**
   * 日志输出
   */
  log(...args) {
    if (this.config.debug) {
      console.log("[LoginLabLoader]", ...args);
    }
  }

  /**
   * 错误输出
   */
  error(...args) {
    console.error("[LoginLabLoader]", ...args);
  }

  /**
   * 销毁加载器
   */
  destroy() {
    if (this.elements.loader) {
      this.elements.loader.remove();
    }
    this.elements = {};
    this.state = {};
    this.log("加载器已销毁");
  }
}

// 导出类
if (typeof module !== "undefined" && module.exports) {
  module.exports = LoginLabLoader;
} else if (typeof window !== "undefined") {
  window.LoginLabLoader = LoginLabLoader;
}
