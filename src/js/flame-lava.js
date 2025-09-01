// 火焰熔岩风格特定的JavaScript功能
document.addEventListener("DOMContentLoaded", () => {
  // 初始化页面动画
  initPageAnimations();

  // 初始化火焰效果
  initFlameEffects();

  // 初始化熔岩动画
  initLavaAnimations();

  // 初始化火花效果
  initSparkEffects();
});

function initPageAnimations() {
  // 卡片入场动画
  const flameCard = document.querySelector(".flame-card");
  if (flameCard) {
    flameCard.style.opacity = "0";
    flameCard.style.transform = "translateY(50px) scale(0.9)";

    setTimeout(() => {
      flameCard.style.transition =
        "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      flameCard.style.opacity = "1";
      flameCard.style.transform = "translateY(0) scale(1)";
    }, 200);
  }

  // 返回按钮动画
  const backButton = document.querySelector(".back-button");
  if (backButton) {
    backButton.style.opacity = "0";
    backButton.style.transform = "translateX(-30px) scale(0.8)";

    setTimeout(() => {
      backButton.style.transition = "all 0.8s ease";
      backButton.style.opacity = "1";
      backButton.style.transform = "translateX(0) scale(1)";
    }, 400);
  }

  // 火焰图标动画
  const flameIcon = document.querySelector(".flame-icon");
  if (flameIcon) {
    flameIcon.style.opacity = "0";
    flameIcon.style.transform = "scale(0) rotate(-180deg)";

    setTimeout(() => {
      flameIcon.style.transition =
        "all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      flameIcon.style.opacity = "1";
      flameIcon.style.transform = "scale(1) rotate(0deg)";
    }, 600);
  }
}

function initFlameEffects() {
  // 输入框火焰效果
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      createFlameRipple(input);
      addFloatingEmbers(input);
    });

    input.addEventListener("blur", () => {
      removeFlameRipple(input);
    });

    // 输入时的火花效果
    input.addEventListener("input", (e) => {
      if (e.target.value.length > 0) {
        createInputSpark(e.target);
      }
    });
  });

  // 按钮火焰效果
  const buttons = document.querySelectorAll(".flame-btn, .flame-btn-small");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      createButtonFlame(button);
    });

    button.addEventListener("click", (e) => {
      createFlameExplosion(e, button);
    });
  });

  // 链接火焰效果
  const links = document.querySelectorAll(".flame-link");
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      createLinkFlame(link);
    });
  });
}

function createFlameRipple(element) {
  const formGroup = element.closest(".form-group");
  if (formGroup) {
    formGroup.style.filter = "drop-shadow(0 0 15px rgba(255, 69, 0, 0.6))";
    formGroup.style.transform = "scale(1.02)";
    formGroup.style.transition = "all 0.3s ease";
  }
}

function removeFlameRipple(element) {
  const formGroup = element.closest(".form-group");
  if (formGroup) {
    formGroup.style.filter = "";
    formGroup.style.transform = "scale(1)";
  }
}

function addFloatingEmbers(input) {
  const rect = input.getBoundingClientRect();

  for (let i = 0; i < 6; i++) {
    const ember = document.createElement("div");
    ember.textContent = "🔥";
    ember.style.cssText = `
            position: fixed;
            left: ${rect.right - 30 + Math.random() * 20}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: ${6 + Math.random() * 8}px;
            pointer-events: none;
            z-index: 1000;
            animation: floatingEmber 3s ease-out forwards;
            animation-delay: ${i * 0.2}s;
        `;

    document.body.appendChild(ember);

    setTimeout(() => {
      document.body.removeChild(ember);
    }, 3000);
  }
}

function createInputSpark(input) {
  const rect = input.getBoundingClientRect();
  const spark = document.createElement("div");

  spark.style.cssText = `
        position: fixed;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.bottom - 5}px;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #FFD700, #FF4500);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: inputSpark 1s ease-out forwards;
    `;

  document.body.appendChild(spark);

  setTimeout(() => {
    document.body.removeChild(spark);
  }, 1000);
}

function createButtonFlame(button) {
  button.style.background = "linear-gradient(135deg, #FF4500, #FFD700)";
  button.style.boxShadow = "0 12px 35px rgba(255, 69, 0, 0.8)";

  setTimeout(() => {
    button.style.background = "linear-gradient(135deg, #DC143C, #FF4500)";
    button.style.boxShadow = "0 8px 25px rgba(255, 69, 0, 0.6)";
  }, 200);
}

function createFlameExplosion(event, button) {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const flameEmojis = ["🔥", "💥", "⚡", "✨"];

  for (let i = 0; i < 10; i++) {
    const flame = document.createElement("div");
    flame.textContent =
      flameEmojis[Math.floor(Math.random() * flameEmojis.length)];

    const angle = (i / 10) * Math.PI * 2;
    const distance = 70;
    const endX = centerX + Math.cos(angle) * distance;
    const endY = centerY + Math.sin(angle) * distance;

    flame.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 18px;
            pointer-events: none;
            z-index: 1000;
            animation: flameExplosion 1.5s ease-out forwards;
            --end-x: ${endX}px;
            --end-y: ${endY}px;
        `;

    document.body.appendChild(flame);

    setTimeout(() => {
      document.body.removeChild(flame);
    }, 1500);
  }
}

function createLinkFlame(link) {
  link.style.textShadow = "0 0 15px rgba(255, 69, 0, 1)";
  link.style.transform = "scale(1.05)";

  setTimeout(() => {
    link.style.textShadow = "0 0 10px rgba(255, 69, 0, 0.8)";
    link.style.transform = "scale(1)";
  }, 200);
}

function initLavaAnimations() {
  // 鼠标移动时的熔岩响应
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    updateLavaAnimation(mouseX, mouseY);
    updateBackgroundGradient(mouseX, mouseY);
  });

  // 定期更新熔岩动画
  setInterval(() => {
    randomizeLavaAnimation();
  }, 6000);
}

function updateLavaAnimation(mouseX, mouseY) {
  const lavaWaves = document.querySelectorAll(".lava-wave");
  lavaWaves.forEach((wave) => {
    // const factor = (index + 1) * 0.1;
    const speed = 10 + mouseX * mouseY * 8;
    wave.style.animationDuration = speed + "s";

    const intensity = mouseX * mouseY;
    wave.style.opacity = 0.4 + intensity * 0.4;
  });
}

function updateBackgroundGradient(mouseX, mouseY) {
  const background = document.querySelector(".flame-background");
  if (background) {
    const hue1 = 0 + mouseX * 20;
    const hue2 = 15 + mouseY * 25;

    background.style.background = `linear-gradient(135deg, 
            hsl(${hue1}, 100%, 27%) 0%, 
            hsl(${hue2}, 83%, 43%) 30%, 
            hsl(16, 100%, 50%) 70%, 
            hsl(51, 100%, 50%) 100%)`;
  }
}

function randomizeLavaAnimation() {
  const lavaWaves = document.querySelectorAll(".lava-wave");
  lavaWaves.forEach((wave) => {
    const randomDuration = 10 + Math.random() * 8;
    wave.style.animationDuration = randomDuration + "s";
  });
}

function initSparkEffects() {
  // 点击页面时产生火花
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".flame-card")) {
      createClickSpark(e);
    }
  });

  // 定期产生随机火花
  setInterval(() => {
    createRandomSpark();
  }, 2500);
}

function createClickSpark(event) {
  const spark = document.createElement("div");
  spark.textContent = "✨";
  spark.style.cssText = `
        position: fixed;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        font-size: 24px;
        pointer-events: none;
        z-index: 1000;
        animation: clickSpark 2s ease-out forwards;
    `;

  document.body.appendChild(spark);

  setTimeout(() => {
    document.body.removeChild(spark);
  }, 2000);
}

function createRandomSpark() {
  const spark = document.createElement("div");
  spark.textContent = "🔥";
  spark.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: -20px;
        font-size: 16px;
        pointer-events: none;
        z-index: 1;
        animation: randomSpark 5s linear forwards;
        opacity: 0.8;
    `;

  document.body.appendChild(spark);

  setTimeout(() => {
    document.body.removeChild(spark);
  }, 5000);
}

// 添加CSS动画关键帧
const style = document.createElement("style");
style.textContent = `
    @keyframes floatingEmber {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.3) rotate(360deg);
        }
    }

    @keyframes inputSpark {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }

    @keyframes flameExplosion {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0.2);
        }
    }

    @keyframes clickSpark {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(80px) scale(2) rotate(720deg);
        }
    }

    @keyframes randomSpark {
        0% {
            opacity: 0.8;
            transform: translateY(0) rotate(0deg) scale(1);
        }
        50% {
            opacity: 1;
            transform: translateY(50vh) rotate(180deg) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh) rotate(360deg) scale(0.5);
        }
    }
`;
document.head.appendChild(style);
