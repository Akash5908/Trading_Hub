#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Stopping any existing Trading Hub PM2 processes...${NC}\n"
# Stop processes by name to be safe
pm2 stop all 2>/dev/null
pm2 delete all 2>/dev/null

echo -e "${YELLOW}Starting Trading Hub services with PM2...${NC}\n"

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Global Environment Variables
export REDIS_URL="redis://localhost:6379"

start_service() {
    local name=$1
    local dir=$2
    local cmd=$3

    echo -e "${GREEN}Deploying ${name}...${NC}"
    cd "$ROOT_DIR/$dir"

    # We use 'pm2 start' instead of '&'
    # 'npm run dev' is okay for now, but 'npm run start' is better for VPS
    pm2 start "$cmd" --name "$name"

    sleep 1
    echo -e "${GREEN}${name} is now managed by PM2${NC}\n"
}

# 1. Run Prisma migrations for http_server
echo -e "${GREEN}Running Prisma migrations...${NC}"
cd "$ROOT_DIR/http_server"
npx prisma migrate deploy

# 2. Start all services via PM2
# Note: Use "npm run start" if you have already run "npm run build"
start_service "http-server" "http_server" "npm run dev"
start_service "price-poller" "price_poller" "npm run dev"
start_service "engine" "engine" "npm run dev"
start_service "frontend" "front_end" "npm run dev"

echo -e "${YELLOW}All services started in background!${NC}"
echo -e "Use ${CYAN}'pm2 list'${NC} to see status."
echo -e "Use ${CYAN}'pm2 logs'${NC} to see real-time output."

# Save the list so it restarts on server reboot
pm2 save