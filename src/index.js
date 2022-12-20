import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";
import App from "./App";
import { reducer, StateProvider } from "./state";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
