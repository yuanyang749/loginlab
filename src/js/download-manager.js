// 下载管理器 - 处理风格文件的打包和下载
class DownloadManager {
  constructor() {
    this.isDownloading = false;
    this.downloadQueue = [];
    this.styleFileMap = this.initStyleFileMap();
  }

  // 初始化风格文件映射
  initStyleFileMap() {
    return {
      "modern-gradient": {
        name: "现代渐变风格",
        files: [
          "src/styles/modern-gradient.html",
          "src/assets/styles/modern-gradient.css",
          "src/js/modern-gradient.js",
          "src/js/common.js",
        ],
      },
      "dark-minimal": {
        name: "深色极简风格",
        files: [
          "src/styles/dark-minimal.html",
          "src/assets/styles/dark-minimal.css",
          "src/js/dark-minimal.js",
          "src/js/common.js",
        ],
      },
      "warm-pink": {
        name: "温馨粉色风格",
        files: [
          "src/styles/warm-pink.html",
          "src/assets/styles/warm-pink.css",
          "src/js/warm-pink.js",
          "src/js/common.js",
        ],
      },
      "business-professional": {
        name: "商务专业风格",
        files: [
          "src/styles/business-professional.html",
          "src/assets/styles/business-professional.css",
          "src/js/business-professional.js",
          "src/js/common.js",
        ],
      },
      "ocean-blue": {
        name: "海洋蓝调风格",
        files: [
          "src/styles/ocean-blue.html",
          "src/assets/styles/ocean-blue.css",
          "src/js/ocean-blue.js",
          "src/js/common.js",
        ],
      },
      "starry-scifi": {
        name: "星空科幻风格",
        files: [
          "src/styles/starry-scifi.html",
          "src/assets/styles/starry-scifi.css",
          "src/js/starry-scifi.js",
          "src/js/common.js",
        ],
      },
      "sunset-glow": {
        name: "日落余晖风格",
        files: [
          "src/styles/sunset-glow.html",
          "src/assets/styles/sunset-glow.css",
          "src/js/sunset-glow.js",
          "src/js/common.js",
        ],
      },
      "nature-forest": {
        name: "自然森林风格",
        files: [
          "src/styles/nature-forest.html",
          "src/assets/styles/nature-forest.css",
          "src/js/nature-forest.js",
          "src/js/common.js",
        ],
      },
      "luxury-diamond": {
        name: "奢华钻石风格",
        files: [
          "src/styles/luxury-diamond.html",
          "src/assets/styles/luxury-diamond.css",
          "src/js/luxury-diamond.js",
          "src/js/common.js",
        ],
      },
      "cyber-punk": {
        name: "赛博朋克风格",
        files: [
          "src/styles/cyber-punk.html",
          "src/assets/styles/cyber-punk.css",
          "src/js/cyber-punk.js",
          "src/js/common.js",
        ],
      },
      "pixel-retro": {
        name: "像素复古风格",
        files: [
          "src/styles/pixel-retro.html",
          "src/assets/styles/pixel-retro.css",
          "src/js/pixel-retro.js",
          "src/js/common.js",
        ],
      },
      "aurora-borealis": {
        name: "极光风格",
        files: [
          "src/styles/aurora-borealis.html",
          "src/assets/styles/aurora-borealis.css",
          "src/js/aurora-borealis.js",
          "src/js/common.js",
        ],
      },
      "minimalist-white": {
        name: "极简白色风格",
        files: [
          "src/styles/minimalist-white.html",
          "src/assets/styles/minimalist-white.css",
          "src/js/minimalist-white.js",
          "src/js/common.js",
        ],
      },
      "neon-glow": {
        name: "霓虹发光风格",
        files: [
          "src/styles/neon-glow.html",
          "src/assets/styles/neon-glow.css",
          "src/js/neon-glow.js",
          "src/js/common.js",
        ],
      },
      "watercolor-art": {
        name: "水彩艺术风格",
        files: [
          "src/styles/watercolor-art.html",
          "src/assets/styles/watercolor-art.css",
          "src/js/watercolor-art.js",
          "src/js/common.js",
        ],
      },
      "metallic-shine": {
        name: "金属质感风格",
        files: [
          "src/styles/metallic-shine.html",
          "src/assets/styles/metallic-shine.css",
          "src/js/metallic-shine.js",
          "src/js/common.js",
        ],
      },
      glassmorphism: {
        name: "玻璃拟态风格",
        files: [
          "src/styles/glassmorphism.html",
          "src/assets/styles/glassmorphism.css",
          "src/js/glassmorphism.js",
          "src/js/common.js",
        ],
      },
      "vintage-retro": {
        name: "复古怀旧风格",
        files: [
          "src/styles/vintage-retro.html",
          "src/assets/styles/vintage-retro.css",
          "src/js/vintage-retro.js",
          "src/js/common.js",
        ],
      },
      "futuristic-tech": {
        name: "未来科技风格",
        files: [
          "src/styles/futuristic-tech.html",
          "src/assets/styles/futuristic-tech.css",
          "src/js/futuristic-tech.js",
          "src/js/common.js",
        ],
      },
      "organic-nature": {
        name: "自然有机风格",
        files: [
          "src/styles/organic-nature.html",
          "src/assets/styles/organic-nature.css",
          "src/js/organic-nature.js",
          "src/js/common.js",
        ],
      },
      "geometric-abstract": {
        name: "几何抽象风格",
        files: [
          "src/styles/geometric-abstract.html",
          "src/assets/styles/geometric-abstract.css",
          "src/js/geometric-abstract.js",
          "src/js/common.js",
        ],
      },
      "hand-drawn": {
        name: "手绘风格",
        files: [
          "src/styles/hand-drawn.html",
          "src/assets/styles/hand-drawn.css",
          "src/js/hand-drawn.js",
          "src/js/common.js",
        ],
      },
      "industrial-steel": {
        name: "工业风格",
        files: [
          "src/styles/industrial-steel.html",
          "src/assets/styles/industrial-steel.css",
          "src/js/industrial-steel.js",
          "src/js/common.js",
        ],
      },
      "fairy-tale": {
        name: "梦幻童话风格",
        files: [
          "src/styles/fairy-tale.html",
          "src/assets/styles/fairy-tale.css",
          "src/js/fairy-tale.js",
          "src/js/common.js",
        ],
      },
      "moonlit-mystery": {
        name: "月夜神秘风格",
        files: [
          "src/styles/moonlit-mystery.html",
          "src/assets/styles/moonlit-mystery.css",
          "src/js/moonlit-mystery.js",
          "src/js/common.js",
        ],
      },
      "fluid-art": {
        name: "流体艺术风格",
        files: [
          "src/styles/fluid-art.html",
          "src/assets/styles/fluid-art.css",
          "src/js/fluid-art.js",
          "src/js/common.js",
        ],
      },
      "cherry-blossom": {
        name: "樱花飘落风格",
        files: [
          "src/styles/cherry-blossom.html",
          "src/assets/styles/cherry-blossom.css",
          "src/js/cherry-blossom.js",
          "src/js/common.js",
        ],
      },
      "flame-lava": {
        name: "火焰熔岩风格",
        files: [
          "src/styles/flame-lava.html",
          "src/assets/styles/flame-lava.css",
          "src/js/flame-lava.js",
          "src/js/common.js",
        ],
      },
      "crystal-ice": {
        name: "水晶冰雪风格",
        files: [
          "src/styles/crystal-ice.html",
          "src/assets/styles/crystal-ice.css",
          "src/js/crystal-ice.js",
          "src/js/common.js",
        ],
      },
      "sakura-zen": {
        name: "樱花和风风格",
        files: [
          "src/styles/sakura-zen.html",
          "src/assets/styles/sakura-zen.css",
          "src/js/sakura-zen.js",
          "src/js/common.js",
        ],
      },
      "cyberpunk-neon": {
        name: "赛博朋克霓虹风格",
        files: [
          "src/styles/cyberpunk-neon.html",
          "src/assets/styles/cyberpunk-neon.css",
          "src/js/cyberpunk-neon.js",
          "src/js/common.js",
        ],
      },
      "stellar-exploration": {
        name: "星际探索风格",
        files: [
          "src/styles/stellar-exploration.html",
          "src/assets/styles/stellar-exploration.css",
          "src/js/stellar-exploration.js",
          "src/js/common.js",
        ],
      },
      "theatrical-stage": {
        name: "戏剧舞台风格",
        files: [
          "src/styles/theatrical-stage.html",
          "src/assets/styles/theatrical-stage.css",
          "src/js/theatrical-stage.js",
          "src/js/common.js",
        ],
      },
      "circuit-tech": {
        name: "电路板科技风格",
        files: [
          "src/styles/circuit-tech.html",
          "src/assets/styles/circuit-tech.css",
          "src/js/circuit-tech.js",
          "src/js/common.js",
        ],
      },
      "calligraphy-ink": {
        name: "书法墨韵风格",
        files: [
          "src/styles/calligraphy-ink.html",
          "src/assets/styles/calligraphy-ink.css",
          "src/js/calligraphy-ink.js",
          "src/js/common.js",
        ],
      },
      "neon-cyber-city": {
        name: "霓虹赛博城市风格",
        files: [
          "src/styles/neon-cyber-city.html",
          "src/assets/styles/neon-cyber-city.css",
          "src/js/neon-cyber-city.js",
          "src/js/common.js",
        ],
      },
      "threejs-scifi": {
        name: "3D科幻空间风格",
        files: [
          "src/styles/threejs-scifi.html",
          "src/assets/styles/threejs-scifi.css",
          "src/js/threejs-scifi.js",
          "src/js/common.js",
        ],
      },
      "windows98-retro": {
        name: "Windows98复古风格",
        files: [
          "src/styles/windows98-retro.html",
          "src/assets/styles/windows98-retro.css",
          "src/js/windows98-retro.js",
          "src/js/common.js",
        ],
      },
      "cyber-virus-infection": {
        name: "网络朋克病毒感染风格",
        files: [
          "src/styles/cyber-virus-infection.html",
          "src/assets/styles/cyber-virus-infection.css",
          "src/js/cyber-virus-infection.js",
          "src/js/common.js",
        ],
      },
    };
  }

  // 异步获取文件内容
  async fetchFileContent(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.warn(`无法获取文件: ${url}`, error);
      return null;
    }
  }

  // 修复HTML文件中的路径引用
  fixHtmlPaths(htmlContent, styleId) {
    let fixedContent = htmlContent;

    // 修复CSS文件路径
    fixedContent = fixedContent.replace(
      /href="[^"]*\/assets\/styles\/([^"]+\.css)"/g,
      'href="$1"'
    );

    // 修复JavaScript文件路径
    fixedContent = fixedContent.replace(
      /src="[^"]*\/js\/([^"]+\.js)"/g,
      'src="$1"'
    );

    // 移除可能的WebSocket连接代码（如果存在）
    fixedContent = fixedContent.replace(
      /new WebSocket\([^)]+\)/g,
      "null /* WebSocket removed for standalone version */"
    );

    return fixedContent;
  }

  // 创建README文件内容
  createReadmeContent(styleName, styleInfo) {
    return `# ${styleInfo.name} - LoginLab

## 简介
这是来自 LoginLab 项目的 ${styleInfo.name} 登录页面风格。

## 文件说明
- \`${styleName}.html\` - 主要的HTML文件（已修复路径引用）
- \`${styleName}.css\` - 样式文件
- \`${styleName}.js\` - JavaScript交互文件
- \`common.js\` - 公共JavaScript功能

## 使用方法
1. 解压ZIP文件到任意文件夹
2. 直接在浏览器中打开 \`${styleName}.html\` 文件
3. 或者将所有文件部署到Web服务器上

## 特性
- 响应式设计，支持移动端和桌面端
- 流畅的动画效果
- 现代化的用户界面
- 独立运行，无需额外依赖

## 注意事项
- 所有文件路径已修复为相对路径，可独立运行
- 建议在HTTP服务器环境中运行以获得最佳体验
- 如需修改，请保持文件在同一目录下

## 来源
本风格来自 LoginLab 项目：https://github.com/yuanyang749/loginlab

---
© 2025 Beautiful Login Project. 精美移动端登录页面集合
`;
  }

  // 下载指定风格的文件包
  async downloadStyle(styleId, progressCallback) {
    if (this.isDownloading) {
      throw new Error("已有下载任务正在进行中，请稍后再试");
    }

    const styleInfo = this.styleFileMap[styleId];
    if (!styleInfo) {
      throw new Error(`未找到风格: ${styleId}`);
    }

    this.isDownloading = true;

    try {
      // 检查JSZip是否可用
      if (typeof JSZip === "undefined") {
        throw new Error("JSZip库未加载，请刷新页面重试");
      }

      // 创建ZIP实例
      const zip = new JSZip();
      const totalFiles = styleInfo.files.length + 1; // +1 for README
      let completedFiles = 0;

      // 更新进度
      const updateProgress = (increment = 1) => {
        completedFiles += increment;
        const progress = Math.round((completedFiles / totalFiles) * 100);
        if (progressCallback) {
          progressCallback(progress, completedFiles, totalFiles);
        }
      };

      // 添加README文件
      const readmeContent = this.createReadmeContent(styleId, styleInfo);
      zip.file("README.md", readmeContent);
      updateProgress();

      // 下载并添加所有相关文件
      for (const filePath of styleInfo.files) {
        try {
          const content = await this.fetchFileContent("/" + filePath);
          if (content !== null) {
            // 获取文件名（去掉路径前缀）
            const fileName = filePath.split("/").pop();

            // 如果是HTML文件，需要修复路径引用
            if (fileName.endsWith(".html")) {
              const fixedContent = this.fixHtmlPaths(content, styleId);
              zip.file(fileName, fixedContent);
            } else {
              zip.file(fileName, content);
            }
          }
        } catch (error) {
          console.warn(`跳过文件 ${filePath}:`, error);
        }
        updateProgress();
      }

      // 生成ZIP文件
      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 6,
        },
      });

      // 创建下载链接
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${styleId}-login-style.zip`;

      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 清理URL对象
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      return {
        success: true,
        fileName: `${styleId}-login-style.zip`,
        fileSize: zipBlob.size,
      };
    } finally {
      this.isDownloading = false;
    }
  }

  // 格式化文件大小
  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // 检查是否正在下载
  isCurrentlyDownloading() {
    return this.isDownloading;
  }

  // 获取风格信息
  getStyleInfo(styleId) {
    return this.styleFileMap[styleId];
  }

  // 获取所有可用风格
  getAllStyles() {
    return Object.keys(this.styleFileMap);
  }
}

// 创建全局下载管理器实例
window.downloadManager = new DownloadManager();
