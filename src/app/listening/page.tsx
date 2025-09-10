"use client"; // ✅ Required for useState/useEffect

import { useEffect, useState } from "react";
import Image from "next/image";
import type { TopTrack } from "../api/spotify-top-tracks";

export default function Listening() {
  const [tracks, setTracks] = useState<TopTrack[]>([]);

  useEffect(() => {
    fetch("/api/spotify-top-tracks")
      .then((res) => res.json())
      .then(setTracks)
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1>my top tracks</h1>
      <ul className="space-y-2">
        {tracks.map((track) => (
          <li key={track.songUrl} className="flex items-center space-x-4 hover:bg-gray-100">
            {track.albumImageUrl && (
              <Image
                src={track.albumImageUrl}
                alt={track.title}
                width={64}
                height={64}
                className="rounded"
              />
            )}
            <div>
              <a href={track.songUrl} target="_blank" rel="noopener noreferrer">
                {track.title}
              </a>
              <div className="text-sm text-gray-600">{track.artist}</div>
              <div className="text-sm text-gray-500">{track.album}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
