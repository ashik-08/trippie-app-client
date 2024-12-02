import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Provider/AuthProvider";
import { routes } from "./Routes/Routes";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={routes} />
          <ReactQueryDevtools />
          <Toaster
            toastOptions={{
              style: {
                textAlign: "center",
                background: "#f5f5f5",
                color: "#333",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                fontWeight: "500",
                fontSize: "17px",
              },
            }}
          />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
