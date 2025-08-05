"use client"

import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/login', { email, password });
    if (response.status === 200) {
      const user = response.data.user;
      document.cookie = `user=${JSON.stringify(user)}; path=/; ${process.env.NODE_ENV === 'production' ? 'secure;' : ''} samesite=lax`;
      setIsAuthenticated(true);
    } else {
      console.error('Login failed');
    } 
  };
  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
