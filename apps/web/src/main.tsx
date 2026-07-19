import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "@aprovan/ui/auth";
import App from "./App";
import { authConfig } from "./lib/auth";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
