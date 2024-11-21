import React, { useState, useEffect } from 'react';
import { fetchLastDonationDate, updateLastDonationDate } from './api';

const SettingsForm = () => {
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const [sessionDetails, setSessionDetails] = useState({});
    const phoneNumber = sessionStorage.getItem('phoneNumber'); // Get phoneNumber from sessionStorage

    useEffect(() => {
        // Load session storage details
        const loadSessionDetails = () => {
            const details = {};
            for (const key of Object.keys(sessionStorage)) {
                details[key] = sessionStorage.getItem(key);
            }
            setSessionDetails(details);
        };

        // Fetch last donation date if phone number exists
        const loadDate = async () => {
            try {
                const data = await fetchLastDonationDate(phoneNumber);
                if (data) {
                    setDate(data.date || '');
                    setMessage('Last donation date fetched successfully.');
                } else {
                    setMessage('No last donation date found. Please update it.');
                }
            } catch (error) {
                console.error('Error fetching donation date:', error);
                setMessage('Failed to fetch donation date. Please try again.');
            }
        };

        loadSessionDetails();

        if (phoneNumber) {
            loadDate();
        } else {
            setMessage('Phone number not found in session. Please log in.');
        }
    }, [phoneNumber]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateLastDonationDate({ phoneNumber, date });
            setMessage('Donation date updated successfully!');
        } catch (error) {
            console.error('Error updating donation date:', error);
            setMessage('Failed to update donation date. Please try again.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Update Last Donation Date</h2>
            {phoneNumber ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium">Last Donation Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 mt-1 border rounded"
                            placeholder="Select your last donation date"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Update Date
                    </button>
                </form>
            ) : (
                <p className="mt-4 text-red-600">
                    Please log in to update your last donation date.
                </p>
            )}

            {message && <p className="mt-4 text-green-600">{message}</p>}

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Session Details</h3>
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Key</th>
                            <th className="border px-4 py-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(sessionDetails).map(([key, value]) => (
                            <tr key={key}>
                                <td className="border px-4 py-2 font-medium">{key}</td>
                                <td className="border px-4 py-2">{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SettingsForm;
