"use client"

type Props = {
  currentSafety: number

  predictedSafety: number

  currentTime: string

  arrivalTime: string

  weather: string
}

export default function SafetyForecast({
  currentSafety,
  predictedSafety,
  currentTime,
  arrivalTime,
  weather,
}: Props) {

  const difference =
    predictedSafety - currentSafety

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
        🧠 Predictive Safety Forecast
      </h3>

      <div className="space-y-3">

        <div>
          <p className="text-gray-500">
            Current Time
          </p>

          <p className="font-semibold">
            {currentTime}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Current Safety
          </p>

          <p className="font-semibold text-green-600">
            {currentSafety}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Predicted Safety
          </p>

          <p
            className={`
              font-semibold
              ${
                predictedSafety >= 80
                  ? "text-green-600"
                  : predictedSafety >= 60
                  ? "text-yellow-600"
                  : "text-red-600"
              }
            `}
          >
            {predictedSafety}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Change
          </p>

          <p
            className={
              difference >= 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {difference > 0
              ? "+"
              : ""}
            {difference}
          </p>
        </div>

        <div
          className="
            rounded-xl
            bg-slate-100
            p-3
          "
        >
          <p className="font-semibold">
            Reason
          </p>

          <p className="text-sm mt-2">

            Weather:
            {" "}
            {weather}

            <br />

            Prediction based on:

            <br />

            • Arrival Time

            <br />

            • Community Reports

            <br />

            • Weather Conditions

            <br />

            • Safety Trends

          </p>
        </div>

      </div>

    </div>
  )
}