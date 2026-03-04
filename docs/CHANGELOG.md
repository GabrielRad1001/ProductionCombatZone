# Changelog

## [2.0.2] - 2026-02-17

### Added
- Nginx reverse proxy configuration (`nginx.conf`) for production host
- Security headers, WebSocket support, static asset caching
- Health check endpoint at `/health`
- `docs/NGINX_SETUP.md` setup guide

### Fixed
- Frontend Dockerfile: removed non-root user that prevented nginx from starting

### Changed
- Randomized exposed ports for security:
  - Frontend: 3000 → 15847
  - Backend: 8001 → 18392
  - MongoDB: 27017 → 27514
- All services bound to 127.0.0.1

---

## [2.0.1] - 2026-02-17

### Fixed
- `server.py`: misplaced return statement in `get_status_checks()`
- `requirements.txt`: removed `jq>=1.6.0` which blocked Docker builds (requires libjq-dev)
- Frontend Dockerfile: upgraded from Node 18 to Node 20 (required by react-router-dom@7.x)
- `package.json`: added engine constraints (node >= 20.0.0)
- Removed 16 unused backend dependencies

### Changed
- Extracted hardcoded values to environment variables:
  - `GOOGLE_SHEETS_URL`
  - `SESSION_DURATION_MINUTES` (default: 90)
  - `OPERATING_HOURS_START` (default: 10)
  - `OPERATING_HOURS_END` (default: 21)
  - `SLOT_INTERVAL_MINUTES` (default: 30)
  - `SHEET_REQUEST_TIMEOUT` (default: 10)

---

## [2.0.0] - 2026-02-17

### Added
- Docker support: `backend/Dockerfile`, `frontend/Dockerfile`, `docker-compose.yml`
- `.dockerignore` files for all services
- Health checks for all containers
- Persistent MongoDB volumes
- Bridge network isolation (`combat-zone-network`)
- `docs/DOCKER.md`, `docs/PROJECT_DOCUMENTATION.md`, `docs/CHANGELOG.md`

### Removed
- `backend/setup_env.bat`, `backend/start_backend.bat`
- `start.sh`, `package-lock.json`, `.emergent/`, `memory/`, `test_reports/`, `tests/`
- VS Code devtunnels configuration

### Changed
- All documentation moved to `docs/`
- `.gitignore` updated for Linux/Docker deployment
- All services bound to 127.0.0.1

---

## [1.0.0] - 2026-02-17

Initial release.

- FastAPI backend with MongoDB and Motor async driver
- Google Sheets CSV integration for reservation scheduling
- Availability checking: 90-minute sessions, 30-minute intervals
- React 19 frontend with 6 pages
- Tailwind CSS + Radix UI components
- WhatsApp and email booking integration
