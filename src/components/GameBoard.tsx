import React from "react";
import "./GameBoard.css";

interface GameBoardProps {
  board: number[][];
  currentPiece: {
    shape: number[][];
    pos: { x: number; y: number };
  };
}

const GameBoard: React.FC<GameBoardProps> = ({ board, currentPiece }) => {
  const renderCell = (value: number, x: number, y: number) => {
    let cellClass = "cell";
    if (value === 1) cellClass += " block";
    if (value === 2) cellClass += " mission-block";

    // Check if current block hides the cell
    const relX = x - currentPiece.pos.x;
    const relY = y - currentPiece.pos.y;
    if (
      relY >= 0 &&
      relY < currentPiece.shape.length &&
      relX >= 0 &&
      relX < currentPiece.shape[relY].length &&
      currentPiece.shape[relY][relX]
    ) {
      cellClass += " active-piece";
    }

    return <div key={`${x}-${y}`} className={cellClass}></div>;
  };

  return (
    <div className="game-board">
      {board.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => renderCell(cell, x, y))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
