@echo off
echo Starting Next.js...
start "Next.js" cmd /k "cd /d "%~dp0" && npm run dev"

echo Starting tunnel...
start "Tunnel" cmd /k "cd /d "%~dp0" && node start-tunnel.js"

echo.
echo Two windows opened.
echo The tunnel URL will open in your browser automatically.