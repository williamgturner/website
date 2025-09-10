import { readdir } from "fs/promises";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const files = await readdir("public/images/photos");
    const photos = files
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/.test(file))
      .map((file) => `/images/photos/${file}`);
    return NextResponse.json(photos);
  } catch (err) {
    return NextResponse.json({ error: "Failed to read photos" }, { status: 500 });
  }
}
