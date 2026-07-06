# Second Desk (2D) Deployment Instructions

This folder contains the files and scripts required to deploy the Second Desk web application on a clean VPS server running Ubuntu/Debian.

## Prerequisites

1. A domain name (`www.sd.kkdes.co.ke` and `sd.kkdes.co.ke`) pointing to your VPS public IP address via DNS A records.
2. Inbound port `80` and `443` open on your VPS firewall (e.g. UFW or security groups).

## Easy One-Click Setup

To deploy the application, SSH into your VPS and run the following command command:

```bash
curl -sSL https://raw.githubusercontent.com/Alee24/2D/main/deployment/deploy.sh -o deploy.sh && chmod +x deploy.sh && sudo ./deploy.sh
```

## What the installer does:

1. **Installs Docker and Docker Compose** automatically if they are not already installed on the host.
2. **Creates directory `/var/www/2d`** and clones the project source files into it.
3. **Resolves SSL certificates** by starting a temporary webserver on port 80 and calling Certbot (Let's Encrypt) to issue HTTP-01 certificates.
4. **Starts the production Apache container** serving the built React static files on port 443 (HTTPS) and port 80 (auto-redirecting to HTTPS).
5. **Configures auto-renewal** for Let's Encrypt certificates every 12 hours.

## Management Commands

All application containers run under Docker Compose project name `2d`. Navigate to the deployment folder `/var/www/2d/deployment` to run control commands:

- **Check logs**:
  ```bash
  docker compose -p 2d logs -f
  ```
- **Stop application**:
  ```bash
  docker compose -p 2d down
  ```
- **Restart application**:
  ```bash
  docker compose -p 2d restart
  ```
- **Rebuild and Update application**:
  ```bash
  docker compose -p 2d up -d --build
  ```
