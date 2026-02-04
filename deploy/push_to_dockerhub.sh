#!/bin/bash
# docker_publish_private.sh - Build, push a private Docker image to a registry

set -e # Exit on error

# Get script directory and look for deployment_config.sh there
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/deployment_utils.sh"
source "$SCRIPT_DIR/deployment_config.sh"

# Detect native architecture
NATIVE_ARCH=$(uname -m)
if [[ "$NATIVE_ARCH" == "arm64" || "$NATIVE_ARCH" == "aarch64" ]]; then
	NATIVE_ARCH_PREFIX="arm"
	echo "🖥️  Detected ARM architecture (M-series Mac)"
else
	NATIVE_ARCH_PREFIX="intel"
	echo "🖥️  Detected Intel/AMD architecture"
fi

# Function to parse current tag and increment version
increment_tag() {
	local current_tag=$1
	local arch_prefix=$2

	# Extract version numbers, ignoring architecture prefix
	if [[ $current_tag =~ ${arch_prefix}-([0-9]+)\.([0-9]+)\.([0-9]+) ]]; then
		local major=${BASH_REMATCH[1]}
		local minor=${BASH_REMATCH[2]}
		local patch=${BASH_REMATCH[3]}

		# Increment patch version
		patch=$((patch + 1))
		echo "${arch_prefix}-$major.$minor.$patch"
	else
		# If tag doesn't match expected format, use default
		echo "${arch_prefix}-0.0.1"
	fi
}

# Get script directory and environment file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$(dirname "$SCRIPT_DIR")/.env"

checkForEnvVar "DEFAULT_PORT" "$SCRIPT_DEFAULT_PORT"

checkForEnvVar "DOCKER_USERNAME" "$DEFAULT_DOCKER_USERNAME"
# Get docker username
read -p "Docker hub username [$DEFAULT_DOCKER_USERNAME]: " DOCKER_USERNAME
DOCKER_USERNAME=${DOCKER_USERNAME:-$DEFAULT_DOCKER_USERNAME}

checkForEnvVar "DOCKER_REPOSITORY" "$DEFAULT_DOCKER_REPOSITORY"
# Get repository and description
read -p "Repository name [$DEFAULT_DOCKER_REPOSITORY]: " DOCKER_REPOSITORY
DOCKER_REPOSITORY=${DOCKER_REPOSITORY:-$DEFAULT_DOCKER_REPOSITORY}

checkForEnvVar "DOCKER_DESCRIPTION" "$DEFAULT_DOCKER_DESCRIPTION"
read -p "Description [$DEFAULT_DOCKER_DESCRIPTION]: " DOCKER_DESCRIPTION
DOCKER_DESCRIPTION=${DOCKER_DESCRIPTION:-$DEFAULT_DOCKER_DESCRIPTION}

# Choose which architectures to build (default to both)
read -p "Which architectures to build? (arm/intel/both) [both]: " BUILD_CHOICE
BUILD_CHOICE=${BUILD_CHOICE:-both}

# Parse architecture choice
case "$BUILD_CHOICE" in
arm)
	ARCHITECTURES=("arm")
	;;
intel)
	ARCHITECTURES=("intel")
	;;
both | *)
	ARCHITECTURES=("arm" "intel")
	echo "🔄 Building for both ARM and Intel architectures"
	;;
esac

# Check if Dockerfile has a non-root user
DOCKERFILE="$(dirname "$SCRIPT_DIR")/$DOCKERFILE_PATH"
if [ -f "$DOCKERFILE" ]; then
	if ! grep -q "useradd\|adduser\|USER " "$DOCKERFILE"; then
		echo "⚠️  No non-root user found in Dockerfile (Docker Scout warning)"
		read -p "Do you want to add a non-root user to the Dockerfile? (y/n): " ADD_USER
		if [[ "$ADD_USER" == "y" ]]; then
			# Create a temporary file
			TEMP_FILE=$(mktemp)

			# Find the position before CMD or at the end of the file
			LINE_NUM=$(grep -n "CMD\|ENTRYPOINT" "$DOCKERFILE" | head -1 | cut -d: -f1)

			if [ -n "$LINE_NUM" ]; then
				# Insert non-root user before CMD/ENTRYPOINT
				head -n $((LINE_NUM - 1)) "$DOCKERFILE" >"$TEMP_FILE"
				cat >>"$TEMP_FILE" <<'EOL'

# Create a non-root user and switch to it
RUN addgroup --system appgroup && \
    adduser --system --group appuser && \
    chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EOL
				tail -n +$((LINE_NUM)) "$DOCKERFILE" >>"$TEMP_FILE"
			else
				# Append non-root user at the end
				cp "$DOCKERFILE" "$TEMP_FILE"
				cat >>"$TEMP_FILE" <<'EOL'

# Create a non-root user and switch to it
RUN addgroup --system appgroup && \
    adduser --system --group appuser && \
    chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser
EOL
			fi

			# Replace the original file
			mv "$TEMP_FILE" "$DOCKERFILE"
			echo "✅ Added non-root user to Dockerfile"
		fi
	else
		echo "✅ Dockerfile already has a non-root user configured"
	fi
else
	echo "⚠️  Dockerfile not found at $(dirname "$SCRIPT_DIR")/Dockerfile"
fi

# Get port for examples
read -p "Port for example commands [${SCRIPT_DEFAULT_PORT}]: " PORT
PORT=${PORT:-$SCRIPT_DEFAULT_PORT}

# Make sure buildx is available for multi-architecture builds
docker buildx inspect multiarch-builder >/dev/null 2>&1 || docker buildx create --name multiarch-builder --use
docker buildx use multiarch-builder

# Get the latest tags for each architecture
ARM_TAG=""
INTEL_TAG=""

if [ -f "$ENV_FILE" ]; then
	CURRENT_ARM_TAG=$(grep '^ARM_CURRENT_TAG=' "$ENV_FILE" | cut -d '=' -f2)
	CURRENT_INTEL_TAG=$(grep '^INTEL_CURRENT_TAG=' "$ENV_FILE" | cut -d '=' -f2)

	if [ -n "$CURRENT_ARM_TAG" ]; then
		ARM_TAG=$(increment_tag "$CURRENT_ARM_TAG" "arm")
	else
		ARM_TAG="arm-0.0.1"
	fi

	if [ -n "$CURRENT_INTEL_TAG" ]; then
		INTEL_TAG=$(increment_tag "$CURRENT_INTEL_TAG" "intel")
	else
		INTEL_TAG="intel-0.0.1"
	fi
else
	ARM_TAG="arm-0.0.1"
	INTEL_TAG="intel-0.0.1"
fi

# Option to specify the version
read -p "Version number (e.g., 0.0.1) [leave empty for auto-increment]: " VERSION_NUMBER
if [ -n "$VERSION_NUMBER" ]; then
	ARM_TAG="arm-$VERSION_NUMBER"
	INTEL_TAG="intel-$VERSION_NUMBER"
	echo "🏷️  Using version $VERSION_NUMBER for all architectures"
fi

# Build the docker image locally first
echo "🔨 Building local Docker image"
docker-compose -f $DOCKER_COMPOSE_PATH build --no-cache

# Process each architecture
for ARCH in "${ARCHITECTURES[@]}"; do
	if [[ "$ARCH" == "arm" ]]; then
		PLATFORM="linux/arm64"
		TAG="$ARM_TAG"
	else
		PLATFORM="linux/amd64"
		TAG="$INTEL_TAG"
	fi

	# Check if we need to cross-compile
	if [[ "$NATIVE_ARCH_PREFIX" != "$ARCH" ]]; then
		echo "🔄 Cross-compiling for $ARCH architecture ($PLATFORM)"
	else
		echo "🔨 Building for native $ARCH architecture ($PLATFORM)"
	fi

	# Full image name for Docker Hub
	IMAGE_NAME="$DOCKER_USERNAME/$DOCKER_REPOSITORY:$TAG"

	echo "🔨 Building Docker image: $IMAGE_NAME on platform $PLATFORM"

	# Build and push using buildx
	docker buildx build -f $DOCKERFILE_PATH --platform $PLATFORM --provenance false -t $IMAGE_NAME --push $DOCKER_BUILD_CONTEXT

	echo "✅ Successfully built and pushed $ARCH image: $IMAGE_NAME"

	# Skip Docker Scout for cross-compiled images
	if [[ "$NATIVE_ARCH_PREFIX" == "$ARCH" ]]; then
		echo "📊 Running security scan"
		docker scout quickview $IMAGE_NAME || echo "⚠️  Docker Scout scan failed, but continuing..."
	else
		echo "⏩ Skipping Docker Scout for cross-compiled image (not compatible with different architectures)"
	fi

	# Update the tag in .env file
	if [ -f "$ENV_FILE" ]; then
		# Convert architecture to uppercase for env var
		if [[ "$ARCH" == "arm" ]]; then
			TAG_ENV_VAR="ARM_CURRENT_TAG"
		else
			TAG_ENV_VAR="INTEL_CURRENT_TAG"
		fi

		# Check if tag variable already exists in the file
		if grep -q "^$TAG_ENV_VAR=" "$ENV_FILE"; then
			# Create a temporary file for the replacement
			TMP_ENV_FILE=$(mktemp)

			# Use awk for more reliable replacement across platforms
			awk -v var="$TAG_ENV_VAR" -v val="$TAG" '{
                if ($0 ~ "^"var"=") {
                    print var"="val
                } else {
                    print $0
                }
            }' "$ENV_FILE" >"$TMP_ENV_FILE"

			# Replace the original file
			mv "$TMP_ENV_FILE" "$ENV_FILE"
		else
			# Add tag to the file
			echo "$TAG_ENV_VAR=$TAG" >>"$ENV_FILE"
		fi
		echo "📝 Updated $TAG_ENV_VAR in .env file to: $TAG"
	fi
done

# Create a latest tag that is multi-architecture (if both were built)
if [ ${#ARCHITECTURES[@]} -gt 1 ]; then
	echo "🔄 Creating multi-architecture 'latest' tag"

	# Build arguments for the manifest create command
	MANIFEST_ARGS=("$DOCKER_USERNAME/$DOCKER_REPOSITORY:latest")
	for ARCH in "${ARCHITECTURES[@]}"; do
		if [[ "$ARCH" == "arm" ]]; then
			MANIFEST_ARGS+=("$DOCKER_USERNAME/$DOCKER_REPOSITORY:$ARM_TAG")
		else
			MANIFEST_ARGS+=("$DOCKER_USERNAME/$DOCKER_REPOSITORY:$INTEL_TAG")
		fi
	done

	# Create and push the manifest
	docker manifest create --amend "${MANIFEST_ARGS[@]}"
	docker manifest push "$DOCKER_USERNAME/$DOCKER_REPOSITORY:latest"

	echo "✅ Multi-architecture 'latest' tag created"
fi

# Set repository to private and update description
echo "🔒 Setting repository visibility to private"

# Check if the token is available from .env
if [ -f "$ENV_FILE" ]; then
	DOCKER_TOKEN=$(grep '^DOCKER_TOKEN=' "$ENV_FILE" | cut -d '=' -f2)
fi

if [ -n "$DOCKER_TOKEN" ]; then
	# Use token from .env
	echo "Using Docker token from .env file"

	# Using token with Docker Hub API
	RESPONSE=$(curl -s -X PATCH \
		-H "Content-Type: application/json" \
		-H "Authorization: JWT $DOCKER_TOKEN" \
		-d "{\"is_private\": true, \"description\": \"$DOCKER_DESCRIPTION\"}" \
		"https://hub.docker.com/v2/repositories/$DOCKER_USERNAME/$DOCKER_REPOSITORY/")

	# Check if response contains error
	if [[ "$RESPONSE" == *"error"* ]]; then
		echo "❌ Failed to update repository settings: $RESPONSE"
	else
		echo "✅ Repository set to private and description updated"
	fi
else
	# Prompt for password if token not found
	echo "Enter your Docker Hub password:"
	read -s PASSWORD

	# Using username/password with Docker Hub API
	RESPONSE=$(curl -s -X PATCH \
		-H "Content-Type: application/json" \
		-u "$DOCKER_USERNAME:$PASSWORD" \
		-d "{\"is_private\": true, \"description\": \"$DOCKER_DESCRIPTION\"}" \
		"https://hub.docker.com/v2/repositories/$DOCKER_USERNAME/$DOCKER_REPOSITORY/")

	# Check if response contains error
	if [[ "$RESPONSE" == *"error"* ]]; then
		echo "❌ Failed to update repository settings: $RESPONSE"
	else
		echo "✅ Repository set to private and description updated"
	fi
fi

# Provide confirmation and examples
echo ""
echo "🎉 Build Complete! Summary:"
echo "📌 Private Image URL: https://hub.docker.com/r/$DOCKER_USERNAME/$DOCKER_REPOSITORY"
echo ""
echo "Available tags:"
if [[ " ${ARCHITECTURES[*]} " =~ " arm " ]]; then
	echo "- $DOCKER_USERNAME/$DOCKER_REPOSITORY:$ARM_TAG (ARM64 architecture)"
fi
if [[ " ${ARCHITECTURES[*]} " =~ " intel " ]]; then
	echo "- $DOCKER_USERNAME/$DOCKER_REPOSITORY:$INTEL_TAG (AMD64 architecture)"
fi
if [ ${#ARCHITECTURES[@]} -gt 1 ]; then
	echo "- $DOCKER_USERNAME/$DOCKER_REPOSITORY:latest (Multi-architecture)"
fi

echo ""
echo "To use this image on another machine:"
echo ""
echo "1. Login to Docker Hub:"
echo "   docker login"
echo ""
echo "2. Pull the appropriate image for your architecture:"
if [ ${#ARCHITECTURES[@]} -gt 1 ]; then
	echo "   docker pull $DOCKER_USERNAME/$DOCKER_REPOSITORY:latest"
	echo "   (This will automatically select the right architecture)"
else
	if [[ " ${ARCHITECTURES[*]} " =~ " arm " ]]; then
		echo "   docker pull $DOCKER_USERNAME/$DOCKER_REPOSITORY:$ARM_TAG  # For ARM64 machines"
	fi
	if [[ " ${ARCHITECTURES[*]} " =~ " intel " ]]; then
		echo "   docker pull $DOCKER_USERNAME/$DOCKER_REPOSITORY:$INTEL_TAG  # For AMD64 machines"
	fi
fi
echo ""
echo "3. Run the container:"
if [ ${#ARCHITECTURES[@]} -gt 1 ]; then
	echo "   docker run -p $PORT:$PORT $DOCKER_USERNAME/$DOCKER_REPOSITORY:latest"
else
	if [[ " ${ARCHITECTURES[*]} " =~ " arm " ]]; then
		echo "   docker run -p $PORT:$PORT $DOCKER_USERNAME/$DOCKER_REPOSITORY:$ARM_TAG"
	fi
	if [[ " ${ARCHITECTURES[*]} " =~ " intel " ]]; then
		echo "   docker run -p $PORT:$PORT $DOCKER_USERNAME/$DOCKER_REPOSITORY:$INTEL_TAG"
	fi
fi
echo ""
echo "4. Or create a docker-compose.yml file:"
cat <<EOF
services:
  web:
    image: $DOCKER_USERNAME/$DOCKER_REPOSITORY:latest
    ports:
      - "$PORT:$PORT"
    environment:
      - WEBHOOK_URL=https://yourdomain.com/webhook
      - SHEETS_WEBHOOK_URL=https://yourdomain.com/sheets-webhook

volumes:
  data_volume:
EOF
