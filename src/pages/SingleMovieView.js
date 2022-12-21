import React from "react";
import {
  useStateValue,
  removeMovieAction,
  toggleMovieFavourite,
} from "../state";
import { useNavigate, useParams } from "react-router-dom";
import MovieListItem from "../components/MovieListItem";
import { removeMovie } from "../services/movies";

const SingleMovieView = () => {
  const [state, dispatch] = useStateValue();
  const id = useParams().id;
  const navigate = useNavigate();

  const movie = state.movies.find((movie) => movie.id == id);

  const handleMovieDelete = async () => {
    await removeMovie(movie.id);
    dispatch(removeMovieAction(movie.id));
    if (state.user.favourites.includes(movie.id)) {
      dispatch(toggleMovieFavourite(movie.id));
    }
    navigate("/movies");
  };

  return (
    <div className="single-movie-view-container authMain">
      <div className="single-movie-view-container__poster">
        <MovieListItem movie={movie} />
      </div>
      <div className="single-movie-view-container__more">
        <div>
          <div className="single-movie-view-container__more__title">Year</div>{" "}
          {movie.year}
        </div>
        <div>
          <div className="single-movie-view-container__more__title">
            Runtime
          </div>{" "}
          {movie.runtime} minutes
        </div>
        <div>
          <div className="single-movie-view-container__more__title">Genres</div>{" "}
          {movie.genres.join(", ")}
        </div>
        <div>
          <div className="single-movie-view-container__more__title">
            Director
          </div>{" "}
          {movie.director}
        </div>
        <div>
          <div className="single-movie-view-container__more__title">Actors</div>{" "}
          {movie.actors}
        </div>
        <div>
          <div className="single-movie-view-container__more__title">Plot</div>{" "}
          {movie.plot}
        </div>

        <button
          className="single-movie-view-container__more__btn--delete"
          onClick={handleMovieDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleMovieView;
