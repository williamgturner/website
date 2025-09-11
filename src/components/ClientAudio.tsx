"use client";

import { useEffect, useRef } from "react";

export default function ClientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleClick = () => {
      if (audioRef.current && audioRef.current.muted) {
        audioRef.current.muted = false;
        audioRef.current.play();
      }
      window.removeEventListener("click", handleClick);
    };

    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <audio
      ref={audioRef}
      id="site-audio"
      controls
      loop
      autoPlay
      muted
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 999,
        width: "200px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        borderRadius: "8px",
      }}
    >
      <source src="/audio/dawn-chorus.mp3" type="audio/mpeg" />
    </audio>
  );
}
