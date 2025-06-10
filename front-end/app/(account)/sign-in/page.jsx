"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountLayout from "../layout";
import { login } from '../components/Fetch';

export default function SignIn() {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    // Validación manual del formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
    await fetch("https://simuxel.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      
    });
  } catch (err) {
  
    setError(err.message);
    return;
  }

  router.push("/user");
    setEmail("");
    setPassword("");
  }

  return (
    <AccountLayout>
      <div className="w-screen h-screen flex items-center justify-center px-4 overflow-hidden">
        <form
          onSubmit={handleSubmit}
          noValidate
          className={
            error
              ? "bg-[#1e1e2f]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10 transition-transform"
              : "bg-[#1e1e2f]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10  transition-transform"
          }
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <div className="mb-4 text-red-400 font-medium text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-white/80 text-sm mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white/80 text-sm mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Sign In
          </button>
          <a href="https://simuxel.onrender.com/auth/google/">
            <div className="mt-4">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-white/20 text-white py-3 rounded-lg hover:bg-white/10 transition-colors duration-300"
              >
                <img src="/google.png" alt="Google G" className="w-5 h-5" />
                <span>Sign in with Google</span>
              </button>
            </div>
          </a>
          <div className="mt-6 text-sm text-center text-white/70 space-y-2">
            <p>
              Don’t have an account?{" "}
              <a href="/sign-up" className="text-cyan-400 hover:underline">
                Sign Up
              </a>
            </p>
            <p>
              <a href="/forgot-password" className="hover:underline">
                Forgot Password?
              </a>
            </p>
            <p>
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>{" "}
              |{" "}
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
}
