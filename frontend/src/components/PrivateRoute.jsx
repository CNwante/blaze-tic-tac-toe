// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated by looking for a token in localStorage
  const token = localStorage.getItem('token');

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If a token is found, render the children components (i.e., the protected route)
  return children;
};

export default PrivateRoute;
