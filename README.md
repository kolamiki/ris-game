# 🎮Ris

A **Rogue-like twist on classic Tetris** built with **React + TypeScript**.  
Clear mission blocks, survive increasingly challenging rounds, and purchase upgrades to dominate the board.

## ✨ Features

- **Classic Tetris mechanics** – rotate, move, and drop pieces
- **Rogue-like progression** – randomly generated initial board each round
- **Mission blocks** – special colored blocks that must be cleared to advance
- **Upgrades shop** – spend your score between rounds on one-time power-ups
- **Ghost piece** – see where the current piece will land
- **Board bounce effect** – subtle animation when a piece lands
- **Responsive design** – works in modern desktop browsers

## 🕹 Controls

| Key     | Action                         |
| ------- | ------------------------------ |
| `←`     | Move piece left                |
| `→`     | Move piece right               |
| `↓`     | Soft drop                      |
| `Space` | Hard drop                      |
| `Q`     | Rotate piece counter-clockwise |
| `E`     | Rotate piece clockwise         |

_(Optional: You can easily add `↑` or `W` for rotation in the code.)_

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/rogue-tetris.git
cd rogue-tetris
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 📂 Project Structure

```bash
src/
├── components/
│   ├── GameBoard.tsx      # Main board with cells rendering
│   ├── Sidebar.tsx        # Score, level, next piece preview
│   ├── UpgradeMenu.tsx    # Upgrade selection after a round
├── hooks/
│   ├── useGame.ts         # Core game logic (pieces, collisions, lines)
├── utils/
│   ├── tetrominos.ts      # Piece definitions and generator
├── styles/
│   ├── *.css              # Traditional CSS styling
└── App.tsx                # Root component
```

### 🧠 Game Loop

Start a round – a random initial board is generated with mission blocks.

Clear lines – remove both normal and mission blocks.

Mission complete – once all mission blocks are gone, the round ends.

Upgrade phase – choose one-time power-ups before the next round.

Increase difficulty – faster drop speed, more complex starting boards.

### 💡 Possible Upgrades

Slow Down – temporarily reduce fall speed

Bomb – destroy a 3×3 area

Undo – revert the last drop

Swap – replace current piece with a random one

### 🖌 Visual Effects

Ghost piece landing preview

Board bounce animation when a piece lands

Pulsating mission blocks

Gradient-colored tetrominos

### 📜 License

MIT – free to use and modify.
