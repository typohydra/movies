import React, { useEffect } from "react";
import { useStateValue } from "../state";
import { Link } from "react-router-dom";
import { fetchUser, fetchGenres, fetchMovies } from "../utils/refetch";

const AuthNav = ({ setToken }) => {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const userID = localStorage.getItem("user");
    fetchUser(userID, dispatch);
    fetchMovies(dispatch);
    fetchGenres(dispatch);
  }, []);

  const handleLogOut = () => {
    setToken(null);
    localStorage.clear();
    window.location.reload();
  };

  if (!state.movies || !state.genres || !state.user)
    return <div>Loading...</div>;

  return (
    <div>
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
    </div>
  );
};

export default AuthNav;
