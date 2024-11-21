import React, { useState } from 'react';
import { searchUser } from './api';  // Import the searchUser function

const RequestBloodForm = () => {
    const [bloodGroup, setBloodGroup] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  // To hold error message
    const [userData, setUserData] = useState([]);  // To hold user data if found

    const handleSearch = async (e) => {
        e.preventDefault();
        
        // Clear previous error messages
        setErrorMessage('');
        setUserData([]);  // Reset user data on new search

        try {
            // Call the API with the address and selected blood type
            const result = await searchUser(address, bloodGroup); // Use address and bloodGroup
            setUserData(result); // Store user data if found
        } catch (error) {
            // Handle error (No users found)
            setErrorMessage('No users found with the given criteria.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Search for Blood Donors</h2>
            <form onSubmit={handleSearch}>
                <div className="mb-4">
                    <label className="block text-lg font-medium">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 mt-1 border rounded"
                        placeholder="Enter address"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium">Blood Type</label>
                    <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full p-2 mt-1 border rounded"
                    >
                        <option value="">Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            {/* Display any error messages */}
            {errorMessage && (
                <div className="mt-4 text-red-500">{errorMessage}</div>
            )}

            {/* Display user data as cards if found */}
            {userData.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userData.map((user, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-4"
                        >
                            <h3 className="text-xl font-semibold">{user.userName}</h3>
                            <p className="text-gray-700">Phone: {user.phoneNumber}</p>
                            <p className="text-gray-500">Blood Type: {user.bloodType}</p>
                            <p className="text-gray-500">Address: {user.address}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RequestBloodForm;
