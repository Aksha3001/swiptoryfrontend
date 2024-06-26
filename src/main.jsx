import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from './store/store.js';
import { ModalProvider } from "./modalcontext/ModalProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <ModalProvider>
        <App />
        </ModalProvider>
    <ToastContainer position="top-center"  />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
