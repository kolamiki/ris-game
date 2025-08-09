// src/App.tsx
import React, { useState } from "react";
import UpgradeMenu from "./components/UpgradeMenu";
import { useGame } from "./hooks/useGame";
import GameBoard from "./components/GameBoard";

const App: React.FC = () => {
  const [inUpgrade, setInUpgrade] = useState(false);
  const {
    board,
    currentPiece,
    nextPiece,
    level,
    score,
    gameOver,
    startGame,
    movePiece,
    rotatePiece,
    dropPiece,
    clearMissionBlocks,
    upgrades,
    applyUpgrade,
  } = useGame(() => setInUpgrade(true));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (gameOver || inUpgrade) return;

    switch (e.key) {
      case "ArrowLeft":
        movePiece(-1);
        break;
      case "ArrowRight":
        movePiece(1);
        break;
      case "ArrowDown":
        dropPiece();
        break;
      case " ":
        dropPiece(true); // hard drop
        break;
      case "q":
      case "Q":
        rotatePiece(-1);
        break;
      case "e":
      case "E":
        rotatePiece(1);
        break;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1 className="text-4xl font-bold mb-4">Rogue Tetris</h1>
      {gameOver ? (
        <div className="text-center">
          <p className="text-2xl mb-4">Game Over</p>
          <button
            className="px-4 py-2 bg-green-600 rounded"
            onClick={startGame}
          >
            Restart
          </button>
        </div>
      ) : inUpgrade ? (
        <UpgradeMenu
          upgrades={upgrades}
          onSelect={(upgrade) => {
            applyUpgrade(upgrade);
            setInUpgrade(false);
          }}
        />
      ) : (
        <>
          <GameBoard board={board} currentPiece={currentPiece} />
          <div className="mt-4 flex gap-6">
            <div>Score: {score}</div>
            <div>Level: {level}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
