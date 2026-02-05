#!/bin/bash

# Start both backend and frontend servers for ecommerce full-stack

cd "$(dirname "$0")"

echo "Starting ecommerce full-stack application..."
echo ""

# Check and install dependencies
echo "Checking dependencies..."
if [ ! -d "backend/vendor" ]; then
    echo "Installing backend dependencies..."
    cd backend
    composer install
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
fi

echo ""
echo "Starting services..."
echo ""

# Navigate to backend and start Laravel dev server
echo "Starting backend (Laravel)..."
cd "$(dirname "$0")/backend"
php artisan serve &
BACKEND_PID=$!

# Navigate to frontend and start Vite dev server
echo "Starting frontend (Svelte/Vite)..."
cd "$(dirname "$0")/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "[OK] Backend running (PID: $BACKEND_PID)"
echo "[OK] Frontend running (PID: $FRONTEND_PID)"
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers..."
echo ""

# Trap to kill both processes on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
