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
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("/api/spotify-top-tracks")
      .then(res => res.json())
      .then((data: Track[]) => setTracks(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-gray-500">
        Loading{dots}
      </div>
    );
  }

  if (tracks.length === 0) {
    return <div className="text-gray-500">No tracks found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4">what i&apos;ve been listening to recently</h1>
      <ul className="space-y-2">
        {tracks.map(track => (
          <li key={track.songUrl} className="flex items-center space-x-4">
            {track.albumImageUrl && (
              <img
                src={track.albumImageUrl}
                alt={track.album}
                className="w-12 h-12 object-cover"
              />
            )}
            <div>
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {track.title}
              </a>
              <div className="text-sm text-gray-600">{track.artist}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
