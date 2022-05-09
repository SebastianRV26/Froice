import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import FirebaseAuthProvider from "./store/auth-context";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAuthProvider>
        <App />
        <ToastContainer />
      </FirebaseAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
