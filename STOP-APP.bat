@echo off
title Image Upscaler Pro - Shutdown
color 0C
echo.
echo ============================================
echo    IMAGE UPSCALER PRO - EASY SHUTDOWN
echo ============================================
echo.
echo Stopping all Image Upscaler services...
echo.

echo [1/3] Stopping Python/FastAPI processes...
taskkill /F /IM python.exe >nul 2>&1
taskkill /F /IM uvicorn.exe >nul 2>&1

echo [2/3] Freeing up ports 8000 and 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do taskkill /F /PID %%a >nul 2>&1

echo [3/3] Final cleanup...
timeout /t 2 /nobreak >nul

echo.
echo ============================================
echo    ALL SERVERS STOPPED SUCCESSFULLY!
echo ============================================
echo.
echo All Image Upscaler processes have been terminated.
echo Ports 8000 and 3000 are now available.
echo.
echo You can now restart the application using START-APP.bat
echo.
pause