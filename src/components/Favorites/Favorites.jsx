import React from "react";
import css from "./favorites.module.css";
import axios from "axios";
import { useEffect } from "react";
import { movieAPI } from "../../api/api";
import { NavLink } from "react-router-dom";
import { API_Key } from "../Home";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromFavorites,
  requestFavorites,
  setFavoritesData,
} from "../../store/FavoritesSlice";
import TrailerBlock from "../tools/TrailerBlock";

const Favorites = () => {
  const UserID = useSelector((state) => state.login.account.uid);
  const { favorites, favoritesData } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  console.log(favorites);

  useEffect(() => {
    dispatch(requestFavorites(UserID));

    const fetchData = async () => {
      const movieDataArray = await Promise.all(
        favorites
          .filter((movieId) => movieId !== "")
          .map((movieId) =>
            axios.get(
              `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_Key}&append_to_response=videos`
            )
          )
      );

      let favoritesData = [];

      movieDataArray.forEach((response) => {
        favoritesData.push(response.data);
      });

      dispatch(setFavoritesData(favoritesData));
    };

    if (favorites.length > 0) {
      fetchData();
    }
  }, [UserID, favorites.length]); //user id needed only while developing

  const deleteHandler = (userID, movie_ID) => {
    console.log(userID, movie_ID);
    dispatch(removeFromFavorites({ userID, movie_ID }));
  };

  return (
    <div className={css.wrapper}>
      <div className={css.heading}>
        <h1>My Favorites</h1>
      </div>
      {favoritesData.map((movie) => {
        return (
          <FavMovie
            movie={movie}
            deleteHandler={deleteHandler}
            UserID={UserID}
          />
        );
      })}
    </div>
  );
};

export default Favorites;

const FavMovie = ({ movie, deleteHandler, UserID }) => {
  const trailerURL = movie.videos.results.find(
    (video) => video.type === "Trailer" //Official T
  );

  return (
    <div className={css.container}>
      <div className={css.flex}>
        <TrailerBlock trailerURL={trailerURL.key} />
        {/* <div className={css.pic}>
        <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      </div> */}

        <div className={css.info}>
          <h1>{movie.title}</h1>

          <div className={css.year}>Год: {movie.release_date}</div>
          <div className={css.genres}>
            Жанры: {movie.genres && movie.genres.map((x) => `${x.name}, `)}{" "}
          </div>
          <div className={css.overview}>{movie.overview}</div>
          <div className={css.rating}>Rating: {movie.vote_average}</div>
          <div
            className={css.delBTN}
            onClick={() => {
              deleteHandler(UserID, movie.id);
            }}
          >
            Delete from Favorites
          </div>
        </div>
      </div>
    </div>
  );
};
