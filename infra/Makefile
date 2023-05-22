include .env
export


.PHONY: web
apps-web:
	$(eval REACT_APP_AWS_REGION=$(shell echo "$(AWS_DEFAULT_REGION)"))

	$(eval REACT_APP_UI_URL=$(shell \
		cat cdk.out/outputs.json \
		| jq -r 'to_entries[0].value.WebUrl' \
	))

	(cd ../apps/web && npm run build)

	( \
		cd ../client \
		&& aws s3 sync \
			build/ \
			"s3://aprovan-client-${ENVIRONMENT}-web-${AWS_DEFAULT_REGION}" \
			--delete \
	)

	# aws cloudfront create-invalidation \
	# 	--distribution-id ${CLOUDFRONT_ID} \
	# 	--paths "/index.html"

.PHONY: client
client: client-web

.PHONY: install
install:
	@echo "Install libraries"
	pip install -r requirements.txt
	npm install -g aws-cdk

	@echo "Login to AWS"
	# aws configure
