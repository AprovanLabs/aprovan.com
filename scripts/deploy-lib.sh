# shellcheck shell=bash
# Shared helpers for the aprovan.com deploy scripts.
#
# Sourced by deploy-web.sh / deploy.sh so the same logic runs locally (using an
# AWS_PROFILE) and in GitHub Actions (using OIDC credentials).
#
# Configuration resolves in this order for every value: explicit environment
# variable → SSM parameter published by the core infra → hard default. That lets
# CI pass values as env vars while a laptop just relies on SSM discovery.

set -euo pipefail

# --- Environment ------------------------------------------------------------
# Deployment environment (matches core CDK naming, e.g. "prd").
ENVIRONMENT="${ENVIRONMENT:-prd}"

# Region of the shared identity SSM param (regional core stack).
AWS_REGION="${AWS_REGION:-us-east-2}"

# Region of the shared aprovan.com web bucket + CloudFront (a global us-east-1
# stack in core). The web bucket/distribution SSM params live here.
WEB_REGION="${WEB_REGION:-us-east-1}"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

log() { printf '\033[1;34m[aprovan-deploy]\033[0m %s\n' "$*"; }
die() {
  printf '\033[1;31m[aprovan-deploy] error:\033[0m %s\n' "$*" >&2
  exit 1
}

# aws <region> <args...> — thin wrapper that pins the region and forwards the
# optional AWS_PROFILE (unset in CI, where OIDC creds are ambient).
awscli() {
  local region="$1"
  shift
  if [[ -n "${AWS_PROFILE:-}" ]]; then
    aws --region "$region" --profile "$AWS_PROFILE" "$@"
  else
    aws --region "$region" "$@"
  fi
}

# ssm_param <region> <name> — echoes the parameter value, empty string if absent.
ssm_param() {
  awscli "$1" ssm get-parameter --name "$2" \
    --query 'Parameter.Value' --output text 2>/dev/null || true
}

# resolve <var-name> <region> <ssm-name> <label>
# Sets the named variable from its current env value, falling back to SSM.
resolve() {
  local var="$1" region="$2" ssm_name="$3" label="$4"
  local current="${!var:-}"
  if [[ -n "$current" ]]; then
    log "$label: $current (from env)"
    return
  fi
  local value
  value="$(ssm_param "$region" "$ssm_name")"
  [[ -n "$value" && "$value" != "None" ]] ||
    die "$label not set and SSM $ssm_name ($region) is empty. Deploy core infra first or set the env var."
  printf -v "$var" '%s' "$value"
  log "$label: $value (from SSM $ssm_name)"
}

# shared_env_value <KEY> — reads one line out of the core /aprovan/<env>/env
# SSM parameter (the shared identity bundle written by core MainStack).
shared_env_value() {
  local key="$1"
  ssm_param "$AWS_REGION" "/aprovan/${ENVIRONMENT}/env" |
    awk -F= -v k="$key" '$1==k{sub(/^[^=]*=/,""); print; exit}'
}
