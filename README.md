# NGINX Introduction 🚀

Welcome to the **NGINX Introduction** repository! This project serves as a guide to understanding and implementing essential configurations for NGINX, a high-performance HTTP server, reverse proxy, and load balancer.

## Table of Contents
- [Overview](#overview)
- [Key Configurations](#key-configurations)
- [Worker Processes and Connections](#worker-processes-and-connections)
- [HTTP Configuration](#http-configuration)
- [Load Balancing with `upstream`](#load-balancing-with-upstream)
- [SSL Configuration](#ssl-configuration)
- [Redirecting HTTP to HTTPS](#redirecting-http-to-https)
- [Important Notes](#important-notes)
- [How to Run](#how-to-run)
- [License](#license)

---

## Overview

This repository demonstrates how to configure NGINX for:
- Reverse proxy setup
- Load balancing
- SSL certificate integration
- Efficient traffic handling with optimized worker processes and connections
- Secure redirection from HTTP to HTTPS

---

## Key Configurations

### Worker Processes and Connections
- **`worker_processes`**:
  - Defines the number of worker processes to handle requests.
  - Default: `1`.
  - For optimal performance, set to the number of CPU cores available (use `auto`).

- **`worker_connections`**:
  - Specifies the maximum number of simultaneous connections per worker process.
  - Default: `1024`.
  - Adjust this value based on expected traffic for better performance.

---

### HTTP Configuration
- **`http` block**:
  - Contains global configurations for HTTP traffic.
  - Includes MIME type settings, server blocks, and upstream configurations.

- **`server` block**:
  - Defines how NGINX should handle incoming requests for a specific domain or IP.
  - Configures listening ports, SSL settings, and request routing.

---

### Load Balancing with `upstream`
- **`upstream` block**:
  - Groups backend servers for load balancing.
  - Algorithm: `least_conn` (sends requests to the server with the fewest active connections).
  - Example setup:
    ```nginx
    upstream nodejs_cluster {
        least_conn;
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
        server 127.0.0.1:3003;
    }
    ```

---

### SSL Configuration
- **Self-signed Certificate**:
  - Configures HTTPS using self-signed SSL certificates.
  - Paths:
    - Certificate: `C:/Users/tusha/OneDrive/Desktop/NGINX-introduction/nginx_certs/nginx-selfsigned.crt`
    - Key: `C:/Users/tusha/OneDrive/Desktop/NGINX-introduction/nginx_certs/nginx-selfsigned.key`

- **Sample Configuration**:
  ```nginx
  ssl_certificate C:/path/to/nginx-selfsigned.crt;
  ssl_certificate_key C:/path/to/nginx-selfsigned.key;
  ```

---

### Redirecting HTTP to HTTPS
- Redirects all HTTP traffic on port 8080 to HTTPS.
- Configuration:
  ```nginx
  location / {
      return 301 https://$host$request_uri;
  }
  ```

---

## Important Notes
- **Reverse Proxy**:
  - Proxies client requests to backend servers (`nodejs_cluster` in this case).
  - Preserves client IP using headers:
    ```nginx
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    ```

- **MIME Types**:
  - Ensures correct `Content-Type` headers for file responses, enabling proper rendering on the client side.

---

## How to Run
1. Install NGINX:
   - [Download NGINX](https://nginx.org/en/download.html).
2. Clone this repository:
   ```bash
   git clone https://github.com/tusharpamnani/nginx-intro.git
   cd nginx-intro
   ```
3. Start NGINX:
   ```bash
   nginx -c /path/to/your/nginx.conf
   ```
4. Reload NGINX after changes:
   ```bash
   nginx -s reload
   ```
5. Test HTTPS:
   - Open your browser and navigate to `https://localhost`.

---

## License
This repository is licensed under the [MIT License](LICENSE).

---

Feel free to contribute or raise issues for further improvements. Happy configuring! 🎉
