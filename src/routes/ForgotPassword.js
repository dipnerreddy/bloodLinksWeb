import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../context/api'; // Import forgotPassword API function

const ForgotPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1); // Track the current step
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Step 1: Phone Number input
    const handlePhoneNumberSubmit = (event) => {
        event.preventDefault();

        // Store phone number in session (assuming localStorage for this example)
        sessionStorage.setItem('phoneNumber', phoneNumber);

        setStep(2); // Move to OTP step
    };

    // Step 2: OTP input
    const handleOtpSubmit = (event) => {
        event.preventDefault();

        // Store OTP in session (assuming localStorage for this example)
        sessionStorage.setItem('otp', otp);

        setStep(3); // Move to New Password step
    };

    // Step 3: New Password input and reset password
    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        const storedPhoneNumber = sessionStorage.getItem('phoneNumber');
        const storedOtp = sessionStorage.getItem('otp');

        if (!storedPhoneNumber || !storedOtp) {
            setMessage('Session expired. Please restart the process.');
            return;
        }

        try {
            const response = await forgotPassword({ phoneNumber: storedPhoneNumber, otp: storedOtp, password });
            console.log("Password reset successful:", response.data);
            setMessage('Password updated successfully. You can now log in with the new password.');
            navigate('/'); // Redirect to login page
        } catch (error) {
            console.error("Error during password reset:", error);
            setMessage(error.response?.data?.message || 'Unable to reset password. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {step === 1 ? 'Forgot Password - Step 1' : step === 2 ? 'Forgot Password - Step 2' : 'Forgot Password - Step 3'}
                    </h2>
                    {step === 1 && (
                        <form onSubmit={handlePhoneNumberSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                                Next
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleOtpSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP:</label>
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                                Next
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password:</label>
                                <input
                                    type="password"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
                                Save
                            </button>
                        </form>
                    )}

                    {message && <p className="text-red-500 text-center mt-4">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
