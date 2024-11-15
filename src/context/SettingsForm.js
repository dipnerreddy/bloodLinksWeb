import React, { useState } from 'react';

const SettingsForm = ({ onUpdate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const settings = { email, password, phoneNumber };
        onUpdate(settings);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-lg font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mt-1 border rounded"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mt-1 border rounded"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-medium">Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-2 mt-1 border rounded"
                        placeholder="Enter your phone number"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Update Settings
                </button>
            </form>
        </div>
    );
};

export default SettingsForm;
