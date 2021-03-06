import cors from "cors";
import express from "express";
import helmet from "helmet";
import Redis from "ioredis";
import { handleMinesweeperGet, handleMinsweeperPost } from "./minesweeper";
import { handleSudokuGet, handleSudokuPost } from "./sudoku";
import { handleTetrisGet, handleTetrisPost } from "./tetris";

const PORT = process.env.PORT || 4000;
const ORIGIN_URL =
  process.env.NODE_ENV === "dev"
    ? "http://localhost:3000"
    : "https://react-games-misute.netlify.app";

export const redis = new Redis(process.env.REDIS_URL);

const app = express();

app.use(helmet());

app.use(cors({ origin: ORIGIN_URL }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/minesweeper/leaderboard/:difficulty", handleMinesweeperGet);
app.get("/api/sudoku/leaderboard", handleSudokuGet);
app.get("/api/tetris/leaderboard", handleTetrisGet);

app.post("/api/minesweeper/post/:difficulty", handleMinsweeperPost);
app.post("/api/sudoku/post", handleSudokuPost);
app.post("/api/tetris/post", handleTetrisPost);

app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
