// src/components/ProtectedRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      element={token ? <Element /> : <Navigate to="/signIn" replace />}
    />
  );
};

export default ProtectedRoute;
