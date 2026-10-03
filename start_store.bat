@echo off
title INT Gift Mart - Server Launcher
echo ========================================================
echo        STARTING INT GIFT MART PLATFORM (LOCAL)
echo ========================================================
echo.
echo [1/2] Starting Backend FastAPI Server (Port 8000)...
start "INT Gift Mart - Backend (FastAPI)" cmd /k "cd /d "%~dp0backend" && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 2 /nobreak >nul

echo [2/2] Starting Frontend Vite Web Store (Port 5173)...
start "INT Gift Mart - Frontend (Vite)" cmd /k "cd /d "%~dp0frontend" && npm run dev -- --host 127.0.0.1 --port 5173"

timeout /t 3 /nobreak >nul

echo.
echo ========================================================
echo  All servers are starting!
echo  Opening http://127.0.0.1:5173 in your default browser...
echo ========================================================
start http://127.0.0.1:5173

echo.
echo You can keep the server terminal windows open while browsing.
echo Press any key to close this launcher window.
pause >nul
