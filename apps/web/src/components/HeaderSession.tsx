/**
 * Session area for the home-page header: sign-in button / profile menu wired
 * to the shared Cognito client. Renders nothing when auth is unconfigured
 * (e.g. offline builds), so the page still works as a plain static site.
 */
import { useAuth } from "@aprovan/ui/auth";
import { SessionArea, type SessionAreaStatus } from "@aprovan/ui/shell";

const STATUS_MAP: Record<string, SessionAreaStatus> = {
  loading: "loading",
  authenticated: "ready",
  unauthenticated: "signed-out",
  unconfigured: "unconfigured",
};

export function HeaderSession() {
  const auth = useAuth();

  return (
    <SessionArea
      status={STATUS_MAP[auth.status] ?? "unconfigured"}
      user={auth.user ? { email: auth.user.email } : null}
      onSignIn={() => auth.signIn()}
      onSignOut={() => auth.signOut()}
      links={[
        { label: "Chat", href: "/chat/" },
        { label: "Registry", href: "/registry/" },
      ]}
    />
  );
}
