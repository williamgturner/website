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

// Possible positions
const positions = [
  "top left",
  "top center",
  "top right",
  "center left",
  "center",
  "center right",
  "bottom left",
  "bottom center",
  "bottom right",
];

export default function ScribbleWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // triggers recompute on route change

  const { scribble, position } = useMemo(() => {
    const scribbleIndex = Math.floor(Math.random() * scribbles.length);
    const positionIndex = Math.floor(Math.random() * positions.length);
    return {
      scribble: scribbles[scribbleIndex],
      position: positions[positionIndex],
    };
  }, [pathname]);

  return (
    <div className="overflow-hidden relative min-h-screen w-screen h-screen">
      <div
        className="absolute inset-0 h-screen w-screen pointer-events-none z-0"
        style={{
          backgroundImage: `url(${scribble})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: position,
          backgroundSize: "50%",
          opacity: 0.05,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
