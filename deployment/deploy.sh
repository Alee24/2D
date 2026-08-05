#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration
DOMAIN="www.secondesk.ke"
ALIAS_DOMAIN="secondesk.ke"
EMAIL="mettoalex@gmail.com"
INSTALL_DIR="/var/www/sd"
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
  rm -rf "$INSTALL_DIR/dist"
  docker run --rm \
    -v "$INSTALL_DIR":/app \
    -w /app \
    node:20-alpine \
    sh -c "npm install && rm -rf dist && npm run build"

  # Ensure dist has correct webserver read permissions
  chmod -R 755 "$INSTALL_DIR/dist"

  # Ensure webroot acme-challenge directory exists
  mkdir -p "$INSTALL_DIR/dist/.well-known/acme-challenge"

  # Enable mod_rewrite and mod_ssl on host Apache
  echo "[+] Configuring host Apache modules and disabling legacy sites..."
  if [ "$APACHE_SERVICE" = "apache2" ]; then
    a2enmod rewrite ssl headers >/dev/null 2>&1 || true
    a2dissite 000-default.conf 000-default-le-ssl.conf 2d.conf 2d-le-ssl.conf default-ssl.conf >/dev/null 2>&1 || true
    
    # Create HTTP virtual host config with ACME challenge exception
    VHOST_CONF="/etc/apache2/sites-available/sd.conf"
    echo "[+] Writing host Apache virtual host config to $VHOST_CONF..."
    cat <<EOF > "$VHOST_CONF"
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist

    Alias /.well-known/acme-challenge/ $INSTALL_DIR/dist/.well-known/acme-challenge/
    <Directory "$INSTALL_DIR/dist/.well-known/acme-challenge/">
        Options None
        AllowOverride None
        Require all granted
    </Directory>

    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # SPA Routing: Exclude ACME challenges from fallback to index.html
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_URI} !^/\.well-known/acme-challenge/ [NC]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
EOF
    # Also overwrite 000-default.conf so any fallback requests hit our app
    cat <<EOF > "/etc/apache2/sites-available/000-default.conf"
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist
    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    RewriteEngine On
    RewriteCond %{REQUEST_URI} !^/\.well-known/acme-challenge/ [NC]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</VirtualHost>
EOF
    # Enable site
    a2ensite sd.conf 000-default.conf >/dev/null 2>&1 || true
    systemctl reload apache2
  else
    # RedHat-based httpd configuration
    VHOST_CONF="/etc/httpd/conf.d/sd.conf"
    echo "[+] Writing host httpd virtual host config to $VHOST_CONF..."
    cat <<EOF > "$VHOST_CONF"
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist

    Alias /.well-known/acme-challenge/ $INSTALL_DIR/dist/.well-known/acme-challenge/
    <Directory "$INSTALL_DIR/dist/.well-known/acme-challenge/">
        Options None
        AllowOverride None
        Require all granted
    </Directory>

    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        # SPA Routing: Exclude ACME challenges from fallback to index.html
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_URI} !^/\.well-known/acme-challenge/ [NC]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
EOF
    systemctl reload httpd
  fi

  # Install Certbot if not present
  if ! [ -x "$(command -v certbot)" ]; then
    echo "[+] Installing Certbot on host..."
    apt-get update
    apt-get install -y certbot python3-certbot-apache || yum install -y certbot python3-certbot-apache
  fi

  echo "[+] Checking SSL Certificate..."
  if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    echo "[+] SSL Certificate already exists at /etc/letsencrypt/live/$DOMAIN/fullchain.pem"
  else
    echo "[+] Requesting SSL Certificate using Certbot webroot mode..."
    certbot certonly --webroot -w "$INSTALL_DIR/dist" \
      -d "$DOMAIN" -d "$ALIAS_DOMAIN" \
      --email "$EMAIL" --agree-tos --no-eff-email --non-interactive || \
    certbot --apache -d "$DOMAIN" -d "$ALIAS_DOMAIN" \
      --email "$EMAIL" --agree-tos --no-eff-email --non-interactive || true
  fi

  # Configure HTTPS Virtual Host on host Apache
  if [ "$APACHE_SERVICE" = "apache2" ]; then
    VHOST_SSL_CONF="/etc/apache2/sites-available/sd-ssl.conf"
    echo "[+] Writing host Apache HTTPS virtual host config to $VHOST_SSL_CONF..."
    cat <<EOF > "$VHOST_SSL_CONF"
<VirtualHost *:443>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/$DOMAIN/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/$DOMAIN/privkey.pem

    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    Header always unset Content-Security-Policy
    Header always set Content-Security-Policy "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; style-src * 'unsafe-inline' data: blob: https:; font-src * data: https:; img-src * data: blob: https: http:; connect-src *;"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
</VirtualHost>
EOF
    # Also overwrite 000-default-le-ssl.conf if present so it doesn't point to deleted /var/www/2d
    if [ -f "/etc/apache2/sites-available/000-default-le-ssl.conf" ]; then
      cat <<EOF > "/etc/apache2/sites-available/000-default-le-ssl.conf"
<VirtualHost *:443>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/$DOMAIN/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/$DOMAIN/privkey.pem

    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    Header always unset Content-Security-Policy
    Header always set Content-Security-Policy "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; style-src * 'unsafe-inline' data: blob: https:; font-src * data: https:; img-src * data: blob: https: http:; connect-src *;"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
</VirtualHost>
EOF
    fi
    # Also overwrite 2d-le-ssl.conf if present
    if [ -f "/etc/apache2/sites-available/2d-le-ssl.conf" ]; then
      cat <<EOF > "/etc/apache2/sites-available/2d-le-ssl.conf"
<VirtualHost *:443>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/$DOMAIN/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/$DOMAIN/privkey.pem

    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    Header always unset Content-Security-Policy
    Header always set Content-Security-Policy "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' data: blob:; style-src * 'unsafe-inline' data: blob: https:; font-src * data: https:; img-src * data: blob: https: http:; connect-src *;"
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
</VirtualHost>
EOF
    fi

    # Update HTTP config to redirect to HTTPS
    cat <<EOF > "$VHOST_CONF"
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist

    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    RewriteEngine On
    RewriteCond %{REQUEST_URI} !^/\.well-known/acme-challenge/ [NC]
    RewriteRule ^(.*)$ https://$DOMAIN\$1 [R=301,L]
</VirtualHost>
EOF
    a2ensite sd-ssl.conf sd.conf >/dev/null 2>&1 || true
    systemctl reload apache2
  else
    VHOST_SSL_CONF="/etc/httpd/conf.d/sd-ssl.conf"
    echo "[+] Writing host httpd HTTPS virtual host config to $VHOST_SSL_CONF..."
    cat <<EOF > "$VHOST_SSL_CONF"
<VirtualHost *:443>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/$DOMAIN/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/$DOMAIN/privkey.pem

    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
</VirtualHost>
EOF
    # Update HTTP config to redirect to HTTPS
    cat <<EOF > "$VHOST_CONF"
<VirtualHost *:80>
    ServerName $DOMAIN
    ServerAlias $ALIAS_DOMAIN
    DocumentRoot $INSTALL_DIR/dist

    <Directory $INSTALL_DIR/dist>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    RewriteEngine On
    RewriteCond %{REQUEST_URI} !^/\.well-known/acme-challenge/ [NC]
    RewriteRule ^(.*)$ https://$DOMAIN\$1 [R=301,L]
</VirtualHost>
EOF
    systemctl reload httpd
  fi

else
  echo "[+] Apache is not running on host system. Deploying via standalone Docker Compose..."

  # Ensure the volumes exist
  docker volume create sd_certbot_certs
  docker volume create sd_certbot_webroot

  # Check if Let's Encrypt certificates exist in the docker volume
  echo "[+] Checking for Let's Encrypt SSL certificates..."
  CERT_EXISTS=$(docker run --rm -v sd_certbot_certs:/certs alpine sh -c "[ -f /certs/live/$DOMAIN/fullchain.pem ] && echo 'yes' || echo 'no'")

  if [ "$CERT_EXISTS" = "yes" ]; then
    echo "[+] Certificates already exist. Skipping initial request."
  else
    echo "[+] Certificates NOT found. Obtaining Let's Encrypt SSL Certificate..."

    # Start a temporary web server on port 80 to respond to Certbot HTTP challenge
    echo "[+] Starting temporary web server on port 80 for SSL validation..."
    docker run -d --name temp_http_server \
      -p 80:80 \
      -v sd_certbot_webroot:/usr/share/nginx/html \
      nginx:alpine

    # Wait a moment for server to start
    sleep 3

    # Run Certbot to request certificates
    echo "[+] Requesting Let's Encrypt certificate..."
    docker run --rm \
      -v sd_certbot_certs:/etc/letsencrypt \
      -v sd_certbot_webroot:/var/www/certbot \
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
  docker compose -f deployment/docker-compose.yml -p sd down --remove-orphans || true
  docker compose -f deployment/docker-compose.yml -p sd up -d --build
fi

echo "========================================================="
echo "[+] Second Desk (2D) application deployed successfully!"
echo "    App URL:  https://$DOMAIN"
echo "    Alias URL: https://$ALIAS_DOMAIN"
echo "========================================================="
