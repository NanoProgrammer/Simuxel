'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Account() {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#0f0f1a] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">My Account</h1>
        <p className="text-white/70 mb-10">
          Welcome to Simuxel. Here you can manage your projects and account settings.
        </p>

        {/* User Info */}
        <section className="bg-[#1e1e2f]/80 p-6 rounded-xl shadow-lg border border-white/10 mb-8">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/60">Name</p>
              <p className="font-medium">Juan Pérez</p>
            </div>
            <div>
              <p className="text-white/60">Email</p>
              <p className="font-medium">juan@example.com</p>
            </div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1e1e2f]/80 p-4 rounded-xl border border-white/10 hover:border-cyan-500 transition">
              <h3 className="text-lg font-semibold">North Tower – Bogotá</h3>
              <p className="text-sm text-white/60">Last simulation: 3 days ago</p>
              <Link href="/projects/north-tower" className="text-cyan-400 text-sm mt-2 inline-block hover:underline">
                View project
              </Link>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg text-center"
          >
            Edit Settings
          </button>
          <Link href="/projects/new" className="bg-white text-black hover:bg-gray-200 py-2 px-4 rounded-lg text-center">
            New Project
          </Link>
        </div>
      </div>

      {/* Settings Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#1e1e2f] border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Account Settings</h3>

            <form className="space-y-4">
              <div>
                <label className="text-white/70 text-sm">Name</label>
                <input
                  type="text"
                  defaultValue="Juan Pérez"
                  className="w-full mt-1 p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm">Email</label>
                <input
                  type="email"
                  defaultValue="juan@example.com"
                  className="w-full mt-1 p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full mt-1 p-3 rounded-lg bg-[#2a2a3d] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
