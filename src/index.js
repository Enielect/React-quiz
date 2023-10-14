import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { QuestionDataProvider } from "./contexts/QuestionDataProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuestionDataProvider>
      <App />
    </QuestionDataProvider>
  </React.StrictMode>
);
