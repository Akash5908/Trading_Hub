#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Stopping any existing Trading Hub services...${NC}\n"
pkill -f "node.*http_server" 2>/dev/null
pkill -f "node.*price_poller" 2>/dev/null
pkill -f "node.*engine" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

echo -e "${YELLOW}Starting Trading Hub services...${NC}\n"

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

start_service() {
    local name=$1
    local dir=$2
    local cmd=$3
    
    echo -e "${GREEN}Starting ${name}...${NC}"
    cd "$ROOT_DIR/$dir"
    $cmd &
    sleep 1
    echo -e "${GREEN}${name} started${NC}\n"
}

export REDIS_URL="redis://localhost:6379"

# NEW: Run Prisma migrations for http_server
echo -e "${GREEN}Running Prisma migrations...${NC}"
cd "$ROOT_DIR/http_server"
npx prisma migrate deploy

start_service "HTTP Server" "http_server" "npm run dev"
start_service "Price Poller" "price_poller" "npm run dev"
start_service "Engine" "engine" "npm run dev"
start_service "Frontend" "front_end" "npm run dev"

echo -e "${YELLOW}All services started!${NC}"
echo -e "Price Poller: ${GREEN}http://localhost:5000${NC}"
echo -e "HTTP Server: ${GREEN}http://localhost:5001${NC}"
echo -e "Engine:      ${GREEN}http://localhost:5002${NC}"
echo -e "Frontend:    ${GREEN}http://localhost:3000${NC}"
echo -e "\nPress Ctrl+C to stop all services"

wait
