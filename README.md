# Trading Hub

A real-time cryptocurrency trading platform built with modern web technologies. Features live price tracking from Binance, trading capabilities, position management, and a responsive dashboard.

## Architecture

The application consists of three main services:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Price Poller   │────▶│      Redis      │────▶│  HTTP Server    │
│  (Port 5000)    │     │   (Pub/Sub)    │     │   (Port 5001)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                                │
         │                    ┌─────────────────┐          │
         └───────────────────▶│     Engine      │◀─────────┘
                             │   (Port 5002)   │
                             └─────────────────┘
```

- **Price Poller**: Collects real-time price data from Binance WebSocket API and publishes to Redis
- **HTTP Server**: Subscribes to Redis channels, stores validated data in PostgreSQL, handles REST APIs
- **Engine**: Manages trading orders, calculates P&L, broadcasts position updates via WebSockets

## Tech Stack

### Frontend
- **Framework:** Next.js 16
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS
- **State Management:** Redux Toolkit
- **Charts:** Lightweight Charts
- **Deployment:** Vercel

### Backend
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Caching/Pub-Sub:** Redis
- **WebSockets:** ws library

## Project Structure

```
Trading_Hub/
├── front_end/           # Next.js frontend application
│   ├── app/             # Next.js app router pages
│   ├── components/      # React components
│   ├── lib/             # Utilities, hooks, store
│   └── slices/          # Redux slices
│
├── http_server/          # Express.js REST API server
│   ├── src/
│   │   ├── lib, Pr/         # Redisisma, Poller utilities
│   │   └── routes/      # API route handlers
│   └── prisma/          # Database schema
│
├── price_poller/         # Binance WebSocket data collector
│   ├── index.ts         # Main entry point
│   └── redis.ts         # Redis publishing logic
│
├── engine/               # Trading engine & order management
│   └── index.ts         # WebSocket server for orders
│
└── Dockerfile           # Docker orchestration
```

## Features

### Real-Time Data
- Live cryptocurrency price tracking (BTC, SOL, ETH)
- 1-minute candlestick charts from Binance
- WebSocket-based real-time updates

### Trading
- User authentication (signup/login)
- Open/close trading positions
- Buy/Sell functionality
- Real-time P&L calculation

### Dashboard
- Interactive candlestick charts
- Live portfolio balance
- Order history
- Position tracking with real-time updates

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis server

### Environment Variables

Create `.env` files in each service directory:

**front_end/.env**
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
```

**http_server/.env**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/trading_hub
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
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

### Installation

```bash
# Clone the repository
git clone https://github.com/Akash5908/Trading_Hub.git
cd Trading_Hub

# Install frontend dependencies
cd front_end
npm install

# Install backend dependencies
cd ../http_server
npm install

# Install price poller dependencies
cd ../price_poller
npm install

# Install engine dependencies
cd ../engine
npm install
```

### Running the Application

#### Development Mode

```bash
# Start PostgreSQL and Redis (using Docker)
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB=trading_hub postgres
docker run -d -p 6379:6379 redis

# Setup database (http_server)
cd http_server
npx prisma migrate dev

# Start price poller (terminal 1)
cd price_poller
npm run dev

# Start HTTP server (terminal 2)
cd http_server
npm run dev

# Start engine (terminal 3)
cd engine
npm run dev

# Start frontend (terminal 4)
cd front_end
npm run dev
```

#### Docker Deployment

```bash
# Build and run all services
docker-compose up --build
```

## API Endpoints

### Authentication
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login

### Trading
- `POST /api/trade/open` - Open a new position
- `POST /api/trade/close` - Close an existing position

### Market Data
- `GET /api/trade/klines` - Get candlestick data
- `GET /api/trade/orders` - Get user's orders

## WebSocket Events

### Engine WebSocket (Port 5002)

**Outgoing:**
- `open-orders` - Broadcast when new order is opened
- `close-orders` - Broadcast when order is closed
- `positions-update` - Real-time P&L updates

**Incoming:**
- Create/close order messages via Redis

## Database Schema

The application uses Prisma with the following main models:

- **User** - User accounts and balances
- **Btc_1_min**, **Sol_1_min**, **Eth_1_min** - Candlestick data
- **Order** - Trading orders

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License

## Acknowledgments

- [Binance API](https://binance.us/) for real-time market data
- [Lightweight Charts](https://tradingview.github.io/lightweight-charts/) for charting
- [Prisma](https://www.prisma.io/) for database ORM
