# Combat Zone Moisei 🎯

Modern laser tag arena management system with real-time reservation booking.

## 🚀 Quick Start (Docker - Recommended)

### Prerequisites
- Docker 24.0+
- Docker Compose 2.0+

### Start the Application

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Windows (PowerShell):**
```powershell
docker-compose up -d --build
```

**Access:**
- 🌐 Frontend: http://localhost:15847
- 🔌 Backend API: http://localhost:18392
- 📊 API Documentation: http://localhost:18392/docs

### Common Commands

```bash
./start.sh up          # Start all services
./start.sh down        # Stop all services
./start.sh logs        # View logs
./start.sh status      # Check status
./start.sh restart     # Restart services
./start.sh help        # Show all commands
```

---

## 📖 Documentation

- **[DOCKER.md](DOCKER.md)** - Complete Docker guide
- **[NGINX_SETUP.md](NGINX_SETUP.md)** - Nginx reverse proxy setup (production)
- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Full technical documentation
- **[SETUP_LOCAL.md](SETUP_LOCAL.md)** - Local development without Docker
- **[SETUP_DEPLOY.md](SETUP_DEPLOY.md)** - Production deployment guide

---

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   React     │─────→│   FastAPI   │─────→│   MongoDB   │
│  Frontend   │      │   Backend   │      │  Database   │
└─────────────┘      └─────────────┘      └─────────────┘
      │                     │
      │                     ↓
      │              Google Sheets
      │             (Scheduling)
      ↓
WhatsApp/Email
(Reservations)
```

---

## 🎮 Features

- ✅ Real-time reservation availability
- ✅ Google Sheets integration for scheduling
- ✅ WhatsApp & Email booking
- ✅ Responsive design (mobile-first)
- ✅ Multi-page website (Home, About, Rules, Pricing, Gallery)
- ✅ Admin-friendly reservation management

---

## 🛠️ Technology Stack

**Backend:**
- FastAPI (Python)
- MongoDB (Database)
- Motor (Async MongoDB driver)

**Frontend:**
- React 19
- Tailwind CSS
- Radix UI Components
- Axios

**Infrastructure:**
- Docker & Docker Compose
- Nginx (Frontend server)
- Uvicorn (Backend server)

---

## 📦 Project Structure

```
combat-zone-moisei/
├── backend/              # FastAPI backend
│   ├── server.py         # Main API
│   ├── google_sheets_service.py
│   └── Dockerfile
├── frontend/             # React frontend
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   └── mock.js       # Static data
│   └── Dockerfile
├── docker-compose.yml    # Docker orchestration
├── start.sh              # Startup script (Linux/Mac)
└── DOCKER.md             # Docker documentation
```

---

## 🔧 Configuration

### Environment Variables

**Backend** (`backend/.env`):
```env
MONGO_URL=mongodb://mongodb:27017
DB_NAME=combat_zone_db
CORS_ORIGINS=http://localhost:15847
```

**Frontend** (`frontend/.env`):
```env
REACT_APP_BACKEND_URL=http://localhost:18392
```

### Ports

All services exposed on localhost (127.0.0.1):
- Frontend: 15847
- Backend: 18392
- MongoDB: 27514

---

## 🚀 Deployment

### Development
```bash
./start.sh up
```

### Production

1. Update environment variables for production domains
2. Deploy using Docker Compose or Docker Swarm
3. Setup reverse proxy (Nginx/Caddy)
4. Enable HTTPS with Let's Encrypt
5. Configure firewall and security

See [SETUP_DEPLOY.md](SETUP_DEPLOY.md) for detailed instructions.

---

## 🧪 Testing

```bash
# Backend tests
docker-compose exec backend python -m pytest

# View logs
./start.sh logs backend
./start.sh logs frontend
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

## 📄 License

© 2026 Combat Zone Moisei. All rights reserved.

---

## 🆘 Troubleshooting

**Port already in use:**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9    # Mac/Linux
netstat -ano | findstr :3000     # Windows
```

**Services not starting:**
```bash
./start.sh down
./start.sh build
./start.sh up
```

**View detailed logs:**
```bash
./start.sh logs
```

For more help, see [DOCKER.md](DOCKER.md) or contact support.

---

**Version:** 1.0.0  
**Last Updated:** February 17, 2026  
**Status:** Production Ready ✅
