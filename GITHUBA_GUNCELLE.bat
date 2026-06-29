@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"
title Pink Fashion Studio - GitHub Update

echo.
echo ========================================================
echo   PINK FASHION STUDIO - GITHUB UPDATE
echo ========================================================
echo.

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\github-manager.ps1" -Mode Update
set "RESULT=%ERRORLEVEL%"

echo.
if "%RESULT%"=="0" (
  echo [OK] GitHub repository updated.
) else (
  echo [ERROR] Update failed. Check the message above and github-upload.log.
)
echo.
pause
exit /b %RESULT%
