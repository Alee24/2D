/**
 * Google Analytics-Grade Silent Visitor Telemetry for SECONDESK
 * Captures non-blocking session, device, OS, browser, screen resolution, and path metrics.
 * Supports multi-fallback mobile network transport (Fetch, sendBeacon, Image Pixel).
 */

const VISITOR_KEY = 'secondesk_vid';
const SESSION_KEY = 'secondesk_sid';

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

export const trackPageView = (path: string): void => {
  try {
    // Never track the secret /count analytics dashboard itself
    if (path === '/count' || path.startsWith('/api/')) {
      return;
    }

    const payload = {
      path,
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      device: getDeviceType(),
      os: getOSName(),
      browser: getBrowserName(),
      screen: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || 'en-US',
      referrer: document.referrer ? new URL(document.referrer).hostname : 'Direct',
    };

    const endpoint = '/api/counter.php?action=track';

    // 1. Primary Transport: Fetch API
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // 2. Secondary Transport: sendBeacon
      try {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(endpoint, blob);
        }
      } catch (err2) {
        // 3. Fallback: Image / Query String Pixel ping
        const query = new URLSearchParams({
          action: 'track',
          path: payload.path,
          visitorId: payload.visitorId,
          device: payload.device,
          os: payload.os,
          browser: payload.browser,
        }).toString();
        const img = new Image();
        img.src = `${endpoint}&${query}`;
      }
    });

  } catch (err) {
    // Fail silently with zero console errors or UI impact
  }
};

// Auto-start active visitor heartbeat every 20 seconds while page is active
let heartbeatInterval: any = null;

export const startActiveHeartbeat = (getCurrentPath: () => string): void => {
  if (heartbeatInterval) return;
  heartbeatInterval = setInterval(() => {
    const path = getCurrentPath();
    if (path && path !== '/count' && !path.startsWith('/api/')) {
      trackPageView(path);
    }
  }, 20000);
};
