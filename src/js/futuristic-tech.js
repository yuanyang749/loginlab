// 未来科技风格特定的JavaScript功能
document.addEventListener("DOMContentLoaded", () => {
  // 添加页面加载动画
  initPageAnimations();

  // 添加交互效果
  initInteractiveEffects();

  // 添加科技动画效果
  initTechAnimations();
});

function initPageAnimations() {
  // 卡片入场动画
  const techCard = document.querySelector(".tech-card");
  if (techCard) {
    techCard.style.opacity = "0";
    techCard.style.transform = "translateY(50px) scale(0.8)";
    techCard.style.filter = "blur(10px)";

    setTimeout(() => {
      techCard.style.transition = "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      techCard.style.opacity = "1";
      techCard.style.transform = "translateY(0) scale(1)";
      techCard.style.filter = "blur(0)";
    }, 300);
  }

  // 返回按钮动画
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.style.opacity = "0";
    backButton.style.transform = "translateX(-30px)";

    setTimeout(() => {
      backButton.style.transition = "all 0.8s ease-out";
      backButton.style.opacity = "1";
      backButton.style.transform = "translateX(0)";
    }, 500);
  }

  // 全息效果动画
  const holoEffects = document.querySelectorAll(".hologram-effect");
  holoEffects.forEach((holo, index) => {
    holo.style.opacity = "0";
    holo.style.transform = "scale(0)";

    setTimeout(() => {
      holo.style.transition = "all 1.2s ease-out";
      holo.style.opacity = "1";
      holo.style.transform = "scale(1)";
    }, 700 + index * 200);
  });

  // 数据流动画
  const dataStreams = document.querySelectorAll(".data-stream");
  dataStreams.forEach((stream, index) => {
    stream.style.opacity = "0";
    stream.style.transform = "scaleY(0)";

    setTimeout(() => {
      stream.style.transition = "all 1s ease-out";
      stream.style.opacity = "1";
      stream.style.transform = "scaleY(1)";
    }, 1000 + index * 300);
  });
}

function initInteractiveEffects() {
  // 输入框科技效果
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      const formGroup = input.closest(".form-group");
      if (formGroup) {
        formGroup.style.transform = "translateY(-3px)";
        // 添加科技发光效果
        input.style.boxShadow = "0 0 20px rgba(0, 212, 255, 0.5)";
        input.style.textShadow = "0 0 5px #00d4ff";

        // 创建科技扫描效果
        createTechScan(input);
      }
    });

    input.addEventListener("blur", () => {
      const formGroup = input.closest(".form-group");
      if (formGroup) {
        formGroup.style.transform = "translateY(0)";
        input.style.boxShadow = "none";
        input.style.textShadow = "none";
      }
    });

    // 输入时的科技效果
    input.addEventListener("input", () => {
      if (input.value) {
        input.style.color = "#00ffff";
        input.style.textShadow = "0 0 5px #00ffff";
      } else {
        input.style.color = "#00d4ff";
        input.style.textShadow = "none";
      }
    });
  });

  // 按钮科技点击效果
  const buttons = document.querySelectorAll(".tech-btn, .verify-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // 创建科技冲击波效果
      createTechShockwave(button, e);
    });

    // 按钮悬停科技效果
    button.addEventListener("mouseenter", () => {
      button.style.textShadow = "0 0 10px currentColor";
      button.style.filter = "brightness(1.2)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.textShadow = "none";
      button.style.filter = "brightness(1)";
    });
  });

  // 卡片科技悬停效果
  const card = document.querySelector(".tech-card");
  if (card) {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)";
      card.style.borderColor = "#00ffff";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.borderColor = "#00d4ff";
    });
  }
}

function initTechAnimations() {
  // 动态网格移动
  const techGrid = document.querySelector(".tech-grid");
  if (techGrid) {
    let gridOpacity = 0.1;
    let direction = 1;

    setInterval(() => {
      gridOpacity += direction * 0.02;
      if (gridOpacity >= 0.3 || gridOpacity <= 0.05) {
        direction *= -1;
      }
      techGrid.style.opacity = gridOpacity;
    }, 100);
  }

  // 粒子随机闪烁
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle) => {
    setInterval(() => {
      const intensity = Math.random() * 0.5 + 0.5;
      particle.style.boxShadow = `0 0 ${10 + intensity * 10}px #00d4ff`;
      particle.style.opacity = intensity;
    }, Math.random() * 2000 + 1000);
  });

  // 全息扫描效果
  const holoEffects = document.querySelectorAll(".hologram-effect");
  holoEffects.forEach((holo) => {
    setInterval(() => {
      holo.style.opacity = Math.random() * 0.7 + 0.3;
    }, Math.random() * 3000 + 1000);
  });

  // 数据流动效果
  const dataStreams = document.querySelectorAll(".data-stream");
  dataStreams.forEach((stream) => {
    let flowIntensity = 0.5;
    let flowDirection = 1;

    setInterval(() => {
      flowIntensity += flowDirection * 0.1;
      if (flowIntensity >= 1 || flowIntensity <= 0.3) {
        flowDirection *= -1;
      }
      stream.style.opacity = flowIntensity;
    }, 200);
  });

  // 创建动态科技线条
  createTechLines();
}

function createTechScan(element) {
  const scan = document.createElement("div");

  scan.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.3), transparent);
        border-radius: 8px;
        animation: techScan 1s ease-out;
        pointer-events: none;
        z-index: 5;
    `;

  element.style.position = "relative";
  element.appendChild(scan);

  setTimeout(() => {
    scan.remove();
  }, 1000);
}

function createTechShockwave(button, event) {
  const shockwave = document.createElement("div");
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  shockwave.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, rgba(0, 255, 255, 0.4) 50%, transparent 70%);
        border-radius: 50%;
        animation: techShockwave 0.8s ease-out;
        pointer-events: none;
        z-index: 10;
    `;

  button.style.position = "relative";
  button.appendChild(shockwave);

  setTimeout(() => {
    shockwave.remove();
  }, 800);
}

function createTechLines() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2;
        opacity: 0.3;
        mix-blend-mode: screen;
    `;

  document.body.appendChild(canvas);

  // 绘制科技线条
  function drawTechLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制连接线
    for (let i = 0; i < 5; i++) {
      const x1 = Math.random() * canvas.width;
      const y1 = Math.random() * canvas.height;
      const x2 = Math.random() * canvas.width;
      const y2 = Math.random() * canvas.height;

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, "rgba(0, 212, 255, 0)");
      gradient.addColorStop(0.5, "rgba(0, 212, 255, 0.8)");
      gradient.addColorStop(1, "rgba(0, 212, 255, 0)");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // 绘制节点
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 3 + 1;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
      gradient.addColorStop(0, "rgba(0, 212, 255, 1)");
      gradient.addColorStop(1, "rgba(0, 212, 255, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawTechLines();
  setInterval(drawTechLines, 5000);
}

// 添加CSS动画样式
const style = document.createElement("style");
style.textContent = `
    @keyframes techScan {
        0% {
            left: -100%;
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            left: 100%;
            opacity: 0;
        }
    }
    
    @keyframes techShockwave {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
        }
    }
    
    .form-group {
        transition: transform 0.3s ease;
    }
    
    .tech-card {
        transition: all 0.3s ease;
    }
    
    input {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// 页面加载完成提示
window.addEventListener("load", () => {
  console.log("🚀 未来科技风格登录页面加载完成");
  console.log("🎨 特色：全息效果，科技线条，未来感UI");
});

// 键盘科技效果
document.addEventListener("keydown", () => {
  // 为按键添加科技闪烁效果
  const activeElement = document.activeElement;
  if (activeElement && activeElement.tagName === "INPUT") {
    activeElement.style.animation = "techPulse 0.3s ease-out";
    setTimeout(() => {
      activeElement.style.animation = "";
    }, 300);
  }
});

// 鼠标移动科技跟踪效果
document.addEventListener("mousemove", (e) => {
  // 创建跟随鼠标的科技效果
  if (Math.random() < 0.1) {
    // 10%概率创建科技点
    createMouseTech(e.clientX, e.clientY);
  }
});

function createMouseTech(x, y) {
  const tech = document.createElement("div");
  tech.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: #00d4ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 3;
        animation: techFadeOut 2s ease-out forwards;
        box-shadow: 0 0 10px #00d4ff;
    `;

  document.body.appendChild(tech);

  setTimeout(() => {
    tech.remove();
  }, 2000);
}

// 添加科技脉冲动画
const pulseStyle = document.createElement("style");
pulseStyle.textContent = `
    @keyframes techPulse {
        0%, 100% {
            box-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
        }
        50% {
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
        }
    }
    
    @keyframes techFadeOut {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(3);
        }
    }
`;
document.head.appendChild(pulseStyle);
