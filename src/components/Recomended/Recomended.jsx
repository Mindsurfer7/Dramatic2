import React, { useEffect } from "react";
import MovieBlock from "../MovieBlock/MovieBlock";
import { useDispatch, useSelector } from "react-redux";
import { requestRecMovies } from "../../store/RecomendedSlice";
import css from "./recomend.module.css";
import { requestFavorites } from "../../store/FavoritesSlice";

const Recomended = ({ movieData, selectMovie }) => {
  const dispatch = useDispatch();
  const array = [1, 2, 3, 4];
  const UserID = useSelector((state) => state.login.account.uid);
  const { favorites, status } = useSelector((state) => state.favorites);
  const { recomendations, loadingStatus } = useSelector(
    (state) => state.recomended
  );

  useEffect(() => {
    dispatch(requestFavorites(UserID));

    let movieID = favorites[0]; //просто первый фильм из избранного

    if (favorites.length > 0) {
      dispatch(requestRecMovies({ movieID }));
    }
  }, [favorites.length, status]);

  return (
    <div className={css.wrapper}>
      {favorites.length > 0 && <h2>Recomended 4 you!</h2>}

      <div className={css.recContainer}>
        {!favorites.length && (
          <h1>
            У вас нет избранных фильмов, пожалуйста, выберите хотя бы один
          </h1>
        )}
        {!UserID ? (
          <div className={css.caution}>
            <h1>
              Пожалуйста, залогиньтесь, чтобы получить персональные рекомендации
            </h1>
            <h3>
              Чтобы получить рекомендации, основанные на ваших интересах,
              добавьте что-нибудь в избранное :)
            </h3>
          </div>
        ) : (
          recomendations.map((movieData) => {
            return (
              <MovieBlock
                movieData={movieData}
                key={movieData.id}
                isLink={true}
                selectMovie={() => {}}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Recomended;
