/* eslint-disable no-undef */
// 3D 科幻登录页面 JavaScript - 优化版本
class SciFiLogin {
  constructor() {
    console.log("🎬 SciFiLogin 构造函数开始执行");
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.particleSystem = null;
    this.lightPoints = []; // 初始化光点数组
    this.geometryObjects = []; // 初始化几何体对象数组
    this.mouse = { x: 0, y: 0 };
    this.mouseTarget = { x: 0, y: 0 };

    // 背景图片相关 - 使用本地图片和备用方案
    this.backgroundImages = [
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&h=1080&fit=crop",
    ];
    this.currentImageIndex = 0;
    this.imageLoadAttempts = 0;
    this.maxLoadAttempts = 2; // 减少尝试次数

    console.log("🔍 检查 WebGL 支持...");
    this.isWebGLSupported = this.checkWebGLSupport();
    console.log(`WebGL 支持状态: ${this.isWebGLSupported}`);

    // 标记已初始化
    window.scifiLoginInitialized = true;

    console.log("🚀 开始初始化系统...");
    this.init();
  }

  // 检查 WebGL 支持
  checkWebGLSupport() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  // 初始化
  async init() {
    console.log("🔧 开始初始化流程...");

    if (!this.isWebGLSupported) {
      console.log("❌ WebGL 不支持，显示错误页面");
      this.showWebGLError();
      return;
    }

    console.log("✅ WebGL 支持检查通过");

    // 首先加载背景图片
    console.log("🖼️ 开始加载背景图片...");
    await this.loadBackgroundImage();

    console.log("🎨 初始化 Three.js...");
    this.initThreeJS();

    console.log("🌌 创建粒子系统...");
    try {
      this.createParticleSystem();
    } catch (error) {
      console.error("❌ 粒子系统创建失败:", error);
      // 继续执行，不中断初始化流程
    }

    console.log("🎮 设置事件监听器...");
    this.setupEventListeners();

    console.log("🎬 开始动画循环...");
    this.animate();

    console.log("🎯 隐藏加载指示器...");
    this.hideLoadingIndicator();

    console.log("📝 初始化表单交互...");
    this.initFormInteractions();

    console.log("🎉 3D 科幻登录页面初始化完成！");
  }

  // 加载背景图片 - 简化版本，直接使用降级背景
  async loadBackgroundImage() {
    const imageLoadingElement = document.getElementById("image-loading");

    if (imageLoadingElement) {
      imageLoadingElement.classList.remove("hidden");
    }

    console.log("🎨 使用优化的科幻渐变背景");

    // 直接使用美观的降级背景，避免网络请求问题
    this.setFallbackBackground();

    // 隐藏图片加载指示器
    if (imageLoadingElement) {
      setTimeout(() => {
        imageLoadingElement.classList.add("hidden");
      }, 1000);
    }
  }

  // 获取背景图片 - 使用预设的高质量图片URL
  async fetchUnsplashImage(index) {
    try {
      const imageUrl = this.backgroundImages[index];
      console.log(
        `🔍 尝试获取图片: ${index + 1}/${this.backgroundImages.length}`
      );
      return imageUrl;
    } catch (error) {
      console.error("获取背景图片失败:", error);
      return null;
    }
  }

  // 预加载图片 - 移除 crossOrigin 避免 CORS 问题
  preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // 不设置 crossOrigin，避免 CORS 问题
      img.onload = () => {
        console.log(`✅ 图片预加载成功: ${url.substring(0, 50)}...`);
        resolve(img);
      };
      img.onerror = (error) => {
        console.warn(`❌ 图片预加载失败: ${url.substring(0, 50)}...`, error);
        reject(new Error(`图片加载失败: ${url}`));
      };
      img.src = url;
    });
  }

  // 设置降级背景 - 创建美观的科幻渐变背景
  setFallbackBackground() {
    console.log("🎨 使用科幻渐变背景");
    const backgroundImageElement = document.getElementById("background-image");

    // 创建动态科幻背景
    backgroundImageElement.innerHTML = `
      <div class="sci-fi-bg-layer layer-1"></div>
      <div class="sci-fi-bg-layer layer-2"></div>
      <div class="sci-fi-bg-layer layer-3"></div>
      <div class="sci-fi-stars"></div>
    `;

    // 添加动画类
    backgroundImageElement.classList.add("fallback-animated");

    // 创建动态星星
    this.createFallbackStars();
  }

  // 创建降级背景的星星效果
  createFallbackStars() {
    const starsContainer = document.querySelector(".sci-fi-stars");
    if (!starsContainer) return;

    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "fallback-star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 3 + "s";
      star.style.animationDuration = Math.random() * 2 + 1 + "s";
      starsContainer.appendChild(star);
    }
  }

  // 显示 WebGL 错误
  showWebGLError() {
    showError("webgl");
  }

  // 隐藏加载指示器
  hideLoadingIndicator() {
    console.log("⏰ 2秒后隐藏加载指示器...");
    setTimeout(() => {
      const loadingElement = document.getElementById("loading-indicator");
      if (loadingElement) {
        // 使用多种方法确保隐藏
        loadingElement.classList.add("hidden");
        loadingElement.style.display = "none";
        loadingElement.style.visibility = "hidden";
        loadingElement.style.opacity = "0";
        console.log("✅ 加载指示器已隐藏（使用多重方法）");
        console.log(
          `当前样式: display=${loadingElement.style.display}, visibility=${loadingElement.style.visibility}`
        );
      } else {
        console.log("⚠️ 找不到加载指示器元素");
      }
    }, 2000);
  }

  // 初始化 Three.js
  initThreeJS() {
    const canvas = document.getElementById("threejs-canvas");

    // 创建场景
    this.scene = new THREE.Scene();

    // 创建相机（扩大远裁剪面，提升深空空间感）
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );
    this.camera.position.z = 8;

    // 创建渲染器（限制 DPR 以提升性能）
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: false, // 后续若引入 FXAA，可关闭原生 AA
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);
  }

  // 创建粒子系统
  createParticleSystem() {
    console.log("� 创建星幕...");
    this.createStarfield();

    console.log("�🌟 创建前景浮动粒子（精简版）...");
    this.createFloatingParticles();

    console.log("💡 创建光点系统（少量点缀）...");
    this.createLightPoints();

    console.log("💡 设置光照...");
    this.createLighting();

    console.log(
      `✅ 粒子系统创建完成 - 前景粒子: ${
        this.particleData ? this.particleData.length : 0
      }, 光点: ${this.lightPoints ? this.lightPoints.length : 0}`
    );
  }

  // 创建深空星幕（球壳分布的海量星点）
  createStarfield() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const STAR_COUNT = isMobile ? 20000 : 80000;
    const RADIUS = isMobile ? 1200 : 2200;

    const positions = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);

    const colorA = new THREE.Color(0x9fdcff);
    const colorB = new THREE.Color(0x9f8fff);
    const c = new THREE.Color();

    for (let i = 0; i < STAR_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = RADIUS * (0.65 + Math.random() * 0.35);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const i3 = i * 3;
      positions[i3 + 0] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      c.copy(colorA).lerp(colorB, Math.random());
      colors[i3 + 0] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const sprite = this.createCircleSpriteTexture(64);

    const material = new THREE.PointsMaterial({
      size: 6.0,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      map: sprite,
      blending: THREE.NormalBlending, // 使用普通混合避免透明像素累加
      sizeAttenuation: true,
      opacity: 0.9,
      alphaTest: 0.6, // 更严格的阈值，彻底去掉方形边
    });

    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
  }

  // 生成圆形发光的点纹理，避免“方块像素点”
  createCircleSpriteTexture(size = 64) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const r = size / 2;
    const g = ctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0.0, "rgba(255,255,255,1)");
    g.addColorStop(0.5, "rgba(180,220,255,0.8)");
    g.addColorStop(1.0, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(r, r, r, 0, Math.PI * 2);
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }

  // 创建浮动粒子（使用圆形点纹理，避免方块感；数量与距离收敛）
  createFloatingParticles() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const particleCount = isMobile ? 180 : 420; // 精简数量，突出深空星幕

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    this.particleData = [];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // 控制在相机后方的较远位置，避免粒子靠太近造成巨大像素点
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 60;
      const z = -15 - Math.random() * 45; // [-60, -15]

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      // 冷色渐变
      const colorType = Math.random();
      if (colorType < 0.4) {
        colors[i3] = 0.2;
        colors[i3 + 1] = 0.8;
        colors[i3 + 2] = 1.0; // 青
      } else if (colorType < 0.7) {
        colors[i3] = 0.1;
        colors[i3 + 1] = 0.4;
        colors[i3 + 2] = 1.0; // 蓝
      } else {
        colors[i3] = 0.9;
        colors[i3 + 1] = 0.9;
        colors[i3 + 2] = 1.0; // 白
      }

      sizes[i] = Math.random() * 1.2 + 0.6; // 更小的尺寸

      this.particleData.push({
        velocity: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        originalY: y,
        floatSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const sprite = this.createCircleSpriteTexture(32);
    const material = new THREE.PointsMaterial({
      size: 3.0,
      map: sprite,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      sizeAttenuation: true,
      opacity: 0.85,
      alphaTest: 0.6,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  // 创建光点系统
  createLightPoints() {
    const lightPointCount = window.innerWidth < 768 ? 20 : 40;

    // 确保数组已初始化
    if (!this.lightPoints) {
      this.lightPoints = [];
    }

    for (let i = 0; i < lightPointCount; i++) {
      // 创建光点几何体
      const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const lightMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.2 + 0.5, 1, 0.8),
        transparent: true,
        opacity: 0.8,
      });

      const lightPoint = new THREE.Mesh(lightGeometry, lightMaterial);

      // 随机位置
      lightPoint.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );

      this.scene.add(lightPoint);
      this.lightPoints.push({
        mesh: lightPoint,
        velocity: {
          x: (Math.random() - 0.5) * 0.05,
          y: (Math.random() - 0.5) * 0.05,
          z: (Math.random() - 0.5) * 0.05,
        },
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // 创建能量球
    const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x8000ff,
      transparent: true,
      opacity: 0.6,
      wireframe: true,
    });

    const energySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    energySphere.position.set(3, -2, -1);
    this.scene.add(energySphere);
    this.geometryObjects.push({
      mesh: energySphere,
      rotationSpeed: { x: 0.02, y: 0.01, z: 0.015 },
      floatSpeed: 0.02,
      floatAmplitude: 0.5,
    });

    // 创建数据流线条
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    for (let i = 0; i < 50; i++) {
      linePositions.push(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      );
    }
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ff80,
      transparent: true,
      opacity: 0.4,
    });

    const dataLines = new THREE.Line(lineGeometry, lineMaterial);
    this.scene.add(dataLines);
    this.geometryObjects.push({
      mesh: dataLines,
      rotationSpeed: { x: 0, y: 0.005, z: 0 },
    });
  }

  // 创建光照
  createLighting() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);

    // 点光源
    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight1.position.set(10, 10, 10);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff0080, 0.8, 100);
    pointLight2.position.set(-10, -10, 5);
    this.scene.add(pointLight2);
  }

  // 设置事件监听器
  setupEventListeners() {
    // 窗口大小调整
    window.addEventListener("resize", () => this.onWindowResize());

    // 鼠标移动 - 用于视差效果
    document.addEventListener("mousemove", (event) => this.onMouseMove(event));

    // 触摸移动 (移动端)
    document.addEventListener("touchmove", (event) => this.onTouchMove(event));

    // 设备方向变化 (移动端)
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", (event) =>
        this.onDeviceOrientation(event)
      );
    }
  }

  // 窗口大小调整处理
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // 鼠标移动处理 - 增强视差效果
  onMouseMove(event) {
    this.mouseTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseTarget.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 平滑过渡到目标位置
    this.mouse.x += (this.mouseTarget.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouseTarget.y - this.mouse.y) * 0.05;

    // 应用视差效果到背景
    this.applyParallaxEffect();

    // 应用3D透视变换到表单
    this.applyFormPerspective();
  }

  // 应用视差效果
  applyParallaxEffect() {
    const backgroundImage = document.getElementById("background-image");
    if (backgroundImage) {
      const moveX = this.mouse.x * 20;
      const moveY = this.mouse.y * 20;
      backgroundImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }
  }

  // 应用表单3D透视变换
  applyFormPerspective() {
    const formContainers = document.querySelectorAll(".form-container");
    formContainers.forEach((container) => {
      if (!container.classList.contains("hidden")) {
        const rotateX = this.mouse.y * 5;
        const rotateY = this.mouse.x * 5;
        const translateZ = Math.abs(this.mouse.x + this.mouse.y) * 10;

        container.style.transform = `
          translate(-50%, -50%)
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateZ(${translateZ}px)
        `;
      }
    });
  }

  // 设备方向处理 (移动端)
  onDeviceOrientation(event) {
    if (event.gamma && event.beta) {
      this.mouseTarget.x = event.gamma / 45; // -1 到 1
      this.mouseTarget.y = event.beta / 45; // -1 到 1

      // 限制范围
      this.mouseTarget.x = Math.max(-1, Math.min(1, this.mouseTarget.x));
      this.mouseTarget.y = Math.max(-1, Math.min(1, this.mouseTarget.y));
    }
  }

  // 触摸移动处理
  onTouchMove(event) {
    if (event.touches.length > 0) {
      this.mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }

  // 动画循环
  animate() {
    requestAnimationFrame(() => this.animate());

    // 性能计数
    if (this.performanceStats) {
      this.performanceStats.frameCount++;
    }

    const time = Date.now() * 0.001;

    // 更新前景浮动粒子
    if (this.particles && this.particleData) {
      const positions = this.particles.geometry.attributes.position.array;

      // 轻微整体旋转，营造层次
      this.particles.rotation.y += 0.0005;

      for (let i = 0; i < this.particleData.length; i++) {
        const particle = this.particleData[i];
        const i3 = i * 3;

        // 浮动动画
        positions[i3 + 1] =
          particle.originalY + Math.sin(time * particle.floatSpeed + i) * 2;

        // 粒子吸引效果
        if (this.attractionPoint) {
          const dx = this.attractionPoint.x - positions[i3];
          const dy = this.attractionPoint.y - positions[i3 + 1];
          const dz = 0 - positions[i3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 20) {
            const force = this.attractionPoint.strength / (distance + 1);
            positions[i3] += dx * force;
            positions[i3 + 1] += dy * force;
            positions[i3 + 2] += dz * force;
          }
        }

        // 缓慢移动
        positions[i3] += particle.velocity.x;
        positions[i3 + 2] += particle.velocity.z;

        // 边界检查和重置
        if (Math.abs(positions[i3]) > 30) {
          positions[i3] = (Math.random() - 0.5) * 60;
        }
        if (Math.abs(positions[i3 + 2]) > 30) {
          positions[i3 + 2] = (Math.random() - 0.5) * 60;
        }
      }

      this.particles.geometry.attributes.position.needsUpdate = true;

      // 整体缓慢旋转
      this.particles.rotation.y += 0.0005;
    }

    // 更新光点
    if (this.lightPoints) {
      this.lightPoints.forEach((lightPoint) => {
        const mesh = lightPoint.mesh;

        // 移动
        mesh.position.x += lightPoint.velocity.x;
        mesh.position.y += lightPoint.velocity.y;
        mesh.position.z += lightPoint.velocity.z;

        // 脉冲效果
        const pulse = Math.sin(
          time * lightPoint.pulseSpeed + lightPoint.pulsePhase
        );
        mesh.material.opacity = 0.5 + pulse * 0.3;
        mesh.scale.setScalar(0.8 + pulse * 0.4);

        // 边界检查
        if (Math.abs(mesh.position.x) > 20) lightPoint.velocity.x *= -1;
        if (Math.abs(mesh.position.y) > 20) lightPoint.velocity.y *= -1;
        if (Math.abs(mesh.position.z) > 20) lightPoint.velocity.z *= -1;
      });
    }

    // 更新几何体对象
    if (this.geometryObjects) {
      this.geometryObjects.forEach((obj, index) => {
        const mesh = obj.mesh;
        const speed = obj.rotationSpeed;

        // 旋转
        if (speed) {
          mesh.rotation.x += speed.x;
          mesh.rotation.y += speed.y;
          mesh.rotation.z += speed.z;
        }

        // 浮动效果
        if (obj.floatSpeed && obj.floatAmplitude) {
          mesh.position.y +=
            Math.sin(time * obj.floatSpeed + index) * obj.floatAmplitude * 0.01;
        }
      });
    }

    // 相机微妙跟随鼠标 - 增强景深效果
    this.camera.position.x +=
      (this.mouse.x * 0.3 - this.camera.position.x) * 0.02;
    this.camera.position.y +=
      (this.mouse.y * 0.3 - this.camera.position.y) * 0.02;

    // 相机轻微摇摆
    this.camera.position.z = 5 + Math.sin(time * 0.5) * 0.2;

    // 相机看向场景中心，但有轻微偏移
    const lookAtTarget = new THREE.Vector3(
      this.mouse.x * 0.1,
      this.mouse.y * 0.1,
      0
    );
    this.camera.lookAt(lookAtTarget);

    this.renderer.render(this.scene, this.camera);
  }

  // 初始化表单交互
  initFormInteractions() {
    // 表单切换
    this.setupFormSwitching();

    // 验证码功能
    this.setupVerificationCode();

    // 表单验证
    this.setupFormValidation();

    // 高级交互效果
    this.setupAdvancedInteractions();

    // 音效模拟系统
    this.setupSoundEffectSimulation();

    // 性能监控系统
    this.setupPerformanceMonitoring();
  }

  // 设置表单切换
  setupFormSwitching() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");

    // 显示注册表单
    document.getElementById("showRegister").addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
    });

    // 返回登录
    document.getElementById("backToLogin").addEventListener("click", (e) => {
      e.preventDefault();
      registerForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    });

    // 显示忘记密码表单
    document.getElementById("forgotPassword").addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("hidden");
      forgotPasswordForm.classList.remove("hidden");
    });

    // 从重置密码返回登录
    document
      .getElementById("backToLoginFromReset")
      .addEventListener("click", (e) => {
        e.preventDefault();
        forgotPasswordForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
      });
  }

  // 设置验证码功能
  setupVerificationCode() {
    const sendCodeBtns = ["sendCodeBtn", "regSendCodeBtn"];

    sendCodeBtns.forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener("click", () => this.sendVerificationCode(btn));
      }
    });
  }

  // 发送验证码
  sendVerificationCode(button) {
    let countdown = 60;
    button.disabled = true;
    button.textContent = `${countdown}s`;

    const timer = setInterval(() => {
      countdown--;
      button.textContent = `${countdown}s`;

      if (countdown <= 0) {
        clearInterval(timer);
        button.disabled = false;
        button.textContent = "获取验证码";
      }
    }, 1000);

    // 模拟发送验证码
    console.log("验证码已发送");
  }

  // 设置表单验证
  setupFormValidation() {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    });
  }

  // 处理表单提交
  handleFormSubmit(form) {
    const formData = new FormData(form);
    const formType = form.closest(".form-container").id;

    console.log(`提交表单: ${formType}`, Object.fromEntries(formData));

    // 这里可以添加实际的表单提交逻辑
    alert("表单提交成功！(演示模式)");
  }

  // 设置高级交互效果
  setupAdvancedInteractions() {
    console.log("🎮 设置高级交互效果");

    // 输入框聚焦时的粒子吸引效果
    this.setupInputParticleEffects();

    // 按钮悬停时的能量波动效果
    this.setupButtonEnergyEffects();

    // 表单切换时的粒子爆发效果
    this.setupFormTransitionEffects();

    // 键盘输入时的数字雨效果
    this.setupTypingEffects();
  }

  // 输入框粒子效果
  setupInputParticleEffects() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        this.createInputParticleAttraction(input);
      });

      input.addEventListener("blur", () => {
        this.releaseInputParticleAttraction();
      });
    });
  }

  // 创建输入框粒子吸引效果
  createInputParticleAttraction(input) {
    if (!this.particles) return;

    const rect = input.getBoundingClientRect();
    const centerX =
      ((rect.left + rect.width / 2 - window.innerWidth / 2) /
        window.innerWidth) *
      60;
    const centerY =
      (-(rect.top + rect.height / 2 - window.innerHeight / 2) /
        window.innerHeight) *
      60;

    // 标记吸引点
    this.attractionPoint = { x: centerX, y: centerY, strength: 0.1 };

    console.log(
      `🧲 激活粒子吸引效果: (${centerX.toFixed(2)}, ${centerY.toFixed(2)})`
    );
  }

  // 释放粒子吸引效果
  releaseInputParticleAttraction() {
    this.attractionPoint = null;
    console.log("🔄 释放粒子吸引效果");
  }

  // 按钮能量效果
  setupButtonEnergyEffects() {
    const buttons = document.querySelectorAll(".login-btn, .verify-btn");
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        this.createButtonEnergyField(button);
      });

      button.addEventListener("mouseleave", () => {
        this.removeButtonEnergyField(button);
      });

      button.addEventListener("click", () => {
        this.triggerButtonEnergyBurst(button);
      });
    });
  }

  // 创建按钮能量场
  createButtonEnergyField(button) {
    button.classList.add("energy-active");

    // 创建能量粒子
    const energyParticles = document.createElement("div");
    energyParticles.className = "button-energy-particles";
    energyParticles.innerHTML = Array.from(
      { length: 8 },
      (_, i) =>
        `<div class="energy-particle" style="--delay: ${i * 0.1}s"></div>`
    ).join("");

    button.appendChild(energyParticles);
  }

  // 移除按钮能量场
  removeButtonEnergyField(button) {
    button.classList.remove("energy-active");
    const energyParticles = button.querySelector(".button-energy-particles");
    if (energyParticles) {
      energyParticles.remove();
    }
  }

  // 触发按钮能量爆发
  triggerButtonEnergyBurst(button) {
    const burst = document.createElement("div");
    burst.className = "energy-burst";
    button.appendChild(burst);

    setTimeout(() => burst.remove(), 1000);

    // 同时影响3D粒子
    this.triggerParticleBurst();
  }

  // 触发粒子爆发
  triggerParticleBurst() {
    if (!this.particles || !this.particleData) return;

    // 临时增加粒子速度
    this.particleData.forEach((particle) => {
      particle.velocity.x *= 3;
      particle.velocity.y *= 3;
      particle.velocity.z *= 3;
    });

    // 2秒后恢复正常速度
    setTimeout(() => {
      this.particleData.forEach((particle) => {
        particle.velocity.x /= 3;
        particle.velocity.y /= 3;
        particle.velocity.z /= 3;
      });
    }, 2000);
  }

  // 表单切换效果
  setupFormTransitionEffects() {
    const formLinks = document.querySelectorAll(".hologram-link");
    formLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.createFormTransitionEffect();
      });
    });
  }

  // 创建表单切换效果
  createFormTransitionEffect() {
    // 创建全屏闪光效果
    const flash = document.createElement("div");
    flash.className = "form-transition-flash";
    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 500);

    // 粒子系统响应
    if (this.lightPoints) {
      this.lightPoints.forEach((lightPoint) => {
        lightPoint.pulseSpeed *= 5;
      });

      setTimeout(() => {
        this.lightPoints.forEach((lightPoint) => {
          lightPoint.pulseSpeed /= 5;
        });
      }, 1000);
    }
  }

  // 键盘输入效果
  setupTypingEffects() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        this.createTypingParticle(input, e.data);
      });
    });
  }

  // 创建输入粒子效果
  createTypingParticle(input, character) {
    if (!character) return;

    const rect = input.getBoundingClientRect();
    const particle = document.createElement("div");
    particle.className = "typing-particle";
    particle.textContent = character;
    particle.style.left = rect.right - 20 + "px";
    particle.style.top = rect.top + "px";

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
  }

  // 音效模拟系统
  setupSoundEffectSimulation() {
    console.log("🔊 设置音效模拟系统");

    // 为不同的交互添加音效模拟
    this.setupButtonSounds();
    this.setupInputSounds();
    this.setupTransitionSounds();
  }

  // 按钮音效模拟
  setupButtonSounds() {
    const buttons = document.querySelectorAll(".login-btn, .verify-btn");
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        this.playVisualSound("hover");
      });

      button.addEventListener("click", () => {
        this.playVisualSound("click");
      });
    });
  }

  // 输入框音效模拟
  setupInputSounds() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        this.playVisualSound("focus");
      });

      input.addEventListener("input", () => {
        this.playVisualSound("type");
      });
    });
  }

  // 切换音效模拟
  setupTransitionSounds() {
    const links = document.querySelectorAll(".hologram-link");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        this.playVisualSound("transition");
      });
    });
  }

  // 播放视觉音效
  playVisualSound(type) {
    const soundIndicator = document.createElement("div");
    soundIndicator.className = `sound-indicator sound-${type}`;

    // 根据音效类型设置不同的视觉效果
    switch (type) {
      case "hover":
        soundIndicator.innerHTML = "♪";
        soundIndicator.style.color = "#00ffff";
        break;
      case "click":
        soundIndicator.innerHTML = "♫";
        soundIndicator.style.color = "#ff0080";
        break;
      case "focus":
        soundIndicator.innerHTML = "♬";
        soundIndicator.style.color = "#00ff80";
        break;
      case "type":
        soundIndicator.innerHTML = "♩";
        soundIndicator.style.color = "#ffff00";
        break;
      case "transition":
        soundIndicator.innerHTML = "♪♫♬";
        soundIndicator.style.color = "#8a2be2";
        break;
    }

    // 随机位置显示
    soundIndicator.style.position = "fixed";
    soundIndicator.style.top = Math.random() * 100 + "px";
    soundIndicator.style.right = "20px";
    soundIndicator.style.fontSize = "16px";
    soundIndicator.style.zIndex = "9999";
    soundIndicator.style.pointerEvents = "none";
    soundIndicator.style.animation = "soundFloat 1s ease-out forwards";

    document.body.appendChild(soundIndicator);

    setTimeout(() => soundIndicator.remove(), 1000);

    // 同时触发粒子系统响应
    this.triggerSoundParticleResponse(type);
  }

  // 音效粒子响应
  triggerSoundParticleResponse(type) {
    if (!this.lightPoints) return;

    // 根据音效类型触发不同的粒子响应
    const responseIntensity = {
      hover: 1.2,
      click: 2.0,
      focus: 1.5,
      type: 1.1,
      transition: 3.0,
    };

    const intensity = responseIntensity[type] || 1.0;

    // 随机选择几个光点进行响应
    const respondingPoints = Math.floor(this.lightPoints.length * 0.3);
    for (let i = 0; i < respondingPoints; i++) {
      const randomIndex = Math.floor(Math.random() * this.lightPoints.length);
      const lightPoint = this.lightPoints[randomIndex];

      if (lightPoint) {
        lightPoint.pulseSpeed *= intensity;
        lightPoint.mesh.material.opacity = Math.min(
          1,
          lightPoint.mesh.material.opacity * intensity
        );

        // 恢复正常状态
        setTimeout(() => {
          lightPoint.pulseSpeed /= intensity;
          lightPoint.mesh.material.opacity /= intensity;
        }, 500);
      }
    }
  }

  // 性能监控系统
  setupPerformanceMonitoring() {
    console.log("📊 设置性能监控系统");

    this.performanceStats = {
      frameCount: 0,
      lastTime: performance.now(),
      fps: 60,
      averageFps: 60,
      fpsHistory: [],
    };

    // 每秒更新一次性能统计
    setInterval(() => {
      this.updatePerformanceStats();
      this.optimizeBasedOnPerformance();
    }, 1000);

    // 添加性能显示器（开发模式）
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      this.createPerformanceDisplay();
    }
  }

  // 更新性能统计
  updatePerformanceStats() {
    const currentTime = performance.now();
    const deltaTime = currentTime - this.performanceStats.lastTime;

    this.performanceStats.fps = Math.round(
      1000 / (deltaTime / this.performanceStats.frameCount)
    );
    this.performanceStats.fpsHistory.push(this.performanceStats.fps);

    // 保持历史记录在合理范围内
    if (this.performanceStats.fpsHistory.length > 10) {
      this.performanceStats.fpsHistory.shift();
    }

    // 计算平均FPS
    this.performanceStats.averageFps = Math.round(
      this.performanceStats.fpsHistory.reduce((a, b) => a + b, 0) /
        this.performanceStats.fpsHistory.length
    );

    this.performanceStats.frameCount = 0;
    this.performanceStats.lastTime = currentTime;
  }

  // 基于性能进行优化
  optimizeBasedOnPerformance() {
    const avgFps = this.performanceStats.averageFps;

    if (avgFps < 30) {
      console.log("⚠️ 性能较低，启用优化模式");
      this.enablePerformanceMode();
    } else if (avgFps > 50 && this.performanceMode) {
      console.log("✅ 性能恢复，禁用优化模式");
      this.disablePerformanceMode();
    }
  }

  // 启用性能优化模式
  enablePerformanceMode() {
    if (this.performanceMode) return;

    this.performanceMode = true;

    // 减少粒子数量
    if (this.particles && this.particleData) {
      const reduceCount = Math.floor(this.particleData.length * 0.3);
      this.particleData = this.particleData.slice(0, -reduceCount);
    }

    // 减少光点数量
    if (this.lightPoints) {
      const reduceCount = Math.floor(this.lightPoints.length * 0.5);
      this.lightPoints.slice(-reduceCount).forEach((lightPoint) => {
        this.scene.remove(lightPoint.mesh);
      });
      this.lightPoints = this.lightPoints.slice(0, -reduceCount);
    }

    // 降低渲染质量
    if (this.renderer) {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.5, 1));
    }

    console.log("🔧 性能优化模式已启用");
  }

  // 禁用性能优化模式
  disablePerformanceMode() {
    if (!this.performanceMode) return;

    this.performanceMode = false;

    // 恢复渲染质量
    if (this.renderer) {
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    console.log("✅ 性能优化模式已禁用");
  }

  // 创建性能显示器
  createPerformanceDisplay() {
    const perfDisplay = document.createElement("div");
    perfDisplay.id = "performance-display";
    perfDisplay.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #00ffff;
      padding: 10px;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      z-index: 10000;
      min-width: 120px;
    `;

    document.body.appendChild(perfDisplay);

    // 每秒更新显示
    setInterval(() => {
      perfDisplay.innerHTML = `
        <div>FPS: ${this.performanceStats.fps}</div>
        <div>Avg: ${this.performanceStats.averageFps}</div>
        <div>Particles: ${
          this.particleData ? this.particleData.length : 0
        }</div>
        <div>Lights: ${this.lightPoints ? this.lightPoints.length : 0}</div>
        <div>Mode: ${this.performanceMode ? "Optimized" : "Normal"}</div>
      `;
    }, 1000);
  }
}

// 初始化逻辑
let isInitialized = false;
let retryCount = 0;
const maxRetries = 50; // 最多重试50次（5秒）

function initWhenReady() {
  console.log(
    `🔍 检查初始化状态 - 已初始化: ${isInitialized}, THREE 可用: ${
      typeof THREE !== "undefined"
    }, 重试次数: ${retryCount}`
  );

  if (isInitialized) {
    console.log("✅ 已经初始化过了，跳过");
    return;
  }

  if (typeof THREE !== "undefined") {
    console.log("🚀 Three.js 已加载，开始初始化 3D 科幻登录页面...");
    isInitialized = true;

    try {
      new SciFiLogin();
      console.log("✅ 3D 场景初始化成功");
    } catch (error) {
      console.error("❌ 3D 场景初始化失败:", error);
      showError("init");
    }
  } else {
    retryCount++;
    console.log(
      `⏳ Three.js 尚未加载，等待中... (${retryCount}/${maxRetries})`
    );

    if (retryCount >= maxRetries) {
      console.error("❌ Three.js 加载超时");
      showError("timeout");
      return;
    }

    // 每100ms检查一次
    setTimeout(initWhenReady, 100);
  }
}

// 显示错误信息
function showError(errorType = "webgl") {
  const errorElement = document.getElementById("webgl-error");
  const loadingElement = document.getElementById("loading-indicator");
  const errorMessage = document.getElementById("error-message");

  if (errorElement) {
    errorElement.classList.remove("hidden");
  }
  if (loadingElement) {
    loadingElement.classList.add("hidden");
  }

  // 根据错误类型显示不同的错误信息
  if (errorMessage) {
    switch (errorType) {
      case "timeout":
        errorMessage.textContent = "Three.js 库加载超时，请检查网络连接";
        break;
      case "webgl":
        errorMessage.textContent = "您的设备不支持 WebGL，无法显示 3D 效果";
        break;
      case "init":
        errorMessage.textContent = "3D 场景初始化失败，可能是设备性能不足";
        break;
      default:
        errorMessage.textContent = "未知错误，请刷新页面重试";
    }
  }
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 页面DOM加载完成");

  // 检查关键元素是否存在
  const loadingElement = document.getElementById("loading-indicator");
  const canvasElement = document.getElementById("threejs-canvas");
  const errorElement = document.getElementById("webgl-error");

  console.log("🔍 DOM 元素检查:");
  console.log(`- 加载指示器: ${loadingElement ? "✅ 存在" : "❌ 不存在"}`);
  console.log(`- Canvas 元素: ${canvasElement ? "✅ 存在" : "❌ 不存在"}`);
  console.log(`- 错误元素: ${errorElement ? "✅ 存在" : "❌ 不存在"}`);

  initWhenReady();
});

// 窗口加载完成后也尝试初始化（备用方案）
window.addEventListener("load", () => {
  console.log("🌐 页面完全加载完成");
  if (typeof THREE !== "undefined" && !isInitialized) {
    console.log("🔄 备用初始化方案启动...");
    initWhenReady();
  }
});
