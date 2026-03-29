# Trading Hub

A **real-time cryptocurrency trading platform** with live candlestick charts, trading capabilities, and position management. Built with modern web technologies featuring live data streaming, WebSocket communication, and PostgreSQL storage.

## Features

### Real-Time Trading
- Live cryptocurrency price tracking (BTC, ETH, SOL)
- Interactive candlestick charts (TradingView-style)
- Multiple timeframes: **1-second** and **1-minute** candles
- Open/close trading positions (Long/Short)
- Real-time P&L calculation

### Technical Highlights
- WebSocket-based real-time updates
- Redis Streams for high-throughput message passing
- PostgreSQL for persistent storage
- Microservices architecture
- TypeScript throughout

## Quick Start

```bash
# Start all services
./start.sh

# Or manually start each service:
cd price_poller && npm run dev    # Port 5000
cd http_server && npm run dev     # Port 5001
cd engine && npm run dev          # Port 5002
cd front_end && npm run dev       # Port 3000
```

**Access the app**: http://localhost:3000

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Binance API                         │
│                   (Kline + Trade WebSocket)                  │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Price Poller                         │
│                   Collects market data                       │
└──────────────┬──────────────────────────────────┬───────────┘
               │                                  │
               ▼                                  ▼
┌──────────────────────────┐        ┌──────────────────────────┐
│    Redis Streams         │        │    Redis Streams        │
│  (live-btc, live-sol,   │        │  (trade-btc, trade-sol, │
│   live-eth)             │        │   trade-eth)           │
└──────────────┬──────────┘        └──────────────┬──────────┘
               │                                  │
               │          ┌───────────────────────┘
               │          │
               ▼          ▼
┌──────────────────────────────┐  ┌──────────────────────────────┐
│          Engine               │  │       HTTP Server            │
│   - Order Management          │  │   - Data Aggregation         │
│   - P&L Calculation           │  │   - REST API                 │
│   - WebSocket Broadcasting    │  │   - PostgreSQL Storage       │
└──────────────┬───────────────┘  └──────────────┬───────────────┘
               │                                  │
               │          ┌──────────────────────┘
               │          │
               ▼          ▼
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│              (Next.js + Lightweight Charts)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript |
| UI | Tailwind CSS, Shadcn/UI |
| State | Redux Toolkit |
| Charts | Lightweight Charts (TradingView) |
| Backend | Express.js, TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Cache/Queue | Redis (Streams) |
| WebSocket | ws library |

---

## Project Structure

```
Trading_Hub/
├── front_end/              # Next.js frontend (Port 3000)
│   ├── app/               # App router pages
│   ├── components/         # React components
│   │   ├── Charts/        # Trading chart component
│   │   ├── DashboardPage/ # Main dashboard
│   │   ├── OrdersPage/    # Open positions table
│   │   ├── TradingPanel/  # Trading interface
│   │   └── TradingComponent/ # Buy/Sell component
│   └── lib/               # Redux store, API calls
│
├── http_server/           # REST API server (Port 5001)
│   ├── src/
│   │   ├── lib/
│   │   │   ├── poller.ts       # 1-min candle storage
│   │   │   ├── poller_1sec.ts  # 1-sec candle aggregation
│   │   │   └── prisma.ts       # Database client
│   │   └── routes/
│   │       ├── trade.ts        # Trading endpoints
│   │       └── users.ts        # Auth endpoints
│   └── prisma/
│       └── schema.prisma       # Database schema
│
├── price_poller/         # Data collector (Port 5000)
│   └── index.ts          # Binance WebSocket → Redis
│
├── engine/               # Trading engine (Port 5002)
│   └── index.ts         # Order management, P&L, WebSocket
│
├── start.sh             # Service startup script
└── TECHNICAL_DOCUMENTATION.md  # Detailed technical docs
```

---

## API Endpoints

### Trading
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/trade/open` | POST | Open a new position |
| `/api/v1/trade/close` | POST | Close an existing position |

### Market Data
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/trade/btc-klines` | GET | Get BTC candles |
| `/api/v1/trade/sol-klines` | GET | Get SOL candles |
| `/api/v1/trade/eth-klines` | GET | Get ETH candles |

**Query Parameters**:
- `duration=1s` - Get 1-second candles
- `duration=1m` - Get 1-minute candles (default)

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/users/signup` | POST | User registration |
| `/api/v1/users/login` | POST | User login |

---

## WebSocket Events

**Engine WebSocket**: `ws://localhost:5002`

### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `BTC_LIVE` | `{ time, open, high, low, close }` | BTC 1-min candle update |
| `BTC_TRADE` | `{ price, quantity, timestamp }` | Individual BTC trade |
| `SOL_LIVE` | `{ time, open, high, low, close }` | SOL 1-min candle update |
| `SOL_TRADE` | `{ price, quantity, timestamp }` | Individual SOL trade |
| `ETH_LIVE` | `{ time, open, high, low, close }` | ETH 1-min candle update |
| `ETH_TRADE` | `{ price, quantity, timestamp }` | Individual ETH trade |
| `open-orders` | Full order object | New order created |
| `close-orders` | Full order object | Order closed |
| `positions-update` | `{ id, currentPnl, positionValue }` | P&L update |

---

## Database Schema

### Candlestick Tables
```
Btc_1_min, Sol_1_min, Eth_1_min  # 1-minute candles
Btc_1_sec, Sol_1_sec, Eth_1_sec  # 1-second candles

Columns: id, time (Unix timestamp), open, high, low, close
```

### User Table
```
User: id, username, password, token, userBalance
```

---

## Key Technical Decisions

### Redis Streams vs Pub/Sub

**Why Redis Streams?**
- Message persistence (data survives restart)
- Message replay capability
- Consumer group support for scaling

**Trade-off**: Slightly more complex than Pub/Sub, but necessary for reliability.

### 1-Second Candle Aggregation

Binance doesn't provide 1-second kline API, so we:
1. Subscribe to individual trade stream (`@trade`)
2. Aggregate trades client-side for real-time charts
3. Aggregate server-side for historical storage

### Microservices Separation

| Service | Responsibility |
|---------|---------------|
| Price Poller | Data ingestion only |
| Engine | Real-time operations (orders, P&L) |
| HTTP Server | REST API, data storage |
| Frontend | UI, chart rendering |

---

## Environment Setup

### Required Services
- PostgreSQL (or use Docker)
- Redis (or use Docker)

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

**price_poller/.env**
```env
REDIS_URL=redis://localhost:6379
PORT=5000
```

**engine/.env**
```env
REDIS_URL=redis://localhost:6379
PORT=5002
```

---

## Docker Setup

```bash
# Start PostgreSQL
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword --name exness_clone postgres

# Start Redis
docker run -d -p 6379:6379 --name my-redis redis

# Setup database
cd http_server
npx prisma db push
```

---

## Development

```bash
# Install dependencies for each service
cd front_end && npm install
cd http_server && npm install
cd price_poller && npm install
cd engine && npm install

# Run in development mode
./start.sh

# Or individually
cd price_poller && npm run dev
cd http_server && npm run dev
cd engine && npm run dev
cd front_end && npm run dev
```

---

## Technical Documentation

For detailed architecture, data flow diagrams, and interview talking points, see:
- [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md)

---

## Interview Highlights

### Scalability
- Stateless services that can scale horizontally
- Redis Streams handle high-throughput message passing
- Independent scaling of real-time vs REST operations

### Real-Time Architecture
- WebSocket for bidirectional, low-latency communication
- Redis Streams for reliable message delivery with replay capability
- Efficient batching with `XREAD COUNT + BLOCK`

### Data Integrity
- Async order processing with callback queues
- Real-time P&L calculation using JavaScript Proxy pattern
- PostgreSQL for persistent, ACID-compliant storage

### Challenges Solved
1. **High-frequency updates**: Efficient batching with Redis XREAD
2. **Connection resilience**: Auto-reconnect with message replay
3. **Data aggregation**: Client + server-side 1-second candle building

---

## License

ISC
