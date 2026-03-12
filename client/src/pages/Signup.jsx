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
    <div className="min-h-screen bg-[#0d1611] flex flex-col items-center justify-center p-4 text-white">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-[#00d05e] p-1.5 rounded-lg">
          <Wallet className="w-6 h-6 text-black" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Finance Tracker</h1>
      </div>
      <p className="text-gray-400 text-sm mb-8">Join thousands of people managing their wealth</p>

      <div className="bg-[#131b17] p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-800/50 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-1 w-full text-left">Create Account</h2>
        <p className="text-gray-400 text-sm mb-6 w-full text-left">Start your financial journey today</p>

        <form onSubmit={handleSignup} className="space-y-5 w-full">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="John Doe"
                className="block w-full pl-10 pr-3 py-3 border border-gray-800 rounded-xl leading-5 bg-[#1a231e] text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#00d05e] focus:border-[#00d05e] sm:text-sm transition-colors"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
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

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-800 bg-[#1a231e] text-[#00d05e] focus:ring-[#00d05e] focus:ring-offset-[#131b17] checked:bg-[#00d05e] checked:border-[#00d05e]"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
              I agree to the <a href="#" className="text-[#00d05e] hover:underline">Terms of Service</a> and <a href="#" className="text-[#00d05e] hover:underline">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-[0_0_15px_rgba(0,208,94,0.3)] text-sm font-semibold text-black bg-[#00d05e] hover:bg-[#00e668] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00d05e] focus:ring-offset-[#131b17] transition-all"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#00d05e] hover:underline">
            Login
          </Link>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-gray-600">
        © 2024 Finance Tracker Inc. Secure 256-bit SSL encrypted connection.
      </p>
    </div>
  );
}

export default Signup;