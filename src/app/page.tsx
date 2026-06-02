"use client"

import { useState } from "react"

import WelcomeScreen from "./components/WelcomeScreen"
import Map from "./components/Map"

export default function Home() {
  const [started, setStarted] =
    useState(false)

  if (!started) {
    return (
      <WelcomeScreen
        onStart={() =>
          setStarted(true)
        }
      />
    )
  }

  return <Map />
}