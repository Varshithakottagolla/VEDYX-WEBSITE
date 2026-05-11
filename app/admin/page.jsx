"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";

const ADMIN_PASSWORD = "vedyx@admin2024";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("vedyx_admin_auth", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #a855f7 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 mb-4 shadow-[0_0_40px_rgba(168,85,247,0.4)]">
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Vedyx Content Management</p>
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock size={16} />
                </div>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3.5 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 shadow-[0_4px_20px_rgba(168,85,247,0.3)]"
            >
              {loading ? "Verifying..." : "Access Dashboard →"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-6">
            This portal is for authorized Vedyx staff only.
          </p>
        </div>
      </div>
    </div>
  );
}
