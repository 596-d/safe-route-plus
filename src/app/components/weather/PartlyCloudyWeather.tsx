"use client"

import SunnyWeather from "./SunnyWeather"
import CloudyWeather from "./CloudyWeather"

export default function PartlyCloudyWeather() {
  return (
    <>
      <SunnyWeather />
      <CloudyWeather />
    </>
  )
}