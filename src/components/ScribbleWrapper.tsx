"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const scribbles = [
  "/images/scribble0.svg",
  "/images/scribble1.svg",
  "/images/scribble2.svg",
  "/images/scribble3.svg",
  "/images/scribble4.svg",
  "/images/scribble5.svg",
  "/images/scribble6.svg",
  "/images/scribble7.svg",
  "/images/scribble8.svg",
  "/images/scribble9.svg",
  "/images/scribble10.svg",
  "/images/scribble11.svg",
  "/images/scribble12.svg",
  "/images/scribble13.svg",
  "/images/scribble14.svg",
  "/images/scribble15.svg",
];

export default function ScribbleWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [clientOnly, setClientOnly] = useState(false);

  // Ensure randomization happens only on client
  useEffect(() => setClientOnly(true), []);

  const { scribble, posX, posY } = useMemo(() => {
    if (!clientOnly) return { scribble: "", posX: 0, posY: 0 }; // placeholder for SSR

    const scribbleIndex = Math.floor(Math.random() * scribbles.length);
    const posX = Math.floor(Math.random() * 101);
    const posY = Math.floor(Math.random() * 101);

    return { scribble: scribbles[scribbleIndex], posX, posY };
  }, [pathname, clientOnly]);

  return (
    <div className="overflow-hidden relative min-h-screen w-screen h-screen">
      {clientOnly && (
        <div
          className="absolute inset-0 h-screen w-screen pointer-events-none z-0"
          style={{
            backgroundImage: `url(${scribble})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `${posX}% ${posY}%`,
            backgroundSize: "50%",
            opacity: 0.05,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
