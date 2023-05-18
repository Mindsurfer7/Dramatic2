import React, { useState } from "react";
import css from "./movieblock.module.css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import rating from "../../pics/IMDB.png";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavoritesThunk,
  requestFavorites,
} from "../../store/FavoritesSlice";

const MovieBlock = ({ movieData, selectMovie, isLink }) => {
  const dispatch = useDispatch();
  const UserID = useSelector((state) => state.login.account.uid);
  const { favorites, status } = useSelector((state) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    console.log("length chaneged");

    let checkFavorite;

    if (favorites.length > 0) {
      checkFavorite = favorites.some((item) => item === movieData.id);
    }

    setIsFavorite(checkFavorite);
  }, [favorites.length]);

  const handleFavorites = () => {
    console.log("!");
    if (!UserID) {
      alert("Please, log in first");
    }

    dispatch(
      addToFavoritesThunk({ UserID: UserID, selectedMovie: movieData.id })
    );
  };

  useEffect(() => {
    if (status === "success") {
      dispatch(requestFavorites(UserID));
    }
  }, [status]);

  if (isLink) {
    return (
      <div className={css.container}>
        <div>
          <NavLink to={`/SingleMovie/${movieData.id}`}>
            <div className={css.pic}>
              <img
                src={`http://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
              />
            </div>
          </NavLink>

          <div className={css.title}>
            {movieData.title}
            {movieData.name ? movieData.name : ""}
          </div>
        </div>

        <div className={css.rating}>
          <div className={css.ratePic}>
            <img src={rating} />
          </div>{" "}
          <div className={css.text}>{movieData.vote_average}</div>
          <div className={css.like}>
            {isFavorite ? (
              <HeartFilled />
            ) : (
              <HeartOutlined onClick={handleFavorites} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={css.container} onClick={() => selectMovie(movieData.id)}>
      <div>
        <div className={css.pic}>
          <img
            src={`http://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
          />
        </div>

        <NavLink to={`/SingleMovie/${movieData.id}`}>
          <div className={css.title}>
            {movieData.title}
            {movieData.name ? movieData.name : ""}
          </div>
        </NavLink>
      </div>

      <div className={css.rating}>
        <div className={css.ratePic}>
          <img src={rating} />
        </div>

        <div className={css.text}>{movieData.vote_average}</div>
        <div className={css.like}>
          {isFavorite ? (
            <HeartFilled />
          ) : (
            <HeartOutlined onClick={handleFavorites} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieBlock;

// type Movie = {
//     adult: boolean;
//     backdrop_path: string;
//     id: number;
//     title: string;
//     original_language: string;
//     original_title: string;
//     overview: string;s
//     poster_path: string;
//     media_type: string;
//     genre_ids: number[];
//     popularity: number;
//     release_date: string;
//     video: boolean;
//     vote_average: number;
//     vote_count: number;
//   };
//  <span>{movieData.release_date}</span>
