import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const forgetPassword = async (formData) => {
    console.log(formData)
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, formData, {
        withCredentials: true,
    });
    return response
}
