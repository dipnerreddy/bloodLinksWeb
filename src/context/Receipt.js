import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Receipt = () => {
    const { state } = useLocation();
    const { paymentDetails, date } = state;
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
                <h2 className="text-3xl font-bold text-center mb-6 border-b-2 border-gray-400 pb-2">Payment Receipt</h2>
                <p className="text-sm text-gray-600 mb-2"><strong>Date:</strong> {date}</p>
                <div className="border-b border-gray-400 mb-4"></div>
                <div className="grid grid-cols-2 mb-2">
                    <p className="text-sm text-gray-700"><strong>BID:</strong></p>
                    <p className="text-sm text-gray-700 text-right">{paymentDetails.bid}</p>
                    <p className="text-sm text-gray-700"><strong>Patient Name:</strong></p>
                    <p className="text-sm text-gray-700 text-right">{paymentDetails.patientName}</p>
                    <p className="text-sm text-gray-700"><strong>Patient Number:</strong></p>
                    <p className="text-sm text-gray-700 text-right">{paymentDetails.patientNumber}</p>
                    <p className="text-sm text-gray-700"><strong>Blood Bank Name:</strong></p>
                    <p className="text-sm text-gray-700 text-right">{paymentDetails.bbName}</p>
                    <p className="text-sm text-gray-700"><strong>Blood Type:</strong></p>
                    <p className="text-sm text-gray-700 text-right">{paymentDetails.bloodType}</p>
                </div>
                <div className="border-b border-gray-400 my-4"></div>
                <div className="grid grid-cols-2 mb-2">
                    <p className="text-lg font-bold text-gray-800">Total Amount:</p>
                    <p className="text-lg font-bold text-gray-800 text-right">${paymentDetails.amount}</p>
                </div>
                <div className="flex justify-between mt-6">
                    <button 
                        onClick={() => navigate('/dashboard')} // Navigate to dashboard
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Back to Dashboard
                    </button>
                    <button 
                        onClick={() => window.print()} 
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Receipt;
