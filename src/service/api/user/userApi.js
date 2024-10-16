import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const isAuthApi = async () => {
    const response = await axios.get(`${BASE_URL}/user/isAuth`, {
        withCredentials: true,
    });
    return response
}

export const isAdminApi = async () => {
    const response = await axios.get(`${BASE_URL}/user/isAdmin`, {
        withCredentials: true,
    });
    return response
}

export const userAuth = async () => {
    const response = await axios.get(`${BASE_URL}/user/userAuth`, {
        withCredentials: true,
    });
    return response

}

export const getUserById = async (id) => {
    const response = await axios.get(`${BASE_URL}/user/${id}`, {
        withCredentials: true,
    });
    console.log(response)
    return response
}


export const updateUser = async (formData) => {

    const response = await axios.put(`${BASE_URL}/user`,formData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
            }
    });
    return response

};

export const allUsers = async () => {
    const response = await axios.get(`${BASE_URL}/user/`, {
        withCredentials: true,
    });
    return response
}