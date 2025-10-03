@echo off
title Image Upscaler - Frontend Server
color 0D
echo.
echo =========================================
echo    STARTING FRONTEND SERVER (React)
echo =========================================
echo.

REM Check if we're in the right directory
if not exist "%~dp0index.html" (
    echo ERROR: index.html not found in current directory
    echo Please run this script from the frontend folder
    pause
    exit /b 1
)

echo Starting HTTP server on http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
python -m http.server 3000
pause