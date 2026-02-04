#!/bin/bash
set -e

echo "🐳 Starting Customer Pioneer application..."

# Check if we should initialize full demo data
if [ "$INIT_DEMO_DATA" = "true" ]; then
    echo "🚀 Initializing demo data (resources + users)..."
    python init_demo_data.py
    echo "✅ Demo data initialization complete!"
fi

# Optionally initialize only demo users (without resources)
if [ "$INIT_DEMO_USERS" = "true" ] && [ "$INIT_DEMO_DATA" != "true" ]; then
    echo "👥 Initializing demo users only..."
    python - <<'PY'
from demo_service import populate_demo_users
populate_demo_users()
print("Demo users initialized")
PY
fi

# Check if we should clear existing data
if [ "$CLEAR_DEMO_DATA" = "true" ]; then
    echo "🗑️ Clearing existing demo data..."
    python init_demo_data.py --clear
    echo "✅ Demo data cleared!"
fi

# Start the application
echo "🚀 Starting FastAPI application..."
exec python run.py 