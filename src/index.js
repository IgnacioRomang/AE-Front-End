import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PublicResourcesProvider } from "./contexts/PublicResourcesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
function Preload() {
  useEffect(() => {
    const img = new Image();
    img.src = "/images/logo.webp"; // Cambia esto por la ruta a tu recurso
    const img2 = new Image();
    img2.src = "/images/logo_cas_mas_pcia_2024_crop_2.webp"; // Cambia esto por la ruta a tu recurso
  }, []);

  return null;
}

root.render(
  <React.StrictMode>
    <PublicResourcesProvider>
      <Preload />
      <App />
    </PublicResourcesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
