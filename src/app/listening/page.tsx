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

  useEffect(() => {
    fetch("/api/spotify-top-tracks")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTracks(data);
        } else {
          console.error("Unexpected response:", data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="mt-4">Loading…</div>;

  return (
    <div className="p-4">
      <h1 className="mb-4">What I&apos;ve Been Listening to ecently</h1>
      <ul className="space-y-4">
        {tracks.map((track) => (
          <li key={track.songUrl} className="flex items-center gap-3 hover:bg-[darkorange] hover:text-[white]">
            {track.albumImageUrl && (
              <img
                src={track.albumImageUrl}
                alt={`${track.album} cover`}
                className="w-12 h-12"
              />
            )}
            <div>
              <div>
                <a
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer">
                  {track.title}
                </a>
              </div>
              <div className="text-sm">
                {track.artist}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
