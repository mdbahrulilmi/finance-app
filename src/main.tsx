import { Provider } from "@/components/ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProviderCustom } from "./components/ui/theme-context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <ThemeProviderCustom>
        <App />
      </ThemeProviderCustom>
    </Provider>
  </React.StrictMode>
);