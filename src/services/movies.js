import axios from "axios";
const baseUrl = "http://localhost:3001/movies";

const getAllMovies = async () => {
  const movies = await axios.get(baseUrl);
  return movies.data;
};

const removeMovie = async (movieID) => {
  const movie = await axios.delete(`${baseUrl}/${movieID}`);
  return movie.data;
};

export { getAllMovies , removeMovie};
