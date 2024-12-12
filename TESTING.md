# Vest Fullstack Assessment Testing

Hey there! If you're reading this, you're testing the app I made. The process should be fairly simple but you'll need to make sure you have some basic pre-requisites first.

## General Setup

Make sure you have nvm installed: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

Make sure you have the correct verison of node (v20.18.1)

```
nvm install v20.18.1
```

Make sure you're using the correct version of npm (10.8.2)

```
npm install npm@10.8.2 -g
```

## Backend

Run these commands from the base directory (where this TESTING.md doc is)

```
cd backend
npm install
node server.js
```

## Frontend

Run these commands from the base directory

```
cd frontend
npm install
npm run dev
```

## Testing

Most of what you see is non functional UI with some placeholders, with a few exceptions:

1. The Chart. This initially pulls a set of data from the backend, and then updates via websockets. It also renders emoji reactions. If you zoom out to 1h you'll be able to see some of the default emoji reactions!

2. The Interval Button. The 1m dropdown button near the chart _is_ clickable. You can change the interval between:

- 1m
- 1h
- 1d

3. Market Details. Above the chart and in the trade form the price, 24h change, and 1h funding are populated by websocket data.

4. Leverage and Liquidation. The trade form also has a mock implementation of liquidation price so you can observe the leverage affecting your trade. This is is not hooked up to order size and does not make any assumptions about a user's free collateral.

5. Market selector. It's not super pretty since it was getting late, but it enables the user to select between ETH/USDC and BTC/USDC.

Some things I didn't get to that I would like to:

1. Emoji drag and drop. Implementing the drag and drop felt like it would take an inordinate amount of time given the time constraints so I opted not to do it. The biggest challenge here seems to be calculating the timestamp relative to position on the chart.

2. General code cleanup.
