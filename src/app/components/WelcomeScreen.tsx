"use client"

import { motion } from "framer-motion"

type Props = {
  onStart: () => void
}

export default function WelcomeScreen({
  onStart,
}: Props) {
  return (
    <div
      className="
      h-screen
      w-full
      overflow-hidden
      relative
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-black
      flex
      items-center
      justify-center
      text-white
    "
    >
      {/* Animated Background Glow */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
        absolute
        w-[700px]
        h-[700px]
        rounded-full
        bg-cyan-500/20
        blur-[180px]
        "
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
        absolute
        w-[500px]
        h-[500px]
        rounded-full
        bg-blue-500/20
        blur-[150px]
        "
      />

      <div
        className="
        relative
        z-10
        text-center
        max-w-5xl
        px-6
        "
      >
        {/* Shield */}

        <motion.div
          initial={{
            scale: 0,
            opacity: 0,
            rotate: -180,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.2,
          }}
          className="
          flex
          justify-center
          "
        >
          <div
            className="
            w-44
            h-44
            rounded-full
            bg-gradient-to-br
            from-cyan-400
            via-blue-500
            to-indigo-700
            flex
            items-center
            justify-center
            shadow-[0_0_100px_rgba(59,130,246,0.8)]
            "
          >
            <span className="text-8xl">
              🛡
            </span>
          </div>
        </motion.div>

        {/* Title */}

        <motion.h1
          initial={{
            y: 50,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
            duration: 0.8,
          }}
          className="
          mt-8
          text-7xl
          font-extrabold
          tracking-wide
          "
        >
          SafeRoute+
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className="
          mt-4
          text-cyan-300
          text-xl
          tracking-[0.25em]
          uppercase
          "
        >
          Community Safety Network
        </motion.p>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.1,
          }}
          className="
          mt-10
          text-3xl
          text-gray-200
          "
        >
          Navigate Smarter.
          Reach Safer.
        </motion.p>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.3,
          }}
          className="
          mt-6
          max-w-3xl
          mx-auto
          text-gray-400
          leading-8
          "
        >
          AI-powered community safety platform
          helping citizens discover safer routes,
          nearby volunteers, emergency support,
          and real-time safety intelligence.
        </motion.p>

        {/* Feature Cards */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.6,
          }}
          className="
          mt-14
          grid
          grid-cols-2
          md:grid-cols-4
          gap-5
          "
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10">
            📍
            <p className="mt-2">
              Live GPS
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10">
            🛣️
            <p className="mt-2">
              Safe Routes
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10">
            🙋
            <p className="mt-2">
              Volunteers
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/10">
            🚨
            <p className="mt-2">
              SOS Support
            </p>
          </div>
        </motion.div>

        {/* Animated Dots */}

        <div
          className="
          flex
          justify-center
          gap-3
          mt-12
          "
        >
          <div className="w-3 h-3 rounded-full bg-green-400 animate-bounce" />
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce delay-100" />
          <div className="w-3 h-3 rounded-full bg-blue-400 animate-bounce delay-200" />
        </div>

        {/* Button */}

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={onStart}
          className="
          mt-12
          px-12
          py-5
          rounded-2xl
          bg-green-500
          hover:bg-green-600
          text-xl
          font-bold
          shadow-[0_0_40px_rgba(34,197,94,0.6)]
          "
        >
          Enter SafeRoute+
        </motion.button>

        <p
          className="
          mt-8
          text-gray-500
          text-sm
          "
        >
          Safety • Community • Intelligence
        </p>
      </div>
    </div>
  )
}