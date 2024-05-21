import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (formData) => {
    try {
        console.log(`${BASE_URL}/auth/login`,formData)
        const response = await axios.post(`${BASE_URL}/auth/login`,formData, {
            withCredentials: true,
        });
        console.log(response)
        return response
    } catch (err) {
        console.log('err',err)
        throw err
    }
};