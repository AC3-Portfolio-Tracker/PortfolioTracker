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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect to handle auth state changes
  useEffect(() => {
    // Get the current session when the provider loads
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (session?.user) {
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError) throw userError;
          
          setUser(userData.user);
          setIsAuthenticated(true);
          
          const { data: profileData, error: profileError } = await profiles.getProfile(session.user.id);
          
          if (profileError) {
            console.error('Error fetching profile during init:', profileError);
            // Potentially set profile to a default or null, and set an error state
            setProfile(null); 
          } else {
            setProfile(profileData);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
          setProfile(null);
        }
      } catch (err) {
        console.error('Error during initial authentication:', err);
        setError(err);
        setUser(null);
        setIsAuthenticated(false);
        setProfile(null); // Ensure profile is cleared on error during init
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Refactored to avoid direct async callback and potential deadlocks
        // All Supabase calls are dispatched after the main callback finishes
        setTimeout(async () => {
          try {
            if (event === 'INITIAL_SESSION') {
              // setLoading(true); // initializeAuth will handle this
              await initializeAuth(); 
            } else if (event === 'SIGNED_IN' && session?.user) {
              setLoading(true);
              const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
              if (userError) throw userError;
              
              setUser(authUser);
              setIsAuthenticated(true);
              
              const { data: profileData, error: profileError } = await profiles.getProfile(session.user.id);
              if (profileError) {
                console.error('Error fetching profile on SIGNED_IN:', profileError);
                setProfile(null); 
              } else {
                setProfile(profileData);
              }
              setLoading(false);
            } else if (event === 'USER_UPDATED' && session?.user) {
              setLoading(true);
              const { data: { user: updatedAuthUser }, error: userError } = await supabase.auth.getUser();
              if (userError) throw userError;

              setUser(updatedAuthUser);
              setIsAuthenticated(true);
              
              // Fetch profile from 'profiles' table first
              const { data: profileData, error: profileError } = await profiles.getProfile(session.user.id);
              if (profileError) {
                console.error('Error fetching profile on USER_UPDATED:', profileError, 'User:', updatedAuthUser);
                // Fallback to user_metadata if profile fetch fails
                if (updatedAuthUser?.user_metadata && (updatedAuthUser.user_metadata.first_name || updatedAuthUser.user_metadata.last_name)) {
                  console.log('Falling back to user_metadata for profile on USER_UPDATED');
                  setProfile({
                    id: session.user.id,
                    email: session.user.email,
                    first_name: updatedAuthUser.user_metadata.first_name,
                    last_name: updatedAuthUser.user_metadata.last_name,
                    avatar_url: updatedAuthUser.user_metadata.avatar_url,
                    // Ensure all relevant fields from 'profiles' are here or handled
                  });
                } else {
                  // If no profile and no metadata, consider setting profile to null or keeping existing
                  // setProfile(null); // Or handle as per application logic
                }
              } else {
                setProfile(profileData);
              }
              setLoading(false);
            } else if (event === 'TOKEN_REFRESHED' || event === 'PASSWORD_RECOVERY') {
              if (session?.user) {
                const { data: { user: refreshedUser }, error: userError } = await supabase.auth.getUser();
                if (userError) {
                  console.error('Error fetching user on TOKEN_REFRESHED/PASSWORD_RECOVERY:', userError);
                } else {
                  setUser(refreshedUser);
                  setIsAuthenticated(true); 
                }
              }
            }
          } catch (err) {
            console.error('Error in onAuthStateChange (async part):', err);
            setUser(null);
            setIsAuthenticated(false);
            setProfile(null);
            setError(err);
            setLoading(false); // Ensure loading is false on error
          } 
        }, 0);

        // Synchronous part of the callback (e.g., for SIGNED_OUT)
        if (event === 'SIGNED_OUT') {
          setLoading(true);
          setUser(null);
          setIsAuthenticated(false);
          setProfile(null);
          setLoading(false);
        }
      }
    );

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Tab is visible, re-initializing auth.');
        initializeAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup subscription and event listener on unmount
    return () => {
      subscription?.unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

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

  // Sign in with Google function
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabaseAuth.signInWithGoogle();
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
      setIsAuthenticated(false);
      setProfile(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Update profile function
  const updateProfile = async (userId, rawUpdates) => {
    setLoading(true);
    setError(null);
    const updates = rawUpdates || {}; // Ensure updates is an object

    try {
      // Update Supabase Auth user (auth.users table)
      // Ensure 'data' field in updates is correctly structured for supabase.auth.updateUser
      const { data: authUser, error: authError } = await supabase.auth.updateUser({
        data: { 
          first_name: updates.first_name, 
          last_name: updates.last_name,
          // any other metadata fields you want to update in auth.users.user_metadata
        }
      });

      if (authError) {
        console.error('Error updating Supabase auth user:', authError);
        throw authError;
      }

      // Update the public.profiles table
      const { data: profileData, error: profileError } = await profiles.updateProfile(userId, updates);

      if (profileError) {
        console.error('Error updating profile table:', profileError);
        // Decide if you want to throw or just log and continue with authUser data
        // For now, we'll prioritize the profile table update for the local state
        // but this depends on application requirements.
        throw profileError; 
      }

      // If profileData is what you expect for local state, use it.
      // Otherwise, you might want to merge or use authUser.user for local state.
      setProfile(profileData); // This should be the data from 'profiles' table
      setUser(authUser.user); // Update local user state with the response from supabase.auth.updateUser
      setIsAuthenticated(true);

      return { authUser, profileData };
    } catch (err) {
      console.error('Error in updateProfile:', err);
      setError(err);
      // Potentially revert optimistic updates or handle UI feedback
      throw err;
    } finally {
      setLoading(false);
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
    signInWithGoogle,
    signOut,
    updateProfile,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;