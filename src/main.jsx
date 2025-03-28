import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { DiscountProvider } from "./context/DiscountContext.jsx";
import { CategoriesProvider } from "./context/CategoriesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <ProductProvider>
            <DiscountProvider>
              <CategoriesProvider >
                <App />
              </CategoriesProvider >
            </DiscountProvider>
          </ProductProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
