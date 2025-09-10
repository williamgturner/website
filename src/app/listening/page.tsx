"use client";

import { useEffect, useState } from "react";

type Track = {
  title: string;
  artist: string;
  album: string;
  albumImageUrl?: string;
  songUrl: string;
};

export default function TopTracks() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/spotify-top-tracks")
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTracks(data)
        } else {
          console.error("Unexpected response:", data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading…</div>

  return (
    <ul>
      {tracks.map((track) => (
        <li key={track.songUrl}>{track.title} — {track.artist}</li>
      ))}
    </ul>
  )
}
