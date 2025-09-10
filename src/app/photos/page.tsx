"use client";

import { useEffect, useState } from "react";

export default function Photos() {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data))
      .catch(console.error);
  }, []);

  const cols = 5; // number of columns
  const rowHeight = 30; // approximate height per row in vw

  return (
    <div className="relative w-full min-h-[200vh] p-4">
      {photos.map((src, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;

        const baseTop = row * rowHeight;
        const baseLeft = col * (100 / cols);

        const offsetTop = (Math.random() - 0.5) * 5; // ±2.5vw
        const offsetLeft = (Math.random() - 0.5) * 10; // ±5%

        const rotate = (Math.random() - 0.5) * 10; // ±5 deg
        const scale = 0.95 + Math.random() * 0.1;

        const minWidth = 12;
        const maxWidth = 22;
        const width = minWidth + Math.random() * (maxWidth - minWidth);

        // Clamp left so images never go fully off-screen
        const finalLeft = Math.min(Math.max(baseLeft + offsetLeft, -width / 2), 95 - width);

        // Clamp top so images never go off the container
        const finalTop = Math.max(baseTop + offsetTop, 0);

        return (
          <img
            key={i}
            src={src}
            alt={`Photo ${i}`}
            className="absolute object-cover opacity-0 transition-opacity duration-700"
            style={{
              top: `${finalTop}vw`,
              left: `${finalLeft}%`,
              width: `${width}vw`,
              transform: `rotate(${rotate}deg) scale(${scale})`,
              zIndex: i,
              transitionDelay: `${i * 100}ms`,
            }}
            onLoad={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "1";
            }}
          />
        );
      })}
    </div>
  );
}
