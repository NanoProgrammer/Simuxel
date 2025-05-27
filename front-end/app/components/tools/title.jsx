"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const drawLetter = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  }),
}

export default function TitleWithPaint() {
  const text = "Tools"
  const [view, setView] = useState(false)

  return (
    <motion.div
      className="text-4xl font-bold flex gap-1 min-h-[20vh]  justify-center mt-24"
      // Este div controla cuándo cambia el estado view al entrar en viewport
      onViewportEnter={() => setView(true)}
      onViewportLeave={() => setView(false)}
    >
      {view
        ? text.split("").map((char, i) => (
            <motion.h1
              key={i}
              custom={i}
              variants={drawLetter}
              initial="hidden"
              animate="visible"
              className="inline-block font-extrabold text-[var(--color-secondary)] text-6xl"
            >
              {char}
            </motion.h1>
          ))
        : null}
    </motion.div>
  )
}
