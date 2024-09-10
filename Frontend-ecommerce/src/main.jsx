import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Context/authContext";
import { CategoryProvider } from "./Context/categoryContext";
import { UserProfileProvider } from "./Context/profileContext";
import { ProductProvider } from "./Context/productContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <UserProfileProvider>
    <AuthProvider>
    <ProductProvider>
      <CategoryProvider>
          <App />
      </CategoryProvider>
      </ProductProvider>
    </AuthProvider>
  </UserProfileProvider>
  </React.StrictMode>
);
