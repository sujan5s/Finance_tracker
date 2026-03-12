import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Wallet } from 'lucide-react';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
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
          <p className="text-slate-400 text-sm">Join thousands of people managing their wealth</p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-100 tracking-tight">Create Account</h2>
            <p className="text-slate-400 mt-2">Start your financial journey today</p>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0bda50]/50 focus:border-[#0bda50] transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
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

            <div className="flex items-center gap-3 mt-2">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-[#0bda50] focus:ring-[#0bda50] focus:ring-offset-slate-900"
                required
              />
              <label htmlFor="terms" className="text-xs text-slate-400">
                I agree to the <a href="#" className="text-[#0bda50] hover:underline">Terms of Service</a> and <a href="#" className="text-[#0bda50] hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#0bda50] text-[#102216] font-bold text-lg rounded-xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-[#0bda50]/20 mt-4"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-800/50 pt-6">
            <p className="text-slate-400">Already have an account?</p>
            <Link to="/login" className="text-[#0bda50] font-semibold hover:underline">Login</Link>
          </div>
        </div>

        <footer className="mt-8 text-center text-slate-500 text-xs">
          © 2024 Finance Tracker Inc. Secure 256-bit SSL encrypted connection.
        </footer>
      </div>
    </div>
  );
}

export default Signup;