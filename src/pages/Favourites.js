import React from "react";
import { useStateValue } from "../state";
import { MoviesList } from "../components/MoviesList";

export const Favourites = () => {
  const [state] = useStateValue();

  const movies = state.movies;
  const favouriteIDs = state.user.favourites;
  const favouriteMovies = favouriteIDs.map((movieID) =>
    movies.find((movie) => movie.id === movieID)
  );

  return (
    <div>
      <MoviesList currentMovies={favouriteMovies} />
    </div>
  );
};
