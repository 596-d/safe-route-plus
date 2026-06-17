"use client"

import dynamic from "next/dynamic"

type Props = {
  profile: string
  onChangeProfile: () => void
}

const MapClient = dynamic(
  () => import("./MapClient"),
  {
    ssr: false,
  }
)

export default function Map({
  profile,
  onChangeProfile,
}: Props) {
  return (
    <MapClient
      profile={profile}
      onChangeProfile={
        onChangeProfile
      }
    />
  )
}