import ReactDOM from "react-dom/client";
import React from "react";
import App from './App.jsx'
import './Style/style.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
