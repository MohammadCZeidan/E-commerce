#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

( cd "$ROOT_DIR/backend" && php artisan serve ) &
BACKEND_PID=$!

( cd "$ROOT_DIR/frontend" && npm run dev ) &
FRONTEND_PID=$!

cleanup() {
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
}

trap cleanup INT TERM

wait -n "$BACKEND_PID" "$FRONTEND_PID"
EXIT_CODE=$?
cleanup
wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
exit "$EXIT_CODE"
