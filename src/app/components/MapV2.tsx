"use client"

import { useEffect, useState } from "react"

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

import Dashboard from "./Dashboard"
import SOSButton from "./SOSButton"
import VolunteerMarkers from "./VolunteerMarkers"
import SafetyBubble from "./SafetyBubble"
import ReportHistory from "./ReportHistory"

import { findSafestRoute } from "../../algorithms/dijkstra"

const locations = [
  {
    id: 1,
    name: "Poor Lighting Zone",
    position: [17.7215, 83.3013],
    risk: "high",
    description:
      "Multiple unsafe reports at night.",
  },

  {
    id: 2,
    name: "Crowded Safe Area",
    position: [17.7265, 83.315],
    risk: "low",
    description:
      "High public activity and lighting.",
  },

  {
    id: 3,
    name: "Medium Risk Street",
    position: [17.715, 83.295],
    risk: "medium",
    description:
      "Low crowd density after 9 PM.",
  },
]

const routeCoordinates = {
  RailwayStation: [17.7215, 83.3013],

  PoliceStation: [17.7265, 83.315],

  HospitalJunction: [17.7315, 83.322],

  RKBeach: [17.7355, 83.3305],

  Jagadamba: [17.7245, 83.309],
}

function getColor(risk: string) {
  switch (risk) {
    case "high":
      return "red"

    case "medium":
      return "orange"

    case "low":
      return "green"

    default:
      return "blue"
  }
}

export default function MapV2() {
  const [destination, setDestination] =
    useState("RKBeach")

  const [nightMode, setNightMode] =
    useState(false)

  const [issueType, setIssueType] =
    useState("Poor Lighting")

  const [description, setDescription] =
    useState("")

  const [reports, setReports] =
    useState<any[]>([])

  const [currentLocation, setCurrentLocation] =
    useState<[number, number]>([
      17.7215,
      83.3013,
    ])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ])
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const route = findSafestRoute(
    "RailwayStation",
    destination
  )

  const linePositions =
    route.safestPath.map(
      (place) =>
        routeCoordinates[
          place as keyof typeof routeCoordinates
        ]
    )

  const safetyScore = Math.max(
    100 - route.totalRisk * 10,
    20
  )

  const addReport = () => {
    const newReport = {
      id: Date.now(),

      name: issueType,

      position: currentLocation,

      risk: "high",

      description:
        description ||
        `${issueType} reported`,
    }

    setReports([
      ...reports,
      newReport,
    ])

    setDescription("")
  }
    return (
    <div
      className={
        nightMode
          ? "h-screen w-full bg-black text-white relative"
          : "h-screen w-full bg-white relative"
      }
    >

      <Dashboard
        safetyScore={safetyScore}
        destination={destination}
        routeRisk={route.totalRisk}
        reportCount={reports.length}
        nightMode={nightMode}
        toggleNightMode={() =>
          setNightMode(!nightMode)
        }
      />

      <ReportHistory
        reports={reports}
      />

      <SOSButton />

      <div
        className="
          absolute
          bottom-5
          left-5
          z-[1000]
          w-[350px]
          bg-white/80
          backdrop-blur-lg
          rounded-3xl
          shadow-2xl
          p-4
        "
      >
        <h2 className="font-bold text-xl">
          Community Reporting
        </h2>

        <select
          value={issueType}
          onChange={(e) =>
            setIssueType(
              e.target.value
            )
          }
          className="
            w-full
            border
            rounded-xl
            p-2
            mt-3
          "
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

          <option>
            Road Block
          </option>
        </select>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          rows={3}
          placeholder="
Describe issue..."
          className="
            w-full
            border
            rounded-xl
            p-2
            mt-3
          "
        />

        <button
          onClick={addReport}
          className="
            w-full
            mt-3
            bg-red-500
            text-white
            p-3
            rounded-xl
          "
        >
          Report Unsafe Area
        </button>

        <div
          className="
            mt-4
            p-3
            bg-green-100
            rounded-xl
          "
        >
          <p>
            Current Safety Score
          </p>

          <p
            className="
              text-2xl
              font-bold
              text-green-700
            "
          >
            {safetyScore}
          </p>
        </div>

        <div
          className="
            mt-4
            p-3
            bg-blue-100
            rounded-xl
          "
        >
          <h3 className="font-bold">
            Route Analysis
          </h3>

          <p>
            Risk:
            {" "}
            {route.totalRisk}
          </p>

          <p>
            Route:
          </p>

          <p>
            {route.safestPath.join(
              " → "
            )}
          </p>
        </div>
      </div>

      <MapContainer
        center={currentLocation}
        zoom={13}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="
&copy; OpenStreetMap contributors"
          url="
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CircleMarker
          center={
            currentLocation
          }
          radius={12}
          pathOptions={{
            color: "blue",
            fillColor: "blue",
            fillOpacity: 1,
          }}
        >
          <Popup>
            Your Current
            Location
          </Popup>
        </CircleMarker>

        <SafetyBubble
          center={
            currentLocation
          }
        />

        <VolunteerMarkers />
                {linePositions.length > 1 && (
          <Polyline
            positions={
              linePositions as [
                number,
                number
              ][]
            }
            pathOptions={{
              color: "green",
              weight: 6,
            }}
          />
        )}

        {[...locations, ...reports].map(
          (location) => (
            <CircleMarker
              key={location.id}
              center={
                location.position as [
                  number,
                  number
                ]
              }
              radius={15}
              pathOptions={{
                color: getColor(
                  location.risk
                ),
                fillColor: getColor(
                  location.risk
                ),
                fillOpacity: 0.7,
              }}
            >
              <Popup>
                <div className="p-2">
                  <h2 className="text-lg font-bold">
                    {location.name}
                  </h2>

                  <p className="mt-2 text-sm">
                    {location.description}
                  </p>

                  <div className="mt-3">
                    <span className="font-semibold">
                      Risk Level:
                    </span>{" "}
                    <span
                      style={{
                        color: getColor(
                          location.risk
                        ),
                      }}
                    >
                      {location.risk.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          )
        )}
      </MapContainer>
    </div>
  )
}