#!/bin/bash

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (using NodeSource for latest LTS)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js installation
node --version
npm --version

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Install Redis
sudo apt install -y redis-server

# Start and enable Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Install Nginx
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Install PM2 for process management
sudo npm install -g pm2

# Install build essentials for native dependencies
sudo apt install -y build-essential

# Install Git
sudo apt install -y git

echo "EC2 instance setup complete!"