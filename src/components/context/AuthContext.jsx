import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    try {
      const storedUserType = localStorage.getItem('userType');
      
      if (storedUserType === 'admin') {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
          setUserType('admin');
        }
      } else if (storedUserType === 'client') {
        const token = localStorage.getItem('clientToken');
        const clientData = localStorage.getItem('clientData');
        
        if (token && clientData) {
          setUser(JSON.parse(clientData));
          setUserType('client');
        }
      } else if (storedUserType === 'agent') {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        if (token && userData) {
          setUser(JSON.parse(userData));
          setUserType('agent');
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, type) => {
    setUser(userData);
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    
    // Clear all auth data
    localStorage.removeItem('token');
    localStorage.removeItem('clientToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('clientData');
    localStorage.removeItem('userType');
    
    navigate('/');
  };

  const isAuthenticated = () => {
    return user !== null && userType !== null;
  };

  const isAdmin = () => {
    return userType === 'admin' && user?.role === 'admin';
  };

  const isAgent = () => {
    return userType === 'agent' && user?.role === 'agent';
  };

  const isClient = () => {
    return userType === 'client';
  };

  const isAdminOrAgent = () => {
    return userType === 'admin' && (user?.role === 'admin' || user?.role === 'agent');
  };

  const getUserDisplayName = () => {
    if (!user) return '';
    
    if (userType === 'client') {
      return user.name || user.email;
    } else {
      return user.username || user.email;
    }
  };

  const getUserRole = () => {
    if (!user) return '';
    
    if (userType === 'client') {
      return 'Client';
    } else {
      return user.role === 'admin' ? 'Super Admin' : 'Agent';
    }
  };

  const getDashboardPath = () => {
    if (!user || !userType) return '/';
    
    if (userType === 'client') {
      return '/client-dashboard';
    } else if (user.role === 'admin') {
      return '/admin-dashboard';
    } else if (user.role === 'agent') {
      return '/agent-dashboard';
    }
    
    return '/';
  };

  const value = {
    user,
    userType,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    isAgent,
    isClient,
    isAdminOrAgent,
    getUserDisplayName,
    getUserRole,
    getDashboardPath
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 