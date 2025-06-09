"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AccountLayout from "../layout";
import { register } from "../components/Fetch";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }

    // Puedes agregar validaciones adicionales aquí

    try {
      await register({
        name,
        email,
        password
      });
      alert("Registro exitoso");
    } catch (err) {
      setError(err.message);
    }

    // Limpiar campos
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");

    // Redirigir
    router.push("/sign-in");
  }

  return (
    <AccountLayout>
      <div className="w-screen h-screen flex items-center justify-center px-4 overflow-x-hidden">
        <form
          onSubmit={handleSubmit}
          className={
            error
              ? "bg-[#1e1e2f]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10 scale-90 mt-16"
              : "bg-[#1e1e2f]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10 scale-95 mt-16"
          }
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Sign Up
          </h2>

          {error && (
            <div className="mb-4 text-red-400 font-medium text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="name" className="block text-white/80 text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-white/80 text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50"
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-white/80 text-sm mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Sign Up
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
              Already have an account?{" "}
              <a href="/sign-in" className="text-cyan-400 hover:underline">
                Sign In
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
