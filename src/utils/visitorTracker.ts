/**
 * Google Analytics-Grade Live Visitor Sensor & Telemetry for SECONDESK
 * Tracks real-time active visitors, page view events, time spent on page, OS, browser, screen size, and referrers.
 * Features 4-second active heartbeat + bulletproof 3-tier transport (Fetch, sendBeacon, Image Pixel).
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

// Send telemetry payload via 3-tier fallback transport
const sendTelemetry = (action: 'track' | 'ping', path: string, timeSpentSeconds: number = 0): void => {
  if (path === '/count' || path.startsWith('/api/')) return;

  const payload = {
    path,
    action,
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    device: getDeviceType(),
    os: getOSName(),
    browser: getBrowserName(),
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || 'en-US',
    referrer: document.referrer ? new URL(document.referrer).hostname : 'Direct',
    timeSpent: timeSpentSeconds
  };

  const endpoint = `/api/counter.php?action=${action}`;

  // Transport 1: Fetch POST
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Transport 2: sendBeacon
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, blob);
      }
    } catch (err2) {
      // Transport 3: Pixel GET
      const query = new URLSearchParams({
        action,
        path: payload.path,
        visitorId: payload.visitorId,
        device: payload.device,
        os: payload.os,
        browser: payload.browser,
        timeSpent: timeSpentSeconds.toString(),
        _t: Date.now().toString()
      }).toString();
      const img = new Image();
      img.src = `${endpoint}&${query}`;
    }
  });
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
