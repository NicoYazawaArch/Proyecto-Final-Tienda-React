// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos el componente proveedor
export const AuthProvider = ({ children }) => {
  // Leemos el localStorage al inicio para ver si ya estaba logueado
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Guardamos en el navegador
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Borramos del navegador
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);