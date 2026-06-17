"use client"

export default function SafetyTimeline() {

  const timeline = [
    {
      label: "Morning",
      score: 92,
      color: "bg-green-500",
    },

    {
      label: "Afternoon",
      score: 84,
      color: "bg-lime-500",
    },

    {
      label: "Evening",
      score: 72,
      color: "bg-yellow-500",
    },

    {
      label: "Night",
      score: 58,
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
        📈 Safety Timeline
      </h3>

      <p
        className="
          text-sm
          text-gray-500
          mb-6
        "
      >
        Safety trend throughout the day
      </p>

      <div className="space-y-4">

        {timeline.map((item) => (

          <div
            key={item.label}
          >

            <div
              className="
                flex
                justify-between
                mb-1
              "
            >

              <span
                className="
                  font-medium
                "
              >
                {item.label}
              </span>

              <span
                className="
                  font-bold
                "
              >
                {item.score}
              </span>

            </div>

            <div
              className="
                h-3
                rounded-full
                bg-slate-200
                overflow-hidden
              "
            >

              <div
                className={`
                  h-full
                  ${item.color}
                `}
                style={{
                  width: `${item.score}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

      <div
        className="
          mt-6
          rounded-xl
          bg-slate-100
          p-3
        "
      >

        <p
          className="
            font-semibold
          "
        >
          🧠 AI Observation
        </p>

        <p
          className="
            text-sm
            mt-2
          "
        >
          Safety generally decreases
          after sunset due to reduced
          visibility and lower crowd
          density.
        </p>

      </div>

    </div>
  )
}