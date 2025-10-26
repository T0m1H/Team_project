import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';
import firebase from 'firebase/compat/app';

interface AuthContextType {
  currentUser: firebase.User | null;
  loading: boolean;
}

//A centralized system (using React Context) to manage the user's login status across the entire application.

// Create the React Context with a default value.
// This is what components get if they try to use the context
// without a matching <AuthProvider> above them in the tree.
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

// Create a custom hook for easy access to the context.
// Components can just call `useAuth()` instead of `useContext(AuthContext)`.
export function useAuth() {
  return useContext(AuthContext);
}

// Define the AuthProvider component.
// It will wrap the parts of the app that need access to the auth state.
// 'children' refers to all the components nested inside the provider.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  // This useEffect hook runs once when the AuthProvider is first mounted
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

  // Provide the 'value' (currentUser and loading) to all 'children'.
  // We only render the 'children' *after* the initial loading is false.
  // This prevents the app from flickering or showing the wrong page
  // while Firebase is checking the user's login status
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};