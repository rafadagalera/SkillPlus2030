# Script para limpar cache e reiniciar Metro
Write-Host "Limpando cache do Metro..." -ForegroundColor Yellow
Remove-Item -Recurse -Force $env:TEMP\metro-* -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $env:TEMP\haste-map-* -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force $env:TEMP\react-* -ErrorAction SilentlyContinue

Write-Host "Limpando cache do npm..." -ForegroundColor Yellow
npm cache clean --force

Write-Host "Cache limpo! Agora execute: npm start -- --reset-cache" -ForegroundColor Green

