import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

app.post("/api/visit", (req, res) => {
  const stats = JSON.parse(fs.readFileSync("./data/stats.json"));
  stats.visits += 1;
  fs.writeFileSync("./data/stats.json", JSON.stringify(stats, null, 2));
  res.json({ message: "Visit counted" });
});

app.get("/api/stats", (req, res) => {
  const stats = JSON.parse(fs.readFileSync("./data/stats.json"));
  res.json(stats);
});

app.listen(5000, () => console.log("Server running on port 5000"));
