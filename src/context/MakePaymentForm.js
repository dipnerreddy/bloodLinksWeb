// src/components/MakePaymentForm.js
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { addPayment } from '../context/api'; // Import your API call function
import { useAuth } from '../context/AuthContext'; // Import AuthContext

const MakePaymentForm = ({ onPay }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const { setIsPaymentSuccessful } = useAuth(); // Get the function to set payment success
    const [paymentDetails, setPaymentDetails] = useState({
        patientName: '',
        patientNumber: '',
        bid: '',
        bloodType: '',
        amount: '',
        bbName: sessionStorage.getItem('bbName') || '',
    });
    const [showQrScanner, setShowQrScanner] = useState(false);
    const [qrError, setQrError] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' }); // Notification state

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addPayment(paymentDetails);
            console.log("Payment Response:", response);
            if (response.status === 200) {
                showNotification("Payment processed successfully!", "success"); // Show success notification
                onPay(paymentDetails);
                resetForm();

                // Set payment success in AuthContext
                setIsPaymentSuccessful(true);

                // Navigate to the Receipt page
                const date = new Date().toLocaleDateString(); // Get the current date
                navigate('/receipt', { state: { paymentDetails, date } }); // Pass payment details and date
            } else {
                showNotification("Failed to process payment. Please check your details.", "error"); // Show error notification
            }
        } catch (error) {
            console.error("Payment error:", error);
            showNotification("An error occurred while processing the payment.", "error"); // Show error notification
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: '', type: '' }); // Clear notification after 3 seconds
        }, 3000);
    };

    const resetForm = () => {
        setPaymentDetails({
            patientName: '',
            patientNumber: '',
            bid: '',
            bloodType: '',
            amount: '',
            bbName: sessionStorage.getItem('bbName') || '',
        });
    };

    const handleScan = (data) => {
        if (data) {
            try {
                const parsedData = JSON.parse(data.text);
                if (parsedData.bid && parsedData.bloodType) {
                    setPaymentDetails({
                        ...paymentDetails,
                        bid: parsedData.bid,
                        bloodType: parsedData.bloodType,
                    });
                    setQrError(null);
                    setShowQrScanner(false);
                } else {
                    setQrError("Invalid QR code data");
                }
            } catch (error) {
                setQrError("Error parsing QR code data");
            }
        }
    };

    const handleError = (err) => {
        console.error("QR Scanner Error:", err.message);
        setQrError(err.message);
    };

    return (
        <div>
            {notification.message && (
                <div className={`p-4 mb-4 text-white rounded ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {notification.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-semibold mb-4">Make Payment</h2>
                <div className="mb-4">
                    <label className="block mb-2">Patient Name</label>
                    <input
                        type="text"
                        value={paymentDetails.patientName}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, patientName: e.target.value })}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Patient Number</label>
                    <input
                        type="tel"
                        value={paymentDetails.patientNumber}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, patientNumber: e.target.value })}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Amount</label>
                    <input
                        type="number"
                        value={paymentDetails.amount}
                        onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">BID</label>
                    <input
                        type="text"
                        value={paymentDetails.bid}
                        readOnly
                        className="w-full px-3 py-2 border rounded bg-gray-200"
                    />
                </div>
                
                <div className="flex space-x-2 mt-4">
                    <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Make Payment
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setShowQrScanner(!showQrScanner)} 
                        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        {showQrScanner ? 'Hide QR Scanner' : 'Scan QR'}
                    </button>
                </div>
            </form>

            {showQrScanner && (
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">Scan QR Code</h2>
                    <QrScanner
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />
                    {qrError && <p className="text-red-500">{qrError}</p>}
                </div>
            )}
        </div>
    );
};

export default MakePaymentForm;
