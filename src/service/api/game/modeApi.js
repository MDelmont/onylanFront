import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createMode = async (formData) => {
    try {
        console.log(formData);
        const response = await axios.post(`${BASE_URL}/mode`, formData, {
            withCredentials: true,
        });
        console.log(response)
        return response
    } catch (err) {
        console.log('err', err)
        throw err
    }
};

export const allModes = async () => {
    const response = await axios.get(`${BASE_URL}/mode/`, {
        withCredentials: true,
    });
    console.log(response);
    return response
}