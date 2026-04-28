# Trading Hub

A **real-time cryptocurrency trading platform** with live candlestick charts, trading capabilities, and position management. Built with modern web technologies featuring live data streaming, WebSocket communication, and PostgreSQL storage.

## Features

### Trading

- **Real-time Charts** - TradingView-style candlestick charts
- **Multiple Timeframes** - 1-second and 1-minute candle updates
- **Currency Pairs** - BTC, ETH, SOL against USDT
- **Open/Close Positions** - Long (Buy) and Short (Sell)
- **Real-time P&L** - Live profit/loss calculation
- **Position Management** - Track and close open orders

### Technical

- **WebSocket Real-time Updates** - Live price streaming
- **Redis Streams** - Message buffering and persistence
- **PostgreSQL Storage** - Historical candle data
- **Microservices Architecture** - Scalable design
- **TypeScript** - Type-safe throughout

## Quick Start

```bash
# Start all services
./start.sh

# Or manually:
cd price_poller && npm run dev    # Port 5000
cd http_server && npm run dev     # Port 5001
cd engine && npm run dev          # Port 5002
cd front_end && npm run dev       # Port 3000
```

**Access**: http://localhost:3000

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Binance API                           │
│                   (Kline + Trade WebSocket)                  │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Price Poller                         │
│                   (Port 5000 - Data Ingestion)              │
└──────────────┬──────────────────────────────────┬───────────┘
               │                                  │
               ▼                                  ▼
┌──────────────────────────┐        ┌──────────────────────────┐
│    Redis Streams         │        │    Redis Streams         │
│  (live-btc, live-sol,   │        │  (trade-btc, trade-sol, │
│   live-eth)             │        │   trade-eth)           │
└──────────────┬──────────┘        └──────────────┬──────────┘
               │                                  │
               │          ┌──────────────────────┘
               │          │
               ▼          ▼
┌──────────────────────────────┐  ┌──────────────────────────────┐
│          Engine               │  │       HTTP Server            │
│   (Port 5002 - WebSocket)     │  │   (Port 5001 - REST API)    │
│  - Order Management           │  │  - Data Aggregation         │
│  - P&L Calculation           │  │  - PostgreSQL Storage       │
│  - Real-time Broadcasting    │  │  - 1s Candle Builder        │
└──────────────┬───────────────┘  └──────────────┬───────────────┘
               │                                  │
               │          ┌──────────────────────┘
               │          │
               ▼          ▼
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│              (Next.js + Lightweight Charts)                  │
│              (Port 3000)                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer       | Technology                       |
| ----------- | -------------------------------- |
| Frontend    | Next.js 16, React 19, TypeScript |
| UI          | Tailwind CSS, Shadcn/UI          |
| State       | Redux Toolkit                    |
| Charts      | Lightweight Charts (TradingView) |
| Backend     | Express.js, TypeScript           |
| Database    | PostgreSQL + Prisma ORM          |
| Cache/Queue | Redis (Streams)                  |
| WebSocket   | ws library                       |

---

## Project Structure

```
Trading_Hub/
├── front_end/              # Next.js frontend (Port 3000)
│   ├── app/               # App router pages
│   ├── components/         # React components
│   │   ├── Charts/        # Trading chart
│   │   ├── DashboardPage/ # Main dashboard
│   │   ├── OrdersPage/    # Positions table
│   │   ├── TradingPanel/  # Trading interface
│   │   └── TradingComponent/ # Buy/Sell
│   └── lib/               # Redux, API calls
│
├── http_server/           # REST API (Port 5001)
│   ├── src/
│   │   ├── lib/
│   │   │   ├── poller.ts       # 1-min storage
│   │   │   ├── poller_1sec.ts  # 1-sec aggregation
│   │   │   └── prisma.ts       # DB client
│   │   └── routes/
│   │       ├── trade.ts        # Trading endpoints
│   │       └── users.ts        # Auth endpoints
│   └── prisma/schema.prisma
│
├── price_poller/         # Data collector (Port 5000)
│   └── index.ts          # Binance → Redis
│
├── engine/               # Trading engine (Port 5002)
│   └── index.ts         # Orders, P&L, WebSocket
│
├── start.sh             # Service startup script
├── README.md            # This file
└── TECHNICAL_DOCUMENTATION.md  # Detailed docs
```

---

## How It Works

### Real-time Data Flow

**1-Minute Candles:**

```
Binance Kline Stream → Price Poller → Redis → Engine → WebSocket → Frontend → Chart
```

**1-Second Candles:**

```
Binance Trade Stream → Price Poller → Redis → Engine → WebSocket → Frontend
                                                              ↓
                                                    Aggregate trades
                                                              ↓
                                                          Chart Update
```

### Order Flow

```
User clicks "Buy" → HTTP Server → Redis Queue → Engine
                                                    ↓
                                        Update positions, calculate P&L
                                                    ↓
                                        Broadcast via WebSocket
                                                    ↓
                                        Frontend updates UI
```

---

## API Reference

### Trading

| Endpoint              | Method | Description    |
| --------------------- | ------ | -------------- |
| `/api/v1/trade/open`  | POST   | Open position  |
| `/api/v1/trade/close` | POST   | Close position |

### Market Data

| Endpoint                   | Method | Description |
| -------------------------- | ------ | ----------- |
| `/api/v1/trade/btc-klines` | GET    | BTC candles |
| `/api/v1/trade/sol-klines` | GET    | SOL candles |
| `/api/v1/trade/eth-klines` | GET    | ETH candles |

**Query**: Add `?duration=1s` for 1-second candles

### Authentication

| Endpoint               | Method | Description |
| ---------------------- | ------ | ----------- |
| `/api/v1/users/signup` | POST   | Register    |
| `/api/v1/users/login`  | POST   | Login       |

---

## WebSocket Events

**Endpoint**: `ws://localhost:5002`

### Server → Client

| Event              | Data                                | Description   |
| ------------------ | ----------------------------------- | ------------- |
| `BTC_LIVE`         | `{ time, open, high, low, close }`  | BTC 1m update |
| `BTC_TRADE`        | `{ price, quantity, timestamp }`    | BTC trade     |
| `SOL_LIVE`         | `{ time, open, high, low, close }`  | SOL 1m update |
| `SOL_TRADE`        | `{ price, quantity, timestamp }`    | SOL trade     |
| `ETH_LIVE`         | `{ time, open, high, low, close }`  | ETH 1m update |
| `ETH_TRADE`        | `{ price, quantity, timestamp }`    | ETH trade     |
| `open-orders`      | Order object                        | New order     |
| `close-orders`     | Order object                        | Closed order  |
| `positions-update` | `{ id, currentPnl, positionValue }` | P&L update    |

---

## Database Schema

### Candlestick Tables

```
Btc_1_min, Sol_1_min, Eth_1_min  # 1-minute candles
Btc_1_sec, Sol_1_sec, Eth_1_sec  # 1-second candles

Columns: id, time (Unix), open, high, low, close
```

### User Table

```
User: id, username, password, token, userBalance
```

---

## Key Features Explained

### Real-time P&L

Uses JavaScript Proxy pattern to auto-update P&L when prices change:

```typescript
const priceHandler = {
  set(target, prop, value) {
    target[prop] = value;
    updatePosition(); // Recalculate all open orders
    return true;
  },
};
```

### Redis Streams

- Message persistence (survives restarts)
- Message replay capability
- Efficient XREAD with BLOCK for real-time

### Trade Filtering

Old trades filtered by timestamp to prevent stale data:

```typescript
if (now - tickTime > 10) return; // Skip trades >10s old
```

---

## Environment Setup

### Required

- PostgreSQL
- Redis

### Environment Variables

**http_server/.env**

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
REDIS_URL=redis://localhost:6379
```

**front_end/.env**

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
NEXT_PUBLIC_ENGINE_URL=ws://localhost:5002
```

---

## Docker Setup

```bash
# PostgreSQL
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword \
  --name exness_clone postgres

# Redis
docker run -d -p 6379:6379 --name my-redis redis

# Setup database
cd http_server && npx prisma db push
```

---

## VPS Deployment

### Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ and npm installed

### Steps

1. **Start Database Containers (PostgreSQL + Redis)**

   ```bash
   docker compose -f /path/to/Trading_Hub/docker-compose.db.yml up -d
   ```

2. **Run the Application**
   ```bash
   cd /path/to/Trading_Hub
   ./start.sh
   ```

### Notes

- The `start.sh` script runs Prisma migrations automatically before starting services
- Ensure `http_server/.env` has correct `DATABASE_URL` pointing to PostgreSQL container
- Services will be available at:
  - Frontend: http://localhost:3000
  - HTTP Server: http://localhost:5001
  - Price Poller: http://localhost:5000
  - Engine: localhost:5002

---

## For Interview Preparation

See [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md) for:

- Detailed architecture diagrams
- Data flow explanations
- Technical decisions and trade-offs
- P&L calculation logic
- Challenges solved
- Scalability considerations

### Key Talking Points

1. **Redis Streams over Pub/Sub** - Why message replay matters
2. **1-second candle aggregation** - Solving Binance API limitation
3. **Proxy pattern for P&L** - Clean reactive updates
4. **Microservices separation** - Scalability and fault isolation
5. **WebSocket + Streams** - Reliable real-time updates

---

## License

ISC
