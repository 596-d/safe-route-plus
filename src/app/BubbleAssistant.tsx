"use client"

import { useState } from "react"
import {
  motion,
  AnimatePresence,
} from "framer-motion"

type Props = {
  weather: string

  currentSafety: number

  predictedSafety: number

  currentTime: string

  arrivalTime: string

  selectedRoute: string

  confidence: number
}

export default function BubbleAssistant({
  weather,
  currentSafety,
  predictedSafety,
  currentTime,
  arrivalTime,
  selectedRoute,
  confidence,
}: Props) {

  const [open, setOpen] =
    useState(false)

  const recommendation =
    predictedSafety >= 85
      ? "Highly Recommended"
      : predictedSafety >= 70
      ? "Safe With Awareness"
      : "Travel With Caution"

  const reason =
    predictedSafety < currentSafety
      ? "Safety expected to decrease because of time, weather and nearby incidents."
      : "Conditions are expected to remain stable during travel."

  return (
    <>
      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            className="
              fixed
              bottom-36
              right-6
              z-[3000]
              w-[360px]
              rounded-3xl
              bg-white
              shadow-2xl
              border
              p-5
            "
          >

            <h3
              className="
                text-xl
                font-bold
              "
            >
              🐧 Bubble AI
            </h3>

            <p
              className="
                text-sm
                text-gray-500
                mt-1
              "
            >
              Predictive Travel Intelligence
            </p>

            <div
              className="
                mt-4
                rounded-xl
                bg-cyan-50
                p-4
              "
            >
              <p className="font-semibold">
                🌤 Weather
              </p>

              <p className="mt-1">
                {weather}
              </p>
            </div>

            <div
              className="
                mt-3
                rounded-xl
                bg-violet-50
                p-4
              "
            >
              <p className="font-semibold">
                ⏰ Arrival Forecast
              </p>

              <p className="mt-1">
                Current Time:
                {" "}
                {currentTime}
              </p>

              <p>
                Arrival:
                {" "}
                {arrivalTime}
              </p>
            </div>

            <div
              className="
                mt-3
                rounded-xl
                bg-green-50
                p-4
              "
            >
              <p className="font-semibold">
                🛡 Safety Forecast
              </p>

              <p className="mt-1">
                Current:
                {" "}
                {currentSafety}
              </p>

              <p>
                Predicted:
                {" "}
                {predictedSafety}
              </p>
            </div>

            <div
              className="
                mt-3
                rounded-xl
                bg-amber-50
                p-4
              "
            >
              <p className="font-semibold">
                🚀 AI Confidence
              </p>

              <p className="mt-1">
                {confidence}%
              </p>

              <p className="text-sm mt-1">
                {recommendation}
              </p>
            </div>

            <div
              className="
                mt-3
                rounded-xl
                bg-red-50
                p-4
              "
            >
              <p className="font-semibold">
                🧠 Bubble Insight
              </p>

              <p className="mt-1">
                Route:
                {" "}
                {selectedRoute}
              </p>

              <p className="text-sm mt-2">
                {reason}
              </p>
            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* FLOATING PENGUIN */}

      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        onClick={() =>
          setOpen(!open)
        }
        className="
          fixed
          bottom-8
          right-24
          z-[3000]
          cursor-pointer
        "
      >

        <div className="relative">

          {/* SPEECH BUBBLE */}

          <motion.div
            animate={{
              opacity: [1, 0.8, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="
              absolute
              bottom-24
              right-0
              bg-white
              px-4
              py-3
              rounded-2xl
              shadow-xl
              w-[240px]
            "
          >

            <p
              className="
                text-sm
                font-semibold
              "
            >
              🧠 Safety Forecast Ready
            </p>

            <p
              className="
                text-xs
                text-gray-600
                mt-1
              "
            >
              Tap me to view arrival prediction and safety intelligence.
            </p>

          </motion.div>

          <div
            className="
              text-7xl
            "
          >
            🐧
          </div>

        </div>

      </motion.div>
    </>
  )
}