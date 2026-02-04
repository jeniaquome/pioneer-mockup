#!/bin/bash

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# DOCKER BUILD CONFIG
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

DEFAULT_DOCKER_USERNAME="rsauveho"
DEFAULT_DOCKER_REPOSITORY="pioneer"
DEFAULT_DOCKER_DESCRIPTION="pioneer app"
DOCKER_BUILD_CONTEXT="./app"
DOCKERFILE_PATH="./app/Dockerfile"
DOCKER_COMPOSE_PATH="./app/compose.yml"

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# APP/QUOME CONFIG
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

SQLITE_DB_PATH="$SQLITE_MOUNT_PATH"

# Used for smart defaults
DEFAULT_APP_NAME="pioneer"
SCRIPT_DEFAULT_PORT=8000

# Set if you want to deploy using a sqlite db
USE_SQLITE_DB=true

# Will use quome defaults if these are left empty
# SQLITE_ENV_VAR_NAME="SQLITE_DB_PATH"
SQLITE_ENV_VAR_NAME=
SQLITE_MOUNT_PATH="/var/lib/"
SQLITE_DB_SIZE="1Gi"

# List of all envrionment variables which will be uploaded to quome cloud as
# secrets - assumption is that they will all be generic secrets
# format is ("ENV_VAR_NAME" ...)
# i.e. ("API_KEY" "DB_URL")
# will create secrets $APPLICATION_NAME-api-key and $APPLICATION_NAME-db-url
declare -a secret_env_vars=()

# List of all environment variables required for the app,
# to provide a default value add =some default value
# i.e. ("DEFAULT_ENV_VAR=default_value" "REQUIRED_ENV_VAR2")
# WARNING: DO NOT PUT ANY SECRETS IN THESE VARS, THEY MAY END UP EXPOSED
# Note: Removed TOKEN_PATH and CLIENT_SECRETS_PATH as we're using environment-based credentials now
# NOTE: Remember to remove "ADMIN_DEBUG=true" after debugging
declare -a env_vars=("INIT_DEMO_DATA=false" "INIT_DEMO_USERS=true" "INIT_DEMO_DATA_MODE=no-resources" "REDIS_URL=redis://0.0.0.0:6379")
