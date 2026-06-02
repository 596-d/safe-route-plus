"use client"

import { Circle } from "react-leaflet"

type Props = {
  center: [number, number]
}

export default function SafetyBubble({
  center,
}: Props) {
  return (
    <Circle
      center={center}
      radius={500}
      pathOptions={{
        color: "green",
        fillColor: "green",
        fillOpacity: 0.1,
      }}
    />
  )
}