from fastapi import FastAPI, APIRouter, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Dict
import uuid
from datetime import datetime, timezone
from google_sheets_service import get_blocked_times, get_available_times_for_date


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Reservation endpoints
@api_router.get("/reservations/blocked-times")
async def get_blocked_time_slots():
    """Get all blocked time slots from Google Sheets"""
    try:
        print("INFO: API /reservations/blocked-times called")  # ← ADĂUGAT
        blocked_slots = get_blocked_times()
        print(f"INFO: Returning {len(blocked_slots)} blocked slots")  # ← ADĂUGAT
        return {"success": True, "data": blocked_slots}
    except Exception as e:
        print(f"ERROR in get_blocked_time_slots: {e}")  # ← MODIFICAT
        import traceback  # ← ADĂUGAT
        traceback.print_exc()  # ← ADĂUGAT
        return {"success": False, "error": str(e), "data": []}

@api_router.get("/reservations/available-times")
async def get_available_times(date: str = Query(..., description="Date in YYYY-MM-DD format")):
    """Get available time slots for a specific date"""
    try:
        print(f"INFO: API /reservations/available-times called for date: {date}")  # ← ADĂUGAT
        result = get_available_times_for_date(date)
        print(f"INFO: Found {len(result.get('available', []))} available and {len(result.get('blocked', []))} blocked slots")  # ← ADĂUGAT
        return {"success": True, "date": date, **result}
    except Exception as e:
        print(f"ERROR in get_available_times: {e}")  # ← MODIFICAT
        import traceback  # ← ADĂUGAT
        traceback.print_exc()  # ← ADĂUGAT
        return {"success": False, "error": str(e), "data": []}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()