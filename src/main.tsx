import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Global } from "@emotion/react";
import globalStyles from "./styles/globalStyles.ts";
import { AlertContextProvider } from "./contexts/AlertContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <QueryClientProvider client={queryClient}>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
