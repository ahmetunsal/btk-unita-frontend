"use client"

import { IUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
interface AuthContextType {
  isAuthenticated: boolean;
  user: IUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='));
    if (userCookie) {
      const user = JSON.parse(userCookie.split('=')[1]);
      if (user && user.email) {
        setUser(user);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/login', { email, password });
    if (response.status === 200) {
      const user = response.data.user;
      document.cookie = `user=${JSON.stringify(user)}; path=/; ${process.env.NODE_ENV === 'production' ? 'secure;' : ''} samesite=lax`;
      setIsAuthenticated(true);
      toast.success('Giriş başarılı');
      router.push('/admin/dashboard');
    } else {
      toast.error('Giriş başarısız');
    }
  };


  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
