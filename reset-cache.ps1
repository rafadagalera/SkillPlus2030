# Script para resetar cache e iniciar Metro
Write-Host "Limpando cache do Metro..." -ForegroundColor Yellow
Remove-Item -Recurse -Force $env:TEMP\metro-* -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $env:TEMP\haste-map-* -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $env:TEMP\react-* -ErrorAction SilentlyContinue

Write-Host "Iniciando Metro com cache limpo..." -ForegroundColor Green
npm start -- --reset-cache

