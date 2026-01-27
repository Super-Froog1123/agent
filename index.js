// index.js
import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { runAgent } from "./agent.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 输入页（最简）
app.get("/", (req, res) => {
  res.send(`
    <form method="POST" action="/generate">
      <textarea name="prompt" rows="10" cols="80"
        placeholder="输入新闻 brief"></textarea><br><br>
      <button type="submit">生成页面</button>
    </form>
  `);
});

// 生成页
app.post("/generate", async (req, res) => {
  const userInput = req.body.prompt || "";

  try {
    const { article, pageStructure } = await runAgent(userInput);

    // 写入临时 EJS
    fs.writeFileSync(
      path.join(__dirname, "views", "generated.ejs"),
      pageStructure,
      "utf-8"
    );

    // 渲染（只传 article）
    res.render("generated", { article });

  } catch (err) {
    console.error(err);
    res.status(500).send("Agent error");
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
