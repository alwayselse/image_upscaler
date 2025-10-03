@echo off
title Image Upscaler - Backend Server
color 0B
echo.
echo ========================================
echo    STARTING BACKEND SERVER (FastAPI)
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "%~dp0app.py" (
    echo ERROR: app.py not found in current directory
    echo Please run this script from the backend folder
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "%~dp0..\venv\Scripts\python.exe" (
    echo ERROR: Virtual environment not found
    echo Please create venv: python -m venv .venv
    echo Then install requirements: .venv\Scripts\pip install -r requirements.txt
    pause
    exit /b 1
)

echo Starting FastAPI server on http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
"%~dp0..\venv\Scripts\python.exe" -m uvicorn app:app --reload --host 127.0.0.1 --port 8000
pause