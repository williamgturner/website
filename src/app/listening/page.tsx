"use client";
import { useEffect, useState } from "react";

export default function TopTracks() {
  const [tracks, setTracks] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/spotify-top-tracks")
      .then(res => res.json())
      .then(data => setTracks(data))
      .catch(console.error);
  }, []);

  return (
    <ul>
      {tracks.map(track => (
        <li key={track.songUrl}>
          {track.title} — {track.artist}
        </li>
      ))}
    </ul>
  );
}
