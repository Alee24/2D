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
  ArrowUpRight, 
  TrendingUp,
  Globe,
  Trash2,
  Check
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Logo } from '../components/Logo';

interface AnalyticsMetrics {
  totalViews: number;
  totalUniqueVisitors: number;
  todayViews: number;
  todayUniqueVisitors: number;
  yesterdayViews: number;
  yesterdayUniqueVisitors: number;
}

interface TopPage {
  path: string;
  views: number;
}

interface TimelineItem {
  date: string;
  label: string;
  views: number;
  visitors: number;
}

interface VisitLog {
  timestamp: string;
  path: string;
  visitorId: string;
  device: string;
  browser: string;
  ip: string;
  referrer: string;
}

export const Count: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [deviceStats, setDeviceStats] = useState<{ desktop: number; mobile: number; tablet: number }>({ desktop: 0, mobile: 0, tablet: 0 });
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [logs, setLogs] = useState<VisitLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [resetConfirming, setResetConfirming] = useState<boolean>(false);

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/counter.php?action=stats');
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        setMetrics(data.metrics);
        setDeviceStats(data.deviceStats);
        setTopPages(data.topPages || []);
        setTimeline(data.timeline || []);
        setLogs(data.recentLogs || []);
        setLastRefreshed(new Date());
      } else {
        throw new Error(data.error || 'Failed to parse analytics response');
      }
    } catch (err: any) {
      console.error('Failed to load visitor stats:', err);
      setError(err.message || 'Unable to connect to analytics endpoint');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;
    const timer = setInterval(() => {
      fetchStats();
    }, 10000);
    return () => clearInterval(timer);
  }, [autoRefresh]);

  const handleResetData = async () => {
    try {
      const res = await fetch('/api/counter.php?action=reset&confirm=yes');
      const data = await res.json();
      if (data.success) {
        setResetConfirming(false);
        fetchStats();
      }
    } catch (err) {
      alert('Failed to reset analytics data');
    }
  };

  const filteredLogs = logs.filter(log => 
    log.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.browser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.referrer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const maxTimelineViews = Math.max(...timeline.map(t => t.views), 1);

  return (
    <div className="bg-[#111111] text-[#FAFAF8] min-h-screen font-sans animate-fade-in pb-24 selection:bg-sand selection:text-charcoal">
      <SEO 
        title="SECONDESK Analytics" 
        description="Discreet Visitor Intelligence & Real-time Site Traffic Analytics Dashboard."
      />

      {/* Secret Dashboard Header */}
      <header className="border-b border-[#2D2D2D] bg-[#1A1A1A]/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-xl border border-white/20 shadow-xs">
              <Logo size={28} light={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg tracking-wider text-white">
                  SECON<span className="text-[#E31B23]">DESK</span>
                </span>
                <span className="text-[10px] font-mono bg-sand/20 text-sand border border-sand/30 px-2 py-0.5 rounded uppercase tracking-widest font-bold">
                  Discreet Analytics
                </span>
              </div>
              <p className="text-[11px] text-white/50 font-mono">
                secondesk.ke/count
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-white/60 font-mono border-r border-[#2D2D2D] pr-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Live Updates</span>
            </div>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded border transition-all cursor-pointer flex items-center gap-1.5 ${
                autoRefresh 
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50' 
                  : 'bg-[#2D2D2D] text-white/60 border-transparent'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Auto (10s): {autoRefresh ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="bg-sand hover:bg-white text-charcoal px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 space-y-8">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-950/80 border border-red-800/60 p-4 rounded-xl text-red-200 text-xs flex items-center justify-between font-mono">
            <span>⚠️ {error}</span>
            <button onClick={fetchStats} className="underline hover:text-white">Retry</button>
          </div>
        )}

        {/* 1. TOP METRICS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Views Card */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-xl relative overflow-hidden group hover:border-sand/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">Total Page Views</span>
              <div className="w-10 h-10 rounded-lg bg-sand/10 text-sand flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-light text-4xl text-white tracking-tight">
              {metrics ? metrics.totalViews.toLocaleString() : '---'}
            </div>
            <p className="text-[11px] font-sans text-white/40 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cumulative site traffic hits</span>
            </p>
          </div>

          {/* Total Unique Visitors Card */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-xl relative overflow-hidden group hover:border-sand/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">Unique Visitors</span>
              <div className="w-10 h-10 rounded-lg bg-sand/10 text-sand flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-light text-4xl text-white tracking-tight">
              {metrics ? metrics.totalUniqueVisitors.toLocaleString() : '---'}
            </div>
            <p className="text-[11px] font-sans text-white/40 mt-2">
              Distinct devices & user IDs
            </p>
          </div>

          {/* Today's Page Views */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-xl relative overflow-hidden group hover:border-sand/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">Today's Page Views</span>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-light text-4xl text-emerald-400 tracking-tight">
              {metrics ? metrics.todayViews.toLocaleString() : '---'}
            </div>
            <p className="text-[11px] font-sans text-white/40 mt-2">
              Yesterday: {metrics ? metrics.yesterdayViews.toLocaleString() : 0} views
            </p>
          </div>

          {/* Today's Unique Visitors */}
          <div className="bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-xl relative overflow-hidden group hover:border-sand/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-white/50">Today's Visitors</span>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <div className="font-display font-light text-4xl text-emerald-400 tracking-tight">
              {metrics ? metrics.todayUniqueVisitors.toLocaleString() : '---'}
            </div>
            <p className="text-[11px] font-sans text-white/40 mt-2">
              Yesterday: {metrics ? metrics.yesterdayUniqueVisitors.toLocaleString() : 0} unique
            </p>
          </div>
        </div>

        {/* 2. 14-DAY TRAFFIC TIMELINE & DEVICE BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Daily Traffic Chart */}
          <div className="lg:col-span-8 bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-4">
              <div>
                <h2 className="font-display font-light text-xl text-white tracking-tight">14-Day Traffic Trend</h2>
                <p className="text-xs text-white/50 font-sans">Daily page views vs unique visitor counts</p>
              </div>
              <span className="text-xs font-mono text-sand">Last 14 Days</span>
            </div>

            <div className="h-56 flex items-end justify-between gap-2 pt-6 px-2 border-b border-[#2D2D2D] pb-2">
              {timeline.map((item, idx) => {
                const heightPercent = Math.max((item.views / maxTimelineViews) * 100, 4);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-sand text-[10px] font-mono px-2 py-1 rounded border border-sand/30 absolute -translate-y-10 pointer-events-none shadow-lg z-20 whitespace-nowrap">
                      {item.date}: {item.views} views ({item.visitors} unique)
                    </div>
                    <div 
                      className="w-full bg-sand/80 group-hover:bg-sand rounded-t transition-all" 
                      style={{ height: `${heightPercent}%` }}
                    ></div>
                    <span className="text-[10px] font-mono text-white/40 group-hover:text-white transition-colors truncate w-full text-center">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Device & Browser Distribution */}
          <div className="lg:col-span-4 bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="border-b border-[#2D2D2D] pb-4 mb-6">
                <h2 className="font-display font-light text-xl text-white tracking-tight">Device Breakdown</h2>
                <p className="text-xs text-white/50 font-sans">Visitor hardware profile</p>
              </div>

              {(() => {
                const total = (deviceStats.desktop || 0) + (deviceStats.mobile || 0) + (deviceStats.tablet || 0) || 1;
                const dPct = Math.round(((deviceStats.desktop || 0) / total) * 100);
                const mPct = Math.round(((deviceStats.mobile || 0) / total) * 100);
                const tPct = Math.round(((deviceStats.tablet || 0) / total) * 100);

                return (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-white/80">
                          <Monitor className="w-4 h-4 text-sand" /> Desktop
                        </span>
                        <span className="font-mono text-sand font-bold">{dPct}% ({deviceStats.desktop || 0})</span>
                      </div>
                      <div className="w-full h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
                        <div className="h-full bg-sand rounded-full transition-all" style={{ width: `${dPct}%` }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-white/80">
                          <Smartphone className="w-4 h-4 text-emerald-400" /> Mobile
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">{mPct}% ({deviceStats.mobile || 0})</span>
                      </div>
                      <div className="w-full h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${mPct}%` }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-white/80">
                          <Tablet className="w-4 h-4 text-sky-400" /> Tablet
                        </span>
                        <span className="font-mono text-sky-400 font-bold">{tPct}% ({deviceStats.tablet || 0})</span>
                      </div>
                      <div className="w-full h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full transition-all" style={{ width: `${tPct}%` }}></div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="pt-4 border-t border-[#2D2D2D] text-xs font-mono text-white/40 flex items-center justify-between">
              <span>Last updated: {lastRefreshed.toLocaleTimeString()}</span>
              <Globe className="w-4 h-4 text-sand/60" />
            </div>
          </div>
        </div>

        {/* 3. TOP VISITED PAGES & LIVE LOGS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Top Visited Pages */}
          <div className="lg:col-span-5 bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-4">
              <h2 className="font-display font-light text-xl text-white tracking-tight">Most Visited Pages</h2>
              <span className="text-xs font-mono text-sand">Page Rank</span>
            </div>

            <div className="space-y-3">
              {topPages.length === 0 ? (
                <p className="text-xs font-mono text-white/40 py-6 text-center">No page view data recorded yet.</p>
              ) : (
                topPages.map((item, idx) => {
                  const maxViews = topPages[0]?.views || 1;
                  const pct = Math.round((item.views / maxViews) * 100);
                  return (
                    <div key={idx} className="p-3 border border-[#2D2D2D] bg-[#111111]/50 rounded-lg space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-white truncate max-w-[200px]">
                          {item.path}
                        </span>
                        <span className="font-mono text-sand font-bold">{item.views.toLocaleString()} views</span>
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

          {/* Recent Visitors Log Table */}
          <div className="lg:col-span-7 bg-[#1A1A1A] border border-[#2D2D2D] p-6 rounded-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2D2D2D] pb-4">
              <div>
                <h2 className="font-display font-light text-xl text-white tracking-tight">Real-Time Visit Log</h2>
                <p className="text-xs text-white/50 font-sans">Recent 50 visitor transactions</p>
              </div>

              {/* Search Filter */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Filter logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#111111] border border-[#2D2D2D] focus:border-sand text-xs font-mono px-3 py-1.5 pl-8 rounded text-white placeholder:text-white/30 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#2D2D2D] text-white/40 uppercase tracking-widest text-[10px]">
                    <th className="pb-3 pr-4">Timestamp</th>
                    <th className="pb-3 pr-4">Path</th>
                    <th className="pb-3 pr-4">Device / Browser</th>
                    <th className="pb-3 pr-4">Referrer</th>
                    <th className="pb-3">IP (Anon)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2D2D2D]">
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-white/40 font-mono">
                        No visitor logs match your search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log, i) => (
                      <tr key={i} className="hover:bg-[#2D2D2D]/30 transition-colors">
                        <td className="py-2.5 pr-4 text-white/60 whitespace-nowrap text-[11px]">
                          {log.timestamp.split(' ')[1] || log.timestamp}
                        </td>
                        <td className="py-2.5 pr-4 font-bold text-sand whitespace-nowrap">
                          {log.path}
                        </td>
                        <td className="py-2.5 pr-4 text-white/80 whitespace-nowrap">
                          <span className="capitalize">{log.device}</span> ({log.browser})
                        </td>
                        <td className="py-2.5 pr-4 text-white/50 truncate max-w-[100px]">
                          {log.referrer}
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

        {/* Danger Zone: Reset Counter Data */}
        <div className="pt-8 border-t border-[#2D2D2D] flex items-center justify-between text-xs font-mono">
          <span className="text-white/40">SECONDESK Analytics Counter • Secret Dashboard</span>

          {resetConfirming ? (
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">Reset all analytics data?</span>
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
