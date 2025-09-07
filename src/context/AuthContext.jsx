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
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('weatherAppUser');
    const savedUsers = localStorage.getItem('weatherAppUsers');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedUsers) {
      try {
        setRegisteredUsers(JSON.parse(savedUsers));
      } catch {
        setRegisteredUsers([]);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        const normalizedEmail = (email || '').trim().toLowerCase();
        const normalizedPassword = (password || '').trim();
        if (!normalizedEmail || !normalizedPassword) {
          reject(new Error('Invalid credentials'));
          return;
        }

        const existing = registeredUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
        if (!existing) {
          reject(new Error('User not found. Please sign up.'));
          return;
        }
        if (existing.password !== normalizedPassword) {
          reject(new Error('Incorrect password'));
          return;
        }

        const userData = {
          id: existing.id,
          email: existing.email,
          name: existing.name,
          loginTime: new Date().toISOString()
        };
        setUser(userData);
        localStorage.setItem('weatherAppUser', JSON.stringify(userData));
        resolve(userData);
      }, 1000);
    });
  };

  const signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const trimmedName = (name || '').trim();
        const normalizedEmail = (email || '').trim().toLowerCase();
        const normalizedPassword = (password || '').trim();
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const nameRegex = /^[A-Za-z][A-Za-z\s.'-]{1,48}$/;

        if (!trimmedName || !normalizedEmail || !normalizedPassword) {
          reject(new Error('Please fill all fields'));
          return;
        }

        if (!nameRegex.test(trimmedName)) {
          reject(new Error('Enter a valid full name'));
          return;
        }

        if (!emailRegex.test(normalizedEmail)) {
          reject(new Error('Enter a valid email address'));
          return;
        }
        const localPart = normalizedEmail.split('@')[0];
        if (!/[A-Za-z]/.test(localPart)) {
          reject(new Error('Email must include letters before @'));
          return;
        }
        if (normalizedPassword.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }

        const existing = registeredUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
        if (existing) {
          reject(new Error('Email already registered'));
          return;
        }

        const newUser = {
          id: Date.now(),
          name: trimmedName,
          email: normalizedEmail,
          password: normalizedPassword,
        };
        const nextUsers = [...registeredUsers, newUser];
        setRegisteredUsers(nextUsers);
        localStorage.setItem('weatherAppUsers', JSON.stringify(nextUsers));

        const userData = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          loginTime: new Date().toISOString()
        };
        setUser(userData);
        localStorage.setItem('weatherAppUser', JSON.stringify(userData));
        resolve(userData);
      }, 1000);
    });
  };

  const updateUser = (updatedData) => {
    // Prevent email changes after signup for data integrity
    const { email: _ignoredEmail, ...rest } = updatedData || {};
    const updatedUser = { ...user, ...rest };
    setUser(updatedUser);
    localStorage.setItem('weatherAppUser', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('weatherAppUser');
  };

  const changePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      const trimmedCurrent = (currentPassword || '').trim();
      const trimmedNew = (newPassword || '').trim();
      if (!user) {
        reject(new Error('Not authenticated'));
        return;
      }
      if (!trimmedCurrent || !trimmedNew) {
        reject(new Error('Please provide all fields'));
        return;
      }
      if (trimmedNew.length < 6) {
        reject(new Error('New password must be at least 6 characters'));
        return;
      }

      // Find the registered user matching the current session user
      const index = registeredUsers.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
      if (index === -1) {
        reject(new Error('User not found'));
        return;
      }
      if (registeredUsers[index].password !== trimmedCurrent) {
        reject(new Error('Current password is incorrect'));
        return;
      }

      const updatedUsers = [...registeredUsers];
      updatedUsers[index] = { ...updatedUsers[index], password: trimmedNew };
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('weatherAppUsers', JSON.stringify(updatedUsers));
      resolve(true);
    });
  };

  const value = {
    user,
    isLoading,
    login,
    signup,
    updateUser,
    logout,
    changePassword,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
