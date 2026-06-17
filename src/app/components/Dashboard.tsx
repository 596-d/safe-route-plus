"use client"

import { motion } from "framer-motion"
import SafetyForecast from "./SafetyForecast"
import SafetyReplay from "./SafetyReplay"
import SafetyTimeline from "./SafetyTimeline"
import { useState } from "react"

type Volunteer = {
  name: string
  distance: string
  rating: number
  status: string
  phone: string
}

type RouteOption = {
  name: string
  risk: string
  time: string
  description: string
}

type Props = {
  profile: string

  destination: string
  setDestination: (
    value: string
  ) => void

  safetyScore: number

  routeName: string
  riskLevel: string
  routeRisk: number

  distance: number

  reportCount: number

  volunteers: Volunteer[]

  nearbyPlaces: string[]

  nightMode: boolean
  toggleNightMode: () => void

  onSOS: () => void

  weatherCondition: string
  temperature: number

  transportMode: string
  setTransportMode: (
    value: string
  ) => void

  travelConfidence: number

  selectedRoute: string
  setSelectedRoute: (
    value: string
  ) => void

  routeOptions: RouteOption[]
  arrivalTime: string

predictedSafety: number

onChangeProfile: () => void

}

const destinations = [
  "RK Beach",
  "Rushikonda",
  "Jagadamba",
  "MVP Colony",
  "Kailasagiri",
  "Andhra University",
  "Dwaraka Nagar",
]

const transportModes = [
  "Walk",
  "Cycle",
  "Scooty",
  "Car",
  "Bus",
  "Train",
  "Flight",
]

export default function Dashboard({
  profile,

  destination,
  setDestination,

  safetyScore,

  routeName,
  riskLevel,

  distance,

  volunteers,

  nearbyPlaces,

  nightMode,
  toggleNightMode,

  onSOS,

  weatherCondition,
  temperature,

  transportMode,
  setTransportMode,

  travelConfidence,

  selectedRoute,
  setSelectedRoute,

  routeOptions,
  arrivalTime,
predictedSafety,

onChangeProfile,
}: Props){

  const profileConfig = {
    "Women Safety": {
      color:
        "text-pink-500",
      title:
        "🌸 Women Safety",
      description:
        "Enhanced route monitoring active",
    },

    Student: {
      color:
        "text-blue-500",
      title:
        "📚 Student",
      description:
        "Campus safety monitoring active",
    },

    Family: {
      color:
        "text-orange-500",
      title:
        "🏡 Family",
      description:
        "Family safe routing active",
    },

    "Senior Citizen": {
      color:
        "text-green-500",
      title:
        "🏥 Senior Citizen",
      description:
        "Medical support prioritization active",
    },

    Standard: {
      color:
        "text-cyan-500",
      title:
        "🌐 General Traveler",
      description:
        "Balanced safety routing active",
    },
  }

  const currentProfile =
    profileConfig[
      profile as keyof typeof profileConfig
    ] ??
    profileConfig.Standard
    const theme =
  profile === "Women Safety"
    ? {
        primary:
          "bg-violet-500",
        secondary:
          "bg-violet-100",
        text:
          "text-violet-600",
        panel:
           "from-violet-200 via-violet-100 to-white",
      }
    : profile === "Student"
    ? {
        primary:
          "bg-blue-500",
        secondary:
          "bg-blue-100",
        text:
          "text-blue-600",
        panel:
          "from-blue-200 via-blue-100 to-white",
      }
    : profile ===
      "Senior Citizen"
    ? {
        primary:
          "bg-green-500",
        secondary:
          "bg-green-100",
        text:
          "text-green-600",
        panel:
          "from-green-200 via-green-100 to-white",
      }
    : profile === "Family"
    ? {
        primary:
          "bg-amber-500",
        secondary:
          "bg-amber-100",
        text:
          "text-amber-600",
        panel:
          "from-amber-300 via-amber-100 to-white",
      }
    : {
    primary: "bg-teal-500",
    secondary: "bg-teal-100",
    text: "text-teal-600",
    panel: "from-teal-200 via-cyan-100 to-white",

          
      }
      const [
  notifiedVolunteer,
  setNotifiedVolunteer,
] = useState<number | null>(
  null
)
  return (
    <motion.div
      initial={{
        x: -80,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.7,
      }}
      className={`
        absolute
        top-5
        left-5
        z-[1000]
        w-[450px]
        h-[92vh]
        overflow-y-auto
        rounded-3xl
        shadow-2xl
        p-5
        backdrop-blur-xl
        border

        ${
          nightMode
            ? "bg-gray-900/95 text-white border-gray-700"
            : `bg-gradient-to-br ${theme.panel} text-black border-gray-200`
        }     
      `}
    >

      <motion.h1
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="
          text-3xl
          font-bold
        "
      >
        🛡 SafeRoute+
      </motion.h1>

      <p
        className="
          opacity-70
          text-sm
          mt-1
        "
      >
        Smart Safety Navigation Platform
      </p>

      {/* PROFILE MODE */}

      <div
  className={`
    mt-5
    rounded-3xl
    border
    p-5
    ${theme.secondary}
  `}
>
        <h3
          className={`
            font-bold
            text-lg
            ${currentProfile.color}
          `}
        >
          {currentProfile.title}
        </h3>

        <p
          className="
            text-sm
            mt-2
            opacity-80
          "
        >
          {currentProfile.description}
        </p>
      <button
  onClick={onChangeProfile}
  className={`
    mt-4
    w-full
    ${theme.primary}
    text-white
    p-3
    rounded-xl
    font-semibold
  `}
>
  🔄 Change Profile
</button>
      </div>

      {/* WEATHER */}

      <div
        className="
          mt-5
          rounded-3xl
          border
          p-5
        "
      >
        <h3
          className="
            font-bold
            mb-3
          "
        >
          🌤 Weather Intelligence
        </h3>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p className="text-4xl font-bold">
              {temperature}°
            </p>

            <p className="opacity-70">
              {weatherCondition}
            </p>
          </div>

          <div
            className="
              text-right
              text-sm
            "
          >
            <p>
              Travel
            </p>

            <p className="text-green-600 font-semibold">
              Favorable
            </p>
          </div>
        </div>
      </div>

      {/* DESTINATION */}

      <div className="mt-5">

        <label
          className="
            block
            font-semibold
            mb-2
          "
        >
          📍 Destination
        </label>

        <select
          value={destination}
          onChange={(e) =>
  setDestination(
    e.target.value
  )
}
          className={`
            w-full
            p-3
            rounded-xl
            border

            ${
              nightMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black"
            }
          `}
        >
          {destinations.map(
            (place) => (
              <option
                key={place}
                value={place}
              >
                {place}
              </option>
            )
          )}
        </select>
      </div>

      {/* TRANSPORT MODE */}

      <div
        className="
          mt-5
          rounded-3xl
          border
          p-5
        "
      >
        <h3
          className="
            font-bold
            mb-3
          "
        >
          🚶 Transport Mode
        </h3>

        <select
          value={transportMode}
          onChange={(e) => {

  const mode =
    e.target.value

  setTransportMode(mode)

  if (
    mode === "Flight"
  ) {
    alert(
      "✈ No flight routes available for local city travel."
    )
  }

  else if (
    mode === "Train"
  ) {
    alert(
      "🚆 No train routes available for this destination."
    )
  }

}}
          className={`
            w-full
            p-3
            rounded-xl
            border

            ${
              nightMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black"
            }
          `}
        >
          {transportModes.map(
            (
              transport
            ) => (
              <option
                key={transport}
                value={transport}
              >
                {transport}
              </option>
            )
          )}
        </select>
      </div>
            {/* SAFETY SCORE */}

      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className={`
  mt-5
  rounded-3xl
  p-5
  text-center
  ${theme.secondary}
`}
      >
        <h3
          className="
            font-bold
            text-green-700
          "
        >
          🛡 Safety Score
        </h3>

        <p
          className="
            text-6xl
            font-bold
            text-green-700
          "
        >
          {safetyScore}
        </p>

        <p className="text-sm mt-1">
          Live AI Evaluation
        </p>
      </motion.div>

      {/* TRAVEL CONFIDENCE */}

      <div
        className="
          mt-5
          rounded-3xl
          border
          p-5
        "
      >
        <h3
          className="
            font-bold
            mb-3
          "
        >
          🎯 Travel Confidence
        </h3>

        <div
          className="
            text-center
          "
        >
          <p
            className="
              text-5xl
              font-bold
              text-cyan-500
            "
          >
            {travelConfidence}%
          </p>

          <div
            className="
              mt-3
              text-sm
              space-y-1
            "
          >
            <p>
              ✓ Weather Analysis
            </p>

            <p>
              ✓ Route Safety
            </p>

            <p>
              ✓ Emergency Coverage
            </p>

            <p>
              ✓ Transport Assessment
            </p>
          </div>
        </div>
      </div>

      {/* ROUTE OPTIONS */}

      <div
        className="
          mt-5
          border
          rounded-3xl
          p-5
        "
      >
        <h3
          className="
            font-bold
            mb-3
          "
        >
          🛣 Available Routes
        </h3>
        <div
  className="
    mb-4
    rounded-xl
    bg-green-100
    p-3
  "
>
  <p className="font-bold">
    ✓ Active Route
  </p>

  <p>
    {selectedRoute}
  </p>
</div>

        <div
          className="
            space-y-3
          "
        >
          {routeOptions.map(
            (
              route,
              index
            ) => (
              <button
                key={index}
                onClick={() =>
                  setSelectedRoute(
                    route.name
                  )
                }
                className={`
                  w-full
                  text-left
                  p-4
                  rounded-xl
                  border
                  transition-all

                  ${
                    selectedRoute ===
                    route.name
                      ? "bg-green-100 border-green-500"
                      : ""
                  }
                `}
              >
                <p className="font-semibold">
                  {route.name}
                </p>

                <p className="text-sm opacity-70">
                  Risk:
                  {" "}
                  {route.risk}
                </p>

                <p className="text-sm opacity-70">
                  ETA:
                  {" "}
                  {route.time}
                </p>
                <p
  className="
    text-xs
    mt-2
    opacity-70
  "
>
  {route.description}
</p>
              </button>
            )
          )}
        </div>
      </div>

      {/* WHY THIS ROUTE */}

      <div
        className="
          mt-5
          border
          rounded-3xl
          p-5
        "
      >
        <h3
          className="
            font-bold
            mb-3
          "
        >
          🤖 Why This Route?
        </h3>

        <div
          className="
            space-y-2
            text-sm
          "
        >
          <p>
            ✓ Better Lighting
          </p>

          <p>
            ✓ Volunteer Coverage
          </p>

          <p>
            ✓ Emergency Access
          </p>

          <p>
            ✓ Lower Community Risk
          </p>
        </div>
      </div>

      {/* BUBBLE INSIGHT */}

      <div
        className="
          mt-5
          rounded-3xl
          p-5
          bg-blue-50
          border
        "
      >
        <h3
          className="
            font-bold
            mb-3
          "
        >
          🐧 Bubble Insight
        </h3>

        <div
          className="
            text-sm
            space-y-2
          "
        >
          <p>
            Weather:
            {" "}
            {weatherCondition}
          </p>

          <p>
            Route:
            {" "}
            {selectedRoute}
          </p>

          <p>
            Travel Confidence:
            {" "}
            {travelConfidence}%
          </p>

          <p className="text-green-600 font-semibold">
            Recommended for current conditions.
          </p>
        </div>
      </div>

      {/* SYSTEM STATUS */}

      <motion.div
        className={`
          mt-5
          p-4
          rounded-3xl
          border

          ${
            nightMode
              ? "bg-gray-800 border-gray-700"
              : "bg-blue-50 border-blue-100"
          }
        `}
      >
        <h3 className="font-bold text-blue-600 mb-3">
          🟢 System Status
        </h3>

        <div className="space-y-2 text-sm">
          <p>
            📡 GPS Connected
          </p>

          <p>
            🛣 Navigation Active
          </p>

          <p>
            🚨 Emergency Network Online
          </p>

          <p>
            🧠 AI Monitoring Enabled
          </p>
        </div>
      </motion.div>

      {/* AI SAFETY */}

      <motion.div
        className={`
          mt-5
          rounded-3xl
          p-5
          border

          ${
            nightMode
              ? "bg-gray-800 border-gray-700"
              : "bg-blue-50 border-blue-100"
          }
        `}
      >
        <h3 className="font-bold text-blue-600 mb-3">
          🤖 AI Safety Intelligence
        </h3>

        <div className="space-y-2 text-sm">
          <p>
            ✓ Street Lighting Analysis
          </p>

          <p>
            ✓ Risk Prediction Engine
          </p>

          <p>
            ✓ Emergency Coverage Check
          </p>

          <p>
            ✓ Crowd Safety Monitoring
          </p>
        </div>

        <div
          className="
            mt-4
            p-3
            rounded-xl
            bg-green-100
          "
        >
          <p
            className="
              font-bold
              text-green-700
            "
          >
            SAFE TO TRAVEL
          </p>
        </div>
      </motion.div>
            {/* ROUTE INTELLIGENCE */}

      <div
        className="
          mt-5
          border
          rounded-3xl
          p-5
        "
      >
        <h3
          className="
            font-bold
            mb-3
          "
        >
          📊 Route Intelligence
        </h3>

        <div className="space-y-2">
          <p>
            Distance:
            {" "}
            {distance}
            {" "}
            km
          </p>

          <p>
            Risk Level:
            {" "}
            {riskLevel}
          </p>

          <p>
            Route:
            {" "}
            {routeName}
          </p>

          <p className="text-green-600 font-bold">
            Confidence:
            {" "}
            {travelConfidence}
            %
          </p>
        </div>
      </div>

      {/* LIVE MONITORING */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          mt-5
          border
          rounded-3xl
          p-5
        "
      >
        <h3 className="font-bold mb-3">
          📡 Live Monitoring
        </h3>

        <div className="space-y-2">
          <p className="text-green-600 font-semibold">
            🟢 No Active Threats
          </p>

          <p>
            AI Scan Status:
            {" "}
            Active
          </p>

          <p>
            Last Update:
            {" "}
            Just Now
          </p>

          <p>
            Monitoring Coverage:
            {" "}
            100%
          </p>
        </div>
      </motion.div>

      {/* EMERGENCY NETWORK */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          mt-5
          border
          rounded-3xl
          p-5
        "
      >
        <h3 className="font-bold mb-3">
          🚨 Emergency Network
        </h3>

        <div className="space-y-2">
          <p>
            👮 Police Connected
          </p>

          <p>
            🏥 Hospital Connected
          </p>

          <p>
            🚑 Emergency Response Ready
          </p>

          <p>
            📞 Helpline Available
          </p>
        </div>
      </motion.div>
      <div className="mt-5">
  <SafetyForecast
    currentSafety={safetyScore}
    predictedSafety={
      Math.max(
        safetyScore - 12,
        40
      )
    }
    currentTime={
      new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )
    }
    arrivalTime="19:16"
    weather={weatherCondition}
  />
</div>
<div className="mt-5">
  <SafetyTimeline />
</div>
<div className="mt-5">
  <SafetyReplay />
</div>
<div
  className="
    mt-5
    rounded-3xl
    border
    p-5
  "
>
  <h3
    className="
      font-bold
      text-lg
      mb-3
    "
  >
  📊 What Changed?  
  </h3>

  <div className="space-y-2">
    <p>
      Yesterday:
      88
    </p>

    <p>
      Today:
      {safetyScore}
    </p>

    <p className="text-red-600 font-semibold">
      Difference:
      -14
    </p>
  </div>

  <div
    className="
      mt-3
      rounded-xl
      bg-slate-100
      p-3
    "
  >
    <p className="font-semibold">
      Reasons
    </p>

    <ul
      className="
        text-sm
        mt-2
      "
    >
      <li>
        🌧 Weather Impact
      </li>

      <li>
        🚨 Community Alerts
      </li>

      <li>
        🌙 Reduced Visibility
      </li>
    </ul>
  </div>
</div>
<div className="mt-5 rounded-3xl border p-5">

  <h3 className="font-bold text-lg">
    🤖 AI Forecast
  </h3>

  <div className="mt-3 space-y-2">

    <p>
      ⏰ Arrival:
      {" "}
      {arrivalTime}
    </p>

    <p>
      🛡 Predicted Safety:
      {" "}
      {predictedSafety}
    </p>

  </div>

</div>

      {/* VOLUNTEERS */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          mt-5
          border
          rounded-3xl
          p-5
        "
      >
        <h3 className="font-bold mb-3">
          🙋 Emergency Response Network
        </h3>

        {volunteers.map(
          (
            volunteer,
            index
          ) => (
            <div
              key={index}
              className="
                border-b
                pb-3
                mb-3
              "
            >
              <p className="font-semibold">
                Volunteer Available
              </p>

              <p>
                ETA:
                {" "}
                {volunteer.distance}
              </p>

              <p>
                Status:
                {" "}
                {volunteer.status}
              </p>

              <p>
                Rating:
                {" "}
                {volunteer.rating}
                /5
              </p>

              <button
  onClick={() =>
  setNotifiedVolunteer(
    index
  )
}
  className="
    mt-2
    bg-green-600
    hover:bg-green-700
    text-white
    px-3
    py-2
    rounded-xl
  "
>
  🚑 Notify Volunteer
</button>
{
  notifiedVolunteer ===
index && (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        mt-2
        rounded-xl
        bg-green-100
        p-3
      "
    >
      <p
        className="
          text-green-700
          font-semibold
        "
      >
        ✅ Volunteer notified
      </p>

      <p
        className="
          text-sm
          text-green-600
        "
      >
        Assistance is on the way.
      </p>
    </motion.div>
  )
}
            </div>
          )
        )}
      </motion.div>

      {/* NEARBY PLACES */}

      <div
        className="
          mt-5
          border
          rounded-3xl
          p-5
        "
      >
        <h3 className="font-bold mb-3">
          📍 Nearby Places
        </h3>

        {nearbyPlaces.map(
          (
            place,
            index
          ) => (
            <p
              key={index}
              className="mb-2"
            >
              {place}
            </p>
          )
        )}
      </div>

      {/* DISPLAY SETTINGS */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          mt-5
          border
          rounded-3xl
          p-5
        "
      >
        <h3 className="font-bold mb-3">
          🌙 Display Settings
        </h3>

        <button
          onClick={toggleNightMode}
          className={`
            w-full
            p-3
            rounded-xl
            font-semibold

            ${
              nightMode
                ? "bg-yellow-500 text-black"
                : "bg-gray-800 text-white"
            }
          `}
        >
          {nightMode
            ? "☀ Switch to Day Mode"
            : "🌙 Switch to Night Mode"}
        </button>
      </motion.div>

      {/* SOS */}

      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="mt-5"
      >
        <button
          onClick={onSOS}
          className="
            w-full
            bg-red-600
            hover:bg-red-700
            text-white
            p-5
            rounded-3xl
            font-bold
            text-lg
            shadow-lg
          "
        >
          🚨 EMERGENCY SOS
        </button>
      </motion.div>

    </motion.div>
  )
}