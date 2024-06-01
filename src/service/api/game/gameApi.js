import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createGame = async (formData) => {
    try {
        console.log(formData);
        const response = await axios.post(`${BASE_URL}/game`, formData, {
            withCredentials: true,
        });
        console.log(response)
        return response
    } catch (err) {
        console.log('err', err)
        throw err
    }
};

export const allGames = async () => {
    const response = await axios.get(`${BASE_URL}/game/`, {
        withCredentials: true,
    });
    console.log(response);
    return response
}