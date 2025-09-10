// app/api/spotify-top-tracks/route.ts
import { NextRequest } from "next/server"
import type { SpotifyApi } from "spotify-api"

// ✅ Environment variables
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!

const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64")

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
  })

  if (!res.ok) throw new Error("Failed to get access token")
  const data: { access_token: string } = await res.json()
  return data.access_token
}

type SimplifiedTrack = {
  title: string
  artist: string
  album: string
  albumImageUrl?: string
  songUrl: string
}

async function getTopTracks(accessToken: string): Promise<SimplifiedTrack[]> {
  const res = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  )

  if (!res.ok) throw new Error(`Spotify API error: ${res.status}`)
  const data: SpotifyApi.UsersTopTracksResponse = await res.json()

  return data.items.map((track: SpotifyApi.TrackObjectFull) => ({
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images?.[0]?.url,
    songUrl: track.external_urls.spotify,
  }))
}

export async function GET(_req: NextRequest) {
  try {
    const token = await getAccessToken()
    const tracks = await getTopTracks(token)
    return Response.json(tracks)
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error fetching tracks"
    return Response.json(
      { error: "Failed to fetch top tracks", details: message },
      { status: 500 }
    )
  }
}
