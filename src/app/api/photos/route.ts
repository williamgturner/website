import { NextResponse } from "next/server";
import photos from "../../../../photos.json";

export async function GET() {
  const paths = photos.map((file) => `/images/photos/${file}`);
  return NextResponse.json(paths);
}
