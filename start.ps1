#!/usr/bin/env pwsh
# Start both backend and frontend servers for ecommerce full-stack

$basedir = Split-Path $MyInvocation.MyCommand.Definition -Parent

Write-Host "Starting ecommerce full-stack application..." -ForegroundColor Green
Write-Host ""

# Install dependencies if needed
Write-Host "Checking dependencies..." -ForegroundColor Yellow
$backendPath = Join-Path $basedir "backend"
$frontendPath = Join-Path $basedir "frontend"

Push-Location $backendPath
if (-not (Test-Path "vendor")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    & composer install
}
Pop-Location

Push-Location $frontendPath
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    & npm install
}
Pop-Location

Write-Host ""
Write-Host "Starting services..." -ForegroundColor Green
Write-Host ""

# Start backend in background
Write-Host "Starting backend (Laravel)..." -ForegroundColor Cyan
$backendProcess = Start-Process -FilePath "php" -ArgumentList "artisan serve" -WorkingDirectory $backendPath -PassThru
$backendId = $backendProcess.Id
Write-Host "[OK] Backend running (PID: $backendId)" -ForegroundColor Green

# Start frontend in background
Write-Host "Starting frontend (Svelte/Vite)..." -ForegroundColor Cyan
$frontendProcess = Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory $frontendPath -PassThru
$frontendId = $frontendProcess.Id
Write-Host "[OK] Frontend running (PID: $frontendId)" -ForegroundColor Green

Write-Host ""
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers..." -ForegroundColor Yellow
Write-Host ""

# Wait for both processes
$backendProcess.WaitForExit()
$frontendProcess.WaitForExit()

