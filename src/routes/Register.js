import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../context/api'; // Import the register API function

const Register = () => {
    const [userName, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== rePassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await register({ userName, phoneNumber, password, rePassword });
            console.log('Registration successful:', response.data);
            setMessage('Registration successful. Please login.');
            navigate('/'); // Redirect to login page
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                value={userName}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
                            <input
                                type="password"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password:</label>
                            <input
                                type="password"
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-600">
                            Register
                        </button>
                    </form>
                    {message && <p className="text-red-500 text-center mt-4">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Register;
