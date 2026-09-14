"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@kc.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === "admin@kc.com" && password === "admin123") {
      setIsLoading(true);
      localStorage.setItem("kc_admin", "true");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 400);
    } else {
      setError("Invalid credentials. Use admin@kc.com / admin123 to log in.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#F8F9FA]">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#1B3A6B] text-white flex items-center justify-center mx-auto shadow-md">
            <Building2 className="w-7 h-7 text-[#F5A623]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1B3A6B] font-serif">
            KC Export Admin
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Sign in to manage global leads, RFQ dossiers, and export catalogs
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/90 shadow-card space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
                  placeholder="admin@kc.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-[#1B3A6B]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Hint for tester */}
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-snug">
              <span className="font-bold block">Demo Credentials:</span>
              Email: <code>admin@kc.com</code> &bull; Password: <code>admin123</code>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1B3A6B] hover:bg-[#12284b] text-white font-bold text-sm shadow-md transition disabled:opacity-70"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-[#F5A623]" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to public site */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-[#1B3A6B] transition"
          >
            &larr; Return to KC Import & Export Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
