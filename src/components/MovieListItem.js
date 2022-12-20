import React from "react";
import heart from "../assets/heart.png";
import heartRed from "../assets/heart_red.png";

const MovieListItem = ({ movie }) => {
  return (
    <div className="movies-list__item">
      <div className="movies-list__item__container">
        <img
          className="movies-list__item__container__img"
          src={movie.posterUrl}
        />
        <div className="movies-list__item__container__favourite">
          <img src={heart} />
        </div>
      </div>
      <div className="movies-list__item__info">
        <div>{movie.title}</div>
      </div>
    </div>
  );
};

export default MovieListItem;
