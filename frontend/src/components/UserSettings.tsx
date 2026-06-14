import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  Check,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  Zap
} from "lucide-react";

export default function UserSettings() {
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex.rivera@testpilot.ai");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [showPasswords, setShowPasswords] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate password change
    alert("Password change simulated!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Settings</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage your personal profile and account security.</p>
        </div>
        {showSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 animate-in slide-in-from-top-2">
            <Check className="w-4 h-4" />
            <span className="text-sm font-bold">Changes saved successfully</span>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 text-3xl font-bold border-4 border-white shadow-md">
                AR
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-slate-200 text-slate-600 hover:text-brand-600 transition-all active:scale-90">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{name}</h2>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Senior SDET</p>
            </div>
            <div className="pt-4 border-t border-slate-50">
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Verified Account
              </div>
            </div>
          </div>

          <div className="bg-brand-600 rounded-3xl p-6 text-white shadow-lg shadow-brand-100 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="font-bold mb-2">Pro Member</h3>
              <p className="text-xs text-brand-100 leading-relaxed">You have access to all premium AI testing features and priority support.</p>
            </div>
            <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="md:col-span-2 space-y-8">
          {/* Profile Info Section */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/30">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-brand-600" /> Profile Information
              </h3>
            </div>
            <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>

          {/* Password Section */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-600" /> Change Password
              </h3>
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors"
              >
                {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showPasswords ? "Hide Passwords" : "Show Passwords"}
              </button>
            </div>
            <form onSubmit={handlePasswordChange} className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                    value={passwords.current}
                    onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                      value={passwords.new}
                      onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm New Password</label>
                    <input
                      type={showPasswords ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                      value={passwords.confirm}
                      onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                </p>
              </div>

              <div className="flex items-center justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                >
                  Update Password
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
