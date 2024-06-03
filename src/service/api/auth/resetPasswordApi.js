import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const resetPassword = async (formData) => {
    console.log(formData)
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, formData, {
        withCredentials: true,
    });
    return response
}

export const getResetPassword = async (token) => {

    const response = await axios.get(`${BASE_URL}/auth/reset-password/${token}`, {
        withCredentials: true,
    });
    return response

};

export const postResetPasswordToken = async (token, formData) => {

    const response = await axios.post(`${BASE_URL}/auth/reset-password/${token}`, formData, {
        withCredentials: true,
    });
    return response

};