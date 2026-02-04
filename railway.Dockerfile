# Railway-optimized Dockerfile for FastAPI + Frontend bundle
# This Dockerfile builds the frontend and bundles it with FastAPI for Railway deployment

# Stage 1: Build Python dependencies
FROM python:3.11-slim AS python-builder

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/app/venv/bin:$PATH"

WORKDIR /app
RUN python -m venv /app/venv

# Copy requirements and install Python dependencies
COPY app/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: Build Frontend
FROM node:20-alpine AS frontend-builder

# Accept Auth0 configuration as build arguments
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE

# Set environment variables from build args for Vite build process
ENV VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN
ENV VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID
ENV VITE_AUTH0_AUDIENCE=$VITE_AUTH0_AUDIENCE

WORKDIR /src/app
COPY app/frontend/package*.json ./
RUN npm ci

COPY app/frontend/ ./
RUN npm run build

# Stage 3: Production image
FROM python:3.11-slim AS production

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy Python virtual environment from builder
COPY --from=python-builder /app/venv /venv
ENV PATH="/venv/bin:$PATH"

# Copy backend application
COPY app/backend/ ./

# Copy built frontend from frontend-builder stage
COPY --from=frontend-builder /src/app/dist /app/static

# Set environment variables
ENV STATIC_WEB_DIR=/app/static
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Railway will provide these environment variables:
# - DATABASE_URL (PostgreSQL connection string)
# - REDIS_URL (Redis connection string)
# - PORT (Railway will set this dynamically)

# Default environment variables (can be overridden in Railway)
ENV INIT_DEMO_DATA=false
ENV INIT_DEMO_USERS=true
ENV INIT_DEMO_DATA_MODE=no-resources

# Expose port (Railway will set PORT environment variable dynamically)
# Default to 8000 for local development
EXPOSE 8000

# Use the existing entrypoint script
ENTRYPOINT ["python", "docker_entrypoint.py"]