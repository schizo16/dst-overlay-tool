@echo off
cd /d "%~dp0"
dotnet restore DSTOverlay\DSTOverlay.csproj
if %errorlevel% neq 0 (
  echo Restore failed.
  pause
  exit /b %errorlevel%
)
dotnet build DSTOverlay\DSTOverlay.csproj -c Release
if %errorlevel% neq 0 (
  echo Build failed.
  pause
  exit /b %errorlevel%
)
echo.
echo Build complete!
echo Output: DSTOverlay\bin\Release\net6.0-windows\DSTOverlay.exe
pause
