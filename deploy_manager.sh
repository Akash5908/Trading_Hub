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
DB_NAME="trading_hub"
DB_USER="trading_hub_user"
DB_PASSWORD="trading_hub_password"
JWT_SECRET="your_jwt_secret_key_here"
REDIS_URL="redis://localhost:6379"
PORT=5001

Check if running as root
# if [[ $EUID -eq 0 ]]; then
#    echo -e "${RED}This script should not be run as root${NC}"
#    exit 1
# fi

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
        print_error "Port $port is already in use"
        return 1
    else
        print_success "Port $port is available"
        return 0
    fi
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

# Main deployment function
deploy() {
    print_status "Starting deployment..."
    
    # Update system
    print_status "Updating system packages..."
    sudo apt update && sudo apt upgrade -y
    
    # Install Node.js
    print_status "Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    easy_install nodejs
    
    # Install Docker
    print_status "Installing Docker..."
    sudo apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt-get update
    easy_install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # Install PostgreSQL
    print_status "Installing PostgreSQL..."
    easy_install postgresql postgresql-contrib
    
    # Install Nginx
    print_status "Installing Nginx..."
    easy_install nginx
    
    # Install PM2
    print_status "Installing PM2..."
    sudo npm install -g pm2
    
    # Create project directory
    print_status "Creating project directory..."
    mkdir -p $PROJECT_DIR
    
    # Clone repository (update with your repo URL)
    print_status "Cloning repository..."
    git clone https://github.com/yourusername/trading_hub.git $PROJECT_DIR
    cd $PROJECT_DIR
    
    # Start Redis with Docker Compose
    print_status "Setting up Redis with Docker..."
    cat > $PROJECT_DIR/docker-compose.yml << EOF
db:
  image: postgres:15
  environment:
    POSTGRES_DB: $DB_NAME
    POSTGRES_USER: $DB_USER
    POSTGRES_PASSWORD: $DB_PASSWORD
  ports:
    - "5432:5432"
  volumes:
    - postgres_data:/var/lib/postgresql/data
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U $DB_USER -d $DB_NAME"]
    interval: 30s
    timeout: 10s
    retries: 5
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
  volumes:
    - redis_data:/data
  command: redis-server --appendonly yes
volumes:
  postgres_data:
  redis_data:
EOF
    
    # Start Docker services
    print_status "Starting Docker services..."
    docker compose up -d
    
    # Wait for database to be ready
    print_status "Waiting for database to be ready..."
    sleep 30
    
    # Check ports
    print_status "Checking port availability..."
    check_port 80 || exit 1
    check_port 443 || exit 1
    check_port 5001 || exit 1
    check_port 6379 || exit 1
    check_port 5432 || exit 1
    
    # Install frontend dependencies and build
    print_status "Building frontend..."
    cd $PROJECT_DIR/front_end
    npm install
    npm run build
    
    # Install backend dependencies
    print_status "Installing backend dependencies..."
    cd $PROJECT_DIR/http_server
    npm install
    
    # Create environment files
    print_status "Creating environment files..."
    cat > $PROJECT_DIR/http_server/.env << EOF
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME?schema=public"
JWT_SECRET="$JWT_SECRET"
REDIS_URL="$REDIS_URL"
PORT=$PORT
EOF
    
    cat > $PROJECT_DIR/front_end/.env << EOF
NEXT_PUBLIC_BACKEND_URL="http://localhost:$PORT/api/v1"
EOF
    
    # Run database migrations
    print_status "Running database migrations..."
    cd $PROJECT_DIR/http_server
    npx prisma migrate deploy
    
    # Setup PM2 processes
    print_status "Setting up PM2 processes..."
    pm2 delete all 2>/dev/null
    
    # Start backend
    pm2 start npm --name "backend" -- start
    
    # Save PM2 configuration
    pm2 save
    
    # Setup PM2 startup
sudo pm2 startup
pm2 save

# Configure Nginx
print_status "Configuring Nginx..."
cat > /tmp/trading_hub_nginx.conf << EOF
server {
    listen 80;
    server_name your_domain.com;

    # Frontend static files
    location / {
        root $PROJECT_DIR/front_end/.next;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Copy Nginx config
sudo cp /tmp/trading_hub_nginx.conf /etc/nginx/sites-available/trading_hub
sudo ln -sf /etc/nginx/sites-available/trading_hub /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

# Configure firewall
print_status "Configuring firewall..."
if command -v ufw &> /dev/null; then
    sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable
else
    print_warning "UFW not found, please configure firewall manually"
fi

# Show status
print_success "Deployment completed!"
echo "Frontend: http://your_domain.com"
echo "Backend: http://localhost:$PORT"
echo "Database: localhost:5432"
echo "Redis: localhost:6379"
echo ""
echo "PM2 Processes:"
pm2 list
}

# Build function
build() {
    print_status "Building application..."
    cd $PROJECT_DIR/front_end
    npm install
    npm run build
    
    cd $PROJECT_DIR/http_server
    npm install
    
    print_success "Build completed!"
}

# Start function
start() {
    print_status "Starting services..."
    cd $PROJECT_DIR
    docker-compose up -d
    
    cd $PROJECT_DIR/http_server
    pm2 start npm --name "backend" -- start
    pm2 save
    
    print_success "Services started!"
}

# Stop function
stop() {
    print_status "Stopping services..."
    cd $PROJECT_DIR
    docker-compose down
    
    pm2 stop backend
    pm2 delete backend
    
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
    echo "Trading Hub Deployment Manager"
    echo "=============================="
    echo "1. Deploy full application"
    echo "2. Build application"
    echo "3. Start services"
    echo "4. Stop services"
    echo "5. Check status"
    echo "6. Check ports"
    echo "7. Exit"
    echo ""
    echo -n "Enter your choice: "
    read choice
    
    case $choice in
        1)
            deploy
            ;;
        2)
            build
            ;;
        3)
            start
            ;;
        4)
            stop
            ;;
        5)
            status
            ;;
        6)
            check_ports
            ;;
        7)
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

# Check ports function
check_ports() {
    print_status "Checking port usage..."
    echo "Port Status:"
    echo "80 (HTTP): $(lsof -Pi :80 -sTCP:LISTEN -t >/dev/null && echo "✓ In use" || echo "✗ Available")"
    echo "443 (HTTPS): $(lsof -Pi :443 -sTCP:LISTEN -t >/dev/null && echo "✓ In use" || echo "✗ Available")"
    echo "5001 (Backend): $(lsof -Pi :5001 -sTCP:LISTEN -t >/dev/null && echo "✓ In use" || echo "✗ Available")"
    echo "6379 (Redis): $(lsof -Pi :6379 -sTCP:LISTEN -t >/dev/null && echo "✓ In use" || echo "✗ Available")"
    echo "5432 (PostgreSQL): $(lsof -Pi :5432 -sTCP:LISTEN -t >/dev/null && echo "✓ In use" || echo "✗ Available")"
}

# Make script executable
chmod +x $0

# Run main menu
show_menu