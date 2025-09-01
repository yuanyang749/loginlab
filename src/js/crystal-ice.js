// 水晶冰雪风格特定的JavaScript功能
document.addEventListener("DOMContentLoaded", () => {
  // 初始化页面动画
  initPageAnimations();

  // 初始化冰雪效果
  initCrystalEffects();

  // 初始化极光动画
  initAuroraAnimations();

  // 初始化雪花效果
  initSnowflakeEffects();
});

function initPageAnimations() {
  // 卡片入场动画
  const crystalCard = document.querySelector(".crystal-card");
  if (crystalCard) {
    crystalCard.style.opacity = "0";
    crystalCard.style.transform = "translateY(50px) scale(0.9)";

    setTimeout(() => {
      crystalCard.style.transition =
        "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      crystalCard.style.opacity = "1";
      crystalCard.style.transform = "translateY(0) scale(1)";
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

  // 水晶图标动画
  const crystalIcon = document.querySelector(".crystal-icon");
  if (crystalIcon) {
    crystalIcon.style.opacity = "0";
    crystalIcon.style.transform = "scale(0) rotate(-180deg)";

    setTimeout(() => {
      crystalIcon.style.transition =
        "all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      crystalIcon.style.opacity = "1";
      crystalIcon.style.transform = "scale(1) rotate(0deg)";
    }, 600);
  }
}

function initCrystalEffects() {
  // 输入框冰雪效果
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      createCrystalRipple(input);
      addFloatingSnowflakes(input);
    });

    input.addEventListener("blur", () => {
      removeCrystalRipple(input);
    });

    // 输入时的冰晶效果
    input.addEventListener("input", (e) => {
      if (e.target.value.length > 0) {
        createIceCrystal(e.target);
      }
    });
  });

  // 按钮冰雪效果
  const buttons = document.querySelectorAll(".crystal-btn, .crystal-btn-small");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      createButtonFrost(button);
    });

    button.addEventListener("click", (e) => {
      createCrystalExplosion(e, button);
    });
  });

  // 链接冰雪效果
  const links = document.querySelectorAll(".crystal-link");
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      createLinkFrost(link);
    });
  });
}

function createCrystalRipple(element) {
  const formGroup = element.closest(".form-group");
  if (formGroup) {
    formGroup.style.filter = "drop-shadow(0 0 15px rgba(0, 255, 255, 0.6))";
    formGroup.style.transform = "scale(1.02)";
    formGroup.style.transition = "all 0.3s ease";
  }
}

function removeCrystalRipple(element) {
  const formGroup = element.closest(".form-group");
  if (formGroup) {
    formGroup.style.filter = "";
    formGroup.style.transform = "scale(1)";
  }
}

function addFloatingSnowflakes(input) {
  const rect = input.getBoundingClientRect();

  for (let i = 0; i < 5; i++) {
    const snowflake = document.createElement("div");
    snowflake.textContent = ["❄️", "❅", "❆"][Math.floor(Math.random() * 3)];
    snowflake.style.cssText = `
            position: fixed;
            left: ${rect.right - 30 + Math.random() * 20}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: ${8 + Math.random() * 6}px;
            pointer-events: none;
            z-index: 1000;
            animation: floatingSnowflake 3s ease-out forwards;
            animation-delay: ${i * 0.2}s;
            color: #E0F6FF;
            text-shadow: 0 0 5px rgba(0, 255, 255, 0.6);
        `;

    document.body.appendChild(snowflake);

    setTimeout(() => {
      document.body.removeChild(snowflake);
    }, 3000);
  }
}

function createIceCrystal(input) {
  const rect = input.getBoundingClientRect();
  const crystal = document.createElement("div");

  crystal.style.cssText = `
        position: fixed;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.bottom - 5}px;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, #E0F6FF, #00FFFF);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: iceCrystal 1s ease-out forwards;
        box-shadow: 0 0 5px rgba(0, 255, 255, 0.8);
    `;

  document.body.appendChild(crystal);

  setTimeout(() => {
    document.body.removeChild(crystal);
  }, 1000);
}

function createButtonFrost(button) {
  button.style.background = "linear-gradient(135deg, #00FFFF, #F0F8FF)";
  button.style.boxShadow = "0 12px 35px rgba(0, 255, 255, 0.8)";

  setTimeout(() => {
    button.style.background = "linear-gradient(135deg, #B0E0E6, #00FFFF)";
    button.style.boxShadow = "0 8px 25px rgba(0, 255, 255, 0.6)";
  }, 200);
}

function createCrystalExplosion(event, button) {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const crystalEmojis = ["❄️", "💎", "✨", "⭐"];

  for (let i = 0; i < 8; i++) {
    const crystal = document.createElement("div");
    crystal.textContent =
      crystalEmojis[Math.floor(Math.random() * crystalEmojis.length)];

    const angle = (i / 8) * Math.PI * 2;
    const distance = 60;
    const endX = centerX + Math.cos(angle) * distance;
    const endY = centerY + Math.sin(angle) * distance;

    crystal.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 1000;
            animation: crystalExplosion 1.2s ease-out forwards;
            --end-x: ${endX}px;
            --end-y: ${endY}px;
            color: #E0F6FF;
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
        `;

    document.body.appendChild(crystal);

    setTimeout(() => {
      document.body.removeChild(crystal);
    }, 1200);
  }
}

function createLinkFrost(link) {
  link.style.textShadow = "0 0 15px rgba(0, 255, 255, 1)";
  link.style.transform = "scale(1.05)";

  setTimeout(() => {
    link.style.textShadow = "0 0 10px rgba(0, 255, 255, 0.6)";
    link.style.transform = "scale(1)";
  }, 200);
}

function initAuroraAnimations() {
  // 鼠标移动时的极光响应
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    updateAuroraAnimation(mouseX, mouseY);
    updateBackgroundGradient(mouseX, mouseY);
  });

  // 定期更新极光动画
  setInterval(() => {
    randomizeAuroraAnimation();
  }, 8000);
}

function updateAuroraAnimation(mouseX, mouseY) {
  const auroraWaves = document.querySelectorAll(".aurora-wave");
  auroraWaves.forEach((wave, index) => {
    const factor = (index + 1) * 0.1;
    const speed = 12 + mouseX * mouseY * 8;
    wave.style.animationDuration = speed + "s";

    const intensity = mouseX * mouseY;
    wave.style.opacity = 0.4 + intensity * 0.3;
  });
}

function updateBackgroundGradient(mouseX, mouseY) {
  const background = document.querySelector(".crystal-background");
  if (background) {
    const hue1 = 180 + mouseX * 20;
    const hue2 = 200 + mouseY * 30;

    background.style.background = `linear-gradient(135deg, 
            hsl(${hue1}, 30%, 95%) 0%, 
            hsl(${hue2}, 40%, 85%) 50%, 
            hsl(190, 50%, 75%) 100%)`;
  }
}

function randomizeAuroraAnimation() {
  const auroraWaves = document.querySelectorAll(".aurora-wave");
  auroraWaves.forEach((wave) => {
    const randomDuration = 12 + Math.random() * 8;
    wave.style.animationDuration = randomDuration + "s";
  });
}

function initSnowflakeEffects() {
  // 点击页面时产生雪花
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".crystal-card")) {
      createClickSnowflake(e);
    }
  });

  // 定期产生随机雪花
  setInterval(() => {
    createRandomSnowflake();
  }, 3000);
}

function createClickSnowflake(event) {
  const snowflake = document.createElement("div");
  snowflake.textContent = "❄️";
  snowflake.style.cssText = `
        position: fixed;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: clickSnowflake 1.5s ease-out forwards;
        color: #E0F6FF;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
    `;

  document.body.appendChild(snowflake);

  setTimeout(() => {
    document.body.removeChild(snowflake);
  }, 1500);
}

function createRandomSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.textContent = ["❄️", "❅", "❆"][Math.floor(Math.random() * 3)];
  snowflake.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: -20px;
        font-size: 14px;
        pointer-events: none;
        z-index: 1;
        animation: randomSnowflake 6s linear forwards;
        opacity: 0.8;
        color: #E0F6FF;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.6);
    `;

  document.body.appendChild(snowflake);

  setTimeout(() => {
    document.body.removeChild(snowflake);
  }, 6000);
}

// 添加CSS动画关键帧
const style = document.createElement("style");
style.textContent = `
    @keyframes floatingSnowflake {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5) rotate(360deg);
        }
    }

    @keyframes iceCrystal {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }

    @keyframes crystalExplosion {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0.3);
        }
    }

    @keyframes clickSnowflake {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(60px) scale(1.5) rotate(360deg);
        }
    }

    @keyframes randomSnowflake {
        0% {
            opacity: 0.8;
            transform: translateY(0) rotate(0deg) scale(1);
        }
        50% {
            opacity: 1;
            transform: translateY(50vh) rotate(180deg) scale(1.1);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh) rotate(360deg) scale(0.8);
        }
    }
`;
document.head.appendChild(style);
