#!/bin/bash

# Create database and user
psql -U postgres -c "CREATE DATABASE trading_hub;"
psql -U postgres -c "CREATE USER trading_hub_user WITH PASSWORD 'trading_hub_password';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE trading_hub TO trading_hub_user;"

# Apply migrations
cd /home/ubuntu/trading_hub/http_server
npx prisma migrate deploy

# Create environment files
cat > /home/ubuntu/trading_hub/http_server/.env << EOF
DATABASE_URL="postgresql://trading_hub_user:trading_hub_password@localhost:5432/trading_hub?schema=public"
JWT_SECRET="your_jwt_secret_key_here"
REDIS_URL="redis://localhost:6379"
PORT=5001
EOF

cat > /home/ubuntu/trading_hub/front_end/.env << EOF
NEXT_PUBLIC_BACKEND_URL="http://localhost:5001/api/v1"
EOF

echo "Database setup complete!"