#!/bin/bash
set -e

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting redeployment..."

if [ ! -f "./backend/.env" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] copying from .env.example... (automatically resets during redeployment, please update if needed)"
  cp ./backend/.env.example ./backend/.env
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Stopping containers..."
docker-compose down

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Building images..."
docker-compose build --no-cache

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting containers..."
docker-compose up -d

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Waiting for containers to be healthy..."
sleep 5

docker-compose ps

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Redeployment complete."
