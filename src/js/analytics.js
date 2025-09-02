// 统计分析服务 - 与Supabase交互
class AnalyticsService {
  constructor() {
    this.supabaseUrl = null;
    this.supabaseKey = null;
    this.supabaseClient = null;
    this.sessionId = this.generateSessionId();
    this.eventQueue = [];
    this.isOnline = navigator.onLine;
    this.rateLimitMap = new Map(); // 防刷机制

    this.init();
    this.setupEventListeners();
  }

  // 初始化Supabase客户端
  async init() {
    try {
      // Supabase项目配置
      this.supabaseUrl = "https://egozkxbkonmawgvngtjq.supabase.co";
      this.supabaseKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnb3preGJrb25tYXdndm5ndGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODI4NTMsImV4cCI6MjA3MDc1ODg1M30.zdDd9TTG4t3QR_VaVKnqxX2lyD2j5P8Uf6wqzT0340U";

      // 等待Supabase库加载
      await this.waitForSupabase();

      if (window.supabase) {
        this.supabaseClient = window.supabase.createClient(
          this.supabaseUrl,
          this.supabaseKey
        );
        console.log("✅ Analytics service initialized with Supabase");

        // 测试连接
        await this.testConnection();
      } else {
        console.warn(
          "⚠️ Supabase client not available, analytics will be queued"
        );
      }
    } catch (error) {
      console.error("❌ Failed to initialize analytics service:", error);
    }
  }

  // 等待Supabase库加载
  async waitForSupabase(maxWait = 5000) {
    const startTime = Date.now();

    while (!window.supabase && Date.now() - startTime < maxWait) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return !!window.supabase;
  }

  // 测试Supabase连接
  async testConnection() {
    try {
      const { data, error } = await this.supabaseClient
        .from("styles")
        .select("count")
        .limit(1);

      if (error) {
        console.warn("⚠️ Supabase connection test failed:", error.message);
      } else {
        console.log("✅ Supabase connection test successful");
      }
    } catch (error) {
      console.warn("⚠️ Supabase connection test error:", error);
    }
  }

  // 生成唯一会话ID
  generateSessionId() {
    const stored = sessionStorage.getItem("loginlab_session_id");
    if (stored) {
      return stored;
    }

    // 安全修复：使用密码学安全的随机数生成器
    const randomBytes = new Uint8Array(8);
    crypto.getRandomValues(randomBytes);
    const randomHex = Array.from(randomBytes, (byte) =>
      byte.toString(16).padStart(2, "0")
    ).join("");
    const sessionId = "sess_" + Date.now() + "_" + randomHex;
    sessionStorage.setItem("loginlab_session_id", sessionId);
    return sessionId;
  }

  // 设置事件监听器
  setupEventListeners() {
    // 监听网络状态变化
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.flushEventQueue();
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
    });

    // 页面卸载时尝试发送剩余事件
    window.addEventListener("beforeunload", () => {
      this.flushEventQueue(true);
    });
  }

  // 防刷机制检查
  isRateLimited(styleId, eventType) {
    const key = `${styleId}_${eventType}`;
    const now = Date.now();
    const lastEvent = this.rateLimitMap.get(key);

    // 同一风格同一事件类型5分钟内只记录一次
    const cooldownPeriod = 5 * 60 * 1000; // 5分钟

    if (lastEvent && now - lastEvent < cooldownPeriod) {
      return true;
    }

    this.rateLimitMap.set(key, now);
    return false;
  }

  // 记录事件
  async trackEvent(eventType, styleId, additionalData = {}) {
    try {
      // 验证参数
      if (!eventType || !styleId) {
        console.warn("⚠️ Analytics: Missing required parameters");
        return false;
      }

      if (!["view", "download"].includes(eventType)) {
        console.warn("⚠️ Analytics: Invalid event type:", eventType);
        return false;
      }

      // 防刷检查
      if (this.isRateLimited(styleId, eventType)) {
        console.log(`🚫 Analytics: Rate limited for ${styleId} ${eventType}`);
        return false;
      }

      // 创建事件数据
      const eventData = {
        style_id: await this.getStyleUUID(styleId),
        event_type: eventType,
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        ip_hash: await this.getIPHash(),
        ...additionalData,
      };

      // 如果在线且Supabase可用，直接发送
      if (this.isOnline && this.supabaseClient) {
        return await this.sendEvent(eventData);
      } else {
        // 否则加入队列
        this.queueEvent(eventData);
        return true;
      }
    } catch (error) {
      console.error("❌ Analytics: Failed to track event:", error);
      return false;
    }
  }

  // 获取风格的UUID
  async getStyleUUID(styleSlug) {
    try {
      if (!this.supabaseClient) {
        return null;
      }

      const { data, error } = await this.supabaseClient
        .from("styles")
        .select("id")
        .eq("slug", styleSlug)
        .single();

      if (error) {
        console.error("❌ Failed to get style UUID:", error);
        return null;
      }

      return data?.id;
    } catch (error) {
      console.error("❌ Error getting style UUID:", error);
      return null;
    }
  }

  // 获取IP哈希（简单的客户端实现）
  async getIPHash() {
    try {
      // 简单的客户端IP哈希，实际项目中可能需要更复杂的实现
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.textBaseline = "top";
      ctx.font = "14px Arial";
      ctx.fillText("IP fingerprint", 2, 2);

      const fingerprint = canvas.toDataURL();
      const hash = await this.simpleHash(fingerprint + navigator.userAgent);
      return hash.substr(0, 16); // 取前16位作为IP哈希
    } catch (error) {
      return "unknown";
    }
  }

  // 简单哈希函数
  async simpleHash(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  // 发送事件到Supabase
  async sendEvent(eventData) {
    try {
      if (!this.supabaseClient) {
        throw new Error("Supabase client not available");
      }

      const { data, error } = await this.supabaseClient
        .from("analytics")
        .insert([eventData]);

      if (error) {
        throw error;
      }

      console.log(
        `📊 Analytics: ${eventData.event_type} event tracked for style ${eventData.style_id}`
      );
      return true;
    } catch (error) {
      console.error("❌ Failed to send analytics event:", error);
      // 发送失败时加入队列
      this.queueEvent(eventData);
      return false;
    }
  }

  // 将事件加入队列
  queueEvent(eventData) {
    this.eventQueue.push(eventData);

    // 保存到localStorage作为备份
    try {
      const stored = JSON.parse(
        localStorage.getItem("loginlab_analytics_queue") || "[]"
      );
      stored.push(eventData);
      // 限制队列大小，避免占用过多存储空间
      if (stored.length > 100) {
        stored.splice(0, stored.length - 100);
      }
      localStorage.setItem("loginlab_analytics_queue", JSON.stringify(stored));
    } catch (error) {
      console.warn("⚠️ Failed to save analytics queue to localStorage:", error);
    }

    console.log(
      `📝 Analytics: Event queued (${this.eventQueue.length} in queue)`
    );
  }

  // 刷新事件队列
  async flushEventQueue(isBeforeUnload = false) {
    if (this.eventQueue.length === 0) {
      return;
    }

    if (!this.supabaseClient) {
      console.warn("⚠️ Cannot flush queue: Supabase client not available");
      return;
    }

    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];

    try {
      // 批量发送事件
      const { data, error } = await this.supabaseClient
        .from("analytics")
        .insert(eventsToSend);

      if (error) {
        throw error;
      }

      console.log(
        `📊 Analytics: Flushed ${eventsToSend.length} events from queue`
      );

      // 清除localStorage中的队列
      localStorage.removeItem("loginlab_analytics_queue");
    } catch (error) {
      console.error("❌ Failed to flush analytics queue:", error);

      // 如果不是页面卸载，重新加入队列
      if (!isBeforeUnload) {
        this.eventQueue.unshift(...eventsToSend);
      }
    }
  }

  // 从localStorage恢复队列
  restoreQueueFromStorage() {
    try {
      const stored = JSON.parse(
        localStorage.getItem("loginlab_analytics_queue") || "[]"
      );
      this.eventQueue.push(...stored);

      if (stored.length > 0) {
        console.log(
          `📝 Analytics: Restored ${stored.length} events from localStorage`
        );
        // 尝试立即发送
        setTimeout(() => this.flushEventQueue(), 1000);
      }
    } catch (error) {
      console.warn(
        "⚠️ Failed to restore analytics queue from localStorage:",
        error
      );
    }
  }

  // 获取统计数据（可选功能）
  async getStats(styleId = null, eventType = null, days = 7) {
    try {
      if (!this.supabaseClient) {
        throw new Error("Supabase client not available");
      }

      let query = this.supabaseClient.from("analytics").select("*");

      if (styleId) {
        const styleUUID = await this.getStyleUUID(styleId);
        if (styleUUID) {
          query = query.eq("style_id", styleUUID);
        }
      }

      if (eventType) {
        query = query.eq("event_type", eventType);
      }

      // 限制时间范围
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      query = query.gte("timestamp", startDate.toISOString());

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error("❌ Failed to get analytics stats:", error);
      return null;
    }
  }

  // 获取总览统计数据
  async getOverviewStats() {
    try {
      if (!this.supabaseClient) {
        throw new Error("Supabase client not available");
      }

      // 首先获取所有分析数据
      const { data: analyticsData, error: analyticsError } =
        await this.supabaseClient.from("analytics").select("*");

      if (analyticsError) {
        throw analyticsError;
      }

      // 获取所有风格信息
      const { data: stylesData, error: stylesError } = await this.supabaseClient
        .from("styles")
        .select("id, name, slug");

      if (stylesError) {
        throw stylesError;
      }

      // 创建风格ID到名称的映射
      const styleNameMap = {};
      stylesData.forEach((style) => {
        styleNameMap[style.id] = style.name;
      });

      const data = analyticsData;

      // 处理数据统计
      const stats = {
        totalViews: 0,
        totalDownloads: 0,
        styleStats: {},
        recentData: [],
      };

      data.forEach((record) => {
        if (record.event_type === "view") {
          stats.totalViews++;
        } else if (record.event_type === "download") {
          stats.totalDownloads++;
        }

        // 按风格统计
        if (record.style_id) {
          if (!stats.styleStats[record.style_id]) {
            stats.styleStats[record.style_id] = {
              style_id: record.style_id,
              views: 0,
              downloads: 0,
              name: styleNameMap[record.style_id] || "未知风格",
            };
          }

          if (record.event_type === "view") {
            stats.styleStats[record.style_id].views++;
          } else if (record.event_type === "download") {
            stats.styleStats[record.style_id].downloads++;
          }
        }
      });

      return stats;
    } catch (error) {
      console.error("❌ Failed to get overview stats:", error);
      throw error;
    }
  }

  // 获取风格排行榜
  async getStyleRankings() {
    try {
      const stats = await this.getOverviewStats();

      // 转换为数组并排序
      const styleArray = Object.values(stats.styleStats);
      styleArray.sort(
        (a, b) => b.views + b.downloads - (a.views + a.downloads)
      );

      // 添加排名和受欢迎程度
      const maxScore = styleArray[0]
        ? styleArray[0].views + styleArray[0].downloads
        : 1;

      return styleArray.slice(0, 10).map((style, index) => {
        const totalScore = style.views + style.downloads;
        const popularity = Math.round((totalScore / maxScore) * 100);

        return {
          rank: index + 1,
          name: this.getStyleDisplayName(style.style_id, style.name),
          views: style.views,
          downloads: style.downloads,
          popularity: popularity,
        };
      });
    } catch (error) {
      console.error("❌ Failed to get style rankings:", error);
      throw error;
    }
  }

  // 获取图表数据
  async getChartData() {
    try {
      const rankings = await this.getStyleRankings();

      return {
        labels: rankings.slice(0, 6).map((item) => {
          // 简化标签名称，去掉emoji和过长文字
          return item.name.replace(/[🎨🌈🌙🖥️🚀🦠]/g, "").substring(0, 8);
        }),
        data: rankings.slice(0, 6).map((item) => item.views),
        fullNames: rankings.slice(0, 6).map((item) => item.name),
      };
    } catch (error) {
      console.error("❌ Failed to get chart data:", error);
      throw error;
    }
  }

  // 获取风格显示名称
  getStyleDisplayName(styleId, fallbackName) {
    const styleNames = {
      "modern-gradient": "🌈 现代渐变",
      "dark-minimal": "🌙 深色极简",
      "warm-pink": "💖 温馨粉色",
      "business-professional": "💼 商务专业",
      "ocean-blue": "🌊 海洋蓝调",
      "starry-scifi": "⭐ 星空科幻",
      "sunset-glow": "🌅 日落余晖",
      "nature-forest": "🌲 自然森林",
      "luxury-diamond": "💎 奢华钻石",
      "cyber-punk": "🤖 赛博朋克",
      "pixel-retro": "👾 像素复古",
      "aurora-borealis": "🌌 极光风格",
      "minimalist-white": "⚪ 极简白色",
      "neon-glow": "💡 霓虹发光",
      "watercolor-art": "🎨 水彩艺术",
      "metallic-shine": "✨ 金属质感",
      glassmorphism: "🔮 玻璃拟态",
      "vintage-retro": "📻 复古怀旧",
      "futuristic-tech": "🚀 未来科技",
      "organic-nature": "🍃 自然有机",
      "geometric-abstract": "🔶 几何抽象",
      "hand-drawn": "✏️ 手绘风格",
      "industrial-steel": "🏭 工业风格",
      "fairy-tale": "🧚 梦幻童话",
      "moonlit-mystery": "🌙 月夜神秘",
      "fluid-art": "🌊 流体艺术",
      "cherry-blossom": "🌸 樱花飘落",
      "flame-lava": "🔥 火焰熔岩",
      "crystal-ice": "❄️ 水晶冰雪",
      "sakura-zen": "🌸 樱花和风",
      "cyberpunk-neon": "🌃 赛博朋克霓虹",
      "stellar-exploration": "🚀 星际探索",
      "theatrical-stage": "🎭 戏剧舞台",
      "circuit-tech": "⚡ 电路板科技",
      "calligraphy-ink": "🖋️ 书法墨韵",
      "neon-cyber-city": "🌃 霓虹赛博城市",
      "threejs-scifi": "🚀 3D 科幻空间",
      "windows98-retro": "🖥️ Windows 98 复古",
      "cyber-virus-infection": "🦠 网络朋克病毒感染",
    };

    return styleNames[styleId] || fallbackName || `🎨 ${styleId}`;
  }
}

// 创建全局分析服务实例
window.analyticsService = new AnalyticsService();

// 页面加载完成后恢复队列
window.addEventListener("load", () => {
  if (window.analyticsService) {
    window.analyticsService.restoreQueueFromStorage();
  }
});
