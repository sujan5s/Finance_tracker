import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Wallet } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4 font-sans text-slate-100 antialiased bg-[#102216]">
      {/* Background gradients from Stitch */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#102216] via-[#142e1d] to-[#102216]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#0bda50]/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#0bda50]/5 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[480px]">
        {/* Header Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 text-[#0bda50] bg-[#0bda50]/10 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100">Finance Tracker</h1>
          </div>
          <p className="text-slate-400 text-sm">Welcome back, please sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-100 tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 mt-2">Sign in to continue to Finance Tracker</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0bda50]/50 focus:border-[#0bda50] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-sm font-medium text-[#0bda50] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0bda50]/50 focus:border-[#0bda50] transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#0bda50] text-[#102216] font-bold text-lg rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-[#0bda50]/20 mt-4"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-800/50 pt-6">
            <p className="text-slate-400">Don't have an account?</p>
            <Link to="/signup" className="text-[#0bda50] font-semibold hover:underline">Create Account</Link>
          </div>
        </div>

        <footer className="mt-8 text-center text-slate-500 text-xs">
          © 2026 Finance Tracker Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Login;