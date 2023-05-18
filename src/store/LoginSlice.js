import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_Key } from "../components/Home";
import axios from "axios";
import { signInAPI } from "../api/api";

const initialState = {
  isLogged: false,
  account: {},
};

export const requestToken = createAsyncThunk("login/requestToken", async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_Key}`
  );

  return data;
});
export const createSession = createAsyncThunk(
  "login/requestToken",
  async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_Key}`
    );

    return data;
  }
);
export const loginWithGoogle = createAsyncThunk(
  "login/loginWithGoogle",
  async () => {
    const result = await signInAPI();
    return result;
  }
);

export const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    get: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(requestToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      const profile = {
        uid: action.payload.profile.uid,
        email: action.payload.profile.email,
        displayName: action.payload.profile.displayName,
        photoURL: action.payload.profile.photoURL,
      };

      state.isLogged = true;
      state.account = profile;
    });
    builder.addCase(requestToken.rejected, (state, action) => {
      console.log("API error");
    });
    builder.addCase(requestToken.pending, (state, action) => {});
  },
});

export const { get } = loginReducer.actions;

export default loginReducer.reducer;
