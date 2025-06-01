"use client";

import { motion } from "framer-motion";
import AmericaSvg from './America'
import EuropeSVG from './Europe'
import Link from "next/link";

export default function RealtimeWeather() {
  return (
    <section className="w-full min-h-screen text-white py-16 px-6 flex flex-col items-center justify-center gap-20 mt-16">

      {/* Section 1: Real-time Climate Simulation */}
      <div className="w-full max-w-6xl" id="simulate">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Real-Time Climate Simulation
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">
            Analyze how your building performs with real-time climate data. Get insights on energy use, comfort, and long-term maintenance based on current weather patterns.
          </p>
          <p className="text-md text-gray-400 ">
            Simuxel connects with NOAA and Open-Meteo to provide accurate, live weather inputs. Combine that with construction data and simulate how your project behaves today — and what to expect in 5, 10, or 20 years.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-24"
        >
          {/* Map */}
          <div className="relative h-[400px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl flex flex-row items-center justify-center">
            <AmericaSvg />
            <EuropeSVG />
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded text-sm text-gray-300">
              🌎 Real-time data powered by NOAA & Open-Meteo
            </div>
          </div>

          {/* Info block */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold text-white mb-4">🔍 Why Real-Time Matters</h2>
            <p className="text-gray-400 mb-4">
              Weather variability affects buildings daily. By pulling live data, you gain accurate insight into immediate energy demands, thermal performance, and structural stress. Perfect for assessing urgent upgrades or evaluating performance of existing assets.
            </p>
            <p className="text-gray-400">
              From temperature spikes to wind surges, see how real weather influences your building in real time — without needing to wait years.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Section 2: Custom Climate Configuration */}
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            🌤️ Create Your Own Climate Scenario
          </h2>
          <p className="text-lg text-gray-300">
            Define custom weather inputs to simulate future conditions and extreme cases. Modify temperature, humidity, wind — and test how your design holds up.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl max-w-xl mx-auto"
        >
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-300">Location</label>
              <input type="text" placeholder="e.g., Calgary, AB" className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600" />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Temperature (°C)</label>
              <input type="number" placeholder="e.g., 22" className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600" />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Humidity (%)</label>
              <input type="number" placeholder="e.g., 60" className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600" />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Wind Speed (km/h)</label>
              <input type="number" placeholder="e.g., 10" className="mt-1 w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600" />
            </div>
            <Link href="/sign-in" className="w-full">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow w-full"
              type="button"
            >
              Run Simulation
            </motion.button>
            </Link>
          </form>
        </motion.div>
      </div>
    </section>
  );
} 
