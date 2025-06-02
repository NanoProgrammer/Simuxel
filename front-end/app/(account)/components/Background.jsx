'use client'

import { motion } from 'framer-motion'

export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0a0a1a] via-[#1b1b2f] to-[#0c0c1c] overflow-hidden">
      {/* Onda superior más oscura */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-r from-fuchsia-700 to-cyan-600 opacity-20 blur-2xl rounded-b-[50%]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Onda inferior más oscura */}
      <motion.div
        className="absolute bottom-0 right-0 w-full h-[300px] bg-gradient-to-l from-indigo-700 to-purple-800 opacity-15 blur-2xl rounded-t-[50%]"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      />

      {/* Movimiento flotante ambiental */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Luz ambiental tenue central */}
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-3 blur-[200px]" />
      </motion.div>
    </div>
  )
}
