# 🚀 Ghid Deployment: Combat Zone Moisei (Producție)

## 📋 **Cuprins**

1. [Pregătire Proiect pentru Producție](#pregătire-proiect)
2. [Configurări Necesare](#configurări-necesare)
3. [Deployment pe Hosting Provider](#deployment)
4. [Pornire și Oprire Servicii](#pornire-oprire)
5. [Monitorizare și Mentenanță](#monitorizare)
6. [Troubleshooting Producție](#troubleshooting)
7. [Backup și Recuperare](#backup)

---

## 🎯 **Pregătire Proiect pentru Producție** {#pregătire-proiect}

### **Pasul 1: Verificare Finală Locală**

Înainte de deployment, asigurați-vă că totul funcționează local:

**✅ Checklist:**
- [ ] Backend pornește fără erori: `http://localhost:8001`
- [ ] Frontend pornește fără erori: `http://localhost:3000`
- [ ] MongoDB se conectează corect
- [ ] API-urile returnează date corecte (`/api/reservations/blocked-times`)
- [ ] Integrarea Google Sheets funcționează
- [ ] Formularul de rezervări trimite date

---

### **Pasul 2: Curățare Proiect**

Ștergeți fișierele și folderele care NU trebuie încărcate:

```bash
# NU încărcați pe server:
backend/venv/          ❌ (se va crea pe server)
frontend/node_modules/ ❌ (se va instala pe server)
.git/                  ⚠️ (opțional, depinde de provider)
__pycache__/          ❌
*.pyc                 ❌
.DS_Store             ❌
```

**✅ CE trebuie încărcat:**
- `backend/` (cu server.py, google_sheets_service.py, requirements.txt, .env)
- `frontend/` (cu src/, public/, package.json, .env)
- `SETUP_LOCAL.md`, `SETUP_PROD.md`, `README.md`

---

### **Pasul 3: Arhivare Proiect**

Creați un arhivă ZIP sau TAR:

**Opțiunea A: Windows (fără venv și node_modules)**
```bash
# În folderul proiectului
powershell Compress-Archive -Path backend,frontend,*.md -DestinationPath combat_zone_production.zip
```

**Opțiunea B: Manual**
1. Selectați folderele: `backend`, `frontend`, fișierele `.md`
2. Click dreapta → "Send to" → "Compressed (zipped) folder"
3. Denumiți: `combat_zone_production.zip`

---

## ⚙️ **Configurări Necesare** {#configurări-necesare}

### **Backend - Fișierul `.env`**

Pe server, `backend/.env` trebuie actualizat pentru producție:

```env
# MongoDB - folosiți MongoDB Atlas sau MongoDB local pe server
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=combat_zone_db

# CORS - domeniul dvs. de producție
CORS_ORIGINS=https://combatzonemoisei.ro,https://www.combatzonemoisei.ro

# Opțional - pentru debugging
DEBUG=False
ENVIRONMENT=production
```

**⚠️ IMPORTANT:** 
- Înlocuiți `username`, `password`, `cluster` cu datele voastre MongoDB Atlas
- SAU dacă folosiți MongoDB local pe server: `mongodb://localhost:27017`

---

### **Frontend - Fișierul `.env`**

Pe server, `frontend/.env` trebuie să conțină URL-ul backend-ului de producție:

```env
# URL-ul backend-ului (fără slash la final)
REACT_APP_BACKEND_URL=https://combatzonemoisei.ro

# Opțional - dezactivare health check pentru producție
ENABLE_HEALTH_CHECK=false
```

**⚠️ IMPORTANT:** 
- Înlocuiți `https://combatzonemoisei.ro` cu domeniul dvs. real
- Asigurați-vă că backend-ul este accesibil la acest URL

---

### **MongoDB Atlas Setup (Recomandat pentru Producție)**

**De ce MongoDB Atlas?**
- ✅ Gratuit până la 512MB
- ✅ Backup automat
- ✅ Securitate enterprise
- ✅ Scaling automat

**Pași:**

1. **Creați cont:** https://www.mongodb.com/cloud/atlas/register
2. **Creați cluster gratuit** (M0 Sandbox)
3. **Creați user database:**
   - Database Access → Add New Database User
   - Username: `combat_zone_user`
   - Password: (generați unul puternic)
   - Privileges: "Read and write to any database"

4. **Whitelist IP-uri:**
   - Network Access → Add IP Address
   - Opțiune 1: IP-ul serverului dvs.
   - Opțiune 2: "Allow Access from Anywhere" (0.0.0.0/0) - mai puțin sigur

5. **Obțineți Connection String:**
   - Clusters → Connect → Connect your application
   - Copiați connection string-ul
   - Formatul: `mongodb+srv://combat_zone_user:password@cluster0.xxxxx.mongodb.net/`

6. **Actualizați `backend/.env`:**
   ```env
   MONGO_URL=mongodb+srv://combat_zone_user:your_password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   DB_NAME=combat_zone_db
   ```

---

## 🌐 **Deployment pe Hosting Provider** {#deployment}

### **Opțiuni de Hosting:**

1. **VPS (Virtual Private Server)** - Control complet
   - DigitalOcean (de la $6/lună)
   - Linode (de la $5/lună)
   - Vultr (de la $5/lună)
   - Hetzner (de la €4/lună)

2. **Platform as a Service (PaaS)** - Mai simplu
   - Heroku (gratuit cu limitări)
   - Railway (gratuit cu limitări)
   - Render (gratuit cu limitări)

3. **Frontend Separat + Backend VPS**
   - Frontend pe Vercel/Netlify (gratuit)
   - Backend pe VPS propriu

---

### **Deployment pe VPS (Exemplu: Ubuntu Server)**

#### **A. Conectare la Server**

```bash
# SSH în server (înlocuiți cu IP-ul dvs.)
ssh root@YOUR_SERVER_IP
```

#### **B. Instalare Dependențe**

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Instalare Python 3.11+
sudo apt install python3 python3-pip python3-venv -y

# Instalare Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Instalare MongoDB (opțional, dacă nu folosiți Atlas)
# Vezi: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

# Instalare Nginx (reverse proxy)
sudo apt install nginx -y

# Instalare Supervisor (gestiune procese)
sudo apt install supervisor -y
```

#### **C. Upload Proiect pe Server**

**Opțiunea 1: SCP (de pe Windows)**
```bash
scp combat_zone_production.zip root@YOUR_SERVER_IP:/var/www/
```

**Opțiunea 2: FileZilla / WinSCP**
- Conectați-vă prin SFTP
- Uploadați arhiva în `/var/www/`

**Pe server:**
```bash
# Navigați în folder
cd /var/www/

# Dezarhivați
unzip combat_zone_production.zip -d combat_zone

# Navigați în proiect
cd combat_zone
```

#### **D. Setup Backend**

```bash
# Navigați în backend
cd /var/www/combat_zone/backend

# Creați mediu virtual
python3 -m venv venv

# Activați venv
source venv/bin/activate

# Instalați dependențe
pip install -r requirements.txt

# Creați fișierul .env (dacă nu există)
nano .env
```

**Conținut `.env` pentru producție:**
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=combat_zone_db
CORS_ORIGINS=https://combatzonemoisei.ro
```

Salvați cu `Ctrl+X`, apoi `Y`, apoi `Enter`.

**Testare backend:**
```bash
# Porniți temporar pentru test
uvicorn server:app --host 0.0.0.0 --port 8001

# Testați din alt terminal
curl http://localhost:8001/api/
```

Opriți cu `Ctrl+C` după test.

#### **E. Setup Frontend**

```bash
# Navigați în frontend
cd /var/www/combat_zone/frontend

# Creați fișierul .env
nano .env
```

**Conținut `.env`:**
```env
REACT_APP_BACKEND_URL=https://combatzonemoisei.ro
```

```bash
# Instalați dependențe
npm install

# Build pentru producție
npm run build
```

Aceasta va crea folderul `build/` cu fișierele statice optimizate.

---

### **F. Configurare Nginx (Reverse Proxy)**

```bash
# Creați configurație site
sudo nano /etc/nginx/sites-available/combat_zone
```

**Conținut fișier:**
```nginx
# Backend API
server {
    listen 80;
    server_name combatzonemoisei.ro www.combatzonemoisei.ro;

    # Frontend static files
    location / {
        root /var/www/combat_zone/frontend/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Activați site
sudo ln -s /etc/nginx/sites-available/combat_zone /etc/nginx/sites-enabled/

# Testați configurația
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

### **G. Configurare Supervisor (Auto-start Backend)**

```bash
# Creați configurație supervisor
sudo nano /etc/supervisor/conf.d/combat_zone_backend.conf
```

**Conținut fișier:**
```ini
[program:combat_zone_backend]
directory=/var/www/combat_zone/backend
command=/var/www/combat_zone/backend/venv/bin/uvicorn server:app --host 0.0.0.0 --port 8001
user=root
autostart=true
autorestart=true
stderr_logfile=/var/log/combat_zone_backend.err.log
stdout_logfile=/var/log/combat_zone_backend.out.log
```

```bash
# Reîncărcați supervisor
sudo supervisorctl reread
sudo supervisorctl update

# Porniți backend-ul
sudo supervisorctl start combat_zone_backend

# Verificați status
sudo supervisorctl status
```

---

### **H. SSL Certificate (HTTPS) - IMPORTANT pentru producție**

Folosiți Let's Encrypt gratuit:

```bash
# Instalare Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obțineți certificat SSL
sudo certbot --nginx -d combatzonemoisei.ro -d www.combatzonemoisei.ro

# Certbot va modifica automat configurația Nginx pentru HTTPS
```

După aceasta, site-ul va fi accesibil la `https://combatzonemoisei.ro`

---

## 🎛️ **Pornire și Oprire Servicii** {#pornire-oprire}

### **Backend (prin Supervisor)**

```bash
# Pornire
sudo supervisorctl start combat_zone_backend

# Oprire
sudo supervisorctl stop combat_zone_backend

# Restart (după modificări cod)
sudo supervisorctl restart combat_zone_backend

# Status
sudo supervisorctl status combat_zone_backend

# Toate serviciile
sudo supervisorctl status
```

### **Nginx (Frontend)**

```bash
# Pornire
sudo systemctl start nginx

# Oprire
sudo systemctl stop nginx

# Restart (după modificări configurație)
sudo systemctl restart nginx

# Status
sudo systemctl status nginx
```

### **MongoDB (dacă folosiți local)**

```bash
# Pornire
sudo systemctl start mongod

# Oprire
sudo systemctl stop mongod

# Restart
sudo systemctl restart mongod

# Status
sudo systemctl status mongod
```

### **Reboot complet server**

```bash
# Reboot server (toate serviciile pornesc automat)
sudo reboot
```

---

## 📊 **Monitorizare și Mentenanță** {#monitorizare}

### **Verificare Loguri**

**Backend:**
```bash
# Loguri live
sudo tail -f /var/log/combat_zone_backend.out.log

# Erori
sudo tail -f /var/log/combat_zone_backend.err.log

# Ultimele 100 linii
sudo tail -n 100 /var/log/combat_zone_backend.out.log
```

**Nginx:**
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### **Monitorizare Resurse**

```bash
# Utilizare CPU și memorie
htop

# Spațiu disk
df -h

# Procese Python
ps aux | grep python

# Procese Nginx
ps aux | grep nginx
```

### **Test API**

```bash
# Test local
curl http://localhost:8001/api/

# Test public
curl https://combatzonemoisei.ro/api/
```

---

## 🔄 **Update Cod (Deploy Modificări)** {#update-cod}

Când modificați codul și doriți să actualizați serverul:

### **Update Backend:**

```bash
# 1. Navigați în backend
cd /var/www/combat_zone/backend

# 2. Backup vechi (opțional)
cp server.py server.py.backup

# 3. Uploadați noul server.py (prin SCP/SFTP)
# SAU editați direct:
nano server.py

# 4. Restart backend
sudo supervisorctl restart combat_zone_backend

# 5. Verificați logurile
sudo tail -f /var/log/combat_zone_backend.out.log
```

### **Update Frontend:**

```bash
# 1. Navigați în frontend
cd /var/www/combat_zone/frontend

# 2. Uploadați noile fișiere sau editați

# 3. Rebuild
npm run build

# 4. Restart Nginx
sudo systemctl restart nginx
```

---

## 🚨 **Troubleshooting Producție** {#troubleshooting}

### **❌ Problema 1: Backend nu pornește**

**Diagnostic:**
```bash
sudo supervisorctl status combat_zone_backend
sudo tail -n 50 /var/log/combat_zone_backend.err.log
```

**Cauze comune:**
- ❌ MongoDB nu este conectat (verificați MONGO_URL în .env)
- ❌ Port 8001 ocupat (`sudo lsof -i :8001`)
- ❌ Dependențe lipsă (`pip list` în venv)

**Soluție:**
```bash
cd /var/www/combat_zone/backend
source venv/bin/activate
pip install -r requirements.txt
sudo supervisorctl restart combat_zone_backend
```

---

### **❌ Problema 2: Site nu se încarcă (502 Bad Gateway)**

**Cauză:** Backend-ul nu răspunde.

**Diagnostic:**
```bash
# Verificați backend
curl http://localhost:8001/api/

# Verificați Nginx
sudo nginx -t
sudo systemctl status nginx

# Verificați loguri
sudo tail -f /var/log/nginx/error.log
```

**Soluție:**
```bash
sudo supervisorctl restart combat_zone_backend
sudo systemctl restart nginx
```

---

### **❌ Problema 3: CORS Errors în browser**

**Cauză:** `CORS_ORIGINS` nu este configurat corect.

**Soluție:**
```bash
# Editați backend/.env
nano /var/www/combat_zone/backend/.env
```

Asigurați-vă că aveți:
```env
CORS_ORIGINS=https://combatzonemoisei.ro,https://www.combatzonemoisei.ro
```

Apoi restart backend:
```bash
sudo supervisorctl restart combat_zone_backend
```

---

### **❌ Problema 4: Google Sheets nu returnează date**

**Cauză:** URL-ul Google Sheet este blocat sau greșit.

**Test:**
```bash
# Pe server
curl "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgLwLv2qoZUMA64x-MMvES57LPzw0unl6U_aCVcwcGSlr4v2K_EAUOzBgLr-q6b0uD4w2HY5vt79AD/pub?output=csv"
```

Ar trebui să returneze date CSV.

---

### **❌ Problema 5: SSL Certificate expirat**

Let's Encrypt certificate-le expiră după 90 zile.

**Renewal automat:**
```bash
# Certbot configurează auto-renewal, dar puteți testa:
sudo certbot renew --dry-run

# Forțare renewal
sudo certbot renew
```

---

## 💾 **Backup și Recuperare** {#backup}

### **Backup Regulat (Recomandat: săptămânal)**

**Script backup (`/root/backup_combat_zone.sh`):**

```bash
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup cod
tar -czf $BACKUP_DIR/combat_zone_code_$DATE.tar.gz /var/www/combat_zone

# Backup MongoDB (dacă local)
mongodump --out $BACKUP_DIR/mongodb_$DATE

# Păstrează doar ultimele 7 backup-uri
find $BACKUP_DIR -name "combat_zone_code_*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "mongodb_*" -mtime +7 -delete

echo "Backup completed: $DATE"
```

**Configurare cron (automat):**
```bash
# Editați crontab
crontab -e

# Adăugați linie pentru backup săptămânal (Duminica la 3 AM)
0 3 * * 0 /root/backup_combat_zone.sh >> /var/log/backup.log 2>&1
```

### **Restaurare din Backup**

```bash
# Stop servicii
sudo supervisorctl stop combat_zone_backend

# Restaurare cod
cd /var/www
sudo rm -rf combat_zone
sudo tar -xzf /root/backups/combat_zone_code_YYYYMMDD_HHMMSS.tar.gz

# Restaurare MongoDB
mongorestore /root/backups/mongodb_YYYYMMDD_HHMMSS

# Restart servicii
sudo supervisorctl start combat_zone_backend
sudo systemctl restart nginx
```

---

## 📋 **Checklist Deployment Final**

Înainte de a declara site-ul live:

- [ ] Backend pornește fără erori
- [ ] Frontend se încarcă corect
- [ ] API-urile returnează date (`/api/reservations/blocked-times`)
- [ ] Integrarea Google Sheets funcționează
- [ ] Formularul de rezervări trimite date prin WhatsApp/Email
- [ ] HTTPS este activ (certificat SSL valid)
- [ ] Toate paginile sunt accesibile (Home, About, Rules, Pricing, Gallery, Reservations)
- [ ] Design-ul arată corect pe mobile și desktop
- [ ] Backup automat este configurat
- [ ] Logurile nu arată erori critice
- [ ] MongoDB este securizat (Atlas sau local cu autentificare)
- [ ] Domeniul este configurat corect (DNS)
- [ ] Performance este bun (site se încarcă rapid)

---

## 🎉 **Site-ul este Live!**

Felicitări! Website-ul Combat Zone Moisei este acum accesibil la:

**🌐 https://combatzonemoisei.ro**

### **Next Steps:**

1. **Monitorizați zilnic** logurile pentru erori
2. **Testați formularul** de rezervări săptămânal
3. **Faceți backup** înainte de orice modificare majoră
4. **Actualizați certificatul SSL** la 90 zile (automatic cu certbot)
5. **Upgrade dependențe** lunar pentru securitate

---

## 📞 **Suport și Resurse**

- **MongoDB Atlas Dashboard:** https://cloud.mongodb.com/
- **Let's Encrypt Status:** https://letsencrypt.status.io/
- **DigitalOcean Docs:** https://docs.digitalocean.com/
- **Nginx Docs:** https://nginx.org/en/docs/

---

**Mult succes cu arena de laser tag! 🎮✨**
