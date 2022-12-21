import { getUser } from "../services/users";
import { getAllMovies } from "../services/movies";
import { getAllGenres } from "../services/genres";
import {
  setUserAction,
  setMoviesAction,
  setGenresAction,
  setFilteredMoviesAction,
} from "../state";

export const fetchUser = async (userID, dispatch) => {
  const user = await getUser(userID);
  dispatch(setUserAction(user.data));
};

export const fetchMovies = async (dispatch) => {
  const movies = await getAllMovies();
  dispatch(setMoviesAction(movies));
  dispatch(setFilteredMoviesAction("All"));
};

export const fetchGenres = async (dispatch) => {
  const genres = await getAllGenres();
  dispatch(setGenresAction(genres));
};
