/**
 * aprovan.com — single-page home for the Aprovan platform and products.
 *
 * Routing is a plain pathname switch (the CloudFront static rewrite serves
 * this shell at /, /privacy-policy/, and /auth/callback/): no router needed
 * for three routes on a landing page.
 */
import { AuthCallback } from "@aprovan/ui/auth";
import HomePage from "./pages/HomePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "");

  if (path === "/auth/callback") {
    return <AuthCallback />;
  }
  if (path === "/privacy-policy") {
    return <PrivacyPolicyPage />;
  }
  return <HomePage />;
}
