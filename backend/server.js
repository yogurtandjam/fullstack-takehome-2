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
    const {
        symbol = 'ETH-PERP',
        interval = '1m',
        limit = '60',
        startTime,
        endTime,
    } = req.query;

    // Calculate default time range if not provided
    const now = Date.now();
    const defaultStartTime = now - 60 * 30 * 1000; // 30 minutes ago
    const defaultEndTime = now;

    const queryStartTime = startTime || defaultStartTime;
    const queryEndTime = endTime || defaultEndTime;

    // Construct the URL with query parameters
    const url = `https://serverprod.vest.exchange/v2/klines?symbol=${encodeURIComponent(
        symbol
    )}&interval=${encodeURIComponent(interval)}&startTime=${queryStartTime}&endTime=${queryEndTime}&limit=${encodeURIComponent(
        limit
    )}`;

    fetch(url, {
        headers: {
            xrestservermm: 'restserver0',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Response:', data);
            res.status(200).json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
        });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
    console.log('changed')
});
