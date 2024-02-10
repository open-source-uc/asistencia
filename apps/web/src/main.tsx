import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserSessionProvider } from "./components/contexts/user-session-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserSessionProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserSessionProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
