import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import { userlogin } from '../context/api'; // Import the API function

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Access login function from context

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await userlogin({ email, password }); // Use userlogin from api.js
            const { bbName } = response.data; // Assuming bbName is in the response

            // Store the blood bank name in session storage
            sessionStorage.setItem('bbName', bbName);

            // Call login function to update authentication state
            login();
            navigate('/dashboard'); // Redirect to the dashboard on success
        } catch (error) {
            console.error('Error during login:', error);
            // Show error message from the server if available, otherwise show a generic error
            alert(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-red-700 rounded hover:bg-red-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
