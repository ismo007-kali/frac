import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';
import { SMSService, generateOTP } from '../services/smsService';

interface AuthContextType extends AuthState {
  login: (phone: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  verifyOTP: (code: string) => Promise<boolean>;
  requestPasswordReset: (phone: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('fractalis_user');
    if (storedUser) {
      setAuthState({
        isAuthenticated: true,
        user: JSON.parse(storedUser),
        loading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        phone,
        countryCode: '+227',
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('fractalis_user', JSON.stringify(user));
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }));
      return false;
    }
  };

  const register = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const user: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem('fractalis_user', JSON.stringify(user));
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
      });

      return true;
    } catch (error) {
      setAuthState(prev => ({ ...prev, loading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('fractalis_user');
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  const verifyOTP = async (code: string): Promise<boolean> => {
    // Simulate OTP verification - en production, vérifier avec le serveur
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Pour la démo, accepter 123456 ou tout code de 6 chiffres
    return code === '123456' || /^\d{6}$/.test(code);
  };

  const requestPasswordReset = async (phone: string): Promise<boolean> => {
    // Générer et envoyer un OTP pour la réinitialisation
    const otp = generateOTP();
    const success = await SMSService.sendOTP(phone, otp);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return success;
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        verifyOTP,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};