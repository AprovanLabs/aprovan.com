import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(async () => {
  // Populates VITE_COGNITO_* from the shared SSM env (skip with APROVAN_ENV=off).
  await import("./scripts/load-env.js");

  return {
    base: "/",
    plugins: [tailwindcss(), react()],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
    server: { port: 4200 },
  };
});
