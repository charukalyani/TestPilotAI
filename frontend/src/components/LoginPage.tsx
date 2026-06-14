import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Chrome } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

interface LoginPageProps {
  onSignup: () => void;
}

const LoginPage = ({ onSignup }: LoginPageProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      login(formData.email);
      navigate(from, { replace: true });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />
      </div>

      <div
        className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl border border-slate-100 mb-6 group hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
          <p className="text-slate-500 mt-2">Login to manage your test suites</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="email"
                  placeholder="alex@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                <button type="button" className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-4 bg-brand-600 text-white font-bold rounded-2xl shadow-lg shadow-brand-100 hover:bg-brand-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Login
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400 font-bold tracking-widest">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              <Chrome className="w-5 h-5 text-brand-600" />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            Don't have an account?{" "}
            <button
              onClick={onSignup}
              className="text-brand-600 font-bold hover:text-brand-700 transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>

        <p className="text-center text-slate-400 text-[10px] mt-8 uppercase tracking-widest font-bold">
          Secure access powered by TestPilot AI Security.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
