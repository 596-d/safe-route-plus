"use client"

import { motion } from "framer-motion"
import CloudyWeather from "./CloudyWeather"

const rain =
  Array.from(
    { length: 180 },
    (_, i) => i
  )

export default function RainWeather() {
  return (
    <>
    <CloudyWeather />
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.35,
        }}
        className="
          fixed
          inset-0
          bg-slate-900/30
          z-[100]
          pointer-events-none
        "
      />

      {rain.map(
        (
          drop
        ) => (
          <motion.div
            key={drop}
            animate={{
              y: [
                -100,
                1400,
              ],
            }}
            transition={{
              repeat:
                Infinity,
              duration:
                1,
              delay:
                Math.random(),
              ease:
                "linear",
            }}
            className="
              fixed
              w-[2px]
              h-[20px]
              bg-blue-300
              z-[150]
              pointer-events-none
            "
            style={{
              left: `${
                Math.random() *
                100
              }%`,
            }}
          />
        )
      )}
    </>
  )
}