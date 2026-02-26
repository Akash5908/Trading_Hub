#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="trading_hub"
PROJECT_DIR="/home/ubuntu/$PROJECT_NAME"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check port availability
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "Port $port: In use"
        return 1
    else
        echo "Port $port: Available"
        return 0
    fi
}

# Function to check all ports
check_all_ports() {
    print_status "Checking all required ports..."
    echo "Port Status:"
    check_port 80 || return 1
    check_port 443 || return 1
    check_port 5001 || return 1
    check_port 6379 || return 1
    check_port 5432 || return 1
    print_success "All required ports are available"
    return 0
}

# Function to install dependencies
easy_install() {
    print_status "Installing $1..."
    sudo apt-get install -y $1
    if [ $? -eq 0 ]; then
        print_success "$1 installed successfully"
    else
        print_error "Failed to install $1"
        exit 1
    fi
}

# Build function
build() {
    print_status "Building application..."
    
    # Build frontend
    cd $PROJECT_DIR/front_end
    print_status "Building frontend..."
    npm install
    npm run build
    
    # Build backend
    cd $PROJECT_DIR/http_server
    print_status "Installing backend dependencies..."
    npm install
    
    print_success "Build completed!"
}

# Start function
start() {
    print_status "Starting services..."
    cd $PROJECT_DIR
    
    # Start Docker services
    print_status "Starting Docker services..."
    docker-compose up -d
    
    # Start backend with PM2
    cd $PROJECT_DIR/http_server
    print_status "Starting backend with PM2..."
    pm2 start npm --name "backend" -- start
    pm2 save
    
    print_success "Services started!"
}

# Stop function
stop() {
    print_status "Stopping services..."
    cd $PROJECT_DIR
    
    # Stop PM2
    print_status "Stopping PM2 processes..."
    pm2 stop backend
    pm2 delete backend
    
    # Stop Docker
    print_status "Stopping Docker services..."
    docker-compose down
    
    print_success "Services stopped!"
}

# Status function
status() {
    print_status "Checking service status..."
    echo "Docker Services:"
    docker-compose ps
    echo ""
    echo "PM2 Processes:"
    pm2 status
    echo ""
    echo "Port Usage:"
    echo "80 (HTTP): $(lsof -Pi :80 -sTCP:LISTEN -t >/dev/null && echo "In use" || echo "Available")"
    echo "443 (HTTPS): $(lsof -Pi :443 -sTCP:LISTEN -t >/dev/null && echo "In use" || echo "Available")"
    echo "5001 (Backend): $(lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null && echo "In use" || echo "Available")"
    echo "6379 (Redis): $(lsof -Pi :6379 -sTCP:LISTEN -t >/dev/null && echo "In use" || echo "Available")"
    echo "5432 (PostgreSQL): $(lsof -Pi :5432 -sTCP:LISTEN -t >/dev/null && echo "In use" || echo "Available")"
}

# Main menu
show_menu() {
    echo "Trading Hub Management Console"
    echo "=============================="
    echo "1. Build application"
    echo "2. Start services"
    echo "3. Stop services"
    echo "4. Check status"
    echo "5. Check ports"
    echo "6. Exit"
    echo ""
    echo -n "Enter your choice: "
    read choice
    
    case $choice in
        1)
            build
            ;;
        2)
            start
            ;;
        3)
            stop
            ;;
        4)
            status
            ;;
        5)
            check_all_ports
            ;;
        6)
            exit 0
            ;;
        *)
            echo "Invalid choice"
            ;;
    esac
    
    echo ""
    echo -n "Press Enter to continue..."
    read
    show_menu
}

# Make script executable
chmod +x $0

# Run main menu
show_menu