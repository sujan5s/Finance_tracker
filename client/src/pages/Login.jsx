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
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1611] flex flex-col items-center justify-center p-4 text-white">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-[#00d05e] p-1.5 rounded-lg">
          <Wallet className="w-6 h-6 text-black" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Finance Tracker</h1>
      </div>
      <p className="text-gray-400 text-sm mb-8">Welcome back, please sign in to your account</p>

      <div className="bg-[#131b17] p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-800/50 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-1 w-full text-left">Welcome Back</h2>
        <p className="text-gray-400 text-sm mb-6 w-full text-left">Sign in to continue to Finance Tracker</p>

        <form onSubmit={handleLogin} className="space-y-5 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                className="block w-full pl-10 pr-3 py-3 border border-gray-800 rounded-xl leading-5 bg-[#1a231e] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00d05e] focus:border-[#00d05e] sm:text-sm transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <a href="#" className="text-sm font-medium text-[#00d05e] hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="block w-full pl-10 pr-10 py-3 border border-gray-800 rounded-xl leading-5 bg-[#1a231e] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00d05e] focus:border-[#00d05e] sm:text-sm transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_15px_rgba(0,208,94,0.3)] text-sm font-semibold text-black bg-[#00d05e] hover:bg-[#00e668] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00d05e] focus:ring-offset-[#131b17] transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-[#00d05e] hover:underline">
            Create Account
          </Link>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-gray-600">
        © 2024 Finance Tracker Inc. Secure 256-bit SSL encrypted connection.
      </p>
    </div>
  );
}

export default Login;