import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AudiogramProvider } from "./contexts/audiogramContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AudiogramProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AudiogramProvider>

  // </React.StrictMode>
);
