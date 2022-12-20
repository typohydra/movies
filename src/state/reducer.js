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
