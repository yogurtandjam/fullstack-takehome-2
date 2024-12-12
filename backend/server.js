const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample data
let emojiReactions = {
  "2024-12-12T00:00:00Z": [
    { userId: "user1", emoji: "🚀" },
    { userId: "user2", emoji: "😎" },
  ],
  "2024-12-12T01:00:00Z": [
    { userId: "user3", emoji: "😡" },
    { userId: "user4", emoji: "😭" },
  ],
};

app.post("/addReaction", (req, res) => {
  const { timestamp, userId, emoji } = req.body;
  if (!emojiReactions[timestamp]) {
    emojiReactions[timestamp] = [];
  }
  emojiReactions[timestamp].push({ userId, emoji });
  res.status(200).send("Reaction added");
});

app.get("/getReactions", (req, res) => {
  res.json(emojiReactions);
});

const BASE_VEST_URL = "https://serverprod.vest.exchange/v2";
const DEFAULT_OPTIONS = {
  headers: {
    xrestservermm: "restserver0",
  },
};
app.get("/lines", (req, res) => {
  const {
    symbol = "ETH-PERP",
    interval = "1m",
    limit = "60",
    startTime,
    endTime,
  } = req.query;

  // Calculate default time range if not provided
  const now = Date.now();
  const defaultStartTime = now - 60 * 30 * 1000; // 30 minutes ago
  const defaultEndTime = now;

  const queryStartTime = startTime || defaultStartTime;
  const queryEndTime = endTime || defaultEndTime;
  console.log(queryStartTime, queryEndTime, symbol, interval);
  // Construct the URL with query parameters
  const url = `${BASE_VEST_URL}/klines?symbol=${encodeURIComponent(
    symbol
  )}&interval=${encodeURIComponent(
    interval
  )}&startTime=${queryStartTime}&endTime=${queryEndTime}&limit=${encodeURIComponent(
    limit
  )}`;

  console.log("lines url", url);
  fetch(url, DEFAULT_OPTIONS)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

app.get("/ticker/24hr", (req, res) => {
  const { symbols = "ETH-PERP" } = req.query;
  const url = `${BASE_VEST_URL}/ticker/24hr?symbols=${symbols}`;
  console.log("24hr url", url);
  fetch(url, DEFAULT_OPTIONS)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch 24hr ticker data" });
    });
});

app.get("/ticker/latest", (req, res) => {
  const { symbols = "ETH-PERP" } = req.query;
  const url = `${BASE_VEST_URL}/ticker/latest?symbols=${symbols}`;
  console.log("latest url", url);
  fetch(url, DEFAULT_OPTIONS)
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch Latest ticker data" });
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
  console.log("changed");
});
