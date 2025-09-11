"use client";

import { useMemo } from "react";
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
];

export default function ScribbleWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // triggers recompute on route change

  const { scribble, posX, posY } = useMemo(() => {
    const scribbleIndex = Math.floor(Math.random() * scribbles.length);

    // random percentage positions from 0% to 100%
    const posX = Math.floor(Math.random() * 101);
    const posY = Math.floor(Math.random() * 101);

    return { scribble: scribbles[scribbleIndex], posX, posY };
  }, [pathname]);

  return (
    <div className="overflow-hidden relative min-h-screen w-screen h-screen">
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
      <div className="relative z-10">{children}</div>
    </div>
  );
}
