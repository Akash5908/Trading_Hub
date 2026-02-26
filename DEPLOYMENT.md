# Trading Hub Deployment Guide

## Quick Start

### 1. Single Command Deployment
```bash
# Make the deployment script executable
chmod +x deploy_manager.sh

# Run the deployment manager
./deploy_manager.sh
```

### 2. Direct Deployment (Option 1)
```bash
# Deploy everything with one command
./deploy_manager.sh deploy
```

### 3. Direct Deployment (Option 2)
```bash
# Or use the menu system
./deploy_manager.sh
```

## What the Script Does

### Complete Automation:
- **System Setup**: Updates packages, installs Node.js, Docker, PostgreSQL, Nginx, PM2
- **Docker Compose**: Sets up Redis and PostgreSQL containers
- **Application Build**: Installs and builds both frontend and backend
- **Environment Configuration**: Creates all necessary .env files
- **Database Setup**: Runs migrations and creates database
- **Process Management**: Configures PM2 for automatic restarts
- **Web Server**: Sets up Nginx reverse proxy
- **Security**: Configures firewall and SSL (if domain provided)

### Port Management:
- **80**: HTTP (Nginx)
- **443**: HTTPS (Nginx with SSL)
- **5001**: Backend API
- **6379**: Redis
- **5432**: PostgreSQL

## Usage Commands

### Menu System
```bash
./deploy_manager.sh
```
Options:
1. Deploy full application
2. Build application
3. Start services
4. Stop services
5. Check status
6. Check ports
7. Exit

### Direct Commands
```bash
# Deploy everything
./deploy_manager.sh deploy

# Just build
./deploy_manager.sh build

# Start services
./deploy_manager.sh start

# Stop services
./deploy_manager.sh stop

# Check status
./deploy_manager.sh status

# Check ports
./deploy_manager.sh check_ports
```

## Configuration

### Before Deployment:
1. Update repository URL in the script
2. Set your domain name in the Nginx config
3. Configure SSL certificates (optional)

### Environment Variables:
- **JWT_SECRET**: Set a strong secret key
- **Database credentials**: Update in the script if needed
- **Domain**: Replace `your_domain.com` in Nginx config

## Post-Deployment

### Access Points:
- **Frontend**: `http://your_domain.com`
- **Backend API**: `http://your_domain.com/api`
- **Health Check**: `http://your_domain.com/health`
- **Database**: `localhost:5432`
- **Redis**: `localhost:6379`

### Management:
```bash
# Check running processes
pm2 list

# View logs
pm2 logs backend

# Restart services
pm2 restart backend

# View Nginx status
sudo systemctl status nginx
```

## Troubleshooting

### Common Issues:
1. **Port conflicts**: Check with `./deploy_manager.sh check_ports`
2. **Database connection**: Verify Docker containers are running
3. **Build failures**: Check frontend/backend logs separately
4. **Nginx errors**: Check config with `sudo nginx -t`

### Logs:
```bash
# Application logs
pm2 logs

# Docker logs
docker-compose logs

# Nginx logs
sudo tail -f /var/log/nginx/*.log
```

## Security Notes

- Change default passwords before deployment
- Set up SSL certificates for production
- Configure firewall properly
- Use strong JWT secret keys
- Consider using environment variables for sensitive data