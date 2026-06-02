"use client"

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

const destinationData = {
  "RK Beach": {
    score: 88,
    risk: "Low",
    distance : 24,

    route:
      "Police Station Road",

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
    ] as [
      number,
      number
    ],
  },

  Rushikonda: {
    score: 70,

    risk: "Medium",

    route:
      "Hill Route",
      distance : 32,

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
    ] as [
      number,
      number
    ],
  },

  Jagadamba: {
    score: 82,

    risk: "Low",
    distance : 22,

    route:
      "Central Route",

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
    ] as [
      number,
      number
    ],
  },

  "MVP Colony": {
    score: 76,

    risk: "Medium",
    distance : 27,

    route:
      "MVP Main Road",

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
    ] as [
      number,
      number
    ],
  },

  Kailasagiri: {
    score: 91,

    risk: "Very Low",
    distance : 28,

    route:
      "Tourist Route",

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
    ] as [
      number,
      number
    ],
  },

  "Andhra University": {
    score: 84,

    risk: "Low",
    distance : 25,

    route:
      "University Road",

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
    ] as [
      number,
      number
    ],
  },

  "Dwaraka Nagar": {
    score: 72,

    risk: "Medium",
    distance : 22,

    route:
      "Commercial Route",

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
    ] as [
      number,
      number
    ],
  },
}
const volunteers: Volunteer[] =
  [
    {
      name: "Rahul",
      distance: "250m",
      rating: 4.8,
      status:
        "Available",
      phone:
        "9876543210",
      position: [
        17.7235,
        83.306,
      ],
    },

    {
      name: "Priya",
      distance: "420m",
      rating: 4.9,
      status:
        "Available",
      phone:
        "9876543211",
      position: [
        17.728,
        83.312,
      ],
    },

    {
      name: "Kiran",
      distance: "650m",
      rating: 4.6,
      status: "Busy",
      phone:
        "9876543212",
      position: [
        17.732,
        83.318,
      ],
    },
  ]

const policeStations = [
  {
    name:
      "MVP Police Station",

    position: [
      17.741,
      83.331,
    ] as [
      number,
      number
    ],
  },

  {
    name:
      "Police Control Room",

    position: [
      17.726,
      83.314,
    ] as [
      number,
      number
    ],
  },
]

const hospitals = [
  {
    name:
      "KGH Hospital",

    position: [
      17.719,
      83.308,
    ] as [
      number,
      number
    ],
  },

  {
    name:
      "Apollo Hospital",

    position: [
      17.733,
      83.319,
    ] as [
      number,
      number
    ],
  },
]

const unsafeZones = [
  {
    name:
      "Poor Lighting Zone",

    risk: "High",

    position: [
      17.7215,
      83.3013,
    ] as [
      number,
      number
    ],
  },

  {
    name:
      "Suspicious Activity",

    risk: "Medium",

    position: [
      17.725,
      83.313,
    ] as [
      number,
      number
    ],
  },
]

function getColor(
  risk: string
) {
  if (
    risk === "High"
  )
    return "red"

  if (
    risk === "Medium"
  )
    return "orange"

  return "green"
}

export default function MapClient() {
  const [nightMode, setNightMode] =
    useState(false)

  const [sosActive, setSosActive] =
    useState(false)

  const [destination, setDestination] =
    useState(
      "RK Beach"
    )

  const [reports, setReports] =
    useState<Report[]>(
      []
    )

  const [issueType, setIssueType] =
    useState(
      "Poor Lighting"
    )

  const [description, setDescription] =
    useState("")

  const [currentLocation, setCurrentLocation] =
    useState<
      [number, number]
    >([
      17.7215,
      83.3013,
    ])

  useEffect(() => {
    if (
      navigator.geolocation
    ) {
      navigator.geolocation.getCurrentPosition(
        (
          position
        ) => {
          setCurrentLocation(
            [
              position
                .coords
                .latitude,

              position
                .coords
                .longitude,
            ]
          )
        }
      )
    }
  }, [])

  const currentDestination =
    destinationData[
      destination as keyof typeof destinationData
    ]

  const safetyScore =
    Math.max(
      currentDestination.score -
        reports.length *
          3,
      40
    )

  const activateSOS =
    () => {
      setSosActive(
        true
      )
    }
      const addReport =
    () => {
      const newReport: Report =
        {
          id: Date.now(),

          name: issueType,

          description:
            description,

          position:
            currentLocation,

          risk: "High",
        }

      setReports([
        ...reports,
        newReport,
      ])

      setDescription(
        ""
      )
    }

  return (
    <div
      className="
        h-screen
        w-full
        relative
      "
    >
      <Dashboard
        destination={
          destination
        }
        setDestination={
          setDestination
        }
        safetyScore={
          safetyScore
        }
        routeName={
          currentDestination.route
        }
        nearbyPlaces={
          currentDestination.nearby
        }
        riskLevel={
          currentDestination.risk
        }
        routeRisk={30}
        distance={
  currentDestination.distance
}

        reportCount={
          reports.length
        }
        volunteers={
          volunteers
        }
        nightMode={
          nightMode
        }
        toggleNightMode={() =>
          setNightMode(
            !nightMode
          )
        }
        onSOS={
          activateSOS
        }
      />

      {sosActive && (
        <div
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
          <div
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
              🚨 SOS Activated
            </h2>

            <div className="mt-5 space-y-2">
              <p>
                📍 Location Shared
              </p>

              <p>
                👮 Police Notified
              </p>

              <p>
                🏥 Hospital Notified
              </p>

              <p>
                🙋 Volunteer Notified
              </p>
            </div>

            <div className="mt-5">
              <h3 className="font-bold">
                Nearest Volunteer
              </h3>

              <p>
                Rahul
              </p>

              <p>
                250m Away
              </p>

              <p>
                📞 9876543210
              </p>
            </div>

            <button
              onClick={() =>
                setSosActive(
                  false
                )
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
          </div>
        </div>
      )}

      <div
        className={`
          absolute
          bottom-5
          right-5
          z-[1000]
          w-[380px]
          rounded-3xl
          p-5
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
            font-bold
            text-xl
          "
        >
          Community Reporting
        </h2>

        <select
          value={
            issueType
          }
          onChange={(
            e
          ) =>
            setIssueType(
              e.target
                .value
            )
          }
          className={`
            w-full
            border
            p-3
            rounded-xl
            mt-3

            ${
              nightMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black"
            }
          `}
        >
          <option>
            Poor Lighting
          </option>

          <option>
            Harassment
          </option>

          <option>
            Suspicious Activity
          </option>

          <option>
            Accident
          </option>
        </select>
                <textarea
          value={
            description
          }
          onChange={(
            e
          ) =>
            setDescription(
              e.target
                .value
            )
          }
          rows={3}
          className={`
            w-full
            border
            p-3
            rounded-xl
            mt-3

            ${
              nightMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black"
            }
          `}
        />

        <button
          onClick={
            addReport
          }
          className="
            w-full
            mt-3
            bg-red-500
            text-white
            p-3
            rounded-xl
          "
        >
          Report Area
        </button>
      </div>

      <button
        onClick={
          activateSOS
        }
        className="
          fixed
          bottom-8
          right-8
          z-[99999]
          w-20
          h-20
          rounded-full
          bg-red-600
          text-white
          text-xl
          font-bold
          shadow-2xl
          animate-pulse
        "
      >
        SOS
      </button>

      <MapContainer
        center={
          currentLocation
        }
        zoom={13}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="
          &copy; OpenStreetMap contributors"
          url={
            nightMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />

        {/* CURRENT LOCATION */}

        <CircleMarker
          center={
            currentLocation
          }
          radius={12}
          pathOptions={{
            color: "blue",
            fillColor:
              "blue",
            fillOpacity: 1,
          }}
        >
          <Popup>
            <div>
              <h2 className="font-bold">
                📍 Current Location
              </h2>

              <p>
                Safe Bubble
                Active
              </p>
            </div>
          </Popup>
        </CircleMarker>

        {/* SAFETY BUBBLE */}

        <Circle
          center={
            currentLocation
          }
          radius={500}
          pathOptions={{
            color: "green",
            fillColor:
              "green",
            fillOpacity:
              0.15,
          }}
        />

        {/* ROUTE */}

        <Polyline
          positions={[
            currentLocation,
            currentDestination.position,
          ]}
          pathOptions={{
            color: "lime",
            weight: 6,
          }}
        />

        {/* DESTINATION */}

        <CircleMarker
          center={
            currentDestination.position
          }
          radius={14}
          pathOptions={{
            color:
              "gold",
            fillColor:
              "gold",
            fillOpacity: 1,
          }}
        >
          <Popup>
            <div>
              <h2 className="font-bold">
                🎯 Destination
              </h2>

              <p>
                {
                  destination
                }
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
        color: "green",
        fillColor:
          "green",
        fillOpacity: 1,
      }}
    >
      <Popup>
        <div>
          <h2 className="font-bold">
            🙋 {volunteer.name}
          </h2>

          <p>
            Distance:
            {" "}
            {volunteer.distance}
          </p>

          <p>
            Rating:
            {" "}
            {volunteer.rating}/5
          </p>

          <p>
            Status:
            {" "}
            {volunteer.status}
          </p>

          <p>
            📞
            {" "}
            {volunteer.phone}
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
            Contact Volunteer
          </button>
        </div>
      </Popup>
    </CircleMarker>
  )
)}


        {/* POLICE */}

        {policeStations.map(
          (station, index) => (
            <CircleMarker
              key={index}
              center={
                station.position
              }
              radius={12}
              pathOptions={{
                color: "blue",
                fillColor:
                  "blue",
                fillOpacity: 1,
              }}
            >
              <Popup>
  <div>
    <h2 className="font-bold">
      👮 {station.name}
    </h2>

    <p>
      Active Response Unit
    </p>

    <p>
      Distance: 1.2 km
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
          (hospital, index) => (
            <CircleMarker
              key={index}
              center={
                hospital.position
              }
              radius={12}
              pathOptions={{
                color:
                  "purple",
                fillColor:
                  "purple",
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
                    Emergency
                    Services
                    Available
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
          (zone, index) => (
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
                    ⚠
                    {" "}
                    {zone.name}
                  </h2>

                  <p>
                    Risk:
                    {" "}
                    {zone.risk}
                  </p>

                  <p>
                    Community
                    Alerts Active
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          )
        )}

        {/* USER REPORTS */}

        {reports.map(
          (report) => (
            <CircleMarker
              key={report.id}
              center={
                report.position
              }
              radius={15}
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
                    Community Report
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          )
        )}
      </MapContainer>
    </div>
  )
}