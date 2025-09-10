// pages/top-tracks.tsx
import { useEffect, useState } from "react";

type Track = {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};

export default function Listening() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      const res = await fetch("/api/spotify-top-tracks");
      const data = await res.json();
      setTracks(data);
      setLoading(false);
    }
    fetchTracks();
  }, []);

  if (loading) return <p>Loading top tracks...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Top Spotify Tracks</h1>
      <ul className="space-y-4">
        {tracks.map((track, i) => (
          <li key={i} className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded">
            {track.albumImageUrl && (
              <img src={track.albumImageUrl} alt={track.album} className="w-16 h-16 object-cover rounded" />
            )}
            <div>
              <a href={track.songUrl} target="_blank" rel="noopener noreferrer" className="font-semibold">
                {track.title}
              </a>
              <p className="text-sm text-gray-600">
                {track.artist} — {track.album}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
