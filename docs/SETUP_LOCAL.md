# 🚀 Ghid Complet: Rulare Combat Zone Moisei în VS Code (Windows)

## 📋 **Cerințe Preliminare**

Trebuie să ai instalate pe Windows:

1. **Node.js** (v18+): https://nodejs.org/
2. **Python** (v3.9+): https://www.python.org/
3. **MongoDB Community Edition**: https://www.mongodb.com/try/download/community
4. **VS Code**: https://code.visualstudio.com/

---

## 📦 **PASUL 1: Instalare MongoDB pe Windows**

### **A. Descarcă și Instalează MongoDB:**

1. Descarcă de aici: https://www.mongodb.com/try/download/community
2. Alege: **Windows x64 MSI**
3. Rulează installer-ul
4. La "Service Configuration":
   - ✅ Bifează: "Install MongoDB as a Service"
   - ✅ Service Name: MongoDB
   - ✅ Run service as Network Service user
5. Click "Install"

### **B. Verifică Instalarea:**

**⚠️ IMPORTANT:** Nu copiați formatările Markdown (```bash sau #) - acestea sunt doar pentru documentație!

Deschide **Command Prompt CA ADMINISTRATOR**:
1. Apasă tasta **Windows**
2. Tastează: **cmd**
3. Click **DREAPTA** pe "Command Prompt"
4. Selectează: **"Run as administrator"**

Apoi rulează doar comanda (fără ```bash sau #):

```
sc query MongoDB
```

**Ce să așteptați:**

✅ **Dacă MongoDB este instalat:**
```
SERVICE_NAME: MongoDB
STATE: 4 RUNNING
```

❌ **Dacă MongoDB NU este instalat:**
```
[SC] EnumQueryServicesStatus:OpenService FAILED 1060:
The specified service does not exist
```

### **C. Pornește MongoDB:**

MongoDB ar trebui să pornească automat ca serviciu. Dacă nu, în CMD ca Administrator:

```
net start MongoDB
```

✅ Dacă vezi "The MongoDB service was started successfully" → MongoDB rulează!

**Dacă primiți "Access is denied":** Rulați CMD ca Administrator (vezi pasul B)

---

## 🔧 **PASUL 2: Setup Backend (FastAPI)**

### **A. Deschide VS Code și Terminalul:**

1. Deschide folder-ul proiectului în VS Code
2. Terminal → **New Terminal** (sau `Ctrl + Shift + `)

### **B. Navighează în folder-ul backend:**

```bash
cd backend
```

### **C. Creează Mediul Virtual (IMPORTANT - Procedură Actualizată):**

**⚠️ ATENȚIE:** Dacă ai deja un folder `venv` din încercări anterioare, ȘTERGE-L mai întâi!

```bash
# Șterge mediul virtual vechi (dacă există)
rmdir /s /q venv

# Creează mediu virtual NOU
python -m venv venv
```

### **D. Activează Mediul Virtual:**

```bash
# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# SAU Windows Command Prompt:
venv\Scripts\activate.bat
```

✅ Ar trebui să vezi `(venv)` înainte de prompt

### **E. Upgrade pip și Instalează Dependențele:**

```bash
# Upgrade pip
python -m pip install --upgrade pip

# Instalează dependențele ESENȚIALE (fără emergentintegrations)
pip install fastapi==0.110.1 uvicorn==0.25.0 motor==3.3.1 pymongo==4.5.0 python-dotenv>=1.0.1 pydantic>=2.6.4 requests>=2.31.0 pandas>=2.2.0 python-multipart>=0.0.9
```

**Așteaptă 2-3 minute pentru instalare.**

### **F. Verifică că uvicorn a fost instalat CORECT:**

```bash
python -m uvicorn --version
```

✅ Ar trebui să vezi: `Running uvicorn X.XX.X with CPython 3.XX.X on Windows`

### **G. Creează/Verifică fișierul `.env`:**

Creează fișierul `backend/.env` cu următorul conținut (sau verifică că există):

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=combat_zone_db
CORS_ORIGINS=*
```

**Cum să creezi fișierul în VS Code:**
1. Click dreapta pe folderul `backend` → **New File**
2. Denumește: `.env` (cu punct la început!)
3. Copiază cele 3 linii de mai sus
4. Salvează (Ctrl+S)

### **H. Pornește Backend-ul:**

```bash
python -m uvicorn server:app --reload --port 8001
```

✅ **Ar trebui să vezi:**
```
INFO:     Uvicorn running on http://127.0.0.1:8001 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Application startup complete.
```

✅ **Backend rulează pe:** `http://localhost:8001`

**Testează:** Deschide browser și mergi la `http://localhost:8001/api/` - ar trebui să vezi `{"message":"Hello World"}`

---

## 🎨 **PASUL 3: Setup Frontend (React)**

### **A. Deschide un Terminal NOU în VS Code:**

- Terminal → **New Terminal** (sau `Ctrl + Shift + `)
- **Important:** NU închide terminalul backend-ului!

### **B. Navighează în folder-ul frontend:**

```bash
cd frontend
```

### **C. Creează/Verifică fișierul `.env`:**

Creează fișierul `frontend/.env` cu următorul conținut:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

**⚠️ IMPORTANT:** Asigură-te că URL-ul este exact `http://localhost:8001` (fără slash la final)

### **D. Instalează Dependențele:**

```bash
npm install
```

**Așteaptă 2-5 minute pentru instalare.**

### **E. Pornește Frontend-ul:**

```bash
npm start
```

Browser-ul va deschide automat site-ul la:

✅ **Frontend rulează pe:** `http://localhost:3000`

---

## 🎯 **Structura Terminale în VS Code**

După ce ai urmat pașii, ar trebui să ai **2 terminale deschise**:

```
Terminal 1: Backend (FastAPI)
├── Location: backend/
├── Environment: (venv) activat
├── Command: python -m uvicorn server:app --reload --port 8001
└── Status: ✅ Running on http://127.0.0.1:8001

Terminal 2: Frontend (React)
├── Location: frontend/
├── Command: npm start
└── Status: ✅ Running on http://localhost:3000
```

---

## 🚀 **PASUL 3.5: Script-uri Automate (RECOMANDAT)**

Pentru a evita problemele cu mediul virtual, creați aceste script-uri automate:

### **Script 1: Setup Backend (`setup_env.bat`)**

Creați fișierul `backend/setup_env.bat`:

```batch
@echo off
echo ============================================
echo   Combat Zone Moisei - Backend Setup
echo ============================================
echo.
echo [1/5] Creating virtual environment...
python -m venv venv
echo.
echo [2/5] Activating virtual environment...
call venv\Scripts\activate.bat
echo.
echo [3/5] Upgrading pip...
python -m pip install --upgrade pip
echo.
echo [4/5] Installing dependencies...
pip install fastapi==0.110.1 uvicorn==0.25.0 motor==3.3.1 pymongo==4.5.0 python-dotenv>=1.0.1 pydantic>=2.6.4 requests>=2.31.0 pandas>=2.2.0 python-multipart>=0.0.9
echo.
echo [5/5] Verifying installation...
pip list | findstr "motor uvicorn fastapi"
echo.
echo ============================================
echo   Setup complete!
echo ============================================
echo.
echo To start backend:
echo   1. venv\Scripts\activate.bat
echo   2. python -m uvicorn server:app --reload --port 8001
echo.
pause
```

**Când să-l folosiți:**
- După ce clonați/descărcați proiectul prima dată
- Când întâmpinați erori "No module named X"
- După ce ștergeți/recreați folderul venv

**Cum să-l rulați:**
```bash
cd backend
setup_env.bat
```

---

### **Script 2: Pornire Backend (`start_backend.bat`)**

Creați fișierul `backend/start_backend.bat`:

```batch
@echo off
echo ============================================
echo   Combat Zone Moisei - Backend Server
echo ============================================
echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat
echo.
echo Checking key dependencies...
pip list | findstr "motor uvicorn fastapi" > nul
if errorlevel 1 (
    echo.
    echo ERROR: Dependencies not installed!
    echo Please run setup_env.bat first.
    echo.
    pause
    exit /b 1
)
echo Dependencies OK!
echo.
echo Starting backend server on http://localhost:8001...
echo Press CTRL+C to stop the server
echo.
python -m uvicorn server:app --reload --port 8001
```

**Când să-l folosiți:**
- Pentru a porni backend-ul rapid
- În loc de activare manuală venv + uvicorn

**Cum să-l rulați:**
```bash
cd backend
start_backend.bat
```

---

## 🧪 **PASUL 4: Testare Completă**

### **1. Testează Backend-ul:**

Deschide un terminal nou (al treilea) și rulează:

```bash
curl http://localhost:8001/api/
```

✅ **Răspuns așteptat:** `{"message":"Hello World"}`

```bash
curl http://localhost:8001/api/reservations/blocked-times
```

✅ **Răspuns așteptat:** `{"success":true,"data":[...]}`

### **2. Testează Frontend-ul:**

Deschide browser la `http://localhost:3000` și verifică:

- ✅ Homepage se încarcă (design neon-tech cu gradient roz-purple)
- ✅ Navigarea între pagini funcționează (Acasă, Despre Noi, Regulament, Tarife, Galerie)
- ✅ Butonul "REZERVĂ" funcționează
- ✅ Formularul de rezervare se afișează

### **3. Testează Integrarea Google Sheets:**

1. Mergi la **Rezervări**: `http://localhost:3000/rezervari`
2. Selectează un pachet din dropdown (ex: "Pachet răcoritor")
3. Selectează data: **17/02/2026**
4. Ar trebui să vezi:
   - Dropdown "Ora dorită" se populează cu ore
   - Ora **15:00** apare ca **"OCUPAT"** (sau este disabled/roșie)
   - Alte ore sunt disponibile

✅ **Dacă vezi ora 15:00 blocată → Integrarea Google Sheets funcționează!**

---

## 🛑 **Cum Să Oprești Aplicația**

### **Oprire Backend:**
- În terminalul backend, apasă: **Ctrl + C**

### **Oprire Frontend:**
- În terminalul frontend, apasă: **Ctrl + C**
- Confirmă cu **Y** dacă întreabă

### **Oprire MongoDB (opțional):**
```bash
# Rulează ca Administrator
net stop MongoDB
```

---

## 🔄 **Cum Să Repornești Aplicația**

### **Repornire Rapidă:**

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate
python -m uvicorn server:app --reload --port 8001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

---

## 🐛 **Depanare - Probleme Comune**

### **❌ Problema 1: "No module named uvicorn" SAU "No module named motor"**

**Cauză:** Dependențele nu sunt instalate în mediul virtual SAU venv-ul nu este activat.

**🔍 Diagnostic Rapid:**

```bash
# Verifică dacă venv-ul este activat (ar trebui să vezi (venv) în prompt)
# Dacă NU vezi (venv), activează:
venv\Scripts\activate

# Verifică unde este pip-ul
where pip
```

✅ **Răspuns corect:** `C:\...\backend\venv\Scripts\pip.exe`
❌ **Răspuns greșit:** `C:\Python314\Scripts\pip.exe` (pip-ul global!)

**💡 Soluție Rapidă (RECOMANDAT):**
```bash
cd backend
setup_env.bat
```

**🔧 Soluție Manuală:**
```bash
cd backend
# Dezactivează orice venv existent
deactivate
# Activează venv-ul corect
venv\Scripts\activate
# Verifică că pip-ul este din venv
where pip
# Instalează dependențele
pip install fastapi==0.110.1 uvicorn==0.25.0 motor==3.3.1 pymongo==4.5.0 python-dotenv>=1.0.1 pydantic>=2.6.4 requests>=2.31.0 pandas>=2.2.0 python-multipart>=0.0.9
# Verifică instalarea
pip list | findstr "motor uvicorn"
```

**🛡️ Prevenție:**
- Creați și folosiți script-urile `setup_env.bat` și `start_backend.bat` (vezi Pasul 3.5)
- Verificați întotdeauna că vedeți `(venv)` în terminal înainte de a instala pachete
- Nu ștergeți folderul `venv` fără motiv

**📋 Checklist de Debugging:**
1. ✅ Este venv-ul activat? → Vedeți `(venv)` în terminal?
2. ✅ Este pip-ul corect? → `where pip` arată calea către venv?
3. ✅ Este modulul instalat? → `pip list | findstr motor`
4. ✅ Este Python-ul corect? → `where python` arată calea către venv?

---

### **❌ Problema 2: "KeyError: 'MONGO_URL'"**

**Cauză:** Fișierul `.env` lipsește sau nu conține MONGO_URL.

**Soluție:**
1. Creează `backend/.env` cu conținut:
   ```
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=combat_zone_db
   CORS_ORIGINS=*
   ```
2. Restart backend

---

### **❌ Problema 3: "MongoDB connection failed"**

**Cauză:** MongoDB nu rulează.

**Soluție:**
```bash
# Verifică dacă MongoDB rulează
net start MongoDB

# SAU pornește manual (rulează ca Administrator)
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"
```

**Verificare:**
```bash
tasklist /FI "IMAGENAME eq mongod.exe"
```
✅ Dacă vezi `mongod.exe` în listă → MongoDB rulează!

---

### **❌ Problema 4: "Port 8001 already in use"**

**Cauză:** Alt proces folosește portul 8001.

**Soluție:**
```bash
# Găsește procesul
netstat -ano | findstr :8001

# Omoară procesul (înlocuiește <PID> cu numărul găsit)
taskkill /PID <PID> /F
```

---

### **❌ Problema 5: "Port 3000 already in use"**

**Cauză:** Alt proces folosește portul 3000.

**Soluție:**
- Frontend va întreba dacă vrei să folosești alt port (ex: 3001)
- Apasă **Y** pentru a accepta

---

### **❌ Problema 6: Frontend nu se conectează la Backend**

**Verifică:**
1. Backend-ul rulează pe `http://localhost:8001`
2. Fișierul `frontend/.env` conține:
   ```
   REACT_APP_BACKEND_URL=http://localhost:8001
   ```
3. Restart frontend după modificarea `.env`:
   - Apasă Ctrl+C în terminalul frontend
   - Rulează din nou `npm start`

**Testare conexiune:**
```bash
curl http://localhost:8001/api/
```
✅ Dacă primești `{"message":"Hello World"}` → Backend-ul funcționează

---

### **❌ Problema 7: "pip install" instalează în user folder, nu în venv**

**Cauză:** Permisiuni sau venv corupt.

**Soluție:**
```bash
cd backend
# Șterge venv complet
rmdir /s /q venv
# Creează din nou
python -m venv venv
# Activează
venv\Scripts\activate
# Verifică că (venv) apare în prompt
# Instalează cu --no-user
pip install --no-user fastapi uvicorn motor pymongo python-dotenv pydantic requests pandas python-multipart
```

---

## 📊 **Monitorizare și Loguri**

### **Backend Logs:**
- Vezi în terminal unde rulează backend-ul
- Fiecare request API apare în log

### **Frontend Logs:**
- Vezi în terminal unde rulează frontend-ul
- **SAU** deschide **Browser DevTools** (F12) → **Console**

### **MongoDB Logs:**
- Windows Event Viewer → Windows Logs → Application
- Caută evenimente de la "MongoDB"

---

## 🎉 **Success Checklist**

Dacă toate acestea funcționează, ești gata! ✅

- [ ] MongoDB instalat și rulează (`net start MongoDB`)
- [ ] Backend pornit pe `http://localhost:8001`
- [ ] API `/api/` returnează `{"message":"Hello World"}`
- [ ] Frontend pornit pe `http://localhost:3000`
- [ ] Homepage se încarcă cu design neon-tech
- [ ] Navigarea între pagini funcționează
- [ ] Formularul de rezervare se afișează
- [ ] API call-uri funcționează (vezi în browser console Network tab)
- [ ] Rezervările din Google Sheets apar ca blocate (testează cu data 17/02/2026)

---

## 💡 **Tips & Tricks**

### **VS Code Extensions Recomandate:**

1. **Python** (Microsoft) - Pentru backend
2. **ES7+ React/Redux/React-Native** - Pentru frontend
3. **Thunder Client** - Pentru testare API
4. **MongoDB for VS Code** - Pentru vizualizare database

### **Comenzi Utile:**

```bash
# Verifică toate serviciile

# MongoDB:
net start MongoDB

# Backend (în backend/ cu venv activat):
python -m uvicorn server:app --reload --port 8001

# Frontend (în frontend/):
npm start
```

### **Shortcut-uri VS Code:**

- `Ctrl + Shift + ` → Deschide terminal nou
- `Ctrl + ~` → Toggle terminal
- `F12` în browser → DevTools (pentru debugging frontend)

---

## 📞 **Ai Nevoie de Ajutor?**

Dacă întâmpini probleme, verifică:
1. ✅ Toate serviciile rulează (MongoDB, Backend, Frontend)
2. ✅ Fișierele `.env` sunt configurate corect
3. ✅ Node.js, Python și MongoDB sunt instalate corect
4. ✅ Porturile 8001 și 3000 sunt libere
5. ✅ Mediul virtual Python (venv) este activat când rulezi backend-ul

---

## 📝 **Notițe Importante**

1. **NU adăuga `emergentintegrations` în requirements.txt** - acesta funcționează doar în cloud, nu local
2. **Mediul virtual (venv) TREBUIE activat** înainte de a porni backend-ul
3. **Fișierele `.env` TREBUIE să existe** în ambele foldere (backend și frontend)
4. **MongoDB TREBUIE să ruleze** înainte de a porni backend-ul
5. **Backend TREBUIE să ruleze** înainte de a testa frontend-ul complet

---

## 🚀 **Deployment (Pentru Producție)**

Pentru a publica site-ul live pe internet, consultă documentația Emergent pentru deployment sau contactează echipa de suport.

**Alternativ**, poți folosi platforme precum:
- **Vercel** (pentru frontend)
- **Heroku** / **Railway** (pentru backend)
- **MongoDB Atlas** (pentru database cloud)

---

## 📄 **Fișiere Importante**

```
LasertagGabriel-updated/
├── backend/
│   ├── .env                    ← CONFIGURĂRI BACKEND
│   ├── server.py               ← API Principal
│   ├── google_sheets_service.py ← Integrare Google Sheets
│   └── requirements.txt         ← Dependențe Python
├── frontend/
│   ├── .env                    ← CONFIGURĂRI FRONTEND
│   ├── src/
│   │   ├── App.js              ← Aplicație React principală
│   │   ├── mock.js             ← Tot conținutul text al site-ului
│   │   └── pages/              ← Toate paginile (Home, About, etc.)
│   └── package.json            ← Dependențe Node.js
└── SETUP_LOCAL.md              ← Acest ghid!
```

---

## 🎊 **Succes cu dezvoltarea! 🚀**

Website-ul Combat Zone Moisei este acum complet funcțional local pe calculatorul tău! 

Dacă ai urmat toți pașii, ar trebui să ai:
- ✅ Un backend FastAPI funcțional
- ✅ Un frontend React cu design neon-tech
- ✅ Integrare completă cu Google Sheets pentru rezervări
- ✅ Toate paginile (Home, About, Rules, Pricing, Gallery, Reservations)

**Mult succes cu arena de laser tag! 🎮✨**
