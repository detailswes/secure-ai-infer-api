# Use official Node.js Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose app port
EXPOSE 3000

# Install curl for healthcheck
RUN apk add --no-cache curl

# HEALTHCHECK uses curl for a reliable check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/health || exit 1

# Start app
CMD ["node", "src/app.js"]
