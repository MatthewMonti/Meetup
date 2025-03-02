import { StrictMode } from 'react'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';

//import atatus from 'atatus-spa';
//test functionality while deployed for speed and browser/OS combatiblity isssues
//BELOW way to connect to atus
//atatus.config('73ba51b05269405eab4f5af2f046caf0').install();

import * as serviceWorkerRegistration from './serviceWorkerRegistration.js/index.js';



ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
serviceWorkerRegistration.register();