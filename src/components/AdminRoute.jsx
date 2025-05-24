import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * AdminRoute component that redirects non-admin users to the home page
 * This is used to protect admin-only routes
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  // If auth is still loading, show nothing
  if (loading) {
    return null;
  }
  
  // Check if the user is authenticated and has admin role
  const isAdmin = isAuthenticated && user?.role === 'admin';
  
  // If user is not an admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }
  
  // Otherwise, render the protected admin component
  return children;
};

export default AdminRoute; 