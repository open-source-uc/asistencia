import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserSessionProvider } from "./components/auth/user-session-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserSessionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserSessionProvider>
  </React.StrictMode>
);
