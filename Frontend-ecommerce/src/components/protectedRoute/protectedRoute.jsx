import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const location = useLocation();
    return (
        isAuthenticated && user ? (
            <Component {...rest}  />
        ) : (
            <Navigate to="/access-denied" state={{ from: location }} />
        )
    );
};
export default ProtectedRoute;
