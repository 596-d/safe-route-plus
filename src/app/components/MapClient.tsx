"use client"
import SunnyWeather from "./weather/SunnyWeather"
import CloudyWeather from "./weather/CloudyWeather"
import RainWeather from "./weather/RainWeather"
import PartlyCloudyWeather from "./weather/PartlyCloudyWeather"
import WindyWeather from "./weather/WindyWeather"

import {
  useEffect,
  useState,
} from "react"

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  Polyline,
} from "react-leaflet"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import "leaflet/dist/leaflet.css"

import Dashboard from "./Dashboard"


type Report = {
  id: number
  name: string
  description: string
  position: [number, number]
  risk: string
}

type Volunteer = {
  name: string
  distance: string
  rating: number
  status: string
  phone: string
  position: [number, number]
}

 type Props = {
  profile: string
  onChangeProfile: () => void
}

const destinationData = {
  "RK Beach": {
    score: 88,
    risk: "Low",
    distance: 24,
    route: "Police Station Road",

    nearby: [
      "🚌 Bus Stop - 5 min",
      "🏥 Hospital - 7 min",
      "👮 Police Station - 3 min",
      "🛒 Shopping Mall - 10 min",
      "☕ Cafe - 4 min",
    ],

    position: [
      17.742,
      83.344,
    ] as [number, number],
  },

  Rushikonda: {
    score: 70,
    risk: "Medium",
    distance: 32,
    route: "Hill Route",

    nearby: [
      "🏖 Beach Access - 2 min",
      "🚌 Bus Stop - 6 min",
      "🏥 Hospital - 9 min",
      "☕ Cafe - 3 min",
      "🛒 Store - 5 min",
    ],

    position: [
      17.782,
      83.385,
    ] as [number, number],
  },

  Jagadamba: {
    score: 82,
    risk: "Low",
    distance: 22,
    route: "Central Route",

    nearby: [
      "🎬 Cinema - 3 min",
      "🛒 Shopping Mall - 2 min",
      "👮 Police Station - 4 min",
      "🏥 Hospital - 6 min",
      "☕ Cafe - 2 min",
    ],

    position: [
      17.714,
      83.299,
    ] as [number, number],
  },

  "MVP Colony": {
    score: 76,
    risk: "Medium",
    distance: 27,
    route: "MVP Main Road",

    nearby: [
      "🏫 School - 4 min",
      "🏥 Hospital - 6 min",
      "🚌 Bus Stop - 3 min",
      "☕ Cafe - 5 min",
      "🛒 Store - 4 min",
    ],

    position: [
      17.742,
      83.331,
    ] as [number, number],
  },

  Kailasagiri: {
    score: 91,
    risk: "Very Low",
    distance: 28,
    route: "Tourist Route",

    nearby: [
      "🎡 View Point - 2 min",
      "🚠 Ropeway - 3 min",
      "🏥 First Aid - 4 min",
      "☕ Cafe - 5 min",
      "🛒 Store - 6 min",
    ],

    position: [
      17.749,
      83.342,
    ] as [number, number],
  },

  "Andhra University": {
    score: 84,
    risk: "Low",
    distance: 25,
    route: "University Road",

    nearby: [
      "📚 Library - 2 min",
      "🏥 Clinic - 5 min",
      "🚌 Bus Stop - 3 min",
      "☕ Cafe - 2 min",
      "🏫 Department Block - 1 min",
    ],

    position: [
      17.728,
      83.323,
    ] as [number, number],
  },

  "Dwaraka Nagar": {
    score: 72,
    risk: "Medium",
    distance: 22,
    route: "Commercial Route",

    nearby: [
      "🛒 Shopping Mall - 2 min",
      "🏥 Hospital - 4 min",
      "👮 Police Station - 5 min",
      "🚌 Bus Stop - 2 min",
      "☕ Cafe - 3 min",
    ],

    position: [
      17.725,
      83.309,
    ] as [number, number],
  },
}
const weatherByDestination = {
  "RK Beach": {
    condition: "Sunny",
    temperature: 32,
  },

  Rushikonda: {
    condition: "Cloudy",
    temperature: 29,
  },

  Jagadamba: {
    condition: "Sunny",
    temperature: 31,
  },

  "MVP Colony": {
    condition: "Partly Cloudy",
    temperature: 30,
  },

  Kailasagiri: {
    condition: "Windy",
    temperature: 28,
  },

  "Andhra University": {
    condition: "Sunny",
    temperature: 30,
  },

  "Dwaraka Nagar": {
    condition: "Cloudy",
    temperature: 29,
  },
}

const volunteers: Volunteer[] = [
  {
    name: "Response Volunteer",
    distance: "250m",
    rating: 4.9,
    status: "Available",
    phone: "Protected",
    position: [
      17.7235,
      83.306,
    ],
  },

  {
    name: "Response Volunteer",
    distance: "420m",
    rating: 4.8,
    status: "Available",
    phone: "Protected",
    position: [
      17.728,
      83.312,
    ],
  },

  {
    name: "Response Volunteer",
    distance: "650m",
    rating: 4.7,
    status: "Busy",
    phone: "Protected",
    position: [
      17.732,
      83.318,
    ],
  },
]

const policeStations = [
  {
    name: "MVP Police Station",
    position: [
      17.741,
      83.331,
    ] as [number, number],
  },

  {
    name: "Police Control Room",
    position: [
      17.726,
      83.314,
    ] as [number, number],
  },
]

const hospitals = [
  {
    name: "KGH Hospital",
    position: [
      17.719,
      83.308,
    ] as [number, number],
  },

  {
    name: "Apollo Hospital",
    position: [
      17.733,
      83.319,
    ] as [number, number],
  },
]

const unsafeZones = [
  {
    name: "Poor Lighting Zone",
    risk: "High",

    position: [
      17.7215,
      83.3013,
    ] as [number, number],
  },

  {
    name: "Suspicious Activity",
    risk: "Medium",

    position: [
      17.725,
      83.313,
    ] as [number, number],
  },
]

function getColor(
  risk: string
) {
  if (risk === "High")
    return "red"

  if (risk === "Medium")
    return "orange"

  return "green"
}

export default function MapClient({
  profile,
  onChangeProfile,
}: Props){
  const theme =
  profile === "Women Safety"
    ? {
        color: "#A855F7",
        glow: "bg-violet-400",
        overlay: "bg-violet-500/5",
      }
    : profile === "Student"
    ? {
        color: "#3B82F6",
        glow: "bg-blue-400",
        overlay: "bg-blue-500/5",
      }
    : profile ===
      "Senior Citizen"
    ? {
        color: "#22C55E",
        glow: "bg-green-400",
        overlay: "bg-green-500/5",
      }
    : profile === "Family"
    ? {
        color: "#F59E0B",
        glow: "bg-amber-400",
        overlay: "bg-amber-500/5",
      }
    : {
        color: "#06B6D4",
        glow: "bg-cyan-400",
        overlay: "bg-cyan-500/5",
      }

  const [nightMode,
    setNightMode] =
    useState(false)

  const [sosActive,
    setSosActive] =
    useState(false)

  const [destination,
    setDestination] =
    useState("RK Beach")

  

  const [selectedRoute,
    setSelectedRoute] =
    useState("Safest Route")

  const [transportMode,
    setTransportMode] =
    useState("Walk")

  const [reports,
    setReports] =
    useState<Report[]>([])

  const [bubbleOpen,
    setBubbleOpen] =
    useState(true)
    

  const [currentLocation,
    setCurrentLocation] =
    useState<
      [number, number]
    >([
      17.7215,
      83.3013,
    ])

  const [bubbleMessage,
    setBubbleMessage] =
    useState("")

  const [weather,
    setWeather] =
    useState({
      condition: "Sunny",
      temperature: 31,
    })

  const [travelConfidence,
    setTravelConfidence] =
    useState(94)
    const [arrivalTime,
  setArrivalTime] =
  useState("")

const [predictedSafety,
  setPredictedSafety] =
  useState(0)
      useEffect(() => {
    if (
      navigator.geolocation
    ) {
      navigator.geolocation.getCurrentPosition(
        (
          position
        ) => {
          setCurrentLocation([
            position.coords.latitude,
            position.coords.longitude,
          ])
        }
      )
    }
  }, [])

  useEffect(() => {
    switch (profile) {

      case "Student":
        setBubbleMessage(
          "📚 Student Mode Active. Prioritizing campuses, bus stops and student-safe zones."
        )
        break

      case "Women Safety":
        setBubbleMessage(
          "🌸 Women Safety Mode Active. Prioritizing well-lit routes, volunteers and emergency coverage."
        )
        break

      case "Senior Citizen":
        setBubbleMessage(
          "🏥 Senior Citizen Mode Active. Prioritizing hospitals and accessibility."
        )
        break

      case "Family":
        setBubbleMessage(
          "🏡 Family Mode Active. Prioritizing family-friendly routes and services."
        )
        break

      default: {

  const destinationScore =
    destinationData[
      destination as keyof typeof destinationData
    ].score

  setBubbleMessage(
    `Heading to ${destination}. Current safety score is ${destinationScore}.`
  )

  break
}
    }
  }, [
  profile,
  destination,
])

  useEffect(() => {

  setWeather(
    weatherByDestination[
      destination as keyof typeof weatherByDestination
    ]
  )

}, [destination])
  useEffect(() => {

  const now =
    new Date()

  const baseMinutes =
  destinationData[
    destination as keyof typeof destinationData
  ].distance

const travelMinutes =
  selectedRoute === "Safest Route"
    ? Math.round(
        baseMinutes * 1.4
      )
    : selectedRoute ===
      "Fastest Route"
    ? Math.round(
        baseMinutes * 0.9
      )
    : Math.round(
        baseMinutes * 1.15
      )

  const arrival =
    new Date(
      now.getTime() +
      travelMinutes * 60000
    )

  setArrivalTime(
    arrival.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )
  )

}, [
  selectedRoute,
  destination,
])
useEffect(() => {

  const destinationScore =
    destinationData[
      destination as keyof typeof destinationData
    ].score

  let prediction =
    destinationScore

  if (
    weather.condition ===
    "Cloudy"
  ) {
    prediction -= 5
  }
  if (
  weather.condition ===
  "Partly Cloudy"
) {
  prediction -= 2
}

  if (
    weather.condition ===
    "Windy"
  ) {
    prediction -= 3
  }

  const currentHour =
    new Date().getHours()

  if (currentHour >= 18) {
    prediction -= 8
  }

  prediction -=
    reports.length * 2

  setPredictedSafety(
    Math.max(
      prediction,
      40
    )
  )

}, [
  weather,
  reports,
  destination,
])
  
  useEffect(() => {

    let confidence = 95

    if (
      transportMode === "Walk"
    )
      confidence += 2

    if (
      transportMode === "Train"
    )
      confidence -= 4

    if (
      transportMode === "Flight"
    )
      confidence -= 8

    if (
      reports.length > 0
    )
      confidence -= reports.length * 2

    setTravelConfidence(
      Math.max(
        confidence,
        60
      )
    )

  }, [
    transportMode,
    reports,
  ])

  const currentDestination =
    destinationData[
      destination as keyof typeof destinationData
    ]

  const safetyScore =
    Math.max(
      currentDestination.score -
        reports.length * 3,
      40
    )

  const activateSOS =
    () => {
      setSosActive(true)
    }

  const routeOptions = [
    {
      
  name: "Safest Route",
  risk: "Very Low",
  time: "34 min",
  description:
    "Avoids risky areas and maximizes emergency coverage.",
},

    {
      
  name: "Fastest Route",
  risk: "Medium",
  time: "22 min",
  description:
    "Shortest travel time with moderate risk.",

    },

    {
  name: "Balanced Route",
  risk: "Low",
  time: "28 min",
  description:
    "Combines speed and safety.",
},
]///b

  const routeCoordinates: Record<
  string,
  [number, number][]
> = {
  "Safest Route": [
    currentLocation,
    [17.722, 83.292],
    [17.728, 83.297],
    currentDestination.position,
  ],

  "Fastest Route": [
    currentLocation,
    [17.724, 83.308],
    currentDestination.position,
  ],

  "Balanced Route": [
    currentLocation,
    [17.726, 83.300],
    [17.730, 83.304],
    currentDestination.position,
  ],
}

  return (
    <>
      
      <AnimatePresence>
        {bubbleOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.9,
            }}
            className="
              fixed
              bottom-44
              right-8
              z-[99999]
              w-[340px]
              rounded-3xl
              bg-gradient-to-br
              bg-white
              backdrop-blur-xl
              p-5
              shadow-2xl
            "
          >
            <h3 className="font-bold text-xl">
              🐧 Bubble AI
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              {bubbleMessage}
            </p>

            <div className="mt-4 rounded-xl bg-blue-50 p-3">
              <p className="font-semibold">
                Weather Update
              </p>

              <p className="text-sm mt-1">
                {weather.condition}
                {" • "}
                {weather.temperature}
                °C
              </p>
              <p className="text-xs mt-2 text-gray-600">

  {weather.condition === "Sunny" &&
    "☀️ Excellent visibility and safe travel conditions."}

  {weather.condition === "Cloudy" &&
    "☁️ Cloud cover detected. Visibility may slightly reduce."}

  {weather.condition === "Partly Cloudy" &&
    "🌤 Mixed weather conditions. Route remains safe."}

  {weather.condition === "Rain" &&
    "🌧 Rain detected. Slower travel and reduced visibility expected."}

  {weather.condition === "Windy" &&
    "🌬 Strong winds detected. Exercise caution in open areas."}

</p>
            </div>

            <div className="mt-3 rounded-xl bg-green-50 p-3">
              <p className="font-semibold">
                Travel Confidence
              </p>

              <p
  className={`text-sm mt-1 font-semibold ${
    travelConfidence >= 90
      ? "text-green-600"
      : travelConfidence >= 75
      ? "text-yellow-600"
      : "text-red-600"
  }`}
>
  {travelConfidence}%
</p>
            </div>

            <div className="mt-3 rounded-xl bg-purple-50 p-3">
              <p className="font-semibold">
                Recommended Route
              </p>

              <p className="text-sm mt-1">
                {selectedRoute}
              </p>
            </div>
            <div className="mt-3 rounded-xl bg-orange-50 p-3">

  <p className="font-semibold">
    ⏰ Arrival Forecast
  </p>

  <p className="text-sm mt-1">
  Estimated Arrival

  <span className="block text-lg font-bold">
    {arrivalTime}
  </span>
</p>

</div>

<div className="mt-3 rounded-xl bg-red-50 p-3">

  <p className="font-semibold">
    🛡 Predicted Safety
  </p>

  <p className="text-sm mt-1">
  {predictedSafety}

  {predictedSafety >= 85 &&
    " • Very Safe"}

  {predictedSafety < 85 &&
    predictedSafety >= 70 &&
    " • Safe"}

  {predictedSafety < 70 &&
    " • Travel Carefully"}
</p>

</div>
<div className="mt-3 rounded-xl bg-yellow-50 p-3">

  <p className="font-semibold">
    💡 AI Recommendation
  </p>

  <p className="text-sm mt-2">

    {predictedSafety >= 85 &&
      "Very safe journey. Recommended route is optimal."}

    {predictedSafety < 85 &&
      predictedSafety >= 70 &&
      "Safe overall. Stay alert near destination."}

    {predictedSafety < 70 &&
      "Use Safest Route. Conditions may worsen."}

  </p>

</div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="
          h-screen
          w-full
          relative
        "
      >
        {/* WEATHER OVERLAY */}

{weather.condition ===
  "Sunny" && (
    <SunnyWeather
  key={destination}
/>
)}

{weather.condition ===
  "Cloudy" && (
  <CloudyWeather
  key={destination}
/>
)}

{weather.condition ===
  "Partly Cloudy" && (
<PartlyCloudyWeather
  key={destination}
/>)}

{weather.condition ===
  "Rain" && (
    <RainWeather
  key={destination}
/>
)}

{weather.condition ===
  "Windy" && (
<WindyWeather
  key={destination}
/>)}
        <Dashboard
          profile={profile}
          destination={destination}
          setDestination={(value) => {
  setDestination(value)
}}
          safetyScore={safetyScore}
          routeName={currentDestination.route}
          riskLevel={currentDestination.risk}
          routeRisk={30}
          distance={currentDestination.distance}
          reportCount={reports.length}
          volunteers={volunteers}
          nearbyPlaces={currentDestination.nearby}
          nightMode={nightMode}
          toggleNightMode={() =>
            setNightMode(
              !nightMode
            )
          }
          onSOS={activateSOS}
          weatherCondition={
            weather.condition
          }
          temperature={
            weather.temperature
          }
          transportMode={
            transportMode
          }
          setTransportMode={
            setTransportMode
          }
          travelConfidence={
            travelConfidence
          }
          selectedRoute={
            selectedRoute
          }
          setSelectedRoute={
            setSelectedRoute
          }
          routeOptions={
            routeOptions
          }
          arrivalTime={arrivalTime}
predictedSafety={predictedSafety}
          onChangeProfile={
  onChangeProfile
}
        />

        {sosActive && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              fixed
              inset-0
              bg-black/70
              z-[99999]
              flex
              items-center
              justify-center
            "
          >
            <motion.div
              initial={{
                scale: 0.8,
              }}
              animate={{
                scale: 1,
              }}
              className={`
                rounded-3xl
                p-8
                w-[500px]
                shadow-2xl
                ${
                  nightMode
                    ? "bg-gray-900 text-white"
                    : "bg-white text-black"
                }
              `}
            >
              <h2
                className="
                  text-3xl
                  font-bold
                  text-red-600
                "
              >
                🚨 SOS ACTIVATED
              </h2>

              <div className="mt-5 space-y-3">
                <p>
                  📍 Live Location Shared
                </p>

                <p>
                  👮 Police Notified
                </p>

                <p>
                  🏥 Hospitals Notified
                </p>

                <p>
                  🙋 Volunteers Notified
                </p>
              </div>

              <button
                onClick={() =>
                  setSosActive(false)
                }
                className="
                  mt-6
                  bg-red-600
                  text-white
                  px-5
                  py-3
                  rounded-xl
                "
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
                <MapContainer
          center={currentLocation}
          zoom={13}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url={
              nightMode
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />

          {/* CURRENT LOCATION */}

          <CircleMarker
            center={currentLocation}
            radius={12}
            pathOptions={{
              color: "#00E5FF",
              fillColor: "#00E5FF",
              fillOpacity: 1,
            }}
          >
            <Popup>
              <div>
                <h2 className="font-bold">
                  📍 Current Location
                </h2>

                <p>
                  Protected Zone Active
                </p>
              </div>
            </Popup>
          </CircleMarker>

          <Circle
            center={currentLocation}
            radius={500}
            pathOptions={{
              color: "#00E676",
              fillColor: "#00E676",
              fillOpacity: 0.15,
            }}
          />

          {/* ROUTE */}

          <Polyline
  positions={
    routeCoordinates[
      selectedRoute as keyof typeof routeCoordinates
    ]
  }
  pathOptions={{
  color:
    selectedRoute === "Safest Route"
      ? "#22C55E"
      : selectedRoute === "Fastest Route"
      ? "#F97316"
      : "#3B82F6",

  weight: 7,
}}
/>
{/* SAFETY DENSITY */}
<Circle
  center={
    currentDestination.position
  }
  radius={900}
  pathOptions={{
    color: "#22C55E",
    fillColor: "#22C55E",
    fillOpacity: 0.06,
  }}
/>

<Circle
  center={
    currentDestination.position
  }
  radius={500}
  pathOptions={{
    color: "#EAB308",
    fillColor: "#EAB308",
    fillOpacity: 0.10,
  }}
/>

<Circle
  center={
    currentDestination.position
  }
  radius={220}
  pathOptions={{
    color: "#EF4444",
    fillColor: "#EF4444",
    fillOpacity: 0.18,
  }}
/>
<Circle
  center={
    currentDestination.position
  }
  radius={70}
  pathOptions={{
    color: "#FFFFFF",
    fillColor: "#FFFFFF",
    fillOpacity: 0.35,
  }}
/>

          {/* DESTINATION */}

          <CircleMarker
            center={
              currentDestination.position
            }
            radius={14}
            pathOptions={{
              color: "gold",
              fillColor: "gold",
              fillOpacity: 1,
            }}
          >
            <Popup>
              <div>
                <h2 className="font-bold">
                  🎯 Destination
                </h2>

                <p>
                  {destination}
                </p>

                <p>
                  Route:
                  {" "}
                  {
                    currentDestination.route
                  }
                </p>

                <p>
                  Risk:
                  {" "}
                  {
                    currentDestination.risk
                  }
                </p>
              </div>
            </Popup>
          </CircleMarker>

          {/* VOLUNTEERS */}

          {volunteers.map(
            (
              volunteer,
              index
            ) => (
              <CircleMarker
                key={index}
                center={
                  volunteer.position
                }
                radius={10}
                pathOptions={{
                  color: "#00E676",
                  fillColor:
                    "#00E676",
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <div>
                    <h2 className="font-bold">
                      🙋 Volunteer
                    </h2>

                    <p>
                      Distance:
                      {" "}
                      {
                        volunteer.distance
                      }
                    </p>

                    <p>
                      Rating:
                      {" "}
                      {
                        volunteer.rating
                      }
                      /5
                    </p>

                    <p>
                      Status:
                      {" "}
                      {
                        volunteer.status
                      }
                    </p>

                    <button
                      className="
                        mt-2
                        bg-green-600
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      "
                    >
                      Notify Volunteer
                    </button>
                  </div>
                </Popup>
              </CircleMarker>
            )
          )}

          {/* POLICE */}

          {policeStations.map(
            (
              station,
              index
            ) => (
              <CircleMarker
                key={index}
                center={
                  station.position
                }
                radius={12}
                pathOptions={{
                  color: "#2979FF",
                  fillColor:
                    "#2979FF",
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <div>
                    <h2 className="font-bold">
                      👮
                      {" "}
                      {station.name}
                    </h2>

                    <p>
                      Emergency Unit
                    </p>

                    <button
                      className="
                        mt-2
                        bg-blue-600
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      "
                    >
                      Contact Police
                    </button>
                  </div>
                </Popup>
              </CircleMarker>
            )
          )}

          {/* HOSPITALS */}

          {hospitals.map(
            (
              hospital,
              index
            ) => (
              <CircleMarker
                key={index}
                center={
                  hospital.position
                }
                radius={12}
                pathOptions={{
                  color: "#9C27B0",
                  fillColor:
                    "#9C27B0",
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <div>
                    <h2 className="font-bold">
                      🏥
                      {" "}
                      {hospital.name}
                    </h2>

                    <p>
                      Emergency Services
                    </p>

                    <button
                      className="
                        mt-2
                        bg-purple-600
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      "
                    >
                      Contact Hospital
                    </button>
                  </div>
                </Popup>
              </CircleMarker>
            )
          )}

          {/* UNSAFE ZONES */}

          {unsafeZones.map(
            (
              zone,
              index
            ) => (
              <CircleMarker
                key={index}
                center={
                  zone.position
                }
                radius={15}
                pathOptions={{
                  color:
                    getColor(
                      zone.risk
                    ),
                  fillColor:
                    getColor(
                      zone.risk
                    ),
                  fillOpacity:
                    0.8,
                }}
              >
                <Popup>
                  <div>
                    <h2 className="font-bold">
                      ⚠ {zone.name}
                    </h2>

                    <p>
                      Risk:
                      {" "}
                      {zone.risk}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            )
          )}

          {/* COMMUNITY REPORTS */}

          {reports.map(
            (
              report
            ) => (
              <CircleMarker
                key={report.id}
                center={
                  report.position
                }
                radius={14}
                pathOptions={{
                  color: "red",
                  fillColor:
                    "red",
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <div>
                    <h2 className="font-bold">
                      {report.name}
                    </h2>

                    <p>
                      {
                        report.description
                      }
                    </p>

                    <p className="text-red-600">
                      Community Alert
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            )
          )}
        </MapContainer>
      </div>
    </>
  )
}