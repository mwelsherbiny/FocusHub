import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import apiRouter from "./routers/apiRouter.js";
import errorHandler from "./middleware/errorHandler.js";
import connectToDB from "./utils/connectToDB.js";
import morgan from "morgan";

await connectToDB();

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(apiRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(errorHandler);

export default app;
