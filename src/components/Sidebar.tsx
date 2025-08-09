import React from "react";
import "./Sidebar.css";

interface SidebarProps {
  score: number;
  level: number;
  nextPiece: number[][];
  gameOver: boolean;
  startGame: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  score,
  level,
  nextPiece,
  gameOver,
  startGame,
}) => {
  return (
    <div className="sidebar">
      <h2>Tetris Rogue</h2>
      <div className="score">
        <p>Score: {score}</p>
        <p>Level: {level}</p>
      </div>
      <div className="next-piece">
        <h3>Next</h3>
        {nextPiece.map((row, y) => (
          <div key={y} className="next-row">
            {row.map((cell, x) => (
              <div key={x} className={`next-cell ${cell ? "block" : ""}`}></div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={startGame}>{gameOver ? "Restart" : "Start"}</button>
    </div>
  );
};
