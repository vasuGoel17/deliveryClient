import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import ContextProvider from "./components/context/ContextProvider";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <div>
    <ContextProvider>
      <App />
    </ContextProvider>
  </div>
);
