import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  Calendar, 
  Clock, 
  Smartphone, 
  Monitor, 
  Tablet, 
  RefreshCw, 
  Search, 
  Shield, 
  TrendingUp,
  Globe,
  Trash2,
  Lock,
  Unlock,
  KeyRound,
  Compass,
  Activity,
  Layers,
  Sparkles,
  Check,
  Zap,
  Radio
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Logo } from '../components/Logo';

interface AnalyticsMetrics {
  totalViews: number;
  totalUniqueVisitors: number;
  activeLiveVisitors: number;
  todayViews: number;
  todayUniqueVisitors: number;
  yesterdayViews: number;
  yesterdayUniqueVisitors: number;
}

interface TopItem {
  name?: string;
  path?: string;
  views?: number;
  count?: number;
}

interface TimelineItem {
  date: string;
  label: string;
  views: number;
  visitors: number;
}

interface HourlyItem {
  hour: string;
  views: number;
}

interface LiveVisitor {
  visitorId: string;
  path: string;
  device: string;
  browser: string;
  ago: string;
}

interface VisitLog {
  timestamp: string;
  path: string;
  visitorId: string;
  sessionId: string;
  device: string;
  os: string;
  browser: string;
  screen: string;
  language: string;
  ip: string;
  referrer: string;
  refCategory: string;
}

export const Count: React.FC = () => {
  // Security PIN gate state
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('secondesk_analytics_pin') === '5459';
  });

  // Analytics State
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [liveVisitors, setLiveVisitors] = useState<LiveVisitor[]>([]);
  const [deviceStats, setDeviceStats] = useState<{ desktop: number; mobile: number; tablet: number }>({ desktop: 0, mobile: 0, tablet: 0 });
  const [referrerStats, setReferrerStats] = useState<Record<string, number>>({ Direct: 0, Google: 0, Social: 0, WhatsApp: 0, External: 0 });
  const [topBrowsers, setTopBrowsers] = useState<TopItem[]>([]);
  const [topOS, setTopOS] = useState<TopItem[]>([]);
  const [topPages, setTopPages] = useState<TopItem[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [todayHourly, setTodayHourly] = useState<HourlyItem[]>([]);
  const [logs, setLogs] = useState<VisitLog[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [resetConfirming, setResetConfirming] = useState<boolean>(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '5459') {
      sessionStorage.setItem('secondesk_analytics_pin', '5459');
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleLockSession = () => {
    sessionStorage.removeItem('secondesk_analytics_pin');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const fetchStats = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    try {
      const pin = sessionStorage.getItem('secondesk_analytics_pin') || '5459';
      const res = await fetch(`/api/counter.php?action=stats&pin=${pin}`, {
        headers: {
          'X-Analytics-Pin': pin
        }
      });
      
      if (res.status === 401) {
        setIsAuthenticated(false);
        throw new Error('Invalid Security PIN');
      }

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setMetrics(data.metrics);
        setLiveVisitors(data.liveVisitorsList || []);
        setDeviceStats(data.deviceStats);
        setReferrerStats(data.referrerStats || {});
        setTopBrowsers(data.topBrowsers || []);
        setTopOS(data.topOS || []);
        setTopPages(data.topPages || []);
        setTimeline(data.timeline || []);
        setTodayHourly(data.todayHourly || []);
        setLogs(data.recentLogs || []);
        setLastRefreshed(new Date());
      } else {
        throw new Error(data.error || 'Failed to parse analytics payload');
      }
    } catch (err: any) {
      console.error('Failed to load visitor stats:', err);
      setError(err.message || 'Unable to connect to analytics endpoint');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  // Real-time live polling (3-second frequency)
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;
    const timer = setInterval(() => {
      fetchStats();
    }, 3000);
    return () => clearInterval(timer);
  }, [isAuthenticated, autoRefresh]);

  const handleTestPing = async () => {
    try {
      await fetch('/api/counter.php?action=track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: '/test-ping',
          device: /Mobile|Android|iPhone/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          browser: 'Mobile Test Ping',
          os: navigator.userAgent.includes('iPhone') ? 'iOS' : navigator.userAgent.includes('Android') ? 'Android' : 'Mobile OS',
          visitorId: 'test_' + Math.random().toString(36).substring(2, 8)
        })
      });
      fetchStats();
    } catch (e) {
      alert('Ping error: ' + e);
    }
  };

  const handleResetData = async () => {
    try {
      const pin = sessionStorage.getItem('secondesk_analytics_pin') || '5459';
      const res = await fetch(`/api/counter.php?action=reset&confirm=yes&pin=${pin}`);
      const data = await res.json();
      if (data.success) {
        setResetConfirming(false);
        fetchStats();
      }
    } catch (err) {
      alert('Failed to reset analytics database');
    }
  };

  const filteredLogs = logs.filter(log => 
    log.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.browser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.os.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.referrer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maxTimelineViews = Math.max(...timeline.map(t => t.views), 1);
  const maxHourlyViews = Math.max(...todayHourly.map(h => h.views), 1);

  // IF NOT AUTHENTICATED: RENDER PIN SECURITY GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] text-[#FAFAF8] flex flex-col items-center justify-center p-6 font-sans select-none animate-fade-in">
        <SEO title="SECONDESK Security Access" description="Security PIN verification required." />
        
        <div className="max-w-md w-full bg-[#1A1A1A] border border-[#2D2D2D] p-8 sm:p-10 rounded-2xl shadow-2xl space-y-8 relative overflow-hidden">
          {/* Subtle Top Red Accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sand via-[#E31B23] to-sand"></div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto text-sand shadow-inner">
              <Lock className="w-8 h-8 text-[#E31B23] animate-pulse" />
            </div>
            <div className="inline-flex items-center gap-2">
              <Logo size={24} light={false} />
              <span className="font-display font-black text-lg tracking-widest text-white uppercase">
                SECON<span className="text-[#E31B23]">DESK</span>
              </span>
            </div>
            <h1 className="font-display font-light text-2xl text-white tracking-tight">Visitor Intelligence</h1>
            <p className="font-mono text-xs text-white/50">
              Enter 4-Digit Security PIN to Access Live Analytics
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="space-y-2 text-center">
              <input 
                type="password"
                maxLength={4}
                autoFocus
                placeholder="••••"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value.replace(/[^0-9]/g, ''));
                  setPinError(false);
                }}
                className={`w-full bg-[#111111] border text-center font-mono text-3xl tracking-[0.5em] py-4 rounded-xl text-sand placeholder:text-white/10 outline-none transition-all ${
                  pinError ? 'border-red-500 shadow-red-900/40 shadow-lg animate-shake' : 'border-[#2D2D2D] focus:border-sand'
                }`}
              />
              {pinError && (
                <p className="text-xs font-mono text-red-400 font-medium animate-fade-in">
                  Incorrect Security PIN. Please try again.
                </p>
              )}
            </div>

            {/* Quick Numpad Helper for Touch / Mobile */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (pinInput.length < 4) {
                      setPinInput(prev => prev + num);
                      setPinError(false);
                    }
                  }}
                  className="bg-[#222222] hover:bg-[#2A2A2A] active:bg-sand active:text-charcoal border border-[#333333] text-white font-mono text-lg py-3 rounded-lg transition-all cursor-pointer font-bold"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPinInput('')}
                className="bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 text-red-300 font-mono text-xs uppercase py-3 rounded-lg transition-all cursor-pointer font-bold"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  if (pinInput.length < 4) {
                    setPinInput(prev => prev + '0');
                    setPinError(false);
                  }
                }}
                className="bg-[#222222] hover:bg-[#2A2A2A] border border-[#333333] text-white font-mono text-lg py-3 rounded-lg transition-all cursor-pointer font-bold"
              >
                0
              </button>
              <button
                type="submit"
                className="bg-sand hover:bg-white text-charcoal font-mono text-xs uppercase font-bold py-3 rounded-lg transition-all cursor-pointer shadow-md flex items-center justify-center"
              >
                Unlock
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-sand border border-sand text-charcoal hover:bg-white hover:border-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Analytics Dashboard</span>
            </button>
          </form>

          <p className="text-center font-mono text-[10px] text-white/30">
            Protected Gateway • SECONDESK Internal Intelligence
          </p>
        </div>
      </div>
    );
  }

  // AUTHENTICATED VIEW: RENDER LIVE DASHBOARD
  return (
    <div className="bg-[#111111] text-[#FAFAF8] min-h-screen font-sans animate-fade-in pb-24 selection:bg-sand selection:text-charcoal">
      <SEO 
        title="SECONDESK Live Analytics" 
        description="Real-Time Live Visitor Telemetry & Intelligence Dashboard."
      />

      {/* Top Navigation & Live Control Bar */}
      <header className="border-b border-[#2D2D2D] bg-[#1A1A1A]/90 backdrop-blur-md sticky top-0 z-50 py-4 px-6 lg:px-12 shadow-xl">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl border border-white/20 shadow-xs">
              <Logo size={28} light={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg tracking-wider text-white uppercase">
                  SECON<span className="text-[#E31B23]">DESK</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></div>
                  LIVE STREAM
                </span>
              </div>
              <p className="text-[11px] text-white/50 font-mono">
                secondesk.ke/count
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleTestPing}
              title="Send a Test Hit to Verify Connection"
              className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg border border-sand/40 text-sand hover:bg-sand hover:text-charcoal transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Test Ping</span>
            </button>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                autoRefresh 
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50' 
                  : 'bg-[#2D2D2D] text-white/60 border-transparent'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${autoRefresh ? 'animate-pulse text-emerald-400' : ''}`} />
              <span>Real-Time (3s): {autoRefresh ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="bg-sand hover:bg-white text-charcoal px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLockSession}
              title="Lock Session"
              className="p-2 bg-[#222222] hover:bg-red-950/50 text-white/70 hover:text-red-400 border border-[#333333] rounded-lg transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 space-y-8">
        {/* Error Notification */}
        {error && (
          <div className="bg-red-950/80 border border-red-800/60 p-4 rounded-xl text-red-200 text-xs flex items-center justify-between font-mono">
            <span>⚠️ {error}</span>
            <button onClick={fetchStats} className="underline hover:text-white font-bold">Retry Now</button>
          </div>
        )}

        {/* 1. REAL-TIME LIVE VISITORS BANNER & METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Active Online Visitors Card */}
          <div className="bg-gradient-to-br from-emerald-950/80 to-[#1A1A1A] border border-emerald-800/50 p-6 rounded-2xl relative overflow-hidden group shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <Activity className="w-4 h-4 animate-bounce" /> Active Online Now
              </span>
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
            </div>
            <div className="font-display font-light text-5xl text-emerald-300 tracking-tight">
              {metrics ? metrics.activeLiveVisitors : 0}
            </div>
            <p className="text-[11px] font-sans text-emerald-400/70 mt-2">
              Active visitors in last 5 mins
            </p>
          </div>

          {/* Today's Page Views Card */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl relative overflow-hidden group hover:border-sand/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">Today's Page Views</span>
              <div className="w-9 h-9 rounded-lg bg-sand/10 text-sand flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-light text-4xl text-white tracking-tight">
              {metrics ? metrics.todayViews.toLocaleString() : '---'}
            </div>
            <p className="text-[11px] font-sans text-white/40 mt-2">
              Yesterday: {metrics ? metrics.yesterdayViews.toLocaleString() : 0}
            </p>
          </div>

          {/* Today's Unique Visitors Card */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl relative overflow-hidden group hover:border-sand/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">Today's Visitors</span>
              <div className="w-9 h-9 rounded-lg bg-sand/10 text-sand flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-light text-4xl text-white tracking-tight">
              {metrics ? metrics.todayUniqueVisitors.toLocaleString() : '---'}
            </div>
            <p className="text-[11px] font-sans text-white/40 mt-2">
              Yesterday: {metrics ? metrics.yesterdayUniqueVisitors.toLocaleString() : 0}
            </p>
          </div>

          {/* Total Cumulative Views Card */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl relative overflow-hidden group hover:border-sand/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">Total Views</span>
              <div className="w-9 h-9 rounded-lg bg-sand/10 text-sand flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-light text-4xl text-white tracking-tight">
              {metrics ? metrics.totalViews.toLocaleString() : '---'}
            </div>
            <p className="text-[11px] font-sans text-white/40 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cumulative site hits</span>
            </p>
          </div>

          {/* Total Unique Visitors Card */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl relative overflow-hidden group hover:border-sand/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">Total Unique</span>
              <div className="w-9 h-9 rounded-lg bg-sand/10 text-sand flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-light text-4xl text-white tracking-tight">
              {metrics ? metrics.totalUniqueVisitors.toLocaleString() : '---'}
            </div>
            <p className="text-[11px] font-sans text-white/40 mt-2">
              Distinct user IDs
            </p>
          </div>
        </div>

        {/* 2. HOURLY PEAK TRAFFIC CHART & LIVE ACTIVE VISITORS STREAM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Today's Peak Hours Curve */}
          <div className="lg:col-span-8 bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-4">
              <div>
                <h2 className="font-display font-light text-xl text-white tracking-tight">Today's Peak Traffic Hours</h2>
                <p className="text-xs text-white/50 font-sans">Hourly breakdown from 00:00 to 23:00</p>
              </div>
              <span className="text-xs font-mono text-sand font-bold">24-Hour Distribution</span>
            </div>

            <div className="h-52 flex items-end justify-between gap-1 pt-6 px-1 border-b border-[#2D2D2D] pb-2 overflow-x-auto">
              {todayHourly.map((item, idx) => {
                const heightPercent = Math.max((item.views / maxHourlyViews) * 100, 3);
                const isCurrentHour = new Date().getHours() === idx;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end min-w-[20px]">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-sand text-[10px] font-mono px-2 py-1 rounded border border-sand/30 absolute -translate-y-8 pointer-events-none shadow-lg z-20 whitespace-nowrap">
                      {item.hour}: {item.views} hits
                    </div>
                    <div 
                      className={`w-full rounded-t transition-all ${
                        isCurrentHour 
                          ? 'bg-emerald-400 group-hover:bg-emerald-300' 
                          : 'bg-sand/70 group-hover:bg-sand'
                      }`} 
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                    <span className={`text-[9px] font-mono truncate w-full text-center ${isCurrentHour ? 'text-emerald-400 font-bold' : 'text-white/30'}`}>
                      {idx % 3 === 0 ? item.hour.split(':')[0] : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Active Visitor Stream */}
          <div className="lg:col-span-4 bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-3 mb-4">
                <h2 className="font-display font-light text-lg text-white tracking-tight flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" /> Live Visitor Stream
                </h2>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/50">
                  {liveVisitors.length} Active
                </span>
              </div>

              <div className="space-y-2.5 max-h-52 overflow-y-auto">
                {liveVisitors.length === 0 ? (
                  <p className="text-xs font-mono text-white/40 py-8 text-center">No active online visitors in the last 5 minutes.</p>
                ) : (
                  liveVisitors.map((v, i) => (
                    <div key={i} className="p-2.5 border border-emerald-900/40 bg-emerald-950/20 rounded-lg flex items-center justify-between text-xs font-mono">
                      <div className="space-y-0.5">
                        <span className="text-emerald-300 font-bold block">{v.path}</span>
                        <span className="text-[10px] text-white/40 capitalize">{v.device} ({v.browser})</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-900/50 px-2 py-0.5 rounded">{v.ago}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#2D2D2D] text-[10px] font-mono text-white/40 flex items-center justify-between">
              <span>Auto-refreshed: {lastRefreshed.toLocaleTimeString()}</span>
              <Globe className="w-3.5 h-3.5 text-sand/60" />
            </div>
          </div>
        </div>

        {/* 3. GOOGLE ANALYTICS-GRADE PANELS: TRAFFIC SOURCES, OS, TOP BROWSERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Traffic Sources */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl space-y-4">
            <div className="border-b border-[#2D2D2D] pb-3 flex items-center justify-between">
              <h3 className="font-display font-light text-base text-white">Traffic Sources</h3>
              <Compass className="w-4 h-4 text-sand" />
            </div>
            <div className="space-y-3 font-mono text-xs">
              {(() => {
                const totalRef = Object.values(referrerStats).reduce((a, b) => a + b, 0) || 1;
                return Object.entries(referrerStats).map(([cat, count], i) => {
                  const pct = Math.round((count / totalRef) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-white/80">
                        <span>{cat}</span>
                        <span className="text-sand font-bold">{pct}% ({count})</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#2D2D2D] rounded-full overflow-hidden">
                        <div className="h-full bg-sand rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* Operating Systems */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl space-y-4">
            <div className="border-b border-[#2D2D2D] pb-3 flex items-center justify-between">
              <h3 className="font-display font-light text-base text-white">Operating Systems</h3>
              <Monitor className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="space-y-3 font-mono text-xs">
              {topOS.length === 0 ? (
                <p className="text-white/40 py-4 text-center">No OS data captured.</p>
              ) : (
                topOS.map((os, i) => {
                  const totalOS = topOS.reduce((a, b) => a + (b.count || 0), 0) || 1;
                  const pct = Math.round(((os.count || 0) / totalOS) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-white/80">
                        <span>{os.name}</span>
                        <span className="text-emerald-400 font-bold">{pct}% ({os.count})</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#2D2D2D] rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Top Browsers */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl space-y-4">
            <div className="border-b border-[#2D2D2D] pb-3 flex items-center justify-between">
              <h3 className="font-display font-light text-base text-white">Top Browsers</h3>
              <Globe className="w-4 h-4 text-sky-400" />
            </div>
            <div className="space-y-3 font-mono text-xs">
              {topBrowsers.length === 0 ? (
                <p className="text-white/40 py-4 text-center">No browser data captured.</p>
              ) : (
                topBrowsers.map((b, i) => {
                  const totalB = topBrowsers.reduce((a, b) => a + (b.count || 0), 0) || 1;
                  const pct = Math.round(((b.count || 0) / totalB) * 100);
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-white/80">
                        <span>{b.name}</span>
                        <span className="text-sky-400 font-bold">{pct}% ({b.count})</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#2D2D2D] rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* 4. MOST VISITED PAGES & LIVE LOGS TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Top Visited Pages */}
          <div className="lg:col-span-4 bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-3">
              <h2 className="font-display font-light text-lg text-white tracking-tight">Most Visited Pages</h2>
              <span className="text-xs font-mono text-sand">Page Rank</span>
            </div>

            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {topPages.length === 0 ? (
                <p className="text-xs font-mono text-white/40 py-8 text-center">No page view records.</p>
              ) : (
                topPages.map((item, idx) => {
                  const maxViews = topPages[0]?.views || 1;
                  const pct = Math.round(((item.views || 0) / maxViews) * 100);
                  return (
                    <div key={idx} className="p-3 border border-[#2D2D2D] bg-[#111111]/50 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-white truncate max-w-[170px]">
                          {item.path}
                        </span>
                        <span className="font-mono text-sand font-bold">{(item.views || 0).toLocaleString()} hits</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#2D2D2D] rounded-full overflow-hidden">
                        <div className="h-full bg-sand rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Full Telemetry Visit Log Table */}
          <div className="lg:col-span-8 bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2D2D2D] pb-3">
              <div>
                <h2 className="font-display font-light text-lg text-white tracking-tight">Visitor Telemetry Logs</h2>
                <p className="text-xs text-white/50 font-sans">Detailed user session records</p>
              </div>

              {/* Search Filter */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Filter by page, OS, IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#111111] border border-[#2D2D2D] focus:border-sand text-xs font-mono px-3 py-1.5 pl-8 rounded-lg text-white placeholder:text-white/30 outline-none transition-colors w-full sm:w-60"
                />
              </div>
            </div>

            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#2D2D2D] text-white/40 uppercase tracking-widest text-[10px]">
                    <th className="pb-3 pr-3">Time</th>
                    <th className="pb-3 pr-3">Page</th>
                    <th className="pb-3 pr-3">OS / Browser</th>
                    <th className="pb-3 pr-3">Screen</th>
                    <th className="pb-3 pr-3">Source</th>
                    <th className="pb-3">IP (Anon)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2D2D2D]">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-white/40 font-mono">
                        No visitor logs match your search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log, i) => (
                      <tr key={i} className="hover:bg-[#2D2D2D]/30 transition-colors">
                        <td className="py-2.5 pr-3 text-white/60 whitespace-nowrap text-[11px]">
                          {log.timestamp.split(' ')[1] || log.timestamp}
                        </td>
                        <td className="py-2.5 pr-3 font-bold text-sand whitespace-nowrap">
                          {log.path}
                        </td>
                        <td className="py-2.5 pr-3 text-white/80 whitespace-nowrap">
                          {log.os} • {log.browser}
                        </td>
                        <td className="py-2.5 pr-3 text-white/50 text-[10px]">
                          {log.screen}
                        </td>
                        <td className="py-2.5 pr-3 whitespace-nowrap">
                          <span className="bg-[#2D2D2D] px-2 py-0.5 rounded text-[10px] text-white/70">
                            {log.refCategory || 'Direct'}
                          </span>
                        </td>
                        <td className="py-2.5 text-white/40 whitespace-nowrap text-[10px]">
                          {log.ip}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Danger Zone / Reset Counter Data */}
        <div className="pt-6 border-t border-[#2D2D2D] flex items-center justify-between text-xs font-mono">
          <span className="text-white/40">Protected by PIN 5459 • SECONDESK Internal Analytics Engine</span>

          {resetConfirming ? (
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">Reset all analytics database?</span>
              <button 
                onClick={handleResetData}
                className="bg-red-600 text-white font-bold px-3 py-1 rounded hover:bg-red-500 transition-colors cursor-pointer"
              >
                Confirm Reset
              </button>
              <button 
                onClick={() => setResetConfirming(false)}
                className="bg-[#2D2D2D] text-white/70 px-3 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setResetConfirming(true)}
              className="text-red-500/70 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Analytics Data</span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Count;
