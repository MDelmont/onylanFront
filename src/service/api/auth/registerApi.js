import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const register = async (idToken,formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register/${idToken}`,formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        });
        return response
    } catch (err) {
        throw err
    }
};