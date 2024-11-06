import React, { useState, useEffect, useCallback } from 'react';
import AddBloodUnitForm from '../context/AddBloodUnitForm';
import MakePaymentForm from '../context/MakePaymentForm';
import CustomPieChart from '../context/PieChart';
import RequestsForm from '../context/RequestsForm';
import { getPieChartData } from '../context/api';

const Dashboard = () => {
    const [databaseInfo, setDatabaseInfo] = useState([]);
    const bbName = sessionStorage.getItem('bbName');

    const handleAddBloodUnit = async (bloodUnit) => {
        console.log("Adding Blood Unit:", bloodUnit);
    };

    const handleMakePayment = async (paymentDetails) => {
        console.log("Making Payment:", paymentDetails);
    };

    const fetchData = useCallback(async () => {
        if (!bbName) {
            console.error("Blood bank name is not available in session storage.");
            return;
        }

        try {
            const response = await getPieChartData(bbName);
            const data = response.data;

            const formattedData = Object.entries(data).map(([name, value]) => ({
                name,
                value,
            }));
            setDatabaseInfo(formattedData);
        } catch (error) {
            console.error("Error fetching pie chart data:", error);
        }
    }, [bbName]); // Add bbName as a dependency

    useEffect(() => {
        fetchData(); // Call fetchData here
    }, [fetchData]); // Updated dependency array

    const handleLogout = () => {
        console.log("Logging out...");
        sessionStorage.clear();
        window.location.href = '/login';
    };

    const handleRefresh = () => {
        fetchData();
    };

    return (
        <div className="flex">
            <aside className="w-64 h-screen bg-gray-800 text-white fixed">
                <div className="p-4">
                    <h2 className="text-2xl font-bold">BloodLinks Dashboard</h2>
                    <nav className="mt-4">
                        <ul>
                            <li className="hover:bg-gray-700 p-2 rounded">Add Blood Unit</li>
                            <li className="hover:bg-gray-700 p-2 rounded">Make Payment</li>
                            <li className="hover:bg-gray-700 p-2 rounded">View Database Info</li>
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
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                <div className="mb-6">
                    <AddBloodUnitForm onAdd={handleAddBloodUnit} />
                </div>

                <div className="mb-6">
                    <MakePaymentForm onPay={handleMakePayment} />
                </div>

                <div className="flex space-x-4 mt-10">
                    <div className="bg-white p-6 rounded shadow w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Data Overview</h2>
                        <button 
                            onClick={handleRefresh} 
                            className="mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Refresh
                        </button>

                        <h3 className="text-xl font-semibold mb-4">Database Info</h3>
                        {databaseInfo.length > 0 ? (
                            <CustomPieChart data={databaseInfo} />
                        ) : (
                            <p>No data available. Fetch information from the database.</p>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded shadow w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Requests</h2>
                        <RequestsForm />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
