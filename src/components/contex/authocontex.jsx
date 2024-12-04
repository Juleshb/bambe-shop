import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  });

  useEffect(() => {
    if (authData) {
      localStorage.setItem('token', authData.token);
    } else {
      localStorage.removeItem('token');
    }
  }, [authData]);

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};