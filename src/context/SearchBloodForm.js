import React, { useState } from 'react';
import { getRequestsByLocation } from './api'; // Import the API function
import { requestBlood } from './api'; // Import the requestBlood API function

const SearchBloodForm = () => {
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [results, setResults] = useState([]);
    const [requestError, setRequestError] = useState('');
    const [requestSuccess, setRequestSuccess] = useState('');
    const [bloodTypes, setBloodTypes] = useState({});

    // Blood types dropdown options
    const bloodTypeOptions = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResults([]);

        if (!location) {
            setError('Please enter a location.');
            return;
        }

        try {
            const response = await getRequestsByLocation(location);
            if (response.data && response.data.length > 0) {
                setResults(response.data);
            } else {
                setError('No blood requests found for the specified location.');
            }
        } catch (error) {
            console.error('Error fetching blood requests:', error);
            setError('Failed to fetch blood requests. Please try again later.');
        }
    };

    const handleRequestBlood = async (bbName, bloodType, requestId) => {
        const userName = sessionStorage.getItem('userName');
        const phoneNumber = sessionStorage.getItem('phoneNumber');

        if (!userName || !phoneNumber || !bbName || !bloodType) {
            setRequestError('Please log in and select all required fields.');
            return;
        }

        const requestDetails = {
            userName,
            phoneNumber,
            rBloodType: bloodType,
            bbName
        };

        try {
            const response = await requestBlood(requestDetails); // Call the API function
            if (response.status === 200) {
                setRequestSuccess('Blood request successful!');
                setTimeout(() => {
                    setRequestSuccess('');
                }, 3000); // Hide success message after 3 seconds
                setBloodTypes(prevState => ({
                    ...prevState,
                    [requestId]: bloodType // Update the selected blood type for the specific request
                }));
            } else {
                setRequestError('Failed to request blood. Please try again.');
            }
        } catch (error) {
            console.error('Error during blood request:', error);
            setRequestError('Failed to request blood. Please try again later.');
        }
    };

    const handleBloodTypeChange = (e, requestId) => {
        const selectedBloodType = e.target.value;
        setBloodTypes(prevState => ({
            ...prevState,
            [requestId]: selectedBloodType // Store selected blood type for the specific request card
        }));
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Search Blood by Location</h2>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-lg font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter location"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Search Blood
                </button>
            </form>

            {results.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Blood Bank Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {results.map((request) => (
                            <div
                                key={request.id}
                                className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
                            >
                                <h4 className="text-xl font-semibold text-blue-700 mb-2">{request.bbName}</h4>
                                <p className="text-gray-700">
                                    <span className="font-medium">Email:</span> {request.email}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">Address:</span> {request.address}
                                </p>
                                {/* Blood Type Dropdown */}
                                <div className="mb-4">
                                    <label className="block text-lg font-medium text-gray-700">Select Blood Type</label>
                                    <select
                                        value={bloodTypes[request.id] || ''}
                                        onChange={(e) => handleBloodTypeChange(e, request.id)}
                                        className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">Select Blood Type</option>
                                        {bloodTypeOptions.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Request Blood Button */}
                                <button
                                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                                    onClick={() => handleRequestBlood(request.bbName, bloodTypes[request.id], request.id)}
                                    disabled={!bloodTypes[request.id]} // Disable the button if no blood type is selected
                                >
                                    Request Blood
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {requestError && <p className="text-red-600 text-center mt-4">{requestError}</p>}
            {requestSuccess && <p className="text-green-600 text-center mt-4">{requestSuccess}</p>}
        </div>
    );
};

export default SearchBloodForm;
