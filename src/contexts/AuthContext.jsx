import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase, auth as supabaseAuth, profiles } from '../lib/supabase';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to handle auth state changes
  useEffect(() => {
    // Get the current session when the provider loads
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // Get the current session
        const { data: { session } } = await supabaseAuth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          
          // Fetch the user profile
          const { data: profileData, error: profileError } = await profiles.getProfile(session.user.id);
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          } else {
            setProfile(profileData);
          }
        }
      } catch (err) {
        console.error('Error during authentication:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          
          // Fetch the user profile
          const { data: profileData } = await profiles.getProfile(session.user.id);
          setProfile(profileData);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
        } else if (event === 'USER_UPDATED' && session?.user) {
          setUser(session.user);
          
          // Update the profile as well
          const { data: profileData } = await profiles.getProfile(session.user.id);
          setProfile(profileData);
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (email, password, userData) => {
    try {
      const { data, error } = await supabaseAuth.signUp(email, password, userData);
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabaseAuth.signIn(email, password);
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabaseAuth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Update profile function
  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // If we're updating the auth user data
      if (updates.email || updates.password) {
        const authUpdates = {};
        if (updates.email) authUpdates.email = updates.email;
        if (updates.password) authUpdates.password = updates.password;
        
        const { data, error } = await supabaseAuth.updateProfile(authUpdates);
        if (error) throw error;
      }
      
      // Updates for the profile table
      const profileUpdates = { ...updates };
      delete profileUpdates.email;
      delete profileUpdates.password;
      
      if (Object.keys(profileUpdates).length > 0) {
        const { data, error } = await profiles.updateProfile(user.id, profileUpdates);
        if (error) throw error;
        
        // Update the local profile state
        setProfile(prev => ({ ...prev, ...profileUpdates }));
      }
      
      return true;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Context value
  const value = {
    user,
    profile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext; 