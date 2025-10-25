import React, { useState, useEffect, createContext, useContext } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string, method: 'email' | 'phone') => Promise<void>;
  verifyOTP: (identifier: string, otp: string, method: 'email' | 'phone') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);


  // 開發模式模擬登入 - 支援 email/phone
  const login = async (identifier: string, method: 'email' | 'phone') => {
    // 模擬網路延遲
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 檢查是否為已註冊用戶（開發模式）
    const registrationData = localStorage.getItem('registrationData');
    if (registrationData) {
      const userData = JSON.parse(registrationData);
      const isValidUser = method === 'email' 
        ? userData.email === identifier 
        : userData.phone === identifier;
        
      if (!isValidUser) {
        throw new Error(`此${method === 'email' ? 'Email' : '手機號碼'}尚未註冊，請先註冊帳號`);
      }
    }
    
    console.log(`模擬發送 ${method === 'email' ? 'Email' : 'SMS'} 驗證碼到 ${identifier}`);
    return Promise.resolve();
  };

  // 開發模式模擬 OTP 驗證
  const verifyOTP = async (identifier: string, otp: string, method: 'email' | 'phone') => {
    // 模擬網路延遲
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 接受 "123456" 作為有效驗證碼
    if (otp === '123456') {
      // 嘗試從註冊資料載入用戶資訊
      const registrationData = localStorage.getItem('registrationData');
      let mockUser: User;
      
      if (registrationData) {
        const userData = JSON.parse(registrationData);
        mockUser = {
          id: 'user-' + Date.now(),
          email: userData.email,
          phone: userData.phone,
          farm_name: userData.farm_name,
          contact_person: userData.contact_person,
          is_verified: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      } else {
        // 如果沒有註冊資料，創建基本用戶
        mockUser = {
          id: 'user-' + Date.now(),
          email: method === 'email' ? identifier : 'unknown@example.com',
          phone: method === 'phone' ? identifier : '0000000000',
          farm_name: '測試農場',
          contact_person: '測試用戶',
          is_verified: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      }
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      
      console.log(`模擬 ${method === 'email' ? 'Email' : 'SMS'} 登入成功:`, mockUser);
      return Promise.resolve();
    } else {
      throw new Error('驗證碼錯誤，請輸入 123456');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    verifyOTP,
    logout,
    isAuthenticated: !!user,
  };

  return React.createElement(
    AuthContext.Provider,
    { value },
    children
  );
}; 