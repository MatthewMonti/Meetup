import { StrictMode } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import atatus from 'atatus-spa';
atatus.config('73ba51b05269405eab4f5af2f046caf0').install();

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);