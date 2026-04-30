@echo off
echo Starting Next.js...
start "Next.js" cmd /k "cd /d "%~dp0" && npm run dev"

echo Starting tunnel...
start "Tunnel" cmd /k "cloudflared --url http://localhost:3000"

echo.
echo Two windows opened.
echo Copy the .trycloudflare.com URL from the Tunnel window and share it.