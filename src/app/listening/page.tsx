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
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetch("/api/spotify-top-tracks")
      .then(res => res.json())
      .then((data: Track[]) => setTracks(data))
      .catch(console.error);
  }, []);

  return (
    <ul className="space-y-2">
      {tracks.map((track) => (
        <li key={track.songUrl} className="flex items-center space-x-4">
          {track.albumImageUrl && (
            <img src={track.albumImageUrl} alt={track.album} className="w-12 h-12 object-cover" />
          )}
          <div>
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {track.title}
            </a>
            <div className="text-sm text-gray-600">{track.artist}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
