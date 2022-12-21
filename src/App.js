import { useEffect, useState } from "react";
import AuthNav from "./pages/AuthNav";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Favourites } from "./pages/Favourites";
import SingleMovieView from "./pages/SingleMovieView";
import MoviesMain from "./pages/MoviesMain";

import { useStateValue } from "./state";
import { fetchUser, fetchGenres, fetchMovies } from "./utils/refetch";

const App = () => {
  const [token, setToken] = useState();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setToken(token);
      fetchUser(token, dispatch);
      fetchMovies(dispatch);
      fetchGenres(dispatch);
    }
  }, []);

  if (!state.movies || !state.genres || !state.user)
    return <div>Loading...</div>;

  return (
    <div className={token ? "authMain" : "unAuthMain"}>
      <Router>
        {token ? <AuthNav setToken={setToken} /> : <></>}
        <Routes>
          <Route
            path="/"
            element={
              token ? <Navigate to="/movies" /> : <LogIn setToken={setToken} />
            }
          />
          <Route
            path="/movies/:id"
            element={token ? <SingleMovieView /> : <Navigate to="/" />}
          />
          <Route
            path="/movies"
            element={token ? <MoviesMain /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={token ? <Navigate to="/movies" /> : <SignUp />}
          />
          <Route
            path="/favourites"
            element={token ? <Favourites /> : <Navigate to="/" />}
          />
          <Route path="*" element={<div style={{textAlign: "center"}}>Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
