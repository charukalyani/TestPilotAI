import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useNavigate } from "react-router-dom";

const AppContent = () => {
  const navigate = useNavigate();

  const goToSignup = () => navigate("/signup");
  const goToLogin = () => navigate("/login");

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <div key="landing">
            <LandingPage onStartTesting={goToSignup} onLogin={goToLogin} />
            {/* Floating Toggle for Demo */}
            <div className="fixed bottom-8 right-8 z-[100]">
              <button 
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-slate-900 text-white font-bold rounded-full shadow-2xl hover:bg-brand-600 transition-all flex items-center gap-2 group active:scale-95"
              >
                View Dashboard Demo
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </button>
            </div>
          </div>
        } 
      />
      <Route path="/signup" element={<SignupPage onLogin={goToLogin} />} />
      <Route path="/login" element={<LoginPage onSignup={goToSignup} />} />
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="relative overflow-x-hidden min-h-screen bg-white">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}
