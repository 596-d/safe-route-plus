"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SOSButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="
          fixed
          bottom-6
          right-6
          z-[2000]
          w-20
          h-20
          rounded-full
          bg-red-600
          text-white
          text-xl
          font-bold
          shadow-2xl
        "
      >
        🚨
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              bg-black/50
              z-[3000]
              flex
              items-center
              justify-center
            "
          >
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              className="
                bg-white
                p-6
                rounded-3xl
                w-[400px]
                shadow-2xl
              "
            >
              <h2 className="text-2xl font-bold">
                Emergency SOS
              </h2>

              <p className="mt-3 text-gray-600">
                Alert nearby volunteers and
                trusted contacts.
              </p>

              <div className="mt-5 space-y-3">

                <button
                  className="
                    w-full
                    bg-red-600
                    text-white
                    p-3
                    rounded-xl
                  "
                  onClick={() =>
                    alert(
                      "SOS Activated!"
                    )
                  }
                >
                  Activate SOS
                </button>

                <button
                  className="
                    w-full
                    bg-gray-200
                    p-3
                    rounded-xl
                  "
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  Close
                </button>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}