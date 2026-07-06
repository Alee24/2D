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

# Clean up any leftover temporary container from previous runs
docker rm -f temp_http_server >/dev/null 2>&1 || true

# 2. Install Docker if not installed (needed for building and/or running webserver)
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

# 4. Check if host has an active Apache server running on port 80/443
if systemctl is-active --quiet apache2 || systemctl is-active --quiet httpd; then
  APACHE_SERVICE="apache2"
  systemctl is-active --quiet httpd && APACHE_SERVICE="httpd"
  
  echo "[+] Detected running host Apache service ($APACHE_SERVICE)."
  echo "[+] Deploying directly to host Apache webroot..."

  # Build the application using Docker Node image
  echo "[+] Building React app inside Node Docker container..."
  docker run --rm \
    -v "$INSTALL_DIR":/app \
    -w /app \
    node:20-alpine \
    sh -c "npm install && npm run build"

  # Enable mod_rewrite and mod_ssl on host Apache
  echo "[+] Configuring host Apache modules..."
  if [ "$APACHE_SERVICE" = "apache2" ]; then
    a2enmod rewrite ssl headers >/dev/null 2>&1 || true
    
    # Create virtual host config
    VHOST_CONF="/etc/apache2/sites-available/2d.conf"
    echo "[+] Writing host Apache virtual host config to $VHOST_CONF..."
    cat <<EOF > "$VHOST_CONF"
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist

    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # SPA Routing: Fallback all requests to index.html
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
EOF
    # Enable site
    a2ensite 2d.conf >/dev/null 2>&1 || true
    systemctl reload apache2
  else
    # RedHat-based httpd configuration
    VHOST_CONF="/etc/httpd/conf.d/2d.conf"
    echo "[+] Writing host httpd virtual host config to $VHOST_CONF..."
    cat <<EOF > "$VHOST_CONF"
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist

    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # SPA Routing: Fallback all requests to index.html
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
EOF
    systemctl reload httpd
  fi

  # Install Certbot and obtain SSL certificate on host
  if ! [ -x "$(command -v certbot)" ]; then
    echo "[+] Installing Certbot on host..."
    apt-get update
    apt-get install -y certbot python3-certbot-apache || yum install -y certbot python3-certbot-apache
  fi

  echo "[+] Requesting SSL Certificate using host Certbot..."
  certbot --apache -d "$DOMAIN" -d "$ALIAS_DOMAIN" \
    --email "$EMAIL" --agree-tos --no-eff-email --non-interactive --reinstall

  # Final reload of host Apache
  systemctl reload "$APACHE_SERVICE"

else
  echo "[+] Apache is not running on host system. Deploying via standalone Docker Compose..."

  # Ensure the volumes exist
  docker volume create 2d_certbot_certs
  docker volume create 2d_certbot_webroot

  # Check if Let's Encrypt certificates exist in the docker volume
  echo "[+] Checking for Let's Encrypt SSL certificates..."
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

  # Build and run production containers
  echo "[+] Launching Apache and application container..."
  docker compose -f deployment/docker-compose.yml -p 2d down --remove-orphans || true
  docker compose -f deployment/docker-compose.yml -p 2d up -d --build
fi

echo "========================================================="
echo "[+] Second Desk (2D) application deployed successfully!"
echo "    App URL:  https://$DOMAIN"
echo "    Alias URL: https://$ALIAS_DOMAIN"
echo "========================================================="
