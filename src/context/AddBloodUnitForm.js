import React, { useState, useEffect } from 'react';
import { addBloodUnit } from '../context/api';
import QrScanner from 'react-qr-scanner';

const AddBloodUnitForm = ({ onAdd }) => {
    const [bloodType, setBloodType] = useState('');
    const [bid, setBid] = useState('');
    const [quantity] = useState(1); // Fixed quantity
    const [expirationDate, setExpirationDate] = useState('');
    const [qrError, setQrError] = useState(null);
    const [showQrScanner, setShowQrScanner] = useState(false); // State to control QR scanner visibility
    const [notification, setNotification] = useState({ message: '', type: '' }); // Notification state

    useEffect(() => {
        const today = new Date();
        const expiry = new Date(today.setDate(today.getDate() + 15));
        setExpirationDate(expiry.toISOString().split('T')[0]);
    }, []);

    const handleSubmit = async (bloodUnit) => {
        try {
            console.log("Submitting blood unit:", bloodUnit); // Log the data being submitted
            const response = await addBloodUnit(bloodUnit);
            if (response.status === 200) {
                console.log("Successfully added blood unit:", response.data); // Log the response data
                onAdd(bloodUnit);
                clearForm(); // Clear form fields
                showNotification("Blood unit added successfully!", "success"); // Show success notification
            } else if (response.status === 400) {
                console.error("Failed to add blood unit:", response.status);
                showNotification("Invalid submission. Please check your input.", "error"); // Show error notification
                clearForm(); // Clear the form fields
            }
        } catch (error) {
            console.error('Error adding blood unit:', error);
            showNotification("Invalid submission. Please check your input BID.", "error"); // Show error notification
            clearForm(); // Clear the form fields
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: '', type: '' }); // Clear notification after 3 seconds
        }, 3000);
    };

    const clearForm = () => {
        setBloodType('');
        setBid('');
    };

    const handleScan = (data) => {
        if (data) {
            try {
                const parsedData = JSON.parse(data.text);
                if (parsedData.bid && parsedData.bloodType) {
                    setBid(parsedData.bid);
                    setBloodType(parsedData.bloodType);
                    setQrError(null);
                    setShowQrScanner(false); // Close scanner after successful scan

                    // Create blood unit object directly here
                    const bbName = sessionStorage.getItem('bbName');
                    const bloodUnit = {
                        bloodType: parsedData.bloodType,
                        bid: parsedData.bid,
                        bbName,
                        quantity,
                        expirationDate,
                    };
                    handleSubmit(bloodUnit); // Call handleSubmit with bloodUnit data
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

            <form onSubmit={(e) => {
                e.preventDefault();
                const bbName = sessionStorage.getItem('bbName');
                const bloodUnit = { bloodType, bid, bbName, quantity, expirationDate };
                handleSubmit(bloodUnit);
            }} className="bg-white p-6 rounded shadow mb-4">
                <h2 className="text-2xl font-semibold mb-4">Add Blood Unit</h2>
                <div className="mb-4">
                    <label className="block mb-2">Blood Group</label>
                    <select
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">BID</label>
                    <input
                        type="text"
                        value={bid}
                        onChange={(e) => setBid(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="flex space-x-2 mt-4">
                    <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Add Blood Unit
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

export default AddBloodUnitForm;
