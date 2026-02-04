#!/bin/bash

# Production Migration Script for Pioneer Application (PostgreSQL-only)
# Simplified to rely on ORM metadata; legacy migrations removed

set -e  # Exit on any error

echo "🚀 Starting production migration for Pioneer application..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set"
    echo "Please set DATABASE_URL to your PostgreSQL connection string"
    echo "Example: export DATABASE_URL='postgresql://user:password@host:port/database'"
    exit 1
fi

# Check if we're connecting to PostgreSQL
if [[ "$DATABASE_URL" != postgresql* ]]; then
    echo "❌ ERROR: DATABASE_URL does not appear to be a PostgreSQL connection string"
    echo "Current DATABASE_URL: $DATABASE_URL"
    echo "Expected format: postgresql://user:password@host:port/database"
    exit 1
fi

echo "✅ DATABASE_URL is properly configured for PostgreSQL"

# Navigate to backend directory
cd "$(dirname "$0")/../app/backend"

echo "📦 Installing Python dependencies..."
pip install -r requirements.txt

echo "🔄 Applying schema via ORM (create_all)..."
python - <<'PY'
import sys
sys.path.insert(0, '.')
from database import create_tables
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info('Prod script: starting create_tables() …')
create_tables()
logger.info('Prod script: finished create_tables().')
logger.info('Base tables created/verified via ORM')
PY

echo "🎉 Production migration completed successfully!"