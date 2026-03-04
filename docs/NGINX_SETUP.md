# Nginx Setup

Nginx runs on the host and proxies HTTPS requests to Docker containers:
- Frontend (React) → `127.0.0.1:15847`
- Backend (FastAPI) → `127.0.0.1:18392`

Domain: combatzonemoisei.ro  
SSL: `/root/.acme.sh/combatzonemoisei.ro_ecc/`

## Deploy

```bash
# Copy config
cp nginx.conf /etc/nginx/sites-available/combatzone
ln -s /etc/nginx/sites-available/combatzone /etc/nginx/sites-enabled/combatzone

# Test and reload
nginx -t
systemctl reload nginx
```

## Troubleshooting

**502 Bad Gateway** — containers not running or not accessible:
```bash
docker-compose ps
curl http://localhost:18392/api/
curl http://localhost:15847
```

**Config test fails:**
```bash
nginx -t
```

**Permission denied on log directory:**
```bash
chown -R www-data:www-data /var/log/nginx
```

**Port 80/443 already in use:**
```bash
lsof -i :80
systemctl stop apache2   # if apache is running
```

## Rate Limiting (optional)

Add to `/etc/nginx/nginx.conf` inside the `http {}` block:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=general:10m rate=50r/s;
```

Then add to location blocks in `sites-available/combatzone`:
```nginx
location /api/ {
    limit_req zone=api burst=20 nodelay;
    ...
}
```

## Common Commands

```bash
nginx -t                            # test config
systemctl reload nginx              # reload config
systemctl restart nginx             # full restart
tail -f /var/log/nginx/error.log    # error logs
```

