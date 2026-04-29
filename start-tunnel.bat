@echo off
echo Starting Cloudflare quick tunnel on port 3000...
echo Copy the .trycloudflare.com URL to share your app publicly.
echo Press Ctrl+C to stop.
echo.
cloudflared tunnel --url http://localhost:3000