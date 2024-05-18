import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Fonction asynchrone pour se connecter à l'API
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData) => {
    const response = await axios.post('http://localhost:5000/auth/login', formData,{withCredentials:true});
    return response.data;
  }
);

// Fonction asynchrone pour se déconnecter
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    const response = await axios.get('http://localhost:5000/auth/logout',{withCredentials:true});
    return response.data;
  }
);

// Fonction asynchrone pour récupérer les informations de l'utilisateur connecté
export const getUserAuth = createAsyncThunk(
  'user/getUserAuth',
  async () => {
    const response = await axios.get('http://localhost:5000/user/userAuth',{withCredentials:true});
    return response.data;
  }
);

// Fonction asynchrone pour récupérer les informations de l'utilisateur connecté
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (formData) => {
      const response = await axios.post(`http://localhost:5000/auth/register/${formData.token}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Assurez-vous de définir le type de contenu comme 'multipart/form-data'
        }
      });
      return response.data;
  }
);


export const getIsAdmin = createAsyncThunk(
  'user/getIsAdmin',
  async () => {
    const response = await axios.get('http://localhost:5000/user/isAdmin',{withCredentials:true});
    return response.data;
  }
);

export const getIsAuthUser = createAsyncThunk(
  'user/getIsAuthUser',
  async () => {
    const response = await axios.get('http://localhost:5000/user/isAuth',{withCredentials:true});
    return response.data;
  }
);

export const getAllInvitationByToken = createAsyncThunk(
  'user/getAllInvitationByToken',
  async (token) => {
    const response = await axios.get(`http://localhost:5000/user/invitation/${token}`,{withCredentials:true});
    return response.data;
  }
);

export const getAllInvitations = createAsyncThunk(
  'user/getAllInvitations',
  async () => {
    const response = await axios.get('http://localhost:5000/user/invitations',{withCredentials:true});
    return response.data;
  }
);

export const deleteInvitation = createAsyncThunk(
  'user/deleteInvitation',
  async (id) => {
    const response = await axios.delete(`http://localhost:5000/user/invitation/${id}`,{withCredentials:true});
    return response.data;
  }
);

const initialState = {
  loading: false,
  error: null,
  isConnect:false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // Action de connexion
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isConnect = true
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.isConnect = false;
      state.error = action.error.message;
    });

    // Action de déconnexion
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.isConnect = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.isConnect = false;
      state.error = action.error.message;
    });

    // Action de s'enregister
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Action pour récupérer les informations de l'utilisateur connecté
    builder.addCase(getUserAuth.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.isConnect = true; 
    });
    builder.addCase(getUserAuth.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isConnect = false;
    });

    // Action pour récupérer les informations de l'utilisateur connecté
    builder.addCase(getIsAdmin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getIsAdmin.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getIsAdmin.rejected, (state, action) => {
      state.loading = false;
    });


    builder.addCase(getIsAuthUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getIsAuthUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload.data)
      state.isConnect = action.payload.data;
    });
    builder.addCase(getIsAuthUser.rejected, (state, action) => {
      state.loading = false;
      state.isConnect = false;
      state.error = action.error.message;
    });


    builder.addCase(getAllInvitations.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllInvitations.fulfilled, (state, action) => {
      state.loading = false;

    });
    builder.addCase(getAllInvitations.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;

    });

    builder.addCase(deleteInvitation.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteInvitation.fulfilled, (state, action) => {
      state.loading = false;

    });
    builder.addCase(deleteInvitation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;

    });

    builder.addCase(getAllInvitationByToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllInvitationByToken.fulfilled, (state, action) => {
      state.loading = false;

    });
    builder.addCase(getAllInvitationByToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;

    });
  }
  
});

export default userSlice.reducer;
