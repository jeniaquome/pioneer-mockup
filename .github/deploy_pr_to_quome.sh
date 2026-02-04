set -e

pr_app_name="$APP_NAME-pr-$PR_NUMBER"

app_spec=$(cat "./deploy/app_spec.json" | jq --arg img_tag $TAG --arg app_name $pr_app_name '.spec.containers[0].image = $img_tag | .name = $app_name | .spec.containers[0].name = $app_name | .spec.containers[0].secret_vars.DATABASE_URL = "pioneer-pr-database-url"')

# Get org secrets
secrets=$(curl -L -s -m 30 -X GET \
	-H "Authorization: Bearer $API_KEY" \
	"https://demo.quome.cloud/api/v1/orgs/$ORG_ID/secrets" | jq '.secrets[].name')

# Check if docker creds secret exists
registry_secret=($(echo $app_spec | jq '.spec.containers[]? | select(has("registry_secret")).registry_secret'))

if [[ $secrets != *$registry_secret* ]]; then
	echo "ERROR: registry secret not found"
	exit 1
fi

# Check if other secrets from app spec exist
secret_names=($(echo $app_spec | jq '.spec.containers[]? | select(has("secret_vars")).secret_vars.[]' | sed 's/ /\n/g'))

for secret in "${secret_names[@]}"; do
	if [[ $secrets != *$secret* ]]; then
		echo "ERROR: secret $secret secret not found"
		exit 1
	fi
done

# Get app id if it exists
# create app otherwise
apps=$(curl -L -s -m 30 -X GET \
	-H "Authorization: Bearer $API_KEY" \
	"https://demo.quome.cloud/api/v1/orgs/$ORG_ID/apps" | jq '.apps[]')

deployed_spec=$(echo $apps | jq --arg app_name $pr_app_name 'select(.name==$app_name)')

if [[ -z $deployed_spec ]]; then
	deployed_spec=$(curl -L -s -m 30 -X POST \
		-H "Content-Type: application/json" \
		-H "Authorization: Bearer $API_KEY" \
		-d "$app_spec" \
		"https://demo.quome.cloud/api/v1/orgs/$ORG_ID/apps")
else
	app_id=$(echo $deployed_spec | jq -r '.id')

	deployed_spec=$(curl -L -s -m 30 -X PUT \
		-H "Content-Type: application/json" \
		-H "Authorization: Bearer $API_KEY" \
		-d "$app_spec" \
		"https://demo.quome.cloud/api/v1/orgs/$ORG_ID/apps/$app_id")
fi

domain_name=$(echo $deployed_spec | jq -r '.domain_name')

echo "APP_DOMAIN_NAME=https://$domain_name" >>$GITHUB_ENV
