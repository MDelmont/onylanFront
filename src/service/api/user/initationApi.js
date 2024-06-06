import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const  invitationByToken = async (token) => {
        const response = await axios.get(`${BASE_URL}/user/invitation/${token}`, {
            withCredentials: true,
        });
        return response

}

export const  allInvitation = async () => {
        const response = await axios.get(`${BASE_URL}/user/invitations`, {
            withCredentials: true,
        });
        return response
    
}

export const  deleteInvitation = async (id) => {
        const response = await axios.delete(`${BASE_URL}/user/invitation/${id}`, {
            withCredentials: true,
        });
        return response
}