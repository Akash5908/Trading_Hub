# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 5002

# Start application
CMD ["npm", "start"]