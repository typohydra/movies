import React, { useEffect } from "react";
import { getUser } from "../services/users";
import { getAllMovies } from "../services/movies";
import { getAllGenres } from "../services/genres";
import {
  setUserAction,
  useStateValue,
  setMoviesAction,
  setGenresAction,
} from "../state";
import MoviesMain from "./MoviesMain";

const AuthMain = ({ setToken }) => {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const userID = localStorage.getItem("user");
    // when user is logged in and refreshes page state is set again
    const fetchUser = async () => {
      const user = await getUser(userID);
      dispatch(setUserAction(user.data));
    };

    const fetchMovies = async () => {
      const movies = await getAllMovies();
      dispatch(setMoviesAction(movies));
    };

    const fetchGenres = async () => {
      const genres = await getAllGenres();
      dispatch(setGenresAction(genres));
    };

    fetchUser();
    fetchMovies();
    fetchGenres();
  }, []);

  const handleLogOut = () => {
    setToken(null);
    localStorage.clear();
    window.location.reload(); // reload page so state is cleared
  };

  if (!state.movies || !state.genres || !state.user)
    return <div>Loading...</div>;

  return (
    <div>
      <div>logged in {state.user.email}</div>
      <button onClick={handleLogOut}>Log Out</button>
      <MoviesMain />
    </div>
  );
};

export default AuthMain;
