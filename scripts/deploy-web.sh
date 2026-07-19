#!/usr/bin/env bash
#
# Build the aprovan.com home page and publish it to the shared web bucket root.
#
# The bucket (owned by core's WebStack) also hosts the chat and registry apps
# under their own prefixes — the root sync explicitly protects those prefixes
# from --delete. CloudFront's static rewrite maps /privacy-policy/ and
# /auth/callback/ to index.html copies published after the sync.
#
# Usage:
#   AWS_PROFILE=aprovan scripts/deploy-web.sh          # local
#   scripts/deploy-web.sh                              # CI (OIDC creds ambient)
#
# Config (all optional — resolved from SSM/core infra when unset):
#   WEB_BUCKET                  target S3 bucket (SSM /aprovan/<env>/web/bucket)
#   CLOUDFRONT_DISTRIBUTION_ID  aprovan.com distribution (SSM .../web/distribution-id)
#   SKIP_BUILD=1                reuse an existing apps/web/dist

source "$(dirname "${BASH_SOURCE[0]}")/deploy-lib.sh"

resolve WEB_BUCKET "$WEB_REGION" "/aprovan/${ENVIRONMENT}/web/bucket" "web bucket"
resolve CLOUDFRONT_DISTRIBUTION_ID "$WEB_REGION" \
  "/aprovan/${ENVIRONMENT}/web/distribution-id" "distribution id"

DIST_DIR="$REPO_ROOT/apps/web/dist"

if [[ "${SKIP_BUILD:-}" != "1" ]]; then
  log "Building @aprovan/home-web (env $ENVIRONMENT)"
  (
    cd "$REPO_ROOT"
    APROVAN_ENV="$ENVIRONMENT" AWS_REGION="$AWS_REGION" pnpm --filter "@aprovan/home-web" build
  )
fi

[[ -f "$DIST_DIR/index.html" ]] ||
  die "$DIST_DIR/index.html missing — build did not produce output."

# Sibling apps live under these bucket prefixes; never let the root sync's
# --delete touch them. AWS filter semantics: the LAST matching filter wins,
# so these excludes must come AFTER any --include to actually protect the
# prefixes (a trailing --include "*.html" would otherwise re-include them
# as deletion candidates).
PROTECTED=(--exclude "chat/*" --exclude "registry/*")

log "Syncing $DIST_DIR → s3://$WEB_BUCKET/ (protecting chat/, registry/)"
# Fingerprinted assets: long-cache. HTML: always revalidate.
awscli "$WEB_REGION" s3 sync "$DIST_DIR" "s3://$WEB_BUCKET/" \
  --delete \
  --exclude "*.html" "${PROTECTED[@]}" \
  --cache-control "public,max-age=31536000,immutable"
awscli "$WEB_REGION" s3 sync "$DIST_DIR" "s3://$WEB_BUCKET/" \
  --delete \
  --exclude "*" --include "*.html" "${PROTECTED[@]}" \
  --cache-control "public,max-age=0,must-revalidate" \
  --content-type "text/html; charset=utf-8"

# SPA shell copies for the pathname routes CloudFront rewrites to directories.
for route in privacy-policy auth/callback; do
  log "Publishing SPA shell at ${route}/"
  awscli "$WEB_REGION" s3 cp "$DIST_DIR/index.html" \
    "s3://$WEB_BUCKET/${route}/index.html" \
    --cache-control "public,max-age=0,must-revalidate" \
    --content-type "text/html; charset=utf-8"
done

log "Invalidating CloudFront $CLOUDFRONT_DISTRIBUTION_ID (/*)"
INVALIDATION_ID="$(awscli "$WEB_REGION" cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' --output text)"

log "Done. https://aprovan.com/ (invalidation $INVALIDATION_ID)"
