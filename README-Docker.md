# Customer Pioneer - Docker Setup

This guide covers running the Customer Pioneer application with Docker, including demo data setup.

## Quick Start

### 1. Build and Run with Demo Data

```bash
# Build and start the application with demo data
docker compose up --build

# The application will be available at http://localhost:8000
```

### 2. Run without Demo Data

```bash
# Build the image
docker compose build

# Run without initializing demo data
docker compose run --rm -e INIT_DEMO_DATA=false api
```

## Environment Variables

- `INIT_DEMO_DATA`: Set to `true` to initialize demo data on startup (default: `false`)
- `CLEAR_DEMO_DATA`: Set to `true` to clear existing demo data on startup (default: `false`)
- `DATABASE_PATH`: Path to the SQLite database file (default: `/app/test.db`)

## Demo Data Management

### Initialize Demo Data in Running Container

```bash
# Initialize demo data in a running container
docker compose exec api python manage.py init-demo

# Check database status
docker compose exec api python manage.py db-status

# Clear demo data
docker compose exec api python manage.py clear-demo

# Reset demo data (clear and reinitialize)
docker compose exec api python manage.py reset-demo
```

**Note**: The Chainguard Python image is minimal and doesn't include a shell, so all commands run directly through Python.

### Run Demo Data Commands in New Container

```bash
# Initialize demo data in a new container
docker compose run --rm api python manage.py init-demo

# Check database status
docker compose run --rm api python manage.py db-status
```

## Database Persistence

The database is persisted using a volume mount in `compose.yml`:

```yaml
volumes:
  - ./backend/test.db:/app/test.db
```

This ensures your data persists between container restarts.

## Development Workflow

### 1. Start with Fresh Demo Data

```bash
# Start with fresh demo data
docker compose down
rm -f app/backend/test.db  # Remove existing database
docker compose up --build
```

### 2. Development with Live Database

```bash
# Start the application
docker compose up

# In another terminal, manage demo data
docker compose exec api python manage.py reset-demo
```

### 3. Check Application Status

```bash
# View logs
docker compose logs -f api

# Check database contents
docker compose exec api python manage.py db-status

# Access the container (limited shell functionality in Chainguard images)
docker compose exec api python
```

## Demo Data Contents

When initialized, the demo data includes:

- **8 Resource Categories**: Housing, Education, Healthcare, Employment, Legal Services, Social Engagement, Emergency Assistance, Transportation
- **8 Local Resources**: Complete with contact information, descriptions, and categories
- **3 Checklists**: Newcomer Essentials, Employment Preparation, and Education Pathway
- **Sample Chat Conversations**: 3 realistic chat conversations with the assistant
- **Screening Responses**: 3 example screening questionnaire responses

## Troubleshooting

### Database Issues

```bash
# Check if database exists and has data
docker compose exec api python manage.py db-status

# Reset database if corrupted
docker compose exec api python manage.py reset-demo
```

### Container Issues

```bash
# Rebuild containers
docker compose down
docker compose build --no-cache
docker compose up

# View detailed logs
docker compose logs -f api
```

### Permission Issues

```bash
# Check database file existence and permissions
docker compose exec api python -c "import os; print('DB exists:', os.path.exists('/app/test.db')); print('DB readable:', os.access('/app/test.db', os.R_OK) if os.path.exists('/app/test.db') else 'N/A')"
```

## API Endpoints

Once running, the following API endpoints are available:

- **Frontend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Chat API**: http://localhost:8000/api/chat/
- **Resources API**: http://localhost:8000/api/resources/
- **Categories API**: http://localhost:8000/api/categories/

## Advanced Usage

### Custom Database Location

```bash
# Use custom database location
docker compose run --rm -e DATABASE_PATH=/custom/path/db.sqlite api
```

### One-time Operations

```bash
# Initialize demo data and exit
docker compose run --rm -e INIT_DEMO_DATA=true api python init_demo_data.py

# Clear data and exit
docker compose run --rm api python manage.py clear-demo
``` 
