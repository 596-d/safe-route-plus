"use client"

type Report = {
  id: number
  name: string
  description: string
}

type Props = {
  reports: Report[]
}

export default function ReportHistory({
  reports,
}: Props) {
  return (
    <div
      className="
        absolute
        top-5
        right-5
        z-[1000]
        w-[320px]
        bg-white/80
        backdrop-blur-lg
        rounded-3xl
        shadow-2xl
        p-4
      "
    >
      <h2 className="text-xl font-bold">
        Report History
      </h2>

      {reports.length === 0 ? (
        <p className="mt-3 text-gray-500">
          No reports yet
        </p>
      ) : (
        <div className="mt-3 space-y-3 max-h-[400px] overflow-auto">
          {reports.map((report) => (
            <div
              key={report.id}
              className="
                p-3
                rounded-xl
                bg-red-50
                border
              "
            >
              <p className="font-bold">
                {report.name}
              </p>

              <p className="text-sm text-gray-600">
                {report.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}