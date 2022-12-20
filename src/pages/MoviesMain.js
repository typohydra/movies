import React from "react";
import MoviesList from "../components/MoviesList";

const MoviesMain = () => {
  return (
    <div>
      <MoviesList itemsPerPage={8} />
    </div>
  );
};

export default MoviesMain;
