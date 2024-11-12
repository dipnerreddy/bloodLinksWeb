import React, { useState } from 'react';
import SearchBloodForm from '../context/SearchBloodForm'; // Import SearchBloodForm component
import DonateBloodForm from '../context/DonateBloodForm'; // Import DonateBloodForm component
import RequestBloodForm from '../context/RequestBloodForm'; // Import RequestBloodForm component
import SettingsForm from '../context/SettingsForm'; // Import SettingsForm component
// import { getPieChartData } from '../context/api';

const UserDashboard = () => {
    const [databaseInfo, setDatabaseInfo] = useState([]);
    const [activeForm, setActiveForm] = useState('searchBlood'); // State to manage active form
    const bbName = sessionStorage.getItem('bbName');

    // Function to handle form submission (optional)
    const handleSearchBlood = async (searchDetails) => {
        console.log("Searching for Blood:", searchDetails);
    };

    const handleDonateBlood = async (donationDetails) => {
        console.log("Donating Blood:", donationDetails);
    };

    const handleRequestBlood = async (requestDetails) => {
        console.log("Requesting Blood:", requestDetails);
    };

    const handleSettingsUpdate = async (settings) => {
        console.log("Updating Settings:", settings);
    };


    const handleLogout = () => {
        console.log("Logging out...");
        sessionStorage.clear();
        window.location.href = '/';
    };


    return (
        <div className="flex">
            <aside className="w-64 h-screen bg-gray-800 text-white fixed">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">User Dashboard</h2>
                    <nav className="mt-4">
                        <ul>
                            <li
                                className={`hover:bg-gray-700 p-2 rounded ${activeForm === 'searchBlood' ? 'bg-gray-600' : ''}`}
                                onClick={() => setActiveForm('searchBlood')}
                            >
                                Search Blood
                            </li>
                            <li
                                className={`hover:bg-gray-700 p-2 rounded ${activeForm === 'donateBlood' ? 'bg-gray-600' : ''}`}
                                onClick={() => setActiveForm('donateBlood')}
                            >
                                Donate Blood
                            </li>
                            <li
                                className={`hover:bg-gray-700 p-2 rounded ${activeForm === 'requestBlood' ? 'bg-gray-600' : ''}`}
                                onClick={() => setActiveForm('requestBlood')}
                            >
                                Request Blood
                            </li>
                            <li
                                className={`hover:bg-gray-700 p-2 rounded ${activeForm === 'settings' ? 'bg-gray-600' : ''}`}
                                onClick={() => setActiveForm('settings')}
                            >
                                Settings
                            </li>
                        </ul>
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="absolute bottom-0 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mb-0"
                >
                    Logout
                </button>
            </aside>
            <main className="flex-1 p-6 bg-gray-200 ml-64">
                <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

                {/* Conditional Rendering of Forms */}
                {activeForm === 'searchBlood' && (
                    <div className="mb-6">
                        <SearchBloodForm onSearch={handleSearchBlood} />
                    </div>
                )}

                {activeForm === 'donateBlood' && (
                    <div className="mb-6">
                        <DonateBloodForm onDonate={handleDonateBlood} />
                    </div>
                )}

                {activeForm === 'requestBlood' && (
                    <div className="mb-6">
                        <RequestBloodForm onRequest={handleRequestBlood} />
                    </div>
                )}

                {activeForm === 'settings' && (
                    <div className="mb-6">
                        <SettingsForm onUpdate={handleSettingsUpdate} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserDashboard;
