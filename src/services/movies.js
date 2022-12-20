import axios from "axios";
const baseUrl = "http://localhost:3001/movies";

const getAllMovies = async () => {
  const movies = await axios.get(baseUrl);
  return movies.data;
};

export { getAllMovies };
