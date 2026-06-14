import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Cpu,
  Layers,
  Terminal,
  BarChart3,
  Settings,
  Search,
  Bell,
  Plus,
  Play,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  Zap,
  HelpCircle,
  LogOut,
  User,
  Activity,
  Shield,
  Globe
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import TestGenerator from "./TestGenerator";
import APITesting from "./APITesting";
import UIAutomation from "./UIAutomation";
import Reports from "./Reports";
import SettingsPage from "./SettingsPage";
import SupportPage from "./SupportPage";
import UserSettings from "./UserSettings";

// --- Mock Data ---

const performanceData = [
  { name: 'Mon', passed: 400, failed: 24 },
  { name: 'Tue', passed: 300, failed: 13 },
  { name: 'Wed', passed: 500, failed: 98 },
  { name: 'Thu', passed: 278, failed: 39 },
  { name: 'Fri', passed: 189, failed: 48 },
  { name: 'Sat', passed: 239, failed: 38 },
  { name: 'Sun', passed: 349, failed: 43 },
];

const recentActivity = [
  { id: 1, name: "Checkout Flow Regression", status: "passed", time: "2 mins ago", duration: "45s", type: "UI", severity: "High" },
  { id: 2, name: "Auth API Endpoint Scan", status: "failed", time: "15 mins ago", duration: "12s", type: "API", severity: "Critical" },
  { id: 3, name: "User Profile Update", status: "passed", time: "1 hour ago", duration: "32s", type: "UI", severity: "Medium" },
  { id: 4, name: "Payment Gateway Integration", status: "warning", time: "3 hours ago", duration: "1m 5s", type: "Security", severity: "High" },
  { id: 5, name: "Search Indexing Test", status: "passed", time: "5 hours ago", duration: "28s", type: "API", severity: "Low" },
];

// --- Components ---

const Badge = ({ children, variant = "neutral" }: { children: React.ReactNode; variant?: "neutral" | "brand" | "success" | "error" | "warning" | "info" }) => {
  const variants = {
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    brand: "bg-brand-50 text-brand-600 border-brand-100",
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    error: "bg-rose-50 text-rose-600 border-rose-100",
    warning: "bg-amber-50 text-amber-600 border-amber-100",
    info: "bg-blue-50 text-blue-600 border-blue-100",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${variants[variant]}`}>
      {children}
    </span>
  );
};

const SeverityTag = ({ severity }: { severity: string }) => {
  const colors: Record<string, string> = {
    Critical: "bg-rose-600 text-white border-rose-700",
    High: "bg-rose-50 text-rose-600 border-rose-100",
    Medium: "bg-amber-50 text-amber-600 border-amber-100",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${colors[severity] || colors.Low}`}>
      {severity}
    </span>
  );
};

const Skeleton = ({ className, style }: { className?: string; style?: React.CSSProperties; key?: any }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} style={style} />
);

const AnimatedNumber = ({ value }: { value: string }) => {
  return <span>{value}</span>;
};

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all relative group ${active
        ? "text-brand-600 bg-brand-50/50"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
  >
    {active && (
      <div
        className="absolute left-0 w-1 h-6 bg-brand-600 rounded-r-full"
      />
    )}
    <Icon className={`w-5 h-5 transition-colors ${active ? "text-brand-600" : "group-hover:text-brand-600"}`} />
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

const StatCard = ({ label, value, icon: Icon, color, trend, loading }: any) => (
  <div
    className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
  >
    {loading ? (
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="w-12 h-4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-24 h-3" />
          <Skeleton className="w-16 h-6" />
        </div>
      </div>
    ) : (
      <>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <span className={`text-xs font-bold ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </div>
        <div className="text-sm font-medium text-slate-500 mb-1">{label}</div>
        <div className="text-2xl font-bold text-slate-900">
          <AnimatedNumber value={value} />
        </div>
      </>
    )}
  </div>
);

const Sidebar = ({ activeTab, setActiveTab, onLogout }: any) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generator', label: 'Test Generator', icon: Cpu },
    { id: 'api', label: 'API Testing', icon: Layers },
    { id: 'automation', label: 'UI Automation', icon: Terminal },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 border-r border-slate-200 bg-white flex flex-col h-full overflow-y-auto shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] scroll-smooth z-20">
      <div className="p-6 flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">TestPilot<span className="text-brand-600">AI</span></span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            {...item}
            active={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-1">
        <SidebarItem
          id="support"
          icon={HelpCircle}
          label="Support"
          active={activeTab === 'support'}
          onClick={() => setActiveTab('support')}
        />
        <SidebarItem icon={LogOut} label="Log out" onClick={onLogout} />
      </div>
    </aside>
  );
};

const LogoutModal = ({ isOpen, onClose, onConfirm }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      />
      <div
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">
            <LogOut className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Confirm Logout</h3>
            <p className="text-slate-500 text-sm">Are you sure you want to log out? You'll need to sign in again to access your dashboard.</p>
          </div>
          <div className="flex items-center gap-3 w-full pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationDropdown = ({ isOpen, onClose, notifications, onMarkAllRead }: any) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        style={{ top: '100%' }}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
          <button
            onClick={onMarkAllRead}
            className="text-[10px] font-bold text-brand-600 hover:text-brand-700 uppercase tracking-wider"
          >
            Mark all as read
          </button>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {notifications.map((n: any) => (
                <div
                  key={n.id}
                  className={`p-4 flex gap-3 hover:bg-slate-50 transition-colors cursor-pointer relative group ${n.unread ? 'bg-brand-50/30' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.bg}`}>
                    <n.icon className={`w-5 h-5 ${n.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-snug ${n.unread ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                      {n.message}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {n.time}
                    </p>
                  </div>
                  {n.unread && (
                    <div className="w-1.5 h-1.5 bg-brand-600 rounded-full mt-1.5 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center px-6">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-sm font-bold text-slate-900">All caught up!</p>
              <p className="text-xs text-slate-500 mt-1">No new notifications at the moment.</p>
            </div>
          )}
        </div>
        <div className="p-3 border-t border-slate-100 text-center">
          <button className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            View all activity
          </button>
        </div>
      </div>
    </>
  );
};

const UserDropdown = ({ isOpen, onClose, onNavigate }: any) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200" style={{ top: '100%' }}>
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="text-sm font-bold text-slate-900 leading-none">Alex Rivera</div>
          <div className="text-[10px] text-slate-500 font-medium mt-1.5 uppercase tracking-wider">Senior SDET</div>
        </div>
        <div className="p-2">
          <button
            onClick={() => {
              onNavigate('user-settings');
              onClose();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-brand-100 flex items-center justify-center transition-colors">
              <User className="w-4 h-4" />
            </div>
            View Profile
          </button>
        </div>
      </div>
    </>
  );
};

const TopNav = ({ onNavigate }: { onNavigate: (tab: string) => void }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Checkout Flow Regression test failed on Production",
      time: "2 mins ago",
      icon: XCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
      unread: true
    },
    {
      id: 2,
      message: "API response error detected in Auth service",
      time: "15 mins ago",
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      unread: true
    },
    {
      id: 3,
      message: "Weekly performance report is now ready",
      time: "1 hour ago",
      icon: BarChart3,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      unread: false
    },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tests, reports, or docs..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={`p-2 rounded-xl relative transition-all ${isNotificationsOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            )}
          </button>
          <NotificationDropdown
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
          />
        </div>

        <div className="h-8 w-px bg-slate-200 mx-2" />
        <div className="relative">
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className={`flex items-center gap-3 pl-2 p-1.5 rounded-2xl transition-all ${isUserDropdownOpen ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
          >
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-slate-900 leading-none">Alex Rivera</div>
              <div className="text-[10px] text-slate-500 font-medium mt-1">Senior SDET</div>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-700 font-bold shadow-sm">
                AR
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                <ChevronDown className={`w-2.5 h-2.5 text-slate-400 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </button>
          <UserDropdown
            isOpen={isUserDropdownOpen}
            onClose={() => setIsUserDropdownOpen(false)}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </header>
  );
};

const LiveLogsPanel = ({ isOpen, onClose }: any) => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      return;
    }

    const initialLogs = [
      "[08:15:36] Initializing TestPilot AI kernel...",
      "[08:15:37] Connecting to distributed runner cluster...",
      "[08:15:38] Authentication successful. Session: session_92834",
      "[08:15:39] Ready for test execution."
    ];
    setLogs(initialLogs);

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString([], { hour12: false });
      const actions = [
        "GET /api/v1/health - 200 OK (12ms)",
        "POST /api/v1/auth/login - 200 OK (45ms)",
        "UI Runner: Navigating to https://app.testpilot.ai/dashboard",
        "UI Runner: Clicking element #login-button",
        "Security Scan: Checking for XSS vulnerabilities in query params...",
        "Worker: Heartbeat received from node-asia-1",
        "Database: Query optimized for test_results table",
        "System: Memory usage at 42% - Stable"
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setLogs(prev => [...prev, `[${timestamp}] ${randomAction}`].slice(-50));
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <>
      {isOpen && (
        <>
          <div
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] animate-in fade-in duration-300"
          />
          <div
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-slate-900 shadow-2xl z-[70] flex flex-col border-l border-slate-800 animate-in slide-in-from-right duration-300"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-mono text-emerald-500 font-bold uppercase tracking-widest text-sm">Live System Logs</h3>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div
              ref={scrollRef}
              className="flex-1 p-6 font-mono text-xs overflow-y-auto space-y-1.5 scroll-smooth"
            >
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-slate-600 shrink-0">{i + 1}</span>
                  <span className={log.includes('failed') || log.includes('error') ? 'text-rose-400' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
              <div className="flex gap-3 items-center text-emerald-500/50">
                <span className="text-slate-600 shrink-0">{logs.length + 1}</span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status: <span className="text-emerald-500">Connected</span></div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Node: <span className="text-brand-400">asia-southeast-1</span></div>
              </div>
              <button className="text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors">Clear Console</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const NewTestModal = ({ isOpen, onClose }: any) => {
  const [formData, setFormData] = useState({ name: '', url: '', type: 'UI' });
  const [isRunning, setIsRunning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      onClose();
    }, 2000);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
          />
          <div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 overflow-hidden animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-none">New Test Suite</h3>
                  <p className="text-slate-500 text-xs mt-1">Configure your AI testing parameters</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Test Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Checkout Flow Regression"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">URL or API Endpoint</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="url"
                    placeholder="https://api.example.com/v1"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                    value={formData.url}
                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Test Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['UI', 'API', 'Security'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`py-3 rounded-xl text-xs font-bold border transition-all ${formData.type === type
                          ? 'bg-brand-50 border-brand-200 text-brand-600 shadow-sm'
                          : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  disabled={isRunning}
                  type="submit"
                  className="w-full py-4 bg-brand-600 text-white font-bold rounded-2xl shadow-lg shadow-brand-100 hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isRunning ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" />
                      Initializing Runner...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-white" />
                      Run Test Suite
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const DashboardContent = () => {
  const [loading, setLoading] = useState(true);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isNewTestOpen, setIsNewTestOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, Alex</h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Live</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm">Here's what's happening with your test suites today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLogsOpen(true)}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95"
          >
            <Activity className="w-4 h-4" />
            Live Logs
          </button>
          <button
            onClick={() => setIsNewTestOpen(true)}
            className="px-4 py-2 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-100 flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            New Test
          </button>
        </div>
      </div>

      <LiveLogsPanel isOpen={isLogsOpen} onClose={() => setIsLogsOpen(false)} />
      <NewTestModal isOpen={isNewTestOpen} onClose={() => setIsNewTestOpen(false)} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Tests Run" value="12,402" icon={Play} color="bg-slate-100 text-slate-600" trend={12} loading={loading} />
        <StatCard label="Passed" value="11,984" icon={CheckCircle2} color="bg-emerald-50 text-emerald-600" trend={8} loading={loading} />
        <StatCard label="Failed" value="418" icon={XCircle} color="bg-rose-50 text-rose-600" trend={-2} loading={loading} />
        <StatCard label="Avg Response Time" value="1.2s" icon={Clock} color="bg-amber-50 text-amber-600" trend={5} loading={loading} />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Chart */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Performance Over Time</h3>
            <select className="text-xs font-bold text-slate-500 bg-slate-50 border-none rounded-lg px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            {loading ? (
              <div className="w-full h-full flex flex-col gap-4">
                <div className="flex-1 flex items-end gap-2">
                  {[...Array(7)].map((_, i) => (
                    <Skeleton key={i} className="flex-1" style={{ height: `${Math.random() * 60 + 20}%` }} />
                  ))}
                </div>
                <div className="flex justify-between">
                  {[...Array(7)].map((_, i) => (
                    <Skeleton key={i} className="w-8 h-3" />
                  ))}
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorPassed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="passed"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorPassed)"
                    animationDuration={2000}
                    animationBegin={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Recent Activity</h3>
          <button className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">View All Activity</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Test Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentActivity.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-slate-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={item.type === "UI" ? "brand" : item.type === "API" ? "info" : "error"}>
                      {item.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <SeverityTag severity={item.severity} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.status === "passed" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : item.status === "failed" ? (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                      )}
                      <span className={`text-xs font-bold capitalize ${item.status === "passed" ? 'text-emerald-600' :
                          item.status === "failed" ? 'text-rose-600' :
                            'text-amber-600'
                        }`}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-medium text-slate-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {item.time}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard Layout ---

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-slate-50/50">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={() => setShowLogoutModal(true)}
        />
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
          <TopNav onNavigate={setActiveTab} />
          <main className="flex-1 overflow-y-auto scroll-smooth">
            {activeTab === 'dashboard' ? (
              <DashboardContent />
            ) : activeTab === 'generator' ? (
              <TestGenerator />
            ) : activeTab === 'api' ? (
              <APITesting />
            ) : activeTab === 'automation' ? (
              <UIAutomation />
            ) : activeTab === 'reports' ? (
              <Reports />
            ) : activeTab === 'settings' ? (
              <SettingsPage />
            ) : activeTab === 'user-settings' ? (
              <UserSettings />
            ) : activeTab === 'support' ? (
              <SupportPage />
            ) : (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center p-8">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                  <Settings className="w-8 h-8 text-slate-400 animate-spin-slow" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 capitalize">{activeTab.replace('-', ' ')} Page</h2>
                <p className="text-slate-500 max-w-xs mt-2">This section is currently under development. Check back soon for AI-powered updates.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
