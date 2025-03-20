import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
