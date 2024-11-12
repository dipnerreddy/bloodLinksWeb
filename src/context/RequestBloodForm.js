import React, { useState } from 'react';

const RequestBloodForm = ({ onRequest }) => {
    const [bloodGroup, setBloodGroup] = useState('');
    const [quantity, setQuantity] = useState(1); // Default quantity is 1
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestDetails = { bloodGroup, quantity, reason };
        onRequest(requestDetails);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Request Blood</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-lg font-medium">Blood Group</label>
                    <input
                        type="text"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full p-2 mt-1 border rounded"
                        placeholder="Enter blood group (e.g., A+, O-)"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium">Quantity (in units)</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full p-2 mt-1 border rounded"
                        placeholder="Enter quantity"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium">Reason</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full p-2 mt-1 border rounded"
                        placeholder="Enter reason for requesting blood"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Request Blood
                </button>
            </form>
        </div>
    );
};

export default RequestBloodForm;
