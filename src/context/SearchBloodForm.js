import React, { useState } from 'react';
import { getRequestsByLocation } from './api'; // Import the API function

const SearchBloodForm = () => {
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResults([]);
        
        if (!location) {
            setError('Please enter a location.');
            return;
        }

        try {
            const response = await getRequestsByLocation(location); // Call API with the user-entered location
            if (response.data && response.data.length > 0) {
                setResults(response.data); // Set results to be displayed
            } else {
                setError('No blood requests found for the specified location.');
            }
        } catch (error) {
            console.error('Error fetching blood requests:', error);
            setError('Failed to fetch blood requests. Please try again later.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Search Blood by Location</h2>
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-lg font-medium">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-2 mt-1 border rounded"
                        placeholder="Enter location"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Search Blood
                </button>
            </form>

            {results.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Blood Bank Results</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {results.map((request) => (
                            <div
                                key={request.id}
                                className="border p-4 rounded shadow-md bg-white"
                            >
                                <p><strong>Blood Bank Name:</strong> {request.bbName}</p>
                                <p><strong>Email:</strong> {request.email}</p>
                                <p><strong>Address:</strong> {request.address}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBloodForm;
