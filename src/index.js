import App from "./App";
import ReactDOM from "react-dom";
import { StrictMode } from "react";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
