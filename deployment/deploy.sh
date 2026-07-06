#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration
DOMAIN="www.sd.kkdes.co.ke"
ALIAS_DOMAIN="sd.kkdes.co.ke"
EMAIL="mettoalex@gmail.com"
INSTALL_DIR="/var/www/2d"
REPO_URL="https://github.com/Alee24/2D.git"

echo "========================================================="
echo " Starting Second Desk (2D) Deployment on $DOMAIN"
echo "========================================================="

# 1. Ensure script is run as root
if [ "$EUID" -ne 0 ]; then
  echo "[-] Please run this script as root (sudo)."
  exit 1
fi

# 2. Install Docker and Docker Compose if not installed
if ! [ -x "$(command -v docker)" ]; then
  echo "[+] Installing Docker..."
  apt-get update
  apt-get install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release
  mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  apt-get update
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
fi

# 3. Create install directory and clone/copy application files
echo "[+] Creating installation directory at $INSTALL_DIR..."
mkdir -p "$INSTALL_DIR"

if [ -d "$INSTALL_DIR/.git" ]; then
  echo "[+] Repository already exists at $INSTALL_DIR. Pulling latest changes..."
  cd "$INSTALL_DIR"
  git fetch --all
  git reset --hard origin/main
else
  echo "[+] Cloning repository to $INSTALL_DIR..."
  git clone "$REPO_URL" "$INSTALL_DIR"
  cd "$INSTALL_DIR"
fi

# Copy default .env if not exists
if [ ! -f .env ]; then
  echo "[+] Creating .env file from template..."
  cp .env.example .env
fi

# 4. Check if Let's Encrypt certificates exist in the docker volume
echo "[+] Checking for Let's Encrypt SSL certificates..."
# Ensure the volume directory exists
docker volume create 2d_certbot_certs
docker volume create 2d_certbot_webroot

CERT_EXISTS=$(docker run --rm -v 2d_certbot_certs:/certs alpine sh -c "[ -f /certs/live/$DOMAIN/fullchain.pem ] && echo 'yes' || echo 'no'")

if [ "$CERT_EXISTS" = "yes" ]; then
  echo "[+] Certificates already exist. Skipping initial request."
else
  echo "[+] Certificates NOT found. Obtaining Let's Encrypt SSL Certificate..."

  # Start a temporary web server on port 80 to respond to Certbot HTTP challenge
  echo "[+] Starting temporary web server on port 80 for SSL validation..."
  docker run -d --name temp_http_server \
    -p 80:80 \
    -v 2d_certbot_webroot:/usr/share/nginx/html \
    nginx:alpine

  # Wait a moment for server to start
  sleep 3

  # Run Certbot to request certificates
  echo "[+] Requesting Let's Encrypt certificate..."
  docker run --rm \
    -v 2d_certbot_certs:/etc/letsencrypt \
    -v 2d_certbot_webroot:/var/www/certbot \
    certbot/certbot certonly --webroot \
    -w /var/www/certbot \
    -d "$DOMAIN" -d "$ALIAS_DOMAIN" \
    --email "$EMAIL" --agree-tos --no-eff-email --non-interactive

  # Stop and remove temporary web server
  echo "[+] Stopping temporary web server..."
  docker stop temp_http_server
  docker rm temp_http_server
fi

# 5. Build and run production containers
echo "[+] Launching Apache and application container..."
docker compose -f deployment/docker-compose.yml -p 2d down --remove-orphans || true
docker compose -f deployment/docker-compose.yml -p 2d up -d --build

echo "========================================================="
echo "[+] Second Desk (2D) application deployed successfully!"
echo "    App URL:  https://$DOMAIN"
echo "    Alias URL: https://$ALIAS_DOMAIN"
echo "========================================================="
