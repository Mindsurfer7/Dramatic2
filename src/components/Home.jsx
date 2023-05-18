import React from "react";
import axios from "axios";
import css from "./home.module.css";
import { useState } from "react";
import { useEffect } from "react";
import MovieBlock from "./MovieBlock/MovieBlock";

import BigMovie from "./BigMovie/BigMovie";
import { useSelector } from "react-redux";
import { requestMovies, requestTV, setMovies } from "../store/HomeSlice";
import { useDispatch } from "react-redux";
import MovieBlockPreloader from "./tools/MovieBlockPreloader";
import Recomended from "./Recomended/Recomended";
import { requestFavorites } from "../store/FavoritesSlice";
import SearchBy from "./tools/SearchBy";
import Paginator from "./tools/Paginator";

export const API_Key = "90a2d91e59493255d0f5b07d7bb87d05";

const Home = (props) => {
  const dispatch = useDispatch();
  const array = [1, 2, 3, 4, 5, 6, 7, 8];
  const { isLogged } = useSelector((state) => state.login);
  const UserID = useSelector((state) => state.login.account.uid);
  const [modalWindow, setModalWindow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, loadingStatus, TVshows } = useSelector((state) => state.home);
  const { searchString } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(requestMovies(searchString));

    if (searchString !== "") {
      const homeSection = document.getElementById("target-M");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchString]);

  useEffect(() => {
    dispatch(requestFavorites(UserID));
  }, [isLogged]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${API_Key}&language=en-US&page=${currentPage}`
      )
      .then((response) => {
        dispatch(setMovies(response.data.results));
      });

    dispatch(requestTV());
  }, [currentPage]);

  const handleClick = () => {
    setModalWindow(!modalWindow);
  };

  return (
    <div className={css.home}>
      <BigMovie />

      <div className={css.wrapper}>
        <div onClick={handleClick} className={css.filters}>
          FILTERS
        </div>
        <div className={css.items}>
          {searchString ? <h2>{searchString}</h2> : <h2>Search Movies</h2>}
        </div>{" "}
        <div className={css.page}>
          <Paginator setPage={setCurrentPage} />
        </div>
        {modalWindow && (
          <div className={css.popUp}>
            <SearchBy />
          </div>
        )}
        <div id="target-M" className={css.movieBlock}>
          {loadingStatus === "pending"
            ? array.map((x) => <MovieBlockPreloader />) // "LOADING..."
            : movies.map((movieData) => {
                return (
                  <MovieBlock
                    movieData={movieData}
                    key={movieData.id}
                    isLink={true}
                    selectMovie={() => {}}
                  />
                );
              })}
        </div>
      </div>
      <Recomended />
      <div id="target-TV" className={css.TVshows}>
        TV Shows
        <div className={css.movieBlock}>
          {loadingStatus === "pending"
            ? array.map((x) => <MovieBlockPreloader />) // "LOADING..."
            : TVshows.map((movieData) => {
                return (
                  <MovieBlock
                    movieData={movieData}
                    key={movieData.id}
                    isLink={true}
                    selectMovie={() => {}}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Home;
