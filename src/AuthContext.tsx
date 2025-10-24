// src/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import firebase from 'firebase/compat/app';

interface AuthContextType {
  currentUser: firebase.User | null;
  loading: boolean;
}


const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});


export function useAuth() {
  return useContext(AuthContext);
}


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: firebase.User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};