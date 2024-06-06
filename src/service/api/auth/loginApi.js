import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (formData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`,formData, {
            withCredentials: true,
        });
        return response
    } catch (err) {
        console.log('err',err)
        throw err
    }
};