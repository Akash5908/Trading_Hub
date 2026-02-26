# Trading Hub - Render.com Deployment Roadmap (Updated)

## Overview
Deploy your complete Trading Hub project on Render.com including backend API, frontend, engine, and price_poller services using their Web Service and PostgreSQL/PostgreSQL services.

## Prerequisites
- Render.com account
- Project code pushed to GitHub
- Basic understanding of Render.com services

## Project Structure
```
trading_hub/
├── front_end/          # Next.js frontend
├── http_server/        # Backend API
├── engine/            # Trading engine
├── price_poller/      # Price data poller
└── render.yaml        # Render configuration
```

## Step 1: Prepare Your Project

### 1.1 Clean Up Existing Deployment Files
```bash
# Remove local deployment scripts and configs
rm -rf deploy_manager.sh manage.sh status_checker.sh docker-compose.yml .env.example DEPLOYMENT.md DEPLOYMENT_ANALYSIS.md nginx.conf
```

### 1.2 Update Environment Configuration
Create `.env.example` with Render-friendly variables:
```env
# Database Configuration (Render PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database_name"

# JWT Secret (Generate a strong secret)
JWT_SECRET="your_super_secret_jwt_key_here"

# Redis Configuration (Render Redis)
REDIS_URL="redis://host:port"

# Server Configuration
PORT=5000
NEXT_PUBLIC_BACKEND_URL="/api/v1"

# Engine Configuration
ENGINE_PORT=5001
ENGINE_REDIS_URL="redis://host:port"

# Price Poller Configuration
POLLER_PORT=5002
POLLER_REDIS_URL="redis://host:port"
```

## Step 2: Create Render Configuration Files

### 2.1 Create Dockerfile (for Backend)
```dockerfile
# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
```

### 2.2 Create render.yaml (Render Configuration)
```yaml
# render.yaml
services:
  - type: web service
    name: trading-hub-backend
    env: docker
    dockerfilePath: Dockerfile
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: trading-hub-db
          property: connectionString
      - key: REDIS_URL
        fromDatabase:
          name: trading-hub-redis
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: PORT
        value: 5000
      - key: NEXT_PUBLIC_BACKEND_URL
        value: "/api/v1"
    healthCheckPath: /health
    healthCheckInterval: 10
    healthCheckTimeout: 5
    healthCheckRetries: 3
    restart: true

  - type: web service
    name: trading-hub-engine
    env: docker
    dockerfilePath: Dockerfile
    envVars:
      - key: REDIS_URL
        fromDatabase:
          name: trading-hub-redis
          property: connectionString
      - key: PORT
        value: 5001
    healthCheckPath: /health
    healthCheckInterval: 10
    healthCheckTimeout: 5
    healthCheckRetries: 3
    restart: true

  - type: web service
    name: trading-hub-poller
    env: docker
    dockerfilePath: Dockerfile
    envVars:
      - key: REDIS_URL
        fromDatabase:
          name: trading-hub-redis
          property: connectionString
      - key: PORT
        value: 5002
    healthCheckPath: /health
    healthCheckInterval: 10
    healthCheckTimeout: 5
    healthCheckRetries: 3
    restart: true

databases:
  - name: trading-hub-db
    plan: starter

externalRedis:
  - name: trading-hub-redis
    plan: starter
```

## Step 3: GitHub Repository Setup

### 3.1 Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit for Render deployment"
git branch -M main
git remote add origin https://github.com/yourusername/trading-hub.git
git push -u origin main
```

### 3.2 Repository Requirements
- Public repository (or private with Render access)
- All dependencies in package.json
- Environment variables configured
- Multiple services in one repository

## Step 4: Render.com Deployment

### 4.1 Log into Render.com
1. Go to https://render.com
2. Sign in or create an account

### 4.2 Create New Web Services
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your trading-hub repository
4. Choose branch (usually main)

### 4.3 Configure Each Service

#### Backend Service
1. **Environment**: Docker
2. **Dockerfile Path**: `Dockerfile`
3. **Start Command**: `npm start`
4. **Health Check**: `/health`
5. **Auto-start**: Enabled

#### Engine Service  
1. **Environment**: Docker
2. **Dockerfile Path**: `Dockerfile`
3. **Start Command**: `npm start`
4. **Health Check**: `/health`
5. **Auto-start**: Enabled

#### Price Poller Service
1. **Environment**: Docker
2. **Dockerfile Path**: `Dockerfile`
3. **Start Command**: `npm start`
4. **Health Check**: `/health`
5. **Auto-start**: Enabled

### 4.4 Add Databases
1. **PostgreSQL**: Create new database service
2. **Redis**: Create new Redis service
3. Connect them to your web services

### 4.5 Environment Variables
Render will auto-generate:
- DATABASE_URL (from PostgreSQL)
- REDIS_URL (from Redis) 
- JWT_SECRET (auto-generated)

## Step 5: Configure Build & Start Commands

### 5.1 Build Command
Render will automatically run:
```bash
npm install
npm run build
```

### 5.2 Start Command
From Dockerfile: `npm start`

## Step 6: Deploy!

### 6.1 Manual Deployment
1. Click "Create Web Service" for each service
2. Wait for deployment to complete
3. Check deployment logs

### 6.2 Auto-Deploy (Optional)
1. Enable auto-deploy from GitHub
2. Each push to main branch triggers new deployment

## Step 7: Verify Deployment

### 7.1 Check Service Status
1. Go to your Render dashboard
2. Check service status (should be "Healthy")
3. View deployment logs

### 7.2 Test Endpoints
1. Visit your Render service URLs
2. Test API endpoints:
   - `GET /health` - Should return "healthy"
   - `GET /api/v1/users` - Should return users list

### 7.3 Database Migration
```bash
# SSH into your Render service (if needed)
render shell trading-hub-backend

# Run database migrations
npm run migrate
```

## Step 8: Engine and Price Poller Services

### 8.1 Engine Service
- **Purpose**: Trading engine for processing trades
- **Port**: 5001
- **Dependencies**: Redis for real-time data
- **Health Check**: `/health`

### 8.2 Price Poller Service  
- **Purpose**: Fetch and store price data
- **Port**: 5002
- **Dependencies**: Redis for data storage
- **Health Check**: `/health`

### 8.3 Service Communication
- All services connect to shared Redis
- Backend API communicates with engine
- Engine processes trading logic
- Poller updates price data

## Step 9: Environment Variables Setup

### 9.1 Required Variables
- `DATABASE_URL` - Auto-generated from PostgreSQL
- `REDIS_URL` - Auto-generated from Redis
- `JWT_SECRET` - Auto-generated by Render
- `PORT` - Set to 5000 (backend), 5001 (engine), 5002 (poller)
- `NEXT_PUBLIC_BACKEND_URL` - Set to `/api/v1`

### 9.2 Service-Specific Variables
- **Engine**: `ENGINE_PORT=5001`, `ENGINE_REDIS_URL`
- **Poller**: `POLLER_PORT=5002`, `POLLER_REDIS_URL`

## Step 10: Monitoring & Maintenance

### 10.1 Health Checks
- Render automatically monitors health checks
- Service restarts on failure
- Alerts for downtime

### 10.2 Logs
- View logs in Render dashboard
- Set up log forwarding if needed

### 10.3 Updates
- Update code via GitHub
- Render auto-deploys on changes
- Manual deployments available

## Step 11: Scaling & Performance

### 11.1 Scaling Options
- **Horizontal Scaling**: Add more instances
- **Vertical Scaling**: Increase RAM/CPU
- **Auto-scaling**: Scale based on traffic

### 11.2 Performance Monitoring
- Monitor response times
- Track resource usage
- Set up alerts for performance issues

## Step 12: Backup & Recovery

### 12.1 Database Backups
- Render provides automatic backups
- Manual backup options available
- Test restore procedures

### 12.2 Service Recovery
- Auto-restart on failure
- Manual restart options
- Health check monitoring

## Troubleshooting

### Common Issues
1. **Build Failures**: Check logs for missing dependencies
2. **Database Connection**: Verify DATABASE_URL is correct
3. **Health Check Failures**: Check API endpoint availability
4. **Memory Issues**: Increase service RAM in Render settings

### Debug Commands
```bash
# Check service logs
render logs trading-hub-backend

# Check service status
render status trading-hub-backend

# Shell into service
render shell trading-hub-backend

# Check all services
render status
```

## Cost Estimate

### Render Pricing (as of 2024)
- **Web Service**: $7/month (starter)
- **PostgreSQL**: $7/month (starter)  
- **Redis**: $7/month (starter)
- **Total**: ~$21/month for basic setup

### Scaling Costs
- Additional RAM: $0.20/GB/hour
- Additional CPU: $0.10/CPU/hour
- Data transfer: First 100GB free, then $0.10/GB

## Benefits of Render.com

### ✅ Managed Services
- Automatic updates and security patches
- Built-in monitoring and alerts
- Automatic SSL certificates
- Easy scaling

### ✅ Simple Setup
- No server management required
- One-click deployments
- Automatic environment variable injection
- Integrated databases

### ✅ Cost-Effective
- Pay only for what you use
- No upfront costs
- Free tier available
- Transparent pricing

## Next Steps After Deployment

### 1. Test Your Application
- Access your Render service URL
- Test all features
- Verify database connectivity

### 2. Set Up Monitoring
- Configure health checks
- Set up alerts
- Monitor performance

### 3. Scale as Needed
- Monitor resource usage
- Scale up if needed
- Add more instances for high traffic

### 4. Backup Strategy
- Enable automatic backups
- Set up manual backup procedures
- Test restore procedures

---

## Quick Start Commands

```bash
# Clean up existing files
rm -rf deploy_manager.sh manage.sh status_checker.sh docker-compose.yml .env.example DEPLOYMENT.md DEPLOYMENT_ANALYSIS.md nginx.conf

# Create Render configuration files
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
EOF

cat > render.yaml << 'EOF'
services:
  - type: web service
    name: trading-hub-backend
    env: docker
    dockerfilePath: Dockerfile
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: trading-hub-db
          property: connectionString
      - key: REDIS_URL
        fromDatabase:
          name: trading-hub-redis
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: PORT
        value: 5000
      - key: NEXT_PUBLIC_BACKEND_URL
        value: "/api/v1"
    healthCheckPath: /health
    healthCheckInterval: 10
    healthCheckTimeout: 5
    healthCheckRetries: 3
    restart: true

  - type: web service
    name: trading-hub-engine
    env: docker
    dockerfilePath: Dockerfile
    envVars:
      - key: REDIS_URL
        fromDatabase:
          name: trading-hub-redis
          property: connectionString
      - key: PORT
        value: 5001
    healthCheckPath: /health
    healthCheckInterval: 10
    healthCheckTimeout: 5
    healthCheckRetries: 3
    restart: true

  - type: web service
    name: trading-hub-poller
    env: docker
    dockerfilePath: Dockerfile
    envVars:
      - key: REDIS_URL
        fromDatabase:
          name: trading-hub-redis
          property: connectionString
      - key: PORT
        value: 5002
    healthCheckPath: /health
    healthCheckInterval: 10
    healthCheckTimeout: 5
    healthCheckRetries: 3
    restart: true

databases:
  - name: trading-hub-db
    plan: starter

externalRedis:
  - name: trading-hub-redis
    plan: starter
EOF
```

## Support

For Render.com specific issues:
- Render Documentation: https://render.com/docs
- Render Support: https://render.com/contact
- Render Community: https://community.render.com

## Engine and Price Poller Details

### Engine Service
- **Purpose**: Real-time trading engine
- **Technology**: Express.js with WebSocket support
- **Responsibilities**: Trade execution, order matching, real-time data processing
- **Dependencies**: Redis for real-time data storage

### Price Poller Service  
- **Purpose**: Fetch and store price data
- **Technology**: Express.js with WebSocket support
- **Responsibilities**: Fetch price data from exchanges, store in Redis, provide data to frontend
- **Dependencies**: Redis for data storage

### Service Communication Flow
```
Price Poller → Redis → Engine → Redis → Backend API → Frontend
     ↓          ↓          ↓          ↓          ↓
WebSocket ← WebSocket ← WebSocket ← HTTP ← HTTP
```

This architecture ensures real-time data flow and trading capabilities for your complete Trading Hub application.