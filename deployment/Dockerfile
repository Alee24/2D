# Stage 1: Build React App
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve using Apache httpd
FROM httpd:2.4-alpine

# Copy built application to Apache document root
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Copy custom httpd configuration
COPY deployment/httpd.conf /usr/local/apache2/conf/httpd.conf
