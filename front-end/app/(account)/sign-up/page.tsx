import React from 'react'
import AccountLayout from '../layout'
//import {register} from '../../components/Fetch'
export default function SignUp() {
  return (
    <AccountLayout>
      <div className="w-screen h-screen flex items-center justify-center px-4 overflow-hidden">
        <form
          className="bg-[#1e1e2f]/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10 sca"
          action=""
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>

          <div className="mb-4">
            <label className="block text-white/80 text-sm mb-1" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white/80 text-sm mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white/80 text-sm mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white/80 text-sm mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              className="w-full p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Sign Up
          </button>

          <div className="mt-6 text-sm text-center text-white/70 space-y-2">
            <p>
              Already have an account?{' '}
              <a href="/sign-in" className="text-cyan-400 hover:underline transition-ease transition-all transition-300">
                Sign In
              </a>
            </p>
            <p>
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>{' '}
              &nbsp;|&nbsp;{' '}
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </form>
      </div>
    </AccountLayout>
  )
}
