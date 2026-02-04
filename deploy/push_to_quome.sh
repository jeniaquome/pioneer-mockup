#!/bin/bash

# Get script directory and look for deployment_utils.sh there
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/deployment_utils.sh"
source "$SCRIPT_DIR/deployment_config.sh"

setOutputColours

echo -e "${BLUE}📋 Loading configuration from .env and environment variables...${NC}"

detectArchitecture

# Check existence for all environment variables and use defaults if provided
processEnvVars env_vars
processEnvVars secret_env_vars

checkForEnvVar "APPLICATION_NAME" "$DEFAULT_APP_NAME"

# Quome deployment related env vars - DEFAULT_PORT must come from .env
declare -a quome_deploy_vars=("CLOUD_ORG_ID" "DOCKER_USERNAME=$DEFAULT_DOCKER_USERNAME" "DOCKER_TOKEN" "DEFAULT_PORT=$SCRIPT_DEFAULT_PORT" "DOCKER_REPOSITORY=$APPLICATION_NAME" "DOCKER_DESCRIPTION=$DEFAULT_DOCKER_DESCRIPTION" "DEFAULT_TAG=intel-0.0.1")

# Check for all the required environment variables for quome deployment
processEnvVars quome_deploy_vars
# Find quome key
findQuomeAPIKey

checkForEnvVar "DEFAULT_CONTAINER_PORT" "$DEFAULT_PORT"

# Find app id or create stub
findOrCreateAppId

# Push docker credentials to quome cloud
pushDockerSecretToQuome "$DOCKER_USERNAME" "$DOCKER_TOKEN"

# Create secrets in quome cloud for secret env vars
for var in "${secret_env_vars[@]}"; do
	lower_name=$(echo $var | sed -e 's/_/-/g' | awk '{print tolower($0)}')
	pushGenericSecretToQuome $var $lower_name
done

payload_secret_vars=$(
	for var in "${secret_env_vars[@]}"; do
		lower_name=$(echo $var | sed -e 's/_/-/g' | awk '{print tolower($0)}')
		echo "$var"
		echo "$APPLICATION_NAME-$lower_name"
	done | jq -n -R 'reduce inputs as $i ({}; . + { ($i): (input|(tonumber? // .)) })'
)

payload_env_vars=$(
	for var in "${env_vars[@]}"; do
		var_name="$(echo "$var" | cut -d "=" -f1)"
		echo $var_name
		echo "${!var_name}"
	done | jq -n -R 'reduce inputs as $i ({}; . + { ($i): (input|(tonumber? // .)) })'
)

if [ $USE_SQLITE_DB = true ]; then
	if [ -z $SQLITE_ENV_VAR_NAME ]; then
		sqlite_payload=$(
			cat <<EOF
			"sqlite": { "mount_path": "$SQLITE_MOUNT_PATH", "size": "$SQLITE_DB_SIZE" },
EOF
		)
	else
		sqlite_payload=$(
			cat <<EOF
		"sqlite": { "mount_path": "$SQLITE_MOUNT_PATH", "env_var":"$SQLITE_ENV_VAR_NAME", "size": "$SQLITE_DB_SIZE" },
EOF
		)
	fi
fi

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# DOCKER IMAGE BUILD AND PUSH
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# Get Docker repository name
read -rp "Repository name [$DOCKER_REPOSITORY]: " CUSTOM_REPOSITORY
REPOSITORY=${CUSTOM_REPOSITORY:-$DOCKER_REPOSITORY}
echo -e "${GREEN}✅ Using repository: $REPOSITORY${NC}"

checkForEnvVar "INTEL_CURRENT_TAG" "$DEFAULT_TAG"

read -rp "Tag to deploy [$INTEL_CURRENT_TAG]: " CUSTOM_TAG
TAG=${CUSTOM_TAG:-$INTEL_CURRENT_TAG}

# Make sure tag is prefixed with 'intel-' if it's not 'latest'
if [[ "$TAG" != "latest" && ! "$TAG" == intel-* ]]; then
	TAG="intel-$TAG"
	echo -e "${YELLOW}Adding 'intel-' prefix to tag: $TAG${NC}"
fi

# Image to deploy
IMAGE_NAME="$DOCKER_USERNAME/$REPOSITORY:$TAG"
echo -e "${BLUE}🚀 Preparing to deploy image: $IMAGE_NAME${NC}"

# Build the image specifically for Intel architecture using buildx
echo -e "${BLUE}🔨 Building the Intel image for Quome deployment...${NC}"
PLATFORM="linux/amd64" # Intel architecture
echo "Building for platform: $PLATFORM"

# Make sure buildx is available
docker buildx inspect multiarch-builder >/dev/null 2>&1 || docker buildx create --name multiarch-builder --use
docker buildx use multiarch-builder

# Build and push directly with buildx
echo "Building and pushing image: $IMAGE_NAME"
docker buildx build --platform $PLATFORM -t $IMAGE_NAME --push .
echo -e "${GREEN}✅ Intel image built and pushed successfully${NC}"

# Verify image existence
echo -e "${BLUE}🔍 Verifying image exists on Docker Hub...${NC}"

# Get system architecture
SYSTEM_ARCH=$(uname -m)
PLATFORM_ARG=""

# If this is an ARM Mac but the image is for Intel, we need to specify platform
if [[ ("$SYSTEM_ARCH" == "arm64" || "$SYSTEM_ARCH" == "aarch64") && "$TAG" == intel-* ]]; then
	echo -e "${YELLOW}⚠️ Detected ARM Mac but trying to pull Intel image.${NC}"
	echo "Adding --platform=linux/amd64 to pull command to enable emulation."
	PLATFORM_ARG="--platform=linux/amd64"
fi

# Verify image exists on Docker Hub using API instead of pulling
echo -e "${BLUE}🔍 Verifying image on Docker Hub...${NC}"
DOCKER_HUB_API="https://hub.docker.com/v2/repositories/$DOCKER_USERNAME/$REPOSITORY/tags/$TAG"
RESPONSE_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOCKER_HUB_API")

if [[ "$RESPONSE_CODE" == "200" ]]; then
	echo -e "${GREEN}✅ Successfully verified image exists on Docker Hub: $IMAGE_NAME${NC}"
else
	echo -e "${YELLOW}⚠️ Warning: Could not verify image $IMAGE_NAME on Docker Hub (HTTP $RESPONSE_CODE).${NC}"
	echo "This is normal immediately after pushing a new image as it may take time to propagate."
	echo "Since you just built and pushed the image, we can assume it exists."
	echo -e "${GREEN}✅ Proceeding with deployment...${NC}"
fi

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# Push app to quome cloud
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

echo ""
echo -e "${BLUE}🔄 Updating $APPLICATION_NAME application in Quome Cloud...${NC}"

# Get current app configuration
APP_URL="https://demo.quome.cloud/api/v1/orgs/$CLOUD_ORG_ID/apps/$CLOUD_APP_ID"
echo "Retrieving current app configuration..."
CURRENT_CONFIG=$(curl -s -X GET "$APP_URL" -H "Authorization: Bearer $QUOME_API_KEY")

# Create the app payload
app_payload=$(
	cat <<EOF
{
    "name": "$APPLICATION_NAME",
    "spec": {
      "port": $DEFAULT_CONTAINER_PORT,
      "containers": [
      {
        "image": "$IMAGE_NAME",
        "name": "$APPLICATION_NAME",
        "port": $DEFAULT_CONTAINER_PORT,
        "tmp_dirs": ["/tmp"],
        "env_vars": $payload_env_vars,
        "secret_vars": $payload_secret_vars,
        $sqlite_payload
      	"registry_secret": "$APPLICATION_NAME-docker-credentials"
    	}
  	]
	}
}
EOF
)

echo $app_payload | jq '.spec.containers[0].image = ""'  > "$SCRIPT_DIR/app_spec.json"

echo -e "${BLUE}📡 Sending update request to Quome Cloud...${NC}"
echo "NEW CONFIG"
echo "$app_payload" | jq .

# Update the app
API_URL="https://demo.quome.cloud/api/v1/orgs/$CLOUD_ORG_ID/apps/$CLOUD_APP_ID"
echo "API URL: $API_URL"
echo "Using image: $IMAGE_NAME"

# Use curl with verbose output to help debug
UPDATE_RESPONSE=$(curl -s -X PUT "$API_URL" \
	-H "Authorization: Bearer $QUOME_API_KEY" \
	-H "Content-Type: application/json" \
	-d "$app_payload")

# Display response
echo "Response:"
echo "$UPDATE_RESPONSE" | jq .

# Check the response
DEPLOYMENT_STATUS=$(echo "$UPDATE_RESPONSE" | jq -r '.status.deployment.status // empty')

if [ "$DEPLOYMENT_STATUS" == "in_progress" ] || [ "$DEPLOYMENT_STATUS" == "created" ]; then
	echo -e "${GREEN}✅ Cloud deployment update initiated successfully!${NC}"
	echo -e "${BLUE}📋 Deployment status: $DEPLOYMENT_STATUS${NC}"

	# Get deployment ID for tracking
	DEPLOYMENT_ID=$(echo "$UPDATE_RESPONSE" | jq -r '.status.deployment.id // empty')
	if [ ! -z "$DEPLOYMENT_ID" ]; then
		echo -e "${BLUE}📋 Deployment ID: $DEPLOYMENT_ID${NC}"
	fi

	# Show useful URLs
	APP_DOMAIN=$(echo "$UPDATE_RESPONSE" | jq -r '.domain_name // empty')
	if [ ! -z "$APP_DOMAIN" ]; then
		echo -e "${BLUE}🌐 Application URL: https://$APP_DOMAIN${NC}"
	fi

	echo -e "${BLUE}📊 Logs URL: https://demo.quome.cloud/api/v1/orgs/$CLOUD_ORG_ID/apps/$CLOUD_APP_ID/logs${NC}"
else
	echo -e "${YELLOW}⚠️ Deployment response:${NC}"
fi

echo -e "${GREEN}✅ Deployment completed!${NC}"
