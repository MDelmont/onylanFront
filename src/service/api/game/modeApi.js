import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createMode = async (formData) => {
        const response = await axios.post(`${BASE_URL}/mode`, formData, {
            withCredentials: true,
        });
        return response

};

export const updateMode = async (formData,modeId) => {
    const response = await axios.patch(`${BASE_URL}/mode/${modeId}`, formData, {
        withCredentials: true,
    });
    return response

};

export const allModes = async () => {
    const response = await axios.get(`${BASE_URL}/mode/`, {
        withCredentials: true,
    });
    return response
}

export const getModesByGame = async (idGame) => {
    const response = await axios.get(`${BASE_URL}/mode/game/${idGame}`, {
        withCredentials: true,
    });
    return response
}

export const getModesById = async (idMode) => {
    const response = await axios.get(`${BASE_URL}/mode/${idMode}`, {
        withCredentials: true,
    });
    return response
}

export const deleteMode = async (idMode) => {
    const response = await axios.delete(`${BASE_URL}/mode/${idMode}`, {
        withCredentials: true,
    });
    return response
}