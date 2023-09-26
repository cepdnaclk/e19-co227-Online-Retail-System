// AuthRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function AuthRoute({ isAuthenticated, redirectTo, children, ...rest }) {
    return (
        <Route
            {...rest}
            element={isAuthenticated ? children : <Navigate to={redirectTo} />}
        />
    );
}

export default AuthRoute;
