import React, { useState } from "react";
import {
  Key,
  Eye,
  EyeOff,
  Github,
  Slack,
  Copy,
  Check,
  RefreshCw,
  Shield,
  Globe,
  Smartphone,
  ExternalLink,
  CreditCard,
  Zap,
  BarChart,
  Code,
  BookOpen,
  ChevronRight,
  AlertCircle
} from "lucide-react";

type TabType = "security" | "billing" | "api" | "integrations";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("api");
  const [apiKey, setApiKey] = useState("sk_test_51Mz...9283");
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateKey = () => {
    const newKey = `sk_test_${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(newKey);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "api":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* API Keys */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <Key className="w-4 h-4 text-brand-600" /> API Keys
                </h2>
                <button
                  onClick={handleGenerateKey}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Generate New Key
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-500">Use this key to authenticate with the TestPilot AI API and CLI.</p>
                <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <code className="flex-1 text-xs font-mono text-slate-600 truncate">
                    {isKeyVisible ? apiKey : "••••••••••••••••••••••••••••••••"}
                  </code>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsKeyVisible(!isKeyVisible)}
                      className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {isKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleCopyKey}
                      className="p-2 text-slate-400 hover:text-brand-600 transition-colors relative"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Documentation & SDKs */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <Code className="w-4 h-4 text-brand-600" /> Developer Resources
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="#" className="p-4 border border-slate-100 rounded-2xl hover:border-brand-200 hover:bg-brand-50/30 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-brand-100 transition-colors">
                      <BookOpen className="w-4 h-4 text-slate-600 group-hover:text-brand-600" />
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-brand-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">API Reference</h3>
                  <p className="text-xs text-slate-500 mt-1">Detailed endpoint documentation and examples.</p>
                </a>

                <a href="#" className="p-4 border border-slate-100 rounded-2xl hover:border-brand-200 hover:bg-brand-50/30 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-brand-100 transition-colors">
                      <Smartphone className="w-4 h-4 text-slate-600 group-hover:text-brand-600" />
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-brand-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">SDK Libraries</h3>
                  <p className="text-xs text-slate-500 mt-1">Official libraries for Node.js, Python, and Go.</p>
                </a>
              </div>
            </section>
          </div>
        );
      case "billing":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Current Plan */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-brand-600" /> Subscription Plan
                </h2>
                <span className="px-3 py-1 bg-brand-50 text-brand-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Current Plan</span>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-slate-900">Pro Plan</h3>
                    <p className="text-sm text-slate-500">Advanced features for growing teams.</p>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-3xl font-bold text-slate-900">$49</span>
                      <span className="text-slate-400 text-sm font-medium">/ month</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button className="px-6 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-100">
                      Upgrade Plan
                    </button>
                    <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all">
                      Manage Billing
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Usage Statistics */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-brand-600" /> Usage Limits
                </h2>
              </div>
              <div className="p-6 space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-700">Tests Executed</span>
                    <span className="text-slate-500 font-medium">850 / 1,000</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-600 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Resets in 12 days</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-700">API Requests</span>
                    <span className="text-slate-500 font-medium">12.4k / 50k</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '24.8%' }} />
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-amber-900">Approaching Limit</h4>
                    <p className="text-xs text-amber-700 mt-0.5">You've used 85% of your monthly test quota. Consider upgrading to avoid service interruption.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      case "integrations":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-brand-600" /> Integrations
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                      <Github className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">GitHub</h3>
                      <p className="text-xs text-slate-500">Sync repositories and PR tests.</p>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all">
                    Connect
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#4A154B] rounded-xl flex items-center justify-center">
                      <Slack className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Slack</h3>
                      <p className="text-xs text-slate-500">Get instant alerts in your channels.</p>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-50 transition-all">
                    Connect
                  </button>
                </div>
              </div>
            </section>
          </div>
        );
      case "security":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-600" /> Security Settings
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-slate-900 text-sm">Two-Factor Authentication</h3>
                    <p className="text-xs text-slate-500">Add an extra layer of security to your account.</p>
                  </div>
                  <button className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all">
                    Enable
                  </button>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">Chrome on macOS</p>
                          <p className="text-[10px] text-slate-500">San Francisco, USA • Active now</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Current</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account, billing, and developer configurations.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <TabButton
            active={activeTab === "api"}
            onClick={() => setActiveTab("api")}
            icon={Smartphone}
            label="API & SDKs"
          />
          <TabButton
            active={activeTab === "billing"}
            onClick={() => setActiveTab("billing")}
            icon={CreditCard}
            label="Billing"
          />
          <TabButton
            active={activeTab === "integrations"}
            onClick={() => setActiveTab("integrations")}
            icon={Globe}
            label="Integrations"
          />
          <TabButton
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
            icon={Shield}
            label="Security"
          />
        </div>

        {/* Main Settings Content */}
        <div className="flex-1 max-w-3xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

const TabButton = ({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-between group transition-all ${active
        ? "bg-brand-50 text-brand-600"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
  >
    <div className="flex items-center gap-3">
      <Icon className={`w-4 h-4 ${active ? "text-brand-600" : "text-slate-400 group-hover:text-slate-600"}`} />
      {label}
    </div>
    {active && <ChevronRight className="w-3.5 h-3.5" />}
  </button>
);
