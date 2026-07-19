/**
 * Cognito auth wiring for the home page. Config is baked at build time from
 * VITE_COGNITO_* (populated by scripts/load-env.ts from the shared SSM env);
 * when absent the header simply renders without a session area.
 */
import { resolveAuthConfig, type AuthConfig } from "@aprovan/ui/auth";

export const authConfig: AuthConfig | null = resolveAuthConfig(import.meta.env, {
  redirectPath: "/auth/callback",
});
