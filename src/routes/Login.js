// src/routes/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the Auth context

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Access login function from context

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const loginApiUrl = 'http://localhost:8080/api/bloodBank/login'; // Hard-coded URL
        const loginApiUrl = 'https://bloodlinksbn-eqaganhye2c7afep.centralindia-01.azurewebsites.net/api/bloodBank/login'; // Hard-coded URL

        try {
            const response = await fetch(loginApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // JSON body with email and password
            });

            const data = await response.json(); // Get the response body as JSON

            if (response.status === 200) {
                // Assuming the response contains a bbName field
                const { bbName } = data; // Extract the blood bank name from the response

                // Store the blood bank name in session storage
                sessionStorage.setItem('bbName', bbName);

                // Call login function to update authentication state
                login();
                navigate('/dashboard'); // Redirect to the dashboard on success
            } else {
                alert(data.message); // Handle login failure using message from JSON
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login: ' + error.message);
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
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
