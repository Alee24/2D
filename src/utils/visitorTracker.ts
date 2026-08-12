/**
 * Silent Discreet Visitor Tracker for SECONDESK
 * Tracks page views, unique visitors, devices, and path statistics in background.
 */

const VISITOR_KEY = 'secondesk_vid';

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

const getDeviceType = (): string => {
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(navigator.userAgent)) {
    return 'mobile';
  }
  return 'desktop';
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
  return 'Unknown';
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
      device: getDeviceType(),
      browser: getBrowserName(),
      referrer: document.referrer ? new URL(document.referrer).hostname : 'Direct',
    };

    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    
    // Prefer navigator.sendBeacon for non-blocking unload/navigation safety
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/counter.php?action=track', blob);
    } else {
      fetch('/api/counter.php?action=track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => null);
    }
  } catch (err) {
    // Fail silently with zero console errors or UI impact
  }
};
