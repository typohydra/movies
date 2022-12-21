import React from "react";
import PaginatedMoviesList from "../components/MoviesList";
import { setFilteredMoviesAction, useStateValue } from "../state";

const MoviesMain = () => {
  const [state, dispatch] = useStateValue();

  const handleFilter = (genre) => {
    if (state.genre === genre) return;
    dispatch(setFilteredMoviesAction(genre));
  };

  return (
    <div>
      <div className="filters">
        {state.genres.map((genre, i) => (
          <button
            onClick={() => handleFilter(genre)}
            className="filters__btn"
            key={i}
          >
            {genre}
          </button>
        ))}
      </div>
      <PaginatedMoviesList itemsPerPage={8} />
    </div>
  );
};

export default MoviesMain;
