@echo off
title Image Upscaler Pro - Startup
color 0A
echo.
echo ============================================
echo    IMAGE UPSCALER PRO - EASY STARTUP
echo ============================================
echo.
echo Starting both Backend and Frontend servers...
echo.

REM Kill any existing processes on these ports to avoid conflicts
echo [1/4] Cleaning up existing processes...
taskkill /F /IM python.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Check if virtual environment exists
echo [2/4] Checking Python environment...
if not exist "%~dp0.venv\Scripts\python.exe" (
    echo ERROR: Virtual environment not found at .venv
    echo Please run: python -m venv .venv
    echo Then install requirements: .venv\Scripts\pip install -r backend\requirements.txt
    pause
    exit /b 1
)

REM Start Backend in a new window
echo [3/4] Starting Backend Server (FastAPI)...
start "Image Upscaler - Backend (Port 8000)" /min cmd /c "cd /d "%~dp0backend" && "%~dp0.venv\Scripts\python.exe" -m uvicorn app:app --reload --host 127.0.0.1 --port 8000 && pause"

REM Wait for backend to start
echo [4/4] Starting Frontend Server (React App)...
timeout /t 5 /nobreak >nul
start "Image Upscaler - Frontend (Port 3000)" /min cmd /c "cd /d "%~dp0frontend" && python -m http.server 3000 && pause"

REM Wait a moment for frontend to start
timeout /t 3 /nobreak >nul

echo.
echo ============================================
echo    SERVERS STARTED SUCCESSFULLY!
echo ============================================
echo.
echo Backend API:    http://localhost:8000
echo Frontend App:   http://localhost:3000
echo API Docs:       http://localhost:8000/docs
echo.
echo The application will open automatically in 5 seconds...
echo Press any key to open immediately, or wait...
echo.

REM Countdown and auto-open
timeout /t 5 /nobreak >nul 2>&1
if errorlevel 1 goto manual_open

:auto_open
echo Opening application in your default browser...
start http://localhost:3000
goto end

:manual_open
echo Opening application in your default browser...
start http://localhost:3000

:end
echo.
echo ============================================
echo    IMAGE UPSCALER PRO IS NOW RUNNING!
echo ============================================
echo.
echo To stop the servers:
echo - Close the backend and frontend terminal windows
echo - Or run: STOP-APP.bat
echo.
echo Enjoy upscaling your images! 🚀
echo.
pause