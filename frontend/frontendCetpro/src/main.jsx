//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
import React from 'react';
import 'bootstrap/dist/css//bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // <== FALTA ESTO

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <== ENVOLVER AQUÍ */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
