// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Home from './routes/Home';
import Receipt from './context/Receipt'; // Import Receipt component
import UserDashboard from './routes/UserDashboard';
import UserLogin from './routes/UserLogin';
import Register from './routes/Register';

const PaymentProtectedRoute = ({ element }) => {
    const { isPaymentSuccessful } = useAuth();
    return isPaymentSuccessful ? element : <Navigate to="/dashboard" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/user-dashboard" element={<PrivateRoute element={<UserDashboard />} />} />
                    <Route path="/receipt" element={<PaymentProtectedRoute element={<Receipt />} />} /> {/* Protect Receipt route */}
                    <Route path="/user-dashboard" element={<PrivateRoute element={<UserDashboard />} />}/>
                    <Route path="/user-login" element={<UserLogin />} />
                    <Route path="/user-register" element={<Register />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
