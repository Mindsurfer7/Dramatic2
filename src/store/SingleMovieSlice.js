import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_Key } from "../components/Home";
import axios from "axios";

const initialState = {
  movieData: {},
  credits: [],
};

export const requestCredits = createAsyncThunk(
  "singleMovie/requestCredits",
  async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_Key}&language=en-US`
    );

    return data;
  }
);

export const SingleMovieSlice = createSlice({
  name: "singleMovie",
  initialState,
  reducers: {
    setMovieData: (state, action) => {
      state.movieData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestCredits.fulfilled, (state, action) => {
      state.credits = action.payload;
    });
  },
});

export const { setMovieData } = SingleMovieSlice.actions;

export default SingleMovieSlice.reducer;
