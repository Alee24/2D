/**
 * Google Analytics-Grade Live Visitor Sensor & Telemetry for SECONDESK
 * Tracks real-time active visitors, page view events, time spent on page, OS, browser, screen size, and referrers.
 * Features 4-second active heartbeat + bulletproof dual-transport (Fetch API + Image Pixel Ping).
 */

const VISITOR_KEY = 'secondesk_vid';
const SESSION_KEY = 'secondesk_sid';

let pageEntryTime = Date.now();
let currentTrackedPath = '';

const getVisitorId = (): string => {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch (e) {
    return 'v_guest_' + Math.random().toString(36).substring(2, 10);
  }
};

const getSessionId = (): string => {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = 's_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch (e) {
    return 's_tmp_' + Math.random().toString(36).substring(2, 10);
  }
};

const getDeviceType = (): string => {
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

const getOSName = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Win')) return 'Windows';
  if (ua.includes('Mac')) return 'macOS';
  if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod')) return 'iOS';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('Linux')) return 'Linux';
  return 'Unknown OS';
};

const getBrowserName = (): string => {
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  if (ua.includes('Trident')) return 'Internet Explorer';
  if (ua.includes('Edge') || ua.includes('Edg')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Unknown Browser';
};

const LOCAL_ANALYTICS_KEY = 'secondesk_local_analytics_db';

export const getLocalAnalyticsData = (): any => {
  try {
    const raw = localStorage.getItem(LOCAL_ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    totalViews: 0,
    uniqueVisitors: [],
    dailyStats: {},
    hourlyStats: {},
    pageViews: {},
    pageTimeSpent: {},
    deviceStats: { desktop: 0, mobile: 0, tablet: 0 },
    osStats: {},
    browserStats: {},
    referrerStats: { Direct: 0, Google: 0, Social: 0, WhatsApp: 0, External: 0 },
    activeVisitors: {},
    logs: []
  };
};

const updateLocalAnalyticsStore = (action: 'track' | 'ping', payload: any): void => {
  try {
    const db = getLocalAnalyticsData();
    const today = new Date().toISOString().split('T')[0];
    const hour = new Date().getHours();
    const nowFormatted = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (!db.uniqueVisitors) db.uniqueVisitors = [];
    if (!db.dailyStats) db.dailyStats = {};
    if (!db.hourlyStats) db.hourlyStats = {};
    if (!db.pageViews) db.pageViews = {};
    if (!db.pageTimeSpent) db.pageTimeSpent = {};
    if (!db.deviceStats) db.deviceStats = { desktop: 0, mobile: 0, tablet: 0 };
    if (!db.osStats) db.osStats = {};
    if (!db.browserStats) db.browserStats = {};
    if (!db.referrerStats) db.referrerStats = { Direct: 0, Google: 0, Social: 0, WhatsApp: 0, External: 0 };
    if (!db.activeVisitors) db.activeVisitors = {};
    if (!db.logs) db.logs = [];

    if (action === 'track') {
      db.totalViews = (db.totalViews || 0) + 1;
      if (!db.uniqueVisitors.includes(payload.visitorId)) {
        db.uniqueVisitors.push(payload.visitorId);
      }
      if (!db.dailyStats[today]) {
        db.dailyStats[today] = { views: 0, visitors: [] };
      }
      db.dailyStats[today].views += 1;
      if (!db.dailyStats[today].visitors.includes(payload.visitorId)) {
        db.dailyStats[today].visitors.push(payload.visitorId);
      }
      if (!db.hourlyStats[today]) {
        db.hourlyStats[today] = Array(24).fill(0);
      }
      db.hourlyStats[today][hour] = (db.hourlyStats[today][hour] || 0) + 1;
      db.pageViews[payload.path] = (db.pageViews[payload.path] || 0) + 1;
      db.deviceStats[payload.device] = (db.deviceStats[payload.device] || 0) + 1;
      db.osStats[payload.os] = (db.osStats[payload.os] || 0) + 1;
      db.browserStats[payload.browser] = (db.browserStats[payload.browser] || 0) + 1;
      
      const refLower = (payload.referrer || '').toLowerCase();
      const refCat = (refLower.includes('google') || refLower.includes('bing')) ? 'Google' 
        : (refLower.includes('whatsapp') || refLower.includes('wa.me')) ? 'WhatsApp' 
        : (refLower.includes('instagram') || refLower.includes('facebook') || refLower.includes('tiktok') || refLower.includes('twitter')) ? 'Social' 
        : payload.referrer !== 'Direct' && payload.referrer ? 'External' : 'Direct';
      
      db.referrerStats[refCat] = (db.referrerStats[refCat] || 0) + 1;

      db.logs.unshift({
        timestamp: nowFormatted,
        path: payload.path,
        visitorId: payload.visitorId.substring(0, 8),
        sessionId: payload.sessionId.substring(0, 8),
        device: payload.device,
        os: payload.os,
        browser: payload.browser,
        screen: payload.screen,
        language: payload.language,
        ip: '127.0.0.***',
        referrer: payload.referrer,
        refCategory: refCat
      });
    }

    if (payload.timeSpent > 0) {
      db.pageTimeSpent[payload.path] = (db.pageTimeSpent[payload.path] || 0) + 1;
    }

    db.activeVisitors[payload.visitorId] = {
      lastSeen: Math.floor(Date.now() / 1000),
      path: payload.path,
      device: payload.device,
      browser: payload.browser,
      os: payload.os,
      timeSpent: payload.timeSpent,
      ip: '127.0.0.***'
    };

    // Clean active visitors older than 3 mins
    const nowSec = Math.floor(Date.now() / 1000);
    Object.keys(db.activeVisitors).forEach((vid) => {
      if (nowSec - db.activeVisitors[vid].lastSeen > 180) {
        delete db.activeVisitors[vid];
      }
    });

    localStorage.setItem(LOCAL_ANALYTICS_KEY, JSON.stringify(db));
  } catch (e) {}
};

// Send telemetry payload via dual-transport fallback
const sendTelemetry = (action: 'track' | 'ping', path: string, timeSpentSeconds: number = 0): void => {
  if (path === '/count' || path.startsWith('/api/')) return;

  const vId = getVisitorId();
  const sId = getSessionId();
  const dev = getDeviceType();
  const os = getOSName();
  const browser = getBrowserName();
  const screen = `${window.screen.width}x${window.screen.height}`;
  const lang = navigator.language || 'en-US';
  const ref = document.referrer ? new URL(document.referrer).hostname : 'Direct';

  const payload = {
    path,
    action,
    visitorId: vId,
    sessionId: sId,
    device: dev,
    os,
    browser,
    screen,
    language: lang,
    referrer: ref,
    timeSpent: timeSpentSeconds
  };

  // Always update local persistent database immediately
  updateLocalAnalyticsStore(action, payload);

  const queryParams = new URLSearchParams({
    action,
    path,
    visitorId: vId,
    sessionId: sId,
    device: dev,
    os,
    browser,
    screen,
    language: lang,
    referrer: ref,
    timeSpent: timeSpentSeconds.toString(),
    _t: Date.now().toString()
  }).toString();

  const endpoint = `/api/counter.php?${queryParams}`;

  // 1. Image Pixel Ping (100% fail-safe on mobile Safari & Chrome)
  try {
    const img = new Image();
    img.src = endpoint;
  } catch (e) {}

  // 2. Fetch API with JSON Body
  try {
    fetch('/api/counter.php?action=' + action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => null);
  } catch (e) {}
};

export const trackPageView = (path: string): void => {
  try {
    if (path === '/count' || path.startsWith('/api/')) return;

    currentTrackedPath = path;
    pageEntryTime = Date.now();

    // Initial hit
    sendTelemetry('track', path, 0);
  } catch (err) {
    // Fail silently
  }
};

let activeHeartbeatTimer: any = null;

export const startActiveHeartbeat = (getCurrentPath: () => string): void => {
  if (activeHeartbeatTimer) return;

  // 4-second active heartbeat ping
  activeHeartbeatTimer = setInterval(() => {
    const path = getCurrentPath();
    if (path && path !== '/count' && !path.startsWith('/api/')) {
      const timeSpentSeconds = Math.max(0, Math.floor((Date.now() - pageEntryTime) / 1000));
      sendTelemetry('ping', path, timeSpentSeconds);
    }
  }, 4000);

  // Send instant ping on tab focus / visibilitychange
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      const path = getCurrentPath();
      if (path && path !== '/count' && !path.startsWith('/api/')) {
        const timeSpentSeconds = Math.max(0, Math.floor((Date.now() - pageEntryTime) / 1000));
        sendTelemetry('ping', path, timeSpentSeconds);
      }
    }
  };

  window.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('focus', handleVisibilityChange);
};
