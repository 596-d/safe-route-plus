"use client"

import {
  CircleMarker,
  Popup,
} from "react-leaflet"

const volunteers = [
  {
    id: 1,
    name: "Volunteer Rahul",
    position: [17.7235, 83.306],
    distance: "250m",
  },
  {
    id: 2,
    name: "Volunteer Priya",
    position: [17.728, 83.312],
    distance: "500m",
  },
  {
    id: 3,
    name: "Volunteer Kiran",
    position: [17.734, 83.325],
    distance: "900m",
  },
]

export default function VolunteerMarkers() {
  return (
    <>
      {volunteers.map((volunteer) => (
        <CircleMarker
          key={volunteer.id}
          center={
            volunteer.position as [
              number,
              number
            ]
          }
          radius={12}
          pathOptions={{
            color: "green",
            fillColor: "green",
            fillOpacity: 0.8,
          }}
        >
          <Popup>
            <div>
              <h3 className="font-bold">
                🟢 {volunteer.name}
              </h3>

              <p>
                Distance:
                {" "}
                {volunteer.distance}
              </p>

              <p>
                Available for emergency
                assistance
              </p>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  )
}