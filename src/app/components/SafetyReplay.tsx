"use client"

export default function SafetyReplay() {

  const replayData = [
    {
      time: "08:00",
      score: 94,
      status: "Safe",
      color: "bg-green-500",
    },

    {
      time: "13:00",
      score: 86,
      status: "Crowded",
      color: "bg-yellow-500",
    },

    {
      time: "18:00",
      score: 75,
      status: "Moderate Risk",
      color: "bg-orange-500",
    },

    {
      time: "21:00",
      score: 58,
      status: "Poor Lighting",
      color: "bg-red-500",
    },
  ]

  return (
    <div
      className="
        rounded-3xl
        bg-white
        p-5
        shadow-xl
        border
      "
    >

      <h3
        className="
          text-lg
          font-bold
          mb-4
        "
      >
        🕒 Safety Replay
      </h3>

      <p
        className="
          text-sm
          text-gray-500
          mb-4
        "
      >
        Historical safety intelligence
      </p>

      <div className="space-y-3">

        {replayData.map((item) => (

          <div
            key={item.time}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              bg-slate-50
              p-3
            "
          >

            <div>

              <p className="font-semibold">
                {item.time}
              </p>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                {item.status}
              </p>

            </div>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className={`
                  w-3
                  h-3
                  rounded-full
                  ${item.color}
                `}
              />

              <span
                className="
                  font-bold
                "
              >
                {item.score}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}