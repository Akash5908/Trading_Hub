# Trading Hub - Technical Documentation

## Project Overview

Trading Hub is a **real-time cryptocurrency trading platform** that provides live price tracking, interactive candlestick charts, and trading capabilities for BTC, ETH, and SOL pairs against USDT.

---

## Features Implemented

### Core Features
- **Real-time Candlestick Charts** - TradingView-style charts using Lightweight Charts
- **Multiple Timeframes** - 1-minute and 1-second candle updates
- **Currency Switching** - BTC, ETH, SOL pairs
- **Live Trading** - Open/close positions (Long/Short)
- **Real-time P&L** - Profit/loss calculation with live updates
- **Position Management** - Track and manage open orders
- **Historical Data** - Stored in PostgreSQL for both 1m and 1s candles

### Real-time Updates
- **1-Minute Candles**: Live updates from Binance Kline stream
- **1-Second Candles**: Aggregated from individual trades in real-time
- **Price Ticker**: Live price display updates
- **P&L Updates**: Real-time profit/loss calculation via WebSocket

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              TRADING HUB SYSTEM                             │
└─────────────────────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │  Binance API     │
                    │  (WebSocket)     │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ Kline Stream│  │ Trade Stream│  │ Kline Stream│
    │  (1 min)   │  │ (1 sec)    │  │  (1 min)   │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           │                │                │
           └────────────────┼────────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  Price Poller    │
                   │   (Port 5000)   │
                   └────────┬────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
    ┌─────────────────┐         ┌─────────────────┐
    │  Redis Streams  │         │  Redis Streams  │
    │  live-btc/sol/eth          │  trade-btc/sol/eth
    └────────┬────────┘         └────────┬────────┘
              │                          │
              │          ┌─────────────┘
              │          │
              ▼          ▼
    ┌─────────────────┬─┴───────────────────────┐
    │                 │                         │
    ▼                 ▼                         ▼
┌───────────┐  ┌──────────────┐  ┌──────────────────────┐
│   Engine  │  │ HTTP Server  │  │   HTTP Server        │
│ (Port 5002)│  │ (Port 5001) │  │   1s Aggregator     │
└─────┬─────┘  └──────┬───────┘  └──────────┬─────────┘
      │                │                     │
      │   ┌────────────┘                     │
      │   │              ┌───────────────────┘
      │   │              │
      ▼   ▼              ▼
┌─────────────────────────────────────────────────┐
│                  Frontend (Next.js)             │
│                  (Port 3000)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────┐│
│  │Live Chart   │  │Trading Panel│  │Positions ││
│  │(Lightweight)│  │             │  │Table     ││
│  └─────────────┘  └─────────────┘  └──────────┘│
└─────────────────────────────────────────────────┘
```

---

## Services Overview

### 1. Price Poller (Port 5000)

**Purpose**: Collects real-time market data from Binance WebSocket API

**Data Sources**:
- Binance Kline Stream (`@kline_1m`) - 1-minute candlestick updates
- Binance Trade Stream (`@trade`) - Individual trade data (for 1-second candles)

**Streams Published to Redis**:
| Stream Name | Data Type | Description |
|-------------|-----------|-------------|
| `live-btc` | Kline (1m) | Live BTC/USDT candle data |
| `live-sol` | Kline (1m) | Live SOL/USDT candle data |
| `live-eth` | Kline (1m) | Live ETH/USDT candle data |
| `trade-btc` | Trade | Individual BTC trades |
| `trade-sol` | Trade | Individual SOL trades |
| `trade-eth` | Trade | Individual ETH trades |

**Key Implementation**:
```typescript
// Kline stream (1-minute candles)
if (k.x) {  // k.x = true means candle is closed
  await redis.xAdd(`klines-${ticker}`, "*", { /* closed candle */ });
} else {    // Live update
  await redis.xAdd(`live-${ticker}`, "*", { /* live candle */ });
}

// Trade stream (for 1-second aggregation)
await redis.xAdd(`trade-${ticker}`, "*", {
  price: trade.p,
  quantity: trade.q,
  timestamp: trade.T
});
```

---

### 2. Engine (Port 5002)

**Purpose**: Central hub for order management, P&L calculation, and real-time price broadcasting

**Three Main Loops**:

#### a) Live Price Reader
- Reads from `live-btc/sol/eth` Redis streams
- Updates price state
- Broadcasts `*_LIVE` events to WebSocket clients

#### b) Trade Reader
- Reads from `trade-btc/sol/eth` Redis streams
- Broadcasts `*_TRADE` events for 1-second chart updates

#### c) Order Processor
- Reads from `trade-stream` (order queue)
- Handles `create-order` and `close-order` operations
- Sends responses via `callback-queue`

**WebSocket Events**:
| Event | Direction | Payload |
|-------|-----------|---------|
| `BTC_LIVE` | Server → Client | `{ time, open, high, low, close }` |
| `BTC_TRADE` | Server → Client | `{ price, quantity, timestamp }` |
| `SOL_LIVE` | Server → Client | `{ time, open, high, low, close }` |
| `SOL_TRADE` | Server → Client | `{ price, quantity, timestamp }` |
| `ETH_LIVE` | Server → Client | `{ time, open, high, low, close }` |
| `ETH_TRADE` | Server → Client | `{ price, quantity, timestamp }` |
| `open-orders` | Server → Client | Full order object |
| `close-orders` | Server → Client | Full order object |
| `positions-update` | Server → Client | `{ id, currentPnl, positionValue }` |

**Real-time P&L via Proxy Pattern**:
```typescript
const priceHandler = {
  set(target, prop, value) {
    target[prop] = value;
    updatePosition();  // Recalculate P&L for all open orders
    return true;
  }
};
const watchedPrices = new Proxy(Prices, priceHandler);
```

---

### 3. HTTP Server (Port 5001)

**Purpose**: REST API for trading operations and historical data storage

**Two Data Storage Systems**:

#### a) 1-Minute Data Storage (poller.ts)
- Subscribes to Redis channels
- Stores closed candles to PostgreSQL tables

#### b) 1-Second Data Aggregation (poller_1sec.ts)
- Reads from Redis trade streams
- Aggregates trades into 1-second candles
- Stores to `Btc_1_sec`, `Sol_1_sec`, `Eth_1_sec` tables

**API Endpoints**:
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/trade/btc-klines?duration=1s` | GET | Get BTC 1-second candles |
| `/api/v1/trade/btc-klines` | GET | Get BTC 1-minute candles |
| `/api/v1/trade/sol-klines?duration=1s` | GET | Get SOL 1-second candles |
| `/api/v1/trade/sol-klines` | GET | Get SOL 1-minute candles |
| `/api/v1/trade/eth-klines?duration=1s` | GET | Get ETH 1-second candles |
| `/api/v1/trade/eth-klines` | GET | Get ETH 1-minute candles |
| `/api/v1/trade/open` | POST | Open a new position |
| `/api/v1/trade/close` | POST | Close an existing position |

---

### 4. Frontend (Port 3000)

**Tech Stack**:
- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Lightweight Charts (TradingView-style)

**Key Components**:

#### DashboardPage
- WebSocket connection management
- Currency (BTC/ETH/SOL) selector
- Timeframe (1m/1s) selector
- Chart data state management

#### tradingChart.tsx
- Candlestick chart rendering
- Real-time updates via `series.update()`
- Timeframe-aware time formatting
- Handles both 1m and 1s data

#### OrdersPage
- Open positions display
- Real-time P&L updates
- Close position functionality

#### TradingPanel
- Buy/Sell interface
- Quantity input
- Balance display

---

## Data Flow

### 1-Minute Candle Update
```
Binance Kline WS → Price Poller → Redis (live-*) → Engine → WebSocket → Frontend → Chart
```

### 1-Second Candle Update
```
Binance Trade WS → Price Poller → Redis (trade-*) → Engine → WebSocket → Frontend
                                                                         ↓
                                                           Aggregate trades to candles
                                                                         ↓
                                                                    Chart Update
```

### Order Creation Flow
```
Frontend → HTTP Server → Redis (trade-stream) → Engine
                                              ↓
                              HTTP Server (via callback-queue) ← Response
                                              ↓
                              Frontend (WebSocket) → Update UI
```

---

## Database Schema

### PostgreSQL Tables

| Table | Columns | Description |
|-------|---------|-------------|
| `Btc_1_min` | id, time, open, high, low, close | Historical 1-min candles |
| `Sol_1_min` | id, time, open, high, low, close | Historical 1-min candles |
| `Eth_1_min` | id, time, open, high, low, close | Historical 1-min candles |
| `Btc_1_sec` | id, time, open, high, low, close | Historical 1-sec candles |
| `Sol_1_sec` | id, time, open, high, low, close | Historical 1-sec candles |
| `Eth_1_sec` | id, time, open, high, low, close | Historical 1-sec candles |
| `User` | id, username, password, token, userBalance | User accounts |

---

## Redis Data Structures

### Redis Streams
- **Purpose**: Store time-series data with persistence
- **Operations**: `XADD` (append), `XREAD` (consume)

### Stream Keys:
| Key | Purpose |
|-----|---------|
| `live-btc`, `live-sol`, `live-eth` | Live kline data |
| `trade-btc`, `trade-sol`, `trade-eth` | Individual trades |
| `trade-stream` | Order queue |
| `callback-queue` | Order responses |

---

## Key Technical Decisions

### 1. Redis Streams vs Pub/Sub

| Feature | Pub/Sub | Redis Streams |
|---------|---------|---------------|
| Message Persistence | No | Yes |
| Consumer Groups | No | Yes |
| Message Replay | No | Yes |
| **Use Case** | Not suitable | **Perfect fit** |

### 2. 1-Second Candle Aggregation

- Binance doesn't provide 1-second kline API
- Trade stream gives raw price data
- Aggregation happens:
  - **Frontend**: Real-time chart updates
  - **Backend**: Historical storage

### 3. Separation of Engine and HTTP Server

| Service | Responsibility |
|---------|---------------|
| Engine | Real-time: WebSocket, price updates, P&L |
| HTTP Server | REST: trades, historical data |

---

## Frontend Implementation Details

### WebSocket Message Handling

```typescript
// Filter messages by currency and timeframe
const currencyMap = {
  "BTC_LIVE": "BTCUSDT",
  "BTC_TRADE": "BTCUSDT",
  // ...
};

const msgCurrency = currencyMap[message.type];
if (msgCurrency !== currentCurrency) return;

// Handle based on timeframe
if (currentTimeframe === "1m" && message.type.endsWith("_LIVE")) {
  // Update 1-minute candle
} else if (currentTimeframe === "1s" && message.type.endsWith("_TRADE")) {
  // Aggregate to 1-second candle
}
```

### Trade Filtering

Old trades are filtered out to prevent stale data:
```typescript
const tickTime = Math.floor(tradeData.timestamp / 1000);
const now = Math.floor(Date.now() / 1000);

if (now - tickTime > 10) {
  return; // Skip trades older than 10 seconds
}
```

### Chart Update Logic

```typescript
const lastCandle = sortedData[sortedData.length - 1];
const currentSeriesData = seriesRef.current.data();

if (currentSeriesData.length === 0) {
  seriesRef.current.setData(sortedData);  // Initial load
  chartRef.current?.timeScale().fitContent();
} else {
  const lastSeriesTime = currentSeriesData[currentSeriesData.length - 1].time;
  
  if (lastCandle.time > lastSeriesTime) {
    seriesRef.current.update(lastCandle);  // New candle
  } else if (lastCandle.time === lastSeriesTime) {
    seriesRef.current.update(lastCandle);  // Update current
  }
}
```

---

## P&L Calculation

```typescript
function calculatePnL(order, currentPrice) {
  const direction = order.side === "buy" ? 1 : -1;
  const priceDiff = currentPrice - order.entryPrice;
  return direction * priceDiff * order.qty;
}

// Examples:
// Buy 0.1 BTC at $60,000, current $61,000 → P&L = +$100
// Sell 0.1 BTC at $60,000 (short), current $61,000 → P&L = -$100
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- Redis

### Run All Services
```bash
./start.sh
```

### Or Manually
```bash
cd price_poller && npm run dev    # Port 5000
cd http_server && npm run dev     # Port 5001
cd engine && npm run dev          # Port 5002
cd front_end && npm run dev       # Port 3000
```

### Access Points
- Frontend: http://localhost:3000
- HTTP Server: http://localhost:5001
- Engine (WebSocket): ws://localhost:5002
- Price Poller: http://localhost:5000

---

## Interview Talking Points

### Scalability
- Stateless microservices
- Redis Streams for high-throughput message passing
- Independent scaling of real-time vs REST operations

### Real-time Architecture
- WebSocket for low-latency communication
- Redis Streams for message buffering
- Efficient candle aggregation

### Data Integrity
- Async order processing with callback queues
- Real-time P&L via JavaScript Proxy pattern
- ACID-compliant PostgreSQL storage

### Challenges Solved
1. **High-frequency updates**: XREAD COUNT + BLOCK batching
2. **Connection resilience**: Auto-reconnect with stream replay
3. **Data consistency**: Stream ID tracking for exactly-once processing
4. **Old trade filtering**: Timestamp validation prevents stale data
5. **Chart synchronization**: Proper update logic for live candles

---

## Future Improvements

1. **Order book visualization**: Depth chart
2. **Technical indicators**: MA, RSI, MACD
3. **Multiple timeframes**: 5m, 15m, 1h, 4h, 1d
4. **Real-time alerts**: Price notifications
5. **Historical backtesting**: Strategy testing
