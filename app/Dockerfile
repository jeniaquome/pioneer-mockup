FROM python:3.12-slim AS builder

ENV LANG=C.UTF-8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/app/venv/bin:$PATH"
WORKDIR /app

# Install build dependencies needed for compiling Python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    g++ \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

RUN python -m venv /app/venv
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2
# Pin Node to a stable, single-arch image to avoid cross-arch manifest issues
FROM node:20-alpine AS frontendbuilder
#FROM cgr.dev/chainguard/node:latest AS frontendbuilder

# Accept Auth0 configuration as build arguments
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_AUDIENCE

# Set environment variables from build args for Vite build process
ENV VITE_AUTH0_DOMAIN=$VITE_AUTH0_DOMAIN
ENV VITE_AUTH0_CLIENT_ID=$VITE_AUTH0_CLIENT_ID
ENV VITE_AUTH0_AUDIENCE=$VITE_AUTH0_AUDIENCE

WORKDIR /src/app
COPY --chown=node:node ./frontend /src/app/
RUN npm install; npm install --dev
RUN npm run build
CMD bash

# Stage 3 - Production python fast API (single arch)
FROM python:3.12-slim
WORKDIR /app
ENV PYTHONUNBUFFERED=1
ENV PATH="/venv/bin:$PATH"
COPY backend/main.py main.py
ENV PYTHONBUFFERED=1
COPY backend .
COPY --from=builder /app/venv /venv
COPY --from=frontendbuilder /src/app/dist /app/static
ENV STATIC_WEB_DIR=/app/static

# Set default environment variables
ENV INIT_DEMO_DATA=false
ENV DATABASE_URL=postgresql://pioneer_user:pioneer_password@postgres:5432/pioneer

# Copy migration scripts
# No standalone migration scripts copied; schema handled by ORM at startup
COPY backend/docker_entrypoint.py .

# Make entrypoint script executable and use it as entrypoint
RUN chmod +x docker_entrypoint.py
ENTRYPOINT [ "python", "docker_entrypoint.py" ]
