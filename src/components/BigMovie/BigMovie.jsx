import React, { useEffect, useState } from "react";
import css from "./BigMovie.module.css";
import axios from "axios";
import { API_Key } from "../Home";
import { setMustWatch } from "../../store/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieBlock from "../MovieBlock/MovieBlock";
import BigMovieLoader from "../tools/HomePreloader";
import {
  addToFavoritesThunk,
  requestFavorites,
  resetStatus,
} from "../../store/FavoritesSlice";
import TrailerBlock from "../tools/TrailerBlock";
import { requestTrailerURL } from "../../api/api";
import { MyNotification } from "../tools/MyNotification";
import loader from "../../pics/loader.gif";

/// &page=${page}
const BigMovie = () => {
  const dispatch = useDispatch();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const { mustWatchList } = useSelector((state) => state.home);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_Key}&language=en-US&sort_by=popularity.desc`
      )
      .then((response) => {
        dispatch(setMustWatch(response.data.results));
      });
  }, []);

  useEffect(() => {
    if (mustWatchList.length > 0) {
      setSelectedMovie(mustWatchList[2].id);
    }
  }, [mustWatchList.length]);

  return (
    <div className={css.container}>
      {selectedMovie && (
        <ShowDisplay
          mustWatchList={mustWatchList}
          selectedMovie={selectedMovie}
        />
      )}

      <div className={css.movieListWrapper}>
        <div className={css.trand}>
          <h2>Trand Movies</h2>
        </div>
        <div className={css.movieList}>
          {mustWatchList.map((x, i) => {
            return <MovieBlock movieData={x} selectMovie={setSelectedMovie} />;
          })}
        </div>
      </div>
    </div>
  );
};

const ShowDisplay = ({ selectedMovie, mustWatchList }) => {
  const dispatch = useDispatch();
  const UserID = useSelector((state) => state.login.account.uid);

  let neededMovie = mustWatchList.find((movie) => movie.id === selectedMovie);
  const { favorites, status } = useSelector((state) => state.favorites);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    console.log("lenght chaneges");

    let checkFavorite;

    if (favorites.length > 0) {
      checkFavorite = favorites.some((item) => item === selectedMovie);
    }

    setIsFavorite(checkFavorite);
  }, [favorites.length, selectedMovie]);

  const addToWatchList = () => {
    if (!UserID) {
      alert("Please, log in first");
    }
    setIsLoading(true);
    dispatch(
      addToFavoritesThunk({ UserID: UserID, selectedMovie: selectedMovie })
    );
  };

  useEffect(() => {
    if (status === "success") {
      setIsLoading(false);
      dispatch(requestFavorites(UserID));
    }
  }, [status]);

  const [TrailerURL, setTrailerURL] = useState("");

  useEffect(() => {
    const getURL = async (id) => {
      const vidURL = await requestTrailerURL(id);
      setTrailerURL(vidURL);
    };
    getURL(neededMovie.id);
  }, [selectedMovie]);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleVideoPlay = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <div className={css.BigMovie}>
      <div className={css.filmPoster}>
        <div className={css.pic}>
          <img
            src={`http://image.tmdb.org/t/p/w500/${neededMovie.poster_path}`}
          />
          <div className={css.textValues}>
            <h2> {neededMovie.title}</h2>
            <div className={css.description}>{neededMovie.overview}</div>
          </div>
          <div onClick={toggleVideoPlay} className={css.buttons}>
            <div className={css.watch}>Watch</div>
            <div
              onClick={addToWatchList}
              className={isFavorite ? css.favGreen : css.myList}
            >
              To Favorites!
            </div>
            <div className={css.loader}>{isLoading ? "Loading..." : ""}</div>
          </div>
        </div>
      </div>

      <div className={css.youTube}>
        <TrailerBlock trailerURL={TrailerURL} isPlaying={isVideoPlaying} />
      </div>
    </div>
  );
};

export default BigMovie;

// popularity(pin): 6246.713
// poster_path(pin): "/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg"
// release_date(pin): "2023-04-12"
