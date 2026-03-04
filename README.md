# Combat Zone Moisei 🎯

Modern laser tag arena management system with real-time reservation booking. Fully dockerized and ready for production deployment.

## 🚀 Quick Start

### Prerequisites
- Docker 24.0+
- Docker Compose 2.0+

### Start the Application

```bash
docker-compose up -d --build
```

### Access
- 🌐 **Frontend**: http://localhost:15847
- 🔌 **Backend API**: http://localhost:18392
- 📊 **API Docs**: http://localhost:18392/docs
- 🗄️ **MongoDB**: mongodb://localhost:27514

### Common Commands

```bash
docker-compose up -d --build    # Start all services
docker-compose down             # Stop all services
docker-compose logs -f          # View logs
docker-compose ps               # Check status
docker-compose restart          # Restart all services
```

---

## 📖 Documentation

All documentation is located in the [`docs/`](docs/) directory:

- **[README.md](docs/README.md)** - Main documentation hub
- **[DOCKER.md](docs/DOCKER.md)** - Complete Docker setup and management guide
- **[PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md)** - Full technical documentation
- **[SETUP_LOCAL.md](docs/SETUP_LOCAL.md)** - Local development guide (without Docker)
- **[SETUP_DEPLOY.md](docs/SETUP_DEPLOY.md)** - Production deployment guide
- **[CHANGELOG.md](docs/CHANGELOG.md)** - Version history and changes

---

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   React     │─────→│   FastAPI   │─────→│   MongoDB   │
│  Frontend   │ HTTP │   Backend   │ Async│  Database   │
│   (Nginx)   │      │  (Uvicorn)  │      │   (Mongo)   │
└─────────────┘      └─────────────┘      └─────────────┘
   Port 15847          Port 18392          Port 27514
```

**External Integrations:**
- Google Sheets (CSV) - Reservation scheduling
- WhatsApp - Customer bookings
- Email - Customer bookings

---

## 🎮 Features

✅ **Real-time Reservation System**
- Dynamic availability checking
- 30-minute booking intervals
- 90-minute session duration
- Overlap prevention

✅ **Multi-channel Booking**
- WhatsApp integration
- Email integration
- Form validation

✅ **Content Management**
- 6 pages (Home, About, Rules, Pricing, Gallery, Reservations)
- Static data in mock.js
- Easy content updates

✅ **Admin-friendly**
- Google Sheets for schedule management
- No database needed for reservations
- Simple staff workflow

---

## 🛠️ Technology Stack

**Backend:**
- FastAPI (Python 3.11)
- MongoDB + Motor (Async driver)
- Pandas (Data processing)
- Uvicorn (ASGI server)

**Frontend:**
- React 19
- Tailwind CSS
- Radix UI Components (40+)
- Axios (HTTP client)
- React Router v7

**Infrastructure:**
- Docker & Docker Compose
- Nginx (Frontend server)
- MongoDB 7.0

---

## 📦 Project Structure

```
combat-zone-moisei/
├── backend/
│   ├── Dockerfile
│   ├── server.py
│   ├── google_sheets_service.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── Dockerfile
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
├── docs/
│   ├── README.md
│   ├── DOCKER.md
│   ├── PROJECT_DOCUMENTATION.md
│   ├── SETUP_LOCAL.md
│   ├── SETUP_DEPLOY.md
│   └── CHANGELOG.md
├── docker-compose.yml
├── .dockerignore
└── .gitignore
```

---

## 🔧 Configuration

### Environment Variables

All environment variables are **pre-configured** in `docker-compose.yml` - no `.env` files needed!

**For custom configuration:**
1. Copy `.env.example` to `.env` in backend/frontend directories
2. Update values as needed
3. Docker Compose will automatically use them

**Default values (docker-compose.yml):**
- MongoDB: `mongodb://mongodb:27017`
- Backend: Port `8001`, CORS for localhost
- Frontend: Backend URL `http://localhost:8001`

---

## 🚀 Deployment

### Development
```bash
docker-compose up -d --build
```

### Production
1. Update `docker-compose.yml` for production domains
2. Configure reverse proxy (Nginx/Caddy)
3. Setup SSL certificates (Let's Encrypt)
4. Deploy to VPS/Cloud

See [docs/SETUP_DEPLOY.md](docs/SETUP_DEPLOY.md) for details.

---

## 🧪 Testing

```bash
# Run backend tests
docker-compose exec backend python -m pytest

# View service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Health checks
curl http://localhost:8001/api/
curl http://localhost:3000/health
```

---

## 📞 Contact

**Combat Zone Moisei**
- 📧 Email: lasertag.moisei@outlook.com
- 📱 Phone: +40 765 351 019
- 📍 Address: Str. Izvorul Dragoș nr. 671/E, Moisei, Maramureș
- 🌐 Facebook: @combat.zone.moisei
- 📸 Instagram: @combat.zone.moisei
- 🎵 TikTok: @combat_zone_moisei

---

## 🆘 Troubleshooting

**Services won't start:**
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

**Port conflicts:**
```bash
# Check what's using the port
netstat -ano | findstr :3000    # Windows
lsof -ti:3000                   # Linux/Mac

# Change ports in docker-compose.yml
```

**View detailed logs:**
```bash
docker-compose logs -f --tail=100
```

For more help, see [docs/DOCKER.md](docs/DOCKER.md#troubleshooting)

---

## 📄 License

© 2026 Combat Zone Moisei. All rights reserved.

---

**Version:** 2.0.0 (Dockerized)  
**Last Updated:** February 17, 2026  
**Status:** Production Ready ✅
