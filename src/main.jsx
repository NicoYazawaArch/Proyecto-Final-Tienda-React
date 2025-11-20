// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from './context/CartContext';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. HelmetProvider envuelve todo para manejar los títulos */}
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          {/* 2. CartProvider dentro de AuthProvider */}
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);