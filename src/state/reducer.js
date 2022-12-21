export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "SET_MOVIES": {
      return {
        ...state,
        movies: action.payload,
      };
    }
    case "SET_GENRES": {
      return {
        ...state,
        genres: action.payload,
      };
    }
    case "SET_FILTERED_MOVIES": {
      if (action.payload === "All") {
        return {
          ...state,
          genre: action.payload,
          filteredMovies: state.movies,
        };
      }

      return {
        ...state,
        genre: action.payload,
        filteredMovies: state.movies.filter((movie) =>
          movie.genres.includes(action.payload)
        ),
      };
    }
    case "TOGGLE_MOVIE_FAVOURITE": {
      const isAlreadyFavourited = state.user.favourites.includes(
        action.payload
      );
      return {
        ...state,
        user: {
          ...state.user,
          favourites: isAlreadyFavourited
            ? state.user.favourites.filter(
                (movieID) => movieID !== action.payload
              )
            : state.user.favourites.concat(action.payload),
        },
      };
    }
    case "REMOVE_MOVIE": {
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
        filteredMovies: state.movies.filter(
          (movie) => movie.id !== action.payload
        ),
      };
    }
    default:
      return state;
  }
};

export const setUserAction = (user) => ({
  type: "SET_USER",
  payload: user,
});

export const setMoviesAction = (movies) => ({
  type: "SET_MOVIES",
  payload: movies,
});

export const setGenresAction = (genres) => ({
  type: "SET_GENRES",
  payload: genres,
});

export const setFilteredMoviesAction = (genre) => ({
  type: "SET_FILTERED_MOVIES",
  payload: genre,
});

export const toggleMovieFavourite = (movieID) => ({
  type: "TOGGLE_MOVIE_FAVOURITE",
  payload: movieID,
});

export const removeMovieAction = (movieID) => ({
  type: "REMOVE_MOVIE",
  payload: movieID,
});
