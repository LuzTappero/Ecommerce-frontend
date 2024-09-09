import React, { useContext } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();


    return (
        isAuthenticated ? (
            <Component {...rest}  />
        ) : (
            <Navigate to="/access-denied" state={{ from: location }} />
        )
    );
};
export default ProtectedRoute;
