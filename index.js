// index.js
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { runAgentPipeline } from "./agent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "views")));

app.get("/api/story", async (req, res) => {
  try {
    const topic = req.query.topic || "默认新闻主题";
    const result = await runAgentPipeline({ topic });
    res.json(result.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Agent pipeline failed" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "story.html"));
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
