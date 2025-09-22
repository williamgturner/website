"use client";
import { useState } from "react";

export default function AStar() {
  const [grid, setGrid] = useState(createGrid(20, 20));

  const toggleWall = (r, c) => {
    const newGrid = grid.map(row =>
      row.map(cell =>
        cell.row === r && cell.col === c
          ? { ...cell, isWall: !cell.isWall }
          : cell
      )
    );
    setGrid(newGrid);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">A* Visualizer</h1>
      <div className="grid grid-cols-20 gap-0">
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onMouseDown={() => toggleWall(r, c)}
              className={`w-6 h-6 border
                ${cell.isWall ? "bg-gray-800" : "bg-white"}
                ${cell.isStart ? "bg-green-500" : ""}
                ${cell.isGoal ? "bg-red-500" : ""}
              `}
            />
          ))
        )}
      </div>
    </div>
  );
}

function createGrid(rows, cols) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      row: r,
      col: c,
      isWall: false,
      isStart: r === 0 && c === 0,
      isGoal: r === rows - 1 && c === cols - 1,
    }))
  );
}
