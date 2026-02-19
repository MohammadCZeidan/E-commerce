$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$backend = Start-Process -FilePath 'powershell' -ArgumentList '-NoExit', '-Command', "cd '$root\backend'; php artisan serve" -PassThru
$frontend = Start-Process -FilePath 'powershell' -ArgumentList '-NoExit', '-Command', "cd '$root\frontend'; npm run dev" -PassThru

Write-Host "Started backend (PID $($backend.Id)) and frontend (PID $($frontend.Id))."
