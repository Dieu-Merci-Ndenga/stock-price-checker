# Tickerline

Tickerline is a personal market desk for quick stock lookups and two-stock comparisons. It shows a current quote, tracks one like per anonymized IP address, and turns the API response into a readable snapshot instead of exposing raw JSON as the main interface.

## What makes it mine

- A custom Tickerline identity and market-desk interface
- A focused green, paper, and gold visual system designed for scanning
- Single-stock lookup and head-to-head comparison workflows
- Responsive layout for desktop and mobile screens
- Privacy-conscious like tracking using SHA-256 IP hashes
- Self-hosted browser assets with a restrictive Content Security Policy

## Run locally

1. Install dependencies with `npm install`.
2. Add a MongoDB connection string to `.env` as `DB=...`.
3. Start the app with `npm start`.
4. Open `http://localhost:3000`.

Set `NODE_ENV=test` to run the five FreeCodeCamp functional tests during startup. The stock quote data comes from the FreeCodeCamp stock proxy, so an internet connection is required for lookups.

## Project map

- `server.js` configures Express, Helmet, static files, and routes.
- `api.js` handles quotes, likes, and relative-like calculations.
- `index.html`, `style.css`, and `script.js` make up the Tickerline interface.
- `models.js` and `DB-module.js` manage the MongoDB persistence layer.
- `tests/2_functional-tests.js` contains the end-to-end API checks.
# [Stock Price Checker](https://freecodecamp.org/learn/information-security/information-security-projects/stock-price-checker)