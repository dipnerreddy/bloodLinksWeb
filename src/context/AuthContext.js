// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // New state for payment success

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isPaymentSuccessful, setIsPaymentSuccessful }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
