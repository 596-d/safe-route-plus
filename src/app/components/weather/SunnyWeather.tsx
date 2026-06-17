"use client"

import { motion } from "framer-motion"

export default function SunnyWeather() {
  return (
    <>
      {/* Warm Atmosphere */}

      <div
        className="
          fixed
          inset-0
          pointer-events-none
          z-[99990]
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(255,220,120,0.12), transparent 60%)",
        }}
      />

      {/* Sun Glow */}

      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
          fixed
          top-[-80px]
          right-[-80px]
          w-[750px]
          h-[750px]
          rounded-full
          blur-3xl
          pointer-events-none
          z-[99991]
        "
        style={{
          background:
            "rgba(255,220,100,0.8)",
        }}
      />

      {/* Visible Sun */}

      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
          fixed
          top-6
          right-6
          w-[130px]
          h-[130px]
          rounded-full
          pointer-events-none
          z-[99992]
        "
        style={{
          background:
            "radial-gradient(circle,#FFF4B0,#FFC107)",
        }}
      />

      {/* Rays */}

      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.12, 0.28, 0.12],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            delay: i * 0.2,
          }}
          
          className="
            fixed
            top-20
right-20
            pointer-events-none
            z-[99991]
          "
          style={{
            width: "1400px",
            height: "3px",
            background:
              "linear-gradient(to left, rgba(255,220,120,0.8), transparent)",
            transform: `rotate(${i * 15}deg)`,
            transformOrigin:
              "right center",
          }}
        />
      ))}
      <motion.div
  animate={{
    opacity: [0.04, 0.1, 0.04],
  }}
  transition={{
    repeat: Infinity,
    duration: 8,
  }}
  className="
    fixed
    top-0
    right-0
    h-full
    pointer-events-none
    z-[99990]
  "
  style={{
    width: "900px",
    background:
      "linear-gradient(to left, rgba(255,220,120,0.15), transparent)",
    transform: "rotate(15deg)",
    transformOrigin: "top right",
  }}
/>
    </>
  )
}