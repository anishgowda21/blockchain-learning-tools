import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Blockchain from "./pages/Blockchain.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Blockchain />
  </StrictMode>
);
