// src/context/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchLastDonationDate = async (phoneNumber) => {
    try {
        const response = await axios.get(`${API_URL}/userController/lastDonated/${phoneNumber}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching last donation date:', error);
        throw error;
    }
};

export const updateLastDonationDate = async ({ phoneNumber, date }) => {
    try {
        const response = await axios.post(`${API_URL}/userController/lastDonated`, { phoneNumber, date });
        return response.data;
    } catch (error) {
        console.error('Error updating last donation date:', error);
        throw error;
    }
};


export const getRequestsByLocation = (address, bloodType) => {
    return axios.get(`${API_URL}/v1/search`, {
        params: { address, bloodType }, // Correctly combining both parameters
    });
};


export const requestBlood = (requestDetails) => {
    return axios.post(`${API_URL}/userController/request-blood`, requestDetails); // POST request to the server
};





// Function to request blood

export const register = (data) => {
    return axios.post(`${API_URL}/userController/registration`, data);  
}

export const forgotPassword = (data) => {
    return axios.post(`${API_URL}/userController/forgot-password`, data);
};

export const userlogin = (user) => {
    return axios.post(`${API_URL}/bloodBank/login`, user);
}

export const login = (user) => {
    return axios.post(`${API_URL}/userController/login`, user);
}



export const addBloodUnit = (bloodUnit) => {
    return axios.post(`${API_URL}/bloodunits/add`, bloodUnit);
};

export const addPayment = (paymentDetails) => {
    return axios.post(`${API_URL}/bills/payment`, paymentDetails);
}

// Updated function to get the pie chart data using GET and bbName
export const getPieChartData = (bbName) => {
    return axios.get(`${API_URL}/bloodunits/piechart/${bbName}`);
};

// Updated function to get user requests using the path variable
export const getUserRequests = async (bbName) => {
    return await axios.get(`${API_URL}/userController/requests/${bbName}`); // Send bbName as a path parameter
};


export const deleteUserRequest = async (requestId) => {
    return await axios.delete(`${API_URL}/userController/delete-request`, {
        data: { id: requestId } // Send the request ID in the request body
    });
};

