import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const registerApi = async (idToken,formData) => {

    const response = await axios.post(`${BASE_URL}/auth/register/${idToken}`,formData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
            }
    });
    return response

};