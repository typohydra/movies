import React, { useEffect } from "react";
import { getUser } from "../services/users";
import { getAllMovies } from "../services/movies";
import { getAllGenres } from "../services/genres";
import {
  setUserAction,
  useStateValue,
  setMoviesAction,
  setGenresAction,
  setFilteredMoviesAction,
} from "../state";
import MoviesMain from "./MoviesMain";
import { Favourites } from "./Favourites";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

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
      dispatch(setFilteredMoviesAction("All"));
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
      <Router>
        <nav className="auth-nav">
          <div className="auth-nav__links">
            <Link to="/">
              <button className="auth-nav__links__btn">Home</button>
            </Link>
            <Link to="/favourites">
              <button className="auth-nav__links__btn">Favourites</button>
            </Link>
          </div>
          <button className="auth-nav__btn--logout" onClick={handleLogOut}>
            Log Out
          </button>
        </nav>

        <div className="authMain">
          <Routes>
            <Route path="/" element={<MoviesMain />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default AuthMain;
