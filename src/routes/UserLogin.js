import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../context/api'; // Import the login API function
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const UserLogin = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login: authenticateUser } = useAuth(); // Use login method from AuthContext

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting login...");

        try {
            const response = await login({ phoneNumber, password }); 
            console.log("Login successful:", response.data);

            // Set session variable and update authentication status in context
            authenticateUser();
            navigate('/user-dashboard'); // Redirect to user dashboard
        } catch (error) {
            console.error("Error during login:", error);
            setMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    const handleAdminLogin = () => {
        navigate('/login'); // Redirect to admin login
    };

    const handleRegister = () => {
        navigate('/user-register'); // Redirect to registration page
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password'); // Redirect to forgot password page
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
                            <input
                                type="password"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Login
                        </button>
                    </form>
                    {message && <p className="text-red-500 text-center mt-4">{message}</p>}
                    
                    <div className="text-center mt-4">
                        <button className="text-indigo-600 hover:underline" onClick={handleRegister}>
                            Register
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <button className="text-indigo-600 hover:underline" onClick={handleForgotPassword}>
                            Forgot Password?
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <button className="text-indigo-600 hover:underline " onClick={handleAdminLogin}>
                           Administrator?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
