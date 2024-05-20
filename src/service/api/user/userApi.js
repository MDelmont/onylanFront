import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const  isAuthApi = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/isAuth`, {
            withCredentials: true,
        });
        return response
    } catch (err) {
        throw err
    }
    
}

export const  isAdminApi = async () => {
  try {
      const response = await axios.get(`${BASE_URL}/user/isAdmin`, {
          withCredentials: true,
      });
      return response
  } catch (err) {
      throw err
  }
  
}

export const userAuth = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/userAuth`, {
        withCredentials: true,
    });
    return response
} catch (err) {
    throw err
}
}