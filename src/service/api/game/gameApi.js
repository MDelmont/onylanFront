import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createGame = async (formData) => {
    try {
        console.log(formData);
        const response = await axios.post(`${BASE_URL}/game`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                }
        });
        return response
    } catch (err) {
        console.log('err', err)
        throw err
    }
};

export const updateGame = async (formData,idGame) => {
    try {
        console.log(formData);
        const response = await axios.patch(`${BASE_URL}/game/${idGame}`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                }
        });
        return response
    } catch (err) {
        console.log('err', err)
        throw err
    }
};

export const allGames = async () => {
    const response = await axios.get(`${BASE_URL}/game`, {
        withCredentials: true,
    });
    return response
}

export const getGamesId = async (id) => {
    const response = await axios.get(`${BASE_URL}/game/${id}`, {
        withCredentials: true,
    });
    return response
}

export const updateGameNote = async (id,note) => {
    console.log(id,note)
    const response = await axios.post(`${BASE_URL}/game/note/${id}`, {note},{
        withCredentials: true,
    });
    return response
}

export const deleteGame = async (id) => {
    console.log(id)
    const response = await axios.delete(`${BASE_URL}/game/${id}`,{
        withCredentials: true,
    });
    return response
}

export const getConfigGameApi = async () => {

    const response = await axios.get(`${BASE_URL}/game/config`,{
        withCredentials: true,
    });
    return response
}