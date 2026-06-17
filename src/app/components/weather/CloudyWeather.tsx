"use client"

import { motion } from "framer-motion"

const clouds =
  Array.from(
    { length: 35 },
    (_, i) => i
  )

export default function CloudyWeather() {
  return (
    <>
      

      {clouds.map(
        (
          cloud
        ) => (
          <motion.div
            key={cloud}
            initial={{
              x: -2500,
            }}
            animate={{
  x: 3000,
}}
            transition={{
  duration: 7 +
    Math.random() * 10,
  ease: "linear",
}}
            className="
              fixed
              z-[99981]
              pointer-events-none
            "
            style={{
              top:
                cloud * 40,
            }}
          >
            <div
              className="
                w-[800px]
                h-[260px]
                bg-white/35
                rounded-full
                blur-3xl
              "
            />
          </motion.div>
        )
      )}
    </>
  )
}