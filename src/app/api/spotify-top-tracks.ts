// pages/api/spotify-top-tracks.ts
import fetch from "node-fetch";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });
  const data = await res.json();
  return data.access_token;
}

async function getTopTracks(accessToken: string) {
  const res = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);

  const data = await res.json();
  return data.items.map((track: any) => ({
    title: track.name,
    artist: track.artists.map((a: any) => a.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images?.[0]?.url,
    songUrl: track.external_urls.spotify,
  }));
}

export default async function handler(req: any, res: any) {
  try {
    const token = await getAccessToken();
    const tracks = await getTopTracks(token);
    res.status(200).json(tracks);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch top tracks", details: err.message });
  }
}
