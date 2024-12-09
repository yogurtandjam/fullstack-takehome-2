const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sample data
let emojiReactions = {
    "2024-06-24T00:00:00Z": [
        { "userId": "user1", "emoji": "🚀" },
        { "userId": "user2", "emoji": "😎" }
    ],
    "2024-06-24T01:00:00Z": [
        { "userId": "user3", "emoji": "😡" },
        { "userId": "user4", "emoji": "😭" }
    ]
};

app.post('/addReaction', (req, res) => {
    const { timestamp, userId, emoji } = req.body;
    if (!emojiReactions[timestamp]) {
        emojiReactions[timestamp] = [];
    }
    emojiReactions[timestamp].push({ userId, emoji });
    res.status(200).send('Reaction added');
});

app.get('/getReactions', (req, res) => {
    res.json(emojiReactions);
});

// TODO: add request params
app.get('/lines', (req, res) => {
    console.log('lines')
    const now = Date.now()
    const oneHourAgo = now - (60 * 30 * 1000)
    fetch(`https://serverprod.vest.exchange/v2/klines?symbol=ETH-PERP&interval=1m&startTime=${oneHourAgo}&endTime=${now}&limit=60`, {
        "headers": {
          "xrestservermm": "restserver0",
        },
      }).then(r => r.json()).then(r => {
        console.log('r', r)
        res.status(200).json(r)
});
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
    console.log('changed')
});
