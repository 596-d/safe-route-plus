"use client"

import { motion } from "framer-motion"

type Props = {
  onSelect: (
    profile: string
  ) => void
}

const profiles = [
  {
    icon: "📚",
    title: "Student",
    description:
      "Campus routes, public transport and student-friendly areas.",
  },

  {
    icon: "🌸",
    title: "Women Safety",
    description:
      "Enhanced safety routing, well-lit paths, emergency support and verified safe zones.",
  },

  {
    icon: "🏥",
    title: "Senior Citizen",
    description:
      "Hospital-focused routes and accessibility support.",
  },

  {
    icon: "🏡",
    title: "Family",
    description:
      "Family-safe routes, medical facilities and public areas.",
  },

  {
    icon: "🌐",
    title: "General Traveler",
    description:
      "Balanced safety and travel recommendations.",
  },
]

export default function ProfileSelection({
  onSelect,
}: Props) {
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-black
      text-white
      flex
      items-center
      justify-center
      px-6
    "
    >
      <div
        className="
        max-w-6xl
        w-full
      "
      >
        <motion.h1
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
          text-center
          text-5xl
          font-bold
        "
        >
          Choose Your Safety Profile
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
          text-center
          text-gray-400
          mt-4
          text-lg
        "
        >
          SafeRoute+ will personalize
          recommendations based on
          your profile.
        </motion.p>

        <div
          className="
          mt-12
          grid
          md:grid-cols-3
          gap-6
        "
        >
          {profiles.map(
            (
              profile,
              index
            ) => (
              <motion.div
                key={
                  profile.title
                }
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.15,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                onClick={() =>
                  onSelect(
                    profile.title
                  )
                }
                className="
                  cursor-pointer
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  shadow-2xl
                  hover:border-cyan-400/50
                  hover:shadow-cyan-500/20
                  transition-all
                "
              >
                <div className="text-6xl">
                  {profile.icon}
                </div>

                <h2
                  className="
                  mt-4
                  text-2xl
                  font-bold
                "
                >
                  {profile.title}
                </h2>

                <p
                  className="
                  mt-3
                  text-gray-300
                  leading-relaxed
                "
                >
                  {
                    profile.description
                  }
                </p>
              </motion.div>
            )
          )}
        </div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
          className="
          mt-12
          flex
          justify-center
        "
        >
          <div
            className="
            bg-white/10
            backdrop-blur-xl
            rounded-3xl
            p-6
            border
            border-white/10
            max-w-lg
            text-center
          "
          >
            <div className="text-5xl">
              🐧
            </div>

            <h3
              className="
              mt-3
              font-bold
              text-xl
            "
            >
              Bubble AI
            </h3>

            <p
              className="
              mt-3
              text-gray-300
              leading-relaxed
            "
            >
              Hi there 👋
              <br />
              <br />
              I'm Bubble.
              <br />
              <br />
              Select a profile and
              I'll personalize your
              safety experience.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}