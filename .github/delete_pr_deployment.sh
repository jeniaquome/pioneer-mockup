set -e

pr_app_name="$APP_NAME-pr-$PR_NUMBER"

# Get app id if it exists
# create app otherwise
apps=$(curl -L -s -m 30 -X GET \
	-H "Authorization: Bearer $API_KEY" \
	"https://demo.quome.cloud/api/v1/orgs/$ORG_ID/apps" | jq '.apps[]')

app_id=$(echo $apps | jq -r --arg app_name $pr_app_name 'select(.name==$app_name).id')

if [[ -z $app_id ]]; then
	echo "App id not found, app was probably already deleted"
	exit 0
fi

# delete app from quome
curl -L -s -m 30 -X DELETE \
	-H "Authorization: Bearer $API_KEY" \
	"https://demo.quome.cloud/api/v1/orgs/$ORG_ID/apps/$app_id"
