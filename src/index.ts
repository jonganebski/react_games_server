import cors from "cors";
import express from "express";
import helmet from "helmet";
import Redis from "ioredis";
import path from "path";
import { handleMinesweeperGet, handleMinsweeperPost } from "./minesweeper";
import { handleSudokuGet, handleSudokuPost } from "./sudoku";
import { handleTetrisGet, handleTetrisPost } from "./tetris";

const PORT = process.env.PORT || 4000;

export const redis = new Redis(process.env.REDIS_URL);
const app = express();

const buildPath = path.join(__dirname, "..", "..", "build");

app.use(helmet());

process.env.NODE_ENV === "dev" &&
  app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.static(buildPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/minesweeper/leaderboard/:difficulty", handleMinesweeperGet);
app.get("/api/sudoku/leaderboard", handleSudokuGet);
app.get("/api/tetris/leaderboard", handleTetrisGet);

app.post("/api/minesweeper/post/:difficulty", handleMinsweeperPost);
app.post("/api/sudoku/post", handleSudokuPost);
app.post("/api/tetris/post", handleTetrisPost);

app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
