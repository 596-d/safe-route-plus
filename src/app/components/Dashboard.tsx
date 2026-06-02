"use client"

type Volunteer = {
  name: string
  distance: string
  rating: number
  status: string
  phone: string
}

type Props = {
  destination: string
  setDestination: (
    value: string
  ) => void

  safetyScore: number

  routeName: string

  riskLevel: string

  reportCount: number

  volunteers: Volunteer[]

  nearbyPlaces: string[]

  nightMode: boolean

  toggleNightMode: () => void

  onSOS: () => void
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

export default function Dashboard({
  destination,
  setDestination,
  safetyScore,
  routeName,
  riskLevel,
  reportCount,
  volunteers,
  nearbyPlaces,
  nightMode,
  toggleNightMode,
  onSOS,
}: Props) {
  return (
    <div
      className={`
      absolute
      top-5
      left-5
      z-[1000]
      w-[340px]
      h-[90vh]
      overflow-y-auto
      rounded-3xl
      shadow-2xl
      p-5
      ${
        nightMode
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      }
    `}
    >
      <h1
        className="
        text-3xl
        font-bold
      "
      >
        🛡 SafeRoute+
      </h1>

      <p
        className="
        opacity-70
        text-sm
        mt-1
      "
      >
        Smart Community Safety
      </p>

      {/* DESTINATION */}

      <div className="mt-5">
        <label
          className="
          block
          font-semibold
          mb-2
        "
        >
          Select Destination
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

      {/* SAFETY SCORE */}

      <div
        className="
        mt-5
        bg-green-100
        rounded-2xl
        p-4
      "
      >
        <h3 className="font-bold text-green-700">
          Safety Score
        </h3>

        <p
          className="
          text-4xl
          font-bold
          text-green-700
        "
        >
          {safetyScore}
        </p>
      </div>

      {/* ROUTE COMPARISON */}

      <div
        className="
        mt-4
        border
        rounded-2xl
        p-4
      "
      >
        <h3 className="font-bold">
          Route Comparison
        </h3>

        <div className="mt-3">
          <p className="font-semibold">
            Shortest Route
          </p>

          <p>
            Distance:
            2.1 km
          </p>

          <p>
            Risk:
            8.5
          </p>
        </div>

        <div className="mt-4">
          <p className="font-semibold text-green-600">
            Safest Route
          </p>

          <p>
            {routeName}
          </p>

          <p>
            Risk:
            {riskLevel}
          </p>

          <p className="font-bold text-green-600">
            74% Safer
          </p>
        </div>
      </div>

      {/* NEARBY PLACES */}

      <div
        className="
        mt-4
        border
        rounded-2xl
        p-4
      "
      >
        <h3 className="font-bold mb-3">
          Nearby Places
        </h3>

        {nearbyPlaces?.map(
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

      {/* EMERGENCY RESOURCES */}

      <div
        className="
        mt-4
        border
        rounded-2xl
        p-4
      "
      >
        <h3 className="font-bold mb-3">
          Emergency Resources
        </h3>

        <p>
          👮 MVP Police Station
        </p>

        <p>
          🏥 KGH Hospital
        </p>

        <p>
          🚺 Women Helpline
        </p>

        <p>
          🏥 Apollo Hospital
        </p>
      </div>

      {/* REPORTS */}

      <div
        className="
        mt-4
        border
        rounded-2xl
        p-4
      "
      >
        <h3 className="font-bold">
          Community Reports
        </h3>

        <p
          className="
          text-red-500
          font-bold
          text-xl
        "
        >
          {reportCount}
        </p>
      </div>

      {/* VOLUNTEERS */}

      <div
        className="
        mt-4
        border
        rounded-2xl
        p-4
      "
      >
        <h3 className="font-bold mb-3">
          Nearby Volunteers
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
                {
                  volunteer.name
                }
              </p>

              <p>
                {
                  volunteer.distance
                }
              </p>

              <p>
                ⭐
                {
                  volunteer.rating
                }
              </p>

              <p>
                {
                  volunteer.status
                }
              </p>

              <p>
                📞
                {
                  volunteer.phone
                }
              </p>
            </div>
          )
        )}
      </div>

      {/* NIGHT MODE */}

      <button
        onClick={toggleNightMode}
        className="
        mt-4
        w-full
        bg-gray-800
        text-white
        p-3
        rounded-xl
      "
      >
        {nightMode
          ? "☀ Day Mode"
          : "🌙 Night Mode"}
      </button>

      {/* SOS */}

      <button
        onClick={onSOS}
        className="
        mt-4
        w-full
        bg-red-600
        text-white
        p-4
        rounded-xl
        font-bold
      "
      >
        🚨 Emergency SOS
      </button>
    </div>
  )
}