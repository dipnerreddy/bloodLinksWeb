import React, { useEffect, useState, useCallback } from 'react';
import { getUserRequests, deleteUserRequest } from '../context/api';

const RequestsForm = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const bbName = sessionStorage.getItem('bbName') || '';

    const fetchRequests = useCallback(async () => {
        if (!bbName) {
            setError("Blood bank name is not set.");
            setLoading(false);
            return;
        }

        try {
            const response = await getUserRequests(bbName);
            setRequests(response.data);
        } catch (err) {
            console.error("Error fetching requests:", err);
            setError("Failed to fetch requests. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [bbName]);

    useEffect(() => {
        fetchRequests(); // Initial fetch on component mount
    }, [fetchRequests]); // Updated dependency array

    const handleAccept = async (requestId) => {
        console.log(`Request ${requestId} accepted`);

        try {
            await deleteUserRequest(requestId);
            fetchRequests();
        } catch (err) {
            console.error("Error accepting request:", err);
        }
    };

    const handleDecline = async (requestId) => {
        console.log(`Request ${requestId} declined`);

        try {
            await deleteUserRequest(requestId);
            fetchRequests();
        } catch (err) {
            console.error("Error declining request:", err);
        }
    };

    const handleRefresh = () => {
        setLoading(true);
        fetchRequests();
    };

    if (loading) {
        return <div>Loading requests...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="requests-form">
            <h2 className="text-2xl font-semibold mb-4">Requests for {bbName}</h2>
            <button
                onClick={handleRefresh}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600"
            >
                Refresh
            </button>
            {requests.length > 0 ? (
                <div className="flex flex-col gap-4">
                    <div
                        className="overflow-y-auto"
                        style={{ maxHeight: '400px' }}
                    >
                        {requests.map((request) => (
                            <div
                                key={request.id}
                                className="bg-white shadow-md rounded-lg border border-gray-200 p-4 mb-4"
                                style={{ height: '200px' }}
                            >
                                <div className="font-bold text-lg mb-2">{request.userName}</div>
                                <div className="text-gray-700 mb-1"><strong>Phone Number:</strong> {request.phoneNumber}</div>
                                <div className="text-gray-700 mb-1"><strong>Requested Blood Type:</strong> {request.rBloodType}</div>
                                <div className="text-gray-700"><strong>Blood Bank Name:</strong> {request.bbName}</div>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={() => handleAccept(request.id)}
                                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleDecline(request.id)}
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No requests available.</p>
            )}
        </div>
    );
};

export default RequestsForm;
