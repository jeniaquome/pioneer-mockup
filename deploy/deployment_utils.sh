#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$(dirname "$SCRIPT_DIR")/.env"

# Convenient helper for colourful output
setOutputColours() {
	GREEN='\033[0;32m'
	BLUE='\033[0;34m'
	RED='\033[0;31m'
	YELLOW='\033[0;33m'
	NC='\033[0m' # No Color
}

# Function to detect architecture of current machine
detectArchitecture() {
	ARCH=$(uname -m)
	if [[ "$ARCH" == "arm64" || "$ARCH" == "aarch64" ]]; then
		ARCH_PREFIX="arm"
		HOST_ARCH="arm64"
		echo -e "${BLUE}🖥️ Detected ARM architecture${NC}"
	else
		ARCH_PREFIX="intel"
		HOST_ARCH="amd64"
		echo -e "${BLUE}🖥️ Detected Intel/AMD architecture${NC}"
	fi
}

# Function to parse current tag and increment version
# ARGS
# $1: current tag
# $2: architecture prefix
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
		echo "${arch_prefix}-0.0.2"
	fi
}

# Checks for existence of an environment variable both in
# the environment and in a .env file.
# If not found and no default is passed, will throw an error.
# ARGS
# $1: var_name - the name of the environment variable
# $2: default value - leave empty if var is required
#
# Returns 0 if key is found or set to default and 1 if key is not found
checkForEnvVar() {
	local var_name=$1
	local default_val=$2

	local env_value="${!var_name}"

	# Check if the environment variable is empty
	if [ -z "$env_value" ]; then
		# Check if it's been set in the env file
		env_value=$(grep "^$var_name=" "$ENV_FILE" | cut -d '=' -f2-)

		# if there's a value in the env file use it
		if [ -n "$env_value" ]; then
			echo -e "${GREEN}✅  Using '$var_name' from .env file${NC}"
			export $var_name="$env_value"
			return 0
		fi

		# if default is empty then it's a required variable
		if [ -z "$default_val" ]; then
			echo -e "${RED}❌  '$var_name' is required ${NC}"
			return 1
		fi
		echo -e "${GREEN}✅  Using default value for '$var_name': $default_val${NC}"
		export $var_name="$default_val"
	else
		echo -e "${GREEN}✅  Using '$var_name' from environment${NC}"
		export $var_name="$env_value"
	fi
	return 0
}

# Processes an array of env vars
# ARGS
# $1: the name of the array to be processed
processEnvVars() {
	local env_vars_to_process=$1[@]
	env_vars_to_process=("${!env_vars_to_process}")

	for i in "${!env_vars_to_process[@]}"; do
		local env_var=${env_vars_to_process[$i]}
		local var_name="$(echo "$env_var" | cut -d "=" -f1)"
		local default_value="$(echo "$env_var" | cut -s -d "=" -f2-)"
		checkForEnvVar "$var_name" "$default_value"
		if [ $? -eq 1 ]; then
			exit 1
		fi
		env_vars_to_process[$i]=$var_name
	done
}

# Finds app id in environment, or creates an app stub and updates
# .env file with the resulting app id
findOrCreateAppId() {
	checkForEnvVar "CLOUD_APP_ID" "" >/dev/null

	if [ $? -eq 1 ]; then
		echo -e "${YELLOW}⚠️ Quome App ID not found in .env${NC}"
		read -n1 -rep "Would you like an app to be created in the Quome Cloud? (y/n): " answer

		if [ "$answer" == "${answer#[Yy]}" ]; then
			echo -e "${RED}❌ Quome App ID is required to proceed${NC}"
			echo -e "${YELLOW}Either add the value to your .env file under CLOUD_APP_ID or re-run script to create an app in the Quome Cloud.${NC}"
			exit 1
		fi

		echo -e "${BLUE}📡 Creating an app stub in the Quome Cloud...${NC}"

		local app_payload=$(
			cat <<EOF
  {
    "name": "$APPLICATION_NAME"
  }
EOF
		)

		local apps_api_url="https://demo.quome.cloud/api/v1/orgs/$CLOUD_ORG_ID/apps"
		echo "Apps API URL: $apps_api_url"

		# Save detailed debugging output to a file for inspection if needed
		local debug_file="/tmp/quome_app_debug_$(date +%s).log"

		# Try to create the app via API (with SSL option if in test mode)
		local response=$(curl $CURL_SSL_OPTION -L -s -w "\nStatus Code: %{http_code}\n" -X POST \
			-H "Content-Type: application/json" \
			-H "Authorization: Bearer $QUOME_API_KEY" \
			-d "$app_payload" \
			"$apps_api_url" 2>"$debug_file")

		echo $response

		local status=$(echo "$response" | grep "Status Code:" | awk '{print $3}')

		# Extract app ID if present
		local app_id=$(echo "$response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

		# Check if the app was created successfully
		if [[ "$status" -ge 200 && "$status" -lt 300 ]] ||
			[[ "$response" == *"\"status\":\"success\""* || "$response" == *"\"status\":\"ok\""* ]]; then

			echo -e "${GREEN}✅ Created app successfully with id '$app_id'${NC}"
			echo -e "Writing App ID to .env file $ENV_FILE"

			# Write CLOUD_APP_ID to .env file
			if grep -q "^CLOUD_APP_ID=" "$ENV_FILE"; then
				TMP_ENV_FILE=$(mktemp)

				awk -v var="CLOUD_APP_ID" -v val="$app_id" '{
                if ($0 ~ "^"var"=") {
                    print var"="val
                } else {
                    print $0
                }
            }' "$ENV_FILE" >"$TMP_ENV_FILE"

				mv "$TMP_ENV_FILE" "$ENV_FILE"
			else
				# add CLOUD_APP_ID to the file
				echo "CLOUD_APP_ID=$app_id" >>"$ENV_FILE"
			fi
			echo "📝 Updated CLOUD_APP_ID in .env file to: $app_id"

		elif [[ "$status" -eq 409 || "$response" == *"already exists"* ]]; then
			echo -e "${BLUE}ℹ️ App $APPLICATION_NAME already exists${NC}"
		else
			echo -e "${YELLOW}⚠️ Could not create app (HTTP status: $status)${NC}"
			echo "Response preview:"
			echo "$response" | head -10
			echo "You may need to create this app manually via the Quome Cloud api"
			echo "Debug log: $debug_file"
		fi

		CLOUD_APP_ID=$app_id
	else
		echo -e "${GREEN}✅  Using Quome app id from environment/.env${NC}"
	fi
}

# Finds if there is a provided quome api key
# Accepts QUOME_KEY or QUOME_API_KEY
# Sets QUOME_API_KEY to the found value
findQuomeAPIKey() {
	checkForEnvVar "QUOME_KEY" "" >/dev/null
	if [ $? -eq 1 ]; then
		checkForEnvVar "QUOME_API_KEY" "" >/dev/null
		if [ $? -eq 1 ]; then
			echo -e "${RED}❌  One of ('QUOME_API_KEY', 'QUOME_KEY') is required ${NC}"
		else
			echo -e "${GREEN}✅  Using Quome API Key from var 'QUOME_API_KEY')${NC}"
		fi
	else
		echo -e "${GREEN}✅  Using Quome API Key from var 'QUOME_KEY'${NC}"
		QUOME_API_KEY=$QUOME_KEY
	fi
}

# Updates an environment variable in a .env file
# ARGS
# $1: var_name - the name of the environment variable
# $2; new_value - the value to update .env with
updateVarInEnvFile() {
	local var_name=$1
	local new_value=$2

	echo -e "Writing $var_name to .env file"

	# Write $var_name to .env file
	if grep -q "^$var_name=" "$ENV_FILE"; then
		TMP_ENV_FILE=$(mktemp)

		awk -v var="$var_name" -v val="$new_value" '{
      if ($0 ~ "^"var"=") {
        print var"="val
      } else {
        print $0
      }
  }' "$ENV_FILE" >"$TMP_ENV_FILE"

		mv "$TMP_ENV_FILE" "$ENV_FILE"
	else
		# add $var_name to the file
		echo "$var_name=$new_value" >>"$ENV_FILE"
	fi
	echo "📝 Updated $var_name in .env file"
}

# Pushes a docker credentials secret to Quome cloud if it doesn't already exist
# ARGS
# $1: docker_username - a docker username
# $2: docker_token - a docker PAT
pushDockerSecretToQuome() {
	local docker_username=$1
	local docker_token=$2

	local full_secret_name="$APPLICATION_NAME-docker-credentials"

	echo -e "${BLUE}📡 Creating docker credentials secret '$full_secret_name'...${NC}"

	local secret_payload=$(
		cat <<EOF
		{
    	"name": "$full_secret_name",
    	"type": "docker-credentials",
    	"description": "Docker Hub credentials for $docker_username",
    	"secret": {
        "auths": {
          "https://index.docker.io/v1/": {
            "username": "$docker_username",
            "password": "$docker_token"
          }
      }
  }
}
EOF
	)

	pushSecretPayloadToQuome "$secret_payload" "$full_secret_name"
}

# Pushes a secret to Quome cloud if it doesn't already exist
# ARGS
# $1: var_name - the environment variable being pushed
# $2: secret_name - what to call the secret in quome cloud
pushGenericSecretToQuome() {
	local var_name=$1
	local secret_name=$2

	local full_secret_name="$APPLICATION_NAME-$secret_name"

	echo -e "${BLUE}📡 Creating secret '$full_secret_name'...${NC}"

	local secret_payload=$(
		cat <<EOF
		{
    	"name": "$full_secret_name",
    	"type": "generic",
    	"description": "$secret_name for $APPLICATION_NAME app",
    	"secret": {
      	"value": "${!var_name}"
    	}
	}
EOF
	)

	pushSecretPayloadToQuome "$secret_payload" "$full_secret_name"
}

# Push a JSON secret to quome
# $1 json_file - path to the json file to be pushed
# $2 secret_name - the name of the secret being pushed
pushJSONSecretToQuome() {
	local json_file=$1
	local secret_name=$2
	local full_secret_name="$APPLICATION_NAME-$secret_name"

	echo -e "${BLUE}📡 Creating JSON secret '$full_secret_name'...${NC}"

	# Read the JSON content and escape it properly
	local json_content=$(cat "$json_file" | jq -c -R . | jq -s -c 'join("")')

	local secret_payload=$(
		cat <<EOF
		{
    	"name": "$full_secret_name",
    	"type": "generic", 
    	"description": "$secret_name for $APPLICATION_NAME app",
    	"secret": {
        "value": $json_content
    	}
	}
EOF
	)

	pushSecretPayloadToQuome "$secret_payload" "$full_secret_name"
}

# Push a secret payload to quome cloud
# mostly meant to be a helper for pushGenericSecretToQuome and pushDockerSecretToQuome
# ARGS
# $1 secret_payload - the payload to push
# $2 secret_name - the name of the secret being pushed
pushSecretPayloadToQuome() {
	local secret_payload=$1
	local secret_name=$2

	# Save detailed debugging output to a file for inspection if needed
	local debug_file="/tmp/quome_secret_debug_$(date +%s).log"

	local secrets_api_url="https://demo.quome.cloud/api/v1/orgs/$CLOUD_ORG_ID/secrets"

	local response=$(curl $CURL_SSL_OPTION -L -s -w "\nStatus Code: %{http_code}\n" -X POST \
		-H "Content-Type: application/json" \
		-H "Authorization: Bearer $QUOME_API_KEY" \
		-d "$secret_payload" \
		"$secrets_api_url" 2>>"$debug_file")

	local status=$(echo "$response" | grep "Status Code:" | awk '{print $3}')

	# Check if the secret was created successfully
	if [[ "$status" -ge 200 && "$status" -lt 300 ]] || [[ "$response" == *"\"status\":\"success\""* || "$response" == *"\"status\":\"ok\""* ]]; then
		echo -e "${GREEN}✅  Secret '$secret_name' created or updated successfully${NC}"
	elif [[ "$status" -eq 409 || "$response" == *"already exists"* ]]; then
		echo -e "${BLUE}ℹ️  Secret '$secret_name' already exists, updating...${NC}"

		# First, get the secret ID
		local list_response=$(curl $CURL_SSL_OPTION -L -s \
			-H "Authorization: Bearer $QUOME_API_KEY" \
			"$secrets_api_url" 2>>"$debug_file")

		local secret_id=$(echo "$list_response" | jq -r ".secrets[] | select(.name == \"$secret_name\") | .id")

		if [ -z "$secret_id" ]; then
			echo -e "${YELLOW}⚠️  Could not find secret ID for '$secret_name'...${NC}"
		else
			# Now update the secret
			echo -e "${BLUE}📡 Updating secret '$secret_name'...${NC}"
			local update_response=$(curl $CURL_SSL_OPTION -L -s -w "\nStatus Code: %{http_code}\n" -X PUT \
				-H "Content-Type: application/json" \
				-H "Authorization: Bearer $QUOME_API_KEY" \
				-d "$secret_payload" \
				"$secrets_api_url/$secret_id" 2>>"$debug_file")

			local update_status=$(echo "$update_response" | grep "Status Code:" | awk '{print $3}')

			if [[ "$update_status" -ge 200 && "$update_status" -lt 300 ]] || [[ "$update_response" == *"\"status\":\"success\""* || "$update_response" == *"\"status\":\"ok\""* ]]; then
				echo -e "${GREEN}✅  Secret '$secret_name' updated successfully${NC}"
			else
				echo -e "${RED}❌  Failed to update secret '$secret_name' (HTTP status: $update_status)${NC}"
				echo "Update response:"
				echo "$update_response" | head -10
				echo "Debug log: $debug_file"
			fi
		fi
	else
		echo -e "${YELLOW}⚠️  Could not create secret '$secret_name' (HTTP status: $status)${NC}"
		echo "Response preview:"
		echo "$response" | head -10
		echo "You may need to create this secret manually via the Quome Cloud dashboard"
		echo "Debug log: $debug_file"
	fi
}
