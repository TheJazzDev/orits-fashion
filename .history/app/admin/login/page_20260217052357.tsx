"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isSetup, setIsSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Admin account created! Please sign in.");
        setIsSetup(false);
      } else {
        const data = await res.json();
        toast.error(data.error || "Setup failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 px-4">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="font-heading text-3xl md:text-4xl text-white mb-2">
            Orit&apos;s Fashion
          </h1>
          <div className="w-12 h-1px bg-gold-500 mx-auto mb-3 md:mb-4" />
          <p className="text-stone-400 text-sm">
            {isSetup ? "Create your admin account" : "Admin Panel"}
          </p>
        </div>

        <div className="bg-white p-6 md:p-8">
          {isSetup ? (
            <form onSubmit={handleSetup} className="space-y-4 md:space-y-5">
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-500 mb-1.5 md:mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                  placeholder="Admin Name"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-500 mb-1.5 md:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                  placeholder="admin@oritsfashion.com"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-500 mb-1.5 md:mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                  placeholder="Min. 8 characters"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gold-500 text-white text-sm tracking-[0.15em] uppercase font-medium disabled:opacity-50 active:bg-gold-600 transition-colors"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
              <button
                type="button"
                onClick={() => setIsSetup(false)}
                className="w-full text-center text-sm text-stone-400 active:text-stone-600 transition-colors py-1"
              >
                Already have an account? Sign in
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-500 mb-1.5 md:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                  placeholder="admin@oritsfashion.com"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-stone-500 mb-1.5 md:mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-stone-200 text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                  placeholder="Your password"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-stone-900 text-white text-sm tracking-[0.15em] uppercase font-medium disabled:opacity-50 active:bg-stone-700 transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <button
                type="button"
                onClick={() => setIsSetup(true)}
                className="w-full text-center text-sm text-stone-400 active:text-stone-600 transition-colors py-1"
              >
                First time? Create admin account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
