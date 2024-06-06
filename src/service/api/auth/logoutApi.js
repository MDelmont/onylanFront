import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const logout = async () => {
        const response = await axios.get(`${BASE_URL}/auth/logout`, {
            withCredentials: true,
        });
        return response

};