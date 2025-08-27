import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ element }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
