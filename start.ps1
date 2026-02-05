# Start both backend and frontend servers for ecommerce full-stack

Write-Host "Starting ecommerce full-stack application..." -ForegroundColor Green
Write-Host ""

# Start backend (Laravel)
Write-Host "Starting backend (Laravel)..." -ForegroundColor Cyan
$backendPath = Join-Path $PSScriptRoot "backend"
$backendProcess = Start-Process -FilePath "php" -ArgumentList "artisan serve" -WorkingDirectory $backendPath -PassThru
Write-Host "✓ Backend running (PID: $($backendProcess.Id))" -ForegroundColor Green

# Start frontend (Svelte/Vite)
Write-Host "Starting frontend (Svelte/Vite)..." -ForegroundColor Cyan
$frontendPath = Join-Path $PSScriptRoot "frontend"
$frontendProcess = Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory $frontendPath -PassThru
Write-Host "✓ Frontend running (PID: $($frontendProcess.Id))" -ForegroundColor Green

Write-Host ""
Write-Host "Press Ctrl+C to stop both servers..." -ForegroundColor Yellow
Write-Host ""

# Wait for both processes
$backendProcess.WaitForExit()
$frontendProcess.WaitForExit()
