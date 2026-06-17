"use client"

import { motion } from "framer-motion"

export default function WindyWeather() {
  return (
    <>
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: -500,
          }}
          animate={{
            x: 2500,
          }}
          transition={{
            duration: 8,
            delay: i * 0.1,
            ease: "linear",
          }}
          className="
            fixed
            h-[3px]
            bg-white/60
            z-[99990]
            pointer-events-none
          "
          style={{
            width:
              120 +
              Math.random() * 150,
            top:
              Math.random() * 100 +
              "%",
          }}
        />
      ))}
    </>
  )
}