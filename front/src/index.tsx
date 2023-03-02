import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProviderWrapper } from "./context/auth.context";
import { Router, BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import AuthPage from "./pages/Auth.page";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/auth" element={<AuthPage/>}/> 
          
        
        </Routes>
      </AuthProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
