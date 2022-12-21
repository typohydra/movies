import React from "react";
import heart from "../assets/heart.png";
import heartRed from "../assets/heart_red.png";
import { toggleMovieFavourtieService } from "../services/users";
import { toggleMovieFavourite, useStateValue } from "../state";

const MovieListItem = ({ movie }) => {
  const [state, dispatch] = useStateValue();

  const handleToggleFavourite = async (e) => {
    await toggleMovieFavourtieService(state.user.id, movie.id);
    dispatch(toggleMovieFavourite(movie.id));
  };

  return (
    <div className="movies-list__item">
      <div className="movies-list__item__container">
        <img
          className="movies-list__item__container__img"
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
        />
        <div
          onClick={handleToggleFavourite}
          className="movies-list__item__container__favourite"
        >
          {state.user.favourites.includes(movie.id) ? (
            <img src={heartRed} alt="red heart" />
          ) : (
            <img src={heart} alt="heart" />
          )}
        </div>
      </div>
      <div className="movies-list__item__info">
        <div>{movie.title}</div>
      </div>
    </div>
  );
};

export default MovieListItem;
