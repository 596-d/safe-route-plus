"use client"

import { motion } from "framer-motion"

type Props = {
  onLogin: () => void
}

export default function LoginScreen({
  onLogin,
}: Props) {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-black
      text-white
      px-4
      overflow-hidden
      relative
    "
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
          absolute
          top-20
          left-20
          text-7xl
          opacity-10
        "
      >
        🛡
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="
          absolute
          bottom-20
          right-20
          text-8xl
          opacity-10
        "
      >
        🛰
      </motion.div>

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
          duration: 0.8,
        }}
        className="
          w-full
          max-w-md
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
        "
      >
        <div className="text-center mb-8">

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 3, -3, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="text-7xl mb-4"
          >
            🛡
          </motion.div>

          <h1 className="text-4xl font-bold">
            SafeRoute+
          </h1>

          <p className="text-gray-300 mt-2">
            AI Powered Smart Safety Navigation
          </p>

          <div
            className="
            mt-4
            inline-flex
            items-center
            gap-2
            bg-green-500/20
            px-4
            py-2
            rounded-full
          "
          >
            <span>🟢</span>
            <span className="text-sm">
              Safety Network Online
            </span>
          </div>
        </div>

        <div className="space-y-4">
                    <motion.input
            whileFocus={{
              scale: 1.02,
            }}
            type="text"
            placeholder="Full Name"
            className="
              w-full
              p-4
              rounded-xl
              bg-black/30
              border
              border-gray-700
              outline-none
            "
          />

          <motion.input
            whileFocus={{
              scale: 1.02,
            }}
            type="email"
            placeholder="Email Address"
            className="
              w-full
              p-4
              rounded-xl
              bg-black/30
              border
              border-gray-700
              outline-none
            "
          />

          <motion.input
            whileFocus={{
              scale: 1.02,
            }}
            type="password"
            placeholder="Password"
            className="
              w-full
              p-4
              rounded-xl
              bg-black/30
              border
              border-gray-700
              outline-none
            "
          />

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={onLogin}
            className="
              w-full
              p-4
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              transition
              font-bold
              shadow-lg
            "
          >
            Sign In
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={onLogin}
            className="
              w-full
              p-4
              rounded-xl
              border
              border-white/20
              hover:bg-white/10
              transition
            "
          >
            Continue as Guest
          </motion.button>
        </div>

        <div
          className="
          mt-8
          p-4
          rounded-2xl
          bg-white/5
          border
          border-white/10
        "
        >
          <h3 className="font-semibold mb-2">
            🛡 Platform Features
          </h3>

          <ul className="text-sm text-gray-300 space-y-1">
            <li>
              ✓ AI Route Intelligence
            </li>

            <li>
              ✓ Emergency Network Access
            </li>

            <li>
              ✓ Live Safety Monitoring
            </li>

            <li>
              ✓ Smart SOS Assistance
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          SafeRoute+ © 2026
          <br />
          Professional Safety Navigation Platform
        </div>

      </motion.div>
    </div>
  )
}