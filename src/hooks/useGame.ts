import { useState, useEffect } from "react";
import { randomTetromino, TETROMINOS } from "../utils/tetrominos";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const createEmptyBoard = (): number[][] =>
  Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0));

//Beginning board with generated mission blocks
const createBoardWithMissionBlocks = (): number[][] => {
  const board = createEmptyBoard();
  for (let y = BOARD_HEIGHT - 5; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      if (Math.random() < 0.05) {
        board[y][x] = 2; // 2 = mission block
      }
    }
  }
  return board;
};

const rotateMatrix = (matrix: number[][], dir: number) => {
  // Rotate matrix at 90 deg (clockwise direction)
  const rotated = matrix[0].map((_, i) => matrix.map((row) => row[i]));
  if (dir > 0) return rotated.map((row) => row.reverse());
  return rotated.reverse();
};

export const useGame = (onMissionComplete: () => void) => {
  const [board, setBoard] = useState<number[][]>(
    createBoardWithMissionBlocks()
  );
  const [currentPiece, setCurrentPiece] = useState(() => ({
    shape: randomTetromino().shape,
    pos: { x: 3, y: 0 },
  }));
  const [nextPiece, setNextPiece] = useState(randomTetromino());
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [upgrades, setUpgrades] = useState<
    { name: string; description: string }[]
  >([]);

  // Check collision
  const checkCollision = (shape: number[][], pos: { x: number; y: number }) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newY = pos.y + y;
          const newX = pos.x + x;
          if (
            newY >= BOARD_HEIGHT || //  Bottom edge
            newX < 0 || // Left edge
            newX >= BOARD_WIDTH || // Right edge
            (newY >= 0 && board[newY][newX] !== 0) // Collision with the existing block
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Add bricks to the board
  const mergePieceToBoard = () => {
    const newBoard = board.map((row) => row.slice());
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const newY = currentPiece.pos.y + y;
          const newX = currentPiece.pos.x + x;
          if (newY >= 0) newBoard[newY][newX] = 1;
        }
      });
    });
    return newBoard;
  };

  // Remove line and count points
  const clearLines = (b: number[][]) => {
    let cleared = 0;
    const newBoard = b.filter((row) => {
      if (row.every((cell) => cell !== 0)) {
        cleared++;
        return false; // remove line
      }
      return true;
    });
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }
    setScore((prev) => prev + cleared * 100 * level);
    return newBoard;
  };

  const dropPiece = (hardDrop = false) => {
    const nextPos = {
      ...currentPiece.pos,
      y: currentPiece.pos.y + 1,
    };
    if (!checkCollision(currentPiece.shape, nextPos)) {
      setCurrentPiece((prev) => ({
        ...prev,
        pos: nextPos,
      }));
    } else {
      // Add fallen block to the board
      const newBoard = mergePieceToBoard();
      const clearedBoard = clearLines(newBoard);
      setBoard(clearedBoard);

      // Check if all mission blocks have been removed
      const missionBlocksLeft = clearedBoard.some((row) => row.includes(2));
      if (!missionBlocksLeft) {
        setLevel((prev) => prev + 1);
        setUpgrades([
          { name: "⌚Slow Down", description: "Slow down falling at 50%" },
          { name: "💣Bomb", description: "Remove 3x3 area" },
          { name: "↩️Undo", description: "Undo your last turn" },
        ]);
        onMissionComplete();
        return;
      }

      // Check game over status
      if (currentPiece.pos.y <= 0) {
        setGameOver(true);
        return;
      }

      // Next block
      setCurrentPiece({
        shape: nextPiece.shape,
        pos: { x: 3, y: 0 },
      });
      setNextPiece(randomTetromino());
    }
  };

  const movePiece = (dir: number) => {
    const nextPos = {
      ...currentPiece.pos,
      x: currentPiece.pos.x + dir,
    };
    if (!checkCollision(currentPiece.shape, nextPos)) {
      setCurrentPiece((prev) => ({
        ...prev,
        pos: nextPos,
      }));
    }
  };

  const rotatePiece = (dir: number) => {
    const rotated = rotateMatrix(currentPiece.shape, dir);
    if (!checkCollision(rotated, currentPiece.pos)) {
      setCurrentPiece((prev) => ({
        ...prev,
        shape: rotated,
      }));
    }
  };

  const startGame = () => {
    setBoard(createBoardWithMissionBlocks());
    setCurrentPiece({
      shape: randomTetromino().shape,
      pos: { x: 3, y: 0 },
    });
    setNextPiece(randomTetromino());
    setLevel(1);
    setScore(0);
    setGameOver(false);
  };

  const applyUpgrade = (upgrade: { name: string; description: string }) => {
    console.log("Applied upgrade:", upgrade.name);
    // To be extended
  };

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      dropPiece();
    }, 1000 / level);
    return () => clearInterval(interval);
  }, [currentPiece, level, gameOver]);

  return {
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
    upgrades,
    applyUpgrade,
  };
};
