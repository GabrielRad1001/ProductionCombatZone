# Project Documentation

## Architecture

```
React SPA (Frontend)  FastAPI Backend (Python)  MongoDB
                     
                 Google Sheets (CSV)  blocked time slots
                 WhatsApp/Email  reservation delivery
```

- Frontend: port 15847 (internal 3000)
- Backend: port 18392 (internal 8001)
- MongoDB: port 27514 (internal 27017)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI 0.110.1, Python 3.11, Uvicorn |
| Database | MongoDB 7.0, Motor 3.3.1 (async) |
| Data | Pandas 2.2.0, Requests 2.31.0 |
| Frontend | React 19, React Router 7, Tailwind CSS 3 |
| UI | Radix UI primitives, Lucide React |
| Build | CRACO, Axios, React Hook Form + Zod |

## API Endpoints

```
GET  /api/                                     # health check
POST /api/status                               # create status record
GET  /api/status                               # list status records
GET  /api/reservations/blocked-times           # all blocked slots
GET  /api/reservations/available-times?date=   # available slots for date
```

Response shape for `available-times`:
```json
{
  "date": "YYYY-MM-DD",
  "available": ["10:00", "10:30", ...],
  "blocked": ["14:00", "14:30", ...],
  "all_slots": ["10:00", ...]
}
```

## Environment Variables

All vars in `backend/.env`, loaded via `env_file` in docker-compose.yml.

| Variable | Example | Description |
|----------|---------|-------------|
| `MONGO_URL` | `mongodb://mongodb:27017` | MongoDB connection |
| `DB_NAME` | `combat_zone_db` | Database name |
| `CORS_ORIGINS` | `https://combatzonemoisei.ro` | Allowed origins |
| `GOOGLE_SHEETS_URL` | `https://docs.google.com/...` | Public CSV sheet URL |
| `SHEET_REQUEST_TIMEOUT` | `10` | HTTP timeout (seconds) |
| `SESSION_DURATION_MINUTES` | `90` | Session length |
| `OPERATING_HOURS_START` | `10` | First slot hour |
| `OPERATING_HOURS_END` | `21` | Last slot hour |
| `SLOT_INTERVAL_MINUTES` | `30` | Slot granularity |

Frontend build arg: `REACT_APP_BACKEND_URL=https://combatzonemoisei.ro`

## Google Sheets Format

Sheet must be published as CSV (File  Share  Publish to web  CSV).

Required columns:
- `Data & Ora`: format `dd/mm/yyyy - hh:mm`
- `Status`: only `confirmat` rows block time
- `Nume Client`: optional
- `Pachet`: optional

## Frontend Routes

```
/                Home
/despre-noi      About
/regulament      Rules
/tarife          Pricing
/rezervari       Reservations
/colectie-foto   Gallery
```

## Static Data

All page content lives in `frontend/src/mock.js`. Edit that file to update text, pricing, team members, gallery, testimonials, and contact info without touching components.

## Scheduling Logic

1. Backend fetches Google Sheets CSV on each request
2. Parses confirmed reservations
3. Each reservation blocks a 90-minute window
4. Available slots = 30-minute intervals from `OPERATING_HOURS_START` to `OPERATING_HOURS_END` minus blocked windows
5. Frontend disables blocked slots in the date picker

## File Structure

```
backend/
  server.py                  # FastAPI app, API endpoints
  google_sheets_service.py   # Availability logic
  requirements.txt
  .env                       # not committed
  .env.example               # committed template

frontend/
  src/
    App.js                   # routing
    mock.js                  # all static content
    pages/                   # one file per route
    components/              # Header, Footer
    components/ui/           # Radix UI wrappers

docs/
docker-compose.yml
nginx.conf
redeploy.sh
```
