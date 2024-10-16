import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {isAuthApi,userAuth} from '../service/api/user/userApi'
import {login} from '../service/api/auth/loginApi'
import {logout} from '../service/api/auth/logoutApi'
import  utilsFunction  from '../utils/utilsFunction'
// Fonction asynchrone pour se connecter à l'API
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData) => {
    const response = await login(formData)

    return response.data;
  }
);

// Fonction asynchrone pour se déconnecter
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    const response = await logout();
    return response.data;
  }
);

// Fonction asynchrone pour récupérer les informations de l'utilisateur connecté
export const getUserAuth = createAsyncThunk(
  'user/getUserAuth',
  async () => {
    const response = await userAuth();
    return response.data;
  }
);

export const getIsAuthUser = createAsyncThunk(
  'user/getIsAuthUser',
  async () => {
      const response = await isAuthApi()
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


    builder.addCase(getIsAuthUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getIsAuthUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log('action.payload.data',action.payload.data)
      console.log(action.payload.data.error)
      state.isConnect = action.payload.data;
    });
    builder.addCase(getIsAuthUser.rejected, (state, action) => {
      state.loading = false;
      state.isConnect = false;
      console.log('action.error.message',action.error.message)
      console.log('action.payload.data',action.payload)
      state.error = action.error.message;
    });
  }
  
});

export default userSlice.reducer;
