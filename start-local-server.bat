@echo off
setlocal
REM ============================================================
REM  DPK Content System - local server launcher (server PC)
REM
REM  Serve the site on the office LAN so other PCs can access it.
REM    From this PC:      http://localhost:3000
REM    From other PCs:    http://<SERVER-PC-IP>:3000
REM
REM  Requires a production build first:  npm run build
REM ============================================================

if not exist ".next\standalone\server.js" (
  echo No production build found. Run this first:
  echo.
  echo     npm run build
  echo.
  pause
  exit /b 1
)

REM The standalone server does not include public/ or .next/static by
REM default, so copy them in so the site serves its CSS, JS, and logos.
if not exist ".next\standalone\public" xcopy /i /e /y public ".next\standalone\public" >nul
if not exist ".next\standalone\.next\static" xcopy /i /e /y ".next\static" ".next\standalone\.next\static" >nul

REM Bind to all interfaces (0.0.0.0) so other PCs on the network can reach it.
set HOSTNAME=0.0.0.0
set PORT=3000
node .next\standalone\server.js

pause
endlocal