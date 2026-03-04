# Docker

Three services: MongoDB (27514), Backend/FastAPI (18392), Frontend/nginx (15847). All bound to 127.0.0.1.

## Setup

```bash
# Copy and fill in environment file
cp backend/.env.example backend/.env
nano backend/.env

# Build and start
docker-compose up -d --build
```

Access:
- Frontend: http://localhost:15847
- Backend API: http://localhost:18392
- API Docs: http://localhost:18392/docs
- MongoDB: mongodb://localhost:27514

## Common Commands

```bash
docker-compose ps                     # status
docker-compose logs -f                # all logs
docker-compose logs -f backend        # single service logs
docker-compose restart backend        # restart a service
docker-compose down                   # stop, keep data
docker-compose down -v                # stop, delete data
docker-compose build --no-cache       # full rebuild
```

## Accessing Containers

```bash
docker-compose exec backend bash
docker-compose exec frontend sh
docker-compose exec mongodb mongosh combat_zone_db
```

## Troubleshooting

**Port already in use:**
```bash
# Linux/Mac
lsof -ti:15847 | xargs kill -9

# Windows
netstat -ano | findstr :15847
taskkill /PID <PID> /F
```

**Build fails:**
```bash
docker system prune -a
docker-compose build --no-cache
```

**502 Bad Gateway:**
```bash
# Check containers are running and healthy
docker-compose ps

# Test direct access
curl http://localhost:18392/api/
curl http://localhost:15847
```

**Containers restarting:**
```bash
docker-compose logs --tail=100 <service>
```

## Backup

```bash
# Backup MongoDB
docker-compose exec mongodb mongodump --archive=/data/backup.archive
docker cp combat-zone-mongodb:/data/backup.archive ./backup.archive

# Restore
docker cp ./backup.archive combat-zone-mongodb:/data/backup.archive
docker-compose exec mongodb mongorestore --archive=/data/backup.archive
```

## Resource Usage

```bash
docker stats
```

Health checks run automatically:
- Backend: `/api/` every 30s
- Frontend: `/health` every 30s
- MongoDB: ping every 10s
