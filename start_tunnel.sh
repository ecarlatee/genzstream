#!/usr/bin/env bash
LOGFILE="/tmp/genz_tunnel.log"
URLFILE="$(dirname "$0")/TUNNEL_URL.txt"

while true; do
    echo "[TUNNEL] Démarrage de cloudflared..."
    rm -f "$LOGFILE"
    /home/ecarlate/.local/bin/cloudflared tunnel --url http://localhost:3000 --logfile "$LOGFILE" &
    PID=$!

    # Attendre que l'URL apparaisse dans le log
    FOUND_URL=""
    for i in {1..30}; do
        if [ -f "$LOGFILE" ]; then
            FOUND_URL=$(grep -oE 'https://[a-zA-Z0-9-]+\.trycloudflare\.com' "$LOGFILE" | head -n 1)
            if [ -n "$FOUND_URL" ]; then
                echo "[TUNNEL] URL active: $FOUND_URL"
                echo "$FOUND_URL" > "$URLFILE"
                break
            fi
        fi
        sleep 1
    done

    # Surveiller le processus et le log
    while kill -0 "$PID" 2>/dev/null; do
        if grep -q "Tunnel not found" "$LOGFILE" 2>/dev/null; then
            echo "[TUNNEL] Tunnel expiré ou non trouvé, redémarrage..."
            kill -9 "$PID" 2>/dev/null
            break
        fi
        sleep 5
    done

    wait "$PID" 2>/dev/null
    echo "[TUNNEL] Cloudflared arrêté. Pause 3s avant relance..."
    sleep 3
done
