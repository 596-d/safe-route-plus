"use client"

import { useState } from "react"

import LoginScreen from "./components/LoginScreen"
import WelcomeScreen from "./components/WelcomeScreen"
import ProfileSelection from "./components/ProfileSelection"
import Map from "./components/Map"

export default function Home() {
  const [loggedIn, setLoggedIn] =
    useState(false)

  const [started, setStarted] =
    useState(false)

  const [profileSelected, setProfileSelected] =
    useState(false)

  const [profile, setProfile] =
    useState("Standard")

  if (!loggedIn) {
    return (
      <LoginScreen
        onLogin={() =>
          setLoggedIn(true)
        }
      />
    )
  }

  if (!started) {
    return (
      <WelcomeScreen
        onStart={() =>
          setStarted(true)
        }
      />
    )
  }

  if (!profileSelected) {
    return (
      <ProfileSelection
        onSelect={(selectedProfile) => {
          setProfile(selectedProfile)
          setProfileSelected(true)
        }}
      />
    )
  }

  return (
    <Map
      profile={profile}
      onChangeProfile={() =>
        setProfileSelected(false)
      }
    />
  )
}