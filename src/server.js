import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "./cron/leaveCron.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("PaySpace → Roubler Sync Service Running");
});

app.listen(PORT, () => {
  console.log(` Server running on port ${3000}`);
});
