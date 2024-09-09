import React from 'react';
import './accessDenied.css'

const AccessDenied = () => {
    return (
        <div className="access-denied">
            <h1>Access Denied</h1>
            <p>You do not have permission to view this page.</p>
            <a href="/auth" className="btn-go-auth">GO AUTH SECTION</a>
        </div>
    );
};

export default AccessDenied;