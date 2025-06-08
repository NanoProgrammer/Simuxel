import React from 'react'
import AccountLayout from '../layout'

export default function RecoverPassword() {
  return (
    <AccountLayout>
      <div className="w-screen h-screen flex items-center justify-center px-4">
        <form
          className="bg-[#1e1e2f]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10"
          action=""
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Recover Password</h2>

          <p className="text-white/60 text-sm mb-6 text-center">
            Enter your email address and we’ll send you a link to reset your password.
          </p>

          <div className="mb-6">
            <label className="block text-white/80 text-sm mb-1" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Send Recovery Link
          </button>

          <div className="mt-6 text-sm text-center text-white/70 space-y-2">
            <p>
              Already have an account?{' '}
              <a href="/sign-in" className="text-cyan-400 hover:underline">
                Sign In
              </a>
            </p>
            <p>
              <a href="/sign-up" className="hover:underline">
                Create New Account
              </a>
            </p>
          </div>
        </form>
      </div>
    </AccountLayout>
  )
}
