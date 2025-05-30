"use client";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const sampleData = {
  labels: ["Energy", "Comfort", "Maintenance"],
  datasets: [
    {
      label: "Scenario A",
      data: [45, 30, 25],
      backgroundColor: [
        "rgba(0, 255, 255, 0.5)",
        "rgba(138, 43, 226, 0.5)",
        "rgba(255, 99, 132, 0.5)",
      ],
      borderColor: [
        "rgba(0, 255, 255, 1)",
        "rgba(138, 43, 226, 1)",
        "rgba(255, 99, 132, 1)",
      ],
      borderWidth: 2,
    },
  ],
};

export function GraphComparison() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center  text-white px-4 py-12 overflow-hidden mb-32">
      <motion.h2
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 drop-shadow-lg"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Scenario Comparison
      </motion.h2>

      <motion.p
        className="mt-4 max-w-2xl text-center text-lg text-neutral-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Visualize the performance of two climate-based simulations side-by-side. See how energy consumption, comfort, and material resilience change across scenarios.
      </motion.p>

      <div className="relative mt-16 w-full flex flex-col lg:flex-row items-center justify-center gap-24">
        <motion.div
          className="bg-black/50 border border-cyan-500 rounded-2xl p-6 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-xl font-bold mb-4 text-cyan-400">Scenario A</h3>
          <Doughnut data={sampleData} />
        </motion.div>

        <motion.div
          className="bg-black/50 border border-purple-500 rounded-2xl p-6 shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3 className="text-xl font-bold mb-4 text-purple-400">Scenario B</h3>
          <Doughnut data={{ ...sampleData, datasets: [{ ...sampleData.datasets[0], label: 'Scenario B', data: [30, 40, 30] }] }} />
        </motion.div>

        <motion.div
          className="absolute text-7xl font-bold text-white mix-blend-overlay drop-shadow-md"
          initial={{ scale: 3, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ delay: 1, duration: 1 }}
        >
          VS
        </motion.div>
      </div>
    </section>
  );
}
