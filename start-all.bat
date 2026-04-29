@echo off
echo Starting PromptPlan locally...
echo.

echo [1/2] Starting judge server on port 3001...
start "Judge Server" cmd /k "cd /d "%~dp0judge-server" && set JUDGE_SECRET=changeme-use-a-random-string && node server.js"

timeout /t 1 /nobreak >nul

echo [2/2] Starting Next.js on port 3000...
start "Next.js Dev" cmd /k "cd /d "%~dp0" && npm run dev"

echo.
echo Both servers starting.
echo Open http://localhost:3000 when Next.js is ready.
echo Run start-tunnel.bat when you want a public URL.