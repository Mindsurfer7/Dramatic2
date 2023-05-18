import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_Key } from "../components/Home";

//https://api.themoviedb.org/3/search/keyword?api_key=<<api_key>>&page=1

export const requestMovies = createAsyncThunk(
  "home/requestMovies",
  async (searchString) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${searchString}`
    );
    console.log(data);
    return data.results;
  }
);
export const searchByGenre = createAsyncThunk(
  "home/searchByGenre",
  async (genreID) => {
    console.log(genreID);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&with_genres=${genreID}`
    );
    console.log(data);
    return data.results;
  }
);
export const searchByActor = createAsyncThunk(
  "home/searchByActor",
  async (name) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${API_Key}&query=${name}`
    );
    const actorId = response.data.results[0].id;

    const moviesResponse = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&with_cast=${actorId}`
    );

    return moviesResponse.data.results;
  }
);

export const requestTV = createAsyncThunk("home/requestTV", async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_Key}&language=en-US&page=1`
  );
  console.log(data);
  return data.results;
});

const initialState = {
  movies: [],
  TVshows: [],
  mustWatchList: [],
  loadingStatus: "pending",
};

export const homeReducer = createSlice({
  name: "home",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setRecomendations: (state, action) => {
      state.recomended = action.payload;
    },
    setMustWatch: (state, action) => {
      state.mustWatchList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.loadingStatus = "success";
    });
    builder.addCase(requestTV.fulfilled, (state, action) => {
      state.TVshows = action.payload;
    });
    builder.addCase(searchByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(searchByActor.fulfilled, (state, action) => {
      state.movies = action.payload;
    });

    builder.addCase(requestMovies.rejected, (state, action) => {
      state.loadingStatus = "error";
      console.log("API error");
    });
    builder.addCase(requestMovies.pending, (state, action) => {
      state.loadingStatus = "pending";
    });
  },
});

export const { setMovies, setRecomendations, setMustWatch } =
  homeReducer.actions;

export default homeReducer.reducer;

// type request = Record<string, string>;

// enum Status {
//   PENDING = "pending",
//   SUCCESS = "success",
//   ERROR = "error",
// }
