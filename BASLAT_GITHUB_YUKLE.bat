@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"
title Pink Fashion Studio - GitHub Auto Upload

echo.
echo ========================================================
echo   PINK FASHION STUDIO - GITHUB AUTO UPLOAD
echo ========================================================
echo.

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\github-manager.ps1" -Mode Publish
set "RESULT=%ERRORLEVEL%"

echo.
if "%RESULT%"=="0" (
  echo [OK] Project uploaded to GitHub.
) else (
  echo [ERROR] Upload failed. Check the message above and github-upload.log.
)
echo.
pause
exit /b %RESULT%
