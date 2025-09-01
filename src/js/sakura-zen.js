// 樱花和风风格特定的JavaScript功能
document.addEventListener("DOMContentLoaded", () => {
  // 初始化页面动画
  initPageAnimations();

  // 初始化樱花效果
  initSakuraEffects();

  // 初始化水墨动画
  initInkAnimations();

  // 初始化蝴蝶效果
  initButterflyEffects();
});

function initPageAnimations() {
  // 卡片入场动画
  const zenCard = document.querySelector(".zen-card");
  if (zenCard) {
    zenCard.style.opacity = "0";
    zenCard.style.transform = "translateY(50px) scale(0.9)";

    setTimeout(() => {
      zenCard.style.transition = "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      zenCard.style.opacity = "1";
      zenCard.style.transform = "translateY(0) scale(1)";
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

  // 和风图标动画
  const zenIcon = document.querySelector(".zen-icon");
  if (zenIcon) {
    zenIcon.style.opacity = "0";
    zenIcon.style.transform = "scale(0) rotate(-180deg)";

    setTimeout(() => {
      zenIcon.style.transition =
        "all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      zenIcon.style.opacity = "1";
      zenIcon.style.transform = "scale(1) rotate(0deg)";
    }, 600);
  }
}

function initSakuraEffects() {
  // 输入框樱花效果
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      createInkRipple(input);
      addFloatingPetals(input);
    });

    input.addEventListener("blur", () => {
      removeInkRipple(input);
    });

    // 输入时的花瓣效果
    input.addEventListener("input", (e) => {
      if (e.target.value.length > 0) {
        createPetalBurst(e.target);
      }
    });
  });

  // 按钮樱花效果
  const buttons = document.querySelectorAll(".zen-btn, .zen-btn-small");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      createButtonBloom(button);
    });

    button.addEventListener("click", (e) => {
      createSakuraExplosion(e, button);
    });
  });

  // 链接樱花效果
  const links = document.querySelectorAll(".zen-link");
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      createLinkBloom(link);
    });
  });
}

function createInkRipple(element) {
  const formGroup = element.closest(".form-group");
  if (formGroup) {
    formGroup.style.filter = "drop-shadow(0 0 15px rgba(255, 183, 197, 0.6))";
    formGroup.style.transform = "scale(1.02)";
    formGroup.style.transition = "all 0.3s ease";
  }
}

function removeInkRipple(element) {
  const formGroup = element.closest(".form-group");
  if (formGroup) {
    formGroup.style.filter = "";
    formGroup.style.transform = "scale(1)";
  }
}

function addFloatingPetals(input) {
  const rect = input.getBoundingClientRect();

  for (let i = 0; i < 4; i++) {
    const petal = document.createElement("div");
    petal.textContent = ["🌸", "🌺"][Math.floor(Math.random() * 2)];
    petal.style.cssText = `
            position: fixed;
            left: ${rect.right - 30 + Math.random() * 20}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: ${10 + Math.random() * 6}px;
            pointer-events: none;
            z-index: 1000;
            animation: floatingPetal 3s ease-out forwards;
            animation-delay: ${i * 0.3}s;
            color: #FFB7C5;
            text-shadow: 0 0 5px rgba(255, 183, 197, 0.8);
        `;

    document.body.appendChild(petal);

    setTimeout(() => {
      document.body.removeChild(petal);
    }, 3000);
  }
}

function createPetalBurst(input) {
  const rect = input.getBoundingClientRect();
  const petal = document.createElement("div");

  petal.style.cssText = `
        position: fixed;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.bottom - 5}px;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #FFB7C5, #FF69B4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: petalBurst 1s ease-out forwards;
        box-shadow: 0 0 5px rgba(255, 183, 197, 0.8);
    `;

  document.body.appendChild(petal);

  setTimeout(() => {
    document.body.removeChild(petal);
  }, 1000);
}

function createButtonBloom(button) {
  button.style.background = "linear-gradient(135deg, #9ACD32, #FFB7C5)";
  button.style.boxShadow = "0 12px 35px rgba(255, 183, 197, 0.8)";

  setTimeout(() => {
    button.style.background = "linear-gradient(135deg, #FFB7C5, #9ACD32)";
    button.style.boxShadow = "0 8px 25px rgba(255, 183, 197, 0.6)";
  }, 200);
}

function createSakuraExplosion(event, button) {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const sakuraEmojis = ["🌸", "🌺", "🦋", "🍃"];

  for (let i = 0; i < 6; i++) {
    const sakura = document.createElement("div");
    sakura.textContent =
      sakuraEmojis[Math.floor(Math.random() * sakuraEmojis.length)];

    const angle = (i / 6) * Math.PI * 2;
    const distance = 50;
    const endX = centerX + Math.cos(angle) * distance;
    const endY = centerY + Math.sin(angle) * distance;

    sakura.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 1000;
            animation: sakuraExplosion 1.5s ease-out forwards;
            --end-x: ${endX}px;
            --end-y: ${endY}px;
            color: #FFB7C5;
            text-shadow: 0 0 10px rgba(255, 183, 197, 0.8);
        `;

    document.body.appendChild(sakura);

    setTimeout(() => {
      document.body.removeChild(sakura);
    }, 1500);
  }
}

function createLinkBloom(link) {
  link.style.textShadow = "0 0 15px rgba(255, 183, 197, 1)";
  link.style.transform = "scale(1.05)";

  setTimeout(() => {
    link.style.textShadow = "0 0 10px rgba(255, 183, 197, 0.6)";
    link.style.transform = "scale(1)";
  }, 200);
}

function initInkAnimations() {
  // 鼠标移动时的水墨响应
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    updateInkAnimation(mouseX, mouseY);
    updateBackgroundGradient(mouseX, mouseY);
  });

  // 定期更新水墨动画
  setInterval(() => {
    randomizeInkAnimation();
  }, 10000);
}

function updateInkAnimation(mouseX, mouseY) {
  const inkClouds = document.querySelectorAll(".ink-cloud");
  inkClouds.forEach((cloud, index) => {
    const factor = (index + 1) * 0.1;
    const speed = 18 + mouseX * mouseY * 10;
    cloud.style.animationDuration = speed + "s";

    const intensity = mouseX * mouseY;
    cloud.style.opacity = 0.2 + intensity * 0.1;
  });
}

function updateBackgroundGradient(mouseX, mouseY) {
  const background = document.querySelector(".sakura-background");
  if (background) {
    const hue1 = 60 + mouseX * 15;
    const hue2 = 45 + mouseY * 20;

    background.style.background = `linear-gradient(135deg, 
            hsl(${hue1}, 20%, 97%) 0%, 
            hsl(${hue2}, 25%, 90%) 50%, 
            hsl(55, 30%, 85%) 100%)`;
  }
}

function randomizeInkAnimation() {
  const inkClouds = document.querySelectorAll(".ink-cloud");
  inkClouds.forEach((cloud) => {
    const randomDuration = 18 + Math.random() * 10;
    cloud.style.animationDuration = randomDuration + "s";
  });
}

function initButterflyEffects() {
  // 点击页面时产生蝴蝶
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".zen-card")) {
      createClickButterfly(e);
    }
  });

  // 定期产生随机樱花
  setInterval(() => {
    createRandomSakura();
  }, 4000);
}

function createClickButterfly(event) {
  const butterfly = document.createElement("div");
  butterfly.textContent = "🦋";
  butterfly.style.cssText = `
        position: fixed;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
        font-size: 18px;
        pointer-events: none;
        z-index: 1000;
        animation: clickButterfly 2s ease-out forwards;
        color: #FFB7C5;
        text-shadow: 0 0 10px rgba(255, 183, 197, 0.8);
    `;

  document.body.appendChild(butterfly);

  setTimeout(() => {
    document.body.removeChild(butterfly);
  }, 2000);
}

function createRandomSakura() {
  const sakura = document.createElement("div");
  sakura.textContent = ["🌸", "🌺"][Math.floor(Math.random() * 2)];
  sakura.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: -20px;
        font-size: 16px;
        pointer-events: none;
        z-index: 1;
        animation: randomSakura 8s linear forwards;
        opacity: 0.9;
        color: #FFB7C5;
        text-shadow: 0 0 5px rgba(255, 183, 197, 0.6);
    `;

  document.body.appendChild(sakura);

  setTimeout(() => {
    document.body.removeChild(sakura);
  }, 8000);
}

// 添加CSS动画关键帧
const style = document.createElement("style");
style.textContent = `
    @keyframes floatingPetal {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.6) rotate(180deg);
        }
    }

    @keyframes petalBurst {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.8) rotate(90deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(180deg);
        }
    }

    @keyframes sakuraExplosion {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(calc(var(--end-x) - 50vw), calc(var(--end-y) - 50vh)) scale(0.4);
        }
    }

    @keyframes clickButterfly {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: translateY(-30px) scale(1.2) rotate(15deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.8) rotate(30deg);
        }
    }

    @keyframes randomSakura {
        0% {
            opacity: 0.9;
            transform: translateY(0) rotate(0deg) scale(1);
        }
        25% {
            opacity: 1;
            transform: translateY(25vh) rotate(90deg) scale(1.1);
        }
        75% {
            opacity: 1;
            transform: translateY(75vh) rotate(270deg) scale(0.9);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh) rotate(360deg) scale(0.7);
        }
    }
`;
document.head.appendChild(style);
