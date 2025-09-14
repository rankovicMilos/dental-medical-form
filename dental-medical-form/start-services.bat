@echo off
echo Starting Dental Medical Form Email Service...
echo.

echo [1/3] Starting Backend Email Service...
start "Email Service" cmd /k "cd server && npm start"

timeout /t 3 /nobreak > nul

echo [2/3] Checking if backend is ready...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/health' -TimeoutSec 5; Write-Host 'Backend is ready!' -ForegroundColor Green } catch { Write-Host 'Backend not ready yet, please wait...' -ForegroundColor Yellow }"

echo.
echo [3/3] Starting Frontend...
start "Frontend" cmd /k "npm run dev"

echo.
echo ==========================================
echo Services Started!
echo ==========================================
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:3001
echo Health Check: http://localhost:3001/api/health
echo.
echo Make sure to configure your email credentials in server/.env
echo See EMAIL_SETUP.md for detailed instructions.
echo.
pause
