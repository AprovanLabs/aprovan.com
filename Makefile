include .env
export

.PHONY: client
client:
	$(eval REACT_APP_AWS_REGION=$(shell echo "$(AWS_DEFAULT_REGION)"))

	$(eval REACT_APP_UI_URL=$(shell \
		cat cdk.out/outputs.json \
		| jq -r 'to_entries[0].value.WebUrl' \
	))

	( \
		cd apps/web \
		&& rm -rf build \
		&& npm run build \
		&& aws s3 sync \
			build/ \
			"s3://aprovan-client-${ENVIRONMENT}-web-${REGION_SHORT_CODE}" \
			--delete \
	)

	# aws cloudfront create-invalidation \
	# 	--distribution-id ${CLOUDFRONT_ID} \
	# 	--paths "/index.html"
