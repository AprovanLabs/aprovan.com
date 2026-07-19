import { loadAprovanEnv, dotenv } from "@aprovan/node";

const environment = process.env.APROVAN_ENV ?? "prd";

if (environment !== "off" && environment !== "false") {
  process.env.AWS_REGION ??= "us-east-2";
  process.env.AWS_DEFAULT_REGION ??= process.env.AWS_REGION;

  try {
    dotenv.config();
    await loadAprovanEnv(environment, { overwrite: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Failed to load /aprovan/${environment}/env from SSM (${process.env.AWS_REGION}): ${message}\n` +
        "Set APROVAN_ENV=off to skip, or configure AWS credentials (e.g. AWS_PROFILE=aprovan).",
    );
  }

  // Cognito OIDC issuer (authority) — NOT the hosted-UI domain.
  const authority = process.env.COGNITO_AUTHORITY ?? process.env.OIDC_ISSUER;
  if (authority && !process.env.VITE_COGNITO_AUTHORITY) {
    process.env.VITE_COGNITO_AUTHORITY = authority;
  }

  const clientId = process.env.COGNITO_CLIENT_ID ?? process.env.OIDC_AUDIENCE;
  if (clientId && !process.env.VITE_COGNITO_CLIENT_ID) {
    process.env.VITE_COGNITO_CLIENT_ID = clientId;
  }

  // Hosted-UI domain — used only for global sign-out.
  const cognitoDomain = process.env.COGNITO_DOMAIN;
  if (cognitoDomain && !process.env.VITE_COGNITO_DOMAIN) {
    process.env.VITE_COGNITO_DOMAIN = cognitoDomain;
  }
}
