import requests
from datetime import datetime, timedelta
from typing import List, Dict, Any
import csv
from io import StringIO
import os
import time

# --- CONFIGURARE ---
SHEET_URL = os.environ.get(
    'GOOGLE_SHEETS_URL',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRv3VttVsbFUj1YPoYYrc1_CVrQYT5SeZEOh8CeSYmlOawZEtnOWu-9JvyuR77xmfSnoVdXi8FVSYG/pub?output=csv'
)
SESSION_DURATION_MINUTES = int(os.environ.get('SESSION_DURATION_MINUTES', '90'))
OPERATING_HOURS_START = int(os.environ.get('OPERATING_HOURS_START', '10'))
OPERATING_HOURS_END = int(os.environ.get('OPERATING_HOURS_END', '21'))
SLOT_INTERVAL_MINUTES = int(os.environ.get('SLOT_INTERVAL_MINUTES', '30'))

def get_blocked_times() -> List[Dict]:
    """Preia rezervările folosind coloane separate pentru Data și Ora"""
    try:
        # Cache busting pentru a forța Google să trimită datele noi
        separator = "&" if "?" in SHEET_URL else "?"
        url = f"{SHEET_URL}{separator}cache_update={int(time.time())}"
        
        print(f"DEBUG: Fetching Google Sheets from URL: {url[:120]}...")  # ← ADĂUGAT
        
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        print(f"DEBUG: Response status: {response.status_code}")  # ← ADĂUGAT
        print(f"DEBUG: Response length: {len(response.text)} characters")  # ← ADĂUGAT
        
        reader = csv.DictReader(StringIO(response.text))
        blocked_slots = []
        
        row_count = 0  # ← ADĂUGAT
        for row in reader:
            row_count += 1  # ← ADĂUGAT
            
            # Citim coloanele separate
            date_str = row.get('Data', '').strip()
            time_str = row.get('Ora', '').strip()
            status = row.get('Status', '').strip().lower()

            if status != 'confirmat' or not date_str or not time_str:
                if row_count <= 3:  # ← ADĂUGAT - log primele 3 rânduri
                    print(f"DEBUG: Row {row_count} skipped - Data: {date_str}, Ora: {time_str}, Status: {status}")
                continue

            try:
                # Combinăm Data și Ora într-un obiect datetime
                # Format așteptat în Sheet: 25/03/2026 și 14:30
                full_dt_str = f"{date_str} {time_str}"
                start_time = datetime.strptime(full_dt_str, "%d/%m/%Y %H:%M")
                
                end_time = start_time + timedelta(minutes=SESSION_DURATION_MINUTES)
                
                blocked_slots.append({
                    'start_datetime': start_time,
                    'end_datetime': end_time,
                    'date_iso': start_time.strftime('%Y-%m-%d')
                })
                
                print(f"DEBUG: Row {row_count} - Added: {date_str} {time_str}")  # ← ADĂUGAT
            except ValueError as ve:
                print(f"DEBUG: Format invalid pentru rândul {row_count}: {date_str} {time_str} - {ve}")
                continue
        
        print(f"INFO: S-au încărcat {len(blocked_slots)} rezervări confirmate din {row_count} rânduri totale.")  # ← MODIFICAT
        return blocked_slots
    except Exception as e:
        print(f"ERROR: Eroare la sincronizarea cu Google Sheets: {e}")
        import traceback  # ← ADĂUGAT
        traceback.print_exc()  # ← ADĂUGAT
        return []

def is_time_blocked(date_to_check: str, time_to_check: str, blocked_slots: List[Dict]) -> bool:
    """Verifică dacă intervalul se suprapune cu o rezervare existentă"""
    try:
        # 1. Blocaj manual până pe an.luna.zi
        check_date_dt = datetime.strptime(date_to_check, "%Y-%m-%d")
        if check_date_dt <= datetime(2026, 3, 24):
            return True
            
        proposed_start = datetime.strptime(f"{date_to_check} {time_to_check}", "%Y-%m-%d %H:%M")
        proposed_end = proposed_start + timedelta(minutes=SESSION_DURATION_MINUTES)
        
        # 2. Verificare suprapunere (Overlap logic)
        for slot in blocked_slots:
            # Verificăm dacă sunt în aceeași zi pentru a salva performanță
            if slot['date_iso'] == date_to_check:
                if proposed_start < slot['end_datetime'] and proposed_end > slot['start_datetime']:
                    return True
        
        return False
    except Exception:
        return False

def get_available_times_for_date(date_str: str) -> Dict[str, Any]:
    """Funcția principală apelată de website"""
    blocked_slots = get_blocked_times()
    
    available = []
    blocked = []
    
    for hour in range(OPERATING_HOURS_START, OPERATING_HOURS_END):
        for minute in range(0, 60, SLOT_INTERVAL_MINUTES):
            t_str = f"{hour:02d}:{minute:02d}"
            
            if is_time_blocked(date_str, t_str, blocked_slots):
                blocked.append({'time': t_str, 'available': False})
            else:
                available.append({'time': t_str, 'available': True})
    
    return {
        'available': available,
        'blocked': blocked,
        'all_slots': available + blocked
    }