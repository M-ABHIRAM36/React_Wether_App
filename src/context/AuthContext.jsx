import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('weatherAppUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        // Simple validation for demo purposes
        if (email && password) {
          const userData = {
            id: Date.now(),
            email,
            name: email.split('@')[0],
            loginTime: new Date().toISOString()
          };
          setUser(userData);
          localStorage.setItem('weatherAppUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const userData = {
            id: Date.now(),
            email,
            name,
            loginTime: new Date().toISOString()
          };
          setUser(userData);
          localStorage.setItem('weatherAppUser', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Please fill all fields'));
        }
      }, 1000);
    });
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('weatherAppUser', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('weatherAppUser');
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    updateUser,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
