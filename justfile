default:
    @just --list

up:
  echo "Starting docker container"
  docker-compose -f app/compose.yml up -d

down:
  echo "Stopping docker container"
  docker-compose -f app/compose.yml down

docker-build:
  echo "(Re)building docker image"
  docker-compose -f app/compose.yml build --no-cache

# Build and push the Docker container to DockerHub
push-to-dockerhub:
    @echo "Building and pushing Docker container to DockerHub..."
    @./scripts/push_to_dockerhub.sh

# Pull the Docker container and push to Quome
push-to-quome:
    @echo "Pulling Docker container and pushing to Quome..."
    @./scripts/push_to_quome.sh

rebuild-and-deploy: (docker-build) (push-to-dockerhub) (push-to-quome)

# Upgrade user role in the database
upgrade_role USER_EMAIL ROLE:
    @echo "Upgrading user role for {{USER_EMAIL}} to {{ROLE}}..."
    @DATABASE_URL=postgresql://pioneer_user:pioneer_password@localhost:5432/pioneer app/backend/.venv/bin/python app/backend/scripts/upgrade_role.py {{USER_EMAIL}} {{ROLE}}
