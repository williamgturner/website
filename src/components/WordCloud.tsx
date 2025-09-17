"use client";

import { useEffect, useRef, useState } from "react";

type Word = {
  text: string;
  x: number;
  y: number;
  color: string;
  rotation: number;
  width: number;
  height: number;
};

interface WordCloudProps {
  words: string[];
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function WordCloud({ words }: WordCloudProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wordObjects, setWordObjects] = useState<Word[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    const shuffledWords = shuffleArray(words);

    const objs = shuffledWords.slice(0, 50).map((word) => {
      ctx.font = "20px sans-serif";
      const width = ctx.measureText(word).width;
      const height = 20;
      return {
        text: word,
        x: Math.random() * (window.innerWidth - width),
        y: Math.random() * (window.innerHeight - height),
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        rotation: (Math.random() - 0.5) * 0.5,
        width,
        height,
      };
    });

    setWordObjects(objs);
  }, [words]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wordObjects.forEach((word) => {
      ctx.save();
      ctx.translate(word.x + word.width / 2, word.y + word.height / 2);
      ctx.rotate(word.rotation);
      ctx.fillStyle = word.color;
      ctx.font = "1.25rem sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(word.text, 0, 0);
      ctx.restore();
    });
  };

  useEffect(() => {
    draw();
  }, [wordObjects]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const index = [...wordObjects].reverse().findIndex(
      (w) => mx >= w.x && mx <= w.x + w.width && my >= w.y && my <= w.y + w.height
    );
    if (index >= 0) {
      setDraggingIndex(wordObjects.length - 1 - index);
      setOffset({
        x: mx - wordObjects[wordObjects.length - 1 - index].x,
        y: my - wordObjects[wordObjects.length - 1 - index].y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const index = [...wordObjects].reverse().findIndex(
      (w) => mx >= w.x && mx <= w.x + w.width && my >= w.y && my <= w.y + w.height
    );

    setHoverIndex(index >= 0 ? wordObjects.length - 1 - index : null);

    if (draggingIndex !== null) {
      setWordObjects((prev) => {
        const newWords = [...prev];
        newWords[draggingIndex] = {
          ...newWords[draggingIndex],
          x: mx - offset.x,
          y: my - offset.y,
        };
        return newWords;
      });
    }
  };

  const handleMouseUp = () => setDraggingIndex(null);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        cursor:
          draggingIndex !== null
            ? "grabbing"
            : hoverIndex !== null
            ? "grab"
            : "default",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
