#!/bin/bash

# Start both backend and frontend servers

echo "Starting ecommerce full-stack application..."
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
echo "✓ Backend running (PID: $BACKEND_PID)"
echo "✓ Frontend running (PID: $FRONTEND_PID)"
echo ""
echo "Press Ctrl+C to stop both servers..."
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
