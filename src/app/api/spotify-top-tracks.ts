import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64");

interface SpotifyArtist {
  name: string;
}

interface SpotifyAlbum {
  name: string;
  images?: { url: string }[];
}

interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: { spotify: string };
}

export interface TopTrack {
  title: string;
  artist: string;
  album: string;
  albumImageUrl?: string;
  songUrl: string;
}

async function getAccessToken(): Promise<string> {
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
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

async function getTopTracks(accessToken: string): Promise<TopTrack[]> {
  const res = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);

  const data = (await res.json()) as { items: SpotifyTrack[] };
  return data.items.map((track) => ({
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images?.[0]?.url,
    songUrl: track.external_urls.spotify,
  }));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TopTrack[] | { error: string; details: string }>
) {
  try {
    const token = await getAccessToken();
    const tracks = await getTopTracks(token);
    res.status(200).json(tracks);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch top tracks",
      details: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
