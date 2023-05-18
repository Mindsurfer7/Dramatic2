import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_Key } from "../components/Home";
import axios from "axios";
import {
  addToFavoritesAPI,
  removeFromFavoritesAPI,
  requestFavoritesAPI,
} from "../api/api";

const initialState = {
  favorites: [],
  favoritesData: [],
  status: "x",
};

export const addToFavoritesThunk = createAsyncThunk(
  "favorites/addToFavoritesThunk",
  async ({ UserID, selectedMovie }) => {
    console.log("favorites called");
    await addToFavoritesAPI(UserID, selectedMovie);
  }
);

export const requestFavorites = createAsyncThunk(
  "favorites/requestFavorites",
  async (userID) => {
    const result = await requestFavoritesAPI(userID);
    return result;
  }
);
export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async ({ userID, movie_ID }) => {
    console.log(userID, movie_ID);
    const result = await removeFromFavoritesAPI(userID, movie_ID);
    return result;
  }
);

export const favoritesReducer = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavoritesData: (state, action) => {
      state.favoritesData = action.payload;
    },
    resetStatus: (state, action) => {
      state.status = "x";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });

    builder.addCase(requestFavorites.rejected, (state, action) => {
      console.log("API error");
    });
    builder.addCase(requestFavorites.pending, (state, action) => {
      // state.loadingStatus = "pending";
    });
    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      //const { movie_ID } = action.meta.arg;

      state.favorites.push(""); //= state.favorites.filter((movie) => movie !== movie_ID);
    });
    builder.addCase(addToFavoritesThunk.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(addToFavoritesThunk.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(addToFavoritesThunk.pending, (state, action) => {
      state.status = "pending";
    });
  },
});

export const { setFavoritesData, resetStatus } = favoritesReducer.actions;

export default favoritesReducer.reducer;

// builder.addCase(addToFavoritesThunk.fulfilled, (state, action) => {
//   state.test = "hooray!";
// });
// builder.addCase(addToFavoritesThunk.rejected, (state, action) => {
//   console.log(action.payload);
// });
