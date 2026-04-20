import { Provider } from "@/components/ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProviderCustom } from "./components/ui/theme-context";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/providers/AuthProviders";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider>
          <ThemeProviderCustom>
            <App />
          </ThemeProviderCustom>
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);