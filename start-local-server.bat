@echo off
REM Start the DPK content server on the PC's LAN so other PCs can access it.
REM Access from this PC:      http://localhost:3000
REM Access from other PCs:    http://192.168.1.70:3000

set HOSTNAME=0.0.0.0
set PORT=3000
node .next\standalone\server.js
pause